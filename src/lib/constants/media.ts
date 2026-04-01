/**
 * Centralized media references for the Viver Saude website.
 *
 * After downloading Freepik Premium assets, place them in the
 * corresponding public/ paths and update the `src` values here.
 *
 * See MEDIA_REFERENCES.md for recommended Freepik URLs and descriptions.
 */

export const MEDIA = {
  hero: {
    video: {
      src: "/media/hero-video.mp4",
      poster: "/images/hero/hero-poster.jpg",
      alt: "Vídeo de fundo mostrando ambiente acolhedor de saúde",
    },
    backgroundDesktop: {
      src: "/images/hero/img-topo-web.jpg",
      alt: "Fundo decorativo Viver Saúde",
    },
    backgroundMobile: {
      src: "/images/hero/img-topo-mobile.jpg",
      alt: "Fundo decorativo Viver Saúde mobile",
    },
    mainImage: {
      src: "/images/hero/hero-topo.png",
      alt: "Família sorrindo com plano de saúde Viver Saúde em Natal RN",
      width: 600,
      height: 500,
    },
  },

  quemSomos: {
    team: {
      src: "/images/general/img-quem-somos.png",
      alt: "Equipe de profissionais da Viver Saúde comprometida com o seu cuidado",
    },
    valores: {
      src: "/images/general/img-valores.png",
      alt: "Valores da Viver Saúde: acolhimento, ética e compromisso",
    },
  },

  nossaCasa: {
    casa: {
      src: "/images/nossa-casa/casa.avif",
      alt: "Sede da Viver Saúde em Natal RN",
    },
    fachada: {
      src: "/images/nossa-casa/fachada.jpg",
      alt: "Fachada moderna da sede Viver Saúde em Natal RN",
    },
    recepcao: {
      src: "/images/nossa-casa/recepcao.jpg",
      alt: "Recepção acolhedora da Viver Saúde",
    },
    salaAtendimento: {
      src: "/images/nossa-casa/sala-atendimento.jpg",
      alt: "Sala de atendimento moderna e confortável",
    },
    espacoInterno: {
      src: "/images/nossa-casa/espaco-interno.jpg",
      alt: "Espaço interno climatizado da Viver Saúde",
    },
  },

  servicos: {
    consulta: {
      src: "/images/servicos/consulta.jpg",
      alt: "Médico atendendo paciente com cuidado e atenção na Viver Saúde",
    },
    cuidado: {
      src: "/images/servicos/cuidado.jpg",
      alt: "Consulta médica humanizada no plano Viver Saúde",
    },
  },

  beneficios: {
    idosoCuidado: {
      src: "/images/beneficios/idoso-cuidado.jpg",
      alt: "Cuidado especial com a saúde de idosos no plano Viver Saúde",
    },
    familiaSaudavel: {
      src: "/images/beneficios/familia-saudavel.jpg",
      alt: "Família saudável e feliz com plano Viver Saúde",
    },
  },

  rede: {
    hospitalModerno: {
      src: "/images/rede/hospital-moderno.jpg",
      alt: "Hospital moderno da rede credenciada Viver Saúde em Natal RN",
    },
  },

  general: {
    wellnessBg: {
      src: "/images/general/wellness-bg.jpg",
      alt: "Pessoas saudáveis e felizes representando o estilo de vida Viver Saúde",
    },
    cliente: {
      src: "/images/general/cliente.png",
      alt: "Portal do cliente Viver Saúde",
    },
    prestador: {
      src: "/images/general/prestador.png",
      alt: "Portal do prestador Viver Saúde",
    },
    maos: {
      src: "/images/general/img-maos.png",
      alt: "Mãos unidas representando cuidado e acolhimento",
    },
  },
} as const;
