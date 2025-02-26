import React, { useState } from "react";
import { motion } from "framer-motion";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: "sk-2db857754283424a95f86fb87f53b1d9",
    dangerouslyAllowBrowser: true // Replace with your actual DeepSeek API Key
  });

// Page fade-in animation
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Question animation (staggered effect)
const questionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.15, duration: 0.4 },
  }),
};

const Quizzes = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const generateQuiz = async () => {
    if (!quizTitle.trim()) {
      alert("Please enter a quiz title first!");
      return;
    }

    setLoading(true);
    setProgress(0);
    setQuestions([]);

    try {
      setProgress(20);
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Generate a quiz with 5-10 questions on the topic "${quizTitle}". 

Format:
    [Clear, specific question text]
    [Concise answer with no explanations]

    [Clear, specific question text]
    [Concise answer with no explanations]

Include a mix of question types (true/false, short answer, ) appropriate for the subject. Questions should test understanding rather than just memorization.`,
          },
        ],
        model: "deepseek-chat",
      });

      setProgress(70);
      const quizData = response.choices[0].message.content.split("\n\n");

      const parsedQuestions = quizData.map((q) => {
        const parts = q.split("\n");
        return {
          question: parts[0].replace(/^\d+\.\s*/, ""), // Remove number from start
          answer: parts[1] ? parts[1].replace("Answer: ", "") : "",
        };
      });

      setProgress(100);
      setQuestions(parsedQuestions);
      setAnswers(parsedQuestions.reduce((acc, q) => ({ ...acc, [q.question]: q.answer }), {}));
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Check your API key and try again.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const saveQuiz = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <motion.section
      className="relative w-full min-h-screen mt-18 flex items-center justify-center bg-gray-100 p-6 "
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <motion.h1 className="text-3xl font-bold mb-2 text-center">
          Create a Quiz
        </motion.h1>
        <p className="text-gray-500 text-center mb-6">
          Generate AI-powered quizzes instantly.
        </p>

        {/* Quiz Title Input */}
        <motion.div
          className="mb-4 w-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-lg font-medium">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="Enter quiz title..."
          />
        </motion.div>

        {/* AI Create Button */}
        <motion.button
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 mt-2 text-lg font-medium"
          onClick={generateQuiz}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Generating..." : "AI Create"}
        </motion.button>

        {/* Loading Bar */}
        {loading && (
          <motion.div
            className="w-full h-2 bg-gray-200 mt-3 rounded-md overflow-hidden"
          >
            <motion.div
              className="h-full bg-blue-500 rounded-md"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Scrollable Questions & Answers Preview */}
        <motion.div
          className="mt-6 w-full max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold mb-2 text-center">Quiz Preview</h2>
          {questions.length === 0 ? (
            <motion.p className="text-gray-500 mt-2 text-center">
              No questions added yet.
            </motion.p>
          ) : (
            <ul className="mt-3 space-y-4">
              {questions.map((q, index) => (
                <motion.li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                  variants={questionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <p className="font-semibold text-lg">{index + 1}. {q.question}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Suggested Answer:</strong> {q.answer}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Save Quiz Button */}
        <motion.button
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 mt-6 text-lg font-medium"
          onClick={saveQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Quiz
        </motion.button>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <motion.div
          className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          ✅ Quiz has been saved!
        </motion.div>
      )}
    </motion.section>
  );
};

export default Quizzes;
