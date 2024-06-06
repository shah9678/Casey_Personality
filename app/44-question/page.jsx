"use client";
import React, { useState, useEffect } from "react";
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

  const facetScores = {
    Extraversion: {
      Gregariousness: 0,
      Assertiveness: 0,
      Activity: 0,
      "Excitement-seeking": 0,
      "Positive emotions": 0,
      Warmth: 0,
    },
    Agreeableness: {
      Trust: 0,
      Straightforwardness: 0,
      Altruism: 0,
      Compliance: 0,
      Modesty: 0,
      "Tender-mindedness": 0,
    },
    Conscientiousness: {
      Competence: 0,
      Order: 0,
      Dutifulness: 0,
      "Achievement striving": 0,
      "Self-discipline": 0,
      Deliberation: 0,
    },
    Neuroticism: {
      Anxiety: 0,
      "Angry hostility": 0,
      Depression: 0,
      "Self-consciousness": 0,
      Impulsiveness: 0,
      Vulnerability: 0,
    },
    Openness: {
      Ideas: 0,
      Fantasy: 0,
      Aesthetics: 0,
      Actions: 0,
      Feelings: 0,
      Values: 0,
    },
  };

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "1" && event.key <= "5") {
        const answerIndex = parseInt(event.key, 10) - 1;
        if (answerIndex >= 0 && answerIndex < answers.length) {
          onAnswerSelected(answerIndex);
        }
      } else if (event.key === "Enter" && selectedAnswerIndex !== null) {
        nextRound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answers, onAnswerSelected, selectedAnswerIndex, nextRound]);

  console.log(facetScores, "facetScores");

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
            <img src={`/44-question/${currentId}.webp`} alt={imagePrompt} />
            <div>
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
                    <kbd>{idx + 1}</kbd> {answer}
                  </li>
                ))}
              </ul>
              <button
                onClick={nextRound}
                className={
                  selectedAnswerIndex !== null ? "btn" : "btn-disabled"
                }
                disabled={selectedAnswerIndex === null}
              >
                {activeRound === rounds.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <ResultComponent
            scores={personalityScores}
            facets={facetScores}
            restartQuiz={restartQuiz}
          />
        )}
      </div>
    </div>
  );
};

const ResultComponent = ({ scores, facets, restartQuiz }) => {
  const traitDescriptions = {
    Extraversion: "How outgoing and social you are.",
    Agreeableness: "How kind and cooperative you are.",
    Conscientiousness: "How organized and responsible you are.",
    Neuroticism: "How much you experience negative emotions.",
    Openness: "How open you are to trying new things and thinking creatively.",
  };

  const facetDescriptions = {
    Extraversion: {
      Gregariousness: "How sociable you are.",
      Assertiveness: "How forceful you are.",
      Activity: "How energetic you are.",
      "Excitement-seeking": "How adventurous you are.",
      "Positive emotions": "How enthusiastic you are.",
      Warmth: "How outgoing you are.",
    },
    Agreeableness: {
      Trust: "How forgiving you are.",
      Straightforwardness: "How undemanding you are.",
      Altruism: "How warm you are.",
      Compliance: "How compliant you are.",
      Modesty: "How modest you are.",
      "Tender-mindedness": "How sympathetic you are.",
    },
    Conscientiousness: {
      Competence: "How efficient you are.",
      Order: "How organized you are.",
      Dutifulness: "How careful you are.",
      "Achievement striving": "How thorough you are.",
      "Self-discipline": "How disciplined you are.",
      Deliberation: "How impulsive you are.",
    },
    Neuroticism: {
      Anxiety: "How tense you are.",
      "Angry hostility": "How irritable you are.",
      Depression: "How contented you are.",
      "Self-consciousness": "How shy you are.",
      Impulsiveness: "How moody you are.",
      Vulnerability: "How self-confident you are.",
    },
    Openness: {
      Ideas: "How curious you are.",
      Fantasy: "How imaginative you are.",
      Aesthetics: "How artistic you are.",
      Actions: "How wide your interests are.",
      Feelings: "How excitable you are.",
      Values: "How unconventional you are.",
    },
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
            <div className="facet-list">
              {Object.keys(facetDescriptions[trait]).map((facet, idx) => (
                <div key={idx} className="facet-item">
                  <div className="facet-label">
                    <span className="facet-name">{facet}</span>
                    <span className="facet-description">
                      {facetDescriptions[trait][facet]}
                    </span>
                  </div>
                  <span className="facet-value">
                    {(
                      (facets[trait][facet] / (story.rounds.length * 5)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={restartQuiz}>Restart</button>
    </div>
  );
};

export default Page;
