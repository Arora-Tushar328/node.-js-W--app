const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a9067fb5cb53b8df50c7eb9614e6455e&query='+ latitude + ',' + longitude + '&units=f' 

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