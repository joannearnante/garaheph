const express = require("express");

const router = express.Router();

const UserModel = require("../models/User");

const bcrypt = require("bcrypt-nodejs");

router.post("/", (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	if(!email || !password){
		return res.status(500).json({
			"error":"Missing credentials"
		})
	}

	UserModel.find({"email" : email}).then(function(user, err){
		if(err){
			return res.status(500).json({
				"error": "an error occured while querying the users collection"
			})
		}

		if(user.length > 0){
			return res.status(500).json({
				"error": "user already exists"
			})
		}

		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(password, salt, null, function(err, hash){
				let newUser = UserModel({
					"email": req.body.email,
					"password": hash
				})

				newUser.save(function(err){
					if(!err){
						return res.json({
							"message": "user registered successfully"
						})
					}
				})
			})
		})
	})
})
module.exports = router;