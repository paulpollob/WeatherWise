import React, { useState } from 'react';

const NextForeCast = ({ foreCastDay, degree }) => {
    const [threeDaysForcasts, setThreeDaysForecasts] = useState(true); 
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-serif'>Forecasts</h1>
                <div className='bg-slate-800 rounded-full p-1'>
                    <div className='relative flex bg-slate-800 rounded-full '>
                        <p onClick={() => setThreeDaysForecasts(true)} className={`cursor-pointer transition-all duration-500 z-40 ${threeDaysForcasts ? 'text-slate-950' : 'text-slate-300'} py-1 px-2`}>3 days</p>
                        <p onClick={() => setThreeDaysForecasts(false)} className={`cursor-pointer transition-all duration-500 z-40 ${!threeDaysForcasts ? 'text-slate-950': 'text-slate-300'} py-1 px-2`}>7 days</p>
                        <p className={`w-1/2 h-full absolute transition-all duration-500 py-1 px-3 ${threeDaysForcasts ? 'start-0' : 'start-2/4'} bg-slate-400 rounded-full text-slate-400`}>F</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 h-96 overflow-auto'> 
                {
                    foreCastDay?.map((dt, index) => {
                        if(threeDaysForcasts && index>2) return;  
                        else return (<Day key={index} dt={dt} degree={degree}></Day>) 
                    }
                    )
                }
            </div>
        </div>
    );
};

const Day = ({dt, degree}) => { 
    const date = new Date(dt.date)
    const weekday = date.toLocaleString("default", { weekday: "short" })
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "long" })
    return (
        <div className='transition-all duration-500 hover:bg-slate-900  hover:scale-90 flex justify-between items-center bkorder rounded-lg p-2 bg-slate-800'>
            <div className='flex items-center'>
                <img className='bg-slate-600 rounded-full' src={dt?.day?.condition?.icon}></img>
                <h1 className='text-xl'>{degree?dt?.day?.maxtemp_f:dt?.day?.maxtemp_c}<sup>o</sup><sub>/{degree?dt?.day?.mintemp_f:dt?.day?.mintemp_c}<sup>o</sup></sub></h1>
            </div>
            <h1 className='text-xl pe-4'>{day} <sub><small>{ month+", "+weekday }</small></sub></h1>
        </div>
    )
}

export default NextForeCast;