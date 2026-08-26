import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders App component', async () => {
  global.fetch = () => Promise.resolve({
    json: () => Promise.resolve([]),
  } as Response);
  render(<App />);
  await waitFor(() => expect(screen.getByText(/RedeExcedente/i)).toBeDefined());
});
