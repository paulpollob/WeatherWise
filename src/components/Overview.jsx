import React, { Component, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Overview = ({ overview }) => {


    const [chartData, setChartData] = useState(0)

    const avghumidity = overview.map((d) => d.day.avghumidity)
    const uv = overview.map((d) => d.day.uv);
    const avgTemp = overview.map((d) => d.day.avgtemp_c);
    const avgviskm = overview.map((d) => d.day.avgvis_km);



    const date = overview.map((d) => d.date)
    // console.log("HK: ", date)
    const dataH = date.map((d, index) => ({ x: d, a: avghumidity[index], b: uv[index], c: avgTemp[index], d: avgviskm[index] }))
    console.log("HK: data is: ", dataH)


    const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page b', uv: 250, pv: 1300, amt: 400 }, { name: 'Page b', uv: 250, pv: 1300, amt: 400 }];

  
    const renderLineChart = (
        <ResponsiveContainer width={"100%"} height={300} >
            <LineChart data={dataH} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey={(chartData == 0) ? "a" : (chartData == 1) ? "b" : (chartData == 2) ? "c" : "d"}
                 stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );

    return (
        <div className=' p-5 '>
            <div className='flex flex-col md:flex-row gap-4 justify-between'>
                <h1 className='text-3xl font-serif'>Overview </h1>

                <div className='bg-slate-800 rounded-full p-1'>
                    <div className='relative flex bg-slate-800 rounded-full '>
                        <p onClick={() => setChartData(0)} className={`w-1/4  cursor-pointer transition-all duration-500 z-40 ${(chartData == 0) ? 'text-slate-950' : 'text-slate-300'} py-1 px-2`}>Hum</p>
                        <p onClick={() => setChartData(1)} className={`w-1/4  cursor-pointer transition-all duration-500 z-40 ${(chartData == 1) ? 'text-slate-950' : 'text-slate-300'} py-1 px-2`}>UVi</p>
                        <p onClick={() => setChartData(2)} className={`w-1/4  cursor-pointer transition-all duration-500 z-40 ${(chartData == 2) ? 'text-slate-950' : 'text-slate-300'} py-1 px-2`}>Tmp</p>
                        <p onClick={() => setChartData(3)} className={`w-1/4  cursor-pointer transition-all duration-500 z-40 ${(chartData == 3) ? 'text-slate-950' : 'text-slate-300'} py-1 px-2`}>Vis</p>
                        <p className={`w-1/4 h-full absolute transition-all duration-500 py-1 px-1 start-01/4 ${(chartData == 0)&&'start-0'} ${(chartData == 1)&&'start-1/4'} ${(chartData == 2)&&'start-2/4'} ${(chartData == 3)&&'start-3/4'} bg-slate-400 rounded-full text-slate-400`}>Hum</p>
                    </div>
                </div>
            </div>



            {
                renderLineChart
            }







        </div>
    );
};

export default Overview;