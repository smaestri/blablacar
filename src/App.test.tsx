import { render, screen, waitFor } from '@testing-library/react';
import App from './App.tsx';

test('renders learn react link', async () => {
  render(<App />);
  await waitFor(() => screen.getByText("Paris"))
screen.debug()
});
