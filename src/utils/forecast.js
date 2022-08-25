const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3809d3576fca2a37698f31115753ad77&query=' + longitude + ',' +  latitude + '&units=m' 

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out." +"Pressure is :"+body.current.pressure +". Humidity Is " +body.current.humidity+ "%"+ ". UV index is " + body.current.uv_index)
        }
    })
}

module.exports = forecast