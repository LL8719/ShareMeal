import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../../utils/queries';
const UserRecipes = () => {
    const { userId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId },
    });
    if (loading) {
        return <div>Loading...</div>;
    }
    const user = data?.getUserById;
    return (
        <div className="container">
            <Link to="/">Back to Home</Link>{' '}
            {/* Add the Link component to create a button that links to the home page */}
            {user ? (
                <div>
                    <h4 className="text-dark">{user.username}'s Recipes</h4>
                    {user.recipes.map((recipe) => (
                        <div className='recipe-card mb-3' key={recipe._id}>
                            <div className="recipe-card-body">
                                <h5 className="recipe-card-title text-primary">{recipe.title}</h5>
                                <p className="recipe-card-text">{recipe.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-danger">User not found</div>
            )}
        </div>
    );
};
export default UserRecipes;