import React from 'react';
import '@fontsource/poppins/900.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AppNav from './components/AppNav';
import Header from './components/Header';
import Footer from  './components/Footer/Footer';
import SavedRecipes from './pages/SavedRecipes';
import UserRecipes from './components/UserRecipes';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
				<AppNav/>
					<Header/>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/saved" element={<SavedRecipes />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/users/:userId/recipes" element={<UserRecipes />} />
					</Routes>
					<Footer/>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
