import { Link, useParams } from "react-router-dom";
import { useCases } from "../data/useCases";
import { trackEvent } from "../utils/analytics";

const UseCaseBrief = () => {
  const { id } = useParams();
  const useCase = useCases.find((item) => item.id === id);

  if (!useCase) {
    return (
      <section className="brief-page">
        <div className="brief-container">
          <h1>Brief Not Found</h1>
          <p>The requested use case brief could not be located.</p>
          <Link to="/use-cases" className="brief-back-link">← Back to Use Cases</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="brief-page">
      <div className="brief-container">
        <div className="brief-topbar">
          <Link to="/use-cases" className="brief-back-link">← Back to Use Cases</Link>
          <a
            href={`/briefs/${useCase.id}-brief.pdf`}
            download
            className="brief-download-link"
            onClick={() => trackEvent("use_case_brief_download", { id: useCase.id, placement: "brief_page" })}
          >
            Download PDF Brief
          </a>
        </div>

        <div className="brief-header">
          <span className="brief-category">{useCase.category}</span>
          <h1>{useCase.title}</h1>
          <p>{useCase.company} • {useCase.year}</p>
        </div>

        <div className="brief-metrics">
          {useCase.metrics.map((metric) => (
            <div className="brief-metric" key={metric.label}>
              <div className="brief-metric-value">{metric.value}</div>
              <div className="brief-metric-label">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="brief-section">
          <h2>Executive Summary</h2>
          <p>{useCase.summary}</p>
        </div>
        <div className="brief-section">
          <h2>Challenge</h2>
          <p>{useCase.challenge}</p>
        </div>
        <div className="brief-section">
          <h2>Approach</h2>
          <p>{useCase.solution}</p>
        </div>
        <div className="brief-section">
          <h2>Outcome</h2>
          <p>{useCase.outcome}</p>
        </div>

        <div className="brief-section">
          <h2>Technology Stack</h2>
          <div className="brief-tech-list">
            {useCase.technologies.map((tech) => (
              <span key={tech} className="brief-tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="brief-cta">
          <h3>Want a similar outcome?</h3>
          <p>Book a strategy call to map this approach to your environment.</p>
          <a
            href="https://calendly.com/mikeczarnecki/new-meeting-1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("book_call_click", { placement: "use_case_brief" })}
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default UseCaseBrief;
