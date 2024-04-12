import React, { useState } from 'react';
import pendulum from './../assets/pendulum.gif'

const Dialog = ({ dilgOpn, setDilgOpn, setBookLocation }) => {

    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState('')
    const search = (event) => {
        event.preventDefault()
        setLoading(true)
        const value = event.target.location.value
        // alert(value)
        fetch(`http://api.weatherapi.com/v1/search.json?key=2746d2000dbe4f92bc7180151240904&q=${value}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) { setLoading(false); setCity(data[0].name) }
                else { setLoading(false); alert("Sorry location not found!!! Please enter a valid name."); setCity('') }
            })
    }
    const addLocation = () =>
    { 
        alert("HK")
        let jsonLocation = localStorage.getItem("location");
        let location = JSON.parse(jsonLocation);
        if(!location) location = []
        location.push(city)
        setBookLocation(location)
        jsonLocation = JSON.stringify(location);
        localStorage.setItem('location', jsonLocation);
        setDilgOpn(false)
    }

    return (
        <div className=''>
            <dialog open={dilgOpn} className='fixed p-5 text-center h-screen z-40 w-screen bg-transparent' >

                <div className=' flex w-full h-full justify-center items-center'>
                    <div className='relative p-5 flex flex-col justify-between shadow-2xl rounded-3xl bg-slate-800 w-4/6 h-4/6'>
                        {/* <input name='searchLocation' > </input> */}
                        <form onSubmit={search} className='' >
                            <label>Search for cities:</label>
                            <input name='location' className=' bg-transparent border-none focus:outline-none w-auto p-5 ' type='text' placeholder='Search city '></input>
                            {city && <h1 className='font-bold'>location found: {city}</h1>}
                        </form>

                        <div className='flex justify-between'>
                            <button type='button' className='transition-all duration-500 hover:scale-90 hover:bg-slate-400 border border-slate-50 p-3' onClick={() => setDilgOpn(false)} >close</button>
                            <button onClick={() => addLocation()} disabled={!city} type='button' className='transition-all duration-500 hover:scale-90 hover:bg-slate-400 border border-slate-50 p-3'>Add this location</button>
                        </div>
                        {
                            loading && <div className='flex justify-center items-center absolute top-0 left-0 rounded-3xl h-full w-full bg-slate-800'>
                                <img src={pendulum} alt='loading'></img>
                            </div>
                        }
                    </div>
                </div>

            </dialog>
        </div>
    );
};

export default Dialog;