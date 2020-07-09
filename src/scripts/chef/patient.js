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
        
        //values
        let nom = document.createTextNode(patients[0][i].nom);
        let prenom = document.createTextNode(patients[0][i].prenom);
        let sexe = document.createTextNode(patients[0][i].sexe);
        let cons = document.createTextNode("Consulter");
        
        //insert consulter to element p
        consulte.appendChild(cons);
        
        //appending
        nomCol.appendChild(nom);
        prenomCol.appendChild(prenom);
        sexeCol.appendChild(sexe);
        consultCol.appendChild(consulte);
       
    }
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




