import discord, { Events, IntentsBitField, Partials } from "discord.js";
import dotenv from "dotenv";
import { handleBabaCommand } from "./commands/baba.js";
dotenv.config();

const { DISCORD_TOKEN, ROLE_PAIS_ID } = process.env;

const client = new discord.Client({
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
    const { handleBabaCommand } = await import("./commands/baba.js");
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

client.login(DISCORD_TOKEN);
