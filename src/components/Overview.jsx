import React, { Component, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Overview = ({ overview }) => {


    const [chartData, setChartData] = useState(0)

    const avghumidity = overview.map((d) => d.day.avghumidity)
    const uv = overview.map((d) => d.day.uv);
    const avgTemp = overview.map((d) => d.day.avgtemp_c);
    const avgviskm = overview.map((d) => d.day.avgvis_km);



    const date = overview.map((d) => d.date)
    // console.log("HK: ", date)
    const dataH = date.map((d, index) => ({ x: new Date(d), y: avghumidity[index] }))
    const dataU = date.map((d, index) => ({ x: new Date(d), y: uv[index] }))
    const dataT = date.map((d, index) => ({ x: new Date(d), y: avgTemp[index] }))
    const dataV = date.map((d, index) => ({ x: new Date(d), y: avgviskm[index] }))
    console.log("HK: data is: ", dataH)

    const options = {
        animationEnabled: true,
        backgroundColor: "#52525b",
        fontColor: '#ffffff',
        title: {
            fontColor: "white"
        },
        axisX: {
            fontColor: "white", 
        },
        axisY: {
            title: "asdf (in USD)",
            fontColor: "#ffffff"
        },
        data: [{
            yValueFormatString: "text",
            xValueFormatString: "text",
            type: "spline",
            fontColor: '#ffffff',
            dataPoints: (chartData==0)?dataH:(chartData==1)?dataU:(chartData==2)?dataT:dataV
        }]
    }
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
                        <p className={`w-1/4 h-full absolute transition-all duration-500 py-1 px-1 start-3/4 bg-slate-400 rounded-full text-slate-400`}>Hum</p>
                    </div>
                </div>
            </div>
            <CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
};

export default Overview;