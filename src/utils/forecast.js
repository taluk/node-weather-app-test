const request = require('postman-request')

const forecast = (lat,lon,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=61c31ba7e8a58ead86c0ae2b673e78e9&query=' + lat + ',' + lon
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                summary: body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feels_like: body.current.feelslike
            })
        } 
           
    })
}

module.exports = forecast