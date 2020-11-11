const request = require("supertest")
const app = require("../app")
const { User } = require('../models/index')
const {generateToken} = require('../helper/jwt')

const user_data = {
	email: 'faris2@mail.com',
	password: 'querty123',
	role: 'Customer'
}

let initial_access_token = null

beforeAll(done => {
	User.create({
		email: 'faris2@mail.com',
		password: 'querty123',
		role: 'Customer'
	})
	.then(user => {
		const payload = {
			id: user.id,
			email: user.email,
			password: user.password,
			role: user.role
		}
		initial_access_token = generateToken(payload)
		done()
	})
	.catch(err => done(err))
})


describe('Login Test', () => {
	it('should send an object with key access_token (success case)', (done) => {
		request(app)
			.post('/login')
			.send(user_data)
			.end((err, res) => {
				// console.log(res.body, '<<< res.boy');
				if (err) {
					throw err;
				} else {
					expect(res.status).toBe(200);
					expect(res.body).toHaveProperty('access_token', expect.any(String))
					done()
				}
			})
	}, 10000)

	it('failed case: Invalid email', (done) => {
		request(app)
			.post('/login')
			.send({ email: 'adaaaaaaam@mail.com', password: 'querty123' })
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(401)
					expect(res.body).toHaveProperty('msg', 'Invalid email/password')
					done()
				}
			})
	}, 10000)

	it('failed case: Invalid password', (done) => {
		request(app)
			.post('/login')
			.send({ email: 'faris@mail.com', password: '12345' })
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(401)
					expect(res.body).toHaveProperty('msg', 'Invalid email/password')
					done()
				}
			})
	}, 10000)

	it('failed case: tidak memasukkan email dan password', (done) => {
		request(app)
			.post('/login')
			.send({ email: null, password: null })
			.end((err, res) => {
				if (err) {
					throw err
				} else {
					expect(res.status).toBe(401)
					expect(res.body).toHaveProperty('msg', 'Invalid email/password')
					done()
				}
			})
	}, 10000)
}) 