const entered_ip = document.getElementsByClassName('searchinput')
const search = document.getElementsByClassName('arrowicon')


let current_ip = document.getElementById('current-ipaddress')
let current_location = document.getElementById('current-location')
let current_timezone = document.getElementById('current-timezone')
let current_isp = document.getElementById('current-isp')


    fetch('https://geo.ipify.org/api/v2/country?apiKey=at_xzKiITZ7Xul6EfKN7lXfqRWybnrW1&ipAddress=8.8.8.8')
    .then((res) => res.json())
    .then((data) => console.log(data))
 
        
    

    
   
 

 