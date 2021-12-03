import { actionTypes } from './actions';

const INITIAL_STATE = {
  modalRef: {},
};

export default (state = INITIAL_STATE, action) => {
  const { tradeType, modalRef } = action;
  // const { drawerRef } = state;
  switch (action.type) {
    case actionTypes.SET_MODAL_REF:
      return {
        ...state,
        modalRef,
      };
    default:
      return state;
  }
};
