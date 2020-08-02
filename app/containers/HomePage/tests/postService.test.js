import request from 'utils/request';
import postRequest from '../services/postRequest';

jest.mock('utils/request');

describe('Post service', () => {
  it('to make a request', () => {
    request.mockReturnValueOnce(Promise.resolve([]));
    postRequest();
    expect(request).toHaveBeenCalled();
  });

  it('transform values', () => {
    const mockResponse = [{ id: 3 }, { id: 5 }, { id: 15 }];
    request.mockReturnValueOnce(Promise.resolve(mockResponse));
    const result = [{ id: 3, category: ['thirds'] }, { id: 5, category: ['fifths'] }, { id: 15, category: ['thirds', 'fifths', 'magic'] }];
    return postRequest().then((data) => expect(data).toEqual(result));
  });

  it('to return [] om failure', () => {
    console.error = jest.fn();
    request.mockReturnValueOnce(Promise.reject());
    return postRequest().then((data) => {
      expect(console.error).toHaveBeenCalledTimes(1);
      return expect(data).toEqual([]);
    });
  });
});
