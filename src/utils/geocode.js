const request = require('request')
const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHVzaGFyYXJvcmEiLCJhIjoiY2tsbTF0cWh3MDR4dDJ2cXlocnF2NG5hciJ9.-K-X905tL8osZDGvQGqqLQ&limit=1'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('unable to find the services!',undefined)
        }else if(body.features.length === 0){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    
    })
    }
module.exports = geocode
