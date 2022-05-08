import { Sora } from "./classes/Sora.js"
// import { readdirSync } from "fs"
import "./lib/setup/index.js"
import "./types/Augments.js"

const client = new Sora()



try {
    client.logger.info("Starting up...")
    client.login()
    client.logger.info("Started up!")
} catch(err) {
    console.log(err)
}