"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { getPersonalityTheme } from "../lib/personalityThemes";
import {
  Code2,
  BookOpen,
  Target,
  Sparkles,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackTests,
} from "@codesandbox/sandpack-react";

const CodeEnv = ({ personality }) => {
  const [topic, setTopic] = useState("Python");
  const [goal, setGoal] = useState("Hello World");
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [topicInfo, setTopicInfo] = useState("");
  const [theme, setTheme] = useState(getPersonalityTheme("neuroticism"));
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [output, setOutput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const previousCodeRef = useRef(code);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentTest, setCurrentTest] = useState("");
  const [testFile, setTestFile] = useState("");
  const [genericFunction, setGenericFunction] = useState("");

  useEffect(() => {
    if (currentChallenge < challenges.length) {
      generateTestForChallenge(challenges[currentChallenge].description);
    }
  }, [currentChallenge, challenges]);

  useEffect(() => {
    let timer;
    if (isStarted && code !== previousCodeRef.current) {
      timer = setTimeout(() => {
        getFeedback();
        previousCodeRef.current = code;
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isStarted, code]);

  const startSession = async () => {
    if (topic && goal) {
      const info = await getTopicInfo();
      setTopicInfo(info);
      const challengesData = await getChallenges();
      setChallenges(challengesData);
      setIsStarted(true);
      getFeedback();
    }
  };

  const getTopicInfo = async () => {
    const response = await fetch("/api/topic-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, goal, personality }),
    });
    const data = await response.json();
    return data.info;
  };

  const getChallenges = async () => {
    const response = await fetch("/api/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, goal, personality }),
    });
    const data = await response.json();
    return data.challenges.map((challenge) => ({
      description: challenge,
      test: "", // We'll fetch tests separately
    }));
  };

  const getFeedback = async () => {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, goal, code, personality }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 1000);
  };

  const generateTestForChallenge = async (challenge) => {
    const response = await fetch("/api/generate-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challenge, topic, goal, genericFunction }),
    });
    const data = await response.json();
    setCurrentTest(data.test);
    setTestFile(data.test);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    }
  };

  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(currentChallenge - 1);
    }
  };

  return (
    <div className={`min-h-screen p-8 text-white`}>
      <div className="space-y-8">
        <Card className={`shadow-lg`}>
          <CardHeader>
            <CardTitle className={`flex items-center `}>
              <Sparkles className={`mr-2 `} />
              Start Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic" className={theme.label}>
                  Topic
                </Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={theme.input}
                />
              </div>
              <div>
                <Label htmlFor="goal" className={theme.label}>
                  Goal
                </Label>
                <Input
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className={theme.input}
                />
              </div>
              <div>
                <Label htmlFor="personality" className={theme.label}>
                  Personality
                </Label>
                <Input id="goal" value={personality} className={theme.input} />
              </div>
              <Button onClick={startSession} className={theme.button}>
                Start Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {isStarted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-8">
            <Card className={` shadow-lg`}>
              <CardHeader>
                <CardTitle className={`flex items-center `}>
                  <Code2 className={`mr-2 `} />
                  Code Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SandpackProvider
                  template="vanilla"
                  files={{
                    "/main.py": `
// Generic function
${genericFunction}

// Your code
${code}`,
                    "/index.test.js": testFile,
                  }}
                  customSetup={{
                    dependencies: {
                      jest: "^27.0.0",
                      "jest-extended": "^3.0.2",
                    },
                  }}
                >
                  <SandpackLayout>
                    <SandpackCodeEditor
                      showTabs
                      showLineNumbers
                      showInlineErrors
                      wrapContent
                      onChange={(newCode) => {
                        const [newGenericFunction, newUserCode] =
                          newCode.split("// Your code");
                        setGenericFunction(newGenericFunction.trim());
                        setCode(newUserCode.trim());
                      }}
                    />
                    <SandpackTests />
                  </SandpackLayout>
                </SandpackProvider>
              </CardContent>
            </Card>
            <Card className={`shadow-lg`}>
              <CardHeader>
                <CardTitle className={`flex items-center ${theme.text}`}>
                  <Target className={`mr-2 ${theme.accent}`} />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`mb-4 ${theme.text}`}>
                  {challenges[currentChallenge]?.description}
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={prevChallenge}
                    disabled={currentChallenge === 0}
                  >
                    Previous
                  </Button>
                  <span className={`${theme.text}`}>
                    Challenge {currentChallenge + 1} of {challenges.length}
                  </span>
                  <Button
                    onClick={nextChallenge}
                    disabled={currentChallenge === challenges.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className={`shadow-lg`}>
              <CardHeader>
                <CardTitle className={`flex items-center ${theme.text}`}>
                  <BookOpen className={`mr-2 ${theme.accent}`} />
                  Topic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={topicInfo}
                  readOnly
                  className={`h-40 ${theme.textarea}`}
                />
              </CardContent>
            </Card>
            <Card className={`shadow-lg`}>
              <CardHeader className="text-white bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl mb-8 mx-2 mt-2">
                <CardTitle className={`flex items-center text-white`}>
                  <Sparkles className={`mr-2 text-white`} />
                  Casey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={feedback}
                  readOnly
                  className={`h-96 ${theme.textarea} ${
                    isHighlighted ? "animate-pulse" : ""
                  }`}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEnv;
