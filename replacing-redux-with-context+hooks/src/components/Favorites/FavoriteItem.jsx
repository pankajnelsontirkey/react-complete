import Card from '../UI/Card';
import './FavoriteItem.css';

export default function FavoriteItem({ title, description }) {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className='favorite-item'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Card>
  );
}
