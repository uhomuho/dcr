require('module-alias/register')
require("dotenv").config()

// Очищаем коноль при (пере)запуске
console.clear()

const express = require("express"),
			cookieParser = require("cookie-parser")

// Ининциализируем сервер
const app = express()

app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )
app.use( cookieParser() )

// Устанавливаем движок рендера
app.set("views", "views")
app.set("view engine", "pug")

// Устанавливаем статическую папку сервера
app.use( express.static("public") )

// Подключаем middleware
app.use( require("./middleware/renderFunctions") )

// Маршруты приложения
app.use( require("./router") )

// Запускаем сервак
const port = process.env.PORT || 3000
app.listen(port, () => console.log("App running on:", port))