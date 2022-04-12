import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';

const SEARCH_URL = 'https://registry.npmjs.org/-/v1/search';

export const searchRepositories = (term: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionTypes.SEARCH_REPOSITORIES
		});

		try {
			const { data } = await axios.get(
				SEARCH_URL,
				{
					params: {
						text: term
					},
				});

			const names = data.objects.map((result: any) => {
				return result.package.name;
			});

			dispatch({
				type: ActionTypes.SEARCH_REPOSITORIES_SUCCESS,
				payload: names
			});
		} catch (err: any) {
			dispatch({
				type: ActionTypes.SEARCH_REPOSITORIES_ERROR,
				payload: err.message
			});
		}
	};
};
