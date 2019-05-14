const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlotSchema = new Schema ({slotId: String});

const WorkspaceSchema = new Schema({
	workspace: String,
	description: String,
	price: Number,
	slots: [SlotSchema]
})

module.exports = mongoose.model('Workspace', WorkspaceSchema)