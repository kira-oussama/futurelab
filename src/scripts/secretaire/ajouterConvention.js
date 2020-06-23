const {remote} = require('electron');
const main = remote.require("./main");

window.addEventListener("load", async e => {
    let conventions = await main.getAllconventions();
    let select = document.getElementById("convention-patient-select");
    console.log(conventions);
    
    for(let i=0; i < conventions[0].length ; i++){
        let option = document.createElement("option");
        option.value = conventions[0][i].societe;
        option.innerHTML = conventions[0][i].societe;
        select.appendChild(option);
    }

});


document.getElementById("convention-patient-form").addEventListener("submit", e=>{
    e.preventDefault();

    let pid = JSON.parse(localStorage.getItem("patient"));
    pid = pid.patientId;
    let societe = document.getElementById("convention-patient-select").value;

    main.AjouterConvention(pid, societe);

    main.closeWindow();
});