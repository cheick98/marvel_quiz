import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "1759cee35118dd359d9a4e57e54d55c5";

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);

    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 30) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setIsLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          console.log(response);
          setCharacterInfos(response.data);
          setIsLoading(false);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const hideMdal = () => {
    setOpenModal(false);
    setIsLoading(true);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    setTimeout(() => {
      // loadLevelQuestions(0);
      loadLevelQuestions(quizLevel);
    }, 3000);
  }

  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <p className="successMsg">Bravo, passez au niveau suivant !</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <GiTrophyCup size="50px" /> Bravo, vous êtes un expert
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Acceuil
              </button>
            </>
          )}
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez echoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td> {question.question} </td>
            <td> {question.answer} </td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg="Pas de réponse !"
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  const resultInModal = !isLoading ? (
    <Fragment>
      <div className="modalHeader">
        <h2> {characterInfos.data.results[0].name} </h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              characterInfos.data.results[0].thumbnail.path +
              "." +
              characterInfos.data.results[0].thumbnail.extension
            }
            alt={characterInfos.data.results[0].name}
          />
          {characterInfos.attributionText}
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterInfos.data.results[0].description ? (
            <p> {characterInfos.data.results[0].description} </p>
          ) : (
            <p>Description indisponible ...</p>
          )}
          <h3>Plus d'infos</h3>
          {characterInfos.data.results[0].urls &&
            characterInfos.data.results[0].urls.map((url, index) => {
              return (
                <a
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                >
                  {capitalizeFirstLetter(url.type)}
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideMdal}>
          Fermer
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2> Response de Marvel... </h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées:</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>

      <Modal showModal={openModal} hideMdal={hideMdal}>
        {resultInModal}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
