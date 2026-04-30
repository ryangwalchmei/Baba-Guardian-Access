// const  = require("express");
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createDiscordClient, Events } from "./Infra/discord.js";

import baba from "./models/baba.js";
import { handleBabaCommand } from ("./lib/discord/commands/baba.js");
      
import channel from "./models/channel.js";
import routes from "./services/api/routes/routes.js";


const { DISCORD_TOKEN, ROLE_PAIS_ID, CHANNEL_ID, ROLE_BABA_ID } = process.env;
const client = createDiscordClient();

client.once(Events.ClientReady, () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "baba") return;

  if (!interaction.guild) {
    await interaction.reply({
      content: "❌ Este comando só pode ser usado em um servidor.",
      ephemeral: true,
    });
    console.log(
      `[ERRO] Comando usado fora de guild por ${interaction.user.tag}`,
    );
    return;
  }

  const paisRoleId = ROLE_PAIS_ID;
  let member;
  try {
    member = await interaction.guild.members.fetch(interaction.user.id);
  } catch (error) {
    console.error("Erro ao buscar membro:", error);
    await interaction.reply({
      content: "❌ Não foi possível identificar seu usuário no servidor.",
      ephemeral: true,
    });
    return;
  }

  if (!member.roles.cache.has(paisRoleId)) {
    return interaction.reply({
      content: "❌ Você não tem permissão.",
      ephemeral: true,
    });
  }

  try {
      
    await handleBabaCommand(interaction);
  } catch (error) {
    console.error("Erro ao executar comando /baba:", error);
    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Ocorreu um erro ao processar o comando.",
        ephemeral: true,
      });
    }
  }
});

client.on(Events.MessageCreate, async (message) => {
  const isChannelCorrect =
    message.channelId === process.env.CHANNEL_TO_SENT_COMMANDS;
  const isGuildCorrect = message.guildId === process.env.GUILD_ID;
  const channelObject = await channel.getAChannel(message, CHANNEL_ID);

  if (isChannelCorrect && isGuildCorrect && channelObject) {
    if (!message.content) return;

    switch (message.content) {
      case "!baba chegou":
        await baba.allowAccessToCamChannel(channelObject, ROLE_BABA_ID);
        await message.reply({
          content: "👶 Babá chegou — acesso liberado.",
        });
        console.log(
          `[ACESSO LIBERADO] Babá pode acessar o canal ${channelObject.name}`,
        );

        // await message.delete();
        break;
      case "!baba saiu":
        await baba.denyAccessToCamChannel(channelObject, ROLE_BABA_ID);
        await message.reply({
          content: "🚪 Babá saiu — acesso removido.",
        });
        console.log(
          `[ACESSO REMOVIDO] Babá não pode mais acessar o canal ${channelObject.name}`,
        );
        // await message.delete();
        break;

      default:
        console.log("CAIU EM OUTRO");
        // await message.delete();
        break;
    }
  }
});

client.login(DISCORD_TOKEN);

const server = express();
server.use(express.json());
server.use(routes);
const port = process.env.BABA_API_PORT || 3000;

// Sobe o servidor Express
server.listen(port, () => {
  console.log(`Health check rodando na porta ${port}`);
});
