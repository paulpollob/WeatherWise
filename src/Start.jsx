import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Map from './Map';
import ForeCast from './components/ForeCast';
import Overview from './components/Overview';
import NextForeCast from './components/NextForeCast';
import Loading from './Page/Loading';
import BookMarkLocation from './components/BookMarkLocation';
import AboutMe from './components/AboutMe';
import Dialog from './components/Dialog';

const Start = () => {

    const [dilgOpn, setDilgOpn] = useState(false);
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [degree, setDegree] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState("Sylhet")
    const [forecast, setForcarst] = useState()
    const [bookLocation, setBookLocation] = useState([])
    const [bookLocationWeather, setBookLocationWeather] = useState([12, 12])
    const [overview, setOverview] = useState([])


    useEffect(() => {
        const jsonLocation = localStorage.getItem("location");
        const location = JSON.parse(jsonLocation);
        console.log("HK: location: ", location)
        setBookLocation(location)

    }, [])

    useEffect(() => {
        let ar = []
        bookLocation?.forEach((element, index) => {
            console.log('Element at index ' + index + ': ' + element);
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=2746d2000dbe4f92bc7180151240904&q=${element}`,
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(data => { ar.push(data) })
                .catch(e => console.log(e))
        });
        setBookLocationWeather(ar)
    }, [bookLocation])

    useEffect(() => {

        const f = () => {
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=2746d2000dbe4f92bc7180151240904&q=${selectedLocation}&days=7`,
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(data => { setForcarst(data); setLoading(false) })
                .catch(e => console.log(e))
        }
        f()
    }, [selectedLocation])


    useEffect(() => {

        const today = new Date();


        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        // Format the date as yyyy-mm-dd
        const tomorrowFormattedDate = tomorrow.toISOString().split('T')[0];

       
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        
        const formattedDate = sevenDaysAgo.toISOString().split('T')[0];
 

        // console.log(`my fetch data: http://api.weatherapi.com/v1/history.json?key=2746d2000dbe4f92bc7180151240904&q=${selectedLocation}&dt=${formattedDate}&end_dt=${tomorrowFormattedDate  }`); // Output: yyyy-mm-dd
        const fe = () => {
            fetch(`https://api.weatherapi.com/v1/history.json?key=2746d2000dbe4f92bc7180151240904&q=${selectedLocation}&dt=${formattedDate}&end_dt=${tomorrowFormattedDate}`,
                {
                    method: "POST"
                })
                .then(res => res.json())
                .then(data => { setOverview(data.forecast.forecastday); console.log("HK previdous: ", data); setLoading2(false) })
                .catch(e => console.log(e))
        }
        fe()
    }, [])

    return (
        (loading || loading2) ? <Loading></Loading> :
            <div className='flex flex-col gap-6'>
                <div className='absolute'><Dialog setBookLocation={setBookLocation} dilgOpn={dilgOpn} setDilgOpn={setDilgOpn}></Dialog></div>
                <Header setLoading={setLoading} degree={degree} setDegree={setDegree} setSelectedLocation={setSelectedLocation}></Header>
                <div className='px-3 flex flex-col md:flex-row gap-5'>
                    <div className='md:w-9/12 p-5 border border-slate-400 rounded-3xl bg-zinc-600'>
                        <ForeCast degree={degree} setDegree={setDegree} selectedLocation={selectedLocation} forecast={forecast} setForcarst={setForcarst} ></ForeCast>
                    </div>
                    <div className='md:w-3/12 border h-auto border-slate-400 rounded-3xl bg-zinc-600'>
                        <Map setLoading={setLoading} setSelectedLocation={setSelectedLocation}></Map>
                    </div>
                </div>
                <div className='px-3 flex flex-col md:flex-row gap-5'>
                    <div className='md:w-9/12 p-5 border border-slate-400 rounded-3xl bg-zinc-600'>
                        <Overview overview={overview} ></Overview>
                        </div>
                    <div className='md:w-3/12 border border-slate-400 rounded-3xl bg-zinc-600 p-3'><NextForeCast foreCastDay={forecast?.forecast?.forecastday} degree={degree}></NextForeCast></div>
                </div>
                <div className='px-3 flex flex-col md:flex-row gap-5'>
                    <div className='md:w-9/12 p-5 border-slate-400 rounded-3xl bg-zinc-600'><BookMarkLocation bookLocationWeather={bookLocationWeather} setDilgOpn={setDilgOpn}></BookMarkLocation></div>
                    <div className='md:w-3/12 border border-slate-400 rounded-3xl bg-zinc-600 overflow-hidden'><AboutMe></AboutMe></div>
                </div>

            </div>
    );
};

export default Start;