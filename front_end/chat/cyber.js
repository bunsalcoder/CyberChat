const SERVER_PORT = 5000;
const SERVER_IP = "192.168.88.5";

const URL = "https://cyberchatapp.herokuapp.com/login";
const POST_MESSAGE_URL = "https://cyberchatapp.herokuapp.com/message";
const GET_MESSAGES_URL = "https://cyberchatapp.herokuapp.com/messages";

//________________Display-Message___________________//

function displayMessages(messages) {
    let userLocalStorage = localStorage.getItem("username");
    user.textContent = userLocalStorage;

    let rowMessages = document.querySelectorAll('.message-row')

    for (let rowMessage of rowMessages){
        if (rowMessage !== null) {
            rowMessage.remove();
        };
    };

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";

    for (let message of messages) {
        let otherMessage = document.createElement('div');
        otherMessage.className = 'message-row other-message';

        let yourMessage = document.createElement('div');
        yourMessage.className = 'message-row your-message';

        let messageTitle = document.createElement('div');
        messageTitle.className = 'message-title';

        let userMessageTitle = document.createElement('div');
        userMessageTitle.className = 'message-title';

        let myMessage = document.createElement("div");
        messageDiv.className = "message-text";

        let newPara = document.createElement('p');
        let userSpan = document.createElement('span');

        if (userLocalStorage === message.username) {
            userMessageTitle.id = 'title2';
            newPara.textContent = message.text;
            userSpan.textContent = message.username;
            myMessage.appendChild(newPara);
            userMessageTitle.appendChild(userSpan);
            messageTitle.appendChild(userMessageTitle);
            yourMessage.appendChild(messageTitle);
            messageDiv.appendChild(yourMessage);
        }else{
            userMessageTitle.id = 'title1';
            newPara.textContent = message.text;
            userSpan.textContent = message.username;
            myMessage.appendChild(newPara);
            userMessageTitle.appendChild(userSpan);
            messageTitle.appendChild(userMessageTitle);
            otherMessage.appendChild(messageTitle);
            messageDiv.appendChild(otherMessage);
        };
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
