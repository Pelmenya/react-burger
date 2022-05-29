import { ProfileStateType } from "../slices/profile";

interface State {
  profile: ProfileStateType;
}

export const getProfileState = (state: State) => state.profile;