import express from "express";
import fs from "fs";
import { exec } from "child_process";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json({ limit: '50mb' }));

// Set up CORS with more permissive options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

// Add a simple test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

// Serve static files
app.use(express.static('./'));

// API to generate & return PDF
app.post("/generate-pdf", (req, res) => {
  console.log("Received PDF generation request");
  
  const { latex } = req.body;

  if (!latex) {
    console.log("No LaTeX content provided");
    return res.status(400).send("No LaTeX code provided.");
  }

  console.log("Writing LaTeX file...");
  // Write LaTeX to file
  fs.writeFileSync("document.tex", latex);

  console.log("Running pdflatex...");
  // Compile LaTeX to PDF
  exec("pdflatex -interaction=nonstopmode document.tex", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ PDF generation error: ${error.message}`);
      console.error(`📄 STDERR: ${stderr}`); // Log LaTeX errors
      return res.status(500).send(`PDF generation failed: ${stderr}`);
    }
    
    console.log("PDF generated, checking if file exists...");
    // Check if the file was created
    if (!fs.existsSync("document.pdf")) {
      console.error("PDF file was not created!");
      return res.status(500).send("PDF file was not created");
    }
    
    console.log("Sending PDF file...");
    // Send the file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
    
    const fileStream = fs.createReadStream("document.pdf");
    fileStream.on('error', (err) => {
      console.error("Error reading PDF file:", err);
      res.status(500).send("Error reading PDF file");
    });
    
    fileStream.pipe(res);
    console.log("✅ PDF successfully generated and sent!");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server by opening: http://localhost:${PORT}/test`);
});