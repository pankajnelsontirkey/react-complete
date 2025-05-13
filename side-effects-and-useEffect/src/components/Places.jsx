export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className='places-category'>
      <h2>{title}</h2>
      {places.length === 0 ? (
        <p className='fallback-text'>{fallbackText}</p>
      ) : null}
      {places.length > 0 && (
        <ul className='places'>
          {places.map((place) => (
            <li className='place-item' key={place.id}>
              <button onClick={() => onSelectPlace(place.id)}>
                <img src={place.image.src} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
