import axios from 'axios';
import { toastr } from 'react-redux-toastr';

/**
 * ACTION TYPES
 */
const GET_ADDRESSES = 'GET_ADDRESSES';

/**
 * INITIAL STATE
 */
const initState = {
  addresses: [],
  isLoading: true,
};

/**
 * ACTION CREATORS
 */
const getAddresses = (addresses) => ({
  type: GET_ADDRESSES,
  addresses,
});

/**
 * THUNK CREATORS
 */
export const fetchAddresses = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/addresses/all-addresses');
    const action = getAddresses(data);
    dispatch(action);
  } catch (e) {
    console.error(e);
  }
};

export const addNewAddressThunk = (values) => async (dispatch) => {
  try {
    const { data: newAddress } = await axios.post('/api/addresses/new', { values });
    if (newAddress) {
      toastr.success('', 'Address successfully added.');
      dispatch(fetchAddresses());
    }
  } catch (e) {
    toastr.error('', e);
    console.error(e);
  }
};

/**
 * REDUCER
 */
export default function (state = initState, action) {
  switch (action.type) {
    case GET_ADDRESSES:
      return { ...state, isLoading: false, addresses: action.addresses };
    default:
      return state;
  }
}

/**
 * SELECTORS
 */
export const getAllAddresses = (state) => state.address.addresses;
export const getAddressesIsLoading = (state) => state.address.isLoading;
