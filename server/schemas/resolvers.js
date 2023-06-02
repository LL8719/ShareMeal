const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		// Query tested
		getUsers: async (_, __) => {
			try {
				const users = await User.find()
					.select('-__v -password')
					.populate('recipes');
				console.log(users);
				return users;
			} catch (error) {
				throw new Error('Failed to fetch users');
			}
		},
		// Query tested
		getUserById: async (_, { userId }, context) => {
			if (context.user) {
				const user = await User.findById({ _id: userId }).populate('recipes');

				return user;
			}
			throw new AuthenticationError('Not logged in');
		},
		// Query tested
		getRecipes: async (_, __, context) => {
			if (context.user) {
				const recipes = await Recipe.find().populate('category');
				return recipes;
			}
			throw new AuthenticationError('Not logged in');
		},
		// Query tested
		getRecipeById: async (_, { recipeId }, context) => {
			if (context.user) {
				const recipe = await Recipe.findById(recipeId);
				return recipe;
			}
			throw new AuthenticationError('Not logged in');
		},
		// Coming back as empty array need to figure out how to implement
		getCategories: async (_, __, context) => {
			if (context.user) {
				const categories = await Category.find();
				return categories;
			}
			throw new AuthenticationError('Not logged in');
		},
		// Coming back as empty array need to figure out how to implement
		getCategoryById: async (_, { categoryId }, context) => {
			if (context.user) {
				const category = await Category.findById(categoryId);
				return category;
			}
			throw new AuthenticationError('Not logged in');
		},
	},
	Mutation: {
		// Mutation checked
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);

			return { token, user };
		},
		// Mutation checked
		addRecipe: async (
			parent,
			{ title, content, image, categoryId },
			context
		) => {
			if (context.user) {
				const recipe = new Recipe({ title, content });

				if (image) {
					recipe.image = image;
				}
				if (categoryId) {
					// Assign the category to the recipe
					recipe.category = categoryId;
				}

				// Save the recipe to get the generated _id
				const savedRecipe = await recipe.save();

				// Update the user's recipes field with the recipe's _id
				await User.findByIdAndUpdate(context.user._id, {
					$push: { recipes: savedRecipe._id },
				});

				return savedRecipe;
			}

			throw new AuthenticationError('Not logged in');
		},
		// Mutation checked
		deleteUser: async (parent, args, context) => {
			if (context.user) {
				const deletedUser = await User.findOneAndDelete({
					_id: context.user._id,
				});
				console.log(deletedUser);
				await Recipe.deleteMany({ _id: { $in: deletedUser.recipes } });

				return deletedUser;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Mutation checked
		updateRecipe: async (parent, { recipeId, title, content }, context) => {
			if (context.user) {
				const updatedRecipe = await Recipe.findByIdAndUpdate(
					recipeId,
					{ title, content },
					{ new: true, runValidators: true }
				);

				return updatedRecipe;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Mutation checked
		deleteRecipe: async (parent, { recipeId }, context) => {
			if (context.user) {
				const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
				return deletedRecipe; // Return the deleted recipe
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		// Mutation checked
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
