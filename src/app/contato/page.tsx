import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { SITE, WHATSAPP_URL } from "@/lib/constants/site";

export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Viver Saúde. Fale conosco pelo WhatsApp, telefone ou e-mail. Atendimento em Natal/RN.",
};

const contactCards = [
  {
    title: "WhatsApp",
    description: "Atendimento rápido e prático.",
    value: SITE.phone,
    href: WHATSAPP_URL,
    linkLabel: "Abrir WhatsApp",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Telefone",
    description: "Ligue para nossa central.",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\D/g, "")}`,
    linkLabel: "Ligar agora",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "E-mail",
    description: "Envie sua mensagem.",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    linkLabel: "Enviar e-mail",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Horário",
    description: "Segunda a sexta-feira",
    value: "8h às 17h",
    href: null,
    linkLabel: null,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ContatoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <ScrollAnimationWrapper>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contato</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Estamos aqui para ajudar. Escolha o canal mais conveniente para você.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => (
              <ScrollAnimationWrapper key={card.title} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border h-full flex flex-col text-center items-center">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <h2 className="text-base font-bold text-foreground mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-muted mb-3 leading-relaxed">
                    {card.description}
                  </p>
                  <p className="text-foreground font-semibold text-sm mb-3 mt-auto break-all">
                    {card.value}
                  </p>
                  {card.href && card.linkLabel && (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
                    >
                      {card.linkLabel}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quer se tornar um cliente Viver Saúde?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Preencha nosso formulário e nossa equipe entrará em contato com você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quero-ser-cliente"
                className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-4 text-lg bg-[#54d8bc] text-white hover:bg-[#3bbfa3] shadow-md transition-all duration-300"
              >
                Quero ser cliente
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-[#2563eb] transition-all duration-300"
              >
                Falar no WhatsApp
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
}
