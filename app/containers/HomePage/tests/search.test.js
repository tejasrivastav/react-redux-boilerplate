import { search } from '../services/search';

describe('Search', () => {
  let posts = [];
  beforeEach(() => {
    posts = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat providentqui occaecati excepturi optio reprehenderit'
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse qui'
      }
    ];
  });

  it('for the keyword qui', () => {
    const result = search(posts, 'qui');
    const outcome = [
      {
        id: 1,
        indexes: [[34, 37]]
      },
      {
        id: 2,
        indexes: [[0, 3], [13, 16]]
      }
    ];
    expect(result).toEqual(outcome);
  });

  it('for the keyword max', () => {
    const result = search(posts, 'max');
    const outcome = [];
    expect(result).toEqual(outcome);
  });

  it('return for empty substring', () => {
    const result = search(posts, '');
    const outcome = [];
    expect(result).toEqual(outcome);
  });
});
