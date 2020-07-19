import { selectHome, makeSelectUsername, makeSelectTab } from '../selectors';

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
