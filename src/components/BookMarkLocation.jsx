import React from 'react';
import { IoAddCircle } from 'react-icons/io5';

const BookMarkLocation = ({dilgOpn, setDilgOpn, bookLocationWeather}) => {
    return (
        <div className='flex gap-4 overflow-auto p-4'>
            <Insert setDilgOpn={setDilgOpn}></Insert> 
            {
                bookLocationWeather?.map((d, index)=>
                <Location key={index} d={d}></Location>
            )
            }
        </div>
    );
};

const Insert = ({setDilgOpn}) => {
    return (
        <div onClick={()=>setDilgOpn(true)} className='w-36 cursor-pointer transition-all duration-500 hover:bg-slate-600 bg-slate-800 relative p-5 hover:scale-90 border border-dashed rounded-lg flex flex-col gap-5 items-center justify-center'>
            <IoAddCircle className='absolute bottom-1/2 h-full text-4xl' />
            <h1 className='text-center'>World<br />ForeCast</h1>
            <small>Add the cities you are interested in.</small>
        </div>
    )
}

const Location = ({d}) => { 
    return (
        <div className='transition-all duration-500 hover:bg-slate-600 bg-slate-800  hover:scale-90 w-36 relative p-0 border rounded-lg flex flex-col gap-5 items-center justify-center'>
            <img className='absolute bottom-1/2 h-full p-8' src={d.current.condition.icon}></img>
            <div>
                <h1 className='text-center'>{d.location.name}<br /><small>{d.location.country}</small></h1>

            </div>
            <h1>{d.current.temp_c}<sup>o</sup>C</h1>
        </div>
    )
}


export default BookMarkLocation;