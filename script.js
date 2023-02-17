window.addEventListener('load', () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
   let temperatureSection = document.querySelector('.temperature');
   let temperatureSpan = document.querySelector('.temperature span');


       if(navigator.geological){
    navigator.geological.getCurrentPosition(position =>{
    long = position.coords.longitude;
    lat = position.coords.latitude;


    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/323cc627b42b9e049e3ac7597d8a70f5/${lat},${long}`;
   
   
    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
const{temperature, summary} = data.currently;

//set DOM elements from API
temperatureDegree.textContent = temperature;
temperatureDescription.textContent = summary;
locationTimezone.textContent = data.timezone;

//formula for celsius

let celsius = ( temperature - 32) * (5 / 9);

   //set icon

   setIcon(icon,document.querySelector('.icon'));

//chnage temperature to celsius/farenheit
temperatureSection.addEventListener('click', () => {
    if(temperatureSpan.textContent === 'F') {
        temperatureSpan.textContent = 'C';
        temperatureDegree.textContent = Math.floor(celsius);
    }else{
        temperatureSpan.textContent = 'F';
        temperatureDegree.textContent = temperature;
    }
        })
     });

  });

}
 function setIcon(icon,iconID){
    const skycons = new skycons(color, 'white');
    const currentIcon = icon.replace(/-/g,'_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
   }
});