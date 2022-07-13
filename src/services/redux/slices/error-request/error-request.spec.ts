import { errorMessageMock } from '../../../../utils/mocks';
import {
  clearError,
  errorRequestReducer,
  initialErrorRequestState,
  setError,
} from './error-request';

describe('Test reducer for Error App Modal', () => {
  it('should return the initial state Error App', () => {
    expect(errorRequestReducer({ ...initialErrorRequestState }, { type: undefined })).toEqual({
      ...initialErrorRequestState,
    });
  });

  it('should return the state with error message and open error modal', () => {
    expect(
      errorRequestReducer({ ...initialErrorRequestState }, setError(errorMessageMock)),
    ).toEqual({
      message: errorMessageMock,
      isError: true,
    });
  });

  it('should return the state with empty error message and close error modal', () => {
    expect(
      errorRequestReducer({ message: errorMessageMock, isError: true }, clearError()),
    ).toEqual({
      message: '',
      isError: false,
    });
  });
});
