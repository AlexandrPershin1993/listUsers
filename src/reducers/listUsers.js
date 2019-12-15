const initialState = {
  data: {},
  statusData: 'loading',
  errorDataMessage: "",
  pagesNumber: 1
}

export const REQUEST_DATA_LOADING = 'REQUEST_DATA_LOADING';
export const REQUEST_DATA_ERROR = 'REQUEST_DATA_ERROR';
export const REQUEST_DATA_SUCCES = 'REQUEST_DATA_SUCCES';
export const REQUEST_LIST_USERS = 'REQUEST_LIST_USERS';
export const TO_DO_STEP_PAGINATION = 'TO_DO_STEP_PAGINATION';

export const requestDataLoading = () => {
  return {
    type: REQUEST_DATA_LOADING
  }
}

export const requestDataError = (value) => {
  return {
    type: REQUEST_DATA_ERROR,
    value
  }
}

export const requestDataSucces = (value) => {
  return {
    type: REQUEST_DATA_SUCCES,
    value
  }
}

export const requestListUsers = (value) => {
    return {
      type: REQUEST_LIST_USERS,
      value
    }
  }

export const toDoStepPagination = (value) => {
  return {
    type: TO_DO_STEP_PAGINATION,
    value
  }
}

export default function listUsers(state = initialState, action){
  switch(action.type){
    case REQUEST_DATA_LOADING:
      return {
        ...state,
        statusData: 'loading'
      }
    case REQUEST_DATA_ERROR:
      return {
        ...state,
        statusData: 'error',
        errorDataMessage: action.value
      }
    case REQUEST_DATA_SUCCES:
      return {
        ...state,
        statusData: 'succes',
        data: {
          ...state.data,
          [state.pagesNumber]: action.value
        }
      }
    case TO_DO_STEP_PAGINATION:
      return {
        ...state,
        pagesNumber: action.value.value,
        statusData: (action.value.cache === false) ? 'loading' : 'succes',
      }
    default:
      return state;
  }
}