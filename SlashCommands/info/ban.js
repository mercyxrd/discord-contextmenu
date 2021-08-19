const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale("tr");
const ms = require("ms");

module.exports = {
    name: "Ban: Sebep Yok.",
    description: "kullanıcı banlamaya yarar",
    type: 'USER',
    /**
     *
     * @param { Client } client
     * @param { ContextMenuInteraction } interaction
     * @param { String[] } args
     */
    run: async (client, interaction, args) => {
        const user = await client.users.fetch(interaction.targetId)
        if (!interaction.member.roles.cache.has(client.config.staffs.banStaff) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin"})
        if (interaction.guild.members.cache.has(user.id) && interaction.guild.members.cache.get(user.id).permissions.has(["VIEW_AUDIT_LOG","ADMINISTRATOR","MANAGE_GUILD","MANAGE_ROLES"])) return interaction.followUp({ content: `${client.config.emojis.IptalE} Bu kullanıcıyı yasaklayamazsın.`})
        interaction.guild.members.ban(user)
        interaction.followUp({ embeds: [new MessageEmbed().setAuthor(user.tag, user.avatarURL({dynamic: true})).setDescription(`${user} kullanıcısı ${interaction.user} tarafından **Belirtilmedi** sebebi ile yasaklandı.`)
        .setImage(`https://media.giphy.com/media/JWj4kJrSOzeU27jGI4/giphy.gif`)]})

        // LOG ATTIRMA
        let channel = interaction.guild.channels.cache.get(client.config.logs.mutelog)
        let embed = new MessageEmbed().setAuthor(client.config.embed.sunucuAdı, interaction.guild.iconURL({dynamic: true}))
        .setDescription(`${user} kullanıcısı sunucudan ${interaction.user} tarafından **Belirtilmedi** nedeni ile yasaklandı.`)
        .setFooter(client.config.embed.authorTag)
        channel.send({ embeds: [embed]})
    }
};
