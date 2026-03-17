import { useState } from "react";
import { Link } from "react-router-dom";
import { useCases, categories } from "../data/useCases";
import { trackEvent } from "../utils/analytics";

const UseCasesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);

  const filteredCases = activeCategory === "All" 
    ? useCases 
    : useCases.filter(uc => uc.category === activeCategory);

  const featuredCases = useCases.filter(uc => uc.featured);

  return (
    <div className="use-cases-page">
      {/* Hero Section */}
      <section className="use-cases-hero">
        <div className="use-cases-hero-content">
          <Link to="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
          <div className="section-label">Portfolio</div>
          <h1 className="use-cases-title">
            Use Cases & <span className="gradient-text">Projects</span>
          </h1>
          <p className="use-cases-subtitle">
            Real-world cybersecurity challenges I've tackled across financial services, 
            government, and healthcare industries. Each project represents measurable 
            impact and innovative solutions.
          </p>
          <div className="use-cases-stats">
            <div className="uc-stat">
              <div className="uc-stat-number">{useCases.length}</div>
              <div className="uc-stat-label">Projects</div>
            </div>
            <div className="uc-stat">
              <div className="uc-stat-number">6</div>
              <div className="uc-stat-label">Industries</div>
            </div>
            <div className="uc-stat">
              <div className="uc-stat-number">$3M+</div>
              <div className="uc-stat-label">Value Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects">
        <h2 className="featured-title">Featured Projects</h2>
        <div className="featured-grid">
          {featuredCases.map((uc) => (
            <div 
              key={uc.id} 
              className="featured-card"
              onClick={() => {
                setSelectedCase(uc);
                trackEvent("use_case_opened", { id: uc.id, featured: true });
              }}
            >
              <div className="featured-card-header">
                <span className="featured-thumbnail">{uc.thumbnail}</span>
                <span className="featured-category">{uc.category}</span>
              </div>
              <h3 className="featured-card-title">{uc.title}</h3>
              <p className="featured-card-company">{uc.company} • {uc.year}</p>
              <p className="featured-card-summary">{uc.summary}</p>
              <div className="featured-metrics">
                {uc.metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="featured-metric">
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className="featured-card-cta">
                View Details →
              </div>
              <Link
                to={`/use-cases/${uc.id}/brief`}
                className="featured-brief-link"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("use_case_brief_open", { id: uc.id, placement: "featured" });
                }}
              >
                Open Executive Brief
              </Link>
              <a
                href={`/briefs/${uc.id}-brief.pdf`}
                className="featured-brief-link"
                download
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("use_case_brief_download", { id: uc.id, placement: "featured" });
                }}
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="all-projects">
        <div className="projects-header">
          <h2 className="projects-title">All Projects</h2>
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredCases.map((uc) => (
            <div 
              key={uc.id} 
              className="project-card"
              onClick={() => {
                setSelectedCase(uc);
                trackEvent("use_case_opened", { id: uc.id, featured: false });
              }}
            >
              <div className="project-card-top">
                <span className="project-thumbnail">{uc.thumbnail}</span>
                <div className="project-meta">
                  <span className="project-category">{uc.category}</span>
                  <span className="project-year">{uc.year}</span>
                </div>
              </div>
              <h3 className="project-title">{uc.title}</h3>
              <p className="project-company">{uc.company}</p>
              <p className="project-summary">{uc.summary}</p>
              <div className="project-technologies">
                {uc.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
                {uc.technologies.length > 3 && (
                  <span className="tech-tag more">+{uc.technologies.length - 3}</span>
                )}
              </div>
              <Link
                to={`/use-cases/${uc.id}/brief`}
                className="project-brief-link"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("use_case_brief_open", { id: uc.id, placement: "grid" });
                }}
              >
                Open Executive Brief
              </Link>
              <a
                href={`/briefs/${uc.id}-brief.pdf`}
                className="project-brief-link"
                download
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("use_case_brief_download", { id: uc.id, placement: "grid" });
                }}
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedCase && (
        <div className="project-modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCase(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header">
              <span className="modal-thumbnail">{selectedCase.thumbnail}</span>
              <div className="modal-header-info">
                <span className="modal-category">{selectedCase.category}</span>
                <h2 className="modal-title">{selectedCase.title}</h2>
                <p className="modal-company">{selectedCase.company} • {selectedCase.year}</p>
              </div>
            </div>

            <div className="modal-metrics">
              {selectedCase.metrics.map((metric, i) => (
                <div key={i} className="modal-metric">
                  <div className="modal-metric-value">{metric.value}</div>
                  <div className="modal-metric-label">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="modal-section">
              <h3>The Challenge</h3>
              <p>{selectedCase.challenge}</p>
            </div>

            <div className="modal-section">
              <h3>The Solution</h3>
              <p>{selectedCase.solution}</p>
            </div>

            <div className="modal-section">
              <h3>The Outcome</h3>
              <p>{selectedCase.outcome}</p>
            </div>

            <div className="modal-section">
              <h3>Technologies Used</h3>
              <div className="modal-technologies">
                {selectedCase.technologies.map((tech, i) => (
                  <span key={i} className="modal-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCasesPage;
