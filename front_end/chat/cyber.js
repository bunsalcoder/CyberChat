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
    let userLocalStorage = localStorage.getItem("username");
    user.textContent = userLocalStorage;

    let oldmessage = document.querySelector('.message')
    
    if (oldmessage !== null){
        oldmessage.remove();
    }
    
    const newMessage = document.createElement('div');
    newMessage.className = 'message';

    for (let message of messages) {

        let otherMessage = document.createElement('div');
        otherMessage.className = 'message-row other-message';

        let listOfMessage = otherMessage;

        let yourMessage = document.createElement('div');
        yourMessage.className = 'message-row your-message';

        let messageTitle = document.createElement('div');
        messageTitle.className = 'message-title';

        let title = document.createElement('div');
        title.className = 'message-title';
        title.id = 'title1';

        let messageText = document.createElement('message-text');
        messageText.className = 'message-text';

        let newPara = document.createElement('p');
        let newSpan = document.createElement('span');

        if (userLocalStorage === message.username){
            title.id = 'title2';
            listOfMessage = yourMessage;
        };

        newSpan.textContent = message.username;
        newPara.textContent = emoticon(message.text);

        title.appendChild(newSpan);
        messageText.appendChild(newPara);

        messageTitle.appendChild(title);
        messageTitle.appendChild(messageText);

        listOfMessage.appendChild(messageTitle);
        newMessage.appendChild(listOfMessage);
        chatContent.appendChild(newMessage);
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


//______________________Emojies__________________________//
let emojiList = {'<3': '❤️', ':)': '🙂',':>': '👽', ':(': '😟', ':o': '😲', ':D': '😄', '><': '😆'};

function emoticon(emoji){
    let wordSplit = emoji.split(" ");
    let newText = '';

    for (let word of wordSplit){
        let foundEmoji = false;
        for (let emoji in emojiList){
            if (word === emoji){
                newText += emojiList[emoji];
                foundEmoji = true;
            };
        };
        if (!foundEmoji){
            newText += word;
        };
        newText += ' ';
    };
    return newText;
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
const chatContent = document.querySelector('.chat-content');
const sendButton = document.querySelector("#btnSend");
sendButton.addEventListener("click", sendMessage);
sendButton.addEventListener("click", () => {
    messageInput.value = "";
});

const boldBtn = document.querySelector('.bold');
boldBtn.addEventListener('click', boldMessage);

const italicBtn = document.querySelector('.italic');
italicBtn.addEventListener('click', italicMessage);
