

import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";
//import { render, screen } from '@testing-library/react';

import Login from './components/login'
import Register from '/components/register';
import Book from './components/booking';



describe.only("Snapshot testing for App",()=>{
    it("testing",()=>{
      const component=renderer.create(<App/>)
      const tree= component.toJSON()
      
      expect(tree).toMatchSnapshot()
  
    })
  })
  


describe('Testing Login component', () => {
    test('contactNo check', () => {
        const wrapper = shallow(<Login />);
        const findContactNo = wrapper.find('TextField[type="number"]');
        findContactNo.simulate('change', {target: {name: 'contactNo', value: '9098765432'}});
        expect(wrapper.state('contactNo')).toEqual('9098765432');
    })

    test('password check', () => {
        const wrapper = shallow(<Login />);
        const findpassword = wrapper.find('TextField[type="password"]');
        findpassword.simulate('change', {target: {name: 'password', value: 'Abc@1234'}});
        expect(wrapper.state('password')).toEqual('Abc@1234');
    })

    test('login check with correct login data', () => {
        const wrapper = shallow(<Login />);
        const findContactNo = wrapper.find('TextField[type="number"]');
        findContactNo.simulate('change', {target: {name: 'contactNo', value: '9098765432'}});
        const findpassword = wrapper.find('TextField[type="password"]');
        findpassword.simulate('change', {target: {name: 'password', value: 'Abc@1234'}});
        const findButton = wrapper.find('Button');
        findButton.simulate('click');
        expect(wrapper.state('isLoggedIn')).toBe(true);
    })

    test('login check with wrong login data', () => {
        const wrapper = shallow(<Login />);
        const findContactNo = wrapper.find('TextField[type="number"]');
        findContactNo.simulate('change', {target: {name: 'contactNo', value: '9098765432'}});
        const findpassword = wrapper.find('TextField[type="password"]');
        findpassword.simulate('change', {target: {name: 'password', value: 'Abc@1235'}});
        const findButton = wrapper.find('Button');
        findButton.simulate('click');
        expect(wrapper.state('isLoggedIn')).toBe(false);
    })
})
//register
describe('Testing Register component', () => {

  test('name check', () => {
      const wrapper= shallow(<Register />);
      const findName = wrapper.find('TextField[type="text"]');
      findName.simulate('change', {target: {name: 'name', value: ''}});
      expect(wrapper.state('name')).toEqual('');
  })
 
  test('emailId check', () => {
      const wrapper= shallow(<Register />);
      const findEmailId = wrapper.find('TextField[type="text"]');
      findEmailId.simulate('change', {target: {name: 'emailId', value: ''}});
      expect(wrapper.state('emailId')).toEqual('');
  })

  test('contactNo check', () => {
      const wrapper= shallow(<Register />);
      const findContactNo = wrapper.find('TextField[type="number"]');
      findContactNo.simulate('change', {target: {name: 'contactNo', value: ''}});
      expect(wrapper.state('contactNo')).toEqual('');
  })

  test('password check', () => {
      const wrapper= shallow(<Register />);
      const findpassword = wrapper.find('TextField[type="password"]');
      findpassword.simulate('change', {target: {name: 'password', value: ''}});
      expect(wrapper.state('password')).toEqual('');
  })
  
  
  test('Registered user check with correct data', () => {
      const wrapper= shallow(<Register />);
      const findName = wrapper.find('TextField[type="text"]');
      findName.simulate('change', {target: {name: 'name', value: ''}});
      const findEmailId = wrapper.find('TextField[type="text"]');
      findEmailId.simulate('change', {target: {name: 'emailId', value: ''}});
      const findContactNo = wrapper.find('TextField[type="number"]');
      findContactNo.simulate('change', {target: {name: 'contactNo', value: ''}});
      const findpassword = wrapper.find('TextField[type="password"]');
      findpassword.simulate('change', {target: {name: 'password', value: ''}});
      const findButton = wrapper.find('TextField[type="submit"]');
      findButton.simulate('click');
      expect(wrapper.state('isRegistered')).toBe(true);
  })

  
  

})    
//booking
describe('Testing book component', () => {

    test('noOfPassengers check', () => {
        const wrapper= shallow(<Book />);
        const findNoOfPassengers = wrapper.find('TextField[type="number"]');
        findNoOfPassengers.simulate('change', {target: {name: 'noOfPassengers', value: ''}});
        expect(wrapper.state('noOfPassengers')).toEqual('');
    })

    test('tripStartDate check', () => {
        const wrapper= shallow(<Book />);
        const findTripStartDate = wrapper.find('TextField[type="date"]');
        findTripStartDate.simulate('change', {target: {name: 'tripStartDate', value: ''}});
        expect(wrapper.state('tripStartDate')).toEqual('');
    })

    test('includeFlights check', () => {
        const wrapper= shallow(<Book />);
        const findIncludeFlights = wrapper.find('TextField[type="checkbox"]');
        findIncludeFlights.simulate('change', {target: {name: 'includeFlights', value: ''}});
        expect(wrapper.state('includeFlights')).toEqual('');
    })
 
    
    test('Booking check with correct data', () => {
        const wrapper= shallow(<Book />);
        const findNoOfPassengers = wrapper.find('TextField[type="number"]');
        findNoOfPassengers.simulate('change', {target: {name: 'noOfPassengers', value: ''}});
        const findTripStartDate = wrapper.find('TextField[type="date"]');
        findTripStartDate.simulate('change', {target: {name: 'tripStartDate', value: ''}});
        const findIncludeFlights = wrapper.find('TextField[type="checkbox"]');
        findIncludeFlights.simulate('change', {target: {name: 'includeFlights', value: ''}});
        const findButton = wrapper.find('TextField[type="submit"]');
        findButton.simulate('click');
        expect(wrapper.state('isBooked')).toBe(true);
    })

    
    

    
    test('renders correctly', () => {
        const tree = renderer.create(<Book />).toJSON();
        expect(tree).toMatchSnapshot();
      });
})