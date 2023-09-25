"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=4928b646db77b09c5101504d057da259'
        );

        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, weather, main, wind } = weatherData;
  const { description, icon } = weather[0];

  return (
    <div className='container'>
      <div className='main'>
        <div className='left'>
          <h1>{name}</h1>
          <span>{description}</span>
          <img src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt="Weather Icon"/>
          <div className='temperature'>{Math.round(main.temp - 273.15)}°C</div>
        </div>

        <div className='right'>
          <div className='top_right main'>
            <div> {format(new Date(), 'dd MMM yyyy HH:mm')}</div>
            <input type='serch'></input>
          </div>

          <div className='center_right'>
            <div className='center-top_right'>
              <div>Humidity: {main.humidity}%</div>
              <div>Visibility: {main.visibility}</div>
            </div>
            <div className='center-center_right'>
              <div>Wind speed {wind.speed} m/s</div>
              <div></div>
            </div>
            <div className='center-bottom_right'>

            </div>
          </div>

          <div className='bottom_right'></div>
          <div>Longitude: {weatherData.coord.lon}</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;