import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
// Queries Used
import { GET_ME } from '../utils/queries';
// Mutations Used
import { DELETE_RECIPE, ADD_RECIPE, UPDATE_RECIPE } from '../utils/mutations';

const SavedRecipes = () => {
	const { loading, data, refetch } = useQuery(GET_ME);

	const [addRecipe, { error: addError }] = useMutation(ADD_RECIPE);
	const [deleteRecipe, { error: deleteError }] = useMutation(DELETE_RECIPE);
	const [updateRecipe, { error: updateError }] = useMutation(UPDATE_RECIPE);
	// Setter functions to create recipe
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	// Setter functions to update recipe
	const [updateRecipeId, setUpdateRecipeId] = useState('');
	const [updateTitle, setUpdateTitle] = useState('');
	const [updateContent, setUpdateContent] = useState('');
	// assign the value of data.me to userData
	const userData = data?.me || {};

	useEffect(() => {
		if (data) {
			// Additional logic if needed
		}
	}, [data]);
	// Function to create Recipe
	const handleCreateRecipe = async () => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await addRecipe({
				variables: { title, content },
			});

			refetch(); // Refetch the GET_ME query after creating a recipe

			setTitle('');
			setContent('');
		} catch (err) {
			console.error(err);
		}
	};
	// Function to delete Recipe
	const handleDeleteRecipe = async (recipeId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await deleteRecipe({
				variables: { recipeId },
			});

			refetch(); // Refetch the GET_ME query after deleting a recipe
		} catch (err) {
			console.error(err);
		}
	};
	// Function to update Recipe
	const handleUpdateRecipe = async (recipeId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await updateRecipe({
				variables: {
					recipeId,
					title: updateTitle,
					content: updateContent,
				},
			});

			refetch(); // Refetch the GET_ME query after updating a recipe

			setUpdateTitle('');
			setUpdateContent('');
			setUpdateRecipeId('');
		} catch (err) {
			console.error(err);
		}
	};

	// if data isn't here yet, say so
	if (loading) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<div className=" pb-4">
				<Container>
					<h1>{userData.username}'s Recipes!</h1>
				</Container>
			</div>
			<Container>
				<h2 className="pt-2">
					{userData.recipes && userData.recipes.length !== 0
						? `Viewing ${userData.recipes.length} saved ${
								userData.recipes.length === 1 ? 'recipe' : 'recipes'
						  }:`
						: 'You have no Recipes!'}
				</h2>
				<Row>
					{userData.recipes &&
						userData.recipes.map((recipe) => (
							<Col md="4" key={recipe._id} className="mb-4">
								<Card border="dark">
									{recipe.image && (
										<Card.Img
											src={recipe.image}
											alt={`The title for ${recipe.title}`}
											variant="top"
										/>
									)}
									<Card.Body>
										<Card.Title>{recipe.title}</Card.Title>
										<Card.Text>{recipe.content}</Card.Text>
										<Button
											className="btn-block btn-danger"
											onClick={() => handleDeleteRecipe(recipe._id)}>
											Delete this Recipe!
										</Button>
										<Button
											className="btn-block btn-primary mt-2"
											onClick={() => {
												setUpdateRecipeId(recipe._id);
												setUpdateTitle(recipe.title);
												setUpdateContent(recipe.content);
											}}>
											Update this Recipe
										</Button>
										{updateRecipeId === recipe._id && (
											<div className="mt-2">
												<input
													type="text"
													placeholder="Enter updated title"
													value={updateTitle}
													onChange={(e) => setUpdateTitle(e.target.value)}
													className="form-control mb-2"
												/>
												<textarea
													placeholder="Enter updated content"
													value={updateContent}
													onChange={(e) => setUpdateContent(e.target.value)}
													className="form-control mb-2"
												/>
												<Button
													className="btn-block btn-success"
													onClick={() => handleUpdateRecipe(recipe._id)}>
													Update Recipe
												</Button>
											</div>
										)}
									</Card.Body>
								</Card>
							</Col>
						))}
				</Row>
			</Container>
			<Container>
				<h2 className="pt-5">Create a New Recipe</h2>
				<Row>
					<Col md="4">
						<Card>
							<Card.Body>
								<Card.Title>Create a New Recipe</Card.Title>
								<input
									type="text"
									placeholder="Enter title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="form-control mb-3"
								/>
								<textarea
									placeholder="Enter content"
									value={content}
									onChange={(e) => setContent(e.target.value)}
									className="form-control mb-3"
								/>
								<Button
									className="btn-block btn-primary"
									onClick={handleCreateRecipe}>
									Create Recipe
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SavedRecipes;
