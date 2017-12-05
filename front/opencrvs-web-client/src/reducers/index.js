/*
 * @Author: Euan Millar 
 * @Date: 2017-07-05 01:17:18 
 * @Last Modified by: Euan Millar
 * @Last Modified time: 2017-08-14 15:03:08
 */
import { combineReducers } from 'redux';
import declarationsReducer from './declarations-reducer';
import userReducer from './user-reducer';
import imageReducer from './image-reducer';
import patientsReducer from './patients-reducer';
import managerReducer from './manager-reducer';
import globalReducer from './global-reducer';
import importReducer from './import-reducer';
import certificationReducer from './certification-reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  declarationsReducer,
  userReducer,
  imageReducer,
  patientsReducer,
  globalReducer,
  certificationReducer,
  managerReducer,
  importReducer,
  form: formReducer,
});
