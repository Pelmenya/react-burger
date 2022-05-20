import { MenuProfileStateType } from "../slices/menu-profile";

interface State {
  menuProfile: MenuProfileStateType;
}

export const getMenuProfileState = (state: State) => state.menuProfile;