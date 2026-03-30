-- Seed plans
INSERT INTO plans (name, slug, display_name, tagline, highlights, sort_order) VALUES
('Topazio', 'topazio', 'Plano Topazio', 'Acompanhamento continuo e foco em prevencao e cuidado integral.', ARRAY['Atencao primaria a saude', 'Foco em prevencao', 'Acompanhamento continuo'], 1),
('Rubi', 'rubi', 'Plano Rubi', 'Cobertura completa para todas as fases da vida, com atendimento ambulatorial e hospitalar.', ARRAY['Cobertura ambulatorial e hospitalar', 'Atendimento completo', 'Para todas as fases da vida'], 2),
('Esmeralda', 'esmeralda', 'Plano Esmeralda', 'Estabilidade e cuidado continuo para quem prioriza confianca no dia a dia.', ARRAY['Estabilidade no cuidado', 'Confianca e seguranca', 'Cuidado preventivo'], 3),
('Safira', 'safira', 'Plano Safira', 'Alta qualidade de atendimento para quem busca agilidade e desempenho.', ARRAY['Alta qualidade', 'Agilidade no atendimento', 'Desempenho superior'], 4),
('Turmalina', 'turmalina', 'Plano Turmalina', 'Cobertura essencial e eficiente para internacoes e atendimentos hospitalares.', ARRAY['Cobertura hospitalar', 'Eficiencia no atendimento', 'Essencial e completo'], 5),
('Quartzo', 'quartzo', 'Plano Quartzo', 'Protecao acessivel com cobertura para as necessidades essenciais de saude.', ARRAY['Protecao acessivel', 'Cobertura essencial', 'Custo-beneficio'], 6);

-- Seed site settings
INSERT INTO site_settings (key, value) VALUES
('contact_info', '{"phone": "(84) 3114-1100", "email": "contato@planoviversaude.com.br", "address": "Natal, RN", "whatsapp": "558431141100"}'),
('social_links', '{"instagram": "https://www.instagram.com/planoviversaude/", "facebook": "https://www.facebook.com/planoviversaude/", "linkedin": "https://www.linkedin.com/company/planoviversaude/"}'),
('app_links', '{"ios": "#", "android": "#"}'),
('footer_text', '{"copyright": "Viver Saude. Todos os direitos reservados.", "ans_number": "335592"}'),
('announcement_bar', '{"enabled": false, "text": "", "link": ""}');

-- Seed network providers (known from current site)
INSERT INTO network_providers (name, category, is_featured, sort_order) VALUES
('Hospital Rio Grande', 'hospital', true, 1),
('Maternidade Delfin Gonzalez', 'maternidade', true, 2),
('Hospital Psiquiatrico Villa Vic', 'saude-mental', true, 3),
('Viver Clinica - Lagoa Nova', 'clinica', true, 4),
('Viver Clinica - Zona Norte', 'clinica', true, 5),
('Laboratorio Paulo Gurgel', 'laboratorio', false, 6),
('Laboratorio HEMME', 'laboratorio', false, 7),
('Incor Imagens Pedro Cavalcanti', 'exames', false, 8),
('O CASA - Centro de Atencao a Saude', 'centro-referencia', true, 9),
('Centro de Fisioterapia Gerlane C', 'terapias', false, 10);
