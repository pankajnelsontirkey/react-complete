'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

const isInvalidText = (text) => {
  return !text || text.trim() === '';
};

export async function shareMeal(prevState, formData) {
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

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error('Invalid input');
    return {
      message: 'Invalid input'
    };
  }

  await saveMeal(meal);
  // setTimeout(() => {
  redirect('/meals');
  // }, [2000]);
}
