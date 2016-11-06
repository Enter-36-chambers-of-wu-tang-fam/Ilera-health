// Use for JWT Tokens!

//This file is to set the JWT token on every Axios request
//Due to this setting CORS conflicts will occur, so for external queries utilize superagent 

/*
import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    const instance = axios.create();
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
*/