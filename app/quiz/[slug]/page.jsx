"use client";
import React, { useState, useEffect } from "react";
import { story } from "../../data.js";

import { Bar } from "react-chartjs-2";
import Link from "next/link";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

async function query(data) {
  const firstPersonStatements = data.map((round) => {
    const scenario = round.scenario;
    const selectedAnswer = round.selectedAnswer;
    return `Senario : ${scenario} ; Answer :${selectedAnswer}  `;
  });

  const statement = firstPersonStatements.join(" ");

  const apiEndpointGroq = "https://api.groq.com/openai/v1/chat/completions";
  const headersGroq = {
    Authorization:
      "Bearer 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",
    "Content-Type": "application/json",
  };

  const requestDataGroq = {
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "Transform the provided scenarios and answers into a single first-person statement.",
      },
      { role: "user", content: `${statement}` },
    ],
  };

  console.log(requestDataGroq, "requestDataGroq");

  const responseGroq = await fetch(apiEndpointGroq, {
    method: "POST",
    headers: headersGroq,
    body: JSON.stringify(requestDataGroq),
  });

  const transformedStatement = await responseGroq.json();
  const firstPersonStatement = transformedStatement.choices[0].message.content;

  console.log(firstPersonStatement, "responseGroq");

  const apiEndpointBert =
    "https://api-inference.huggingface.co/models/Minej/bert-base-personality";
  const headersBert = {
    Authorization: `Bearer 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`,
  };

  const responseBert = await fetch(apiEndpointBert, {
    headers: headersBert,
    method: "POST",
    body: JSON.stringify({ inputs: firstPersonStatement }),
  });

  const resultBert = await responseBert.json();
  console.log(resultBert, "resultBert");

  return resultBert;
}

const Page = ({ params }) => {
  const [activeRound, setActiveRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const rounds = story[params.slug];
  const { scenario, answers, imagePrompt, id: currentId } = rounds[activeRound];

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer);
    // Save the selected answer for the current round
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[activeRound] = { scenario, selectedAnswer: answer };
      return updatedAnswers;
    });
  };

  const nextRound = async () => {
    setSelectedAnswerIndex(null);
    setChecked(false);
    if (activeRound === rounds.length - 1) {
      const result = await query(userAnswers);
      setPersonalityResult(result[0]);
      setShowResult(true);
    } else {
      setActiveRound((prev) => prev + 1);
    }
  };

  const personalityList = personalityResult
    ? personalityResult.map((item, index) => {
        const traitNames = [
          "Extroversion",
          "Neuroticism",
          "Agreeableness",
          "Conscientiousness",
          "Openness",
        ];
        const traitDescriptions = [
          "How outgoing and social you are.",
          "How much you experience negative emotions.",
          "How kind and cooperative you are.",
          "How organized and responsible you are.",
          "How open you are to trying new things and thinking creatively.",
        ];
        return (
          <div key={index} className="trait-item">
            <div className="trait-lable">
              <span className="trait-name">{traitNames[index]}</span>
              <span className="trait-description">
                {traitDescriptions[index]}
              </span>
            </div>
            <span
              className="trait-value"
              style={{ width: `${item.score.toFixed(2) * 100}%` }}
            >
              {(item.score.toFixed(2) * 100).toFixed(0)}%
            </span>
          </div>
        );
      })
    : null;

  return (
    <div className="container">
      <h1>AI Personality analyse - Quiz</h1>
      <div>
        <h2>
          Round: {activeRound + 1}
          <span>/{rounds.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <img
              src={`https://pollinations.ai/p/${imagePrompt}`}
              alt={imagePrompt}
            />
            <div className="right-section">
              <h3>{scenario}</h3>
              <div className="">
                {answers.map((answer, idx) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={
                      selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                    }
                  >
                    <span>{answer}</span>
                  </li>
                ))}
              </div>
              {checked ? (
                <button onClick={nextRound} className="btn">
                  {activeRound === rounds.length - 1 ? "Finish" : "Next"}
                </button>
              ) : (
                <button onClick={nextRound} disabled className="btn-disabled">
                  {" "}
                  {activeRound === rounds.length - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="result-container">
            <h3>Personality Insights</h3>
            <div className="personality-list">{personalityList}</div>

            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
