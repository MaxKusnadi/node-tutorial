// Express Server

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((request, response, next) => {
	console.log(request.headers)
	next()
})

app.use((request, response, next) => {
	request.chance = Math.random()
	next()
})

app.get('/', (request, response) => {
	response.render('home', {
		name: 'John'
	})
})

app.listen(port, (err) => {
	if (err) {
		return console.log("Error has been found", err)
	}
	console.log(`Server listens on ${port}`)
})

// app.use((err, req, resp, next) => {
// 	console.log(err)
// 	resp.status(500).send('Something broke!')
// })
// Normal Server
// const http = require('http')
// const port = 3000

// const requestHandler = (request, response) => {
// 	console.log(request.url)
// 	response.end("Hello Node.js server")
// }

// const server = http.createServer(requestHandler)

// server.listen(port, (err) => {
// 	if (err) {
// 		return console.log(`server error`, err)
// 	}
// 	console.log(`server's listening on ${port}`)
// })