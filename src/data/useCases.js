export const useCases = [
  {
    id: "ai-governance-playbook",
    title: "Enterprise AI Governance Playbook",
    category: "AI Security",
    company: "American Express",
    year: "2025",
    thumbnail: "🤖",
    summary: "Built an enterprise AI governance operating model that moved LLM adoption from ad-hoc experimentation to controlled, board-visible execution.",
    challenge:
      "Business units were rapidly deploying Copilot and custom LLM use-cases with inconsistent controls, fragmented approval paths, and no unified risk language for legal, compliance, and security. Leadership needed to accelerate AI value without introducing regulatory or data-handling exposure.",
    solution:
      "Established a cross-functional AI Governance Playbook aligned to NIST AI RMF and ISO 42001. Implemented intake tiers, model risk scoring, approved use-pattern libraries, prompt/data handling guardrails, and policy-linked control evidence in ServiceNow GRC. Added executive scorecards for model inventory, residual risk, and exception aging.",
    outcome:
      "Created a repeatable governance path now used across business units. AI deployments moved from one-off approvals to standardized lifecycle controls with clear ownership. Executive and audit stakeholders gained traceability from policy to technical implementation.",
    technologies: ["Microsoft Copilot", "Azure OpenAI", "ServiceNow GRC", "Power BI", "NIST AI RMF", "ISO 42001"],
    metrics: [
      { label: "AI Use-Cases Governed", value: "50+" },
      { label: "Policy-to-Control Coverage", value: "100%" },
      { label: "High-Risk Launch Delays", value: "-65%" },
    ],
    featured: true,
  },
  {
    id: "agentic-ai-security",
    title: "Agentic AI Security Framework",
    category: "AI Security",
    company: "American Express",
    year: "2025",
    thumbnail: "🧠",
    summary: "Defined enterprise controls for autonomous AI agents including action authorization, memory governance, and runtime isolation.",
    challenge:
      "Agentic systems could chain tools, persist state, and take autonomous actions across enterprise systems. Traditional app controls were not designed for reasoning loops, long-lived memory, and delegated decisions with business impact.",
    solution:
      "Designed a tiered agent autonomy model with mandatory guardrails by risk class. Implemented action gating, scoped memory retention, human-in-the-loop checkpoints for privileged operations, and red-team scenarios for prompt/goal hijacking. Evaluated confidential-computing patterns for high-sensitivity model operations.",
    outcome:
      "Provided a production-ready path to deploy agentic workflows without sacrificing governance. Security reviews shifted from subjective debate to measurable control checks tied to autonomy level.",
    technologies: ["Autonomous Agents", "Intel TDX", "AWS Nitro Enclaves", "Policy Engines", "LLM Red Teaming"],
    metrics: [
      { label: "Agent Patterns Standardized", value: "8" },
      { label: "Critical Risk Controls", value: "15+" },
      { label: "Governed Agent Launches", value: "100%" },
    ],
    featured: true,
  },
  {
    id: "ai-auto-misconfig",
    title: "AI-Powered Auto-Remediation System",
    category: "AI Security",
    company: "Capital One",
    year: "2024",
    thumbnail: "🔧",
    summary: "Built an AI-assisted remediation pipeline that converted cloud misconfiguration backlogs into near-real-time policy correction.",
    challenge:
      "Cloud posture findings were high-volume and repetitive, but manual triage/remediation cycles were slow and inconsistent across teams. Critical findings aged beyond acceptable risk tolerance, especially in shared platform services.",
    solution:
      "Implemented a remediation orchestration layer that ranked findings by exploitability + business context, generated safe fix plans, and executed pre-approved remediations with rollback safety. Added approval gates for high-impact changes and learning loops from remediation outcomes.",
    outcome:
      "Reduced backlog pressure and transformed remediation into a continuous control signal. Platform teams gained faster closure while security retained governance and auditability of every automated change.",
    technologies: ["Wiz", "Prisma Cloud", "AWS Lambda", "Terraform", "Python", "Risk Scoring Models"],
    metrics: [
      { label: "Remediation MTTR", value: "14d → 4h" },
      { label: "Auto-Resolved Findings", value: "70%" },
      { label: "Rollback Events", value: "<1%" },
    ],
    featured: true,
  },
  {
    id: "ai-triage-automation",
    title: "Intelligent Security Triage Automation",
    category: "AI Security",
    company: "Capital One",
    year: "2023-2024",
    thumbnail: "📋",
    summary: "Introduced AI-driven SOC triage that prioritized high-fidelity incidents and reduced analyst fatigue at enterprise scale.",
    challenge:
      "The SOC processed massive alert volumes with variable quality. High-priority events were competing with low-value noise, increasing queue depth and delaying incident decisioning.",
    solution:
      "Built a triage engine that fused telemetry context, ATT&CK mappings, asset criticality, and behavioral scoring to produce investigation-ready summaries. Automated first-pass enrichment and evidence packaging to accelerate analyst decisions.",
    outcome:
      "Analysts spent more time on true positives and less on repetitive context gathering. Incident handling consistency improved across shifts with measurable reduction in queue volatility.",
    technologies: ["Splunk", "Python", "MITRE ATT&CK", "SOAR", "NLP", "Risk Prioritization Models"],
    metrics: [
      { label: "Alert Noise Reduction", value: "-62%" },
      { label: "Mean Triage Time", value: "-68%" },
      { label: "High-Severity Detection Lift", value: "+35%" },
    ],
    featured: true,
  },
  {
    id: "ai-threat-intel",
    title: "AI-Enhanced Threat Intelligence Fusion",
    category: "AI Security",
    company: "Capital One",
    year: "2023-2024",
    thumbnail: "🛰️",
    summary: "Built a fusion pipeline that translated raw threat signals into prioritized, business-relevant defense actions.",
    challenge:
      "Threat intelligence inputs were distributed across multiple feeds and analyst workflows, creating lag between indicator discovery and defensive action. Leadership briefings lacked consistent prioritization tied to business exposure.",
    solution:
      "Created a normalized intelligence graph with NLP-based IOC/TTP extraction, ATT&CK correlation, and campaign clustering. Added business-context scoring and auto-generated executive briefing packs linked to active detections and control gaps.",
    outcome:
      "Improved speed and quality of threat-informed decisions. Intelligence shifted from passive reporting to operationally actionable planning for SOC and engineering teams.",
    technologies: ["ThreatQ", "Recorded Future", "NLP Pipelines", "MITRE ATT&CK", "Splunk", "Graph Correlation"],
    metrics: [
      { label: "Briefing Prep Time", value: "3d → 3h" },
      { label: "Campaign Correlation Lift", value: "+40%" },
      { label: "Actionable Intel Ratio", value: "90%" },
    ],
    featured: false,
  },
  {
    id: "ai-vuln-matching",
    title: "AI Vulnerability Exploitability Matching",
    category: "AI Security",
    company: "Capital One",
    year: "2023",
    thumbnail: "🧬",
    summary: "Developed AI-assisted vulnerability prioritization that aligned patch decisions to real exploitability and business criticality.",
    challenge:
      "CVSS-centric patch queues were too broad, causing teams to chase volume instead of true risk. Critical assets required more precise exploitability-driven prioritization.",
    solution:
      "Implemented a matching engine that combined CVE intelligence, exploit telemetry, asset exposure paths, and control compensations. Produced risk-ranked patch waves and exception logic with clear rationale for engineering and governance teams.",
    outcome:
      "Patch programs became risk-first rather than score-first. Critical exposures were addressed faster while reducing low-value remediation churn.",
    technologies: ["NVD", "EPSS", "Python", "Asset CMDB", "Exploit Intelligence", "Risk Models"],
    metrics: [
      { label: "Critical Patch SLA Compliance", value: "+38%" },
      { label: "Low-Value Patch Work", value: "-47%" },
      { label: "Risk Ranking Precision", value: "92%" },
    ],
    featured: false,
  },
  {
    id: "ai-framework-mapping",
    title: "AI Compliance Framework Mapping Engine",
    category: "AI Security",
    company: "American Express",
    year: "2025",
    thumbnail: "🧩",
    summary: "Automated control crosswalks across major frameworks to accelerate audit readiness and reduce governance duplication.",
    challenge:
      "Security and risk teams were repeatedly mapping overlapping controls across NIST, ISO, PCI, OCC, NYDFS, and internal standards through manual spreadsheet workflows.",
    solution:
      "Designed an NLP-assisted control mapping engine with confidence scoring, human validation checkpoints, and reusable control objects. Integrated outputs into GRC workflows and evidence packs for governance committees.",
    outcome:
      "Reduced framework translation friction and improved consistency in control interpretation. Teams spent less time on mapping mechanics and more time on control effectiveness.",
    technologies: ["ServiceNow GRC", "NLP", "Control Taxonomy", "Power BI", "Policy Knowledge Graph"],
    metrics: [
      { label: "Manual Mapping Effort", value: "-72%" },
      { label: "Framework Crosswalk Speed", value: "+4.5x" },
      { label: "Audit Prep Cycle", value: "-45%" },
    ],
    featured: false,
  },
  {
    id: "ai-policy-search",
    title: "Semantic Security Policy Intelligence",
    category: "AI Security",
    company: "American Express",
    year: "2025",
    thumbnail: "📚",
    summary: "Launched semantic policy search to help teams quickly find authoritative security guidance and reduce governance bottlenecks.",
    challenge:
      "Hundreds of policy and procedure artifacts across repositories created inconsistent interpretation and heavy support load for GRC teams.",
    solution:
      "Implemented vector-based policy retrieval with role-aware responses, source citations, and governance-approved answer templates. Added feedback telemetry to continuously improve retrieval quality.",
    outcome:
      "Teams gained rapid access to policy clarity with less dependency on manual GRC support. Governance adoption improved through easier discovery and interpretation.",
    technologies: ["Vector Embeddings", "RAG", "Azure OpenAI", "ServiceNow", "Policy Taxonomy"],
    metrics: [
      { label: "Policy Search Time", value: "-97%" },
      { label: "GRC Support Tickets", value: "-60%" },
      { label: "Policy Retrieval Accuracy", value: "94%" },
    ],
    featured: false,
  },
  {
    id: "devsecops-transformation",
    title: "DevSecOps Transformation Program",
    category: "Security Engineering",
    company: "Capital One",
    year: "2021-2024",
    thumbnail: "⚙️",
    summary: "Scaled a platform-wide DevSecOps model that embedded security into delivery velocity instead of gating it late.",
    challenge:
      "Security reviews were inconsistent and release cycles stalled due to late-stage findings. Engineering teams needed clearer guardrails with faster feedback loops.",
    solution:
      "Introduced policy-as-code security gates, reusable hardened templates, and a security-champions model across delivery teams. Added risk-tiered exception handling to keep releases moving while preserving control intent.",
    outcome:
      "Security shifted from a release blocker to a delivery enabler. Engineering throughput increased while control quality improved and review friction declined.",
    technologies: ["Jenkins", "GitLab CI", "Terraform", "Snyk", "SonarQube", "AWS Security Hub"],
    metrics: [
      { label: "Program Savings", value: "$3M" },
      { label: "Developer Productivity", value: "+25%" },
      { label: "Security Review Time", value: "-90%" },
    ],
    featured: true,
  },
  {
    id: "siem-mitre-integration",
    title: "SIEM & MITRE ATT&CK Integration",
    category: "Threat Detection",
    company: "Capital One",
    year: "2021-2023",
    thumbnail: "🎯",
    summary: "Operationalized ATT&CK-driven detection strategy inside SIEM to improve coverage visibility and response quality.",
    challenge:
      "Detection logic lacked a unified adversary framework, making it difficult to prioritize coverage gaps and measure defensive maturity.",
    solution:
      "Mapped existing detections to ATT&CK techniques, prioritized high-impact gaps, and developed new detections with coverage heatmaps and efficacy dashboards for leadership.",
    outcome:
      "Created a repeatable detection governance model tied to adversary behavior. SOC planning became more strategic and measurable.",
    technologies: ["Splunk ES", "MITRE ATT&CK", "Detection Engineering", "Threat Intel", "Python"],
    metrics: [
      { label: "ATT&CK Coverage", value: "35% → 78%" },
      { label: "MTTD", value: "-60%" },
      { label: "Security Tech Adoption", value: "+40%" },
    ],
    featured: false,
  },
  {
    id: "threat-modeling-framework",
    title: "Enterprise Threat Modeling Framework",
    category: "Risk Management",
    company: "Capital One",
    year: "2022-2024",
    thumbnail: "🛡️",
    summary: "Built a scalable threat-modeling operating model that shifted material risk discovery into design-time decisions.",
    challenge:
      "Architectural risks were often discovered late in delivery, driving costly remediation and inconsistent security quality across application portfolios.",
    solution:
      "Established dedicated threat-modeling specialists, STRIDE/PASTA playbooks, domain-specific threat libraries, and SDLC integration gates with engineering enablement artifacts.",
    outcome:
      "Design-phase risk identification became standardized and measurable. Post-deployment security defect rates declined while engineering confidence increased.",
    technologies: ["STRIDE", "PASTA", "Threat Modeling Tool", "Confluence", "Architecture Reviews"],
    metrics: [
      { label: "Applications Modeled", value: "70+" },
      { label: "Design Risks Mitigated", value: "200+" },
      { label: "Post-Prod Findings", value: "-45%" },
    ],
    featured: false,
  },
  {
    id: "soar-implementation",
    title: "SOAR Platform Implementation",
    category: "Security Operations",
    company: "Norges Bank Investment Management",
    year: "2019-2020",
    thumbnail: "🚀",
    summary: "Delivered SOAR-enabled incident operations for a high-sensitivity sovereign wealth environment.",
    challenge:
      "Manual SOC workflows could not scale with alert growth, and response consistency varied by analyst and shift.",
    solution:
      "Implemented Cortex XSOAR with standardized playbooks, enrichment automation, and integration across SIEM, endpoint, and intel sources. Added control-room reporting for playbook performance and incident quality.",
    outcome:
      "SOC operations moved to repeatable, automation-assisted response with improved predictability and reduced analyst toil.",
    technologies: ["Cortex XSOAR", "Splunk", "EDR", "Threat Intel", "Python Automation"],
    metrics: [
      { label: "Playbooks Automated", value: "25+" },
      { label: "Manual Triage Work", value: "-60%" },
      { label: "Response Consistency", value: "+50%" },
    ],
    featured: false,
  },
  {
    id: "quantitative-risk-scoring",
    title: "Quantitative Cyber Risk Scoring System",
    category: "Risk Management",
    company: "Norges Bank Investment Management",
    year: "2020",
    thumbnail: "📈",
    summary: "Introduced quantitative risk scoring to align cyber exposure with executive investment and prioritization decisions.",
    challenge:
      "Risk conversations were largely qualitative, making it difficult for senior leadership to compare control investments and prioritize remediation portfolios.",
    solution:
      "Developed a scoring model combining control effectiveness, threat likelihood, business impact, and asset criticality into a normalized risk index with portfolio rollups and trend analytics.",
    outcome:
      "Enabled clearer risk trade-off decisions and improved transparency for executive committees. Security investment planning became more data-driven and defendable.",
    technologies: ["FAIR Concepts", "Power BI", "Risk Data Models", "Control Metrics", "Executive Dashboards"],
    metrics: [
      { label: "Risk Prioritization Accuracy", value: "+42%" },
      { label: "Executive Decision Latency", value: "-55%" },
      { label: "Portfolio Visibility", value: "100%" },
    ],
    featured: false,
  },
  {
    id: "fedramp-compliance",
    title: "FedRAMP & GRC Compliance Program",
    category: "Compliance",
    company: "U.S. Department of Veterans Affairs",
    year: "2018-2019",
    thumbnail: "🏛️",
    summary: "Led a federal-grade compliance modernization program that tightened control evidence quality and reduced audit friction.",
    challenge:
      "Control documentation and evidence collection were fragmented across teams, creating high audit overhead and inconsistent compliance posture visibility.",
    solution:
      "Implemented a centralized compliance operating rhythm with standardized control narratives, evidence cadences, and accountability owners mapped to NIST/FedRAMP requirements.",
    outcome:
      "Audit preparation became faster and more predictable, with improved evidence integrity and clearer risk visibility for leadership.",
    technologies: ["NIST 800-53", "FedRAMP", "GRC Workflows", "Control Testing", "Audit Evidence Management"],
    metrics: [
      { label: "Audit Success Rate", value: "100%" },
      { label: "Evidence Prep Time", value: "-58%" },
      { label: "Control Gaps Open >90 Days", value: "-61%" },
    ],
    featured: false,
  },
  {
    id: "cloud-security-transformation",
    title: "Multi-Cloud Security Transformation",
    category: "Cloud Security",
    company: "Prudential",
    year: "2017-2018",
    thumbnail: "☁️",
    summary: "Modernized AWS/Azure/GCP security posture with unified policy baselines and drift visibility.",
    challenge:
      "Cloud controls were inconsistent across providers, resulting in policy drift, uneven guardrails, and fragmented reporting for leadership.",
    solution:
      "Defined multi-cloud guardrail baselines for IAM, network segmentation, key management, and workload hardening. Added posture drift dashboards and risk-linked exception governance.",
    outcome:
      "Cloud governance became consistent across platforms with improved visibility into control effectiveness and faster remediation of high-impact drift.",
    technologies: ["AWS", "Azure", "GCP", "CSPM", "CIEM", "Terraform"],
    metrics: [
      { label: "Critical Misconfigurations", value: "-63%" },
      { label: "Cloud Policy Drift", value: "-49%" },
      { label: "Control Baseline Adoption", value: "95%" },
    ],
    featured: false,
  },
  {
    id: "incident-response-optimization",
    title: "Incident Response Time Optimization",
    category: "Security Operations",
    company: "Prudential",
    year: "2017-2018",
    thumbnail: "⚡",
    summary: "Redesigned incident operations to reduce dwell time and improve high-severity containment outcomes.",
    challenge:
      "Incident response playbooks varied by team and lacked clear escalation thresholds, slowing containment during high-pressure events.",
    solution:
      "Implemented standardized response playbooks, severity models, and communication protocols with integrated telemetry enrichment and executive briefing templates.",
    outcome:
      "Response execution became faster and more consistent, with stronger cross-team coordination and clearer executive situational awareness.",
    technologies: ["IR Playbooks", "Splunk", "EDR", "Forensics", "Executive Comms Templates"],
    metrics: [
      { label: "Mean Response Time", value: "-70%" },
      { label: "Escalation Clarity", value: "+60%" },
      { label: "Sev-1 Containment Speed", value: "+2.5x" },
    ],
    featured: false,
  },
  {
    id: "grc-platform-migration",
    title: "Enterprise GRC Platform Migration",
    category: "GRC",
    company: "American Express",
    year: "2025",
    thumbnail: "🔄",
    summary: "Co-led migration from legacy Archer workflows to a modern GRC platform with zero disruption to control operations.",
    challenge:
      "Legacy workflows constrained reporting, automation, and change agility. Migration risk was high due to dependency on exception workflows and historical policy mappings.",
    solution:
      "Executed phased migration with dual-run validation, workflow parity testing, data quality checkpoints, and control owner training. Embedded automation hooks for reporting and evidence traceability.",
    outcome:
      "Transition completed without material compliance disruption. Reporting quality improved and operational overhead declined through streamlined workflow architecture.",
    technologies: ["RSA Archer", "ServiceNow GRC", "SQL", "Python", "Power BI", "Workflow Automation"],
    metrics: [
      { label: "Historical Data Preserved", value: "100%" },
      { label: "Compliance Downtime", value: "0" },
      { label: "Run-Cost Reduction", value: "35%" },
    ],
    featured: false,
  },
];

export const categories = [
  "All",
  "AI Security",
  "Security Engineering",
  "Threat Detection",
  "Risk Management",
  "Security Operations",
  "Compliance",
  "Cloud Security",
  "GRC",
];
