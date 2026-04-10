import dotenv from "dotenv";
dotenv.config();
import baba from "../Models/baba.js";

const { CHANNEL_ID, ROLE_BABA_ID } = process.env;

// Utilitário para flags de resposta ephemeral
const EPHEMERAL_FLAG = 1 << 6;

export async function handleBabaCommand(interaction) {
  const subcommand = interaction.options.getSubcommand();

  if (!interaction.guild) {
    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Este comando só pode ser usado em um servidor.",
        flags: EPHEMERAL_FLAG,
      });
    }
    console.log("[ERRO] interaction.guild é null");
    return;
  }
  if (!interaction.guild.channels) {
    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Não foi possível acessar os canais do servidor.",
        flags: EPHEMERAL_FLAG,
      });
    }
    console.log("[ERRO] interaction.guild.channels é null");
    return;
  }

  let channel;
  try {
    channel = await interaction.guild.channels.fetch(CHANNEL_ID);
  } catch (error) {
    console.error("Erro ao buscar canal:", error);
    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Canal não encontrado.",
        flags: EPHEMERAL_FLAG,
      });
    }
    return;
  }
  if (!channel) {
    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Canal não encontrado.",
        flags: EPHEMERAL_FLAG,
      });
    }
    console.log("[ERRO] Canal não encontrado:", CHANNEL_ID);
    return;
  }

  try {
    if (subcommand === "chegou") {
      await baba.allowAccessToCamChannel(channel, ROLE_BABA_ID);
      await interaction.reply({
        content: "👶 Babá chegou — acesso liberado.",
      });
      console.log(
        `[ACESSO LIBERADO] Babá pode acessar o canal ${channel.name}`,
      );
    } else if (subcommand === "saiu") {
      await baba.denyAccessToCamChannel(channel, ROLE_BABA_ID);
      await interaction.reply({
        content: "🚪 Babá saiu — acesso removido.",
      });
      console.log(
        `[ACESSO REMOVIDO] Babá não pode mais acessar o canal ${channel.name}`,
      );
    } else {
      await interaction.reply({
        content: "❓ Subcomando inválido.",
        flags: EPHEMERAL_FLAG,
      });
      console.log("[ERRO] Subcomando inválido:", subcommand);
    }
  } catch (error) {
    console.error("Erro ao atualizar permissões:", error);
    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ Ocorreu um erro ao atualizar as permissões.",
        flags: EPHEMERAL_FLAG,
      });
    }
  }
}
