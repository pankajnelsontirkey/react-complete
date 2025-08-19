import styles from './MeetupDetails.module.css';

export default function MeetupDetails({ title, image, address, description }) {
  return (
    <section className={styles.details}>
      <img src={image} alt={title}></img>
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}
