const request = require('postman-request')

const forecast = ({latitude, longitude}, units = 'm', callback) => {
    const baseURL = 'http://api.weatherstack.com/current'
    const access_key = '35bdcd88f6d564ee23f85c2a977b91b0'
    const url = baseURL+'?access_key='+access_key+'&query='+latitude+','+longitude+'&units='+units

    request({ url: url, json: true }, (error, { body } = {}) => {
        const {location, current, error:msgerror} = body
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (msgerror) {
            callback('Unable to get forecast.', undefined)
        } else {
            var msg = 'Currently the temperature is '
            msg = msg + current.temperature
            msg = msg + ' degrees. It feels like '
            msg = msg + current.feelslike
            msg = msg + ' degrees out.'
            const forecast = {
                msg,
                img: current.weather_icons[0],
                location: location.name + ',' + location.region + ' of ' + location.country
            }
            callback(undefined,forecast)
        }
    
    })
}

module.exports = {
    forecast: forecast
}