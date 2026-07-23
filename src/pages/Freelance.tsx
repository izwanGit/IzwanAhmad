import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, Bot, Settings2, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: <MonitorPlay size={24} />,
    title: "Custom Web Application",
    description: "End-to-end modern web applications built for speed, scalability, and premium user experience.",
    features: [
      "React / Next.js / Vite architecture",
      "Responsive, mobile-first design",
      "Custom UI/UX with framer animations",
      "API integration & database setup",
      "SEO & performance optimization"
    ],
    price: "From RM 2,000"
  },
  {
    icon: <Bot size={24} />,
    title: "AI System Integration",
    description: "Embed intelligent agents, chatbots, or computer vision capabilities directly into your business workflows.",
    features: [
      "OpenAI / Gemini / Claude integration",
      "Custom RAG (Retrieval-Augmented Generation)",
      "Automated document processing",
      "Intelligent conversational agents",
      "Data analysis pipelines"
    ],
    price: "From RM 3,500"
  },
  {
    icon: <Settings2 size={24} />,
    title: "Business Process Automation",
    description: "Eliminate manual data entry and save hours of weekly work with custom cloud pipelines.",
    features: [
      "Power Automate / Zapier workflows",
      "Python / Node.js automation scripts",
      "Automated reporting (Excel/PPTX)",
      "API integrations between SaaS platforms",
      "Data scraping and aggregation"
    ],
    price: "From RM 1,500"
  }
];

const Freelance = () => {
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16 text-center mx-auto"
        >
          <div className="text-[13px] font-extrabold uppercase tracking-widest text-primary mb-4">
            Freelance Services
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Build Something Better.
          </h1>
          <p className="text-xl text-muted-foreground">
            I help Malaysian businesses and individuals transform complex ideas into high-performance digital realities. Focus on what you do best, and let me handle the engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-border rounded-xl p-8 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-tint text-primary flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 size={18} className="text-statusGreen shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-border mt-auto">
                <div className="text-sm font-semibold text-muted-foreground mb-1">Starting at</div>
                <div className="text-2xl font-bold text-primary">{service.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Freelance;
