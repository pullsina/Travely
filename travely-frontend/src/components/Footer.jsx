import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <button className="footer__link" type="button">
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
