const {remote} = require("electron");
const main = remote.require("./main");

window.addEventListener("load", async ()=>{

    let demandes = await main.getDemendedAnalyses();

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
        let envoyer = newRow.insertCell(3);

        setResult.setAttribute("id", JSON.stringify(ids));
        setResult.setAttribute("onClick", "setResult(this.id)")
        setResult.setAttribute("class", "resultBtn");

        envoyer.setAttribute("id", JSON.stringify(ids));
        envoyer.setAttribute("onClick", "envoyerVersMS(this.id)")
        envoyer.setAttribute("class", "resultBtn");



        //values
        let anom = document.createTextNode(demandes[0][i].analyse);
        let pnom = document.createTextNode(demandes[0][i].nom + " " + demandes[0][i].prenom);
        let res = document.createTextNode("Donner Resultat");
        let env = document.createTextNode("Envoyer");
        
        //appending
        nomAnalyse.appendChild(anom);
        nomPatient.appendChild(pnom);
        setResult.appendChild(res);
        envoyer.appendChild(env);
        
    }

});

const setResult = id=>{
    localStorage.setItem("patient_analyse", id);
    main.createNewWindow(400, 480, "src/pages/laboratin/resultForm.html");
}

const envoyerVersMS = id=>{
    let data = JSON.parse(id);
    main.finishTask(data.aid);
    location.reload();
}

document.getElementById("search-form").addEventListener("submit", async e=>{
    e.preventDefault();

    let searchValue = document.getElementById('lab-search').value;
    let demandes = await main.searchByName(searchValue);

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

        setResult.setAttribute("id", JSON.stringify(ids));
        setResult.setAttribute("onClick", "setResult(this.id)")
        setResult.setAttribute("class", "resultBtn");

        //values
        let anom = document.createTextNode(demandes[0][i].analyse);
        let pnom = document.createTextNode(demandes[0][i].nom + " " + demandes[0][i].prenom);
        let res = document.createTextNode("Donner Resultat");
        
        //appending
        nomAnalyse.appendChild(anom);
        nomPatient.appendChild(pnom);
        setResult.appendChild(res);
        
    }
    
});

document.getElementById("deconnect-lab").addEventListener("click", e=>{
    location.href = "../index.html";
});