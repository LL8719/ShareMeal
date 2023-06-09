import React from 'react';
import { useQuery } from '@apollo/client';
import UserList from '../components/UserList';
import { QUERY_USERS } from '../utils/queries';

const Home = () => {
	const { loading, data } = useQuery(QUERY_USERS);

	if (loading) {
		return <div>Loading...</div>;
	}

	const users = data.getUsers;

	return (
		<main>
			<div className="flex-row justify-center">
				<div >
					<UserList users={users} title="Recipes"/>
				</div>
			</div>
		</main>
	);
};

export default Home;
