import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Select } from "../components/ui";
import Charts from './data-for-charts/Charts';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const textVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3 } }
};

const Classroom = () => {
  const [selectedClass, setSelectedClass] = useState("Year 10");

  return (
    <motion.section 
      className="w-full h-screen relative mt-18"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div 
        className='flex flex-col items-center justify-self-auto h-[350px] text-center bg-gray-200'
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <div className='flex flex-col items-center justify-center p-20'>
          <h1 className="text-6xl font-bold">Welcome!</h1>
          <p className="font">Mr. Müller</p> 
          <p className="font">Current Classroom:</p>
          <motion.p 
            className="text-gray-400 p-2"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Showing data for:
          </motion.p>

          <motion.span 
            className='flex flex-col items-center justify-center text-screen p-2'
            initial="hidden"
            animate="visible"
            variants={dropdownVariants}
          >
            <Select 
              value={selectedClass}
              onChange={setSelectedClass}
              className="w-2 h-8 p-2 text-sm outline-1 rounded-md"
            >
              <option>Year 10</option>
              <option>Year 11</option>
              <option>Year 12</option>
            </Select>
          </motion.span>
        </div>

        {/* Chart Section with Animation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={chartVariants}
        >
          <Charts />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Classroom;
