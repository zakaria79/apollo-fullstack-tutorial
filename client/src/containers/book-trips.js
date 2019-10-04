import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';
import { GET_CART_ITEMS } from '../pages/cart';

const BOOK_TRIPS = gql`
	mutation BookTrips($launchIds: [ID]!) {
		bookTrips(launchIdS: $launchIds) {
			success
			message
			launches {
				id
				isBooked
			}
		}
	}
`;

export default function BookTrips({ cartItems }) {
	const [ bookTrips, { data, loading, error } ] = useMutation(BOOK_TRIPS, {
		refetchQueries: cartItems.map((launchId) => ({
			query: GET_LAUNCH,
			variables: { launchId }
		})),
		update(cache) {
			cache.writeData({ data: { cartItems: [] } });
		}
	});
	return data && data.bookTrips && !data.bookTrips.success ? (
		<p data-testid="message">{data.bookTrips.message}</p>
	) : (
		<Button onClick={bookTrips} data-testid="book-button">
			Book All
		</Button>
	);
}
