const sharp = require("sharp"),
			storage = require("./storage")

module.exports = (file, name, bucket = "cars") => {
	console.log("Upload started")

	return new Promise(async (resolve, reject) => {
		if (!file) return reject( new Error("No file for upload!") )
		if (!file.buffer) return reject( new Error("No buffer") )

		const [ buffer_original, buffer_1920, buffer_1280, buffer_720, buffer_480 ] = await Promise.all([
			sharp( file.buffer ).jpeg({ quality: 80 }).toBuffer(),
			sharp( file.buffer ).resize(1920).jpeg({ quality: 80 }).toBuffer(),
			sharp( file.buffer ).resize(1280).jpeg({ quality: 80 }).toBuffer(),
			sharp( file.buffer ).resize(720).jpeg({ quality: 80 }).toBuffer(),
			sharp( file.buffer ).resize(480).jpeg({ quality: 80 }).toBuffer()
		]).catch(reject)

		await Promise.all([
			storage.putObject(bucket, `${name}.webp`, buffer_original),
			storage.putObject(bucket, `${name}_1920.webp`, buffer_1920),
			storage.putObject(bucket, `${name}_1280.webp`, buffer_1280),
			storage.putObject(bucket, `${name}_720.webp`, buffer_720),
			storage.putObject(bucket, `${name}_480.webp`, buffer_480)
		]).catch(reject)

		console.log(`${name}.webp uploaded`)
		return resolve(true)
	})
}