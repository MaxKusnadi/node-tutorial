'use strict'

// Express Server

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const port = 3000
const pg = require('pg')
const conString = 'postgres:///node-tutorial'
const bodyParser = require('body-parser')

const app = express()

// pg.connect(conString, function(err, client, done) {
// 	if (err) {
// 		return console.error('error fetching client from pool', err)
// 	}
// 	client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function(err, result) {
// 		done()

// 		if (err) {
// 			return console.error('error happened during query', err)
// 		}
// 		console.log(result.rows[0])
// 		process.exit(0)
// 	})
// })

app.use(bodyParser.json())
app.post('/users', (req, res, next) => {
	const user = req.params
	console.log(user)

	pg.connect(conString, (err, client, done) => {
		if (err) {
			return next(err)
		}
		client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], (err, result) => {
			done()
			if (err) {
				return next(err)
			}
			res.send(200)
		})
	})
})

app.get('/users', (req, res, next) => {
	pg.connect(conString, (err, client, done) => {
		if (err) {
			return next(err)
		}
		client.query('SELECT name, age FROM users;', [], (err, result) => {
			done()
			if (err) {
				return next(err)
			}
			res.json(result.rows)

		})
	})
})

app.use((err, req, resp, next) => {
	console.log(err)
	resp.status(500).send('Something broke!')
})

app.listen(port, (err) => {
	if (err) {
		return console.log("Error has been found", err)
	}
	console.log(`Server listens on ${port}`)
})


// Layout engine
// app.engine('.hbs', exphbs({
// 	defaultLayout: 'main',
// 	extname: '.hbs',
// 	layoutsDir: path.join(__dirname, 'views/layouts')
// }))

// app.set('view engine', '.hbs')
// app.set('views', path.join(__dirname, 'views'))

// app.use((request, response, next) => {
// 	console.log(request.headers)
// 	next()
// })

// app.use((request, response, next) => {
// 	request.chance = Math.random()
// 	next()
// })

// app.get('/', (request, response) => {
// 	response.render('home', {
// 		name: 'John'
// 	})
// })

// app.listen(port, (err) => {
// 	if (err) {
// 		return console.log("Error has been found", err)
// 	}
// 	console.log(`Server listens on ${port}`)
// })

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