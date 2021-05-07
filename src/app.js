const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port =process.env.PORT || 3000
//Define path for express config

const publicDirectory = path.join(__dirname, '../public')
const viewspath= path.join(__dirname,'../templates')
const partialspath = path.join(__dirname,'../templates/partials')

//Define handlebars for views and viewengine

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
//setup static directory

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'AccWeather ',
        name: 'Tushar Arora',
        location: 'India'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tushar Arora',
        location: 'India'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP!!',
        name: 'Tushar Arora',
        location: 'India'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.send('Help Article Not found')
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Tushar Arora',
    ErrorMessage: 'page not found'   
})
})
app.get('/help/*',(req,res)=>{
  res.render('404',{
      title: 'wrong data',
      errorMessage: 'Article not found'
  })
    })
app.get('*',(req,res)=>{
   res.render('404', {
       title : '404 page',
       errorMessage : 'Page NOT FOUND'
   })
})

app.listen(port, () => {
    console.log('Server is up on port.'+ port)
})
