
//The modules 
const http = require('http');
const os = require('os');
const readline = require('readline');
const fs = require('fs');
require('dotenv').config({path:__dirname + '/.env'})

//Set up for localhost.
const hostname = '127.0.0.1';

 //whatever's in the environment variable PORT, or 3000 if there's nothing there.
const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World');
});

//The readline module provides interface for reading data (the user input).
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInput.question('Please choose one of the following options by typing a number: \n' +
                '1\t Read package.json \n' +
                '2\t Display OS info \n' +
                '3\t Start HTTP server \n', (answer) => {

    switch(parseInt(answer)) {
        case 1:
            readJSONPackage();
            break;
        case 2:
            displayOSInfo();
            break;
        case 3:
            startServer();
            break;
        case 4:
            closeApplication();
            break;
        default:
            console.log("Invalid selection, please enter a number between 1-3 to choose one of the available options: "); 
    }
    userInput.close();
})

//Read package.json file 
function readJSONPackage() {
    fs.readFile(__dirname + '/package.json', 'utf-8', (error, fileContent) => {
        if (!fileContent){
            console.log(error);
        } else {
            console.log(fileContent);
        }  
    });
}

//Display info about the operation system
function displayOSInfo() {

    console.log(`Getting OS Info...\n
    SYSTEM MEMORY: ${(os.totalmem() /1024 /1024 /1024).toFixed(2) + ' GB'}
    FREE MEMORY: ${(os.freemem() /1024 /1024 /1024).toFixed(2) + ' GB'}
    CPU CORES: ${os.cpus().length }
    ARCH: ${os.arch()}
    PLATFORM: ${os.platform()}
    RELEASE: ${os.release()}
    USER: ${os.userInfo().username}`);

}

//Starts the http Server
function startServer () {
    console.log('Starting HTTP server...');
    try {
        server.listen(port, hostname, () => {
            console.log(`Listening on port: ${hostname}:${port}`);
        });
    } catch (errorMessage){
        console.log('Failed to start the server!')
        console.error(errorMessage);
    }
}










