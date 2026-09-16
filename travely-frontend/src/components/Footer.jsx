import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__links">
        <button
          className="footer__link"
          type="button"
          onClick={() => navigate("/about")}
        >
          About
        </button>

        <button className="footer__link" type="button">
          Contact
        </button>
      </div>

      <p className="footer__copyright">© 2026 Travely</p>
    </footer>
  );
}

export default Footer;
