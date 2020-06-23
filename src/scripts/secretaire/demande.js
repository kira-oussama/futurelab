const {remote} = require('electron');
const main = remote.require("./main");

window.addEventListener("load", async e => {
    let analyses = await main.getAllanalyses();
    let select = document.getElementById("demande-analyse-select");
    
    for(let i=0; i < analyses[0].length ; i++){
        let option = document.createElement("option");
        option.value = analyses[0][i].analyseId;
        option.innerHTML = analyses[0][i].nom;
        select.appendChild(option);
    }

});


document.getElementById("demande-analyse-form").addEventListener("submit", e=>{
    e.preventDefault();
    let aid = document.getElementById('demande-analyse-select').value;
    let pid = JSON.parse(localStorage.getItem("patient"));
    pid = pid.patientId;

    main.demanderAnalyse(pid, aid);
    main.closeWindow();
});