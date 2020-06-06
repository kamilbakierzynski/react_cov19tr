import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders navbar', () => {
  const { getByRole } = render(<App />);
  const navBar = getByRole('navigation');
  expect(navBar).toBeInTheDocument();
});

// test('renders nav-links', () => {
//   const { getByTestId } = render(<App />);
//   const liveData = getByTestId('nav-link_live-data');
//   expect(liveData).toBeInTheDocument();
// });
