import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_EMAILS = 'GET_EMAILS';

/**
 * INITIAL STATE
 */
const initState = {
    emails: [],
};

/**
 * ACTION CREATORS
 */
const getEmails = (emails) => ({
    type: GET_EMAILS,
    emails,
});

/**
 * THUNK CREATORS
 */
export const fetchEmails = () => async (dispatch) => {
    try {
        console.log('fetch!');
        const {data} = await axios.get('/api/email/emailHistory');
        console.log('data:', data);
        const action = getEmails(data);
        dispatch(action);
    } catch (e) {
        console.error(e);
    }
};

/**
 * REDUCER
 */
export default function (state = initState, action) {
    switch (action.type) {
        case GET_EMAILS:
            return {...state, emails: action.emails};

        default:
            return state;
    }
}
