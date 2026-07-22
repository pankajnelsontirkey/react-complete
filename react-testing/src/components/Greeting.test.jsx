import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import Greeting from './Greeting';

describe('Greeting component', () => {
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

  test('renders good to see you when button NOT clicked!', () => {
    render(<Greeting />);
    const outputElement = screen.getByText(`good to see you!`, {
      exact: false
    });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders changed if the button WAS clicked', async () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    const changedElement = screen.getByText(/changed!/i);

    expect(changedElement).toBeInTheDocument();
  });

  test('should not render "good to see you" if the button WAS clicked', async () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    const outputElement = screen.queryByText(`good to see you!`, {
      exact: false
    });

    expect(outputElement).toBeNull();
  });
});
