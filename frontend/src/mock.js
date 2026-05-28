// Mock data for STARTON landing page

export const mockServices = [
  {
    id: 1,
    title: "Brand & Identity",
    description: "We build brands that resonate and endure. From naming to visual systems, we create identities that stand out.",
    features: [
      "Brand naming & storytelling",
      "Visual identity (logo, typography, brand systems)",
      "Brand guidelines & voice",
      "Rebranding & brand evolution"
    ]
  },
  {
    id: 2,
    title: "Web & Digital Experiences",
    description: "High-performance digital products that convert visitors into customers. Beautiful, fast, and built to scale.",
    features: [
      "High-performance websites",
      "Web apps & landing pages",
      "UI/UX design",
      "Frontend & backend development",
      "CMS & scalable architecture"
    ]
  },
  {
    id: 3,
    title: "Business Positioning & Strategy",
    description: "Strategic clarity that drives growth. We position your business to win in competitive markets.",
    features: [
      "Market & competitor analysis",
      "Brand positioning frameworks",
      "Business model strategy",
      "Go-to-market planning",
      "Product & service positioning"
    ]
  },
  {
    id: 4,
    title: "Marketing Systems",
    description: "Data-driven marketing that delivers results. From content to campaigns, we build systems that scale.",
    features: [
      "Digital marketing strategy",
      "Content & social media systems",
      "Performance marketing (ads & funnels)",
      "SEO & growth optimization",
      "Campaign planning & execution"
    ]
  },
  {
    id: 5,
    title: "Sales Enablement",
    description: "Convert interest into revenue. We build sales systems that turn leads into loyal customers.",
    features: [
      "Sales funnel design",
      "CRM setup & automation",
      "Pitch decks & sales assets",
      "Lead nurturing systems",
      "Conversion optimization"
    ]
  },
  {
    id: 6,
    title: "Design & Backend Solutions",
    description: "Powerful technology that works behind the scenes. Custom solutions that give you a competitive edge.",
    features: [
      "Custom design systems",
      "Internal tools & dashboards",
      "Automation & integrations",
      "Scalable backend solutions",
      "Tech consulting & support"
    ]
  }
];

export const mockWorkProcess = [
  {
    id: 1,
    style:"margin-bottom: 86px;",
    title: "Strategy First",
    description: "Every decision is data-driven"
  },
  {
    id: 2,
    title: "Design with Purpose",
    description: "Aesthetics that convert"
  },
  {
    id: 3,
    title: "Built with Systems",
    description: "Systems that grow with you"
  },
  {
    id: 4,
    title: "End-to-End Execution",
    description: "From idea to impact"
  }
];

export const mockClients = [
  "Startups & founders",
  "Growing businesses",
  "Personal brands",
  "Product-based companies",
  "Service-driven organizations"
];

// Mock form submission
export const mockSubmitConsultation = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock consultation form submitted:', formData);
      resolve({ success: true, message: 'Consultation request received!' });
    }, 1000);
  });
};