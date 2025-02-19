import React from 'react'

const ClassCard = ({image,title,description}) => {
  return (
    <div className='flex border border-gray-500 rounded-lg p-4 shadow-md items-center w-full bg-white'>
        {/* image */}
        <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md"/>

        {/* text for the card */}
        <div className='flex-1 p-4'>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600">{description}</p>

            <button className="mt-2 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200">Generate</button>
        </div>
    </div>
  )
}

export default ClassCard