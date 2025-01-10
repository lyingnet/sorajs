import { BotClient } from "./bot";
import * as dotenv from "dotenv";
import { container } from "@sapphire/framework";

dotenv.config(); // Load environment variables

const client = new BotClient();

(async () => {
  try {
    console.log("Starting Bot...");
    container.db = client.db; // Attach Prisma to Sapphire's container
    await client.login(process.env.TOKEN); // Ensure DISCORD_TOKEN is set in your .env file
    console.log("Bot logged in successfully!");
  } catch (error) {
    console.error("Failed to start the bot:", error);
  }
})();
