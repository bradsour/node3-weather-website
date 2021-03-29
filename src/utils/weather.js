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
            var msg = 'Currently it is '
            msg = msg + current.weather_descriptions[0]
            msg = msg + ' in '
            msg = msg + location.name
            msg = msg + ', ' + location.region
            msg = msg + ' of ' + location.country
            msg = msg + '. The temperature is '
            msg = msg + current.temperature
            msg = msg + ' degrees. It feels like '
            msg = msg + current.feelslike
            msg = msg + ' degrees out.'
            callback(undefined,msg)
        }
    
    })
}

module.exports = {
    forecast: forecast
}