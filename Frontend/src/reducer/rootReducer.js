const rootReducer = (state, action) => {
  switch (action.type) {
    case 'admin':{
      state.isadmin=action.payload.dataadmin
      state.userid=action.payload.dataid
      return {...state}
    }
    case 'owner':{
      state.isowner=action.payload.dataowner
      state.userid=action.payload.dataid
      return {...state}
    }
    case 'user':{
      state.isuser=action.payload.dataname
      state.userid=action.payload.dataid
      return {...state}
    }
    default:{
      return {...state}
    }
  }
};

export default rootReducer;