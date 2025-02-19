import React, { useState } from 'react';0

import { Button, Card, Select } from "../components/ui";
import Charts from './data-for-charts/Charts';

const Classroom = () => {
    const [selectedClass, setSelectedClass] = useState("Year 10");


  return (
    <section className="w-full h-screen relative mt-18">
        <div className='flex flex-col items-center justify-self-auto h-[350px] text-center bg-gray-200'>
            <div className='flex flex-col items-center justify-center p-20'>
                <h1 className="text-6xl font-bold">Welcome!</h1>
                <p className="font">Mr. Müller</p> 
                <p className="font">Current Classroom:</p>
                <p className="text-gray-400 p-2">Showing data for:</p>
                <span className='flex flex-col items-center justify-center text-screen p-2'>
                <Select 
                value={selectedClass}
                onChange={setSelectedClass}
                className="w-2 h-8 p-2 text-sm outline-1 rounded-md">
                    <option>Year 10</option>
                    <option>Year 11</option>
                    <option>Year 12</option>
                </Select>
                </span>
            </div>
            {/* chart */}
            <Charts />
        </div>
        
    </section>
  )
}

export default Classroom