import "./CardOverlay.css";

function CardOverlay({ children, onClose }) {
  return (
    <div className="card-overlay" onClick={onClose}>
      <div
        className="card-overlay__content"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default CardOverlay;
