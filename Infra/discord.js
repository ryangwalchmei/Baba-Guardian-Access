// Infraestrutura de integração com Discord
// Exporte funções/utilitários para lidar com o client, permissões, etc.

import discord, { Events, IntentsBitField, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const { DISCORD_TOKEN } = process.env;

export function createDiscordClient() {
  return new discord.Client({
    intents: Object.keys(IntentsBitField.Flags),
    partials: [
      Partials.Channel,
      Partials.GuildMember,
      Partials.GuildScheduledEvent,
      Partials.Message,
      Partials.Reaction,
      Partials.ThreadMember,
      Partials.User,
    ],
  });
}

export { Events };
