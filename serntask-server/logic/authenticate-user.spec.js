require('dotenv').config()
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('serntask-data')

const bcrypt = require('bcrypt')
const { random } = Math

const authenticateUser = require('./authenticate-user')


describe('authenticateUser', () => {
	let name, email, password

	before(async () => {
		await mongoose.connect(TEST_MONGODB_URL, {
			useNewUrlParser: true, 
			useUnifiedTopology: true 
		})

		return await User.deleteMany()
	})

	beforeEach(() => {
		name = `name-${random()}`
		email = `email-${random()}@mail.com`
		password = `password-${random()}`
	})

	describe('when user exist', () => {
		let id

		beforeEach(async () => {
			// creamos a user
			const _password = await bcrypt.hash(password, 10)
			
			const user = await User.create({ name, email, password: _password })

			id = user.id 
		})

		it('should succeed on correct and valid and right credentials', async () => {
			const id = await authenticateUser(email, password)
			
			expect(id).to.be.exist
			expect(id).to.be.an('string')
			expect(id).to.be.equal(id)
			expect(id.length).to.be.greaterThan(0)
		})

		it('should fail on incorrect password', async () => {
			try {
				await authenticateUser(email, `${password}-wrong`)
				throw new Error('you should not reach this point')

			} catch (error) {
				expect(error).to.be.a.instanceOf(Error)
				expect(error.message).to.be.equal('wrong credentials')
			}

		})
	})


	describe('when user do not exist', () => {
		beforeEach(async () => {
			// creamos user.
			const user = await User.create({ name, email, password })

			// eliminamos al user
			await User.deleteMany()
		})

		it('should fail and throw', async () => {
			try {
				await authenticateUser(email, password)
				throw new Error('you should not reach this point')

			} catch (error) {
				expect(error).to.be.an.instanceOf(Error)
				expect(error.message).to.be.equal(`User with email: ${email} do not exist`)
			}
		})

	})

	// En este caso no tiene lugar. Esto lo valida express-validator. Syncrono.

    // it('should fail on non-string or empty password', () => {
	// 	password = 1;
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		TypeError,
	// 		`password ${password} is not a string`
	// 	);

	// 	password = true;
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		TypeError,
	// 		`password ${password} is not a string`
	// 	);

	// 	password = {};
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		TypeError,
	// 		`password ${password} is not a string`
	// 	);

	// 	password = '';
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		Error,
	// 		`password is empty`
	// 	);
	// });

	// it('should fail on non-string or empty email', () => {
	// 	email = 1;
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		TypeError,
	// 		`email ${email} is not a string`
	// 	);

	// 	email = true;
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		TypeError,
	// 		`email ${email} is not a string`
	// 	);

	// 	email = {};
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		TypeError,
	// 		`email ${email} is not a string`
	// 	);

	// 	email = '';
	// 	expect(() => authenticateUser(email, password)).to.throw(
	// 		Error,
	// 		`email is empty`
	// 	);
	// });

	after(async () => {
		await User.deleteMany()

		return await mongoose.disconnect()
	})
})
    
