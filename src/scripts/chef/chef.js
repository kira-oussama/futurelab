const { BrowserWindow, Notification, dialog} = require('electron');
const { remote } = require("electron");
const main = remote.require("./main");

window.addEventListener("load", async ()=>{
    let conventions = await main.getAllconventions();
    let demendes = await main.getAlldemendes();
    let dem=document.getElementById('dem');
    var d = new Date();
    // get each demande info 
    demendes[0].forEach(async element => {
        let num_demande=element.apId;
        let demande_date=element.demande_date;
        // displaye the demande if here date is today and is not waiting
        if ((d.getFullYear()===demande_date.getFullYear())&&
        (d.getMonth()===demande_date.getMonth())&&
        (d.getDate()===demande_date.getDate())&&
        (element.waiting=== 0)) {
            //get name of patient
            var patient = await main.getPatient(element.patientId);
            var nom = (patient[0][0].nom);
            var prenom = (patient[0][0].prenom);
            // get nom of analyse
            var analyse = await main.analyseByID(element.analyseId);
            var analyseName=analyse[0][0].nom;
            
            //add html row
           var html=`
            <tr class="text-light">
                <td>${num_demande}</td>
                <td>${nom} ${prenom}</td>
                <td>${analyseName}</td>
                <td>Aujourd'hui à &nbsp; &nbsp; "${demande_date.getHours()}:${demande_date.getMinutes()}"</td>
            </tr>
            `;
            dem.innerHTML += html;
        } 
    });
    let conventionsTable = document.getElementById("conventions-table").getElementsByTagName("tbody")[0];
    for(let i=0; i< conventions[0].length ; i++){
        let newRow = conventionsTable.insertRow(i);
        newRow.setAttribute('id', conventions[0][i].societe);
        newRow.setAttribute('onClick', 'deleteConvention(this.id)');

        //columns
        let societeCol = newRow.insertCell(0);
        let pourcentageCol = newRow.insertCell(1);
        let typeCol = newRow.insertCell(2);

        //values
        let societe = document.createTextNode(conventions[0][i].societe);
        let pourcentage = document.createTextNode(conventions[0][i].pourcentage);
        let type = document.createTextNode(conventions[0][i].type);
        
        //appending
        societeCol.appendChild(societe);
        pourcentageCol.appendChild(pourcentage);
        typeCol.appendChild(type);
        
    }
});


document.getElementById("addConvention").addEventListener("submit", e=>{
    e.preventDefault();

    let societe = document.getElementById("society-name").value;
    let pourcentage = document.getElementById("convention-price").value;
    let type = document.getElementById("convention-type").value;

    societe = societe.toLowerCase();
    pourcentage = pourcentage.toLowerCase();
    type = type.toLowerCase();

    main.addConvention(societe, pourcentage, type);
    location.reload();

});
document.getElementById("convention-search-form").addEventListener("submit", async e=>{
    e.preventDefault();

    let searchValue = document.getElementById("convention-search-input").value;

    let conventions = await main.getConvention(searchValue);

    let conventionsTable = document.getElementById("conventions-table").getElementsByTagName("tbody")[0];
    conventionsTable.innerHTML = "";
    for(let i=0; i< conventions[0].length ; i++){
        let newRow = conventionsTable.insertRow(i);
        newRow.setAttribute('id', conventions[0][i].societe);
        newRow.setAttribute('onClick', 'deleteConvention(this.id)');

        //columns
        let societeCol = newRow.insertCell(0);
        let pourcentageCol = newRow.insertCell(1);
        let typeCol = newRow.insertCell(2);

        //values
        let societe = document.createTextNode(conventions[0][i].societe);
        let pourcentage = document.createTextNode(conventions[0][i].pourcentage);
        let type = document.createTextNode(conventions[0][i].type);
        
        //appending
        societeCol.appendChild(societe);
        pourcentageCol.appendChild(pourcentage);
        typeCol.appendChild(type);
        
    }
    document.getElementById("convention-search-input").value="";

});
const deleteConvention = async id=>{
    await main.confirmDelete("DELETE FROM conventions WHERE societe = ?", id);
    location.reload();
}


document.getElementById("add-user").addEventListener("click", ()=>{
  main.createNewWindow(350, 480, 'src/pages/chef/adduser.html');
});
document.getElementById("add-entante").addEventListener("click", ()=>{
    main.createNewWindow(410, 480, 'src/pages/chef/addentante.html');
});
document.getElementById("analyse").addEventListener("click", ()=>{
    main.createNewWindow(650, 780, 'src/pages/chef/analyse.html');
});

 
document.getElementById('patient').addEventListener("click", ()=>{
    main.createNewWindow(500, 780, 'src/pages/chef/patient.html');
});

document.getElementById('com').addEventListener("click", ()=>{
    main.lodeuser('src/pages/comptable/comptable.html')
});
document.getElementById('prv').addEventListener("click", ()=>{
    main.lodeuser('src/pages/preleveur/preleveur.html')
});
document.getElementById('med').addEventListener("click", ()=>{
    main.lodeuser('src/pages/laboratin/laboratin.html')
});
document.getElementById('scr').addEventListener("click", ()=>{
    main.lodeuser('src/pages/secretaire/secretaire.html')
});

document.getElementById("refresh-patients").addEventListener("click", ()=>{
    location.reload();
});


document.getElementById("deconnect").addEventListener("click", ()=>{
    location.href = "../index.html";
});