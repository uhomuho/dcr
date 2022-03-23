exports.err = (res, message, status = 500) => {
	res.status(status)
	res.send({ message })
}