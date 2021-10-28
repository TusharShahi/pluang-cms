import * as actionTypes from './actions';

type ActionTypesProps = {
  type: string,
  payload: {
    [key: string]: string
  }
};

type StateTypeProps = {
  [key: string]: string | number | object | []
};

const reducer = (state: StateTypeProps, action: ActionTypesProps) => {
  switch (action.type) {
    case actionTypes.USER_DETAILS:
        return ({
          ...state,
          user: action.payload.user
        });
    default:
      return state; 
    }
};

export default reducer;