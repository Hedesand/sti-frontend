const express = require("express")
var favicon = require('serve-favicon')
var path = require('path')

const POST = process.env.POST || 3000

const app = express ()
app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, function() {
    console.log('Server started on port ${PORT}')
})