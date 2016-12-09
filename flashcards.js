/*  Author: Shelley Wong    */

var myStudents = [
  { firstname: "Annie", lastname: "Faulk",
    img:"http://vignette1.wikia.nocookie.net/southpark/images/0/01/Annie.png"},
  { firstname: "Bebe", lastname: "Stevens",
    img:"http://vignette2.wikia.nocookie.net/southpark/images/2/2b/2-436.png"},
  { firstname: "Butters", lastname: "Stotch",
    img:"http://vignette4.wikia.nocookie.net/southpark/images/0/06/ButtersStotch.png"},
  { firstname: "Clyde", lastname: "Donovan",
    img:"http://vignette1.wikia.nocookie.net/southpark/images/9/9e/Clyde_d.png"},
  { firstname:"Craig", lastname: "Tucker",
    img:"http://vignette2.wikia.nocookie.net/southpark/images/7/77/Craig.svg"},
  { firstname: "Eric", lastname: "Cartman",
    img:"http://vignette3.wikia.nocookie.net/southpark/images/9/9e/Eric_cartman.png"},
  { firstname: "Jimmy", lastname: "Valmer",
    img:"http://vignette4.wikia.nocookie.net/southpark/images/2/24/Jimmy_h-h-here.png"},
  { firstname: "Kenny", lastname: "McCormick",
    img:"http://vignette2.wikia.nocookie.net/southpark/images/6/6f/KennyMcCormick.png"},
  { firstname: "Kyle", lastname: "Broflovski",
    img:"http://vignette1.wikia.nocookie.net/southpark/images/7/70/165px-KyleBroflovski.png"},
  { firstname: "Red", lastname: "",
    img:"http://vignette3.wikia.nocookie.net/southpark/images/1/12/Red_pic2.png"},
  { firstname: "Stan", lastname: "Marsh",
    img:"http://vignette2.wikia.nocookie.net/southpark/images/a/a7/StanMarsh.png"},
  { firstname: "Timmy", lastname: "Burch",
    img:"http://vignette1.wikia.nocookie.net/southpark/images/4/4b/Timmy.png"},
  { firstname: "Token", lastname: "Black",
    img:"http://vignette2.wikia.nocookie.net/southpark/images/d/d3/Token_Black2.png"},
  { firstname: "Wendy", lastname: "Testaburger",
    img:"http://vignette3.wikia.nocookie.net/southpark/images/9/9e/Wendyy.png"}
];

var nameInput = []; //empty array for user's text input of student names
var curScore = []; //empty array to hold current right/wrong answers in Name Game
var index = 0; //global index
var listNum = 1; //one-based index for the user
var numCorrect = 0; //num of correct guesses in Name Game
//in practice, used to keep track of student image and show correlating name
var studentNum;
//in Name Game, keep track of cur index, use to compare submitted name with actual
var current;

//adapted from w3schools: http://www.w3schools.com/jsref/met_select_add.asp
function fillDropDown(){
  for(var i=0; i<myStudents.length; i++){
    var item = document.getElementById("students");
    var option = document.createElement("option");
    option.text = myStudents[i].firstname + " " + myStudents[i].lastname;
    item.add(option);
  }
}

/*  Functions for flashcard/practice page (faces.html)  */
//user chooses name from drop-down list and image of that student appears
function showFace(){
  var name = document.getElementById("students").value;
  var out = "";
  for(var i=0; i<myStudents.length; i++){
    if(name == myStudents[i].firstname + " " + myStudents[i].lastname){
        out += "<img src=\""+myStudents[i].img+"\" width=200>";
    }
    else if(name == myStudents[i].firstname && myStudents[i].lastname == ""){
      out += "<img src=\""+myStudents[i].img+"\" width=200>";
    }
  }
  document.getElementById("flashface").innerHTML = out;
}

//flip flashcard to show student image
//assign the student a number based on current location
function flip(){
  var image = "";
  document.getElementById("flashname").innerHTML = "";
  studentNum = index;
  image += listNum + "<img src=\""+myStudents[index].img+"\" width=200>";
  document.getElementById("flashface").innerHTML = image;
  index++;
  listNum++;
}

//if user clicks on flashcard of student's image, show name of that student
function showName(){
  var text = "";
  text = myStudents[studentNum].firstname + " " + myStudents[studentNum].lastname;
  document.getElementById("flashname").innerHTML = text;
}

//reshuffle myStudents array and reset rest of practice/flashcards page
function resetCards(){
  myStudents = shuffle(myStudents);
  index = 0;
  listNum = 1;
  document.getElementById("students").value = "";
  document.getElementById("flashface").innerHTML = "";
  document.getElementById("flashname").innerHTML = "";
}

/*  Functions for Name Game page (names.html) */
//grab student at index & increment index
function chooseRandom(){
  var image = "";
  current = index;
  image += listNum + "<img src=\""+myStudents[index].img+"\" width=200>";
  document.getElementById("studentimg").innerHTML = image;
  index++;
  listNum++;
}

//enter user-submitted names to an array
//then clear the input field for next entry
function submitNames(event){
  if(event.keyCode == 13){
    var input = document.getElementById("nameinput").value;
    input = input.toLowerCase();
    nameInput.push(input);
    console.log(nameInput);
    document.getElementById("nameinput").value = "";
    //if user chose first name only (else, user chose full name)
    //if user answers correctly, increase numCorrect & adjust "points" cookie
    //output msg: cur points & arr of checkmarks (correct) or 'X' marks (incorrect)
    var choice = document.getElementById("nameoption").value;
    setCookie("thisGame",choice,1);
    if(choice == "First Name Only")
    {
      if(nameInput[current] == myStudents[current].firstname.toLowerCase())
      {
          numCorrect += 1;
          curScore.push("&#10004;");
      }
      else
      {
        curScore.push("&#10006;");
      }
      document.getElementById("checker").innerHTML = "Your Current Point Total: "
        + numCorrect + "<br>" + curScore.join(" ");
      setCookie("points",numCorrect,1);
    }
    else
    {
      if(nameInput[current] == myStudents[current].firstname.toLowerCase() +
        " " + myStudents[current].lastname.toLowerCase())
      {
          numCorrect += 1;
          curScore.push("&#10004;");
      }
      else if(nameInput[current] == myStudents[current].firstname.toLowerCase()
        && myStudents[current].lastname == "")
      {
          numCorrect += 1;
          curScore.push("&#10004;");
      }
      else
      {
        curScore.push("&#10006;");
      }
      setCookie("points",numCorrect,1);
      document.getElementById("checker").innerHTML = "Your Current Point Total: "
        + numCorrect + "<br>" + curScore.join(" ");
    }
    //keep selecting a random student until the num of names entered is the same
    //as the num of students. Then go to the results page to check final score
    if(nameInput.length == myStudents.length){
      nextPage('results.html');
    }
    else{
      chooseRandom();
    }
  }
}

//if user doesn't know a name, skip entering value this time
function pass(){
  nameInput.push("");
  curScore.push("&#10006;");
  document.getElementById("checker").innerHTML = "Your Current Point Total: " +
    numCorrect + "<br>" + curScore.join(" ");
  if(nameInput.length == myStudents.length){
    nextPage('results.html');
  }
  else{
    chooseRandom();
  }
}

//call shuffle on the array, reset indexes & nameInput array
//set numCorrect back to 0, clear images & other results from the page
function resetGame(){
  myStudents = shuffle(myStudents);
  index = 0;
  listNum = 1;
  numCorrect = 0;
  nameInput = [];
  curScore = [];
  document.getElementById("studentimg").innerHTML = "";
  document.getElementById("checker").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("nameinput").value = "";
}

//adaption of the Fisher-Yates (Knuth) Shuffle
function shuffle(arr){
  var curIndex = arr.length;
  var temp;
  var randomIndex;
  //keep choosing random index while there are still elements to shuffle
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

/*  Results Page and other Functions  */
//after user has submitted all names, check to see if answers are correct matches
function checkNames(){
  numCorrect = getCookie("points");
  var percent = (numCorrect/myStudents.length)*100;
  percent = percent.toFixed(0);
  document.getElementById("result").innerHTML = percent + "% <br> You got " +
    numCorrect + " out of " + myStudents.length + " correct! <br>";
  //extra note if user chose to try learning full names
  var game = getCookie("thisGame");
  if(game == "First Name Only"){
    document.getElementById("extranote").innerHTML = '&#9787; Your students ' +
      'respect your authority and thank you for trying &#9787;';
  }
  else{
    document.getElementById("extranote").innerHTML =
      'Last names, too?! Wow, what a great professor!' +
      '<img src="http://www.southparkwillie.com/SPinfo/AnimeClass.jpg" ' +
      'style="width:100%">';
    document.getElementById("extrasource").innerHTML = '<a class="sourcestyle"'
      + 'href="http://www.southparkwillie.com/SPinfo/SPWeird.htm">' +
      'Anime Expressions Image Source</a>';
  }
}

function nextPage(page){
  window.location.href=page;
}

function printAll(){
  var out = "";
  for(var i=0; i < myStudents.length; i++){
    out += "<img src=\""+myStudents[i].img+"\" width=200>"+
      myStudents[i].firstname + " " + myStudents[i].lastname + "<br>";
  }
  document.getElementById("studentimg").innerHTML = out;
}

//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname){
  var name = cname + "=";
  var c_array = document.cookie.split(';');
  for(var i = 0; i < c_array.length; i++)
  {
    var c = c_array[i];
    while(c.charAt(0) == ' ')
    {
      c = c.substring(1);
    }
    if(c.indexOf(name) == 0)
    {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}
