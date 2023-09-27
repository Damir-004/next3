"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const Weather = () => {
  const [city, setCity] = useState('Tashkent');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4928b646db77b09c5101504d057da259`
      );

      setWeatherData(response.data);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      await fetchWeatherData();
    }
  };

  useEffect(() => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, weather, main, wind, visibility, sys } = weatherData;
  const { description, icon } = weather[0];

  return (
    <div className='container'>
      
      
      <div className='main'>
        <div className='left white'>
          <h1>{name}, {sys.country}</h1>
          <span>{description}</span>
          <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt='Weather Icon' />
          <div className='temperature'>{Math.round(main.temp - 273.15)}°C</div>
          <div className='temperature'>{Math.round(((main.temp - 273.15)*1.8)+32)}°F</div>
        </div>

        <div className='right'>
          <div className='top_right main'>
            <div> {format(new Date(), 'dd MMMM yyyy HH:mm')} / {format(new Date(), 'hh:mm')} PM</div>
            <form onSubmit={handleSearch}>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter city'
              />
              <button type='submit'>Search</button>
            </form>
          </div>
          {error && <h1 className='error'>Error There is no such country</h1>}
          <div className='center_right'>
            <div className='center-top_right'>
              <div className='white center-box'>
                <img width='70px' src='https://cdn-icons-png.flaticon.com/128/471/471537.png'/>
                <p className='p'><span>Humidity</span> {main.humidity}<span>%</span></p>
              </div>
              <div className='white center-box'>
                <img width='70px' src='https://cdn-icons-png.flaticon.com/128/1527/1527248.png'/>
                <p className='p'><span>Visibility</span> {Math.round(visibility / 1000)} <span>km</span></p>
                <p className='p'><span>Visibility</span> {Math.round(visibility / 1609)} <span>miles</span></p>
              </div>
            </div>
            <div className='center-center_right'>
              <div className='white center-box'>
                <img width='70px' src='https://cdn-icons-png.flaticon.com/128/2531/2531724.png' />
                <p className='p'><span>Wind speed</span> {wind.speed} <span>m/s</span></p>
              </div>
              <div className='white center-box'>
                <span className='sun'/>
                <img width='70px' src='https://cdn-icons-png.flaticon.com/128/287/287667.png'/>
                {<p className='p'><span>Sunrise</span> {format(new Date(sys.sunrise * 1000), 'HH:mm')}</p>}:{
                <p className='p'><span>Sunrise</span> {format(new Date(sys.sunrise * 1000), 'hh:mm')}<span>AM</span></p>}
              </div>
            </div>
            <div className='center-bottom_right'>
              <div className='white center-box'>
                <img width='70px' src='https://cdn-icons-png.flaticon.com/128/9027/9027237.png'/>
                <p className='p'><span>Wind derection</span>{}</p>
              </div>
              <div className='white center-box'>
                <img width='70px' src='https://cdn-icons-png.flaticon.com/128/287/287668.png'/>
                <p className='p'><span>Sunset</span> {format(new Date(sys.sunset * 1000), 'HH:mm')}</p>

                <p className='p'>{format(new Date(sys.sunset * 1000), 'hh:mm')}PM</p>
              </div>
            </div>
          </div>

          <div className='bottom_right'>
            <span className='span'>Metric Sistem</span>
            <span className='span'>Imperial Sistem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
