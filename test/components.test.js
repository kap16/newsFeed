import React from 'react';
import { shallow } from 'enzyme';
import initState from '../client/initState';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// importing pages
import Modal from '../client/components/modal/modal';
const mockStore = configureStore();

describe('Unit - Components', () => {
  describe('Modal', () => {

    let component;
    beforeEach(()=>{
      component = shallow(<Modal modalText={"Cool"}/>);
    })

    it('Should render a modal backdrop', () => {
      console.log(component.debug())
      expect(component.find('.modal-backdrop').length).toBe(1);
    })

    it('Should render the modal content', () => {
      expect(component.find('.modal-content').length).toBe(1);
    })

    it('Should render the modal header', () => {
      expect(component.find('.modal-header').length).toBe(1);
    })

    it('Should render the modal body', () => {
      expect(component.find('.modal-body').length).toBe(1);
    })

    it('Should render the modal footer', () => {
      expect(component.find('.modal-footer').length).toBe(1);
    })
    
  })
})