import { headerNavReducer, initialHeaderNavState, setActiveLink } from './header-nav';

describe('Test reducer for Header Navigation', () => {
  it('should return the initial state Header Navigation', () => {
    expect(headerNavReducer({ ...initialHeaderNavState }, { type: undefined })).toEqual({
      ...initialHeaderNavState,
    });
  });

  it('should return the state with active link profile', () => {
    expect(headerNavReducer({ ...initialHeaderNavState }, setActiveLink('profile'))).toEqual({
      activeLink: 'profile',
    });
  });

  it('should return the state with active link feed', () => {
    expect(headerNavReducer({ ...initialHeaderNavState }, setActiveLink('feed'))).toEqual({
      activeLink: 'feed',
    });
  });
});
