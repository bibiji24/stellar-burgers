import {
  expect,
  test,
  describe,
  jest
} from '@jest/globals';
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  TUserState,
  updateUserData,
  userSlice
} from './userSlice';
import { TUser } from '@utils-types';
import { userInitialState as initialState } from './userSlice' ;


const mockUser: TUser = {
  email: 'mail@mail.com',
  name: 'Name'
}

const mockState: TUserState = {
  user: mockUser,
  error: null,
  loaded: true
}

const { reducer } = userSlice;

afterAll(() => {
  jest.clearAllMocks();
})

describe('Test of userSlice', () => {
  test('Test of userAuthChecked', () => {
    const action = { type: userSlice.actions.userAuthChecked.type };
    const newState = reducer(initialState, action);
    expect(newState.loaded).toBe(true);
  })

  describe('test of getUserInfo', () => {
    test('Pending', () => {
      const action = { type: getUserInfo.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(false);
    });

    test('Rejected', () => {
      const action = { type: getUserInfo.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).not.toBeNull();
    });

    test('Fulfilled', () => {
      const action = {
        type: getUserInfo.fulfilled.type,
        payload: {
          user: mockUser
        }
      };
      const newState = reducer(initialState, action);
      expect(newState).toEqual(mockState);
    });
  });

  describe('Test of loginUser', () => {
    test('Pending', () => {
      const action = { type: loginUser.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(false);
    });

    test('Rejected', () => {
      const action = { type: loginUser.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).not.toBeNull();
    })

    test('Fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          user: mockUser
        }
      }
      const newState = reducer(initialState, action);
      expect(newState).toEqual(mockState);
    })
  });

  describe('Test of registerUser', () => {
    test('Pending', () => {
      const action = { type: registerUser.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(false);
    });

    test('Rejected', () => {
      const action = { type: registerUser.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).not.toBeNull();
    })

    test('Fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          user: mockUser
        }
      }
      const newState = reducer(initialState, action);
      expect(newState).toEqual(mockState);
    })
  });

  describe('Test of updateUserData', () => {
    test('Pending', () => {
      const action = { type: updateUserData.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(false);
    });

    test('Rejected', () => {
      const action = { type: updateUserData.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).not.toBeNull();
    })

    test('Fulfilled', () => {
      const action = {
        type: updateUserData.fulfilled.type,
        payload: {
          user: mockUser
        }
      }
      const newState = reducer(initialState, action);
      expect(newState).toEqual(mockState);
    })
  });

  describe('Test of logoutUser', () => {
    test('Pending', () => {
      const action = { type: logoutUser.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(false);
    });

    test('Rejected', () => {
      const action = { type: logoutUser.rejected.type, error: { message: 'Error' } };
      const newState = reducer(initialState, action);
      expect(newState.loaded).toBe(true);
      expect(newState.error).not.toBeNull();
    })

    test('Fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const newState = reducer(mockState, action);
      expect(newState).toEqual({...initialState, loaded: true});
    })
  });
});