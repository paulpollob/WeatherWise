import React from 'react';
import { IoCall } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';

const AboutMe = () => {
    return (
        <div className='rounded-3xl transition-all duration-500 hover:bg-slate-900  hover:scale-90 relative flex flex-col justify-between gap-5 z-30 p-5 bg-yellow-900 overflow-hidden h-full w-full'>
            <div className='absolute -z-40 -rotate-45 -start-28 -top-10 h-full w-full rounded-3xl bg-blue-800'> hk</div>
            <div className='flex'>
                <img className='rounded-full border-2 border-slate-50 z-40 w-20' src='https://i.ibb.co/VvgKqTy/Whats-App-Image-2024-03-27-at-20-44-54-7b85a8fe.jpg'></img>
                <div className='text-slate-50 p-5 font-bold'>
                    <h1 className=''>Prokash Paul Pollob</h1>
                    <small>Web Developer</small>
                </div>
            </div>
            <div>
                <div className='text-slate-50 flex items-center gap-2'><SiGmail />paulpollob71@gmail.com</div>
                <div className='text-slate-50 flex items-center gap-2'><IoCall />+8801709005321</div>
            </div>
            <div className='-z-40 bg-teal-700 rounded-s-full w-full h-3/6 absolute'></div>
        </div>
    );
};

export default AboutMe;