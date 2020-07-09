const {remote} = require('electron');
const main = remote.require("./main");

document.getElementById("add-user-form-form").addEventListener("submit",e=>{
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var grade = document.getElementById("grade").value;
   // main.test({email,password,grade});
    
    
    main.addUser({
        email,
        password,
        grade,
    });
    main.closeWindow();
    
});