const { remote } = require("electron");
const main = remote.require("./main");

let dem=document.getElementById('dem');
window.addEventListener("load", async ()=>{
    let demendes = await main.getGroupdemendes();
    let dem=document.getElementById('dem');
    demendes[0].forEach(async element => {
        let patientId=element.patientId;
        let total=element.total;
       
         //get name of patient
         var patient = await main.getPatient(patientId);
         var nom = (patient[0][0].nom);
         var prenom = (patient[0][0].prenom);
    
            //add html row
            var html=`
            <tr class="text-light">
                <td>${nom} ${prenom}</td>
                <td>${total}</td>
                <td><button id=${patientId} class="btn btn-light" onclick="consulterDemandes(this.id)">Consulter</button></td>
            </tr>
            `;
            dem.innerHTML += html;
    });
});

const consulterDemandes=async id=>{
    localStorage.setItem('patientId', id);
    main.createNewWindow(500, 770, 'src/pages/preleveur/demandes.html');
}
document.getElementById("deconnect").addEventListener("click", ()=>{
    location.href = "../index.html";
});
document.getElementById("refresh").addEventListener("click", ()=>{
    location.reload();
});