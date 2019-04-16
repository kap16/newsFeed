import React from 'react';
import { shallow } from 'enzyme';
import initState from '../client/initState';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

// importing pages
import ConnectedLogin, { Login } from '../client/pages/login';
import ConnectedRegister, { Register } from '../client/pages/register';
import ConnectedHome, { Home } from '../client/pages/home';
import ConnectedSettings, { Settings } from '../client/pages/settings';
import ConnectedSources, { Sources } from '../client/pages/sources';
import ConnectedArticlePage, { ArticlePage } from '../client/pages/sources';
import ConnectedErrorPage, { ErrorPage } from '../client/pages/error';
const mockStore = configureStore();

describe('Unit - Page Routes', () => {
  describe('Login Page', () => {
    let component;
    beforeEach(()=>{
      component = shallow(<Login />);
    })

    it('Should render a main body', () => {
      expect(component.find('.main-body').length).toBe(1);
    })

    it('Should render a username field', () => {
      expect(component.find('#username').length).toBe(1);
    })

    it('Should render a password field', () => {
      expect(component.find('#password').length).toBe(1);
    })
  })

  describe('Register Page', () => {
    let component;
    beforeEach(()=>{
      component = shallow(<Register />);
    })

    it('Should render a main body', () => {
      const wrapper = component.find('.main-body');
      expect(wrapper.length).toBe(1);
    })

    it('Should render a username field', () => {
      expect(component.find('#username').length).toBe(1);
    })

    it('Should render a password field', () => {
      expect(component.find('#email').length).toBe(1);
    })

    it('Should render a password field', () => {
      expect(component.find('#password').length).toBe(1);
    })

    it('Should render a password field', () => {
      expect(component.find('#password-confirm').length).toBe(1);
    })
  })

  describe('Home Page', () => {

    let store, component;
    beforeEach(()=>{
      store = mockStore(initState);
      //component = shallow(<Home />);
      component = shallow(<Provider store={store}><ConnectedHome /></Provider>);
    })

    it('Should render a main body', () => {
      const wrapper = component.find('.main-body');
      expect(wrapper.length).toBe(1);
    })
  })

  describe('Settings Page', () => {

    let store, component;
    beforeEach(()=>{
      store = mockStore(initState);
      //component = shallow(<Settings/>);
      component = shallow(<Provider store={store}><ConnectedSettings/></Provider>);
    })

    it('Should render a main body', () => {
      const wrapper = component.find('.main-body');
      expect(wrapper.length).toBe(1);
    })
  })

  describe('Sources Page', () => {

    let store, component;
    beforeEach(()=>{
      store = mockStore(initState);
      //component = shallow(<Source />);
      component = shallow(<Provider store={store}><ConnectedSources/></Provider>);
    })

    it('Should render a main body', () => {
      const wrapper = component.find('.main-body');
      expect(wrapper.length).toBe(1);
    })
  })

  describe('Article Page', () => {

    let store, component;
    beforeEach(()=>{
      store = mockStore(initState);
      //component = shallow(<ArticlePage />);
      component = shallow(<Provider store={store}><ConnectedArticlePage /></Provider>);
    })

    it('Should render a main body', () => {
      const wrapper = component.find('.main-body');
      expect(wrapper.length).toBe(1);
    })
  })

  describe('Error Page', () => {
    
    let component;
    beforeEach(()=>{
      component = shallow(<ErrorPage />);
    })

    it('Should render a main body', () => {  
      const wrapper = component.find('.main-body');
      expect(wrapper.length).toBe(1);
    })
  })
})