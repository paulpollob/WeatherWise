import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";


const Header = ({setLoading, setSelectedLocation, degree, setDegree}) => {

    // const [degree, setDegree] = useState(true)

    // Get current day
    const date = new Date()
    const weekday = date.toLocaleString("default", { weekday: "short" })
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.toLocaleString("default", { year: "numeric" })
    

    const search = (event) =>
    {
        event.preventDefault()
        setLoading(true)
        const value = event.target.location.value;
        fetch(`http://api.weatherapi.com/v1/search.json?key=2746d2000dbe4f92bc7180151240904&q=${value}`,{
            method: 'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.length>0) setSelectedLocation(data[0].name)
            else {setLoading(false);alert("Sorry location not found!!! Please enter a valid name.")}
        })
        .catch(e=>console.log(e))
        // setSelectedLocation(form.location.value)
    }

    return (
        <div className='flex flex-col gap-4 md:flex-row justify-between'>
            <div className='flex   gap-4'>

                <img className='h-12 rounded-full' src="https://i.ibb.co/VvgKqTy/Whats-App-Image-2024-03-27-at-20-44-54-7b85a8fe.jpg" alt="Whats-App-Image-2024-03-27-at-20-44-54-7b85a8fe" border="0" />
                <div>
                    <small>Hello, Prokash!!!</small>
                    <p>{weekday + ", " + day + " " + month + ", " + year}</p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex items-center bg-zinc-600 rounded-3xl px-3  border-slate-100 gap-2'>
                    <CiSearch />
                    <form className='flex' onSubmit={search}><input name='location' className='bg-transparent border-none focus:outline-none w-auto '  type='text' placeholder='Search city or postcode'></input><button className='border border-slate-50 p-2' type='submit'>search</button></form>
                </div>

                <div className='py-3 text-center bg-zinc-600 rounded-3xl px-3'>
                    <select className='rounded-3xl text-center  focus:outline-none bg-zinc-600 ' name="lang" id="cars">
                        <option selected value="Eng">Eng</option>
                        <option value="Bng">Bng</option>
                    </select>
                </div>
                <div className='py-3 px-1 flex justify-center items-center bg-zinc-600 rounded-3xl'>
                    <div className='relative flex'>
                        <p onClick={()=>setDegree(false)} className={`cursor-pointer z-40  transition-all duration-1000 ${!degree ? 'text-slate-950':'text-slate-300'} py-1 px-2`}>C&deg;</p>
                        <p onClick={()=>setDegree(true)} className={`cursor-pointer z-40  transition-all duration-1000 ${degree ? 'text-slate-950':'text-slate-300'} py-1 px-2`}>F&deg;</p>
                        <p className={` absolute transition-all duration-1000  py-1 px-3 ${degree?'end-0':'end-2/4'} bg-slate-400 rounded-2xl text-slate-400`}>F</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;