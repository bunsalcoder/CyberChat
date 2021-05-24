
const SERVER_PORT = 5000;
const SERVER_IP = '192.168.88.5';

const URL = 'https://cyberchatapp.herokuapp.com/login';

//___________________________Login-Form-Style_____________________________//

const inputs = document.querySelectorAll(".input");

function addFocus(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
};

function removeFocus(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	};
};

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
            localStorage.setItem(Username, userName.value);
            console.log(userName.value);
            window.location.pathname = '/chat/cyber.html';
        };
        message.textContent = text;
        message.style.color = color;
    });
};


const btnLogin = document.querySelector('.btn');
btnLogin.addEventListener('click', hideLogin);

const message = document.querySelector("#message");
const userName = document.querySelector(".div input[type=text]");
const password = document.querySelector("input[type=password]");

