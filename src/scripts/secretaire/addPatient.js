const {remote} = require('electron');
const main = remote.require("./main");

document.getElementById("add-patient-form-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var sexe = document.getElementById("sexe").value;
    var bday = document.getElementById("bday").value;
    var phone = document.getElementById("phone").value;
        
    main.addPatient({
        nom,
        prenom,
        sexe,
        bday,
        phone
    });
    main.closeWindow();
});