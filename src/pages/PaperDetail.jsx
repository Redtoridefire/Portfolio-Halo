import { Link, useParams } from "react-router-dom";
import { workingPapers } from "../data/workingPapers";
import { paperContent } from "../data/paperContent";
import { trackEvent } from "../utils/analytics";

const PaperDetail = () => {
  const { id } = useParams();
  const paper = workingPapers.find((item) => item.id === id);
  const content = paper ? paperContent[paper.id] : null;

  if (!paper || !content) {
    return (
      <section className="paper-detail-page">
        <div className="paper-detail-container">
          <h1>Paper Not Found</h1>
          <p>The requested publication could not be found.</p>
          <Link to="/thought-leadership" className="paper-detail-back">← Back to Thought Leadership</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="paper-detail-page">
      <div className="paper-detail-container">
        <div className="paper-detail-topbar">
          <Link to="/thought-leadership" className="paper-detail-back">← Back to Thought Leadership</Link>
          <div className="paper-detail-actions">
            <a
              href={`/papers/${paper.id}.md`}
              download
              className="paper-detail-btn"
              onClick={() => trackEvent("paper_download_click", { id: paper.id, type: "markdown", placement: "detail" })}
            >
              Download Markdown
            </a>
            <a
              href={paper.downloadUrl}
              download
              className="paper-detail-btn"
              onClick={() => trackEvent("paper_download_click", { id: paper.id, type: "pdf", placement: "detail" })}
            >
              Download PDF
            </a>
          </div>
        </div>

        <div className="paper-detail-header">
          <span className="paper-detail-category">{paper.category}</span>
          <h1>{paper.title}</h1>
          <p>{paper.date} • {paper.pages} pages</p>
        </div>

        <div className="paper-detail-section">
          <h2>Overview</h2>
          <p>{content.overview}</p>
        </div>

        {content.sections.map((section) => (
          <div className="paper-detail-section" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </div>
        ))}

        <div className="paper-detail-topics">
          {paper.topics.map((topic) => (
            <span key={topic} className="paper-detail-topic">{topic}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaperDetail;
