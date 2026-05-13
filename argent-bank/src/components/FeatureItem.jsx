function FeatureItem({ icon, title, text }) {
  return (
    <div className="feature-item">
      <img className="feature-icon" src={icon} alt={title} />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default FeatureItem;