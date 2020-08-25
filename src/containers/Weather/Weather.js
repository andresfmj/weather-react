import React from 'react';

import "./Weather.scss";
import { useState, useEffect } from 'react';

import { TOKEN_AUTH, API_URL } from '../../helpers/constants';

function Weather(props) {
    const [weather, setWeather] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchWeatherData = async () => {
        setLoading(true)
        let response = await fetch(`${API_URL}/forecast?appid=${TOKEN_AUTH}&units=metric&q=Bucaramanga`)
        response = await response.json()
        if (response.cod == '200') {
            setWeather(response.list)
        } else {

        }
        setLoading(false)
    }

    useEffect(() => {
        fetchWeatherData()
    }, [])

    return (
        <div className="Weather">
            <p>Weather</p>
        </div>
    )
}

export default Weather;
