const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//set paths 
const pubDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')



//set express view engine and views
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)

//set Static path
app.use(express.static(pubDir))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather app',
        name: 'Tal'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name: 'Tal'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help Page',
        helpMsg:'Need any help ??',
        name: 'Tal'
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Must supply address to the uqery string'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {

        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                   error
                })
            }
              
            res.send({
                location,
                forecast: 'Wather is ' + forecastData.summary + ' with ' + forecastData.temperature + ' degrees, but feels like ' + forecastData.feels_like + ' degrees',
                address:req.query.address,
                weather_img:forecastData.img
            })        
        })
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title:'Error page',
        name:'Tal',
        errorMsg:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title:'Error page',
        name:'Tal',
        errorMsg:'Page not found'
    })
})

app.listen(port,() => {
    console.log('Server started on port ['+port+']')
})