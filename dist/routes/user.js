"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    res.json({ das: "adads" });
});
// User Routes
// router.post("/signup", userSignupMiddleware, async (req, res) => {
// 	// router.post('/signup', (req, res) => { res.json({ hello: 'hello' }) })
// 	const user = req.user; //  got from middlewaresignup
// 	try {
// 		// save to db
// 		const u = await User.create(user);
// 		res.json({ msg: `${u.uname} created successfully` });
// 	} catch (err) {
// 		// save err to log
// 		// for now
// 		res.status(503).json({ msg: "Something went wrong" });
// 	}
// });
// router.post("/signin", userSigninMiddleware, async (req, res) => {
// 	const user = req.user; //  got from middlewaresignup
// 	try {
// 		const token = jwt.sign({ uname: user.uname }, process.env.JWT_TOKEN);
// 		// return and store the jwt token to web browser
// 		// for now
// 		res.json({ token });
// 		return;
// 		// res.cookie('', token);
// 		// req.session.valid = true;
// 		// console.log({ token });
// 		// res.header({ token })
// 		console.log(token);
// 		// res.redirect(url.format({
// 		//     pathname: '/dashboard',
// 		//     headers: { uname: user.uname }
// 		//     // query : {uname:user.uname}
// 		// }))
// 		res.redirect("/dashboard");
// 	} catch (err) {
// 		// save err to log
// 		// for now
// 		res.status(503).json({ msg: "Something went wrong" });
// 	}
// });
// router.post("/addCred", authMiddleware, async (req, res) => {
// 	// const token = req.headers.authorization;
// 	const data = req.data;
// 	const payload = {
// 		link: req.body.link,
// 		pswrd: req.body.pswrd,
// 	};
// 	try {
// 		console.log(payload);
// 		const cred = await Cred.create(payload);
// 		const user = await User.findOneAndUpdate(
// 			{
// 				uname: data.uname,
// 			},
// 			{
// 				$push: { credIds: cred._id },
// 			}
// 		);
// 		console.log(`type of credID array ele ${typeof user.credIds[0]}`);
// 		console.log(` ${user.credIds[0]}`);
// 		res.json({
// 			msg: "cred added successfully",
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		res.json({
// 			msg: "Something went wrong",
// 		});
// 	}
// });
// router.post("/deleteCred", authMiddleware, async (req, res) => {
// 	const data = req.data;
// 	const credID = req.headers.cred_id;
// 	console.log(`from /deleteCred: ${{ data }}`);
// 	console.log(data.uname);
// 	try {
// 		// console.log(payload);
// 		// const cred = await Cred.create(payload)
// 		await Cred.deleteOne({
// 			_id: new mongoose.Types.ObjectId(credID),
// 		});
// 		const user = await User.updateOne(
// 			{
// 				uname: data.uname,
// 			},
// 			{
// 				$pull: { credIds: new mongoose.Types.ObjectId(credID) },
// 			}
// 		);
// 		// user.credIds.pull(new mongoose.Types.ObjectId(credID))
// 		res.json({
// 			msg: `Cred Deleted Successfully`,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		res.json({
// 			msg: "Something went wrong",
// 		});
// 	}
// 	// Implement course purchase logic
// });
// router.get('/courses', (req, res) => {
//     // Implement listing all courses logic
// });
// router.get('/purchasedCourses', userMiddleware, (req, res) => {
//     // Implement fetching purchased courses logic
// });
exports.default = router;
