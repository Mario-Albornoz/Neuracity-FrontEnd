import React, { useState } from "react";
import { motion } from "framer-motion";
import ClassCard from "../components/ClassCard";
import { classes } from "../constants";
import { pdf } from "../assets"

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-3 rounded-lg shadow-lg w-96 z-60">
        {/* <div className="rounded-lg items-start flex justify-items-end">
          <button 
          className="mt-2 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={onClose}
          >
            Return
          </button>
        </div> */}

        <div className="flex justify-center mt-2">
          <a href="document.pdf" target="_blank" rel="noopener noreferrer"> 
            <h3 className='flex flex-col items-center border-1 p-2 rounded-lg'>
              <img
                src={pdf}
                alt=''
                className='w-12 h-12 object-contain'
              />
              <span>Pre-view</span>
            </h3>
          </a>
        </div>

        <div className="rounded-lg flex justify-center gap-4 p-4">
          <button 
          className="mt-2 px-4 py-2  w-50 border-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white"
          onClick={onClose}
          >
            Return
          </button>
          <button 
            className="mt-2 px-4 py-2  w-50 border-2 rounded-md bg-blue-400 text-white hover:bg-blue-500"
            onClick={() => window.open("document.pdf", "_blank", "noopener,noreferrer")}
          >
            View Material
          </button>
        </div>
      </div>
    </div>
  )

}

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
      <button
      className="mt-5 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
      onClick={handleGenerateClick}
      >
        See Generated Material
      </button>
              {showModal && <Modal onClose={() => setShowModal(false)} />}
    </motion.section>
  );
};

export default Creator;
