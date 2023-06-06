import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';

const RecipeSubmission = () => {
  const [formState, setFormState] = useState({ title: '', ingredients: '', instructions: '' });
  const [submitRecipe, { error, data }] = useMutation(ADD_RECIPE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await submitRecipe({
        variables: { ...formState },
      });

      // Handle success message or redirect
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      title: '',
      ingredients: '',
      instructions: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Submit a Recipe</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! Your recipe has been submitted.{' '}
                <Link to="/">Go to the homepage</Link> to see more recipes.
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Recipe title"
                  name="title"
                  type="text"
                  value={formState.title}
                  onChange={handleChange}
                />
                <textarea
                  className="form-input"
                  placeholder="Ingredients"
                  name="ingredients"
                  rows="4"
                  value={formState.ingredients}
                  onChange={handleChange}
                ></textarea>
                <textarea
                  className="form-input"
                  placeholder="Instructions"
                  name="instructions"
                  rows="6"
                  value={formState.instructions}
                  onChange={handleChange}
                ></textarea>
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit Recipe
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecipeSubmission;