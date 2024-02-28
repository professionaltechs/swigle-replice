import React from 'react'

// ICONS
import { GoFileCode } from "react-icons/go";

// STYLING
import '../styles/features.css'

const Features = () => {
    return (
        <div className='featuresMain'>
            <div className='offeringHeadings'>
                <h1>Offerings</h1>
            </div>
            <div className='featuresCards'>
                <div className='card'>
                    <GoFileCode className='cardLogo'/>
                    <h3 className='cardHeading'>Multiple Uploads</h3>
                    <p className='cardPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's</p>
                </div>
                <div className='card'>
                    <GoFileCode className='cardLogo'/>
                    <h3 className='cardHeading'>Send via Emai</h3>
                    <p className='cardPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's</p>
                </div>
                <div className='card'>
                    <GoFileCode className='cardLogo'/>
                    <h3 className='cardHeading'>Create Links</h3>
                    <p className='cardPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's</p>
                </div>
                <div className='card'>
                    <GoFileCode className='cardLogo'/>
                    <h3 className='cardHeading'>Monitor Transfers</h3>
                    <p className='cardPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's</p>
                </div>
                <div className='card'>
                    <GoFileCode className='cardLogo'/>
                    <h3 className='cardHeading'>Receive Notifications</h3>
                    <p className='cardPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's</p>
                </div>
                <div className='card'>
                    <GoFileCode className='cardLogo'/>
                    <h3 className='cardHeading'>Handle Transfers</h3>
                    <p className='cardPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's</p>
                </div>
            </div>
        </div>
    )
}

export default Features
