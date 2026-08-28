import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <button className="navbar__brand" type="button">
        TRAVELY
      </button>

      <div className="navbar__links">
        <button className="navbar__link" type="button">
          About
        </button>

        <button className="navbar__link" type="button">
          Contact
        </button>
      </div>
    </nav>
  )
}

export default Navbar