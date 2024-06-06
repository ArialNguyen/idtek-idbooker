import React from 'react'
import '@/app/daynight.css';
type Props = {}

export default function DayNight({ }: Props) {
    return (
        <div>
            <div className="container">
                <div className="switch">
                    <label htmlFor="toggle">
                        <input id="toggle" className="toggle-switch" type="checkbox" />
                        <div className="sun-moon"><div className="dots"></div></div>
                        <div className="background"><div className="stars1"></div><div className="stars2"></div></div>
                        <div className="fill"></div>
                    </label>
                </div>
            </div>
            <div className="credit"><span>A rehash of <a href="https://dribbble.com/shots/1907553-Day-Night-Toggle-Button" target="_blank">Ramakrishna V's concept on Dribbble</a></span></div>
        </div>
    )
}