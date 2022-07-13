import {
  initialMenuProfileState,
  menuProfileReducer,
  setActiveMenuProfileItem,
} from './menu-profile';

describe('Test reducer for Menu Profile', () => {
  it('should return the initial state Menu Profile', () => {
    expect(menuProfileReducer({ ...initialMenuProfileState }, { type: undefined })).toEqual({
      ...initialMenuProfileState,
    });
  });

  it('should return the state with active link profile', () => {
    expect(
      menuProfileReducer({ ...initialMenuProfileState }, setActiveMenuProfileItem('profile')),
    ).toEqual({
      activeItem: 'profile',
    });
  });

  it('should return the state with active link orders', () => {
    expect(
      menuProfileReducer({ ...initialMenuProfileState }, setActiveMenuProfileItem('orders')),
    ).toEqual({
      activeItem: 'orders',
    });
  });

  it('should return the state with active link logout', () => {
    expect(
      menuProfileReducer({ ...initialMenuProfileState }, setActiveMenuProfileItem('logout')),
    ).toEqual({
      activeItem: 'logout',
    });
  });
});
