const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  balance: {
    type: Number,
    required: true
  },
  wins: {
    type: Number,
    required: true
  }
});

userSchema.methods.setBalance = function(amount) {
	this.balance = amount;
};

userSchema.methods.setWins = function(count) {
	this.wins = count;
};

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		balance: this.balance,
		wins: this.wins,
		exp: parseInt(expiry.getTime() / 1000)
	},  process.env.DB_SECRET);
};

mongoose.model('Users', userSchema);
