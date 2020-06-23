const {remote} = require("electron");
const main = remote.require("./main");

document.getElementById("result-submit-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("patient_analyse"));
    let pid = data.pid;
    let tres = document.getElementById("tres").value;
    let res = document.getElementById("res").value;
    let uni = document.getElementById("uni").value;
    let nor = document.getElementById("nor").value;
    let ant = document.getElementById("ant").value;
    main.addResult(pid, tres, res, uni, nor, ant);

    location.reload();
});