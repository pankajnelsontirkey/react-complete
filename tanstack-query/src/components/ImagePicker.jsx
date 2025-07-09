import { API_HOST } from '../utils/constants';

export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div id='image-picker'>
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? 'selected' : undefined}
          >
            <img src={`${API_HOST}/${image.path}`} alt={image.caption} />
          </li>
        ))}
      </ul>
    </div>
  );
}
