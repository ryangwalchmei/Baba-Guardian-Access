const EPHEMERAL_FLAG = 1 << 6;

async function getAChannel(event, channelId) {
  try {
    const channel = await event.guild.channels.fetch(channelId);
    return channel;
  } catch (error) {
    console.error("Erro ao buscar canal:", error);
    if (!event.replied) {
      await event.reply({
        content: "❌ Canal não encontrado.",
        flags: EPHEMERAL_FLAG,
      });
    }
    console.log("[ERRO] Canal não encontrado:", CHANNEL_ID);
    return;
  }
}

const channel = {
  getAChannel,
};

export default channel;
