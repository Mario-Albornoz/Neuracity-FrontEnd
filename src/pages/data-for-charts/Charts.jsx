import { Car } from 'lucide-react';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

import { barData, lineData } from '../../constants';


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