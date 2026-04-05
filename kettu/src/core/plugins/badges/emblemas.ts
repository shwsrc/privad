export interface DiscordBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const DISCORD_BADGES: DiscordBadge[] = [
  {
    id: "staff",
    name: "Funcionário Discord",
    description: "Membro da equipe do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png",
  },
  {
    id: "partner",
    name: "Servidor Parceiro",
    description: "Dono de servidor parceiro do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/3f9748e53446575cb1d92ee2ddf948e5.png",
  },
  {
    id: "hypesquad",
    name: "HypeSquad Events",
    description: "Membro do HypeSquad Events",
    icon: "https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png",
  },
  {
    id: "hypesquad_house_1",
    name: "HypeSquad Bravery",
    description: "Membro da casa HypeSquad Bravery",
    icon: "https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png",
  },
  {
    id: "hypesquad_house_2",
    name: "HypeSquad Brilliance",
    description: "Membro da casa HypeSquad Brilliance",
    icon: "https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png",
  },
  {
    id: "hypesquad_house_3",
    name: "HypeSquad Balance",
    description: "Membro da casa HypeSquad Balance",
    icon: "https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223e334.png",
  },
  {
    id: "bug_hunter_level_1",
    name: "Caçador de Bugs",
    description: "Caçador de Bugs do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297c4a5f28b36.png",
  },
  {
    id: "bug_hunter_level_2",
    name: "Caçador de Bugs Nível 2",
    description: "Caçador de Bugs do Discord - Nível 2",
    icon: "https://cdn.discordapp.com/badge-icons/848f79826c8640f2b10f3d50f355c5a4.png",
  },
  {
    id: "early_supporter",
    name: "Apoiador Inicial",
    description: "Apoiador inicial do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png",
  },
  {
    id: "early_verified_bot_developer",
    name: "Desenvolvedor de Bots Verificado",
    description: "Desenvolvedor de bots verificado pelo Discord",
    icon: "https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b4f78f9c5d1e6f.png",
  },
  {
    id: "certified_moderator",
    name: "Moderador Certificado",
    description: "Ex-aluno de programas de moderação do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/fee1624003e2fee35cb398e125dc479b.png",
  },
  {
    id: "active_developer",
    name: "Desenvolvedor Ativo",
    description: "Desenvolvedor ativo do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695b9.png",
  },
  {
    id: "premium_bronze",
    name: "Nitro Bronze",
    description: "Assinante do Nitro há 1 mês",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/bronze.png",
  },
  {
    id: "premium_silver",
    name: "Nitro Prata",
    description: "Assinante do Nitro há 3 meses",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/silver.png",
  },
  {
    id: "premium_gold",
    name: "Nitro Ouro",
    description: "Assinante do Nitro há 6 meses",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/gold.png",
  },
  {
    id: "premium_platinum",
    name: "Nitro Platina",
    description: "Assinante do Nitro há 1 ano",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/platinum.png",
  },
  {
    id: "premium_diamond",
    name: "Nitro Diamante",
    description: "Assinante do Nitro há 2 anos",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/diamond.png",
  },
  {
    id: "premium_emerald",
    name: "Nitro Esmeralda",
    description: "Assinante do Nitro há 3 anos",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/emerald.png",
  },
  {
    id: "premium_ruby",
    name: "Nitro Rubi",
    description: "Assinante do Nitro há 5 anos",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/ruby.png",
  },
  {
    id: "premium_opal",
    name: "Nitro Opala",
    description: "Assinante do Nitro há 6+ anos",
    icon: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/opal.png",
  },
  {
    id: "guild_booster_lvl1",
    name: "Impulso de Servidor Nível 1",
    description: "Impulsionando um servidor há 1 mês",
    icon: "https://cdn.discordapp.com/badge-icons/51040c70d4f20a921ad6674ff86fc95c.png",
  },
  {
    id: "guild_booster_lvl2",
    name: "Impulso de Servidor Nível 2",
    description: "Impulsionando um servidor há 2 meses",
    icon: "https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png",
  },
  {
    id: "guild_booster_lvl3",
    name: "Impulso de Servidor Nível 3",
    description: "Impulsionando um servidor há 3 meses",
    icon: "https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png",
  },
  {
    id: "guild_booster_lvl4",
    name: "Impulso de Servidor Nível 4",
    description: "Impulsionando um servidor há 6 meses",
    icon: "https://cdn.discordapp.com/badge-icons/df199d2050d3ed4f82571f1a0d0d37d0.png",
  },
  {
    id: "guild_booster_lvl5",
    name: "Impulso de Servidor Nível 5",
    description: "Impulsionando um servidor há 9 meses",
    icon: "https://cdn.discordapp.com/badge-icons/ec92202290b48d0879b7413d2dde3bab.png",
  },
  {
    id: "guild_booster_lvl6",
    name: "Impulso de Servidor Nível 6",
    description: "Impulsionando um servidor há 12 meses",
    icon: "https://cdn.discordapp.com/badge-icons/33a15af112c985aae80f99e1a33e2e2d.png",
  },
  {
    id: "guild_booster_lvl7",
    name: "Impulso de Servidor Nível 7",
    description: "Impulsionando um servidor há 15 meses",
    icon: "https://cdn.discordapp.com/badge-icons/5765be43a1fce4e8c00e1c7e62e6996e.png",
  },
  {
    id: "guild_booster_lvl8",
    name: "Impulso de Servidor Nível 8",
    description: "Impulsionando um servidor há 18 meses",
    icon: "https://cdn.discordapp.com/badge-icons/142eb1b3ac7c45d769e19c289c3e660f.png",
  },
  {
    id: "guild_booster_lvl9",
    name: "Impulso de Servidor Nível 9",
    description: "Impulsionando um servidor há 24 meses",
    icon: "https://cdn.discordapp.com/badge-icons/ec92202290b48d0879b7413d2dde3bab.png",
  },
  {
    id: "legacy_username",
    name: "Nome de Usuário Original",
    description: "Registrado antes da mudança de nomes de usuário",
    icon: "https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png",
  },
  {
    id: "quest_completed",
    name: "Missão Concluída",
    description: "Completou uma missão do Discord",
    icon: "https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png",
  },
];

export default DISCORD_BADGES;
