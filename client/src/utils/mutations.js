import { gql } from '@apollo/client';

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_RECIPE = gql`
	mutation addRecipe($userId: ID!, $recipes: String!) {
		addRecipe(title: $title, content: $content) {
			_id
			title
			content
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				name
			}
		}
	}
`;

export const DELETE_RECIPE = gql`
	mutation deleteRecipe($recipeId: ID!) {
		deleteRecipe(recipeId: $recipeId) {
			_id
			name
			recipes
		}
	}
`;
