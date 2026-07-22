import { render, screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    window.fetch = vitest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First Post' }]
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole('listitem');

    expect(listItemElements).not.toHaveLength(0);
  });
});
