import Link from 'next/link';

import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import styles from './page.module.css';

export default function MealsPage() {
  const meals = getMeals();

  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, craeted{' '}
          <span className={styles.highlight}>by you</span>
          <p>
            Choose your favorite recipe and cook it yourself. It is easy and
            fun.
          </p>
          <p className={styles.cta}>
            <Link href='/meals/share'>Share Your Favorite Recipe</Link>
          </p>
        </h1>
      </header>
      <main>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
