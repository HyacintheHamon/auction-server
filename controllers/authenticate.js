const { sign } = require('jsonwebtoken');
const User = require('../models/user');

// const expiresIn = process.env.TOKEN_EXPIRY * (24 * 60 * 60); // 24 = hours. 60 = minutes
// const superSecret = process.env.SECRET;

const expiresIn = 30 * (24 * 60 * 60); // 24 = hours. 60 = minutes
const superSecret = "enteryoursecrettoken";

const createUserToken = ({ admin, email, _id, name }) => {
	try {
		return sign({ admin, email, _id, name }, superSecret, { expiresIn });
	} catch ({ message }) {
		throw new Error(message)
	}
}

const authenticateUser = async (req, res) => {
	try {
		let user = await User
			.findOne({ email: req.body.email }, 'name email password admin blocked')
			.orFail(new Error("Authentication failed. Error 1"));

		user.authenticate(req.body.password);

		let token = createUserToken(user);

		res.status(200).json({ token: token, name: user.name, email: user.email });
	} catch ({ message }) {
		res.status(403).json({ message })
	}
}

module.exports = {
	authenticateUser
}
