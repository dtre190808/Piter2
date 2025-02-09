import { Link } from 'react-router-dom';

function AttractionCard({ slug, name, description, imageUrl }) {
  return (
    <div className="attraction-card">
      <img src={imageUrl} alt={name} className='card-image' />
      <h3 className='card-title'>{name}</h3>
      <p className='card-text'>{description.slice(0, 100)}...</p>
      <Link to={`/attraction/${slug}`} className='link-button-card'>Подробнее</Link>
    </div>
  );
}

export default AttractionCard;