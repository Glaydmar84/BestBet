let stake1Global = 0;
let lucro1Global = 0;
let selectedLucro = null;

// SELECT CUSTOM
const select = document.getElementById("selectLucro");
const selected = select.querySelector(".select-selected");
const options = select.querySelector(".select-options");

selected.addEventListener("click", () => {
    options.classList.toggle("show");
});

options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        selectedLucro = parseFloat(option.getAttribute("data-value"));
        options.classList.remove("show");
    });
});

document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
        options.classList.remove("show");
    }
});

// APOSTA 1
function calcAposta1() {

    let odd1 = parseFloat(document.getElementById("odd1").value);
    let stake1 = parseFloat(document.getElementById("stake1").value);

    if (isNaN(odd1) || isNaN(stake1) || odd1 <= 1 || stake1 <= 0) {
        alert("Preencha corretamente");
        return;
    }

    let retorno = odd1 * stake1;
    let lucro = retorno - stake1;

    stake1Global = stake1;
    lucro1Global = lucro;

    document.getElementById("retorno1").innerText = retorno.toFixed(2);
    document.getElementById("lucro1").innerText = lucro.toFixed(2);
}

// COBERTURA
function calcCobertura() {

    if (stake1Global === 0) {
        alert("Calcule a aposta 1 primeiro");
        return;
    }

    let percInvest = parseFloat(document.getElementById("percInvest").value);

    if (isNaN(percInvest)) {
        alert("Selecione o % reinvestido");
        return;
    }

    if (selectedLucro === null) {
        alert("Selecione o % de lucro");
        return;
    }

    percInvest = percInvest / 100;
    let percLucro = selectedLucro / 100;

    let stake2 = lucro1Global * percInvest;
    let lucroDesejado = stake2 * percLucro;

    let odd2 = (stake1Global + stake2 + lucroDesejado) / stake2;
    let retorno2 = stake2 * odd2;

    let res1 = lucro1Global - stake2;
    let res2 = retorno2 - (stake1Global + stake2);

    let dificuldade = odd2 <= 2 ? "🟢 Fácil" :
                      odd2 <= 3 ? "🟡 Média" : "🔴 Difícil";

    let risco = stake2 <= lucro1Global * 0.5 ? "🟢 Baixo" :
                stake2 <= lucro1Global * 0.8 ? "🟡 Médio" : "🔴 Alto";

    document.getElementById("stake2").innerText = stake2.toFixed(2);
    document.getElementById("odd2").innerText = odd2.toFixed(2);
    document.getElementById("retorno2").innerText = retorno2.toFixed(2);
    document.getElementById("res1").innerText = res1.toFixed(2);
    document.getElementById("res2").innerText = res2.toFixed(2);
    document.getElementById("dificuldade").innerText = dificuldade;
    document.getElementById("risco").innerText = risco;
}

// LIMPAR
function limparCampos() {

    document.getElementById("odd1").value = "";
    document.getElementById("stake1").value = "";
    document.getElementById("percInvest").value = "";

    selectedLucro = null;
    document.querySelector("#selectLucro .select-selected").innerText = "% de lucro desejado";

    document.getElementById("retorno1").innerText = "0";
    document.getElementById("lucro1").innerText = "0";

    document.getElementById("stake2").innerText = "0";
    document.getElementById("odd2").innerText = "0";
    document.getElementById("retorno2").innerText = "0";
    document.getElementById("dificuldade").innerText = "-";

    document.getElementById("res1").innerText = "0";
    document.getElementById("res2").innerText = "0";
    document.getElementById("risco").innerText = "-";

    document.getElementById("status").innerText = "-";

    stake1Global = 0;
    lucro1Global = 0;
}