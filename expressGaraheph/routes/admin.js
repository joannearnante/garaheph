const express = require("express");

const router = express.Router();

const Workspace = require('../models/Workspace');

const Slot = require('../models/Slot');

const moment = require("moment");

const dateNow = moment().format('YYYY MM DD');

//WORKSTATIONS
//index
router.get("/workspaces", (req, res, next) => {
	Workspace.find({})
	.then(workspaces => {
		return res.json(workspaces)
	})
	.catch(next)
})

//store
router.post("/workspaces", (req, res, next) => {
	let workspace = req.body.workspace;
	let description = req.body.description;
	let price = req.body.price;

	if(!workspace || !description || !price){
		return res.status(500).json({
			"message" : "Missing workspace information"
		})
	}

	Workspace.create(req.body)
	.then(workspace => {
		return res.json({
			"message" : "Workspace created successfully",
			"workspace" : workspace
		})
	})
	.catch(next)
})

//show
router.get("/workspaces/:id", (req, res, next) => {
	Workspace.findById(req.params.id)
	.then(workspace => {
		return res.json(workspace)
	})
	.catch(next)
})

//update
router.put("/workspaces/:id", (req, res, next) => {
	Workspace.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(workspace => {
		return res.json({
			"message": "Workspace updated successfully",
			"workspace": workspace
		})
	})
	.catch(next)
})

//delete
router.delete("/workspaces/:id", (req, res, next) => {
	Workspace.findByIdAndRemove(req.params.id)
	.then(workspace => {
		return res.json({
			"message":"Workspace deleted successfully",
			"workspace": workspace
		})
	})
	.catch(next)
})

//SLOTS
router.get("/slots", (req, res, next) => {
	Slot.find({})
	.then(slots => {
		return res.json(slots)
	})
	.catch(next)
})

//store
router.post("/slots", (req, res, next) => {
	let workspace = req.body.workspace;
	let number = req.body.number;
	let description = req.body.description;
	let capacity = req.body.capacity;
	let price = req.body.price;
	let startDate = req.body.startDate;
	let endDate = req.body.endDate;
	let user = req.body.user;
	let available = req.body.available;
	let elapsed = req.body.elapsed;

	if(!workspace || !number || !description || !capacity ||!price || !startDate || !endDate || !available || !elapsed){
		return res.status(500).json({
			"message" : "Missing slot information"
		})
	}

	Slot.create(req.body)
	.then(slot => {
		return res.json({
			"message" : "Slot created successfully",
			"slot" : slot
		})
	})
	.catch(next)
})

//error handling middleware
router.use((err, req, res, next) => {
	res.status(422).send({
		error : err.message
	})
})

module.exports = router;