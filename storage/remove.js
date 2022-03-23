const storage = require("./storage")

module.exports = (name, bucket = "cars") => {
	const vars = [ "", "_medium", "_thumb" ]

	return new Promise(( resolve, reject ) => {
		storage.removeObjects(bucket, vars.map(v => `${name}${v}.webp`), err => {
			if (err) {
				console.log(err)
				return reject(err)
			}
			console.log(`Удалили картинку "${name}" из хранилища`)
			resolve(true)
		})
	})
}