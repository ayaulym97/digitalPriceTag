const initialState = {
  vendorCode: '',
  launched: false,
};
const permanentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PERMANENT':
      return {
        ...state,
        [action.fieldName]: action.value,
      };

    default:
      return state;
  }
};
export default permanentReducer;
