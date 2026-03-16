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

const companies = snapshot.val() || [];

function render(filter=""){

list.innerHTML="";

Object.values(companies)
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

});

}
