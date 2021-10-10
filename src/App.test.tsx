import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import App from './App';
import { server } from './mocks/server';
import { Trip } from './Trip';

const createTrips = (count: number) => {
  const res: Array<Trip> = []
  for (let i = 0;i < count; i++) {
    res.push(
      {
        id: i,
        price: { amount: i * 10, currency: 'EUR' },
        waypoints: [
          { place: { city: 'Paris' + i } },
          { place: { city: 'Lyon' + i } }]
      }
    )
  }
  return res;
}

test('renders without pagination', async () => {
 
  // when
  const {container, getByText} = render(<App />);
  await waitFor(() => getByText("Paris"))

  // then
  expect(container).toMatchSnapshot();
});

test('renders with pagination', async () => {
  // given
  const trips = createTrips(100);
  //override mock
  server.use(
    rest.get('https://public-api.blablacar.com/api/v3/trips', (req, res, ctx) => {
      const result: { trips: Array<Trip> } = {
        trips 
      }
      return res(
        ctx.status(200),
        ctx.json(result)
      )
    })
  )
  // when
  const {container, getByText} = render(<App />);
  await waitFor(() => getByText("Paris1"))

  // then
  expect(container).toMatchSnapshot();
});
