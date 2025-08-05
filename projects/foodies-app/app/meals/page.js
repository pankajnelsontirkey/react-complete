import Link from 'next/link';

export default function MealsPage() {
  return (
    <>
      <h1>Meals Page</h1>
      <ul>
        <li>
          <Link href='/meals/meal-1'>Meal 1</Link>
        </li>
        <li>
          <Link href='/meals/meal-2'>Meal 2</Link>
        </li>
        <li>
          <Link href='/meals/meal-3'>Meal 3</Link>
        </li>
      </ul>
    </>
  );
}
