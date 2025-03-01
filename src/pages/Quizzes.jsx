import React, { useState } from "react";
import { motion } from "framer-motion";
import openai from "../api/openaiClient";

// Page animations
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Question animations
const questionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.15, duration: 0.4 },
  }),
};

const Quizzes = () => {
  const [activeTab, setActiveTab] = useState("automatic");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // AI Quiz Generation
  const generateQuiz = async () => {
    if (!quizTitle.trim()) {
      alert("Please enter a quiz title first!");
      return;
    }

    setLoading(true);
    setProgress(0);
    setQuestions([]);

    setProgress(20);
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Generate a quiz with 15 questions on the topic "${quizTitle}". 

Format each question as:
    [Question text]
    [Answer text]
Requirements:

  Explanations must be clear but under 30 words
  No special formatting or characters (no bold, italics, stars, etc.)
  Mix difficulty levels for engagement
  Include key concepts from ${quizTitle}
  Ensure factual accuracy

Example:
Q1: True or False: Water boils at 100°C at sea level.
A1: True. Water boils at 100°C (212°F) at standard atmospheric pressure, which is found at sea level.`,
        },
      ],
      model: "deepseek-chat",
    });

    setProgress(70);
    const quizData = response.choices[0].message.content.split("\n\n");

    const parsedQuestions = quizData.map((q) => {
      const parts = q.split("\n");
      return {
        question: parts[0].replace(/^\d+\.\s*/, ""), // Remove numbering
        answer: parts[1] ? parts[1].replace("Answer: ", "") : "",
      };
    });

    setProgress(100);
    setQuestions(parsedQuestions);
    setLoading(false);
  };

  // Manual Quiz Creation Functions
  const addManualQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleEditQuestion = (index, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = newText;
    setQuestions(updatedQuestions);
  };

  const handleEditAnswer = (index, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = newText;
    setQuestions(updatedQuestions);
  };

  const saveQuiz = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <motion.section
      className="relative w-full min-h-screen mt-18 flex items-center justify-center bg-gray-100 p-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <motion.h1 className="text-3xl font-bold mb-2 text-center">
          Create a Quiz
        </motion.h1>

        {/* Tabs for Manual & Automatic Quiz */}
        <div className="flex w-full mb-4">
          <button
            className={`flex-1 py-2 text-lg font-medium rounded-md ${
              activeTab === "automatic" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("automatic")}
          >
            Automatic Quiz
          </button>
          <button
            className={`flex-1 py-2 text-lg font-medium rounded-md ${
              activeTab === "manual" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Quiz
          </button>
        </div>

        {/* Automatic Quiz Section */}
        {activeTab === "automatic" && (
          <>
            <motion.div className="mb-4 w-full">
              <label className="block text-lg font-medium">Quiz Title</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                placeholder="Enter quiz title..."
              />
            </motion.div>

            <motion.button
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 mt-2 text-lg font-medium"
              onClick={generateQuiz}
              disabled={loading}
            >
              {loading ? "Generating..." : "AI Create"}
            </motion.button>

            {loading && (
              <motion.div className="w-full h-2 bg-gray-200 mt-3 rounded-md overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-md"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            )}

            <motion.div className="mt-6 w-full max-h-[300px] overflow-y-auto p-6">
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                  variants={questionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <input
                    type="text"
                    className="font-semibold text-lg w-full bg-transparent border-none focus:outline-none"
                    value={q.question}
                    onChange={(e) => handleEditQuestion(index, e.target.value)}
                  />
                  <input
                    type="text"
                    className="text-sm text-gray-600 w-full bg-transparent border-none focus:outline-none"
                    value={q.answer}
                    onChange={(e) => handleEditAnswer(index, e.target.value)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Manual Quiz Section */}
        {activeTab === "manual" && (
          <>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 mt-2 text-lg font-medium"
              onClick={addManualQuestion}
            >
              ➕ Add Question
            </button>

            <motion.div className="mt-6 w-full max-h-[300px] overflow-y-auto p-6">
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col"
                  variants={questionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <input
                    type="text"
                    className="font-semibold text-lg w-full bg-transparent border-none focus:outline-none"
                    value={q.question}
                    onChange={(e) => handleEditQuestion(index, e.target.value)}
                    placeholder="Enter question..."
                  />
                  <input
                    type="text"
                    className="text-sm text-gray-600 w-full bg-transparent border-none focus:outline-none mt-2"
                    value={q.answer}
                    onChange={(e) => handleEditAnswer(index, e.target.value)}
                    placeholder="Enter answer..."
                  />
                  <button className="text-red-500 mt-2" onClick={() => removeQuestion(index)}>🗑️ Remove</button>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        <button className="w-full bg-green-500 text-white py-3 rounded-md mt-6" onClick={saveQuiz}>
          Save Quiz
        </button>
      </div>
    </motion.section>
  );
};

export default Quizzes;
