import React from 'react'
import ClassCard from '../components/ClassCard'

import {classes} from '../constants'


const Creator = () => {

  return (
    <section className='w-full h-screen relative mt-18 p-10'>
      <div className=' w-125 h-2xl flex flex-col border border-gray-400 place-items-start p-3 pl-5 rounded-lg shadow-text-justify bg-gray-100'>
        <h1 className='font font-medium'>
          Material Generator
        </h1>
        <p className='font text-gray-500'>
          Based on Reports, here we can generate some materials <br/>
          that could help classes or individual students improve.
        </p>
      </div>

      <div className='space-y-4 p-1 mt-5'>
        {classes.map((classData, index) => (
          <ClassCard 
            key={index} 
            image={classData.image} 
            title={classData.title} 
            description={classData.description} 
          />
        ))}
      </div>
    </section>
  )
}

export default Creator