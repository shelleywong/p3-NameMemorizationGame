//Author: Shelley Wong

function nextPage(page){
  window.location.href=page;
}

var myStudents = [
  { firstname: "Stan", lastname:"Marsh", gender:"male", img:"http://vignette2.wikia.nocookie.net/southpark/images/a/a7/StanMarsh.png" },
  { firstname: "Kyle", lastname:"Broflovski", gender:"male", img:"http://vignette1.wikia.nocookie.net/southpark/images/7/70/165px-KyleBroflovski.png" },
  { firstname: "Eric", lastname:"Cartman", gender:"male", img:"http://vignette3.wikia.nocookie.net/southpark/images/9/9e/Eric_cartman.png" },
  { firstname: "Kenny", lastname: "McCormick", gender: "male", img:"http://vignette2.wikia.nocookie.net/southpark/images/6/6f/KennyMcCormick.png"}
];

var len = myStudents.length;
var chosen = [];

function chooseRandom(){
  while(chosen.length < len){
    var randomNum = Math.floor(Math.random()*len);
    if(chosen.indexOf(randomNum) == -1){
      chosen.push(randomNum);
      console.log(randomNum);
    }
  }
}

function reset(){
  chosen = [];
}



function printAll(){

  var out = "";
  for(var i=0; i < myStudents.length; i++){
    out += "<img src=\""+myStudents[i].img+"\" width=200>"+
      myStudents[i].firstname + " " + myStudents[i].lastname + " (" +
      myStudents[i].gender + ") <br>";
  }
  document.getElementById("studentimg").innerHTML = out;
}
