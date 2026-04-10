import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [
  {
    name: "baba",
    description: "Gerencia o acesso da babá ao canal monitoramento",
    options: [
      {
        name: "chegou",
        description: "Libera o acesso da babá ao canal",
        type: 1, // SUB_COMMAND
      },
      {
        name: "saiu",
        description: "Remove o acesso da babá ao canal",
        type: 1, // SUB_COMMAND
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log("🔄 Iniciando deploy dos comandos (guild)...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("✅ Comandos registrados com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar comandos:", error);
  }
})();
