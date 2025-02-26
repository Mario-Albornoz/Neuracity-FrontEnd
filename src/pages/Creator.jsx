import React from 'react';
import { motion } from 'framer-motion';
import ClassCard from '../components/ClassCard';
import { classes } from '../constants';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.5 }
  })
};

const Creator = () => {
  return (
    <motion.section 
      className='w-full h-screen relative mt-18 p-10'
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div 
        className='w-125 h-2xl flex flex-col border border-gray-400 place-items-start p-3 pl-5 rounded-lg shadow-text-justify bg-gray-100'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='font font-medium'>Material Generator</h1>
        <p className='font text-gray-500'>
          Based on Reports, here we can generate some materials <br/>
          that could help classes or individual students improve.
        </p>
      </motion.div>

      <motion.div className='space-y-4 p-1 mt-5'>
        {classes.map((classData, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <ClassCard 
              image={classData.image} 
              title={classData.title} 
              description={classData.description} 
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Creator;
