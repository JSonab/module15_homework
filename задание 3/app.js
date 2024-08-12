const wsUri = "wss://echo-ws-service.herokuapp.com"

const output = document.getElementById('output')
const btnSend = document.querySelector('.send')
const btnGeo = document.querySelector('.geo')
const inp = document.querySelector('input')
const mapLink = document.querySelector('#map-link')

let websocket;


websocket = new WebSocket(wsUri)

websocket.onmessage = function (evt) {
    writeToScreen(
        evt.data, 'server'
    )
}
websocket.onerror = function(evt){
    writeToScreen(
         '<span style="color: red;"> ERROR:+ '+ '</span>' + evt.data
    )
} 

function writeToScreen (message, type) {
    let pre = document.createElement('p')
    pre.style.border = '4px solid #BAD7EC'
    pre.style.width = '12rem'
    pre.style.padding = '10px'
    pre.style.miHeight = '6ex'
    pre.style.wordWrap = 'break-word'
    pre.style.alignContent = 'center'
    pre.style.fontSize = '20px'
    pre.style.textAlign = 'center'
    pre.style.borderRadius = '7px'


    if(type === 'user'){
        pre.style.marginLeft = 'auto'
        pre.style.marginRight = '20px'

        
    } else {
        pre.style.marginRight = 'auto'
        pre.style.marginLeft = '20px'
    }

    pre.innerHTML = message
    output.appendChild(pre)
}

btnSend.addEventListener('click', startSend)

function startSend() {
    const message = inp.value;
    writeToScreen(message, 'user')
    websocket.send(message)
}


///Geolocation
const error = () => {
    writeToScreen("Невозможно получить ваше местоположение", 'server')
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const locationMessage = `Широта: ${latitude}, Долгота: ${longitude}`;
    writeToScreen(locationMessage, 'user');

    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    mapLink.textContent = 'Ссылка на карту';
    mapLink.style.display = 'block';
}

btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen('Geolocation не поддерживается вашим браузером', 'server');
    } else {
        writeToScreen('Определение местоположения...', 'server');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});