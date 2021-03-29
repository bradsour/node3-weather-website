const weatherForm = document.querySelector('form')
const queryLocation = document.querySelector('#queryLocation')
const queryUnits = document.querySelector('#queryUnits')
const resultError = document.querySelector('#resultError')
const resultLocation = document.querySelector('#resultLocation')
const resultForecast = document.querySelector('#resultForecast')
const resultImg = document.querySelector('#weatherIcon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = queryLocation.value
    const units = queryUnits.value

    resultError.textContent = 'Loading...'
    resultLocation.textContent = ''
    resultForecast.textContent = ''
    resultImg.textContent = ''

    fetch('/weather?address=' + location + '&units='+units).then((response) => {
        response.json().then(({error, forecast} = data) => {
            if (error) {
                resultError.textContent = error
            } else {
                resultError.textContent = ''
                resultLocation.textContent = forecast.location
                resultForecast.textContent = forecast.msg
                resultImg.src = forecast.img
            }
        })
    })
})