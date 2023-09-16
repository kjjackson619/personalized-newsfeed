import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

//configure my .env file for use
dotenv.config();

//middleware for express and cors
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

//call the jwt token and create a variable for the incoming .env secretKey 
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

app.post('/api/login', (req, res) => {
    //req.body contains user credentials
    const {username, password } = req.body;

    //Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required!'});
    }

    //If credentials are not valid throw an error
    if (!checkCredentials(username, password)) {
        return res.status(401).json({message: 'Invalid credentials!'});
    }

    //If credentials are valid, generate a JWT token
    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});

    //send the token back to the frontend
    res.json({token});
});

//start server and connect it to port 8080
const startServer = async () => {
    try {
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
    } 
    //error call for if server does not start
    catch (error) {
        console.log(error);
    }
}

startServer();