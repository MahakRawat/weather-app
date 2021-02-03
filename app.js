const express=require('express')
const path=require('path')
const hbs=require('hbs')

const app= express()   //expressjs.com/reference API
const port= process.env.PORT ||3000
// defining paths 
const pathtopublic=path.join(__dirname,'/public')
const pathtoviews =path.join(__dirname,'/templates/views')
const pathpartials=path.join(__dirname,'/templates/partials')
// setup static directory to serve
app.use(express.static(pathtopublic))

//setup handlebar and views location
app.set('view engine','hbs')
app.set('views',pathtoviews)
hbs.registerPartials(pathpartials)

const geocode=require('./public/utils/geocode.js')
const forecast=require('./public/utils/forecast.js')

app.get('',(req,res)=>{
      res.render('index',{
          title: 'Weather',
          name: 'Mahak Rawat'
      })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
         name: 'Mahak Rawat'
    })
})
app.get('/help',(req,res)=>{
     res.render('help',{
        title: 'Help' ,
        name: 'Mahak Rawat'
     })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
           error: 'Please provide the address'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
             })
        }
        forecast(longitude,latitude,(error,forecast)=>{
            if(error)
            {
                return res.send({
                    error
                 })
            }
            res.send({
                forecast,
                address: req.query.address,
                location
            })
        })
    })
    
})
app.get('/help/*',(req,res)=>{
   res.render('404',{
       title: 'help page not found',
       name:'Mahak Rawat'
   })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title:'page not found',
       name:'Mahak Rawat'
   })
})

app.listen(port,()=>{
    console.log('server is up')
})
