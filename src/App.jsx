/* commit fix */
import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Chatbot from "./components/Chatbot";
import UseCasesPage from "./pages/UseCases";
import ThoughtLeadership from "./pages/ThoughtLeadership";
import UseCaseBrief from "./pages/UseCaseBrief";
import PaperDetail from "./pages/PaperDetail";
import { trackEvent } from "./utils/analytics";

// Experience data with full details
const experiences = [
  {
    date: "Feb 2025 — Present",
    company: "American Express",
    role: "Senior Director of Cyber Security Risk Oversight & AI",
    location: "New York, United States",
    summary:
      "Leading second-line cybersecurity risk governance with unified control taxonomy aligned to NIST 800-53 and ISO 27001.",
    highlights: [
      "Oversaw second-line cybersecurity risk governance, leading the development and enforcement of a unified control taxonomy and mapping framework aligned with NIST 800-53, ISO 27001, and internal enterprise policies",
      "Delivered quarterly board and committee risk memos supported by automated dashboards and thematic insights covering vulnerability aging, AI usage, and EUC governance, enhancing executive decision-making and regulatory defensibility",
      "Executed credible challenge reviews across cloud posture, encryption lifecycle, and LLM integration, ensuring adherence to policy and proactive mitigation of risk acceptance gaps",
      "Led data discovery initiatives to surface control misalignments across SaaS platforms, automating evidence collection and control effectiveness assessments via ServiceNow GRC and Power BI",
      "Built an AI governance playbook for LLM tools (e.g., Copilot), embedding prompt injection safeguards, access controls, and classification rules into the policy stack",
      "Partnered with tech and risk teams to backtest the Risk Acceptance Framework, streamlining exception handling and improving audit readiness across SOX and OCC regulatory expectations",
      "Co-led the enterprise migration off Archer, ensuring continuity of policy mapping, exception workflows, and validation standards in the target GRC platform",
    ],
    tags: ["Risk Governance", "AI/LLM Security", "NIST 800-53", "ServiceNow GRC", "Board Reporting"],
    metrics: { teamSize: 6, applicationsSecured: 50, complianceScore: 98 },
  },
  {
    date: "Feb 2025 — Present",
    company: "Independent Consultant",
    role: "Fractional CISO | Cybersecurity Advisor",
    location: "Remote",
    summary:
      "Advising startups and growth-stage companies as a fractional CISO, helping them build and scale cybersecurity programs that align with real business risk.",
    highlights: [
      "Executive-level security strategy, board reporting, and risk governance",
      "Threat modeling, incident response, and security architecture design",
      "Cloud security (AWS, GCP), Zero Trust implementation, and vendor risk management",
      "Readiness for SOC2, ISO 27001, NIST CSF, and financial compliance frameworks",
      "Coaching internal teams and bridging the gap between tech and leadership",
      "Helping early-stage organizations transition from reactive to proactive security postures",
    ],
    tags: ["Board Advisory", "Zero Trust", "SOC2", "Startup Security", "vCISO"],
    metrics: { clientsServed: 8, frameworksImplemented: 4, avgEngagement: "6mo" },
  },
  {
    date: "Nov 2020 — Jan 2025",
    company: "Capital One",
    role: "Director of Security Engineering and Operations",
    location: "New York",
    summary:
      "Pioneered the integration of Splunk SIEM and MITRE ATT&CK within Capital One, driving significant technology adoption and security improvements.",
    highlights: [
      "Pioneered the integration of Splunk SIEM and MITRE ATT&CK within Capital One, driving a 40% increase in technology adoption, ensuring security measures aligned with ISO 27001 and NIST",
      "Transformed application lifecycle management by overseeing the security posture of over 70 global applications, reducing exceptions through rigorous vulnerability management using Tenable.io, Qualys, and CrowdStrike",
      "Architected a DevSecOps-driven application onboarding process, resulting in $3 million in cost savings, a 25% productivity surge, and enhanced collaboration across security, development, and operations teams",
      "Delivered strategic cyber threat briefings to executive leadership, offering actionable recommendations that fortified the organization's resilience against emerging threats",
      "Chaired cross-functional security forums, fostering collaboration between business and technology leaders to unify security strategies and promote a culture of shared responsibility",
      "Demonstrated a proactive approach to data protection by establishing a dedicated threat modeling team, underscoring commitment to advancing the organization's security posture",
      "Cultivated a high-performance security team, driving productivity and professional development while instilling a culture of continuous improvement",
      "Developed and implemented a comprehensive threat modeling framework, ensuring all Capital One applications and technologies were rigorously evaluated against potential security threats",
    ],
    tags: ["SIEM", "MITRE ATT&CK", "DevSecOps", "Threat Modeling", "Vulnerability Management"],
    metrics: { costSavings: "$3M", productivityGain: "25%", appsSecured: 70 },
  },
  {
    date: "May 2019 — Oct 2020",
    company: "Norges Bank Investment Management",
    role: "Senior Manager of Cyber Security",
    location: "Greater New York City Area",
    summary:
      "Directed security operations for one of the world's largest sovereign wealth funds, implementing SOAR solutions and advanced threat detection capabilities.",
    highlights: [
      "Directed the implementation of SOAR solutions with Demisto, achieving a 30% improvement in incident response times and a 60% enhancement in threat detection capabilities",
      "Enhanced operational efficiency by 15% through the delivery of impactful security metrics, leading to a 20% reduction in SLAs and improved alignment between security operations and business objectives",
      "Deployed CrowdStrike Falcon EDR and conducted comprehensive risk assessments, developing NIST-aligned playbooks, policies, and procedures that resulted in a 25% improvement in incident response effectiveness",
      "Introduced a quantitative risk scoring system, improving risk prioritization accuracy by 25% and enabling more informed decision-making in risk mitigation strategies",
      "Led dynamic threat modeling sessions, ensuring real-time assessments of risks and vulnerabilities, and reducing high-risk exposure by 30%",
    ],
    tags: ["SOAR", "EDR", "Risk Quantification", "NIST", "Sovereign Wealth"],
    metrics: { irImprovement: "30%", threatDetection: "60%", riskReduction: "30%" },
  },
  {
    date: "Mar 2019 — Oct 2020",
    company: "U.S. Department of Veterans Affairs",
    role: "Senior Manager of Cyber Security",
    location: "United States",
    summary:
      "Led cybersecurity initiatives for the VA, achieving 100% audit success rate and implementing advanced security controls across the organization.",
    highlights: [
      "Achieved a 100% audit success rate in Governance, Risk, and Compliance (GRC) by implementing RSA Archer, NIST, CIS, FEDRAMP, and PCI-DSS controls, elevating the organization's security compliance to a 95% rating",
      "Led the deployment of Palo Alto Networks' Next-Gen Firewalls and CrowdStrike Falcon, reducing data loss incidents by 55% and enhancing the organization's security posture",
      "Implemented agile methodologies in risk management, significantly reducing vulnerabilities with ThreatQ and Qualys, and ensuring a more responsive and adaptive security framework",
      "Enhanced proactive threat detection and response by incorporating MITRE ATT&CK into the security strategy, positioning the organization to better anticipate and mitigate emerging threats",
      "Automated regulatory compliance processes, reducing manual workload by 30% and ensuring continuous alignment with evolving regulatory requirements",
      "Focused on proactive data protection measures, actively monitoring and addressing vulnerabilities and threats to maintain a robust security environment",
    ],
    tags: ["FEDRAMP", "GRC", "Palo Alto", "Government", "Compliance"],
    metrics: { auditSuccess: "100%", dataLossReduction: "55%", complianceRating: "95%" },
  },
  {
    date: "Nov 2017 — May 2019",
    company: "Prudential Financial",
    role: "Cyber Security Threat Intelligence Analyst",
    location: "Roseland, NJ",
    summary:
      "Enhanced cloud security and reduced incident response times through strategic deployment of EDR solutions and threat intelligence capabilities.",
    highlights: [
      "Enhanced cloud security by 30% through the deployment of CrowdStrike Falcon and Carbon Black CB Defense, improving real-time threat detection across AWS, Azure, and GCP environments",
      "Reduced incident response time by 70% by leveraging open-source technologies like Recorded Future, Wireshark, and Bro IDS, and establishing a proactive threat detection and mitigation strategy",
      "Facilitated strategic threat intelligence exchanges, driving the implementation of advanced mitigation strategies and strengthening the organization's security posture",
      "Developed immersive security training programs, incorporating interactive simulation exercises and gamified elements, resulting in a 20% improvement in employee engagement",
      "Translated complex cybersecurity concepts into accessible insights for executive leadership, ensuring alignment between security initiatives and broader business goals",
    ],
    tags: ["Threat Intelligence", "Cloud Security", "AWS/Azure/GCP", "EDR", "Training"],
    metrics: { cloudSecurityGain: "30%", irTimeReduction: "70%", engagementGain: "20%" },
  },
  {
    date: "Oct 2016 — Nov 2017",
    company: "Realogy Holdings Corp.",
    role: "IT Security Analyst",
    location: "United States",
    summary:
      "Managed security operations including DLP, intrusion detection, and vulnerability management for enterprise IT infrastructure.",
    highlights: [
      "Utilized DLP tools such as Risk Fabric to monitor and track data exfiltration and protect against insider threats",
      "Provided security support for end-users using Carbon Black for testing and problem analysis of server, desktop, and IT infrastructure, including penetration testing and device hardening",
      "Monitored network performance and provided both real-time and historical statistical reports, utilizing Splunk for data recording",
      "Conducted system intrusion detection using Carbon Black and ensured network, system, and data availability and integrity",
      "Monitored and patched firewall network vulnerabilities for clients, servers, and applications using Qualysguard and Nessus",
      "Managed incident response, including logging, reporting, and resolving known threats",
      "Utilized Vectra to identify patterns that characterize malicious behavior within a network and detect lateral movement",
    ],
    tags: ["DLP", "Splunk", "Penetration Testing", "Incident Response", "Vectra"],
    metrics: null,
  },
  {
    date: "Nov 2013 — Sep 2016",
    company: "Bayer Pharmaceuticals",
    role: "Information Security Analyst",
    location: "United States",
    summary:
      "Comprehensive security maintenance and development for pharmaceutical enterprise systems, including forensics and threat hunting.",
    highlights: [
      "Comprehensive understanding of all phases of the Incident Response Life Cycle and Lockheed Martin 'kill chain' methodology",
      "Provided security maintenance and developed bug fixes and patch sets for existing web applications",
      "Designed strategic plans for component development practices to support future projects, including disaster recovery options",
      "Diagnosed and troubleshot UNIX and Windows processing problems, applying solutions to increase company efficiency",
      "Built application platform foundation to support migration from client to server, incorporating security concepts",
      "Forensics experience with Encase, including reporting and detection",
      "Understanding and involvement in threat hunting and threat intelligence gathering using Recorded Future",
    ],
    tags: ["Forensics", "Incident Response", "Kill Chain", "Threat Hunting", "EnCase"],
    metrics: null,
  },
  {
    date: "Mar 2011 — Sep 2013",
    company: "Novartis Pharmaceuticals",
    role: "Security Specialist",
    location: "East Hanover, NJ",
    summary:
      "Managed enterprise security infrastructure including firewalls, network monitoring, and Active Directory policies.",
    highlights: [
      "Managed firewall, LAN/WLAN hardware, network monitoring, and server monitoring both on-site and off-site",
      "Implemented company policies, technical procedures, and standards to preserve the integrity and security of data",
      "Developed and implemented processes and procedures for monitoring and analyzing website performance",
      "Managed PC migration across different ecosystems, including Microsoft, Linux, and MAC",
      "Managed internal Active Directory Group Policies and enforced user security protocols",
      "Managed and set up the implementation of Microsoft Exchange Server, including VNC and OpenVPN configuration",
      "Created QualysGuard and Nessus policies for reporting and monitoring",
    ],
    tags: ["Firewall", "Active Directory", "Network Security", "Exchange", "Qualys"],
    metrics: null,
  },
];

// Skills data for radar chart
const skillsRadarData = [
  { skill: "Risk Management", value: 95, fullMark: 100 },
  { skill: "Cloud Security", value: 90, fullMark: 100 },
  { skill: "Threat Intelligence", value: 92, fullMark: 100 },
  { skill: "Compliance/GRC", value: 95, fullMark: 100 },
  { skill: "AI/ML Security", value: 85, fullMark: 100 },
  { skill: "Leadership", value: 93, fullMark: 100 },
];

// Industry experience pie chart data
const industryData = [
  { name: "Financial Services", value: 9, color: "#00f5d4" },
  { name: "Healthcare/Pharma", value: 5, color: "#9b5de5" },
  { name: "Government", value: 2, color: "#f15bb5" },
  { name: "Real Estate", value: 1, color: "#fee440" },
];

// Comprehensive Tools proficiency data by category
const toolsCategories = {
  "SIEM & Monitoring": [
    { name: "Splunk SIEM", proficiency: 95 },
    { name: "Power BI", proficiency: 88 },
    { name: "PRTG Network Monitor", proficiency: 82 },
    { name: "Wireshark", proficiency: 90 },
    { name: "Bro/Zeek IDS", proficiency: 85 },
  ],
  "EDR & Endpoint": [
    { name: "CrowdStrike Falcon", proficiency: 95 },
    { name: "Carbon Black", proficiency: 90 },
    { name: "Microsoft Defender", proficiency: 85 },
    { name: "Vectra AI", proficiency: 88 },
  ],
  "Vulnerability Management": [
    { name: "Tenable.io", proficiency: 92 },
    { name: "Qualys/QualysGuard", proficiency: 93 },
    { name: "Nessus", proficiency: 90 },
    { name: "NMAP", proficiency: 88 },
    { name: "Kali Linux", proficiency: 85 },
  ],
  "GRC & Compliance": [
    { name: "ServiceNow GRC", proficiency: 92 },
    { name: "RSA Archer", proficiency: 88 },
    { name: "Risk Fabric (DLP)", proficiency: 85 },
    { name: "NIST Frameworks", proficiency: 95 },
    { name: "ISO 27001", proficiency: 93 },
  ],
  "Cloud Platforms": [
    { name: "AWS Security", proficiency: 90 },
    { name: "Azure Security", proficiency: 88 },
    { name: "GCP Security", proficiency: 85 },
    { name: "Cloud Security Posture", proficiency: 90 },
  ],
  "Threat Intelligence": [
    { name: "MITRE ATT&CK", proficiency: 95 },
    { name: "Recorded Future", proficiency: 90 },
    { name: "ThreatQ", proficiency: 88 },
    { name: "Kill Chain Methodology", proficiency: 92 },
  ],
  "Network Security": [
    { name: "Palo Alto NGFW", proficiency: 90 },
    { name: "Cisco Routing/Switching", proficiency: 85 },
    { name: "VPN (OpenVPN)", proficiency: 88 },
    { name: "DNScrypt", proficiency: 82 },
    { name: "Load Balancers", proficiency: 85 },
  ],
  "SOAR & Automation": [
    { name: "Demisto/XSOAR", proficiency: 90 },
    { name: "Playbook Development", proficiency: 92 },
    { name: "Python Scripting", proficiency: 85 },
    { name: "API Integrations", proficiency: 88 },
  ],
  "Forensics & IR": [
    { name: "EnCase", proficiency: 85 },
    { name: "Incident Response", proficiency: 93 },
    { name: "Malware Analysis", proficiency: 85 },
    { name: "Log Analysis", proficiency: 92 },
  ],
  "Identity & Access": [
    { name: "Active Directory", proficiency: 90 },
    { name: "Group Policy", proficiency: 88 },
    { name: "Microsoft Exchange", proficiency: 85 },
    { name: "Zero Trust Architecture", proficiency: 90 },
  ],
};

const skillCategories = [
  {
    icon: "🛡️",
    title: "Security Frameworks",
    skills: [
      "NIST 800-53",
      "ISO 27001",
      "NIST CSF",
      "MITRE ATT&CK",
      "CIS Controls",
      "FEDRAMP",
      "PCI-DSS",
      "SOC2 Type II",
      "SOX",
      "OCC",
    ],
  },
  {
    icon: "☁️",
    title: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "Azure",
      "GCP",
      "Zero Trust",
      "Cloud Security",
      "DevSecOps",
      "Container Security",
      "Kubernetes",
    ],
  },
  {
    icon: "🔍",
    title: "Security Operations",
    skills: [
      "Splunk SIEM",
      "CrowdStrike",
      "SOAR",
      "EDR/XDR",
      "Threat Hunting",
      "Incident Response",
      "Vulnerability Management",
      "Carbon Black",
    ],
  },
  {
    icon: "🤖",
    title: "AI & Emerging Tech",
    skills: [
      "AI Governance",
      "LLM Security",
      "Prompt Injection Defense",
      "AI Risk Assessment",
      "Digital Transformation",
      "Copilot Security",
    ],
  },
  {
    icon: "📊",
    title: "GRC & Compliance",
    skills: [
      "ServiceNow GRC",
      "RSA Archer",
      "Risk Assessment",
      "Audit Management",
      "Policy Development",
      "Regulatory Compliance",
      "Power BI",
    ],
  },
  {
    icon: "👥",
    title: "Leadership",
    skills: [
      "Board Reporting",
      "Team Building",
      "Strategic Planning",
      "Executive Communication",
      "Vendor Management",
      "Budget Oversight",
      "Cross-functional Leadership",
    ],
  },
];

const certifications = [
  {
    abbr: "CISSP",
    name: "Certified Information Systems Security Professional",
    description: "Premier cybersecurity certification validating expertise across 8 security domains",
    org: "(ISC)²",
  },
  {
    abbr: "CISM",
    name: "Certified Information Security Manager",
    description: "Management-focused certification for information security governance",
    org: "ISACA",
  },
  {
    abbr: "CRISC",
    name: "Certified in Risk and Information Systems Control",
    description: "Expertise in enterprise IT risk management and control implementation",
    org: "ISACA",
  },
  {
    abbr: "CCSP",
    name: "Certified Cloud Security Professional",
    description: "Advanced cloud security architecture, design, and operations",
    org: "(ISC)²",
  },
  {
    abbr: "AWS",
    name: "AWS Solutions Architect Professional",
    description: "Expert-level AWS cloud architecture and security design",
    org: "Amazon",
  },
  {
    abbr: "CEH",
    name: "Certified Ethical Hacker",
    description: "Offensive security techniques and penetration testing methodologies",
    org: "EC-Council",
  },
  {
    abbr: "SEC+",
    name: "CompTIA Security+",
    description: "Foundational cybersecurity skills and best practices",
    org: "CompTIA",
  },
  {
    abbr: "PMP",
    name: "Google Project Management",
    description: "Agile and traditional project management methodologies",
    org: "Google",
  },
];

const education = [
  {
    year: "2025",
    degree: "Digital Innovation & Strategy",
    school: "Harvard Business School Online",
    details: "Digital Transformation, AI Strategy, Platform Business Models",
    type: "Executive Education",
  },
  {
    year: "2019 — 2020",
    degree: "Master's Degree, Cyber Security",
    school: "University of Maryland University College",
    details: "Advanced cybersecurity theory, risk management, and security architecture",
    type: "Graduate",
  },
  {
    year: "2015 — 2018",
    degree: "Bachelor's Degree, Cyber Security",
    school: "University of Maryland University College",
    details: "Comprehensive cybersecurity foundations, networking, and ethical hacking",
    type: "Undergraduate",
  },
  {
    year: "2010 — 2014",
    degree: "A.A.S., Computer Science",
    school: "County College of Morris",
    details: "Programming fundamentals, systems administration, and IT foundations",
    type: "Associate",
  },
];

// Particle component
const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
      container.appendChild(particle);
    }
  }, []);

  return <div className="particles" ref={particlesRef}></div>;
};

// Navigation component
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNavClick = (e, targetId) => {
    if (!isHome) return; // Let Link handle navigation if not on home
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 100;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav>
      <Link to="/" className="logo">MC</Link>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {isHome ? (
          <>
            <li><a href="#about" onClick={(e) => handleNavClick(e, "#about")}>About</a></li>
            <li><a href="#experience" onClick={(e) => handleNavClick(e, "#experience")}>Experience</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, "#skills")}>Skills</a></li>
            <li><a href="#certifications" onClick={(e) => handleNavClick(e, "#certifications")}>Certifications</a></li>
            <li><a href="#education" onClick={(e) => handleNavClick(e, "#education")}>Education</a></li>
            <li><Link to="/use-cases" className="nav-highlight">Use Cases</Link></li>
            <li><Link to="/thought-leadership">Papers</Link></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/use-cases" className="nav-highlight">Use Cases</Link></li>
            <li><Link to="/thought-leadership">Papers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </>
        )}
      </ul>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

// Hero section with animated counter
const AnimatedNumber = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Hero = () => (
  <section className="hero" id="about">
    <div className="hero-content">
      <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        <span className="hero-badge-text">Available for Opportunities</span>
      </div>
      <h1 className="hero-title">
        Michael
        <br />
        <span className="hero-title-gradient">Czarnecki</span>
      </h1>
      <p className="hero-subtitle">
        Senior Director of Cybersecurity & Risk at American Express. Fractional
        CISO for startups. Building secure futures through threat-informed
        defense, AI governance, and strategic risk management.
      </p>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-number"><AnimatedNumber target={15} suffix="+" /></div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat">
          <div className="stat-number"><AnimatedNumber target={70} suffix="+" /></div>
          <div className="stat-label">Global Apps Secured</div>
        </div>
        <div className="stat">
          <div className="stat-number">$<AnimatedNumber target={3} suffix="M+" /></div>
          <div className="stat-label">Cost Savings Driven</div>
        </div>
        <div className="stat">
          <div className="stat-number"><AnimatedNumber target={9} /></div>
          <div className="stat-label">Industry Certs</div>
        </div>
      </div>
      <div className="hero-actions">
        <a href="/Michael_Czarnecki_Resume.pdf" download className="resume-download-btn" onClick={() => trackEvent("resume_download_click")}>
          <span className="resume-icon">📄</span>
          Download Resume
        </a>
        <a href="https://calendly.com/mikeczarnecki/new-meeting-1" target="_blank" rel="noopener noreferrer" className="hero-book-btn" onClick={() => trackEvent("book_call_click", { placement: "hero" })}>
          <span className="book-icon">📅</span>
          Book a Call
        </a>
      </div>
    </div>
  </section>
);

// Expandable Experience Card
const ExperienceCard = ({ exp, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`experience-card ${isExpanded ? "expanded" : ""}`}>
      <div className="experience-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="experience-card-left">
          <div className="experience-date">{exp.date}</div>
          <div className="experience-location">{exp.location}</div>
        </div>
        <div className="experience-card-main">
          <h3 className="experience-company">{exp.company}</h3>
          <div className="experience-role">{exp.role}</div>
          <p className="experience-summary">{exp.summary}</p>
          <div className="experience-tags">
            {exp.tags.map((tag, i) => (
              <span className="tag" key={i}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="experience-expand-icon">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </div>
      
      <div className={`experience-card-details ${isExpanded ? "show" : ""}`}>
        {exp.metrics && (
          <div className="experience-metrics">
            {Object.entries(exp.metrics).map(([key, value], i) => (
              <div className="metric-item" key={i}>
                <div className="metric-value">{value}</div>
                <div className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        )}
        <div className="experience-highlights">
          <h4>Key Achievements</h4>
          <ul>
            {exp.highlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Experience section
const Experience = () => (
  <section id="experience">
    <div className="section-header">
      <div className="section-label">Career Journey</div>
      <h2 className="section-title">Professional Experience</h2>
      <p className="section-description">
        Click on any role to expand and see detailed achievements, metrics, and impact.
      </p>
    </div>
    <div className="experience-timeline">
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} exp={exp} index={index} />
      ))}
    </div>
  </section>
);

// Interactive Tools Explorer Component
const ToolsExplorer = () => {
  const categories = Object.keys(toolsCategories);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [viewMode, setViewMode] = useState("chart"); // "chart" or "grid"

  const totalTools = Object.values(toolsCategories).flat().length;

  return (
    <div className="tools-explorer">
      <div className="tools-explorer-header">
        <div className="tools-stats">
          <span className="tools-count">{totalTools}</span>
          <span className="tools-count-label">Tools & Technologies</span>
        </div>
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === "chart" ? "active" : ""}`}
            onClick={() => setViewMode("chart")}
          >
            📊 Chart
          </button>
          <button 
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            📋 Grid
          </button>
        </div>
      </div>

      <div className="tools-categories-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
            <span className="tab-count">{toolsCategories[category].length}</span>
          </button>
        ))}
      </div>

      <div className="tools-content">
        {viewMode === "chart" ? (
          <div className="tools-chart-container">
            <ResponsiveContainer width="100%" height={toolsCategories[activeCategory].length * 50 + 40}>
              <BarChart 
                data={toolsCategories[activeCategory]} 
                layout="vertical" 
                margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  tick={{ fill: "#6a6a80", fontSize: 11 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: "#a0a0b8", fontSize: 12 }}
                  width={140}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: "#12121a", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px"
                  }}
                  formatter={(value) => [`${value}%`, "Proficiency"]}
                />
                <Bar 
                  dataKey="proficiency" 
                  fill="url(#barGradient)" 
                  radius={[0, 6, 6, 0]}
                  animationDuration={800}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00f5d4" />
                    <stop offset="100%" stopColor="#9b5de5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="tools-grid-view">
            {toolsCategories[activeCategory].map((tool, index) => (
              <div key={index} className="tool-grid-item">
                <div className="tool-grid-name">{tool.name}</div>
                <div className="tool-grid-bar-container">
                  <div 
                    className="tool-grid-bar" 
                    style={{ width: `${tool.proficiency}%` }}
                  ></div>
                </div>
                <div className="tool-grid-value">{tool.proficiency}%</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tools-all-categories">
        <h4>All Categories Overview</h4>
        <div className="category-pills">
          {categories.map((category) => (
            <div 
              key={category} 
              className={`category-pill ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="pill-name">{category}</span>
              <span className="pill-bar">
                <span 
                  className="pill-bar-fill" 
                  style={{ 
                    width: `${(toolsCategories[category].reduce((a, b) => a + b.proficiency, 0) / toolsCategories[category].length)}%` 
                  }}
                ></span>
              </span>
              <span className="pill-avg">
                {Math.round(toolsCategories[category].reduce((a, b) => a + b.proficiency, 0) / toolsCategories[category].length)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Skills section with charts
const Skills = () => (
  <section id="skills">
    <div className="section-header">
      <div className="section-label">Technical Expertise</div>
      <h2 className="section-title">Skills & Capabilities</h2>
    </div>

    <div className="skills-charts-grid">
      {/* Radar Chart */}
      <div className="chart-card">
        <h3 className="chart-title">Core Competencies</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={skillsRadarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fill: "#a0a0b8", fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "#6a6a80", fontSize: 10 }}
            />
            <Radar
              name="Proficiency"
              dataKey="value"
              stroke="#00f5d4"
              fill="url(#radarGradient)"
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f5d4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#9b5de5" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-card">
        <h3 className="chart-title">Industry Experience (Years)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={industryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}yr`}
              labelLine={{ stroke: "#6a6a80" }}
            >
              {industryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: "#12121a", 
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Interactive Tools Explorer */}
    <div className="tools-section">
      <h3 className="tools-section-title">Tools & Technologies Proficiency</h3>
      <p className="tools-section-subtitle">Click categories to explore my hands-on experience with security tools</p>
      <ToolsExplorer />
    </div>

    <div className="skills-container">
      {skillCategories.map((category, index) => (
        <div className="skill-category" key={index}>
          <h3 className="skill-category-title">
            <span className="skill-icon">{category.icon}</span>
            {category.title}
          </h3>
          <div className="skill-list">
            {category.skills.map((skill, i) => (
              <span className="skill-tag" key={i}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Flip Card Certification
const CertFlipCard = ({ cert }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`cert-flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="cert-flip-card-inner">
        <div className="cert-flip-card-front">
          <div className="cert-badge">{cert.abbr}</div>
          <div className="cert-name">{cert.name}</div>
          <div className="cert-flip-hint">Click to see details</div>
        </div>
        <div className="cert-flip-card-back">
          <div className="cert-org">{cert.org}</div>
          <div className="cert-description">{cert.description}</div>
          <div className="cert-flip-hint">Click to flip back</div>
        </div>
      </div>
    </div>
  );
};

// Certifications section
const Certifications = () => (
  <section id="certifications">
    <div className="section-header">
      <div className="section-label">Professional Credentials</div>
      <h2 className="section-title">Certifications</h2>
      <p className="section-description">
        Click on any certification to flip and see more details.
      </p>
    </div>
    <div className="certs-grid">
      {certifications.map((cert, index) => (
        <CertFlipCard key={index} cert={cert} />
      ))}
    </div>
  </section>
);

// Education Timeline
const Education = () => (
  <section id="education">
    <div className="section-header">
      <div className="section-label">Academic Background</div>
      <h2 className="section-title">Education</h2>
    </div>
    <div className="education-timeline">
      {education.map((edu, index) => (
        <div className="education-card" key={index}>
          <div className="education-type-badge">{edu.type}</div>
          <div className="education-year">{edu.year}</div>
          <h3 className="education-degree">{edu.degree}</h3>
          <p className="education-school">{edu.school}</p>
          {edu.details && (
            <p className="education-details">{edu.details}</p>
          )}
        </div>
      ))}
    </div>
  </section>
);

// Contact section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    challenge: "",
    problemArea: "",
    urgency: "",
    timeframe: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      trackEvent("lead_form_submit", { companySize: formData.companySize, timeframe: formData.timeframe, problemArea: formData.problemArea, urgency: formData.urgency });
      setFormMessage(data.message);
      setFormData({ name: "", email: "", company: "", companySize: "", challenge: "", problemArea: "", urgency: "", timeframe: "" });
    } catch (error) {
      setFormMessage(error.message || "Unable to submit right now. Please email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <div className="contact-info">
          <h2 className="contact-title">
            Let's <span className="contact-title-gradient">Connect</span>
          </h2>
          <p className="contact-description">
            Whether you're looking for a fractional CISO, need cybersecurity
            advisory, or want to discuss the future of security leadership — I'd
            love to hear from you.
          </p>
          <div className="contact-links">
            <a href="mailto:mczarneckiitsearch@gmail.com" className="contact-link">
              <span className="contact-link-icon">✉️</span>
              mczarneckiitsearch@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/michaelczarnecki-421849ab"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">💼</span>
              LinkedIn Profile
            </a>
            <span className="contact-link">
              <span className="contact-link-icon">📍</span>
              New York City Metropolitan Area
            </span>
          </div>
        </div>

        <div className="booking-card">
          <div className="booking-icon">📅</div>
          <h3 className="booking-title">Book Time With Me</h3>
          <p className="booking-description">
            Ready to discuss your security challenges? Schedule a meeting directly on my calendar.
          </p>
          <a
            href="https://calendly.com/mikeczarnecki/new-meeting-1"
            target="_blank"
            rel="noopener noreferrer"
            className="booking-button"
            onClick={() => trackEvent("book_call_click", { placement: "contact_card" })}
          >
            <span className="booking-button-icon">🗓️</span>
            Schedule a Meeting
          </a>
          <p className="booking-note">30-minute intro call • No commitment</p>
        </div>
      </div>

      <div className="lead-form-wrapper">
        <h3 className="lead-form-title">Work With Mike</h3>
        <p className="lead-form-subtitle">Share your goals and get a tailored 30/60/90 day security roadmap conversation.</p>
        <form className="lead-form" onSubmit={handleLeadSubmit}>
          <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Your Name *" required />
          <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Work Email *" required />
          <input value={formData.company} onChange={(e) => updateField("company", e.target.value)} placeholder="Company" />
          <select value={formData.companySize} onChange={(e) => updateField("companySize", e.target.value)}>
            <option value="">Company Size</option>
            <option value="1-50">1-50</option>
            <option value="51-200">51-200</option>
            <option value="201-1000">201-1000</option>
            <option value="1000+">1000+</option>
          </select>
          <select value={formData.problemArea} onChange={(e) => updateField("problemArea", e.target.value)}>
            <option value="">Primary Problem Area</option>
            <option value="AI Governance">AI Governance</option>
            <option value="Cloud Security">Cloud Security</option>
            <option value="Risk & Compliance">Risk & Compliance</option>
            <option value="Incident Response">Incident Response</option>
            <option value="Security Program Strategy">Security Program Strategy</option>
          </select>
          <select value={formData.urgency} onChange={(e) => updateField("urgency", e.target.value)}>
            <option value="">Urgency</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select value={formData.timeframe} onChange={(e) => updateField("timeframe", e.target.value)}>
            <option value="">Engagement Timeframe</option>
            <option value="Immediate">Immediate</option>
            <option value="30 days">Within 30 days</option>
            <option value="Quarter">This quarter</option>
            <option value="Exploring">Just exploring</option>
          </select>
          <textarea value={formData.challenge} onChange={(e) => updateField("challenge", e.target.value)} placeholder="Biggest challenge you want to solve *" rows={4} required />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Request"}</button>
          {formMessage && <p className="lead-form-message">{formMessage}</p>}
        </form>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <div className="contact-page">
    <Contact />
  </div>
);

// Footer
const Footer = () => (
  <footer>
    <div className="footer-text">
      © 2025 Michael Czarnecki. Built with passion for security.
    </div>
    <div className="footer-links">
      <a
        href="https://www.linkedin.com/in/michaelczarnecki-421849ab"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a href="mailto:mczarneckiitsearch@gmail.com">Email</a>
    </div>
  </footer>
);

// Credibility Strip (Roadmap #5)
const CredibilityStrip = () => (
  <section className="credibility-strip">
    <div className="credibility-strip-inner">
      <div className="credibility-header">
        <span className="credibility-kicker">Trusted Leadership Impact</span>
        <h3>Proven outcomes across global enterprises.</h3>
      </div>

      <div className="credibility-proof-grid">
        <div className="credibility-proof-card">
          <div className="proof-metric">$3M+</div>
          <div className="proof-text">Security savings from program modernization.</div>
        </div>
        <div className="credibility-proof-card">
          <div className="proof-metric">70% faster</div>
          <div className="proof-text">Incident response cycle improvements.</div>
        </div>
        <div className="credibility-proof-card">
          <div className="proof-metric">98%</div>
          <div className="proof-text">Critical control effectiveness in target programs.</div>
        </div>
      </div>

      <div className="credibility-logos-inline">
        <span>American Express</span>
        <span>Capital One</span>
        <span>Norges Bank</span>
        <span>U.S. Department of Veterans Affairs</span>
      </div>

      <div className="credibility-mini-testimonials">
        <blockquote>“Calm under pressure and always business-focused.”</blockquote>
        <blockquote>“Turns complex security risk into clear executive decisions.”</blockquote>
      </div>

      <div className="credibility-actions">
        <Link
          to="/use-cases"
          className="credibility-action-btn"
          onClick={() => trackEvent("credibility_strip_click", { action: "view_use_cases" })}
        >
          View Outcome Proof
        </Link>
        <a
          href="https://calendly.com/mikeczarnecki/new-meeting-1"
          target="_blank"
          rel="noopener noreferrer"
          className="credibility-action-btn secondary"
          onClick={() => trackEvent("credibility_strip_click", { action: "book_call" })}
        >
          Book Strategy Call
        </a>
      </div>
    </div>
  </section>
);

// Outcome Highlights Strip
const OutcomeHighlights = () => (
  <section className="outcome-strip">
    <div className="outcome-item">
      <span className="outcome-value">$3M+</span>
      <span className="outcome-label">Security program savings delivered</span>
    </div>
    <div className="outcome-item">
      <span className="outcome-value">70%</span>
      <span className="outcome-label">Incident response time reduction</span>
    </div>
    <div className="outcome-item">
      <span className="outcome-value">98%</span>
      <span className="outcome-label">Critical control effectiveness</span>
    </div>
  </section>
);

// Company Logos Section
const CompanyLogos = () => (
  <section className="company-logos-section">
    <div className="company-logos-header">
      <span className="section-label">// Experience With</span>
      <h2 className="section-title">Trusted by <span className="title-gradient">Industry Leaders</span></h2>
    </div>
    <div className="company-logos-grid">
      <div className="company-logo-item">
        <div className="company-logo-icon">💳</div>
        <span className="company-logo-name">American Express</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">🏦</div>
        <span className="company-logo-name">Capital One</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">🏛️</div>
        <span className="company-logo-name">Norges Bank</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">🇺🇸</div>
        <span className="company-logo-name">U.S. Dept of VA</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">🏢</div>
        <span className="company-logo-name">Prudential</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">🏠</div>
        <span className="company-logo-name">Realogy</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">💊</div>
        <span className="company-logo-name">Bayer</span>
      </div>
      <div className="company-logo-item">
        <div className="company-logo-icon">💉</div>
        <span className="company-logo-name">Novartis</span>
      </div>
    </div>
  </section>
);

// Career Timeline
const CareerTimeline = () => {
  const milestones = [
    { year: "2010", title: "Started in IT", description: "Began career as IT/Security practitioner", icon: "🚀" },
    { year: "2015", title: "Security Analyst", description: "Focused on threat detection & response", icon: "🔍" },
    { year: "2017", title: "Senior Analyst", description: "Led cloud security initiatives", icon: "☁️" },
    { year: "2019", title: "Manager", description: "Built SOAR & GRC programs", icon: "📊" },
    { year: "2020", title: "Director", description: "Enterprise security leadership", icon: "🎯" },
    { year: "2025", title: "Senior Director", description: "AI governance & strategic risk", icon: "🤖" },
  ];

  return (
    <section className="career-timeline-section">
      <div className="section-header">
        <span className="section-label">// Career Journey</span>
        <h2 className="section-title">From <span className="title-gradient">Practitioner to Executive</span></h2>
      </div>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        <div className="timeline-items">
          {milestones.map((milestone, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot">
                <span className="timeline-icon">{milestone.icon}</span>
              </div>
              <div className="timeline-content">
                <span className="timeline-year">{milestone.year}</span>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Mike's ability to translate complex security risks into business terms is unmatched. He makes the board understand cyber risk without dumbing it down.",
      author: "Former Colleague",
      role: "VP of Technology",
      company: "Capital One",
    },
    {
      quote: "When Mike steps in, the situation gets calmer and smarter. He has this rare ability to reduce noise and drive towards solutions during high-pressure incidents.",
      author: "Team Member",
      role: "Security Engineer",
      company: "American Express",
    },
    {
      quote: "A coach, not a critic. Mike builds teams that trust him because he invests in their growth while holding everyone to high standards.",
      author: "Direct Report",
      role: "Senior Analyst",
      company: "Norges Bank",
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-header">
        <span className="section-label">// What People Say</span>
        <h2 className="section-title">Trusted by <span className="title-gradient">Teams & Leaders</span></h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-quote-icon">"</div>
            <p className="testimonial-quote">{testimonial.quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonial.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="testimonial-info">
                <span className="testimonial-name">{testimonial.author}</span>
                <span className="testimonial-role">{testimonial.role}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Home Page Component (wraps all home sections)
const HomePage = () => (
  <>
    <Hero />
    <CredibilityStrip />
    <OutcomeHighlights />
    <CompanyLogos />
    <Experience />
    <CareerTimeline />
    <Skills />
    <Certifications />
    <Education />
    <Testimonials />
    <Contact />
  </>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Main App with Routing
export default function App() {
  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-gradient"></div>
      <Particles />
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/use-cases/:id/brief" element={<UseCaseBrief />} />
        <Route path="/thought-leadership" element={<ThoughtLeadership />} />
        <Route path="/thought-leadership/:id" element={<PaperDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <Chatbot />
    </>
  );
}
