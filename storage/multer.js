const multer = require('multer')

module.exports = (field = 'files', count = 2, filter = true) => {
	const fileFilter = (req, file, cb) => {
		if (!filter)
			return cb(null, true)

		if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") 
			return cb(null, true)
		
		const err = new Error('Only .jpg and .jpeg format allowed!')
		err.name = 'ExtensionError'
		return cb(err, false)
	}

	const storage = multer.memoryStorage({
		destination: (req, file, cb) => {
			cb(null, '')
		}
	})

	return multer({ storage, fileFilter }).array(field, count)
}