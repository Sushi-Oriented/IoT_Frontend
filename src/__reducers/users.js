import { CONSTANTS,Auth } from "../api";
let PUSER = Auth.getAuthUser();


let initState = {
  data: [],
  dataList: [],
  dataRegistered: [],
  dataListRegistered: [],
  latest: {},
  pagination: {
    itemPerPage: 10,
    currentPage: 1,
    totalPage: 1,
  },
  searchValue: "",
  dataSearch: [],
};

export function users(state = initState, action) {
  //console.log(action)
  // let state = { ...state }
  switch (action.type) {
    case CONSTANTS.USER.LIST_SUCCESS:
    //   let count = 1;
      console.log(action.data.length, PUSER)

    //   for (let a = 0; a < data.length; a++) {
    //     if (data[a].id !== PUSER.uid && data[a].role !== "system") {
    //       listWithoutCurrentUser.push(data[a]);
    //     }
    //   }

      let UserData = [];
      for (let i = 0; i < action.data.length; i++) {
        if (action.data[i].id !== PUSER.uid && action.data[i].role !== "system") {
            console.log(action.data[i].id)
            UserData.push(action.data[i]);
          }
      }

      let _data = [];
      for (let i = 0; i < UserData.length; i++) {
        if (i < 10) {
          _data.push(UserData[i]);
        }
      }


    //   let __data = action.data.map((items) => {
    //     return { ...items, seq: count++ };
    //   });

      console.log(action.data,_data)
      return {
        ...state,
        data: UserData,
        dataList: _data,
        pagination: {
          itemPerPage: 10,
          currentPage: 1,
          totalPage: Math.ceil(
            UserData.length / state.pagination.itemPerPage
          )
        },
      };

      case CONSTANTS.USER.USERS_COUNT_CHANGE:
        state = { ...state }
        state.pagination.itemPerPage = action.result
        state.pagination.currentPage = 1
        state.pagination.totalPage = Math.ceil(state.data.length / action.result)

        state.dataList = []
        for (let i = 0; i < state.data.length; i++) {
            if (i < action.result) {
                state.dataList.push(state.data[i])
            }
        }

        state = {
            ...state
        };
        return state;

        case CONSTANTS.USER.USERS_PAGE_CHANGE:
      state = { ...state }
      state.pagination.currentPage = action.result

      state.dataList = []
      let _j = 0
      for (let i = ((action.result - 1) * state.pagination.itemPerPage); i < state.data.length; i++) {

        if (_j < state.pagination.itemPerPage) {
          state.dataList.push(state.data[i])
          _j++

        }
      }

      state = {
        ...state
      };
      return state;

    case CONSTANTS.CLEAR:
      return initState;
    default:
      return state;
  }
}
