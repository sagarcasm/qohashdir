 /**
   * 
   * @param {*} bytes: filearray
   * @returns {*} 
   */
  export const sortData = (filesList) => {
    return filesList.sort((a, b) => {
      return b.size - a.size;
    });
  }