import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 absolute top-0 left-0 right-0 w-full bg-transparent z-10 outline-1">
        <NavLink className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold'>
            <p className=' p-2 outline-2 rounded'>
                SC
            </p>    
        </NavLink>
        <nav className='flex text-sm gap-4 font-medium p-1 rounded-2xl'>
        <NavLink 
            to="/Classroom" 
            className={({ isActive }) => 
            `${isActive ? "text-blue-600" : ""} outline-gray-500 p-1 rounded`
            }
        >
            Classroom
        </NavLink>
        <NavLink 
            to="/Quizzes" 
            className={({ isActive }) => 
            `${isActive ? "text-blue-600" : ""} outline-gray-500 p-1 rounded`
            }
        >
            Quizzes
        </NavLink>
        <NavLink 
            to="/Creator" 
            className={({ isActive }) => 
            `${isActive ? "text-blue-600" : ""} outline-gray-500 p-1 rounded`
            }
        >
            Creator
        </NavLink>
        <NavLink 
            to="/coursePlanner" 
            className={({ isActive }) => 
            `${isActive ? "text-blue-600" : ""} outline-gray-500 p-1 rounded`
            }
        >
            Course Planner
        </NavLink>
        <NavLink 
            to="/Support" 
            className={({ isActive }) => 
            `${isActive ? "text-blue-600" : ""} outline-gray-500 p-1 rounded`
            }
        >
            Support
        </NavLink>
        <NavLink 
            to="/Sign-out" 
            className={({ isActive }) => 
            `${isActive ? "text-blue-600" : ""} outline-1 bg-gray-200 outline-gray-500 p-1.5 rounded`
            }
        >
            Sign-out
        </NavLink>
        </nav>
        
        
    </header>
  )
}

export default Navbar;
