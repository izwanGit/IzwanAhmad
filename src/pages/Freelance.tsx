import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, Bot, Settings2, CheckCircle2, Globe } from 'lucide-react';

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

const clientProjects = [
  {
    title: "O-Iqra",
    domain: "Islamic EdTech & Learning Platform",
    category: "EdTech System",
    image: "/images/oiqra-laptop.png",
  },
  {
    title: "Mont Switzerland",
    domain: "montswitzerland.com",
    category: "Corporate & E-Commerce",
    image: "/images/montswitzerland-laptop.jpg",
  },
  {
    title: "Kuihlicious",
    domain: "Digital Food Ordering Platform",
    category: "Full-Stack Web System",
    image: "/images/kuehlicious-laptop.jpg",
  },
];

const Freelance = () => {
  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 mb-24">
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

        {/* Client Website Laptop Showcase */}
        <section className="pt-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-[13px] font-extrabold uppercase tracking-widest text-accent mb-3 flex items-center justify-center gap-2">
              <Globe size={14} />
              Client Showcase
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Client Websites & Platforms
            </h2>
            <p className="text-muted-foreground text-base">
              Custom engineered web applications shipped and live for businesses and institutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 items-start justify-items-center">
            {clientProjects.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center group w-full"
              >
                {/* Laptop Frame */}
                <div className="w-full max-w-[340px] sm:max-w-[380px]">
                  {/* Laptop Screen */}
                  <div className="w-full bg-[#1E1E24] rounded-t-2xl p-2 pt-2.5 shadow-2xl relative border border-slate-700/60">
                    {/* Camera Dot */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-blue-400" />
                    </div>
                    {/* Screen Image */}
                    <div className="w-full aspect-[16/10] bg-slate-900 rounded-lg overflow-hidden relative group">
                      <img
                        src={client.image}
                        alt={client.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Laptop Base */}
                  <div className="w-[106%] -ml-[3%] h-3.5 bg-gradient-to-b from-[#2C2D35] to-[#1A1B22] rounded-b-xl shadow-xl relative border-t border-slate-600/40 flex justify-center items-start">
                    <div className="w-14 h-1 bg-[#14151B] rounded-b-md border-x border-b border-slate-700/50" />
                  </div>
                </div>

                {/* Client Label */}
                <div className="text-center mt-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1">{client.category}</div>
                  <h3 className="text-xl font-bold text-foreground">{client.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">{client.domain}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Freelance;
