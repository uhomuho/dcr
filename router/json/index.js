const { Router } = require("express")

const router = Router()

router.use("/client", require("./client"))
router.use("/admin", require("./admin"))

module.exports = router