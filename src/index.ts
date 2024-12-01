import express, { type Request, type Response } from "express"
import expressWinston from "express-winston"
import moment from "moment"
import winston from "winston"

function timezonedTime(): string {
  return moment().local().format("hh:mm:ss")
}

const app = express()
const port = process.env.PORT

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp({ format: timezonedTime }),
      winston.format.colorize(),
      winston.format.printf(
        (info) => `${info.timestamp} | ${info.level} | ${info.message}`,
      ),
    ),
    colorize: true,
    expressFormat: true,
  }),
)

app.get("/", (_, res) => {
  res.send("Hello World 2!")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
