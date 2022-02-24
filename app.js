const express = require("express")
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