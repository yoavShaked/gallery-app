import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import GalleryMain from './GalleryMain';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <GalleryMain/>,
      {attachTo: document.createElement('div')}
    );
  });

  afterEach(() => wrapper.detach());

  it('renders a title correctly', () => {
    expect(wrapper.find('h2').length).to.eq(1);
  });

  it('renders the search input correctly', () => {
    expect(wrapper.find('input').length).to.eq(1);
  });

  it('sets the tag correctly', done => {
    wrapper.setState({
      tag: 'test1'
    }, () => {
      expect(wrapper.find('input').prop('value')).to.eq('test1');
      done();
    });
  });
});
