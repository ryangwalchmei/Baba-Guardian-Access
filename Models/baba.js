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

const baba = {
  allowAccessToCamChannel,
  denyAccessToCamChannel,
};

export default baba;
