import express from "express"
import fs from "node:fs"
import path from "node:path"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")))

app.use((req, res) => {
    if (config.console.in) console.log(req.ip + " ==> " + req.originalUrl)
    const place = path.join(__dirname, config.rootfolder)
    let topath = req.originalUrl;
    if (req.originalUrl == "/") topath = "/index.html"
    if (!fs.existsSync(path.join(place, topath))) {
        if (config.autoRedirectHTML) {
            if (fs.existsSync(path.join(place, (topath + ".html")))) {
                topath = topath + ".html"
            } else {
                if (config.console.err) console.log(req.ip + " <!= " + topath + ".html : file not found")
                res.status(404)
                res.send("Cannot GET " + topath)
                return
            }
        } else {
            if (config.console.err) console.log(req.ip + " <!= " + topath + " : file not found")
            res.status(404)
            res.send("Cannot GET " + topath)
            return
        }
    }
    if (!(fs.statSync(path.join(place, topath)).isFile())) topath = topath + "/index.html"
    if (fs.existsSync(path.join(place, topath))) {
        if (place.length > path.join(place, topath).length) { 
            if (config.console.err) console.log(req.ip + " <!= " + topath + " : out of bounds?")
            res.status(500)
            res.send("Server Error Occured.")
            return
        }
        res.sendFile(path.join(place, topath), (err) => {
            if (config.console.out) console.log(req.ip + " <== " + topath)
        })
    } else {
        res.status(404)
        res.send("Cannot GET", topath)
    }
})

app.listen(config.port, function() {
    console.log("listening at", config.port)
})