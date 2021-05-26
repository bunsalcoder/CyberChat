const express = require("express");
const app = express();


const DEFAULT_PORT = 5000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () =>console.log("Running on port " + PORT));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('front_end'));

//___________Login-Form_________________//
let usernames = [
    { name: "bunsal", password: "00000" },
    { name: "lyhuoy", password: "11111" },
    { name: "ronan", password: "22222" },
    { name: "sokhom", password: "33333" }
];

// login request path
app.get("/login", (req, res) => {

    userName = req.query.username;
    passWord = req.query.password;

    let isValid = false;
    for (let user of usernames){
        if (user.name === userName && user.password === passWord){
            isValid =  true;
        };
    };
    res.send(isValid);
});

//_______________Send-Message________________//

app.get('/', (req, res) => res.send("Hello Project"));

let messages = [
    {username: "bunsal", text: "Hello bro!"},
    {username: "lyhouy", text: "Yes, hi bro!"}
];

app.get('/messages', (req , res) =>{
    res.send(messages);
});

app.post('/message', (req, res) =>{
    let username = req.body.username;
    let text = req.body.text;
    let boldText = req.body.bold;
    let italicText = req.body.italic;
    let newData = {
        username: username,
        text: text,
        bold: boldText,
        italic: italicText
    };

    messages.push(newData);
    res.send(messages);
});

