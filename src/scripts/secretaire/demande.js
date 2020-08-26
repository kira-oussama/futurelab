const {remote} = require('electron');
const main = remote.require("./main");
const jsPDF = require("jspdf");

window.addEventListener("load", async e => {
    let analyses = await main.getAllanalyses();
    //let colors = await main.getAllColors();
    let select = document.getElementById("demande-analyse-select");
    //let colorSelect = document.getElementById("demande-analyse-color-select");
    
    for(let i=0; i < analyses[0].length ; i++){
        let option = document.createElement("option");
        option.value = analyses[0][i].analyseId;
        option.innerHTML = analyses[0][i].nom;
        select.appendChild(option);
    }
    /*
    for(let j=0; j< colors[0].length ; j++){
        let option = document.createElement("option");
        option.value = colors[0][j].colorId;
        option.innerHTML = colors[0][j].color;
        colorSelect.appendChild(option);
    }
    */

});


document.getElementById("demande-analyse-form").addEventListener("submit", async e=>{
    e.preventDefault();

   // let cid =  document.getElementById("demande-analyse-color-select").value;
    let aid =  document.getElementById('demande-analyse-select').value;
    let pid = JSON.parse(localStorage.getItem("patient"));
    pid = pid.patientId;

    //let number = document.getElementById("color-number").value;
    const patient = await main.getPatient(pid);
    
    let baseEntentCode='1001'
    if((patient[0][0].codeEntent)===baseEntentCode){
        // if patient is from base entent
        main.demanderAnalyse(pid, aid);
    }else{
        //if patient is from anouther entent
        main.demanderAnalysedirect(pid, aid);
    }
    
   
    main.closeWindow();

});