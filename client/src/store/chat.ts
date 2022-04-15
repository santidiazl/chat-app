const ADD_ONLINE_USER = 'ADD_ONLINE_USER';

export const addOnlineUser = (id: number) => ({
  type: ADD_ONLINE_USER,
  id,
});

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case ADD_ONLINE_USER: {
//       return addOnlineUserToStore(state, action.id);
//     }
//     default:
//       return state;
//   }
// };
