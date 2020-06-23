const {remote} = require("electron");
const main = remote.require("./main");

document.getElementById("getTypeData").addEventListener("submit", async (e)=>{
    e.preventDefault();
    let tid = await document.getElementById("typeid").value;
    let results = await main.getType(tid);
    
    document.getElementById("result-submit-form-spe").style.display = "block";
    document.getElementById("tres").value = results[0][0].resultname;
    document.getElementById("res").value = results[0][0].resultat;
    document.getElementById("uni").value = results[0][0].Unité;
    document.getElementById("nor").value = results[0][0].normes;
    document.getElementById("ant").value = results[0][0].Antériorité;

});

document.getElementById("result-submit-form-spe").addEventListener("submit", e=>{
    e.preventDefault();

    let tid = document.getElementById("typeid").value;
    let tres = document.getElementById("tres").value;
    let res = document.getElementById("res").value;
    let uni = document.getElementById("uni").value;
    let nor = document.getElementById("nor").value;
    let ant = document.getElementById("ant").value;

    main.updateType(tres, res, uni, nor, ant, tid);
    location.reload();
});