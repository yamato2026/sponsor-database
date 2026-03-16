let companies=[];

function login(){

const pass=document.getElementById("password").value;

if(pass==="joie"){

document.getElementById("login").style.display="none";
document.getElementById("main").style.display="block";

loadCompanies();

}else{

alert("パスワードが違います");

}

}

async function loadCompanies(){

const res=await fetch("data/companies.json");
companies=await res.json();

render();

}

function render(filter=""){

const list=document.getElementById("companyList");
list.innerHTML="";

companies
.filter(c=>c.name.includes(filter))
.forEach(c=>{

const li=document.createElement("li");

li.textContent=c.name;

li.onclick=()=>{

location.href="company.html?id="+c.id;

};

const edit=document.createElement("button");
edit.textContent="編集";

edit.onclick=(e)=>{
e.stopPropagation();
editCompany(c.id);
};

const del=document.createElement("button");
del.textContent="削除";

del.onclick=(e)=>{
e.stopPropagation();
deleteCompany(c.id);
};

li.appendChild(edit);
li.appendChild(del);

list.appendChild(li);

});

}

document.addEventListener("input",e=>{

if(e.target.id==="search"){
render(e.target.value);
}

});

function addCompany(){

const name=prompt("企業名");
if(!name) return;

const address=prompt("住所");
const email=prompt("メール");

const id=Date.now();

const company={
id:id,
name:name,
address:address,
email:email,
phone:"",
map:"",
notes:"",
years:{
"2025":"",
"2026":"",
"2027":"",
"2028":"",
"2029":""
}
};

companies.push(company);

showJSON();

}

function editCompany(id){

const company=companies.find(c=>c.id===id);

company.name=prompt("企業名",company.name);
company.address=prompt("住所",company.address);
company.email=prompt("メール",company.email);
company.phone=prompt("電話",company.phone);
company.notes=prompt("備考",company.notes);

showJSON();
render();

}

function deleteCompany(id){

if(!confirm("削除しますか？")) return;

companies=companies.filter(c=>c.id!==id);

showJSON();
render();

}

function showJSON(){

const text=JSON.stringify(companies,null,2);

console.log(text);

alert("コンソールに新しいJSONを出しました。\nコピーして companies.json を更新してください");

}
