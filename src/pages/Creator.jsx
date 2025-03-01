import React, { useState } from "react";
import { motion } from "framer-motion";
import OpenAI from "openai";
import ClassCard from "../components/ClassCard";
import { classes } from "../constants";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-2db857754283424a95f86fb87f53b1d9",
  dangerouslyAllowBrowser: true,
});

const Modal = ({ onClose, classTitle }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  const generateContent = async () => {
    if (!selectedOption) {
      alert("Please select a content type!");
      return;
    }

    setLoading(true);
    setProgress(20);
    console.log(`📢 Generating ${selectedOption} for: ${classTitle}`);

    const aiPrompt = {
      flashcards: `Generate flashcards based on the chapter "${classTitle}". Return them in JSON format with "question" and "answer".`,
      chapterNotes: `Create a detailed chapter summary for "${classTitle}" in well-structured paragraphs.`,
      mindmaps: `Generate a structured mindmap outline for "${classTitle}" in a nested bullet point format.`,
      assignments: `Generate 5 challenging assignments with detailed answers for "${classTitle}".`,
    };

    try {
      setProgress(40);
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: aiPrompt[selectedOption] }],
        model: "deepseek-chat",
      });

      setProgress(80);
      console.log("✅ AI Response:", response.choices[0].message.content);

      setProgress(100);
      alert(`Generated ${selectedOption} for "${classTitle}". Check console.`);
    } catch (error) {
      console.error("❌ AI Generation Failed:", error);
      alert("Failed to generate content. Try again.");
    } finally {
      setTimeout(() => {
        setProgress(0);
        setLoading(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-60">
        <h2 className="text-xl font-semibold mb-4 p-2 underline">Generate Material</h2>
        <p className="mb-4 p-2">Select the type of material to generate for:</p>
        <h3 className="font-bold text-center mb-4">{classTitle}</h3>

        {/* Radio Buttons */}
        <div className="space-y-2 mb-4 p-2">
          {["flashcards", "chapterNotes", "mindmaps", "assignments"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="materialType"
                value={type}
                checked={selectedOption === type}
                onChange={handleOptionChange}
                className="h-5 w-5"
                disabled={loading}
              />
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>

        {/* Loading Bar */}
        {loading && (
          <motion.div
            className="w-full h-2 bg-gray-200 mt-3 rounded-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-blue-500 rounded-md"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={generateContent}
            className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};


const Creator = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedClassTitle, setSelectedClassTitle] = useState("");

  // Open modal and set class title
  const handleGenerateClick = (title) => {
    setSelectedClassTitle(title);
    setShowModal(true);
  };

  return (
    <motion.section className="w-full h-screen relative mt-18 p-10">
      <motion.div className="w-125 h-2xl flex flex-col border border-gray-400 place-items-start p-3 pl-5 rounded-lg shadow-text-justify bg-gray-100">
        <h1 className="font font-medium">Material Generator</h1>
        <p className="font text-gray-500">
          Based on Reports, here we can generate some materials <br />
          that could help classes or individual students improve.
        </p>
      </motion.div>

      <motion.div className="space-y-4 p-1 mt-5">
        {classes.map((classData, index) => (
          <ClassCard
            key={index}
            image={classData.image}
            title={classData.title}
            description={classData.description}
            onGenerateClick={handleGenerateClick}
          />
        ))}
      </motion.div>

      {/* Modal */}
      {showModal && <Modal classTitle={selectedClassTitle} onClose={() => setShowModal(false)} />}
    </motion.section>
  );
};

export default Creator;
