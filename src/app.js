const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const weather = require('./assets/weather')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')
const app = express()
const port = process.env.PORT || 3000

// sets up hbs to be used as the view engine
app.set('view engine', 'hbs')
// used to override the views folder to something custom
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brad Sweet'
    })
})

app.get('/index',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brad Sweet'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brad Sweet'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need help finding the weather?',
        name: 'Brad Sweet'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Brad Sweet',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'            
        })
    }
    
    geocode.geoCode(req.query.address, (error, location = {}) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            weather.forecast(location, req.query.units, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                return res.send({
                    address: req.query.address,
                    units: req.query.units,
                    forecast
                })
            }
        })
        }
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Brad Sweet',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})