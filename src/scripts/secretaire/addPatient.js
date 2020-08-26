const {remote} = require('electron');
const main = remote.require("./main");

window.addEventListener("load", async ()=>{
var entent=document.getElementById('entent');

var AllEntent = await main.getAllEnetent();

AllEntent[0].forEach(async enteteData => {
    let code=enteteData.code;
    let nom=enteteData.nom;
    
    var html=`
    <option value="${code}">${nom}</option>
    `;
    entent.innerHTML+=html;
});




});

document.getElementById("add-patient-form-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var sexe = document.getElementById("sexe").value;
    var bday = document.getElementById("bday").value;
    var phone = document.getElementById("phone").value;
    var CodeEntent = document.getElementById("entent").value;
    main.addPatient({
        nom,
        prenom,
        sexe,
        bday,
        phone,
        CodeEntent
    });
    main.closeWindow();
});


