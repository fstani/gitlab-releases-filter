import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders extension', () => {
  render(<App />);
  const modeSelector = screen.getByLabelText(/instance mode:/i)
  expect(modeSelector).toBeInTheDocument();
  const tierSelector = screen.getByLabelText(/instance tier:/i)
  expect(tierSelector).toBeInTheDocument();
});
