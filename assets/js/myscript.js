//déclaration des variables
/** Declaration du store */
let store = localStorage;
store.setItem("somme_Incomes", 0);
store.setItem("somme_Expenses", 0);
/** Variables de récupération des 3 champs par leur id**/
let input_value = document.getElementById("input_value");
let text = document.getElementById("text");
let number = document.getElementById("number");

/** Variables de récupération des 2 spans pour les erreurs sur les champs description et valeur**/
let span_text = document.getElementById("span-text");
let span_number = document.getElementById("span-number");

/** Variables de récupération des 2 blocs pour l'injection du code par la modification du DOM pour lister les revenus et les depenses**/
let inside_income = document.getElementById("inside-income");
let inside_expenses = document.getElementById("inside-expenses");

/** Variables de récupération de l'element icon **/
let check_icon = document.getElementById("check-icon");
/** Variables de récupération des valeurs des champs description et valeur**/
let value_text;
let value_number;

/** Variables de récupération des blocs pour l'affichage des revenus et des dépenses */
let display_income = document.getElementById("display_income");
let display_expenses = document.getElementById("display_expenses");

/** */
let display_ecart = document.getElementById("ecart");

/** Déclaration des tableaux de revenus et de depenses**/
let tab_income = [];
let tab_expenses = [];

//fonction pour ajputer a la liste des revenu le revenu courant
//let table1 = JSON.parse(store.revenus);
function ajoutOneIncome() {
  if (store.revenus) {
    let tab_last = JSON.parse(store.revenus);
    let taille = tab_last.length;
    let element = tab_last[taille - 1];
    let composant = document.createElement("div");

    composant.innerHTML = `
                <div
                class="render-income"
                style="
                  border-top: 1px solid #eee;
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  padding:8px 0;
                  margin-top:3px
                "
              >
                <span style="color:#555">${element.Description}</span>
                <span style="padding-right:10px">+ ${element.Valeur} 
                <i class="fa-solid fa-trash" style="margin-left:15px;cursor:pointer" onclick="delete_income('${
                  taille - 1
                }')"></i></span>
              </div>
                `;
    inside_income.appendChild(composant);
  }
}
//fonction pour lister tous les revenus
function ajoutIncome() {
  //Lister les revenus dans le bloc inside income
  if (store.revenus) {
    JSON.parse(store.revenus).forEach((element, indice) => {
      let composant = document.createElement("div");

      composant.innerHTML = `
            <div
            class="render-income"
            style="
              border-top: 1px solid #eee;
              width: 100%;
              display: flex;
              justify-content: space-between;
              padding:8px 0;
              margin-top:3px
            "
          >
            <span style="color:#555">${element.Description}</span>
            <span style="padding-right:10px">+ ${element.Valeur} 
            <i class="fa-solid fa-trash" style="margin-left:15px;cursor:pointer" onclick="delete_income('${indice}')"></i></span>
          </div>
            `;
      inside_income.appendChild(composant);
    });
  }
}
//calcul somme incomes
function calculSomme() {
  let somme = 0;
  JSON.parse(store.revenus).forEach((element) => {
    somme = somme + element.Valeur;
  });
  store.setItem("somme_Incomes", somme);
  display_income.innerHTML = `+ ${store.getItem("somme_Incomes")}`;
}
//calcul somme expenses
function calculExpenses() {
  let somme = 0;
  JSON.parse(store.depenses).forEach((element) => {
    somme = somme + element.Valeur;
  });
  store.setItem("somme_Expenses", somme);
  display_expenses.innerHTML = `- ${store.getItem("somme_Expenses")}`;
}
//calcul ecart
function calculEcart() {
  let somme_incomes = 0;
  let somme_expenses = 0;

  for (let i = 0; i < JSON.parse(store.revenus).length; i++) {
    somme_incomes = somme_incomes + JSON.parse(store.revenus)[i].Valeur;
  }
  for (let j = 0; j < JSON.parse(store.depenses).length; j++) {
    somme_expenses = somme_expenses + JSON.parse(store.depenses)[j].Valeur;
  }
  let ecart = somme_incomes - somme_expenses;
  display_ecart.innerHTML = `+ ${Math.abs(ecart.toFixed(2))}`;
  if (ecart == 0) {
    display_ecart.innerHTML = "+0.00";
  }
}
calculSomme();
calculExpenses();
calculEcart();
//fonction pour lister toutes les dépenses
function ajoutExpenses() {
  //Lister les revenus dans le bloc inside_expenses
  /*inside_expenses.innerHTML = "";*/

  let somme = 0;
  if (store.length != 0 && store.depenses) {
    JSON.parse(store.depenses).forEach((element, indice) => {
      let composant = document.createElement("div");
      somme = somme + element.Valeur;
      composant.innerHTML = `
      <div
      class="render-income"
      style="
        border-top: 1px solid #eee;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding:8px 0;
        margin-top:3px
      "
    >
      <span style="color:#555">${element.Description}</span>
      <span style="padding-right:10px">- ${element.Valeur} 
      <i class="fa-solid fa-trash" style="margin-left:15px;cursor:pointer" onclick = "delete_expenses('${indice}')"></i></span>
    </div>
      `;
      inside_expenses.appendChild(composant);
    });
  }
}
//fonction pour ajouter a la liste des depenses la depense courante
function ajoutOneExpenses() {
  if (store.depenses) {
    let tab_last = JSON.parse(store.depenses);
    let taille = tab_last.length;
    let element = tab_last[taille - 1];
    let composant = document.createElement("div");

    composant.innerHTML = `
                  <div
                  class="render-income"
                  style="
                    border-top: 1px solid #eee;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding:8px 0;
                    margin-top:3px
                  "
                >
                  <span style="color:#555">${element.Description}</span>
                  <span style="padding-right:10px">+ ${element.Valeur} 
                  <i class="fa-solid fa-trash" style="margin-left:15px;cursor:pointer" onclick="delete_expenses('${
                    taille - 1
                  }')"></i></span>
                </div>
                  `;
    inside_expenses.appendChild(composant);
  }
}

// Definition de la fonction gestion qui assure l'ajout d'un revenu complet(Description et valeur) dans le tableau des revenus ou des dépenses suite a l'appuie de la touche Enter sur le champs valeur ou sur l'icone
function gestion() {
  if (text.value != "" && number.value != "" && input_value.value == "+") {
    value_text = text.value.trim();
    value_number = number.value;
    if (store.length == 0) {
      tab_income = [];
    } else {
      tab_income = JSON.parse(store.revenus);
    }

    tab_income.push({
      Description: value_text,
      Valeur: Number(value_number),
    });
    store.setItem("revenus", JSON.stringify(tab_income));
    ajoutOneIncome();
  }

  if (text.value != "" && number.value != "" && input_value.value == "-") {
    value_text = text.value.trim();
    value_number = number.value;
    if (store.length == 1) {
      tab_expenses = [];
    } else {
      tab_expenses = JSON.parse(store.depenses);
    }
    tab_expenses.push({
      Description: value_text,
      Valeur: Number(value_number),
    });
    store.setItem("depenses", JSON.stringify(tab_expenses));
    ajoutOneExpenses();
  }

  //Remise a zero des valeur des champs apres enregistrement
  text.value = "";
  number.value = "";
  //Retirer le focus sur le champs value apres enregistrement
  number.blur();
  //retirer l'erreur sur le champs description qui sera vide apres enregistrement
  span_number.setAttribute("hidden", "");
}

//Appel de la fonction gestion suite a l'appuie de la touche
number.onkeyup = function (touche) {
  if (touche.key == "Enter") {
    gestion();
    calculSomme();
    calculExpenses();
    calculEcart();
  }
};

//Appel de la fonction gestion suite a l'appuie de l'icon
check_icon.addEventListener("click", () => {
  if (text.value == "" && number.value == "") {
    span_text.removeAttribute("hidden");
    span_number.removeAttribute("hidden");
  } else {
    gestion();
    calculSomme();
    calculExpenses();
    calculEcart();
  }
});

//Gestion de la couleur de l'icon et des bordures des champs
input_value.onchange = function () {
  if (input_value.value === "-") {
    check_icon.style.color = "#ff3859";
    text.style.borderColor = "#ff3859";
    number.style.borderColor = "#ff3859";
  }
  if (input_value.value === "+") {
    check_icon.style.color = "#fba90a";
    text.style.borderColor = "#fba90a";
    number.style.borderColor = "#fba90a";
    text.oninput = function () {
      text.style.borderColor = "#fba90a";
    };
    number.oninput = function () {
      text.style.borderColor = "#fba90a";
    };
  }
};

//changer la couleur des bordure des champs a la couleur initiale une fois hors du champs
text.onblur = function () {
  text.style.borderColor = "#eee";
};
number.onblur = function () {
  text.style.borderColor = "#eee";
};
//Affichage du nombre null par defaut(income et expenses)
if (store.somme_Incomes == 0) {
  display_income.innerHTML = "+ 00.00";
}
if (store.somme_Expenses == 0) {
  display_expenses.innerHTML = "- 00.00";
}
if (store.somme_Incomes == 0 && store.somme_Expenses == 0) {
  display_ecart.innerHTML = "+0.00";
}

//Gestion des erreurs sur les champs Obligatoires Description et Valeur a la sortie du champ et lorsque l'utilisateur finit de taper dans le champs.
text.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    span_text.removeAttribute("hidden");
  } else {
    span_text.setAttribute("hidden", "");
  }
});
number.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    span_number.removeAttribute("hidden");
  } else {
    span_number.setAttribute("hidden", "");
  }
});
text.addEventListener("input", () => {
  span_text.setAttribute("hidden", "");
});
number.addEventListener("input", () => {
  span_text.setAttribute("hidden", "");
});

//supprimer un revenu
function delete_income(indice) {
  if (confirm("Voulez vous supprimer ce revenu?")) {
    let tab = JSON.parse(store.revenus);
    tab.splice(tab[indice], 1);
    inside_income.innerHTML = "";
    store.setItem("revenus", JSON.stringify(tab));
    ajoutIncome();
    calculSomme();
    calculExpenses();
    calculEcart();
  }
}

//supprimer une depense
function delete_expenses(indice) {
  if (confirm("Voulez vous supprimer cette dépense?")) {
    let tab = JSON.parse(store.depenses);
    tab.splice(tab[indice], 1);
    inside_expenses.innerHTML = "";
    store.setItem("depenses", JSON.stringify(tab));
    ajoutExpenses();
    calculSomme();
    calculExpenses();
    calculEcart();
  }
}
//Curseur en forme de main sur l'icon
check_icon.style.cursor = "pointer";
//lister les revenus et depenses
ajoutIncome();
ajoutExpenses();
