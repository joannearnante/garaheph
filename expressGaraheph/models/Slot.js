const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema ({userId: String});

const SlotSchema = new Schema({
	workspace: String,
	number: Number,
	description: String,
	capacity: Number,
	price: Number,
	startDate: String,
	endDate: String,
	user: [UserSchema],
	available: {
		type: Boolean,
		default: true
	},
	elapsed: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('Slot', SlotSchema)