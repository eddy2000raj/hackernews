const initialState = {
  data: []
};

export default function newsApp(state = initialState, action) {

  switch (action.type) {

    case "INIT":
        return initialState
    
    case "FETCH_DATA_PENDING":
        return {
          ...state,loading:true
        }
    case "FETCH_DATA_SUCCESS":
        return {
        ...state,data:action.payload
        }

    case "FETCH_DATA_ERROR":
      return {
        ...state,error: action.error
      }
    default:
      return state;
  }

}