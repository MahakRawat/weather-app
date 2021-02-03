const request= require('request')
const geocode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoibWFoYWstcmF3YXQiLCJhIjoiY2tra3FpZjN1MDNoMjJ3bG9sdDdhdTY0ayJ9.zaTDuw_EF0IjEd3e8jwiQQ&limit=1'
    request({url,json: true},(error,{body}={})=>{
        if(error)
          {
              callback('oops!! cannot connect. Please check your connection',undefined)
          }
          else if(!body.features[0])
          {
              callback('invalid input. Please try another search',undefined)
          }
          else
          {
              callback(undefined,{longitude:body.features[0].center[0],latitude: body.features[0].center[1],location: body.features[0].place_name})
          }
    })
}
module.exports=geocode