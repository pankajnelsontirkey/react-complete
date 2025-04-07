import { CORE_CONCEPTS } from '../data';
import { CoreConcept } from './CoreConcept/CoreConcept';

export default function CoreConcepts() {
  return (
    <section id='core-concepts'>
      <ul>
        {CORE_CONCEPTS?.length &&
          CORE_CONCEPTS.map((conceptItem) => {
            return <CoreConcept key={conceptItem.title} {...conceptItem} />;
          })}
      </ul>
    </section>
  );
}
