import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../../utils/queries';
import Login from '../../pages/Login';

const UserRecipes = () => {
	const { userId } = useParams();
	const { loading, data } = useQuery(QUERY_SINGLE_USER, {
		variables: { userId },
	});

	const [showLoginCard, setShowLoginCard] = useState(false);

	if (loading) {
		return <div>Loading...</div>;
	}

	const user = data?.getUserById;

	if (!user && !showLoginCard) {
		setShowLoginCard(true);
	}

	return (
		<div className="container">
			<Link to="/">Back to Home</Link>{' '}
			{/* Add the Link component to create a button that links to the home page */}
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
			) : showLoginCard ? (
				<div>
					<div
						className="text-danger"
						style={{ fontSize: '34px', fontWeight: 'bold' }}>
						You Need to be Logged in to see the Recipes!
					</div>
					<Login />
				</div>
			) : null}
		</div>
	);
};

export default UserRecipes;
