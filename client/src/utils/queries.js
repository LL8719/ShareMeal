import { gql } from '@apollo/client';

export const GET_ME = gql`
	{
		me {
			_id
			username
			email
			recipes {
				_id
				title
				content
				image
			}
		}
	}
`;

export const QUERY_USERS = gql`
	query getUsers {
		getUsers {
			_id
			username
			recipes {
				_id
				title
				content
			}
		}
	}
`;

export const QUERY_SINGLE_USER = gql`
	query getUserById($userId: ID!) {
		getUserById(userId: $userId) {
			_id
			username
			recipes {
				_id
				title
				content
			}
		}
	}
`;
