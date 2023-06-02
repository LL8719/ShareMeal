const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	content: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String,
	},
	date_created: {
		type: Date,
		default: Date.now,
	},
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
});
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
