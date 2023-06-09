import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, title }) => {
	const usersWithRecipes = users.filter((user) => user.recipes.length > 0);
	// Setter function to search for recipe
	const [searchQuery, setSearchQuery] = useState('');

	// Filter recipes based on the search query
	const filteredRecipes = usersWithRecipes.reduce((acc, user) => {
		const filteredUserRecipes = user.recipes.filter((recipe) =>
			// Update to Category when ready
			recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
		if (filteredUserRecipes.length > 0) {
			acc.push({ user, recipes: filteredUserRecipes });
		}
		return acc;
	}, []);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div>
			<h3 className="text-dark center mt-2">{title}</h3>
			<div className="flex-row justify-space-between my-4">
				<div>
					{/* Update to Category */}
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search by title..."
						className="form-control searchBar"
					/>
				</div>
				<div className='mt-4 cardRow'>
					{filteredRecipes.length === 0 ? (
						<h3>No recipes match your search!</h3>
					) : (
						filteredRecipes.map(({ user, recipes }) => (
							<div key={user._id} className="user-card">
								<div className="recipe-card mb-3">
									<h4 className="recipe-card-header p-2 m-0">
										{user.username} <br />
										<span className="text-dark" style={{ fontSize: '1rem' }}>
											currently has {recipes.length}{' '}
											{recipes.length === 1 ? 'recipe' : 'recipes'}
										</span>
									</h4>
									{recipes.map((recipe) => (
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
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default UserList;
