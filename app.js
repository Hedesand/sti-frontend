/*const express = require("express")
var favicon = require('serve-favicon')
var path = require('path')
const res = require("express/lib/response")

const PORT = process.env.PORT || 3000

const app = express ()
app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, function() {
    console.log('Server started on port ${PORT}')
<<<<<<< HEAD
})

const gameItems = document.querySelectorAll('.game-item-wrapper')

gameItems.forEach(gameItem => {
    gameItem.addEventListener('mouseover', () => {
        gameItem.childNodes[1].classList.add('img-darken');
    })
    gameItem.addEventListener('mouseout', () => {
        gameItem.childNodes[1].classList.remove('img-darken');
    })

})
=======
})*/

const card = document.querySelector(".card__inner");

card.addEventListener("click", function (e) {
  card.classList.toggle('is-flipped');
});
>>>>>>> ede590f053b1ecfd02226bdf6e4b0690ed484f3c
