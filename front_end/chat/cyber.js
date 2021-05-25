const SERVER_PORT = 5000;
const SERVER_IP = "192.168.88.5";

const URL = "https://cyberchatapp.herokuapp.com/login";
const POST_MESSAGE_URL = "https://cyberchatapp.herokuapp.com/message";
const GET_MESSAGES_URL = "https://cyberchatapp.herokuapp.com/messages";

//________________Display-Message___________________//

function displayMessages(messages) {
    let yourMessage = document.querySelector('.other-message');
    let otherMessage = document.querySelector('.your-message');
    let userLocalStorage = localStorage.getItem("username");
    user.textContent = userLocalStorage;

    let messageTitle = document.querySelector('.message-title')
    if (messageTitle !== null){
        messageTitle.remove();
    }

    const newMessageTitle = document.createElement('div');
    newMessageTitle.className = 'message-title';
    

    for (let message of messages) {

        let listOfMessage = otherMessage;
        console.log(listOfMessage);
        let title = document.createElement('div');
        title.className = 'message-title';
        title.id = 'title1';

        let messageText = document.createElement('div');
        messageText.className = 'message-text';

        if (userLocalStorage !== message.username){
            listOfMessage = yourMessage;
            title.id = 'title2';
        }

        let newPara = document.createElement('p');
        newPara.textContent = message.text;

        let newSpan = document.createElement('span');
        newSpan.textContent = message.username; 

        title.appendChild(newSpan);
        messageText.appendChild(newPara);
        newMessageTitle.appendChild(title);
        newMessageTitle.appendChild(messageText);
        listOfMessage.appendChild(newMessageTitle);
        console.log(newMessageTitle);
    };
};

//_____________________send message______________________//

function sendMessage(event) {
    event.preventDefault();
    let userLocalStorage = localStorage.getItem("username");
    const text = document.querySelector("#msg").value;
    const username = userLocalStorage; // for now, just for test
    let message = { username: username, text: text };

    axios.post(POST_MESSAGE_URL, message).then((resp) => displayMessages(resp.data));
}

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
