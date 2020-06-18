// Modules to control application life and create native browser window
const { BrowserWindow, Notification} = require('electron');
const path = require('path');
const {getConnection} = require('./database');


// login All users
const loginUser = (user)=>{
  const conn = getConnection();
  conn.query("SELECT * FROM users WHERE email = ? AND password = ?",[user.email,user.password], (err, res)=>{
    if(err) throw err;

    if(res.length === 1){ 
      new Notification({
        title: "Vous êtes connecté",
        body: "Bienvenue au FutureLab"
      });

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

      new Notification({
        title: "Vous n'êtes pas connecté",
        body: "vos informations d'identification sont erronées"
      })
      console.log("wrong credentials")
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
  addPatientWindow.setResizable(false);
}

const addPatient = patient=>{
  const conn = getConnection();
  conn.query("INSERT INTO patients(nom, prenom, sexe, dn, numero) VALUES(?,?,?,?,?)",[patient.nom, patient.prenom, patient.sexe, patient.bday, patient.phone], (err, result)=>{
    if (err) throw err;
    

    new Notification({
      title: "Patient Inséré",
      body: "votre patient est inséré dans la base de données"
    });

  });
}

const modifyPatient = (id, patient)=>{
  const conn = getConnection();
  conn.query("UPDATE patients SET nom=?, prenom=?, sexe=?, dn=?, numero=? WHERE patientId=?",[patient.nom, patient.prenom, patient.sexe, patient.bday, patient.phone, patient.id], (err, result)=>{
    if (err) throw err;
    

    new Notification({
      title: "Patient modifié",
      body: "votre patient est modifié dans la base de données"
    });

  });
}

const deletePatient = id=>{
  const conn = getConnection();
  conn.query("DELETE FROM patients WHERE patientId=?",[id],(err, result)=>{
    if(err) throw err;

    new Notification({
      title: "Patient supprimé",
      body: "votre patient est supprimé dans la base de données"
    });
  })
}

const getAllPatients = async ()=>{
  const conn = getConnection();
  var patients = [];
  
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

  // and load the index.html of the app.
  mainWindow.loadFile('src/pages/index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

module.exports = {
createWindow,
loginUser,
createNewWindow,

addPatient,
getAllPatients,
getPatient,
modifyPatient,
deletePatient,

closeWindow,
test
};