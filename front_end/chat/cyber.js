const SERVER_PORT = 5000;
const SERVER_IP = "192.168.88.5";

const URL = "https://cyberchatapp.herokuapp.com/login";
const POST_MESSAGE_URL = "https://cyberchatapp.herokuapp.com/message";
const GET_MESSAGES_URL = "https://cyberchatapp.herokuapp.com/messages";

//________________Display-Message___________________//

function displayMessages(messages) {
    const yourMessage = document.querySelector(".your-message");
    const otherMessage = document.querySelector(".other-message");
    const messageTitle = document.querySelector(".message-title");
    let userLocalStorage = localStorage.getItem("username");
    user.textContent = userLocalStorage;

    if (messageTitle !== null) {
        messageTitle.remove();
    };

    const newMessageTitle = document.createElement("div");
    newMessageTitle.className = "message-title";

    for (let user of messages) {
        let listOfMessage = otherMessage;
        if (userLocalStorage === user.username) {
            listOfMessage = yourMessage;
        };
        let userTitle = document.createElement("div");
        userTitle.className = "message-title";
        userTitle.id = "title2";
        userTitle.textContent = userLocalStorage;
        const messageDiv = document.createElement("div");
        messageDiv.className = "message-text";

        const newP = document.createElement("p");
        newP.textContent = user.text;

        messageDiv.appendChild(newP);
        newMessageTitle.appendChild(userTitle);
        newMessageTitle.appendChild(messageDiv);
        listOfMessage.appendChild(newMessageTitle);
    };
};

//_____________________send message______________________//

function sendMessage(event) {
    event.preventDefault();

    const text = document.querySelector("#msg").value;
    const username = userLocalStorage; // for now, just for test
    let message = { username: username, text: text };

    axios.post(POST_MESSAGE_URL, message).then((resp) => displayMessages(resp.data));
}

//_____________________load data________________________//

function loadData() {
    axios.get(GET_MESSAGES_URL).then((resp) => displayMessages(resp.data));
}

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
