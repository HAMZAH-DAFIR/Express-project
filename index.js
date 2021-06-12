const express = require('express')

const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const app = express()
const Joi = require('joi')
//middleware logged
const logged = require('./middleware/logged')
// import routers
const courses = require('./routers/courses');
const home = require('./routers/home');
//-------environment
console.log(`App Name : ${config.get('name')}`)
console.log(`Mail server: ${config.get('mail.host')}`)
// get password from ENV (password : mail,database.....)
console.log(`Mail password: ${config.get('mail.password')}`)
console.log(process.env.NODE_ENV)
console.log(app.get('env'))

//-----------------user router--------------------




//---------------------Middleware
//execute MODE Sync
//middleware  between res and req convert body to JSON
app.use(express.json())
//middleware  for the real form URL
// app.use(express.urlencoded)
//middleware : request HTTP security
app.use(helmet())
//display request HTTP status and execute time
if (app.get('env') === 'development')
app.use(morgan('tiny'))
//middleware for access to security files 
app.use(express.static('public'))
app.use(logged.log);

//----------------------Template--------------------------
//for use pug template engine 
app.set('view engine','pug')
//get my views from views folder
app.set('views','./views')
//-------------------------------------------------------------------------


app.use('/api/courses',courses);
app.use('/',home);


// variable environment 
const port = process.env.PORT || 3000
app.listen(port , () => console.log(`the app listening the port http://localhost:${ port }`))