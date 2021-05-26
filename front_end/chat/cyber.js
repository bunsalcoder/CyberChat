const SERVER_PORT = 5000;
const SERVER_IP = "192.168.88.23";

const URL = "https://cyberchatapp.herokuapp.com/login";
const POST_MESSAGE_URL = "https://cyberchatapp.herokuapp.com/message";
const GET_MESSAGES_URL = "https://cyberchatapp.herokuapp.com/messages";

// const URL = "http://192.168.88.23:5000/login";
// const POST_MESSAGE_URL = "http://192.168.88.23:5000/message";
// const GET_MESSAGES_URL = "http://192.168.88.23:5000/messages";

//________________Display-Message___________________//

function displayMessages(messages) {
    let yourMessage = document.querySelector('.your-message');
    let otherMessage = document.querySelector('.other-message');
    let userLocalStorage = localStorage.getItem("username");
    user.textContent = userLocalStorage;

    let messageTitle = document.querySelector('.message-title')
    if (messageTitle !== null){
        messageTitle.remove();
    };

    const newMessageTitle = document.createElement('div');
    newMessageTitle.className = 'message-title';

    for (let message of messages) {

        let listOfMessage = otherMessage;
        let title = document.createElement('div');
        title.className = 'message-title';
        title.id = 'title1';

        let messageText = document.createElement('div');
        messageText.className = 'message-text';

        if (userLocalStorage === message.username){
            listOfMessage = yourMessage;
            title.id = 'title2';
        };

        if (message.text === ':)'){
            message.text = '🙂';
        }else if (message.text === ':('){
            message.text = '😟';
        }else if (message.text === ':o'){
            message.text = '😲';
        }else if (message.text === ':D'){
            message.text = '😄';
        }else if (message.text === '><'){
            message.text = '😆';
        };

        let newPara = document.createElement('p');
        newPara.textContent = message.text;

        let newSpan = document.createElement('span');
        newSpan.textContent = message.username;

        title.appendChild(newSpan);
        messageText.appendChild(newPara);
        newMessageTitle.appendChild(title);
        newMessageTitle.appendChild(messageText);
        listOfMessage.appendChild(newMessageTitle);
    };
};

//_____________________send message______________________//

function sendMessage(event) {
    event.preventDefault();
    let userLocalStorage = localStorage.getItem("username");
    const text = document.querySelector("#msg").value;
    const username = userLocalStorage; 
    let message = { username: username, text: text };

    axios.post(POST_MESSAGE_URL, message).then((resp) => displayMessages(resp.data));
};


//_____________________Bold and Italic____________________//

function boldMessage(){
    console.log(boldBtn);
};

function italicMessage(){
    console.log(italicBtn);
};

//_____________________load data________________________//

function loadData() {
    axios.get(GET_MESSAGES_URL).then((resp) => displayMessages(resp.data));
};

loadData();
setInterval(loadData, 3000);

//______________________________MAIN_____________________________//

const messageTitle = document.querySelector("#title2");
const user = document.querySelector(".chat-header p");
const messageInput = document.querySelector("#msg");
const sendButton = document.querySelector("#btnSend");
sendButton.addEventListener("click", sendMessage);
sendButton.addEventListener("click", () => {
    messageInput.value = "";
});

const boldBtn = document.querySelector('.bold');
boldBtn.addEventListener('click', boldMessage);

const italicBtn = document.querySelector('.italic');
italicBtn.addEventListener('click', italicMessage);
