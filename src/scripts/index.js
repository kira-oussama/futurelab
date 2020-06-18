// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const {remote} = require('electron');
const main = remote.require("./main");



document.querySelector("#loginForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    await main.loginUser({
        email: email,
        password: password
    });
    
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});