module.exports = {
  config: {
    name: "isolation",
    version: "1.0",
    author: "Elohime",
    countDown: 5,
    role: 1,
    shortDescription: "Enable😼 or disable🙁 antiout",
    longDescription: "",
    category: "boxchat",
    guide: "{pn} {{[on | off]}}",
    envConfig: {
      deltaNext: 5
    }
  },
  onStart: async function({ message, event, threadsData, args }) {
    let antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout === undefined) {
      await threadsData.set(event.threadID, true, "settings.antiout");
      antiout = true;
    }
    if (!["on", "off"].includes(args[0])) {
      return message.reply("Please use 'on' or 'off' as an argument");
    }
    await threadsData.set(event.threadID, args[0] === "on", "settings.antiout");
    return message.reply(`𝘽𝙤𝙣𝙣𝙚 𝙣𝙤𝙪𝙫𝙚𝙡𝙡𝙚 👻. ${args[0] === "on", "𝙑𝙤𝙪𝙨 𝗲̂𝙩𝙚𝙨 𝙩𝙤𝙪𝙨 𝙚𝙣 𝙥𝙧𝙞𝙨𝙤𝙣, 𝙘𝙧𝙤𝙪𝙥𝙞𝙨𝙨𝙚𝙯 𝙩𝙤𝙪𝙨 𝙙𝙖𝙣𝙨 𝙫𝙤𝙩𝙧𝙚 𝙜𝙧𝙤𝙪𝙥𝙚 𝙙𝗲́𝙗𝙞𝙡𝙚 𝙦𝙪𝙞 𝙥𝙪𝙚 𝙡'𝙚𝙣𝙣𝙪𝙞...😂" : "𝘝𝘰𝘶𝘴 𝘦̂𝘵𝘦𝘴 𝘵𝘰𝘶𝘴 𝘭𝘪𝘣𝘳𝘦, c'est une p'tite merde qui a voulu ça, espérons qu'il ait pris la bonne décision...😪"}.`);
  },
  onEvent: async function({ api, event, threadsData }) {
    const antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout && event.logMessageData && event.logMessageData.leftParticipantFbId) {
      // A user has left the chat, get their user ID
      const userId = event.logMessageData.leftParticipantFbId;

      // Check if the user is still in the chat
      const threadInfo = await api.getThreadInfo(event.threadID);
      const userIndex = threadInfo.participantIDs.indexOf(userId);
      if (userIndex === -1) {
        // The user is not in the chat, add them back
        const addUser = await api.addUserToGroup(userId, event.threadID);
        if (addUser) {
          console.log(`User ${userId} was added back to the chat.`);
        } else {
          console.log(`Failed to add user ${userId} back to the chat.`);
        }
      }
    }
  }
}
