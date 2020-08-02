import {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
  makeSelectLocation,
  makeSelectCategories
} from '../selectors';

import posts from './__mocks__/mockPosts';

const categories = [
  'thirds',
  'fifths',
  'magic'
];

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentUser', () => {
  const currentUserSelector = makeSelectCurrentUser();
  it('should select the current user', () => {
    const username = 'flexdinesh';
    const mockedState = {
      global: {
        currentUser: username,
      },
    };
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectPosts', () => {
  const mockPosts = posts;
  const postsSelector = makeSelectPosts();

  it('shouldnt select post without category', () => {
    const mockedState = {
      global: {
        posts: [
          {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
          },
          {
            userId: 1,
            id: 2,
            title: 'qui est esse',
            body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
          }
        ],
        categoriesName: categories
      },
      home: {
        activeIndex: 0,
        deletedPosts: [],
        query: '',
        searchResults: []
      }
    };
    expect(postsSelector(mockedState)).toEqual([]);
  });

  describe('to return', () => {
    it('thirds posts only', () => {
      const mockedState = {
        global: {
          posts: mockPosts,
          categoriesName: [
            'thirds',
            'fifths',
            'magic'
          ]
        },
        home: {
          activeIndex: 0,
          deletedPosts: [],
          query: '',
          searchResults: []
        }
      };
      expect(postsSelector(mockedState).length).toEqual(6);
    });

    it('fifths posts only', () => {
      const mockedState = {
        global: {
          posts: mockPosts,
          categoriesName: [
            'thirds',
            'fifths',
            'magic'
          ]
        },
        home: {
          activeIndex: 1,
          deletedPosts: [],
          query: '',
          searchResults: []
        }
      };
      expect(postsSelector(mockedState).length).toEqual(4);
    });

    it('magic posts only', () => {
      const mockedState = {
        global: {
          posts: mockPosts,
          categoriesName: [
            'thirds',
            'fifths',
            'magic'
          ]
        },
        home: {
          activeIndex: 1,
          deletedPosts: [],
          query: '',
          searchResults: []
        }
      };
      expect(postsSelector(mockedState).length).toEqual(4);
    });
  });

  it('should filter based on query criteria', () => {
    const mockedState = {
      global: {
        posts: mockPosts,
        categoriesName: categories
      },
      home: {
        activeIndex: 0,
        deletedPosts: [],
        query: 'dolo',
        searchResults: []
      }
    };
    expect(postsSelector(mockedState)).toEqual([]);
  });

  it('should return searched posts only', () => {
    const mockedState = {
      global: {
        posts: mockPosts,
        categoriesName: categories
      },
      home: {
        activeIndex: 0,
        deletedPosts: [],
        query: 'dolo',
        searchResults: [{ id: 6 }]
      }
    };
    expect(postsSelector(mockedState).length).toEqual(1);
  });

  it('shouldnt return deleted posts', () => {
    const mockedState = {
      global: {
        posts: mockPosts,
        categoriesName: categories
      },
      home: {
        activeIndex: 0,
        deletedPosts: [6],
        query: 'dolo',
        searchResults: [{ id: 6 }]
      }
    };
    expect(postsSelector(mockedState).length).toEqual(0);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});

describe('makeSelectCategories', () => {
  const categoriesSelector = makeSelectCategories();
  it('should select the location', () => {
    const mockedState = {
      global: {
        categoriesName: categories
      },
    };
    expect(categoriesSelector(mockedState)).toEqual(categories);
  });
});
