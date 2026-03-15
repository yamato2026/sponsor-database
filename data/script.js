alert("script読み込み成功");

function login(){

const pass = document.getElementById("password").value;

if(pass === "joie"){   // ←好きなパスワードに変える

document.getElementById("login").style.display="none";
document.getElementById("main").style.display="block";

loadCompanies();

}else{
alert("パスワードが違います");
}

}
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
