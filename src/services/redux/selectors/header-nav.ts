import { HeaderNavStateType } from '../slices/header-nav';

interface State {
  headerNav: HeaderNavStateType;
}

export const getHeaderNavState = (state: State) => state.headerNav;
