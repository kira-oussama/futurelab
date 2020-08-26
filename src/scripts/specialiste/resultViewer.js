const {remote} = require("electron");
const main = remote.require("./main");
const jsPDF = require("jspdf");

var pid ;

window.addEventListener("load", async ()=>{
    let data = await JSON.parse(localStorage.getItem("patient_analyse"));
    pid = await data.pid;
    let patient = await JSON.parse(localStorage.getItem("patient"));
    
    let patientget = await main.getPatient(pid);
    
    let results = await main.showResults(pid);
    
    // to get resultid
    localStorage.setItem("otherInfo", JSON.stringify(results[0][0]));
    
    document.getElementById("patientId").innerHTML = "N " + patientget[0][0].patientId;
    document.getElementById("nom").innerHTML = "Nom : " + patientget[0][0].nom;
    document.getElementById("prenom").innerHTML ="Prénom : " + patientget[0][0].prenom;
    document.getElementById("sexe").innerHTML ="Sexe : " + patientget[0][0].sexe;
    document.getElementById("dn").innerHTML = "Date de naissance : " + patientget[0][0].dn.toString().substring(0,10);
    document.getElementById("numero").innerHTML = "Téléphone : " + patientget[0][0].numero;
    
    // remark here
    document.getElementById("remark").innerHTML = results[0][0].remarque;
    

    for(let i=0; i< results[0].length; i++){
        // create table container
        let container = document.createElement("div");
        // create the title of table
        let type = document.createElement("p");
        type.appendChild(document.createTextNode(results[0][i].resultname + "  -  " + results[0][i].typeId));
        //add type to div
        container.appendChild(type);
        //table
        let demandesTable = document.createElement("table");
        demandesTable.setAttribute("id","laboratin-table");
        demandesTable.setAttribute("class","table");

        //thead
        let tableHead = document.createElement("thead");
        //tr
        let tableHeadRow = document.createElement("tr");

        // empty head colones
        let resultatColhead = tableHeadRow.insertCell(0);
        let uniteColhead = tableHeadRow.insertCell(1);
        let normesColhead = tableHeadRow.insertCell(2);
        let antColhead = tableHeadRow.insertCell(3);

        // text nodes
        let resultatText = document.createTextNode("Résultat");
        let uniteText = document.createTextNode("Unité");
        let normesText = document.createTextNode("Normes");
        let anterioriteText = document.createTextNode("Antériorité");

        // appending text to head
        resultatColhead.appendChild(resultatText);
        uniteColhead.appendChild(uniteText);
        normesColhead.appendChild(normesText);
        antColhead.appendChild(anterioriteText);

        let headWithRow = tableHead.appendChild(tableHeadRow);
        demandesTable.appendChild(headWithRow);

        // tbody
        let tableBody = document.createElement("tbody");
        // tr
        let tableBodyRow = document.createElement("tr");
        // cols
        let resultatColBody = tableBodyRow.insertCell(0);
        let uniteColBody = tableBodyRow.insertCell(1);
        let normesColBody = tableBodyRow.insertCell(2);
        let antColBody = tableBodyRow.insertCell(3);

        // text nodes
        let resultatTextb = document.createTextNode(results[0][i].resultat);
        let uniteTextb = document.createTextNode(results[0][i].Unité);
        let normesTextb = document.createTextNode(results[0][i].normes);
        let anterioriteTextb = document.createTextNode(results[0][i].Antériorité);

        // appending all
        resultatColBody.appendChild(resultatTextb);
        uniteColBody.appendChild(uniteTextb);
        normesColBody.appendChild(normesTextb);
        antColBody.appendChild(anterioriteTextb);
        let tableBodyWithRows = tableBody.appendChild(tableBodyRow);
        demandesTable.appendChild(tableBodyWithRows);

        container.appendChild(demandesTable);
        document.getElementById("tables-types-container").appendChild(container);
    }

});

document.getElementById("med-add-remark").addEventListener("submit", (e)=>{
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("otherInfo"));
    let resultId = data.resultId;
    let remark = document.getElementById("remark-input").value;
    
    main.addRemark(resultId, remark);
    location.reload();
});


document.getElementById("imprimer-fact").addEventListener("click", ()=>{
   
    var result = new jsPDF();
    var source = document.getElementsByTagName("body")[0];
     result.fromHTML(source,10,10);
     result.save('test.pdf');
    setTimeout(() => {
        main.deletePatient(pid);
        
    }, 1000);
});