import { envParseArray } from "@skyra/env-utilities";
import { Message, MessageActionRow, MessageButton } from "discord.js";
import Listener from "../classes/ListenerClass.js";
import {  } from "discord.js"
import { client } from "../index.js";
export default class MessageCreate extends Listener<"messageCreate"> {
    /**
     *
     */
    constructor() {
        super(client, "messageCreate");
        
    }
    override async run(message: Message) {
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId("FUNNY_ACTION_YES")
                    .setStyle("PRIMARY")
                    .setLabel("yes"),
                    new MessageButton()
                    .setCustomId("FUNNY_ACTION_CANCEL")
                    .setStyle("DANGER")
                    .setLabel("no im a fucking pussy")
                )
        if(message.content === "i have no choice") {
            if(envParseArray('DEV_IDS').includes(message.author.id)) {
                const collector = (await message.channel.send({content: "are you sure", components: [row]})).createMessageComponentCollector({time: 15000})

                collector.on('collect', async (m) => {
                    if(envParseArray('DEV_IDS').includes(m.user.id)) {
                        if(m.customId === "FUNNY_ACTION_YES") {
                            message.reply("you have no choice")
                            collector.stop()
                        }
                    }
                })
                
        }
    }
}}