const { remote } = require("electron");
const main = remote.require("./main");


window.addEventListener("load", async ()=>{
    let analyses = await main.getAllanalyses();
    let conventions = await main.getAllconventions();
    
    let analysesTable = document.getElementById("analyses-table").getElementsByTagName("tbody")[0];
    for(let i=0; i< analyses[0].length ; i++){
        let newRow = analysesTable.insertRow(i);
        newRow.setAttribute('id', analyses[0][i].analyseId);
        newRow.setAttribute('onClick', 'deleteAnalyse(this.id)');

        //columns
        let nomCol = newRow.insertCell(0);
        let prixCol = newRow.insertCell(1);

        //values
        let nom = document.createTextNode(analyses[0][i].nom);
        let prix = document.createTextNode(analyses[0][i].prix);
        
        //appending
        nomCol.appendChild(nom);
        prixCol.appendChild(prix);
        
    }

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

document.getElementById("addAnalyseForm").addEventListener("submit", (e)=>{
    e.preventDefault();

    let name = document.getElementById("analyse-name").value;
    let price = document.getElementById("analyse-price").value;

    name = name.toLowerCase();
    price = price.toLowerCase();
    main.addAnalyse(name, price);
    location.reload();
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

document.getElementById("analyse-search-form").addEventListener("submit", async e=>{
    e.preventDefault();

    let searchValue = document.getElementById("analyse-search-input").value;

    let analyses = await main.getAnalyse(searchValue);

    let analysesTable = document.getElementById("analyses-table").getElementsByTagName("tbody")[0];
    analysesTable.innerHTML = "";
    for(let i=0; i< analyses[0].length ; i++){
        let newRow = analysesTable.insertRow(i);
        newRow.setAttribute('id', analyses[0][i].analyseId);
        newRow.setAttribute('onClick', 'deleteAnalyse(this.id)');

        //columns
        let nomCol = newRow.insertCell(0);
        let prixCol = newRow.insertCell(1);

        //values
        let nom = document.createTextNode(analyses[0][i].nom);
        let prix = document.createTextNode(analyses[0][i].prix);
        
        //appending
        nomCol.appendChild(nom);
        prixCol.appendChild(prix); 
    }
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

});

const deleteAnalyse = async id=>{
    await main.confirmDelete("DELETE FROM analyses WHERE analyseId = ?", id);
    location.reload();
}

const deleteConvention = async id=>{
    await main.confirmDelete("DELETE FROM conventions WHERE societe = ?", id);
    location.reload();
}