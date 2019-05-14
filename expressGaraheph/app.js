const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

mongoose.connect('mongodb+srv://joannearnante:Good.Codes22@cluster1-guexr.mongodb.net/garaheph?retryWrites=true', {useNewUrlParser: true})

const app = express();

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("./passport");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running at port ${port}`);
})

//registration
const reg = require("./routes/register.js");
app.use("/register", reg);

//login
const auth = require("./routes/auth.js");
app.use("/auth", auth);

//define a middleware for verifying if authenticated user is an admin
function verifyAdmin(req, res, next){
	//since passport.authenticate precedes this middleware, the req object will already have a user property containing all fields of the user document
	//console.log(req.user);
	const isAdmin = req.user.isAdmin;
	// console.log(req.user)
	//only admin users can proceed to the indicated route
	if(isAdmin == true){
		next()
	}else{
		//non-admin users will be redirected with a status code of "forbidden"
		res.redirect(403, '/')
	}
}

//admin only access
const admin = require("./routes/admin.js");
//use passport's jwt strategy to authenticate jwt's whenever requests are made to the /admin endpoint
//after jwt authentication by passport, run the verifyAdmin middleware to check if authenticated user is an admin
//only if it passes the check will the request make it to the designated admin route
app.use("/admin", [passport.authenticate("jwt", {session:false}), verifyAdmin], admin);