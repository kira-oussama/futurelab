const { remote } = require("electron");
const main = remote.require("./main");
const jsPDF = require("jspdf");

window.addEventListener("load", async ()=>{
    var demandeId= localStorage.getItem('analyseID');
    var demande = await main.getdemende(demandeId);
    var patientId =demande[0][0].patientId;
    var analyseId=demande[0][0].analyseId;

    var analyse = await main.analyseByID(analyseId);
    var analyseName=analyse[0][0].nom;
    var patient = await main.getPatient(patientId);
    var nom = (patient[0][0].nom);
    var prenom = (patient[0][0].prenom);
    var date=new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d=date.getDate()+' '+months[date.getMonth()]+' '+date.getFullYear()+' a : '+date.getHours()+':'+date.getMinutes();
    
    document.getElementById('nomPatient').textContent=nom;
    document.getElementById('prenomPatient').textContent=prenom;
    document.getElementById('nameAnalyse').textContent=analyseName;
    document.getElementById('datePrlevment').textContent=d;

    document.querySelector('form').nom.value=nom;
    document.querySelector('form').prnom.value=prenom;
    document.querySelector('form').analyse.value=analyseName;
    document.querySelector('form').date.value=d;

    var colors=await main.getAllColors()
    
    colors[0].forEach(async color => {
        let value=color.colorId;
        let name=color.color;
        var html=`<option value="${value}">${name}</option>`;
        document.querySelector('select').innerHTML +=html;
    });
   

});

document.querySelector('form').addEventListener('submit',async e=>{
    e.preventDefault();
    var nom=document.querySelector('form').nom.value;
    var prnom=document.querySelector('form').prnom.value;
    var analyse=document.querySelector('form').analyse.value;
    var date=document.querySelector('form').date.value;
    var color=document.querySelector('form').color.value;
    
    print({nom,prnom,analyse,date},{color});
    await main.isImprimed(localStorage.getItem('analyseID'));
    setInterval(main.createNewWindow(500, 770, 'src/pages/preleveur/demandes.html'),2000);
    setInterval(main.closeWindow(),2000);
});

const print=(info,propriter)=>{
   var color;var height;
    switch (propriter.color) {
        //blue
        case '1':
            color="#0040ff";
            break;
        //green    
        case '2':
            color="#73e600";
            break;
        //red    
        case '3':
            color="#ff5c33";
            break;
        //gris
        case '8':
            color="#cccccc";
            break;
        //jaune
        case '6':
            color="#ffff00";
            break;
        //pink
        case '9':
            color="#ffb3d9";
            break ;
        //purple
        case '7':
            color="#dd99ff";
            break ;    

        default:
            break;
    }
    
    var tickets = new jsPDF();
    tickets.setFillColor(color);
    tickets.rect(5, 5, 100, 30, "F");
    let spacing = 10;
   
        tickets.setTextColor('#000');
        tickets.setFontSize(10);
        tickets.text(`Nom :${info.nom}` , 10, spacing);spacing += 5;
        tickets.text(`Prénom :${info.prnom}` , 10, spacing);
        spacing += 5;
        tickets.text(`Analyse :${info.analyse}` , 10, spacing);
        spacing += 5;
        tickets.text(`Date :${info.date}` , 10, spacing);
        spacing += 10;
    
    tickets.save(`tecket.pdf`);
    
}