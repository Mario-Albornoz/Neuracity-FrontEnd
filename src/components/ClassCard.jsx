import React, { useState } from "react";
import { motion } from "framer-motion";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-2db857754283424a95f86fb87f53b1d9",
  dangerouslyAllowBrowser: true
});

const ClassCard = ({ image, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const generateLatex = async () => {
    setLoading(true);
    setProgress(10);

    console.log(`📢 Generating LaTeX for: ${title}`);

    // Simulate progress bar
    setProgress(30);
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI that generates LaTeX documents. Generate a **two-page summary** in LaTeX for "${title}". 
                    Only return the LaTeX code, nothing else. Do NOT include \`\`\`latex or \`\`\` in the response. `,
        },
      ],
      model: "deepseek-chat",
    });

    setProgress(70);
    let latexCode = response.choices[0].message.content.trim();

    // **Ensure backticks & unnecessary text are removed**
    latexCode = latexCode.replace(/^```latex/, "").replace(/```$/, "").trim();

    console.log("✅ Cleaned LaTeX:", latexCode);

    // Send LaTeX to server for PDF generation
    setProgress(90);
    const pdfResponse = await fetch("http://localhost:3000/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latex: latexCode }),
    });

    // Convert response to a blob
    const blob = await pdfResponse.blob();
    setProgress(100);

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    const newTab = window.open(url, "_blank");
    
    // Ensure the tab was opened successfully (browsers may block it)
    if (newTab) {
      console.log("✅ PDF opened in new tab");
    } else {
      console.warn("⚠️ Browser may have blocked opening the new tab");
    }

    // Also provide a download option
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}_notes.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Show success notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

    setLoading(false);
  };

  return (
    <div className="flex border border-gray-500 rounded-lg p-4 shadow-md items-center w-full bg-white">
      {/* Image */}
      <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md" />

      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>

        {/* Generate Button with clear indication */}
        <button
          className="mt-2 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={generateLatex}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate PDF"}
        </button>

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
      </div>

      {/* Success Notification - updated with clearer message */}
      {showNotification && (
        <motion.div
          className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          ✅ PDF opened and downloaded
        </motion.div>
      )}
    </div>
  );
};

export default ClassCard;