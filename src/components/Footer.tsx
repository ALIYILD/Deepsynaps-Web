import { Link } from "react-router";
import { Brand } from "./Header";
import { CONTACT } from "@/config/contact";
export function Footer() {
  return (
    <footer className="lab-footer">
      <div className="lab-container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>
              Developing adaptive intelligence through sensory understanding,
              specialist agents and shared learning.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/research">Research</Link>
              </li>
              <li>
                <Link to="/nerve">NERVE</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/ecosystem">Ecosystem</Link>
              </li>
              <li>
                <Link to="/about">The lab</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Platforms & learning</h3>
            <ul>
              <li>
                <a
                  href="https://app.deepsynaps.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clinical Intelligence OS ↗
                </a>
              </li>
              <li>
                <a
                  href="https://deepsynapslab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chip Design Lab ↗
                </a>
              </li>
              <li>
                <Link to="/ecosystem/perfflux">Perfflux</Link>
              </li>
              <li>
                <Link to="/academy">Academy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Connect</h3>
            <ul>
              <li>
                <a href={`mailto:${CONTACT.email}`}>Email the team</a>
              </li>
              <li>
                <Link to="/consultations">Clinical consultations</Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>
            Clinical Intelligence OS supports clinical decision-making;
            qualified clinicians remain responsible for care. Research concepts
            are identified separately from available applications.
          </p>
          <span>
            © {new Date().getFullYear()} DeepSynaps. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
