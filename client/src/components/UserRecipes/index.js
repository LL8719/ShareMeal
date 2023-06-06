import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../../utils/queries';

const UserRecipes = () => {
	const { userId } = useParams();

	const { loading, data } = useQuery(QUERY_SINGLE_USER, {
		variables: { userId },
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	const user = data?.getUserById;

	return (
		<div className="container">
			<h3 className="text-primary">User Recipes</h3>
			{user ? (
				<div>
					<h4 className="text-secondary">{user.username}'s Recipes</h4>
					{user.recipes.map((recipe) => (
						<div key={recipe._id} className="card mb-3">
							<div className="card-body">
								<h5 className="card-title text-primary">{recipe.title}</h5>
								<p className="card-text">{recipe.content}</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-danger">User not found</div>
			)}
		</div>
	);
};

export default UserRecipes;
