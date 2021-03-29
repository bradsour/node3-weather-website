const request = require('postman-request')

const geoCode = (location, callback) => {

    const geoCodeBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const geocodeAccess_Token = 'pk.eyJ1IjoiYnJhZHNvdXIiLCJhIjoiY2ttbmhsbTB4MXVubDJ1bWlpa21mZDVkZyJ9.LyWur7megXnP1RY_zaUrFg'
    const url = geoCodeBaseURL + encodeURIComponent(location) + '.json?access_token=' + geocodeAccess_Token

    request({ url, json: true }, (error, {body}) => {
        console.log(body)
        
        if (error) {
            callback("Unable to connect to location services!", undefined)
        } else if (body.message) {
            callback("Unable to find location.", undefined)
        } 
        else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}