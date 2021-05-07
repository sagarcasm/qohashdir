import axios from 'axios';
import { API_BASE_URL } from '../constants/applicationConstants';
import { URLLISTING } from '../constants/apiUrls';

const options = {
  headers: {'Content-type': 'application/json'}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDirectoryDetails: async (data) => {
    let responseArray = ["test"];
    try {
      await axios.post(API_BASE_URL+URLLISTING.GET_DIRECTORY_DETAILS, data, options )
      .then(res => {
        responseArray = res.data; 
      })
    } catch (error) {
      throw error;
    }
    return responseArray;
  },
  getFileList: async (data) => {
    let responseArray = ["test"];
    try {
      await axios.post(API_BASE_URL+URLLISTING.GET_FILES_LIST, data, options)
      .then(res => {
        responseArray = res.data;
      })
    } catch (error) {
      throw error;
    }
    return responseArray;
  }
};
