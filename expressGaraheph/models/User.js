const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: String,
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("User", UserSchema);