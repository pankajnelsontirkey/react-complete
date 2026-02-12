import { render, screen } from '@testing-library/react';

import { expect, test } from 'vitest';
import Greeting from './Greeting';

test('renders Hello World as a text', () => {
  // Arrange
  render(<Greeting />);

  // Act
  // ...nothing in this case

  // Assert
  const helloWorldElement = screen.getByText(
    'Hello World!' /* , { exact: false } */
  );

  expect(helloWorldElement).toBeInTheDocument();
});
