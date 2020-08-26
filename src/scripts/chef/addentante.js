const {remote} = require('electron');
const main = remote.require("./main");

document.getElementById("add-entante-form-form").addEventListener("submit",e=>{
    e.preventDefault();
    var code = document.getElementById("code").value;
    var nom = document.getElementById("nom").value;
    var address = document.getElementById("address").value;
    var telephone = document.getElementById("telephone").value;

    main.addEntante({code,nom,address,telephone});
    main.closeWindow();
    
});