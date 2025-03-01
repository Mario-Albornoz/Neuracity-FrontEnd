import React, { useState } from "react";
import { motion } from "framer-motion";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-2db857754283424a95f86fb87f53b1d9",
  dangerouslyAllowBrowser: true
});

// Modal component for selecting material type
const Modal = ({ onClose, classTitle }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const generateLatex = async () => {
    if (!selectedOption) {
      alert("Please select a content type!");
      return;
    }

    setLoading(true);
    setProgress(20);
    console.log(`📢 Generating LaTeX ${selectedOption} for: ${classTitle}`);

    // Set up prompt based on the seleceted option
    const aiPrompt = {
      flashcards: `Generate a set of LaTeX-formatted flashcards based on the chapter "${classTitle}". Format them using the 'flashcards' LaTeX package. Do not include Only return the LaTeX code, nothing else. Do NOT include \`\`\`latex or \`\`\` in the response, purely provide the Latex formated document`,
      chapterNotes: `Generate a well-structured LaTeX document with a summary of "${classTitle}". Include sections, subsections, and equations if necessary.Do not include Only return the LaTeX code, nothing else. Do NOT include \`\`\`latex or \`\`\` in the response, purely provide the Latex formated document`,
      mindmaps: `Generate a LaTeX-based mindmap for "${classTitle}" using the 'mindmap' TikZ package.Do not include Only return the LaTeX code, nothing else. Do NOT include \`\`\`latex or \`\`\` in the response, purely provide the Latex formated document`,
      assignments: `Create a LaTeX document with 5 well-formatted assignments on "${classTitle}", including questions and detailed solutions.Do not include Only return the LaTeX code, nothing else. Do NOT include \`\`\`latex or \`\`\` in the response, purely provide the Latex formated document`,
    };

    try {
      setProgress(50);
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: aiPrompt[selectedOption] }],
        model: "deepseek-chat",
      });

      
      let latexContent = response.choices[0].message.content.trim();

      // Ensure proper LaTeX formatting
      latexContent = latexContent.replace(/^```latex/, "").replace(/```$/, "").trim();

      console.log("✅ Generated LaTeX:", latexContent);
      
      //send latex content to back end to turn into pdf
      setProgress(80);
      
      const pdfResponse = await fetch("http://localhost:3000/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latex: latexContent }),
      });

      if (!pdfResponse.ok) {
        console.error("Server responded with error:", pdfResponse.statusText);
        throw new Error("PDF generation failed");
      }

      setProgress(100);

      // Convert response to a blob
      const blob = await pdfResponse.blob();

      // Create a URL for the PDF
      const pdfUrl = URL.createObjectURL(blob);

      // Open PDF in a new tab first
      const pdfWindow = window.open(pdfUrl, "_blank");

      // Now, show the success message in the main window
      setSuccessMessage(`Generated ${selectedOption} PDF for "${classTitle}".`);

      // Clear the success message after a short delay
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // Clear after 5 seconds or adjust as necessary

    // } catch (error) {
    //   console.error("❌ Error:", error);
    //   alert("Failed to generate content. Try again.");
    } finally {
      // Allow the browser to update the UI before executing more actions
      setTimeout(() => {
        setProgress(0);
        setLoading(false);
        onClose();
      }, 500); // Small delay to avoid blocking the UI thread
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-60">
        <h2 className="text-xl font-semibold mb-4 underline">Generate Material</h2>
        <p className="mb-4">Select the type of content for:</p>
        <h3 className="font-bold text-center mb-4">{classTitle}</h3>

        {/* Selection Options */}
        <div className="space-y-2 mb-4">
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

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-2 text-green-500 font-semibold">
            {successMessage}
          </div>
        )}

        {/* Progress Bar */}
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
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-70 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={generateLatex}
            className="px-4 py-2 w-70 bg-blue-400 text-white rounded-md hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassCard = ({ image, title, description }) => {
  const [showModal, setShowModal] = useState(false);

  const handleGenerateClick = () => {
    setShowModal(true);
  };

  return (
    <div className="flex border border-gray-500 rounded-lg p-4 shadow-md items-center w-full bg-white">
      {/* Image */}
      <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md" />

      {/* Card Content */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>

        {/* Generate Material Button */}
        <button
          className="mt-2 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={handleGenerateClick}
        >
          Generate Material
        </button>
      </div>

      {/* Modal */}
      {showModal && <Modal classTitle={title} onClose={() => setShowModal(false)} />}
    </div>
  );
};
}

export default ClassCard;
