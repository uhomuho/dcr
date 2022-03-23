const Minio = require("minio")

const client = new Minio.Client({
	endPoint: process.env.MINIO_URL,
	port: parseInt(process.env.MINIO_PORT),
	useSSL: process.env.NODE_ENV == "production",
	accessKey: process.env.MINIO_LOGIN,
	secretKey: process.env.MINIO_PWD
})

client.listBuckets()
	.then(() => console.log("Successfully connected to file storage"))
	.catch(() => {
		throw new Error("Minio connection error")
	})

module.exports = client