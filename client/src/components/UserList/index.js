import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, title }) => {
	// Filter users who have recipes
	const usersWithRecipes = users.filter((user) => user.recipes.length > 0);

	if (!usersWithRecipes.length) {
		return <h3>No Users with Recipes Yet</h3>;
	}

	return (
		<div>
			<h3 className="text-dark">{title}</h3>
			<div className="flex-row justify-space-between my-4">
				{usersWithRecipes.map((user) => (
					<div key={user._id} className="user-card">
						<div className="recipe-card mb-3">
							<h4 className="recipe-card-header p-2 m-0">
								{user.username} <br />
								<span className="text-dark" style={{ fontSize: '1rem' }}>
									currently has {user.recipes.length}{' '}
									{user.recipes.length === 1 ? 'recipe' : 'recipes'}
								</span>
							</h4>
							{user.recipes.map((recipe) => (
								<div key={recipe._id} className="card-body">
									<div className="recipe-card mb-2">
										<div className="card-body">
											<h5 className="recipe-card-title">{recipe.title}</h5>
											<p className="recipe-card-text">{recipe.content}</p>
										</div>
									</div>
								</div>
							))}
							<Link
								className="btn btn-block btn-squared btn-light text-dark"
								to={`/users/${user._id}/recipes`}>
								View their recipes.
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserList;
