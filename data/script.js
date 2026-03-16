alert("script読み込み成功");

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyBMTL3U-88HpEXXW2jbW9QzmTk-JO17AcI",
  authDomain: "teienn-kyousan.firebaseapp.com",
  databaseURL: "https://teienn-kyousan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teienn-kyousan",
  storageBucket: "teienn-kyousan.firebasestorage.app",
  messagingSenderId: "567202456256",
  appId: "1:567202456256:web:156b0587040cbbfaa1c325"
};

// 初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function login(){
const pass = document.getElementById("password").value;

if(pass === "joie"){
document.getElementById("login").style.display="none";
document.getElementById("main").style.display="block";
loadCompanies();
}else{
alert("パスワードが違います");
}
}

function loadCompanies(){

const list = document.getElementById("companyList");
const search = document.getElementById("search");

db.ref("companies").on("value", snapshot => {

allCompanies = snapshot.val() || {};
const companies = allCompanies;

function render(filter=""){

list.innerHTML="";

Object.values(companies)
.filter(c=>c.name && c.name.includes(filter))
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

});

}

// 企業追加
function addCompany(){

const name = prompt("企業名");
if(!name) return;

const email = prompt("メール");
const phone = prompt("電話");
const map = prompt("GoogleMap URL");
const notes = prompt("備考");

const id = Date.now();

const company = {
 id:id,
 name:name,
 email:email,
 phone:phone,
 map:map,
 notes:notes
};

let allCompanies = {};

function showSponsors(){

const list = document.getElementById("companyList");

list.innerHTML="";

Object.values(allCompanies)
.filter(c => {

if(!c.years) return false;

return Object.values(c.years).includes("○");

})
.forEach(c => {

const li=document.createElement("li");

li.textContent=c.name;

li.onclick=()=>{
location.href="company.html?id="+c.id;
};

list.appendChild(li);

});

}

function showAll(){

renderCompanies(allCompanies);

}

db.ref("companies/"+id).set(company);

alert("企業追加しました");

}
