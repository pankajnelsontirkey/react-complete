'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

export async function shareMeal(formData) {
  const {
    title,
    summary,
    instructions,
    name: creator,
    email: creator_email
  } = Object.fromEntries(formData.entries());

  const meal = {
    title,
    summary,
    instructions,
    creator,
    creator_email
  };
  meal.image = formData.get('image');

  await saveMeal(meal);
  redirect('/meals');
}
