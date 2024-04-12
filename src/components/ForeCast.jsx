import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const ForeCast = ({ selectedLocation, degree, setDegree, forecast, setForcarst }) => {

 
    const scroll = (d) => {
        document.getElementById('scroll').scrollBy({ left: d, behavior: 'smooth' });
    }
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row justify-center items-center md:justify-between'>
                <img className='w-1/4 md:w-1/12 transition-all duration-500 hover:bg-slate-900  hover:scale-90 hover: bg-slate-400 rounded-full md:rounded-full ' src={forecast?.current?.condition?.icon}></img>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>{forecast?.location?.name}</h1>
                    <small>{forecast?.location?.country}</small>
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>{degree ? forecast?.current?.temp_f : forecast?.current?.temp_c}<sup>o</sup></h1>
                    <small>Temperature</small>
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>{forecast?.current?.humidity}<sub>%</sub></h1>
                    <small>Humidity</small>
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>13<sub>km/h</sub></h1>
                    <small>Wind speed</small>
                </div>
            </div>
            <div id='scroll' className='flex flex-col md:flex-row gap-4 p-2 overflow-auto md:overflow-hidden relative z-30'>
                <button onClick={()=>scroll(-100)} className='invisible md:visible bg-slate-900 p-1 sticky border-1 border-slate-950 shadowd-inner rounded-full shadow-slate-200 text-2xl h-full start-0 top-1/3 hover:border-none focus:outline-none'><IoIosArrowDropleft /></button>
                {
                    forecast?.forecast?.forecastday[0].hour?.map((d, index) =>
                        <Cast key={index} d={d} degree={degree}></Cast>
                    )
                }
                <button onClick={()=>scroll(100)} className='invisible md:visible bg-slate-900 p-1 sticky border-1 border-slate-950 shadowd-inner rounded-full shadow-slate-200 text-2xl h-full end-0 top-1/3 hover:border-none focus:outline-none'><IoIosArrowDropright /></button>

            </div>
        </div>
    );
};


const Cast = ({ d, degree }) => { 

    const milliseconds = d?.time_epoch * 1000;

    // Create a new Date object with the milliseconds
    const dateObject = new Date(milliseconds);
    const hour = ('0' + dateObject.getHours()).slice(-2);
    const minute = ('0' + dateObject.getMinutes()).slice(-2);
    const second = ('0' + dateObject.getSeconds()).slice(-2);

    return (
        <div className='transition-all duration-500 hover:bg-slate-500  hover:scale-90 bg-slate-800 p-3 shadow-md items-center shadow-white rounded-lg flex flex-col '>
            <small>{hour + ":" + minute}</small>
            <img src={d?.condition.icon}></img>
            <small>{degree ? d.temp_f : d.temp_c}<sup>o</sup></small>
        </div>
    )
}

export default ForeCast;