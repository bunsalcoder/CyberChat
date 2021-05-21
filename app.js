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
    { name: "sokhom", password: "33333" },
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
    }
    res.send(isValid);
});

//_______________Send-Message________________//

app.get('/', (req, res) => res.send("Hello Project"));

let users = [
    // {username: "bunsal", text: "Hello bro!"},
];

app.get('/users', (req , res) =>{
    res.send(users);
});

app.post('/users', (req, res) =>{
    let user = {text: req.body.text};
    users.push(user);
    res.send(users);
});
