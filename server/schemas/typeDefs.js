const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		password: String!
		recipes: [Recipe]
	}
	type Recipe {
		_id: ID!
		title: String!
		content: String!
		image: String
		date_created: String
		category: Category
	}
	type Category {
		_id: ID!
		name: String
	}

	type Auth {
		token: ID
		user: User
	}

	type Query {
		me: User
		getUsers: [User]!
		getUserById(userId: ID!): User
		getRecipes: [Recipe]!
		getRecipeById(recipeId: ID!): Recipe
		getCategories: [Category]!
		getCategoryById(categoryId: ID!): Category
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		addRecipe(
			title: String!
			content: String!
			image: String
			categoryName: String
		): Recipe
		deleteUser: User
		updateRecipe(recipeId: ID!, title: String, content: String): Recipe
		deleteRecipe(recipeId: ID!): User
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
