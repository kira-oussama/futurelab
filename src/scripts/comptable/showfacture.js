const {remote} = require('electron');
const main = remote.require("./main");
const jsPDF = require("jspdf");

window.addEventListener("load", async ()=>{
 var CodeEntent=localStorage.getItem('CodeEntent');
 var entent=await main.getEnetent(CodeEntent);
 let patients = await main.getAllPatientsofEntent(CodeEntent);

 var total_price=0;
 for(let i=0; i< patients[0].length ; i++){
               
    let ids = {
        aid: patients[0][i].analyseId,
        pid: patients[0][i].patientId
    }

    let facture = await main.getFacture(patients[0][i].patientId);
    //get la somme de facture
    var somme;
    main.test(facture)
    if(facture[0][0].societe != null){
        

        if(convention[0][0].type === 'total'){
            for(let i=0; i< facture[0].length; i++){
                prix_finale += facture[0][i].prix;
            }
            prix_finale = (prix_finale*convention[0][0].pourcentage) / 100;
        }else{
            for(let i=0; i< facture[0].length; i++){
                prix_finale += (facture[0][i].prix*convention[0][0].pourcentage) / 100
            }
        }

        somme=prix_finale;
    }else{
        let prix_finale = 0;
        for(let i=0; i< facture[0].length; i++){
            prix_finale += facture[0][i].prix;
        }

        somme=prix_finale;
    }
    total_price += somme;
   // document.querySelector('p').innerHTML+=`<h1>${somme}</h1>`;
    
    }
   // document.querySelector('strong').innerHTML+=`<h1>${total_price}</h1>`;

    var code=entent[0][0].code;
    var nom=entent[0][0].nom;
    var address=entent[0][0].address;
    var telephone=entent[0][0].telephone;
    var nombrePatients=patients[0].length;
       
    var html=`
    <h2>Facture Grouper de l'antenne :</h2>
    <br>
    <p><strong>code :</strong>&nbsp; ${code}</p>
    <p><strong>nom :</strong>&nbsp; ${nom}</p>
    <p><strong>address :</strong>&nbsp; ${address}</p>
    <p><strong>telephone :</strong>&nbsp; ${telephone}</p>
    <p><strong>nombre total des patients :</strong>&nbsp; ${nombrePatients}</p>
    <p><strong>le prix total pour l'antenne :</strong>&nbsp; ${total_price} DA</p>
    <button class="btn btn-primary" type="button"
        onclick='printFactureGrouper("${code}","${nom}","${address}","${telephone}","${nombrePatients}","${total_price}")' ">
        <i class= "fas fa-print" ></i>&nbsp; imprimer
    </button>
    `;
    document.getElementById('info').innerHTML=html; 


});

const printFactureGrouper=(code,nom,address,telephone,nombrePatients,total_price)=>{
    var fac = new jsPDF();
    fac.setFillColor('#fff');
    fac.rect(5, 5, 100, 30, "F");
    let spacing = 10;
   
    fac.setTextColor('#000');
    fac.setFontSize(10);
    
    fac.text("Facture Grouper de l'entent :" , 10, spacing);spacing += 10;
    fac.text(`Code :${code}` , 10, spacing);spacing += 10;
    fac.text(`Nom :${nom}` , 10, spacing);spacing += 10;
    fac.text(`Address :${address}` , 10, spacing);spacing += 10;
    fac.text(`Telephone :${telephone}` , 10, spacing);spacing += 10;
    fac.text(`Nombre total des patients :${nombrePatients}` , 10, spacing);spacing += 10;
    fac.text(`Le prix total pour l'entent  :${total_price}` , 10, spacing);spacing += 10
       
    fac.save(`${nom}_facture.pdf`);
}