const SERVER_PORT = 5000;
const SERVER_IP = "192.168.88.5";

const URL = "https://cyberchatapp.herokuapp.com/login";
const POST_MESSAGE_URL = "https://cyberchatapp.herokuapp.com/message";
const GET_MESSAGES_URL = "https://cyberchatapp.herokuapp.com/messages";

//________________Display-Message___________________//

function displayMessages(messages) {
    let userLocalStorage = localStorage.getItem("username");
    user.textContent = userLocalStorage;

    let messageRows = document.querySelectorAll('.message-row')
    
    for (let messageRow of messageRows){
        if (messageRow !== null){
            messageRow.remove();
        }
    }
    
    const newMessage = document.createElement('div');
    newMessage.className = 'message';

    for (let message of messages) {

        let otherMessage = document.createElement('div');
        otherMessage.className = 'message-row other-message';

        let yourMessage = document.createElement('div');
        yourMessage.className = 'message-row your-message';

        let messageTitle = document.createElement('div');
        messageTitle.className = 'message-title';

        let title1 = document.createElement('div');
        title1.className = 'message-title';
        title1.id = 'title1';

        let title2 = document.createElement('div');
        title2.className = 'message-title';
        title2.id = 'title2';

        let messageText = document.createElement('message-text');
        messageText.className = 'message-text';

        let newPara = document.createElement('p');
        let newSpan = document.createElement('span');

        if (userLocalStorage === message.username){
            newSpan.textContent = message.username;
            newPara.textContent = message.text;

            title2.appendChild(newSpan);
            messageText.appendChild(newPara);

            messageTitle.appendChild(title2);
            messageTitle.appendChild(messageText);

            yourMessage.appendChild(messageTitle);
            newMessage.appendChild(yourMessage);
        }else{
            newSpan.textContent = message.username;
            newPara.textContent = message.text;

            title1.appendChild(newSpan);
            messageText.appendChild(newPara);

            messageTitle.appendChild(title1);
            messageTitle.appendChild(messageText);

            otherMessage.appendChild(messageTitle);
            newMessage.appendChild(otherMessage);
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

// loadData();
// setInterval(loadData, 3000);

//______________________________MAIN_____________________________//

const messageTitle = document.querySelector("#title2");
const user = document.querySelector(".chat-header p");
const messageInput = document.querySelector("#msg");
const sendButton = document.querySelector("#btnSend");
sendButton.addEventListener("click", sendMessage);
sendButton.addEventListener("click", () => {
    messageInput.value = "";
});
