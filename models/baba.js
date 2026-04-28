async function allowAccessToCamChannel(channel, roleId) {
  return channel.permissionOverwrites.edit(roleId, {
    ViewChannel: true,
    Connect: true,
  });
}

async function denyAccessToCamChannel(channel, roleId) {
  return channel.permissionOverwrites.edit(roleId, {
    ViewChannel: false,
    Connect: false,
  });
}

async function listBabaMembers(guild, roleId) {
  if (!guild) throw new Error("Guild não fornecida");
  if (!roleId) throw new Error("roleId não fornecido");

  await guild.members.fetch(); // Garante cache atualizado

  const role = guild.roles.cache.get(roleId);
  if (!role) throw new Error("Role não encontrada");

  return Array.from(role.members.values());
}

const baba = {
  allowAccessToCamChannel,
  denyAccessToCamChannel,
  listBabaMembers,
};

export default baba;
