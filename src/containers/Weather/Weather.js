import React from 'react';

import "./Weather.scss";
import { useState } from 'react';

import { TOKEN_AUTH, API_URL, iconsForecast } from '../../helpers/constants';

import moment from 'moment';


function Weather(props) {
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [queryText, setQueryText] = useState('')
    
    let weekday = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    let day = new Date()


    const fetchWeatherData = async () => {
        setLoading(true)
        setError('')
        let response = await fetch(`${API_URL}/forecast?appid=${TOKEN_AUTH}&units=metric&q=${queryText}`)
        response = await response.json()
        if (response.cod == '200') {
            console.log(response)

            let now = new Date()
            let arr = []
            for (let i = 0; i < response.list.length; i++) {
                let dt = response.list[i].dt
                let date = new Date(dt * 1000)
                if (!arr[date.getDate()]) {
                    arr[date.getDate()] = []
                    if (!arr[date.getDate()][date.getDay()]) {
                        arr[date.getDate()][date.getDay()] = [
                            {
                                weekday: weekday[date.getDay()],
                                max: (response.list[i].main.temp_max).toFixed(0),
                                min: (response.list[i].main.temp_min).toFixed(0),
                                time: moment(date).format('hh:mm a'),
                                icon: response.list[i].weather[0].icon
                            }
                        ]
                    } else {
                        arr[date.getDate()][date.getDay()].push({
                            weekday: weekday[date.getDay()],
                            max: (response.list[i].main.temp_max).toFixed(0),
                            min: (response.list[i].main.temp_min).toFixed(0),
                            time: moment(date).format('hh:mm a'),
                            icon: response.list[i].weather[0].icon
                        })
                    }
                } else {
                    arr[date.getDate()][date.getDay()].push({
                        weekday: weekday[date.getDay()],
                        max: (response.list[i].main.temp_max).toFixed(0),
                        min: (response.list[i].main.temp_min).toFixed(0),
                        time: moment(date).format('hh:mm a'),
                        icon: response.list[i].weather[0].icon
                    })
                }
            }
            
            setWeather({
                city: response.city.name,
                country: response.city.country,
                days: arr
            })

        } else {
            setError(`${response.cod} ${response.message}`)
        }
        setLoading(false)
    }


    const getWeatherHandler = () => {
        fetchWeatherData()
    }


    return (
        <div className="Weather">
            <div className="Weather-searchbar">
                <div className="input-form">
                    <input type="text" onChange={(e) => setQueryText(e.target.value)} value={queryText} />
                    <button onClick={getWeatherHandler}>Obtener pronosticos</button>
                </div>
            </div>
            <div className="Weather-results">
                {weather && (
                    <header>
                        <h2>{`${weather.city}, ${weather.country}`} </h2>
                    </header>
                )}
                <div className="Weather-forecast">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {weather && (
                        <div className='Days-container'>
                            {weather.days.map((days, d) => (
                                <div className='Days-inner' key={d}>
                                    <h2>{`${d}`}</h2>
                                    <div className='Days-inner-container'>
                                        {days.map((item, i) => (
                                            <div className='Days-inner-item' key={i}>
                                                <h3>{weekday[i]}</h3>
                                                <ul>
                                                    {item.map((dw, j) => (
                                                        <li key={j}>
                                                            <p className='text-center'><i className={`wi ${iconsForecast[dw.icon]}`}></i></p>
                                                            <p><span className="bold">Max: </span>{dw.max}º</p>
                                                            <p><span className="bold">Min: </span>{dw.min}º</p>
                                                            <p>{dw.time}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Weather;
