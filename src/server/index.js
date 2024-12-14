const express = require("express")
const port = 8000
const cors = require("cors")
const app = express()
app.use(cors())
const dotenv = require("dotenv")
const { analyze } = require("./analyse")

app.use(express.static('dist'))
app.use(express.json())
dotenv.config()


const MEAN_CLOUD_API_KEY = process.env.API_KEY

app.get('/', function (req, res) {
    res.render("index.html")
})

app.post("/", async (req, res) => {
    const url = req.body.URI
    const Analyze = await analyze(url, MEAN_CLOUD_API_KEY)
    const {code, msg, sample} = Analyze
    if (code == 212) {
        return res.send({ msg: msg , code: code})
    }
    else if (code == 100) {
        return res.send({ msg: msg, code: code })
    }

    return res.send({sample: sample, code: code})

})


app.listen(port,
    () => console.log("server is now listening on port 8000")
)
