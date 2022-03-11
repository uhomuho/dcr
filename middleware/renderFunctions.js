module.exports = (req, res, next) => {
	res.locals.$s = require("../sourcemap.json") 
	
	next()
}