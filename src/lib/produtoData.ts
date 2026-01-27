
import homeEquityImage from "@/assets/home-equity.jpg";
import carConsortiumImage from "@/assets/car-consortium.jpg";
import carFinancimentoImage from "@/assets/carro.jpg";
import realEstateImage from "@/assets/real-estate.jpg";
import dinheiroImage from "@/assets/emprestimopessoal.jpg";
import medicoImage from "@/assets/medico.jpg";
import montedinheiroImage from "@/assets/dinheiro.jpg";
import leasingImage from "@/assets/leasing.jpg";
import finaciamentoImage from "@/assets/finaciamento.jpg";
import estruturaImage from "@/assets/estrutura.png";
import maquininhaImage from "@/assets/maquininha.png";
import recebiveisImage from "@/assets/recebiveis.png";

export interface Product {
  id: string; 
  category: 'para-voce' | 'para-seu-negocio';
  title: string;
  description: string;
  image: string;
  headline?: string;
  advantages?: { title: string; description: string }[];
  howItWorks?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}


export const products: Record<string, Product> = {

  
  'credito-consignado': {
    id: 'credito-consignado',
    category: 'para-voce',
    title: 'Crédito Consignado',
    description: 'Obtenha crédito descontado diretamente na folha de pagamento ou do benefício do INSS.',
    image: realEstateImage,
    headline: 'Crédito fácil e seguro com desconto direto na sua folha de pagamento.',
     howItWorks: [
        { title: '1. Consulta de Margem', description: 'Verificamos qual a sua margem consignável disponível para o empréstimo.' },
        { title: '2. Simulação e Proposta', description: 'Você escolhe o valor e o prazo, e nós apresentamos a proposta com o valor da parcela.' },
        { title: '3. Formalização Digital', description: 'Com a proposta aceita, a formalização é feita de forma rápida e segura, muitas vezes por biometria facial.' },
        { title: '4. Dinheiro Liberado', description: 'O valor é depositado na sua conta em poucas horas ou dias, sem burocracia.' },
    ],
    advantages: [
        { title: 'Juros Baixíssimos', description: 'Como o risco de inadimplência é menor, as taxas são as mais baixas do mercado de crédito.' },
        { title: 'Desconto em Folha', description: 'As parcelas são descontadas diretamente do seu salário ou benefício, evitando esquecimentos.' },
        { title: 'Facilidade de Aprovação', description: 'Disponível anche para negativados, pois a garantia é o seu rendimento fixo.' },
        { title: 'Prazo para Pagar', description: 'Prazos de pagamento mais longos, que podem chegar a 84 meses ou mais.' },
    ],
    faqs: [
        { question: 'Quem pode contratar o crédito consignado?', answer: 'Aposentados e pensionistas do INSS, servidores públicos (federais, estaduais e municipais) e funcionários de empresas privadas conveniadas.' },
        { question: 'O que é margem consignável?', answer: 'É o valor máximo da sua renda que pode ser comprometido com as parcelas do empréstimo, geralmente limitado a 35% do seu rendimento líquido.' },
        { question: 'Não tenho mais margem, e agora?', answer: 'Mesmo sem margem, você pode ter opções como a portabilidade do seu empréstimo ou o refinanciamento para liberar mais crédito.' },
    ]
  },
  'emprestimo-pessoal': {
    id: 'emprestimo-pessoal',
    category: 'para-voce',
    title: 'Empréstimo Pessoal',
    description: 'Solução rápida e sem burocracia para você realizar seus planos com liberdade e segurança.',
    image: dinheiroImage,
    headline: 'Dinheiro rápido na sua conta para o que você precisar.',
    howItWorks: [
       { 
    title: '1. Simulação Digital', 
    description: 'Realize uma simulação rápida para entendermos seu perfil e o potencial de crédito do seu ativo.' 
  },
  { 
    title: '2. Consultoria Especializada', 
    description: 'Um de nossos especialistas entrará em contato para entender seus objetivos e refinar os detalhes técnicos.' 
  },
  { 
    title: '3. Proposta Estruturada', 
    description: 'Analisamos as melhores opções do mercado para apresentar uma proposta personalizada com taxas otimizadas.' 
  },
  { 
    title: '4. Formalização e Liquidez', 
    description: 'Após sua aprovação, cuidamos da assinatura digital e da liberação do recurso com total agilidade.' 
  },
    ],
    advantages: [
        { title: 'Totalmente Digital', description: 'Faça todo o processo do seu celular ou computador, sem sair de casa.' },
        { title: 'Rapidez na Liberação', description: 'Ideal para imprevistos, com o dinheiro caindo na conta rapidamente.' },
        { title: 'Sem Garantia', description: 'Você não precisa colocar nenhum bem como garantia para obter o crédito.' },
        { title: 'Flexibilidade de Uso', description: 'Use o dinheiro como quiser, seja para pagar contas, viajar ou investir em você.' },
    ],
    faqs: [
        { question: 'Preciso comprovar renda?', answer: 'Sim, a comprovação de renda é uma etapa padrão da análise de crédito para garantir que as parcelas se encaixem no seu orçamento.' },
        { question: 'Pessoas com restrição no nome (negativadas) conseguem aprovação?', answer: 'A aprovação é mais difícil, pois a análise de crédito é mais rigorosa. No entanto, algumas financeiras parceiras possuem políticas flexíveis. Vale a pena simular.' },
        { question: 'Posso quitar o empréstimo antes do prazo?', answer: 'Sim! Você pode antecipar o pagamento das parcelas a qualquer momento e obter desconto proporcional dos juros.' },
    ]
  },


  
  'capital-de-giro': {
    id: 'capital-de-giro',
    category: 'para-seu-negocio',
    title: 'Capital de Giro',
    description: 'Tenha recursos imediatos para manter o fluxo do seu negócio em dia.',
    image: montedinheiroImage,
    headline: 'Mantenha a saúde financeira da sua empresa com capital de giro rápido e flexível.',
    advantages: [
        { title: 'Fluxo de Caixa Saudável', description: 'Cubra despesas operacionais, pague fornecedores e salários sem aperto.' },
        { title: 'Flexibilidade', description: 'Use o recurso conforme a necessidade do seu negócio, sem destinação específica.' },
        { title: 'Aproveite Oportunidades', description: 'Compre matéria-prima com desconto ou invista em estoque para datas sazonais.' },
        { title: 'Liberação Rápida', description: 'Processos ágeis para que o dinheiro chegue quando sua empresa mais precisa.' },
    ],
     howItWorks: [
        { title: '1. Análise Financeira', description: 'Apresente os documentos e o faturamento da sua empresa.' },
        { title: '2. Definição do Limite', description: 'Com base na saúde financeira do seu negócio, definimos um limite de crédito.' },
        { title: '3. Proposta e Contratação', description: 'Você recebe uma proposta com taxas e prazos e pode contratar online.' },
        { title: '4. Valor em Conta', description: 'O dinheiro é creditado na conta da sua empresa para uso imediato.' },
    ],
    faqs: [
        { question: 'Minha empresa precisa ter quanto tempo de CNPJ?', answer: 'Geralmente, é exigido um tempo mínimo de 12 meses de CNPJ ativo e com faturamento.' },
        { question: 'É necessário apresentar garantia?', answer: 'Depende da modalidade e do valor. Existem opções com e sem garantia. As opções com garantia (imóveis, veículos, recebíveis) costumam ter taxas melhores.' },
    ]
  },
 
  'financiamentos': {
    id: 'financiamentos',
    category: 'para-seu-negocio',
    title: 'Financiamentos',
    description: 'Transforme seus projetos em realidade com linhas de crédito sob medida.',
    image: finaciamentoImage,
    headline: 'Linhas de crédito para financiar o crescimento do seu negócio.',
     advantages: [
        { title: 'Projetos de Expansão', description: 'Financie a compra de máquinas, a construção de novas sedes ou a modernização da sua empresa.' },
        { title: 'Longo Prazo', description: 'Prazos de pagamento estendidos, adequados ao tempo de retorno do seu investimento.' },
        { title: 'Taxas Competitivas', description: 'Juros atrativos, especialmente em linhas de crédito com garantia.' },
        { title: 'Aquisição de Ativos', description: 'Aumente o patrimônio da sua empresa adquirindo bens de alto valor de forma planejada.' },
    ],
     howItWorks: [
        { title: '1. Apresentação do Projeto', description: 'Você nos apresenta o seu projeto de investimento e a necessidade de financiamento.' },
        { title: '2. Análise de Viabilidade', description: 'Nossa equipe analisa a viabilidade do projeto e o perfil de crédito da sua empresa.' },
        { title: '3. Definição das Condições', description: 'Estruturamos uma proposta com as melhores condições de prazo, taxas e garantias.' },
        { title: '4. Liberação e Execução', description: 'Com o contrato assinado, os recursos são liberados para a execução do seu projeto.' },
    ],
    faqs: [
        { question: 'Preciso de um plano de negócios para solicitar?', answer: 'Sim, para financiamentos de projetos, ter um plano de negócios bem estruturado é fundamental para a análise e aprovação do crédito.' },
        { question: 'Quais garantias podem ser solicitadas?', answer: 'As garantias mais comuns são imóveis, equipamentos, veículos ou o aval dos sócios da empresa.' },
    ]
  },
  
  'adiantamento-recebiveis': {
    id: 'adiantamento-recebiveis',
    category: 'para-seu-negocio',
    title: 'Adiantamento de Recebíveis',
    description: 'Antecipe suas vendas a prazo e garanta capital imediato para crescer.',
    image: recebiveisImage,
    headline: 'Transforme suas vendas a prazo em dinheiro imediato no caixa.',
    advantages: [
        { title: 'Capital de Giro Imediato', description: 'Não espere 30, 60 ou 90 dias para receber. Antecipe suas vendas e fortaleça seu caixa.' },
        { title: 'Melhor que Empréstimo', description: 'As taxas de desconto costumam ser mais baixas que as de um empréstimo para capital de giro tradicional.' },
        { title: 'Aumente seu Poder de Negociação', description: 'Com dinheiro em caixa, negocie melhores preços com seus fornecedores para pagamento à vista.' },
        { title: 'Operação Simples', description: 'Processo rápido e 100% digital para antecipar suas notas fiscais ou duplicatas.' },
    ],
    howItWorks: [
        { title: '1. Envio dos Recebíveis', description: 'Você envia as notas fiscais, cheques ou duplicatas das suas vendas a prazo.' },
        { title: '2. Análise e Precificação', description: 'Analisamos os seus recebíveis e aplicamos uma taxa de desconto (deságio).' },
        { title: '3. Formalização', description: 'Você aceita os termos e formaliza a operação de cessão de crédito.' },
        { title: '4. Dinheiro na Conta da Empresa', description: 'O valor líquido (valor total menos a taxa de desconto) é creditado na conta da sua empresa.' },
    ],
    faqs: [
        { question: 'Qual a diferença para a Trava de Maquininha?', answer: 'No adiantamento, você "vende" suas notas fiscais ou duplicatas para a instituição financeira. Na trava, você usa o fluxo futuro de recebimentos da maquininha como garantia para um empréstimo.' },
        { question: 'Qualquer empresa pode antecipar recebíveis?', answer: 'Empresas que vendem produtos ou serviços para outras empresas (B2B) com prazos de pagamento são as mais indicadas, pois geram notas fiscais e duplicatas que podem ser antecipadas.' },
    ]
  },
  'trava-de-maquininha': {
    id: 'trava-de-maquininha',
    category: 'para-seu-negocio',
    title: 'Trava de Maquininha',
    description: 'Utilize seus recebíveis de cartão como garantia e conquiste crédito com mais facilidade.',
    image: maquininhaImage,
    headline: 'Use as vendas da sua maquininha para conseguir crédito com as melhores condições.',
    advantages: [
        { title: 'Aprovação Facilitada', description: 'Seu histórico de vendas no cartão serve como uma forte garantia, facilitando a aprovação do crédito.' },
        { title: 'Taxas de Juros Menores', description: 'Com uma garantia de recebimento, as taxas de juros do empréstimo são mais atrativas.' },
        { title: 'Não Afeta seu Limite', description: 'É uma nova linha de crédito que não depende do limite dos bancos tradicionais.' },
        { title: 'Crédito Consciente', description: 'O valor do empréstimo é baseado na sua capacidade real de faturamento, evitando endividamento excessivo.' },
    ],
    howItWorks: [
        { title: '1. Análise de Faturamento', description: 'Analisamos o histórico de vendas da sua maquininha de cartão de crédito.' },
        { title: '2. Oferta de Crédito', description: 'Com base no seu faturamento, oferecemos um limite de empréstimo com taxas e prazos.' },
        { title: '3. Trava de Domicílio Bancário', description: 'Você autoriza que uma parte da sua agenda de recebíveis seja direcionada para a quitação do empréstimo.' },
        { title: '4. Liberação do Dinheiro', description: 'O valor do empréstimo é depositado na conta da sua empresa.' },
    ],
    faqs: [
        { question: 'Preciso trocar minha maquininha de cartão?', answer: 'Não! A operação pode ser feita com a sua maquininha atual. O que se altera é o domicílio bancário, para onde o dinheiro das vendas é direcionado.' },
        { question: 'O que acontece se minhas vendas diminuírem?', answer: 'O contrato estabelece um percentual do seu faturamento que será usado para pagar a parcela. Se as vendas caem, o valor retido também pode diminuir, alongando o prazo. As condições exatas variam por contrato.' },
    ]
  },
};