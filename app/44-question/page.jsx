"use client";
import React, { useState } from "react";
import { story } from "../../data/44question-converted";

const Page = () => {
  const [activeRound, setActiveRound] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [personalityScores, setPersonalityScores] = useState({
    Extraversion: 0,
    Agreeableness: 0,
    Conscientiousness: 0,
    Neuroticism: 0,
    Openness: 0,
  });

  const { rounds } = story;
  const { scenario, answers, imagePrompt, id: currentId } = rounds[activeRound];

  const scoring = {
    Extraversion: [1, 6, 11, 16, 21, 26, 31, 36],
    Agreeableness: [2, 7, 12, 17, 22, 27, 32, 37, 42],
    Conscientiousness: [3, 8, 13, 18, 23, 28, 33, 38, 43],
    Neuroticism: [4, 9, 14, 19, 24, 29, 34, 39],
    Openness: [5, 10, 15, 20, 25, 30, 35, 40, 41, 44],
  };

  const reverseScores = {
    Extraversion: [6, 21, 31],
    Agreeableness: [2, 12, 27, 37],
    Conscientiousness: [8, 18, 23, 43],
    Neuroticism: [9, 24, 34],
    Openness: [35, 41],
  };

  const calculateScores = () => {
    const scores = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0,
    };

    userAnswers.forEach(({ id, selectedAnswerIndex }) => {
      const score = selectedAnswerIndex + 1;

      Object.keys(scoring).forEach((trait) => {
        if (scoring[trait].includes(id)) {
          if (reverseScores[trait].includes(id)) {
            scores[trait] += 6 - score; // reverse scoring
          } else {
            scores[trait] += score;
          }
        }
      });
    });

    setPersonalityScores(scores);
    setShowResult(true);
  };

  console.log(personalityScores, "personalityScores");

  const onAnswerSelected = (answerIndex) => {
    setSelectedAnswerIndex(answerIndex);
    setUserAnswers((prev) => [
      ...prev,
      { id: rounds[activeRound].id, selectedAnswerIndex: answerIndex },
    ]);
  };

  const nextRound = () => {
    if (activeRound === rounds.length - 1) {
      calculateScores();
    } else {
      setActiveRound((prev) => prev + 1);
      setSelectedAnswerIndex(null);
    }
  };

  const restartQuiz = () => {
    setActiveRound(0);
    setSelectedAnswerIndex(null);
    setShowResult(false);
    setUserAnswers([]);
    setPersonalityScores({
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0,
    });
  };

  return (
    <div className="container">
      <h1>Personality Quiz</h1>
      <div>
        <h2>
          Round: {activeRound + 1}
          <span>/{rounds.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <img src={`/images/${currentId}.webp`} alt={imagePrompt} />
            <h3>{scenario}</h3>
            <ul>
              {answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(idx)}
                  className={
                    selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <button
              onClick={nextRound}
              className={selectedAnswerIndex !== null ? "btn" : "btn-disabled"}
              disabled={selectedAnswerIndex === null}
            >
              {activeRound === rounds.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        ) : (
          <ResultComponent
            scores={personalityScores}
            restartQuiz={restartQuiz}
          />
        )}
      </div>
    </div>
  );
};

const ResultComponent = ({ scores, restartQuiz }) => {
  const traitDescriptions = {
    Extraversion: "How outgoing and social you are.",
    Agreeableness: "How kind and cooperative you are.",
    Conscientiousness: "How organized and responsible you are.",
    Neuroticism: "How much you experience negative emotions.",
    Openness: "How open you are to trying new things and thinking creatively.",
  };

  return (
    <div className="result-container">
      <h3>Personality Insights</h3>
      <div className="personality-list">
        {Object.keys(scores).map((trait, index) => (
          <div key={index} className="trait-item">
            <div className="trait-label">
              <span className="trait-name">{trait}</span>
              <span className="trait-description">
                {traitDescriptions[trait]}
              </span>
            </div>
            <span className="trait-value">
              {((scores[trait] / (story.rounds.length * 5)) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
      <button onClick={restartQuiz}>Restart</button>
    </div>
  );
};

export default Page;
