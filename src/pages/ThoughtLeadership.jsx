/* commit fix */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { workingPapers, paperCategories } from "../data/workingPapers";
import { trackEvent } from "../utils/analytics";

const ThoughtLeadership = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPapers =
    selectedCategory === "All"
      ? workingPapers
      : workingPapers.filter((paper) => paper.category === selectedCategory);

  const featuredPapers = workingPapers.filter((paper) => paper.featured);

  return (
    <div className="thought-leadership-page">
      {/* Navigation */}
      <nav className="nav-transparent">
        <Link to="/" className="logo">
          MC
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/use-cases">Use Cases</Link>
          </li>
          <li>
            <Link to="/thought-leadership" className="nav-active">
              Thought Leadership
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="tl-hero">
        <div className="tl-hero-content">
          <span className="tl-badge">
            <span className="tl-badge-icon">📄</span>
            Working Papers & Frameworks
          </span>
          <h1 className="tl-title">
            Thought <span className="gradient-text">Leadership</span>
          </h1>
          <p className="tl-subtitle">
            Deep dives into AI security, governance frameworks, and cybersecurity 
            leadership. Practical insights from 15+ years of enterprise security experience.
          </p>
          <div className="tl-stats">
            <div className="tl-stat">
              <span className="tl-stat-number">{workingPapers.length}</span>
              <span className="tl-stat-label">Publications</span>
            </div>
            <div className="tl-stat">
              <span className="tl-stat-number">
                {workingPapers.reduce((sum, p) => sum + p.pages, 0)}+
              </span>
              <span className="tl-stat-label">Pages Written</span>
            </div>
            <div className="tl-stat">
              <span className="tl-stat-number">{paperCategories.length - 1}</span>
              <span className="tl-stat-label">Topic Areas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Papers */}
      <section className="featured-papers">
        <div className="section-header-tl">
          <span className="section-label-tl">// Featured</span>
          <h2 className="section-title-tl">Key Publications</h2>
        </div>
        <div className="featured-papers-grid">
          {featuredPapers.map((paper) => (
            <div key={paper.id} className="featured-paper-card">
              <div className="paper-category-badge">{paper.category}</div>
              <h3 className="paper-title">{paper.title}</h3>
              <p className="paper-abstract">{paper.abstract}</p>
              <div className="paper-topics">
                {paper.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="paper-topic">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="paper-footer">
                <Link
                  to={`/thought-leadership/${paper.id}`}
                  className="paper-read-btn"
                  onClick={() => trackEvent("paper_open_click", { id: paper.id, placement: "featured" })}
                >
                  Read Online
                </Link>
                <span className="paper-meta">
                  {paper.pages} pages • {paper.date}
                </span>
                <a
                  href={paper.downloadUrl}
                  className="paper-download-btn"
                  download
                  onClick={() => trackEvent("paper_download_click", { id: paper.id, placement: "featured" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="download-icon">⬇️</span>
                  Download Paper
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Papers */}
      <section className="all-papers">
        <div className="section-header-tl">
          <span className="section-label-tl">// Library</span>
          <h2 className="section-title-tl">All Publications</h2>
        </div>

        {/* Category Filters */}
        <div className="paper-filters">
          {paperCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Papers Grid */}
        <div className="papers-grid">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="paper-card">
              <div className="paper-card-header">
                <span className="paper-icon">📄</span>
                <span className="paper-category-tag">{paper.category}</span>
              </div>
              <h3 className="paper-card-title">{paper.title}</h3>
              <p className="paper-card-abstract">{paper.abstract}</p>
              <div className="paper-card-topics">
                {paper.topics.map((topic) => (
                  <span key={topic} className="paper-card-topic">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="paper-card-footer">
                <span className="paper-card-meta">
                  📄 {paper.pages} pages • 📅 {paper.date}
                </span>
                <Link
                  to={`/thought-leadership/${paper.id}`}
                  className="paper-card-read"
                  onClick={() => trackEvent("paper_open_click", { id: paper.id, placement: "library" })}
                >
                  Read Online
                </Link>
                <a
                  href={paper.downloadUrl}
                  className="paper-card-download"
                  download
                  onClick={() => trackEvent("paper_download_click", { id: paper.id, placement: "library" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="tl-cta">
        <div className="tl-cta-content">
          <h2 className="tl-cta-title">Want to Discuss These Topics?</h2>
          <p className="tl-cta-text">
            I'm always happy to dive deeper into AI security, governance 
            frameworks, or leadership strategies.
          </p>
          <div className="tl-cta-buttons">
            <a
              href="https://calendly.com/mikeczarnecki/new-meeting-1"
              target="_blank"
              rel="noopener noreferrer"
              className="tl-cta-primary"
            >
              📅 Book a Discussion
            </a>
            <Link to="/contact" className="tl-cta-secondary">
              ✉️ Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default ThoughtLeadership;
