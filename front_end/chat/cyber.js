const SERVER_PORT = 5000;
const SERVER_IP = '192.168.88.5';

const URL = 'http://' + SERVER_IP + ':' + SERVER_PORT + '/login';
const POST_MESSAGE_URL =  'http://' + SERVER_IP + ':' + SERVER_PORT + '/message';
const GET_MESSAGES_URL = 'http://' + SERVER_IP + ':' + SERVER_PORT + '/messages';


//________________Display-Message___________________//

function displayMessages(messages){
    const message = document.querySelector('#msg');
    const yourMessage = document.querySelector('.your-message');
    const messageTitle = document.querySelector('.message-title');
    let currentTime = new Date();

    if (messageTitle !== null){
        messageTitle.remove();
    };

    const newMessageTitle = document.createElement("div");
    newMessageTitle.className = 'message-title';

    for (let user of messages){

        let userTitle = document.createElement('div');
        userTitle.className = 'message-title';
        userTitle.id = 'title2';
        userTitle.textContent = 'Me' + ', ' + currentTime.toLocaleTimeString();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-text';

        const newP = document.createElement('p');
        newP.textContent = user.text;

        messageDiv.appendChild(newP);
        newMessageTitle.appendChild(userTitle);
        newMessageTitle.appendChild(messageDiv);
        yourMessage.appendChild(newMessageTitle);
    };
    message.value = '';
};

//_____________________send message______________________//

function sendMessage(event){
    event.preventDefault();

    const text = document.querySelector('#msg').value;
    const username = 'bunsal';  // for now, just for test
    let message = {username: username, text: text};

    axios.post(POST_MESSAGE_URL, message).then(resp => displayMessages(resp.data));
};

//_____________________load data________________________//

function loadData(){
    axios.get(GET_MESSAGES_URL).then(resp => displayMessages(resp.data));
};


loadData();


//______________________________MAIN_____________________________//

const messageTitle = document.querySelector('#title2');
const messageInput = document.querySelector('#msg');
const sendButton = document.querySelector('#btnSend');
sendButton.addEventListener('click', sendMessage);
