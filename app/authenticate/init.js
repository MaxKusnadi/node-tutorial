const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const user = {
	username: 'test-user',
	password: 'test-password',
	id: 1
}

passport.use(new LocalStrategy(
	(username, password, done) => {
		findUser(username, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false)
			}
			if (password !== user.password) {
				return done(null, false)
			}
			return done(null, user)

		})
	}))