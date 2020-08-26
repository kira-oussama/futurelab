const { remote } = require("electron");
const main = remote.require("./main");

let dem=document.getElementById('dem');
window.addEventListener("load", async ()=>{
var patient = await main.getPatient(localStorage.getItem('patientId'));
         var nom = (patient[0][0].nom);
         var prenom = (patient[0][0].prenom);
         document.querySelector('h3').textContent=(' La liste des demandes de patient '+nom+' '+prenom);

         var demandes=await main.getDemandeByIDPatient(localStorage.getItem('patientId'));
         demandes[0].forEach(async element => {
            if ((element.waiting)=== 0) {
                var apId=element.apId; 
            var analyse = await main.analyseByID(element.analyseId);
            var analyseName=analyse[0][0].nom;
            var date=element.demande_date; 
    
            if ((element.imprimer)=== 0) {
                var html=`
                <tr class="text-light">
                    <td>${analyseName}</td>
                    <td>${date.getDate()}-${date.getMonth()}-${date.getFullYear()}</td>
                    <td><button id=${apId} class="btn btn-warning" onclick="print(this.id)"><i class="fas fa-print"></i></button></td>
                </tr>
                `;
                dem.innerHTML += html;
             }else{
                var html=`
                <tr class="text-light">
                    <td>${analyseName}</td>
                    <td>${date.getDate()}-${date.getMonth()}-${date.getFullYear()}</td>
                    <td><button id=${apId} class="btn btn-success" onclick="valide(this.id)"><i class="fas fa-check"></i></button></td>
                </tr>
                `;
                dem.innerHTML += html;
             }
            }
            
         });

});         

const print =async id=>{
    localStorage.setItem('analyseID',id);
    main.createNewWindow(400, 570, 'src/pages/preleveur/print.html');
    main.closeWindow();
}
const valide =async id=>{
    await main.preleveDone(id);
    location.reload();
}
document.getElementById("refresh").addEventListener("click", ()=>{
    location.reload();
});