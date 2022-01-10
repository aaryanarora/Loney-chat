const socket = io('http://localhost:8000');

const form = document.getElementById('sendContainer');
const msgInp = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container");
var audio = new Audio('beep.mp3'); 
const append = (message, position)=>{

    const msgElement = document.createElement('div');//create a div
    msgElement.innerText = message;
    msgElement.classList.add('message');//add the message class to it
    msgElement.classList.add(position);//add the position in the parameter
    msgContainer.append(msgElement);
    if(position == 'left')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{

    e.preventDefault();
    const message = msgInp.value;
    append(`YOU: ${message}`,'right'); //my message my side
    socket.emit('send', message); //telling that we calling this send in app.js
    msgInp.value = '' ;
});
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',  name);//send this function to app.js and run corresponding function

socket.on('user-joined', name=>{

    append(`${name} joined the chat`,'right'); //from app.js
});

socket.on('receive', data =>{

    append(`${data.name}: ${data.message}`,'left'); //from app.js now their message will be appended in left
});

socket.on('left', name =>{ //recieves from app.js

    append(`${name} left the chat`,'left'); //from app.js now their message will be appended in left
});
