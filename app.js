window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let monSelection = document.querySelector(".monday");
    let tueSelection = document.querySelector(".tuesday");
    let wedSelection = document.querySelector(".wednesday");
    let thuSelection = document.querySelector(".thursday");
    let friSelection = document.querySelector(".friday");
    let satSelection = document.querySelector(".saturday");
    let sunSelection = document.querySelector(".sunday");
    const temperatureSpan = document.querySelector(".temperature span");
 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let dayAccessed = 0;
            //long = 69.9631;
            //lat = 32.0208;

            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=a72fb646dce8682633bce3aada486a94`
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                update(dayAccessed, data);
                //event listener change from celciius to farenheight
                temperatureSection.addEventListener('click', () => {
                    console.log("heyyyy");
                    if (temperatureSpan.textContent == "C"){
                        console.log("heyyyy111");
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = farenheight;
                    } else {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temperature;
                    };
                });
                monSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [1, 0, 6, 5, 4, 3, 2]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
                tueSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [2, 1, 0, 6, 5, 4, 3]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
                wedSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [3, 2, 1, 0, 6, 5, 4]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
                thuSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [4, 3, 2, 1, 0, 6, 5]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
                friSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [5, 4, 3, 2, 1, 0, 6]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
                satSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [6, 5, 4, 3, 2, 1, 0]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
                sunSelection.addEventListener('click', () => {
                    let today = new Date();
                    let dayNum = today.getDay();
                    let offset = [0, 6, 5, 4, 3, 2, 1]
                    dayAccessed = offset[dayNum];
                    console.log(dayNum);
                    update(dayAccessed, data);
                });
            });
        });
       
    }else{
        h1.textContent = "Weather site not working as you have not allowed your location to be visible. Please allow us to view your location, so we can display the weather in your local area"
    }

    function update(dayAccessed, data){
        const {temp, weather} = data.daily[dayAccessed];
        //Set DOM Elements from the API
        //FORMULA for FARENHEIGHT
        let temperature = Math.round(((temp['day'] - 273.15) + Number.EPSILON) * 100) / 100;
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = weather[0].description;
        locationTimezone.textContent = data.timezone;
        //FORMULA for FARENHEIGHT
        let farenheight =  Math.round((((temp['day'] - 273.15) * 9/5 + 32) + Number.EPSILON) * 100) / 100;
        //Set Icon
        setIcons(weather[0].icon, document.querySelector(".icon"));
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "antiquewhite"});
        let currentIcon;
        if (icon == "01d"){
            currentIcon = "CLEAR_DAY";
            document.body.style.setProperty('--colourOne', 'rgb(47,150,163)');
            document.body.style.setProperty('--colourTwo', 'rgb(235,216,49)');
        }else if (icon == "01n"){
            currentIcon = "CLEAR_NIGHT";
            document.body.style.setProperty('--colourOne', 'rgb(48,62,143)');
            document.body.style.setProperty('--colourTwo', 'rgb(16,21,54)');
        }else if (icon == "02d"){
            currentIcon = "PARTLY_CLOUDY_DAY";
            document.body.style.setProperty('--colourOne', 'rgb(235,216,49)');
            document.body.style.setProperty('--colourTwo', 'rgb(132,139,139)');
        }else if (icon == "02n"){
            currentIcon = "PARTLY_CLOUDY_NIGHT";
            document.body.style.setProperty('--colourOne', 'rgb(132,139,139)');
            document.body.style.setProperty('--colourTwo', 'rgb(41, 44, 44)');
        }else if (icon == "03d" || icon == "03n" || icon == "04d"|| icon == "04n"){
            currentIcon = "CLOUDY";
            document.body.style.setProperty('--colourOne', 'rgb(132,139,139)');
            document.body.style.setProperty('--colourTwo', 'rgb(72,79,79)');
        }else if (icon == "10d" || icon == "10n"){
            currentIcon = "RAIN";
            document.body.style.setProperty('--colourOne', 'rgb(72,79,79)');
            document.body.style.setProperty('--colourTwo', 'rgb(84,126,189)');
        }else if (icon == "09d" || icon == "09n" ){
            currentIcon = "SLEET";
            document.body.style.setProperty('--colourOne', 'rgb(132,139,139)');
            document.body.style.setProperty('--colourTwo', 'rgb(84,126,189)');
        }else if (icon == "13d" || icon == "13n"){
            currentIcon = "SNOW";
            document.body.style.setProperty('--colourOne', 'rgb(132,139,139)');
            document.body.style.setProperty('--colourTwo', 'rgb(132,139,139)');
        }else if (icon == "11d" || icon == "11n"){
            currentIcon = "WIND";
            document.body.style.setProperty('--colourOne', 'rgb(102,109,109)');
            document.body.style.setProperty('--colourTwo', 'rgb(16,21,54)');
        }else if (icon == "50d" || icon == "50n"){
            currentIcon = "FOG";
            document.body.style.setProperty('--colourOne', 'rgb(102,109,109)');
            document.body.style.setProperty('--colourTwo', 'rgb(102,109,109)');
        }else{
            currentIcon = "CLEAR_DAY";
            document.body.style.setProperty('--colourOne', 'rgb(47,150,163)');
            document.body.style.setProperty('--colourTwo', 'rgb(235,216,49)');
        }
        
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});