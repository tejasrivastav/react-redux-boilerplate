import React from 'react';
import { shallow } from 'enzyme';

import DelteIcon from '../index';

describe('<DelteIcon />', () => {
  it('should render a SVG', () => {
    const renderedComponent = shallow(<DelteIcon />);
    expect(renderedComponent.find('svg').length).toBe(1);
  });
});
