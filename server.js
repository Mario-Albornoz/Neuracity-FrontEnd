import express from "express";
import fs from "fs";
import { exec } from "child_process";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

// API to generate & return PDF
app.post("/generate-pdf", (req, res) => {
  const { latex } = req.body;

  if (!latex) {
    return res.status(400).send("No LaTeX code provided.");
  }

  // Write LaTeX to file
  fs.writeFileSync("document.tex", latex);

  // Specify the full path to pdflatex
  //const latexCommand = "/Library/TeX/texbin/pdflatex -interaction=nonstopmode document.tex";

  // Compile LaTeX to PDF
  exec(latexCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ PDF generation error: ${error.message}`);
      console.error(`📄 STDERR: ${stderr}`); // Log LaTeX errors
      return res.status(500).send(`PDF generation failed: ${stderr}`);
    }
    res.download("document.pdf");
    console.log("✅ PDF successfully generated!");
  });

  
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
