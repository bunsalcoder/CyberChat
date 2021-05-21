
const SERVER_PORT = 5000;
const SERVER_IP = '192.168.88.5';
const URL = 'http://' + SERVER_IP + ':' + SERVER_PORT + '/login';


//___________________________Login-Form-Style_____________________________//

const inputs = document.querySelectorAll(".input");

function addFocus(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function removeFocus(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addFocus);
	input.addEventListener("blur", removeFocus);
});

function hideLogin(){

    let querry = URL + "?username="+userName.value+"&password="+password.value;

    axios.get(querry).then((response) => {

        let isValid = response.data;
        let text = "Invalid User";
        let color = "red";

        if (isValid){
            text = 'Login Successfully !!!';
            color = 'green';

            let loginForm = document.querySelector('.login-form');
            loginForm.style.display = 'none';

            let bg = document.querySelector('.bg');
            bg.style.display = 'block';
        };

        message.textContent = text;
        message.style.color = color;
    });
};


//________________Display-Message___________________//

function displayUser(response){
    let users = response.data;
    console.log(users);
    const message = document.querySelector('#msg');
    const yourMessage = document.querySelector('.your-message');
    const messageTitle = document.querySelector('.message-title');
    
    if (messageTitle !== null){
        messageTitle.remove();
    };

    const newMessageTitle = document.createElement("div");
    newMessageTitle.className = 'message-title';

    for (let user of users){

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-text';

        const newP = document.createElement('p');
        newP.textContent = user.text;

        messageDiv.appendChild(newP);
        
        newMessageTitle.appendChild(messageDiv);
        yourMessage.appendChild(newMessageTitle);
    };
    message.value = "";
};

//.......................send message........................//
function sendMessage(event){
    event.preventDefault();

    const message = document.querySelector('#msg').value;

    let user = {text: message};
    const url = "http://192.168.88.5:5000/users";
    axios.post(url, user).then(displayUser);
};

//.......................load data.............................//
function loadData(){
    const url = "http://192.168.88.5:5000/users";
    axios.get(url).then(displayUser);
};

loadData();


//______________________________MAIN_____________________________//

const messageTitle = document.querySelector('#title2');
const messageInput = document.querySelector('#msg');
const sendButton = document.querySelector('#btnSend');
sendButton.addEventListener('click', sendMessage);

const btnLogin = document.querySelector('.btn');
btnLogin.addEventListener('click', hideLogin);


const message = document.querySelector("#message");
const userName = document.querySelector(".div input[type=text]");
const password = document.querySelector("input[type=password]");
