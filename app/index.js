const calc = require('./calc')

const numbersToAdd = [
	2,
	1,
	2130,
	213
]

const result = calc.sum(numbersToAdd)
console.log(`The result is: ${result}`)