import React from 'react';
import { shallow } from 'enzyme';

import ReloadIcon from '../index';

describe('<ReloadIcon />', () => {
  it('should render a SVG', () => {
    const renderedComponent = shallow(<ReloadIcon />);
    expect(renderedComponent.find('svg').length).toBe(1);
  });
});
