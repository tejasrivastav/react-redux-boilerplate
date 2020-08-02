import {
  selectHome, makeSelectUsername, makeSelectTab, makeSelectQuery, makeSelectSearchResults
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = {
      userData: {},
    };
    const mockedState = {
      home: homeState,
    };
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'flexdinesh';
    const mockedState = {
      home: {
        username,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectTab', () => {
  const tabSelector = makeSelectTab();
  it('should select the active tab', () => {
    const activeIndex = 0;
    const mockedState = {
      home: {
        activeIndex,
      },
    };
    expect(tabSelector(mockedState)).toEqual(activeIndex);
  });
});

describe('makeSelectQuery', () => {
  const querySelector = makeSelectQuery();
  it('should select the current query', () => {
    const query = 0;
    const mockedState = {
      home: {
        query,
      },
    };
    expect(querySelector(mockedState)).toEqual(query);
  });
});

describe('makeSelectSearchResults', () => {
  const resultsSelector = makeSelectSearchResults();
  it('should select the current query', () => {
    const searchResults = [
      {
        id: 1,
        indexes: [0, 5]
      }
    ];
    const mockedState = {
      home: {
        searchResults,
      },
    };
    expect(resultsSelector(mockedState)).toEqual(searchResults);
  });
});
