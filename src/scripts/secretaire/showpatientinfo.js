const {remote} = require('electron');
const main = remote.require("./main");

window.addEventListener("load", ()=>{
    const patient = JSON.parse(localStorage.getItem('patient'));
    let birthday = patient.bday.toString();
    birthday = birthday.substring(0,10);
    document.getElementById("nom").value = patient.nom;
    document.getElementById("prenom").value = patient.prenom;
    document.getElementById("sexe").value = patient.sexe;
    document.getElementById("bday").value = birthday;
    document.getElementById("phone").value = patient.phone;
});

document.getElementById("add-patient-form-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    var id = JSON.parse(localStorage.getItem("patient"));
    id = id.patientId;
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var sexe = document.getElementById("sexe").value;
    var bday = document.getElementById("bday").value;
    var phone = document.getElementById("phone").value;
    
    main.modifyPatient(id,{
        nom,
        prenom,
        sexe,
        bday,
        phone,
        id
    });
    main.closeWindow();
});


document.getElementById("delete-patient").addEventListener("click", ()=>{
    var id = JSON.parse(localStorage.getItem("patient"));
    id = id.patientId;
    main.deletePatient(id);
    main.closeWindow();
});