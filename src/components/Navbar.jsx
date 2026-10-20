import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between py-3 text-white bg-purple-900'>
            <div className="logo">
                <span className='text-xl font-bold mx-7'>MyTask</span>
            </div>
            <ul className='flex gap-4 mx-7'>
                <li className='transition-all duration-100 cursor-pointer hover:font-bold'>Home</li>
                <li className='transition-all duration-100 cursor-pointer hover:font-bold'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
