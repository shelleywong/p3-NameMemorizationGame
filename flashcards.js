//Author: Shelley Wong

var myStudents = [
  { firstname: "Eric", lastname:"Cartman", gender:"male", img:"http://vignette3.wikia.nocookie.net/southpark/images/9/9e/Eric_cartman.png" },
  { firstname: "Kenny", lastname: "McCormick", gender: "male", img:"http://vignette2.wikia.nocookie.net/southpark/images/6/6f/KennyMcCormick.png"},
  { firstname: "Kyle", lastname:"Broflovski", gender:"male", img:"http://vignette1.wikia.nocookie.net/southpark/images/7/70/165px-KyleBroflovski.png" },
  { firstname: "Stan", lastname:"Marsh", gender:"male", img:"http://vignette2.wikia.nocookie.net/southpark/images/a/a7/StanMarsh.png" }

];

var nameInput = []; //empty array for user's text input of student names
var index = 0; //global index
var listNum = 1; //one-based index for the user

//grab student at index & increment index
function chooseRandom(){
  var image = "";
  image += listNum + "<img src=\""+myStudents[index].img+"\" width=200>";
  document.getElementById("studentimg").innerHTML = image;
  index++;
  listNum++;
}

//adaption of the Fisher-Yates (Knuth) Shuffle
function shuffle(arr){
  var curIndex = arr.length;
  var temp;
  var randomIndex;
  //keeping choosing random index while there are still elements to shuffle
  while(curIndex > 0){
    randomIndex = Math.floor(Math.random()*curIndex);
    curIndex--;
    //swap with the current elements
    temp = arr[curIndex];
    arr[curIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

//call shuffle on the array, reset indexes & nameInput array; clear images from the page
function reset(){
  myStudents = shuffle(myStudents);
  index = 0;
  listNum = 1;
  nameInput = [];
  document.getElementById("studentimg").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("nameinput").value = "";
}

//enter user-submitted names to an array (in order entered)
function submitNames(event){
  if(event.keyCode == 13){
    var input = document.getElementById("nameinput").value;
    input = input.toLowerCase();
    nameInput.push(input);
    console.log(nameInput);
    document.getElementById("nameinput").value = "";
    if(nameInput.length == myStudents.length){
      checkNames();
    }
    else{
      chooseRandom();
    }
  }
}

//if user doesn't know a name, skip entering value this time
function pass(){
  nameInput.push("");
  chooseRandom();
}

//after user has submitted all names, check to see if answers are correct matches
function checkNames(){
  var points = 0;
  for(var i=0; i<myStudents.length; i++){
    myStudents[i].firstname = myStudents[i].firstname.toLowerCase();
    myStudents[i].lastname = myStudents[i].lastname.toLowerCase();
    if(nameInput[i] == myStudents[i].firstname + " " + myStudents[i].lastname){
      points++;
    }
  }
  document.getElementById("result").innerHTML = "You got " + points + " out of "
    + myStudents.length + " correct!";
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

function nextPage(page){
  window.location.href=page;
}
