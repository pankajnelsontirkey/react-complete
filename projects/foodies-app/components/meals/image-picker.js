'use client';

import { useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);

  const imageInputRef = useRef();

  const handleButtonClicked = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <>
      <div className={styles.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.controls}>
          <div className={styles.preview}>
            {!pickedImage ? <p>no image selected</p> : null}
            {pickedImage ? (
              <Image src={pickedImage} alt='Image selected by the user' fill />
            ) : null}
          </div>
          <input
            className={styles.input}
            type='file'
            id={name}
            accept='image/png, image/jpg, image/jpeg'
            name={name}
            ref={imageInputRef}
            onChange={handleImageChange}
            required
          />
          <button
            type='button'
            className={styles.button}
            onClick={handleButtonClicked}
          >
            Pick an image
          </button>
        </div>
      </div>
    </>
  );
}
