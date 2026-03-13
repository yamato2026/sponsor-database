async function loadCompanies(){

const res = await fetch("data/companies.json");
const companies = await res.json();

const list = document.getElementById("companyList");
const search = document.getElementById("search");

function render(filter=""){

list.innerHTML="";

companies
.filter(c=>c.name.includes(filter))
.forEach(c=>{

const li=document.createElement("li");

li.textContent=c.name;

li.onclick=()=>{
location.href="company.html?id="+c.id;
};

list.appendChild(li);

});

}

search.oninput=()=>render(search.value);

render();

}

loadCompanies();
