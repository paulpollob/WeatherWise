// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyB0VNVSNb9sE7NswkmCGMrPtUbAQoRhBCk"
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(MyComponent)


import React, { useEffect, useState } from 'react';


const Map = ({setLoading, setSelectedLocation}) => {




    useEffect(() => {
        const initMap = async () => {
            // Request needed libraries.
            const { Map } = await google.maps.importLibrary("maps");
            const myLatlng = { lat: -25.363, lng: 131.044 };
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 3,
                center: myLatlng,
            });
            
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: myLatlng,
            });

            infoWindow.open(map);
            // Configure the click listener.
            map.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                // console.log("HK: ", mapsMouseEvent)
                infoWindow.close();
                // Create a new InfoWindow.
                // console.log("HK: ", mapsMouseEvent.latLng.toJSON().lat)
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
                );
                infoWindow.open(map);

                d(mapsMouseEvent.latLng.toJSON())
            });
            const d = (d) => {
                setLoading(true)
                console.log("HK: ", d) 
                fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${d.lat}&lon=${d.lng}&limit=5&appid=e6b731ec3093e2d9e6423df6ab8f71f7`,
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(data => { setSelectedLocation(data[0].name) })
                .catch(e => console.log(e))
            }
        }

        initMap();
    })

    return (
        <div id='map' className='h-full w-full rounded-2xl  text-slate-950 '></div>
    );
};

export default Map;