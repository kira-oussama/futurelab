const {remote} = require("electron");
const { modifyPatient } = require("../../../main");
const main = remote.require("./main");


window.addEventListener("load", async ()=>{

    let demandes = await main.getWaitingAnalyses();

    let demandesTable = document.getElementById("laboratin-table").getElementsByTagName("tbody")[0];
    for(let i=0; i< demandes[0].length ; i++){
        let ids = {
            aid: demandes[0][i].analyseId,
            pid: demandes[0][i].patientId
        }
        let newRow = demandesTable.insertRow(i);

        //columns
        let nomAnalyse = newRow.insertCell(0);
        let nomPatient = newRow.insertCell(1);
        let setResult = newRow.insertCell(2);
        let modifyResult = newRow.insertCell(3);
        let envoyer = newRow.insertCell(4);

        setResult.setAttribute("id", JSON.stringify(ids));
        setResult.setAttribute("onClick", "seeResult(this.id)")
        setResult.setAttribute("class", "resultBtn");

        envoyer.setAttribute("id", JSON.stringify(ids));
        envoyer.setAttribute("onClick", "validerResult(this.id)")
        envoyer.setAttribute("class", "resultBtn");

        modifyResult.setAttribute("class", "resultBtn");
        modifyResult.setAttribute("onClick", "modifyResult()");

        //values
        let anom = document.createTextNode(demandes[0][i].analyse);
        let pnom = document.createTextNode(demandes[0][i].nom + " " + demandes[0][i].prenom);
        let res = document.createTextNode("Voire Resultat");
        let mod = document.createTextNode("Modifier");
        let env = document.createTextNode("Valider");
        
        //appending
        nomAnalyse.appendChild(anom);
        nomPatient.appendChild(pnom);
        setResult.appendChild(res);
        modifyResult.appendChild(mod);
        envoyer.appendChild(env);
        
    }

});

const seeResult = id=>{
    localStorage.setItem("patient_analyse", id);
    main.createNewWindow(720, 480, "src/pages/specialiste/resultForm.html");
}

const validerResult = id=>{
    let data = JSON.parse(id);
    main.validateTask(data.aid);
    location.reload();
}

const modifyResult = ()=>{
    main.createNewWindow(550, 480, "src/pages/specialiste/modifyType.html");
}

document.getElementById("search-form").addEventListener("submit", async e=>{
    e.preventDefault();
    let searchValue = document.getElementById('lab-search').value;
    let demandes = await main.searchWaittingAnalyses(searchValue);

    let demandesTable = document.getElementById("laboratin-table").getElementsByTagName("tbody")[0];
    demandesTable.innerHTML = "";
    for(let i=0; i< demandes[0].length ; i++){
        let ids = {
            aid: demandes[0][i].analyseId,
            pid: demandes[0][i].patientId
        }
        let newRow = demandesTable.insertRow(i);

        //columns
        let nomAnalyse = newRow.insertCell(0);
        let nomPatient = newRow.insertCell(1);
        let setResult = newRow.insertCell(2);
        let modifyResult = newRow.insertCell(3);
        let envoyer = newRow.insertCell(4);

        setResult.setAttribute("id", JSON.stringify(ids));
        setResult.setAttribute("onClick", "seeResult(this.id)")
        setResult.setAttribute("class", "resultBtn");

        envoyer.setAttribute("id", JSON.stringify(ids));
        envoyer.setAttribute("onClick", "validerResult(this.id)")
        envoyer.setAttribute("class", "resultBtn");

        modifyResult.setAttribute("class", "resultBtn");
        modifyResult.setAttribute("onClick", "modifyResult()");

        //values
        let anom = document.createTextNode(demandes[0][i].analyse);
        let pnom = document.createTextNode(demandes[0][i].nom + " " + demandes[0][i].prenom);
        let res = document.createTextNode("Voire Resultat");
        let mod = document.createTextNode("Modifier");
        let env = document.createTextNode("Valider");
        
        //appending
        nomAnalyse.appendChild(anom);
        nomPatient.appendChild(pnom);
        setResult.appendChild(res);
        modifyResult.appendChild(mod);
        envoyer.appendChild(env);
    }
});

document.getElementById("deconnect-lab").addEventListener("click", e=>{
    location.href = "../index.html";
});