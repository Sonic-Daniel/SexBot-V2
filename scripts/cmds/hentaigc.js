const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "hentaigc",
    aliases: ["hentai"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "add user in thread"
    },
    longDescription: {
      vi: "",
      en: "add any user to bot owner group chat"
    },
    category: "GroupMsg",
    guide: {
      en: "{pn}exegc"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "8863528460348629";
    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage("☘️𝘛'𝘦𝘴 𝘥𝘦𝘫𝘢 𝘥𝘢𝘯𝘴 𝘭𝘦 𝘨𝘳𝘰𝘶𝘱𝘦 𝘴𝘪 𝘵𝘶 𝘵𝘳𝘰𝘶𝘷𝘦𝘴 𝘱𝘢𝘴 𝘷𝘦𝘳𝘪𝘧𝘪𝘦 𝘵𝘢 𝘣𝘰𝘪𝘵𝘦 𝘥𝘦 𝘮𝘦𝘴𝘴𝘢𝘨𝘦𝘴 𝘦𝘵 𝘣𝘰𝘪𝘵𝘦 𝘥𝘦 𝘴𝘱𝘢𝘮☘️", event.threadID);

        // Set ⚠ reaction for already added user
        api.setMessageReaction("⚠", event.messageID, "💌", api);
      } else {
        // If not, add the user to the group chat
        await api.addUserToGroup(event.senderID, threadID);
        api.sendMessage("🎊 | 𝑻'𝒂𝒔 𝒆𝒕𝒆 𝒂𝒋𝒐𝒖𝒕𝒆 𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 🌪️✨웃『𝔾ℂ🌶️ℍ𝔼ℕ𝕋𝔸𝕀』ヅ✨🌪️ 𝒕𝒖 𝒑𝒐𝒖𝒓𝒓𝒂𝒔 𝒍𝒊𝒃𝒓𝒆𝒎𝒆𝒏𝒕 𝒇𝒂𝒊𝒓𝒆 𝒔𝒐𝒓𝒕𝒊𝒓 𝒕𝒐𝒏 𝒄𝒐𝒕é 𝒑*𝒓𝒗𝒆𝒓𝒔 🌶😛", event.threadID);

        // Set 💛 reaction for successfully added user
        api.setMessageReaction("🍀", event.messageID, "💌", api);
      }
    } catch (error) {
      api.sendMessage("🙀 | Failed to add you to the group chat.\nk:", event.threadID);

      // Set 🙆 reaction for failed adding user
      api.setMessageReaction("💀", event.messageID, "👍", api);
    }
  }
}
