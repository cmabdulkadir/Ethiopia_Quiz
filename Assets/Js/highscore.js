//var H
console.log('score')
// localstorage get item
var currentData = JSON.parse(localStorage.getItem('scoreRecords')) || [];

currentData = currentData.sort(function (a, b) {
    console.log('sorting...')
    return parseInt(b.score) - parseInt(a.score)
})

for (let index = 0; index < currentData.length; index++) {

    // get highscore ol element from html
    var highScoreOl = document.querySelector('#highScore');

    // create a <li>
    var newLi = document.createElement('li');

    var text = currentData[index].initials + " - " + currentData[index].score;
    // AC - 50

    newLi.textContent = text;

    highScoreOl.appendChild(newLi);
}

// create a variable = call the button element by its id
var clear = document.querySelector("#clear")

// call the variable name, add an event listener

clear.addEventListener("click", function () {
    // inside of the function, call localstorage to removeItem and using the key 'scoreRecords'

    localStorage.removeItem("scoreRecords")
    location.reload()
})
