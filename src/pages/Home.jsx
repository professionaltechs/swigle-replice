import React from 'react'

// COMPONENTS
import Navbar from '../components/Navbar'
import Upload from '../components/Upload'
import Features from '../components/Features'

// STYLES
import '../styles/home.css'

const Home = () => {
    return (
        <>
            <div className='homeTop'>
                <Navbar />
                <Upload />
            </div>
            <Features />
        </>
    )
}

export default Home
