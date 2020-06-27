// Modules to control application life and create native browser window
const { BrowserWindow, Notification, dialog} = require('electron');
const path = require('path');
const {getConnection} = require('./database');
const { type } = require('os');


// login All users
const loginUser = (user)=>{
  const conn = getConnection();
  conn.query("SELECT * FROM users WHERE email = ? AND password = ?",[user.email,user.password], (err, res)=>{
    if(err) throw err;

    if(res.length === 1){ 

      var window = BrowserWindow.getFocusedWindow();
      switch (res[0].grade) {
        case "sec":
          window.loadFile('src/pages/secretaire/secretaire.html');
          break;

        case "com":
          window.loadFile('src/pages/comptable/comptable.html');
          break;
        
        case "lab":
          window.loadFile('src/pages/laboratin/laboratin.html');
          break;

        case "med":
          window.loadFile('src/pages/specialiste/specialiste.html');
          break;
      
        default:
          break;

      }


    }else{
      dialog.showMessageBox({type: "error", message: "vos informations d'identification sont erronées"});
    }
    
  });
}

const closeWindow = ()=>{
  let window = BrowserWindow.getFocusedWindow();
  window.close();
}

const test = value=>{
  console.log(value);
}



// secretaire funcitons
const createNewWindow = (height, width, location)=>{
  const addPatientWindow = new BrowserWindow({
    height: height,
    width: width,
    webPreferences: {
      preload: path.join(__dirname, 'src/scripts/preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  addPatientWindow.loadFile(location);
  addPatientWindow.setMenuBarVisibility(false);
  addPatientWindow.setResizable(false);
}

const addPatient = patient=>{
  const conn = getConnection();
  conn.query("INSERT INTO patients(nom, prenom, sexe, dn, numero) VALUES(?,?,?,?,?)",[patient.nom, patient.prenom, patient.sexe, patient.bday, patient.phone], (err, result)=>{
    if (err) throw err;

    if(result.affectedRows === 1){
      dialog.showMessageBox({type: "info", message: "votre patient est inséré dans la base de données"})
    }
  });
}

const modifyPatient = (id, patient)=>{
  const conn = getConnection();
  conn.query("UPDATE patients SET nom=?, prenom=?, sexe=?, dn=?, numero=? WHERE patientId=?",[patient.nom, patient.prenom, patient.sexe, patient.bday, patient.phone, patient.id], (err, result)=>{
    if (err) throw err;
    
    if(result.affectedRows === 1){
      dialog.showMessageBox({type: "info", message: "votre patient est modifié dans la base de données"});
    }

  });
}

const deletePatient = id=>{
  const conn = getConnection();
  conn.query("DELETE FROM patients WHERE patientId=?",[id],(err, result)=>{
    if(err) throw err;

    if(result.affectedRows === 1){
      dialog.showMessageBox({type: "info", message: "votre patient est supprimé dans la base de données"});
    }else{
      dialog.showMessageBox({type: "error", message: "votre patient n'est pas supprimé dans la base de données"});
    }
    
  });
}

const getAllPatients = async ()=>{
  const conn = getConnection();
  var patients = [];
  
  // await conn.query("SELECT p.*, a.analyseId FROM patients p, analyses_patients ap, analyses a WHERE a.analyseId = ap.analyseId AND p.patientId = ap.patientId", (err, result)=>{
  await conn.query("SELECT * FROM patients", (err, result)=>{
  if (err) throw err;
    
    patients.push(result);
  });

  return(patients);
}

const getPatient = async (id) =>{
  const conn = getConnection();
  var patient = [];
  await conn.query("SELECT * FROM patients WHERE patientId = ?",[id], (err, result)=>{
    if (err) throw err;

    patient.push(result);
  });

  return (patient);
}

const getPatientsByName = async (name)=>{
  const conn = getConnection();
  const patients = [];
  const query = await conn.query("SELECT * FROM patients WHERE nom = ?",[name], (err, result)=>{
    if (err) throw err;

    patients.push(result);
  });
  return patients;
}

const demanderAnalyse = (pid, aid, cid)=>{
  const conn = getConnection();
  conn.query("INSERT INTO analyses_patients (patientId, analyseId, colorId) VALUES (?, ?, ?)", [pid, aid, cid], (err, result)=>{
    if (err) throw err;

    if(result.affectedRows===1){
      dialog.showMessageBox({type: "info", message: "l'analyse a été demandé"});
    }
  });
}

const AjouterConvention = (pid, societe)=>{
  const conn = getConnection();
  conn.query("UPDATE patients SET societe=? WHERE patientId=?", [societe, pid], (err, result)=>{
    if (err) throw err;

    if(result.affectedRows === 1){
      dialog.showMessageBox({type: "info", message: "la convention a été ajouté"});
    }

  });
}

const getFacture = async (pid)=>{
  const conn = getConnection();
  var facture = [];
  await conn.query("SELECT a.nom as anom, a.prix, p.* FROM patients p, analyses a, analyses_patients ap WHERE a.analyseId = ap.analyseId AND p.patientId = ap.patientId AND p.patientId=?",[pid],(err, result)=>{
    if (err) throw err;

    facture.push(result);
  });
  return facture;
}

const getAllColors = async ()=>{
  const conn = getConnection();
  var colors = [];
  await conn.query("SELECT * FROM colors", (err, result)=>{
    if(err) throw err;

    colors.push(result);
  });

  return colors;
}

const checkConvention = async (pid)=>{
  const conn = getConnection();
  var results = [];
  await conn.query("SELECT * FROM conventions WHERE societe=?",[pid], (err, result)=>{
    if(err) throw err; 

    results.push(result);
  });

  return results;
}

const getColorById = async cid =>{
  const conn = getConnection();
  let color = []
  conn.query("select color from colors where colorId=? ",[cid], (err, result)=>{
    if(err) throw err;

    color.push(result);
  });

  return color;
}

// comptable functions
const addAnalyse = (nom, prix)=>{
  const conn = getConnection();
  conn.query("INSERT INTO analyses(nom, prix) values (?, ?)",[nom, prix], (err, result)=>{
    if (err) throw err;

    if(result.affectedRows === 1){
      dialog.showMessageBox({type: "info", message: "l'analyse a été ajouté"});
    }
  });
}

const addConvention = (societe, pourcentage, type)=>{
  const conn = getConnection();
  conn.query("INSERT INTO conventions(societe, pourcentage, type) values (?, ?, ?)",[societe, pourcentage, type], (err, result)=>{
    if (err) throw err;

    dialog.showMessageBox({type: "info", message: "la convention a été ajouté"});

  });
}

const getAllanalyses = async ()=>{
  const conn = getConnection();
  var analyses = [];
  
  await conn.query("SELECT * FROM analyses", (err, result)=>{
    if (err) throw err;
    
    analyses.push(result);
  });

  return(analyses);
}

const getAllconventions = async ()=>{
  const conn = getConnection();
  var conventions = [];
  
  await conn.query("SELECT * FROM conventions", (err, result)=>{
    if (err) throw err;
    
    conventions.push(result);
  });

  return(conventions);
}

const confirmDelete = async (query, id) =>{
  const conn = getConnection();

  let options = {
    buttons: ["Oui","Non"],
    message: "Voulez vous vraiment suprimé ?"
  }

  let data = await dialog.showMessageBox(options);
  
  if(data.response === 0){
    conn.query(query,[id], (err, result)=>{
      if(err) throw err;
      
      
    });
  }


}

const getAnalyse = async value=>{
  const conn = getConnection();
  const analyses = [];
  await conn.query("SELECT * FROM analyses WHERE nom = ?", [value], (err, result)=>{
    if(err) throw err;

    analyses.push(result);
  });

  return analyses;
}

const getConvention = async societe=>{
  const conn = getConnection();
  const conventions = [];

  await conn.query("SELECT * FROM conventions WHERE societe=?", [societe], (err, result)=>{
    if(err) throw err;

    conventions.push(result);
  });

  return conventions;
}


// Laboratin functions
const getDemendedAnalyses = async ()=>{

  const conn = getConnection();
  var orders = [];
  await conn.query("SELECT a.analyseId, a.nom as analyse, p.patientId, p.nom, p.prenom FROM analyses_patients ap, analyses a, patients p WHERE p.patientId = ap.patientId AND ap.analyseId = a.analyseId AND ap.validated = 0 AND ap.waiting = 0",(err, result)=>{
    if (err) throw err;

    orders.push(result);
  });

  return orders;
}

const addResult = (pid, resultname, resultat, unite, normes, anteriorité)=>{
  const conn = getConnection();
  conn.query("INSERT INTO resultats (resultId, patientId, edition_date, remarque) VALUES (NULL, ?, CURRENT_TIMESTAMP, NULL)", [pid], (err, result)=>{
    if (err) throw err;

    
    conn.query("INSERT INTO typesresultats(typeId, resultId, resultname, resultat, Unité, normes, Antériorité) VALUES (NULL, ?, ?, ?, ?, ?, ?)",[result.insertId, resultname, resultat, unite, normes, anteriorité], (err, res)=>{
      if(err) throw err;

      if(res.affectedRows === 1 ){
        dialog.showMessageBox({type: "info", message: "la resultat a été ajouté"});
      }
    });
  });
}

const finishTask = analyseId=>{
  const conn = getConnection();
  conn.query("UPDATE analyses_patients SET waiting = 1 WHERE analyses_patients.analyseId = ? ", [analyseId], (err, result)=>{
    if (err) throw err;
  });
}

const searchByName = async name=>{
  const conn = getConnection();
  var orders = [];
  await conn.query("SELECT a.analyseId, a.nom as analyse, p.patientId, p.nom, p.prenom FROM analyses_patients ap, analyses a, patients p WHERE p.patientId = ap.patientId AND ap.analyseId = a.analyseId AND ap.validated = 0 AND p.nom = ?", [name],(err, result)=>{
    if (err) throw err;
    orders.push(result);
  });
  return orders;
}

// medecin funcations
const getWaitingAnalyses = async ()=>{

  const conn = getConnection();
  var orders = [];
  await conn.query("SELECT a.analyseId, a.nom as analyse, p.patientId, p.nom, p.prenom FROM analyses_patients ap, analyses a, patients p WHERE p.patientId = ap.patientId AND ap.analyseId = a.analyseId AND ap.validated = 0 AND ap.waiting = 1",(err, result)=>{
    if (err) throw err;

    orders.push(result);
  });

  return orders;
}

const validateTask = analyseId=>{
  const conn = getConnection();
  conn.query("UPDATE analyses_patients SET validated = 1 WHERE analyses_patients.analyseId = ? ", [analyseId], (err, result)=>{
    if (err) throw err;
  });
}

const showResults = async pid=>{
  const conn = getConnection();
  var results = [];
  await conn.query("SELECT * FROM patients p, resultats r, typesresultats tr WHERE p.patientId = r.patientId AND r.resultId = tr.resultId AND p.patientId = ?", [pid], (err, result)=>{
    if (err) throw err;

    results.push(result);
  });
  return results;
}

const addRemark = (resultId, remark)=>{
  const conn = getConnection();
  conn.query("UPDATE resultats SET remarque = ? WHERE resultId = ? ", [remark, resultId], (err, result)=>{
    if (err) throw err;

    if(result.affectedRows === 1 ){
      dialog.showMessageBox({type: "info", message: "la remarque a été ajouté"});
    }

  });
}

const getType = async (tid)=>{
  const conn = getConnection();
  var results = [];

  await conn.query("SELECT * FROM typesresultats WHERE typeId=?",[tid], (err, result)=>{
    if (err) throw err;

    results.push(result);
  });

  return results;
}

const updateType = (resultname, resultat, unite, normes, anteriorité, tid)=>{
  const conn = getConnection();
  conn.query("UPDATE typesresultats SET resultname = ?, resultat = ?, Unité = ?, normes = ?, Antériorité = ? WHERE typeId = ?", [resultname, resultat, unite, normes, anteriorité, tid], (err, result)=>{
    if(err) throw err;

    if(result.affectedRows === 1 ){
      dialog.showMessageBox({type: "info", message: "le type a été modifié"});
    }

  });
}

const searchWaittingAnalyses = async (name)=>{
  const conn = getConnection();
  var orders = [];
  await conn.query("SELECT a.analyseId, a.nom as analyse, p.patientId, p.nom, p.prenom FROM analyses_patients ap, analyses a, patients p WHERE p.patientId = ap.patientId AND ap.analyseId = a.analyseId AND ap.validated = 0 AND ap.waiting = 1 AND p.nom = ?",[name],(err, result)=>{
    if (err) throw err;

    orders.push(result);
  });

  return orders;
}


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'src/scripts/preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWindow.maximize();
  mainWindow.show();
  mainWindow.setResizable(false);
  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadFile('src/pages/index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


module.exports = {
createWindow,
loginUser,
createNewWindow,
// secretaire functions
addPatient,
getAllPatients,
getPatient,
modifyPatient,
deletePatient,
getPatientsByName,
demanderAnalyse,
AjouterConvention,
getAllColors,
getFacture,
checkConvention,
getColorById,
// comptable functions
addAnalyse,
addConvention,
getAllanalyses,
getAllconventions,
confirmDelete,
getAnalyse,
getConvention,
// laboratin functions
getDemendedAnalyses,
addResult,
searchByName,
finishTask,
// medecin functions
getWaitingAnalyses,
validateTask,
showResults,
addRemark,
getType,
updateType,
searchWaittingAnalyses,

closeWindow,
test
};