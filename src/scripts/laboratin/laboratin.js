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
        setResult.setAttribute("class", "result resultBtn");

        envoyer.setAttribute("id", JSON.stringify(ids));
        envoyer.setAttribute("onClick", "valider(this.id)");
        envoyer.setAttribute("class", "valider resultBtn");
    

        //values
        let anom = document.createTextNode(demandes[0][i].analyse);
        let pnom = document.createTextNode(demandes[0][i].nom + " " + demandes[0][i].prenom);
        let res = document.createTextNode("Donner Resultat");
        let env = document.createTextNode("Valider");
        
        //appending
        nomAnalyse.appendChild(anom);
        nomPatient.appendChild(pnom);
        setResult.appendChild(res);
        //envoyer.appendChild(env);
        
        
    }

});

const setResult = id=>{
    localStorage.setItem("patient_analyse", id);
    main.createNewWindow(520, 480, "src/pages/laboratin/resultForm.html");
    
}

const valider = id=>{
    let data = JSON.parse(id);
    main.validateTask(data.aid);
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

document.getElementById("refresh-patients").addEventListener("click", ()=>{
    location.reload();
});


document.getElementById("deconnect-lab").addEventListener("click", e=>{
    location.href = "../index.html";
});