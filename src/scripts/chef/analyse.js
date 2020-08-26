const { remote } = require("electron");
const main = remote.require("./main");


window.addEventListener("load", async ()=>{
    let analyses = await main.getAllanalyses();
    
    let analysesTable = document.getElementById("analyses-table").getElementsByTagName("tbody")[0];
    for(let i=0; i< analyses[0].length ; i++){
        let newRow = analysesTable.insertRow(i);
        //newRow.setAttribute('id', analyses[0][i].analyseId);
        //newRow.setAttribute('onClick', 'deleteAnalyse(this.id)');

        //columns
        let nomCol = newRow.insertCell(0);
        let prixCol = newRow.insertCell(1);
        let updateCol=newRow.insertCell(2);
        let deleteCol=newRow.insertCell(3);
        
        
        let consulte = document.createElement('button');
        consulte.setAttribute('class', 'btn btn-success');
        consulte.setAttribute('id', analyses[0][i].analyseId);
        consulte.setAttribute('onClick', 'Analyse(this.id)');
        
        let cons = document.createTextNode("mise à jour le prix");
        consulte.appendChild(cons);

        let deleteAna = document.createElement('button');
        deleteAna.setAttribute('class', 'btn btn-danger');
        deleteAna.setAttribute('id', analyses[0][i].analyseId);
        deleteAna.setAttribute('onClick', 'deleteAnalyse(this.id)');
        
        let del = document.createTextNode("delete");
        deleteAna.appendChild(del);

        //values
        let nom = document.createTextNode(analyses[0][i].nom);
        let prix = document.createTextNode(analyses[0][i].prix);
        
        //appending
        nomCol.appendChild(nom);
        prixCol.appendChild(prix);
        updateCol.appendChild(consulte);
        deleteCol.appendChild(deleteAna);
        
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



const deleteAnalyse = async id=>{
    await main.confirmDelete("DELETE FROM analyses WHERE analyseId = ?", id);
    location.reload();
}

const Analyse = async id=>{
   
    localStorage.setItem('analyseID',id);
    main.createNewWindow(350, 480, 'src/pages/chef/updatePrix.html');
    main.closeWindow();
   
}
