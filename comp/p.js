let nextDay=document.getElementsByClassName('m');
let card1=document.querySelector(".card-1")
let sec2Cards=document.querySelector(".sec-2");
let image1=document.querySelector(".image-1")
console.log(image1)


let days=["sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


//search
let search=document.getElementById("search-city");
let currentCity="Syria";
search.addEventListener('keyup',function(){
    currentCity=search.value;
    console.log(currentCity)
    getWeather();
})
getWeather(currentCity="syria")


//Api
let apiRes;
async function getWeather(){
    let apiWeather=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3c384779a9514051a81145603240801&q=${currentCity}&days=3`)
    apiRes=await apiWeather.json();
    console.log(apiRes);
    getFirstday();
    getOtherday();
    getSec2Card();
    getImage();
}

function getImage(){
let cartona=`
<img src="./comp/img/Group 71.png" class="img-fluid ">
<div class=" text-header d-flex justify-content-between px-4 align-items-end">
   <div>
   <h1 >${apiRes.current.temp_c}°</h1>
   <p >${apiRes.location.name} , ${apiRes.location.country}</p>
   </div>
    <P >${apiRes.location.localtime}</P>
</div>
`
image1.innerHTML=cartona;
}


function getFirstday(){
let date=new Date();
let hour=date.getHours();
let min=date.getMinutes();
if(hour<10){
           hour=`0${hour}`
       }
       if(hour>=0 && hour<12){

        min=`${min} AM`
       }else{
        min=`${min} PM`
       }
let cartona=`
 <div class="card-sec-1 d-flex justify-content-between align-items-center flex-wrap pt-3 py-2 px-3 ">
<p >${days[date.getDay()]}</p>
<p>${hour}:${min}</p>
</div>
<div class="card-sec-2 px-3 py-2">
<div class="d-flex justify-content-between align-items-center">
<h2 >${apiRes.current.temp_c}°</h2>
<img class="icon-1 w-25" src="https:${apiRes.current.condition.icon}">
</div>
<p class=" fw-bold"></p>
<div class="d-flex justify-content-between flex-wrap">
<p >feelslike: ${apiRes.current.feelslike_c}°</p>
<p >wind: ${apiRes.current.wind_degree} deg</p>
</div>
</div> 
`
card1.innerHTML=cartona;
}

    function getOtherday(){
        let cartonaa='';
        for(let index=0;index<nextDay.length;index++){
       cartonaa+=` 
       <div class="card  overflow-hidden h-100 text-center">
           <div class="card-sec-1  py-2 px-2  pt-3">
            <p class="name-day">${days[new Date(apiRes.forecast.forecastday[index+1].date).getDay()]}</p>
           </div>
           <div class="card-sec-2 px-2 d-flex flex-column justify-content-between py-2 h-100 align-items-center">
               <img class="w-50"src="https:${apiRes.forecast.forecastday[index+1].day.condition.icon}">
               <h2 >${apiRes.forecast.forecastday[index+1].day.avgtemp_c}°</h2>
           </div>
        </div>`
        nextDay[index].innerHTML=cartonaa;
        cartonaa='';
        }
        
    }
function getSec2Card(){
    let cartona=`
    <div class="col-md-2 d-flex flex-column justify-content-around align-items-center  p-3">
    <h6>UV Indesx</h6>
    <img src="./comp/img/UV index Circle.svg" class="w-50">
    <p>${apiRes.current.uv} UV</p>
  </div>
  <div class="col-md-2 d-flex flex-column justify-content-around align-items-center  p-3">
    <h6>Visibility </h6>
    <img src="./comp/img/Visibility Icon 1.svg" class="w-50">
    <p >${apiRes.current.vis_km} km</p>
  </div>
  <div class="col-md-2  p-3 d-flex flex-column justify-content-around align-items-center ">
    <h6>Humidity</h6>
    <img src="./comp/img/carbon_humidity-alt.svg" class="w-50">
    <p >${apiRes.current.humidity}%</p>
  </div>
  <div class="col-md-2 d-flex flex-column justify-content-around align-items-center p-3 ">
    <h6>Wind Status</h6>
    <img src="./comp/img/Wind Satus Rectangle.svg" class="w-100">
    <p >${apiRes.current.wind_kph} km</p>
  </div>
    `;
sec2Cards.innerHTML=cartona;
}