import React from 'react';
// import pendulum from './src/assets/pendulum.gif'
import pendulum from './../assets/pendulum.gif'

const Loading = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            {/* Hare Krishna from loading */}
            <img src={pendulum}></img>
            <h1 className='text-3xl font-dbold font-serif'>WeatherWise<sub><small>by <sub>Prokash Paul Pollob</sub></small></sub></h1>
        </div>
    );
};

export default Loading;