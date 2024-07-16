import React, { useState } from 'react';
import imageOne from 'D:/projects/bro-code/src/assets/pngtree-vector-search-icon-png-image_320926.jpg';
import imageThree from 'D:/projects/bro-code/src/assets/316296_wind_icon.png';
import imageFour from 'D:/projects/bro-code/src/assets/humidity-4-48.png';
import axios from 'axios';

function Weather() {

    const [value, setValue] = useState({
        temperature: 10,
        cityName: 'Multan',
        humidity: 20,
        velocity: 10,
        image: 'https://i.pinimg.com/564x/5d/bf/b7/5dbfb7e9eeed40c97ae9cb13b46aad91.jpg'
    })

    const [name, setName] = useState('');

    const handleChange = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7f64404d19c54d87b89017a3077666cb&units=metric`;
            axios.get(apiUrl)
                .then(result => {
                    let imagePath = '';
                    if(result.data.weather[0].main == 'Clear'){
                        imagePath = 'https://i.pinimg.com/564x/5d/bf/b7/5dbfb7e9eeed40c97ae9cb13b46aad91.jpg';
                    }
                    else if(result.data.weather[0].main == 'Clouds'){
                        imagePath = 'https://i.pinimg.com/564x/2e/a1/9d/2ea19da12810d1ef43368f86423c7485.jpg';
                    }
                    else if(result.data.weather[0].main ==  "Rain"){
                        imagePath = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png';
                    }
                    else if(result.data.weather[0].main ==  "Drizzle"){
                        imagePath = 'https://i.pinimg.com/564x/de/4f/61/de4f618c20951e5c725511c9e2c69649.jpg';
                    }
                    else if(result.data.weather[0].main ==  "Mist"){
                        imagePath = 'https://i.pinimg.com/564x/5c/2a/ef/5c2aef00f599a1b7b82a0a298c457ecb.jpg';
                    }
                    else{
                        imagePath = 'https://i.pinimg.com/564x/5d/bf/b7/5dbfb7e9eeed40c97ae9cb13b46aad91.jpg';
                    }
                    console.log(result.data)
                    setValue({
                        ...value,
                        temperature: result.data.main.temp,
                        cityName: result.data.name,
                        humidity: result.data.main.humidity,
                        velocity: result.data.wind.speed,
                        image: imagePath
                    })
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='Container'>
            <div className="Weather">
                <div className="Search">
                    <input placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button>
                        <img src={imageOne} alt='Search' onClick={handleChange} />
                    </button>
                </div>
                <div className="Info">
                    <img src={value.image} alt='Weather' />
                    <div className="centertext">
                        <h1>{Math.round(value.temperature)}°C</h1>
                        <h3>{value.cityName}</h3>
                    </div>
                </div>
                <div className="Details">
                    <div className="col">
                        <img src={imageThree} alt='Speed' />
                        <div className='Speed'>
                            <p>{Math.round(value.velocity)}Km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src={imageFour} alt='Humidity' />
                        <div className='Humidity'>
                            <p>{Math.round(value.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
