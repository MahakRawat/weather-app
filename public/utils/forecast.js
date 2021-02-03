const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=f066259772b4f1d8876edb798a5ff45b&query='+encodeURI(latitude)+','+encodeURI(longitude)
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('oops!! cannot connect. Please check your connection!',undefined)
        }
        else if(body.errors)
        {
            callback('invalid input. Please try another search',undefined)
        }
        else
        {
            callback(undefined,body.current.weather_descriptions + '. It is currently '+ body.current.temperature + '. It feelslike '+ body.current.feelslike)
        }
    })
}
module.exports=forecast