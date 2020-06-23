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
        showFacture.appendChild(fact);

    }
});

const consulterPatient = async (id)=>{
   var patient = await main.getPatient(id);
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

const showFacture = async id=>{
    console.log(id)
    let facture = await main.getFacture(id);
    const fact = new jsPDF({
        orientation: "landscape",
        format: [250, 200]
    });

    fact.setTextColor("#007ee5");
    fact.text("Facture FutureLab", 10, 10);
    fact.setTextColor("#000");
    fact.setFontSize(10);
    fact.text(`Nom ${facture[0][0].nom}` , 10, 20);
    fact.text(`Prenom ${facture[0][0].prenom}` , 10, 25);
    fact.text(`Analyse ${facture[0][0].anom}` , 10, 30);
    fact.text(`Prix ${facture[0][0].prix} DA` , 10, 35);
    fact.setTextColor(0,255,0);
    if(facture[0][0].payed === 0){
        fact.text(`payé` , 10, 40);
    }
    fact.save(`${facture[0][0].nom}-${facture[0][0].prenom}-fact.pdf`);
}

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
        showFacture.appendChild(fact);

    }
    document.getElementById("search-patient").value = '';
});

document.getElementById("refresh-patients").addEventListener("click", ()=>{
    location.reload();
});

document.getElementById("deconnect").addEventListener("click", ()=>{
    location.href = "../index.html";
});

const seeResult = id=>{
    localStorage.setItem("patient_analyse", id);
    main.createNewWindow(720, 480, "src/pages/secretaire/resultat.html");
}