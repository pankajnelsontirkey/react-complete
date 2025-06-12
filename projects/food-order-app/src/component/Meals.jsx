import { useEffect, useState } from 'react';

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch('http://localhost:3000/meals');
        if (!response.ok) {
          //...
          return;
        }
        const meals = await response.json();
        setMeals(meals);
      } catch (error) {
        console.log('error', error);
      }
    }

    fetchMeals();
  }, []);

  return (
    <>
      <ul id='meals'>
        {meals.map((meal) => (
          <li key={meal.id}>{meal.name}</li>
        ))}
      </ul>
    </>
  );
}
