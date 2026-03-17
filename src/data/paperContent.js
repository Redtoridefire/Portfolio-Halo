export const paperContent = {
  "agentic-ai-security": {
    overview:
      "This paper provides a practical security model for autonomous AI systems, with emphasis on action authorization, memory safety, and guardrail observability.",
    sections: [
      {
        heading: "Why Agentic AI Changes Security",
        body:
          "Traditional application controls assume deterministic behavior and bounded workflows. Agentic systems introduce adaptive planning, tool chaining, and context memory, which require continuous policy evaluation rather than static gate checks.",
      },
      {
        heading: "Control Architecture",
        body:
          "The framework defines autonomy tiers, policy scopes, and mandatory checkpoints for high-risk actions. It combines least-privilege identity, inference boundary controls, and runtime approval policies to reduce blast radius.",
      },
      {
        heading: "Operating Model",
        body:
          "Security, risk, and engineering teams share ownership through a governance cadence: design reviews, adversarial testing, and drift monitoring. Outputs include board-facing KRIs and incident playbooks specific to AI agent behavior.",
      },
    ],
  },
  "ai-governance-framework": {
    overview:
      "A financial-services focused governance blueprint aligned to NIST AI RMF and ISO 42001, designed for fast implementation in regulated environments.",
    sections: [
      {
        heading: "Policy Baseline",
        body:
          "The paper introduces policy primitives for data classification, model usage tiers, and third-party AI risk obligations. It maps governance controls to enterprise control libraries for auditability.",
      },
      {
        heading: "Risk & Control Mapping",
        body:
          "A repeatable method for connecting model risks to compensating controls, with ownership assignment across risk, legal, and technology teams.",
      },
      {
        heading: "Deployment Rollout",
        body:
          "A phased rollout model enables teams to launch approved AI use-cases while maintaining policy discipline, monitoring, and exception governance.",
      },
    ],
  },
  "zero-trust-llm": {
    overview:
      "This paper reframes Zero Trust for LLM workflows, focusing on prompt-layer controls, retrieval security, and identity-bound access to model capabilities.",
    sections: [
      { heading: "Identity First", body: "LLM access should be identity-scoped with policy-enforced context windows, adaptive authentication, and least-privilege agent permissions." },
      { heading: "Data Protection", body: "Strong controls around embeddings, vector stores, and retrieval connectors are required to prevent silent data exfiltration paths." },
      { heading: "Telemetry & Detection", body: "The framework recommends prompt abuse detection, anomalous tool invocation alerts, and policy violation analytics for SOC integration." },
    ],
  },
  "board-cyber-risk": {
    overview:
      "A practical communication guide for translating technical cyber metrics into business-risk decisions for executive and board audiences.",
    sections: [
      { heading: "Narrative Structure", body: "The paper introduces a board memo pattern: top risk themes, exposure trend, decision asks, and confidence level." },
      { heading: "KRI Design", body: "It defines KRIs that balance technical fidelity with business relevance, enabling leaders to track risk reduction and residual exposure." },
      { heading: "Decision Readiness", body: "Includes a templated approach for board packs that improve decision speed without sacrificing security detail." },
    ],
  },
  "devsecops-transformation": {
    overview:
      "A transformation playbook for shifting AppSec from bottleneck to enablement through pipeline-native controls and developer operating models.",
    sections: [
      { heading: "Shift-Left without Friction", body: "Controls are embedded in CI/CD with clear pass/fail policy, self-service guidance, and risk-based exceptions." },
      { heading: "Program Metrics", body: "The paper tracks lead-time impact, remediation SLAs, and defect escape rates to prove business value." },
      { heading: "Scale Strategy", body: "Security champions, reusable policy modules, and centralized telemetry provide consistent scale across teams." },
    ],
  },
  "mitre-attack-operationalization": {
    overview:
      "A detection engineering framework for operationalizing MITRE ATT&CK with coverage mapping, gap analysis, and SOC execution loops.",
    sections: [
      { heading: "Coverage Method", body: "The model maps detections to prioritized ATT&CK techniques and highlights gaps by business-critical threat scenarios." },
      { heading: "Detection Lifecycle", body: "Detection content is managed as code with validation, tuning, and retirement criteria for sustained performance." },
      { heading: "SOC Integration", body: "The approach links ATT&CK coverage metrics to incident response outcomes, enabling measurable reduction in MTTD and triage noise." },
    ],
  },
};
