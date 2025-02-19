import { Car } from 'lucide-react';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const barData = [
    { name: 'Alice', PreTest: 70, MidTerm: 85 },
    { name: 'Bob', PreTest: 65, MidTerm: 75 },
    { name: 'Charlie', PreTest: 50, MidTerm: 60 },
    { name: 'Diana', PreTest: 85, MidTerm: 90 },
    { name: 'Evan', PreTest: 80, MidTerm: 78 },
];

const lineData = [
    { name: 'Q1', avg: 65 },
    { name: 'Q2', avg: 70 },
    { name: 'Q3', avg: 72 },
    { name: 'Q4', avg: 80 },
]


const Charts = () => {
  return ( 
    <div className='flex justify-center  gap-8 w-full p-3'>
        <div className='border p-4 rounded-lg bg-white'>
            <BarChart width={400} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="PreTest" fill="#90cdf4" />
                <Bar dataKey="MidTerm" fill="#5a9bd5" />
            </BarChart>
        </div>
        <div className='border p-4 rounded-lg bg-white'>
            <LineChart width={400} height={300} data={lineData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
                <CartesianGrid strokeDasharray="0"/>
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke='#82ca9d' strokeWidth={3}/>
            </LineChart>

        </div>

    </div>
  )
}

export default Charts