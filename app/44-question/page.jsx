"use client";
import React, { useState, useEffect } from "react";
import { story } from "../../data/44question-converted";
import { useRouter } from "next/navigation";

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

const Page = () => {
  const [activeRound, setActiveRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [dominantTrait, setDominantTrait] = useState("");
  const [timer, setTimer] = useState(15);
  const router = useRouter();

  const rounds = story.rounds;
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
      setShowResult(true);
    } else {
      setActiveRound((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "1" && event.key <= "5") {
        const answerIndex = parseInt(event.key, 10) - 1;
        if (answerIndex >= 0 && answerIndex < answers.length) {
          onAnswerSelected(answers[answerIndex], answerIndex);
        }
      } else if (event.key === "Enter" && selectedAnswerIndex !== null) {
        nextRound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answers, selectedAnswerIndex]);

  useEffect(() => {
    let interval;
    if (showResult && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      router.push(`/code?personality=${dominantTrait}`);
    }
    return () => clearInterval(interval);
  }, [showResult, timer, dominantTrait, router]);

  const personalityList = finalResult
    ? finalResult.map((item, index) => {
        return (
          <div key={index} className="trait-item">
            <div className="trait-lable">
              <span className="trait-name">{item.label}</span>
              <span className="trait-description">
                {getTraitDescription(item.label)}
              </span>
            </div>
            <span
              className="trait-value"
              style={{ width: `${item.score * 100}%` }}
            >
              {(item.score * 100).toFixed(0)}%
            </span>
          </div>
        );
      })
    : null;

  function getTraitDescription(trait) {
    const descriptions = {
      Extroversion: "How outgoing and social you are.",
      Neuroticism: "How much you experience negative emotions.",
      Agreeableness: "How kind and cooperative you are.",
      Conscientiousness: "How organized and responsible you are.",
      Openness:
        "How open you are to trying new things and thinking creatively.",
    };
    return descriptions[trait] || "";
  }

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
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "Transform the provided scenarios and answers into a single first-person statement. nad give me a very short description of it. like in three lines",
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
    const firstPersonStatement =
      transformedStatement.choices[0].message.content;

    console.log(firstPersonStatement, "responseGroq");

    const personalityResponse = await fetch("/api/personality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statement: firstPersonStatement }),
    });
    const { rawOutput, dominantTraitName, confidences } =
      await personalityResponse.json();

    console.log("Raw output:", rawOutput);
    console.log("Dominant trait:", dominantTraitName);
    console.log("Confidences:", confidences);

    // Set the final result and dominant trait
    setFinalResult(confidences);
    setDominantTrait(dominantTraitName);

    return confidences;
  }

  const navigateToCodeEnv = () => {
    router.push(`/code?personality=${dominantTrait}`);
  };

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
                  {activeRound === rounds.length - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="result-container">
            <h3>Personality Insights</h3>
            <div className="personality-list">{personalityList}</div>
            <p>Your dominant trait is: {dominantTrait}</p>
            <p>Redirecting to code environment in {timer} seconds...</p>
            <button onClick={navigateToCodeEnv} className="btn">
              Go to Code Environment Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
