const {remote} = require('electron');
const main = remote.require("./main");

window.addEventListener("load", async ()=>{
var entent=document.getElementById('entent');

var AllEntent = await main.getAllEnetent();

AllEntent[0].forEach(async enteteData => {
    let code=enteteData.code;
    let nom=enteteData.nom;
    
    if (code != 1001) {
        var html=`
        <option value="${code}">${nom}</option>
        `;
        entent.innerHTML+=html; 
    }
   
});

});

document.getElementById("Facture-Grouper-form-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    var CodeEntent = document.getElementById("entent").value;
    
    localStorage.setItem('CodeEntent',CodeEntent);
    main.createNewWindow(380, 550, 'src/pages/comptable/showfacture.html');
    main.closeWindow();
});