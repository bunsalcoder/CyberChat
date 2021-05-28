const SERVER_PORT = 5000;
const SERVER_IP = "192.168.88.27";

const URL = "https://cyberchatapp.herokuapp.com/login";
const POST_MESSAGE_URL = "https://cyberchatapp.herokuapp.com/message";
const GET_MESSAGES_URL = "https://cyberchatapp.herokuapp.com/messages";

// const URL = "http://192.168.88.34:5000/login";
// const POST_MESSAGE_URL = "http://192.168.88.34:5000/message";
// const GET_MESSAGES_URL = "http://192.168.88.34:5000/messages";

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

        let messageText = document.createElement('div');
        messageText.className = 'message-text';

        let newPara = document.createElement('p');
        let newSpan = document.createElement('span');

        if (userLocalStorage === message.username){
            title.id = 'title2';
            listOfMessage = yourMessage;
        };

        newSpan.textContent = message.username;
        newPara.textContent = emoticon(message.text);

        if (message.bold === true){
            newPara.style.fontWeight = 'bold';
        }else{
            newPara.style.fontWeight = 'normal';
        };

        if (message.italic === true){
            newPara.style.fontStyle = 'italic';
        }else{
            newPara.style.fontStyle = 'normal';
        };

        if (title.id === 'title1'){
            window.addEventListener("DOMContentLoaded", event => {
                const audio = document.querySelector("audio");
                audio.volume = 1;
                audio.play();
            });   
        };
        
        title.appendChild(newSpan);
        messageText.appendChild(newPara);

        messageTitle.appendChild(title);
        messageTitle.appendChild(messageText);

        listOfMessage.appendChild(messageTitle);
        newMessage.appendChild(listOfMessage);
        chatContent.appendChild(newMessage);
        goBottom();
    };
};

//_____________________send message______________________//

function sendMessage(event) {
    event.preventDefault();
    let userLocalStorage = localStorage.getItem("username");
    const text = document.querySelector("#msg").value;
    const username = userLocalStorage; 
    let message = { username: username, text: text, bold: bold, italic: italic };

    axios.post(POST_MESSAGE_URL, message).then((resp) => displayMessages(resp.data));
};

//____________________GotoBottom_______________________//

function goBottom(){
    let mCt = document.querySelector(".chat-content");
    mCt.scrollTop = mCt.scrollHeight - mCt.clientHeight;
};


//______________________Emojies__________________________//
let emojiList = {'<3': '❤️', ':)': '🙂',':>': '👽', ':(': '😟', ':o': '😲', ':D': '😄', '><': '😆',
                '3:)': '😈', ':`': '😢', '-_-': '😑', ':p': '😝', '<(")': '🐁', '8)': '😎', 'o:)': '😇',
                '>:o': '😡', ':*': '😗'};

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
let bold = false;
let boldCount = 0;

function boldMessage(){
    boldCount++;
    if (boldCount % 2 === 0){
        messageInput.style.fontWeight = 'normal';
        bold = false;
    }else{
        messageInput.style.fontWeight = 'bold';
        bold = true;
    };
};

let italic = false;
italicCount = 0;

function italicMessage(){
    italicCount++;
    if (italicCount % 2 === 0){
        messageInput.style.fontStyle = 'normal';
        italic = false;
    }else{
        messageInput.style.fontStyle = 'italic';
        italic = true;
    };
};


//_____________________Emoji Function____________________//

document.addEventListener('DOMContentLoaded', () => {
    newEmoji.on('emoji', emoji => {
        document.querySelector('#msg').value += emoji;
    });
    smiley.addEventListener('click', () => {
        newEmoji.togglePicker(smiley);
    });
});

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
const smiley = document.querySelector(".smiley");
const newEmoji = new EmojiButton();
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