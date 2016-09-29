import axios from 'axios';
import * as types from './action-types';

export default function storeFormInfo(formName, fields){
    console.log("HERE********", formName, fields)
	return {
		type:  types.FORM_SUBMITTED,
		formName: formName,
		payload: fields
	}
}
