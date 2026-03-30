/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://planoviversaude.com.br",
  generateRobotsTxt: false,
  exclude: ["/ponti-admin/*", "/api/*"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/planos": 0.9,
      "/quero-ser-cliente": 0.9,
      "/quem-somos": 0.8,
      "/servicos": 0.8,
      "/rede-credenciada": 0.8,
      "/contato": 0.8,
      "/faq": 0.7,
      "/nossa-casa": 0.7,
      "/noticias": 0.6,
      "/portal-cliente": 0.5,
      "/area-prestador": 0.5,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
