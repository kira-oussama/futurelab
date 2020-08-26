const { remote } = require("electron");
const main = remote.require("./main");
const idana = localStorage.getItem('analyseID'); 
window.addEventListener("load", async ()=>{
    
    const analyse=await main.analyseByID(idana);
    
    document.getElementById("analyse-name").value = analyse[0][0].nom;
    document.getElementById("analyse-price").value = analyse[0][0].prix;
   
});

document.getElementById("addAnalyseForm").addEventListener("submit", (e)=>{
    e.preventDefault();

    let name = document.getElementById("analyse-name").value;
    let price = document.getElementById("analyse-price").value;

    name = name.toLowerCase();
    price = price.toLowerCase();
    main.updateAnalyse({idana, price});
    main.createNewWindow(650, 780, 'src/pages/chef/analyse.html');
    main.closeWindow();
    
});