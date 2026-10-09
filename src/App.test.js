import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the form builder heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /construye formularios/i })).toBeInTheDocument();
});
