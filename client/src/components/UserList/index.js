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
			<h3 className="text-primary">{title}</h3>
			<div className="flex-row justify-space-between my-4">
				{usersWithRecipes.map((user) => (
					<div key={user._id} className="col-12 col-xl-6">
						<div className="card mb-3">
							<h4 className="card-header bg-dark text-light p-2 m-0">
								{user.username} <br />
								<span className="text-white" style={{ fontSize: '1rem' }}>
									currently has {user.recipes.length}{' '}
									{user.recipes.length === 1 ? 'recipe' : 'recipes'}
								</span>
							</h4>
							{user.recipes.map((recipe) => (
								<div key={recipe._id} className="card-body">
									<div className="card mb-2">
										<div className="card-body">
											<h5 className="card-title">{recipe.title}</h5>
											<p className="card-text">{recipe.content}</p>
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
