const initialState = {
  data: {},
  dataUsers: [],
  statusData: 'loading',
  errorDataMessage: '',
  pagesNumber: 1,
  statusRedaction: '',
  errorRedactionMessage:'',
  statusDelete: '',
  errorDeleteMessage:''
}

export const REQUEST_DATA_LOADING = 'REQUEST_DATA_LOADING';
export const REQUEST_DATA_ERROR = 'REQUEST_DATA_ERROR';
export const REQUEST_DATA_SUCCES = 'REQUEST_DATA_SUCCES';
export const REQUEST_LIST_USERS = 'REQUEST_LIST_USERS';
export const TO_DO_STEP_PAGINATION = 'TO_DO_STEP_PAGINATION';
export const REQUEST_REDACTION_LOADING = 'REQUEST_REDACTION_LOADING';
export const REQUEST_REDACTION_ERROR = 'REQUEST_REDACTION_ERROR';
export const REQUEST_REDACTION_SUCCES = 'REQUEST_REDACTION_SUCCES';
export const REQUEST_REDACTION_USER = 'REQUEST_REDACTION_USER';
export const REQUEST_DELETE_LOADING = 'REQUEST_DELETE_LOADING';
export const REQUEST_DELETE_ERROR = 'REQUEST_DELETE_ERROR';
export const REQUEST_DELETE_SUCCES = 'REQUEST_DELETE_SUCCES';
export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const DELETE_STATUS_RESET = 'DELETE_STATUS_RESET';

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

export const requestRedactionLoading = () => {
  return {
    type: REQUEST_REDACTION_LOADING
  }
}

export const requestRedactionError = (value) => {
  return {
    type: REQUEST_REDACTION_ERROR,
    value
  }
}

export const requestRedactionSucces = (value) => {
  return {
    type: REQUEST_REDACTION_SUCCES,
    value
  }
}

export const requestRedactionUser = (value) => {
  return {
    type: REQUEST_REDACTION_USER,
    value
  }
}

export const requestDeleteLoading = () => {
  return {
    type: REQUEST_DELETE_LOADING
  }
}

export const requestDeleteError = (value) => {
  return {
    type: REQUEST_DELETE_ERROR,
    value
  }
}

export const requestDeleteSucces = (value) => {
  return {
    type: REQUEST_DELETE_SUCCES,
    value
  }
}

export const requestDeleteUser = (value) => {
  return {
    type: REQUEST_DELETE_USER,
    value
  }
}

export const  deleteStatusReset = () => {
  return {
    type: DELETE_STATUS_RESET
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
        data: action.value
      }
    case TO_DO_STEP_PAGINATION:
      return {
        ...state,
        pagesNumber: action.value,
        statusData: 'loading',
      }
    case REQUEST_REDACTION_LOADING:
      return {
        ...state,
        statusRedaction: 'loading'
      }
    case REQUEST_REDACTION_ERROR:
      return {
        ...state,
        statusRedaction: 'error',
        errorRedactionMessage: action.value
      }
    case REQUEST_REDACTION_SUCCES:
      const dataRedaction = {...state.data};
      dataRedaction.data[action.value.index] = {...dataRedaction.data[action.value.index], ...action.value.objectData}
      return {
        ...state,
        statusRedaction: 'succes',
        data: dataRedaction
      }
    case REQUEST_DELETE_LOADING:
      return {
        ...state,
        statusDelete: 'loading'
      }
    case REQUEST_DELETE_ERROR:
      return {
        ...state,
        statusDelete: 'error',
        errorDeleteMessage: action.value
      }
    case REQUEST_DELETE_SUCCES:
      return {
        ...state,
        statusDelete: 'succes'
      }
    case DELETE_STATUS_RESET:
      return {
        ...state,
        statusDelete: ''
      }
    default:
      return state;
  }
}