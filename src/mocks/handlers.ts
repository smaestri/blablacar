import { rest } from 'msw'
import { Trip } from '../Trip'

export const handlers = [
    rest.get('https://public-api.blablacar.com/api/v3/trips', (req, res, ctx) => {
      const result : {trips: Array<Trip>} = {
        trips: [{id:1,
          price: {amount: 10, currency: 'EUR'},
          waypoints: [
            {place: {city: 'Paris'}},
            {place: {city: 'Lyon'}}]
       }]
      }
        return res(
            ctx.status(200),
            ctx.json(result)
        )
    })
  ]