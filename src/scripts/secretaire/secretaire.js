const {remote} = require('electron');
const main = remote.require("./main");
const jsPDF = require("jspdf");

window.addEventListener("load" , async () => {
    let patients = await main.getAllPatients();
    let table = document.getElementById("patient-table").getElementsByTagName("tbody")[0];
    for(let i=0; i< patients[0].length ; i++){
        let ids = {
            aid: patients[0][i].analyseId,
            pid: patients[0][i].patientId
        }
        let newRow = table.insertRow(i);
        let consulte = document.createElement('p');
        consulte.setAttribute('class', 'consluteButton');
        consulte.setAttribute('id', patients[0][i].patientId);
        consulte.setAttribute('onClick', "consulterPatient(this.id)")

        //columns
        let idCol = newRow.insertCell(0);
        let nomCol = newRow.insertCell(1);
        let prenomCol = newRow.insertCell(2);
        let sexeCol = newRow.insertCell(3);
        let consultCol = newRow.insertCell(4);
        let showResultCol = newRow.insertCell(5);
        let showFacture = newRow.insertCell(6);

        //values
        let id = document.createTextNode(patients[0][i].patientId);
        let nom = document.createTextNode(patients[0][i].nom);
        let prenom = document.createTextNode(patients[0][i].prenom);
        let sexe = document.createTextNode(patients[0][i].sexe);
        let cons = document.createTextNode("Consulter");
        let res = document.createTextNode("Resultat");
        let fact = document.createTextNode("Facture");

        showFacture.setAttribute("class", "factureBtn");
        showFacture.setAttribute("id", patients[0][i].patientId);
        showFacture.setAttribute("onClick", "showFacture(this.id)");

        showResultCol.setAttribute("id", JSON.stringify(ids));
        showResultCol.setAttribute("class", "factureBtn");
        showResultCol.setAttribute("onClick", "seeResult(this.id)")

        //insert consulter to element p
        consulte.appendChild(cons);
        
        //appending
        idCol.appendChild(id);
        nomCol.appendChild(nom);
        prenomCol.appendChild(prenom);
        sexeCol.appendChild(sexe);
        consultCol.appendChild(consulte);
        showResultCol.appendChild(res);
       // showFacture.appendChild(fact);

    }

    var entent=document.getElementById('filtre-patient-select');
    //filtre
    var AllEntent = await main.getAllEnetent();
    var html=`
        <option value="-1">Tout</option>
        `;
        entent.innerHTML+=html;
    AllEntent[0].forEach(async enteteData => {
        let code=enteteData.code;
        let nom=enteteData.nom;
        
        var html=`
        <option value="${code}">${nom}</option>
        `;
        entent.innerHTML+=html;
    });
});

document.getElementById("add-patient").addEventListener("click", ()=>{
    main.createNewWindow(600, 480, 'src/pages/secretaire/addpatient.html');
});

document.getElementById("search-patient-form").addEventListener("submit", async e=>{
    e.preventDefault();
    let searchValue = document.getElementById("search-patient").value;
    let patients = await main.getPatientsByName(searchValue);
    let table = document.getElementById("patient-table").getElementsByTagName("tbody")[0];
    table.innerHTML = "";
    for(let i=0; i< patients[0].length ; i++){
        let ids = {
            aid: patients[0][i].analyseId,
            pid: patients[0][i].patientId
        }
        let newRow = table.insertRow(i);
        let consulte = document.createElement('p');
        consulte.setAttribute('class', 'consluteButton');
        consulte.setAttribute('id', patients[0][i].patientId);
        consulte.setAttribute('onClick', "consulterPatient(this.id)")

        //columns
        let nomCol = newRow.insertCell(0);
        let prenomCol = newRow.insertCell(1);
        let sexeCol = newRow.insertCell(2);
        let consultCol = newRow.insertCell(3);
        let showResultCol = newRow.insertCell(4);
        let showFacture = newRow.insertCell(5);

        //values
        let nom = document.createTextNode(patients[0][i].nom);
        let prenom = document.createTextNode(patients[0][i].prenom);
        let sexe = document.createTextNode(patients[0][i].sexe);
        let cons = document.createTextNode("Consulter");
        let res = document.createTextNode("Resultat");
        let fact = document.createTextNode("Facture");

        showFacture.setAttribute("class", "factureBtn");
        showFacture.setAttribute("id", patients[0][i].patientId);
        showFacture.setAttribute("onClick", "showFacture(this.id)");

        showResultCol.setAttribute("id", JSON.stringify(ids));
        showResultCol.setAttribute("class", "factureBtn");
        showResultCol.setAttribute("onClick", "seeResult(this.id)")

        //insert consulter to element p
        consulte.appendChild(cons);
        
        //appending
        nomCol.appendChild(nom);
        prenomCol.appendChild(prenom);
        sexeCol.appendChild(sexe);
        consultCol.appendChild(consulte);
        showResultCol.appendChild(res);
        //showFacture.appendChild(fact);

    }
    document.getElementById("search-patient").value = '';
});

document.getElementById("filtre-patient-form").addEventListener("submit", async e=>{
    e.preventDefault();
    let table = document.getElementById("patient-table").getElementsByTagName("tbody")[0];
    table.innerHTML = "";
    var code=document.getElementById('filtre-patient-select').value;
    if (code == -1) {
        var patients = await main.getAllPatients();
    }else{
        var patients= await main.getAllPatientsofEntent(code);
    }

    for(let i=0; i< patients[0].length ; i++){
        let ids = {
            aid: patients[0][i].analyseId,
            pid: patients[0][i].patientId
        }
        let newRow = table.insertRow(i);
        let consulte = document.createElement('p');
        consulte.setAttribute('class', 'consluteButton');
        consulte.setAttribute('id', patients[0][i].patientId);
        consulte.setAttribute('onClick', "consulterPatient(this.id)")

        //columns
        let idCol = newRow.insertCell(0);
        let nomCol = newRow.insertCell(1);
        let prenomCol = newRow.insertCell(2);
        let sexeCol = newRow.insertCell(3);
        let consultCol = newRow.insertCell(4);
        let showResultCol = newRow.insertCell(5);
        let showFacture = newRow.insertCell(6);

        //values
        let id = document.createTextNode(patients[0][i].patientId);
        let nom = document.createTextNode(patients[0][i].nom);
        let prenom = document.createTextNode(patients[0][i].prenom);
        let sexe = document.createTextNode(patients[0][i].sexe);
        let cons = document.createTextNode("Consulter");
        let res = document.createTextNode("Resultat");
        let fact = document.createTextNode("Facture");

        showFacture.setAttribute("class", "factureBtn");
        showFacture.setAttribute("id", patients[0][i].patientId);
        showFacture.setAttribute("onClick", "showFacture(this.id)");

        showResultCol.setAttribute("id", JSON.stringify(ids));
        showResultCol.setAttribute("class", "factureBtn");
        showResultCol.setAttribute("onClick", "seeResult(this.id)")

        //insert consulter to element p
        consulte.appendChild(cons);
        
        //appending
        idCol.appendChild(id);
        nomCol.appendChild(nom);
        prenomCol.appendChild(prenom);
        sexeCol.appendChild(sexe);
        consultCol.appendChild(consulte);
        showResultCol.appendChild(res);
        //showFacture.appendChild(fact);

    }

})

document.getElementById("refresh-patients").addEventListener("click", ()=>{
    location.reload();
});

document.getElementById("deconnect").addEventListener("click", ()=>{
    location.href = "../index.html";
});

const consulterPatient = async (id)=>{
    var patient = await main.getPatient(id);
    console.log(patient[0][0].societe)
    var patientInfo = {
        patientId: patient[0][0].patientId,
        nom: patient[0][0].nom,
        prenom: patient[0][0].prenom,
        sexe: patient[0][0].sexe,
        bday: patient[0][0].dn,
        phone: patient[0][0].numero
    }
    localStorage.setItem('patient', JSON.stringify(patientInfo));
    main.createNewWindow(600, 570, 'src/pages/secretaire/showpatientinfo.html');
 }

const seeResult = id=>{
    localStorage.setItem("patient_analyse", id);
    main.createNewWindow(720, 480, "src/pages/secretaire/resultat.html");
}