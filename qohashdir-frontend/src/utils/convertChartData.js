 /**
   * 
   * @param {*} bytes: integer
   * @returns {*} 
   */
  export const getChartData = (filesList) => {
    let chartData = [];
    
    filesList.forEach((file)=>{
      let fileData = {};
      fileData.group = file.name;
      fileData.value = Number(file.size);
      chartData.push(fileData)
    })
    return chartData;
  }