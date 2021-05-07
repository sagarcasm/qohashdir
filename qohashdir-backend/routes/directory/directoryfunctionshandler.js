//imports
const fs = require("fs")
const path = require("path")

class DirectoryFunctions {

  constructor() {}

  /**
   * 
   * @param {*} req 
   * @param {*} req.bodydirecotry url | required | string
   * @returns 
   */
  async getdirectoryDetails(req) {
    let res = {};
    if (req && req.body && req.body.directory){
      const directoryUrl = req.body.directory;
      if (fs.statSync(directoryUrl).isDirectory()){
        let directoryData = this.getTotalSizeofDir(directoryUrl);
        return directoryData;
      }
      else {
        console.log('Directory not foound')
        return {
          status: 400,
          message: 'Directory not foound'
        };
      }
    }
    else {
      console.log('Directory not found');
      return {
        status: 400,
        message: 'Bad request. No Body params found'
      };
    }
  }

  /**
   * 
   * @param {*} dirpath:string | required 
   * @param {*} fileArray: array ['strings] 
   * @param {*} fileCount: Integer
   * @returns 
   */
  getRecursiveAllFiles(dirPath, fileArray = [], fileCount = 0) {
    //read all the files forma  directory
    let files = fs.readdirSync(dirPath);
    let arrayOfFiles = fileArray || [];
    let totalfileCount = fileCount || 0;

    files.forEach(file => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = this.getRecursiveAllFiles(dirPath + "/" + file, arrayOfFiles, totalfileCount);
      } else {
        totalfileCount += 1;
        arrayOfFiles.push(path.join(dirPath, file))
      }
    })
    return arrayOfFiles;
  }

  /**
   * 
   * @param {*} bytes: interger
   * @returns {*} 
   * Can be used here or either moved to Frontend 
   * Since backend should only worry about Logic (Alredy moved)
   */
  convertBytes(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes == 0) {
      return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    if (i == 0) {
      return bytes + " " + sizes[i]
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
  }

  /**
   * 
   * @param {*} dirpath: String
   * @returns {*} 
   */
  getTotalSizeofDir(dirpath){
    let directoryData = {
      totalSize : 0,
      totalFiles: 0
    }
    //get all the file in a array
    const fileArray = this.getRecursiveAllFiles(dirpath);
    directoryData.totalFiles = fileArray.length;

    fileArray.forEach((filePath) =>{
      directoryData.totalSize += fs.statSync(filePath).size
    })
    return directoryData;
  }

  /**
   * 
   * @param {*} req: object
   * @param {*} reqbody.directoy:string | required
   * @returns {*} 
   */
  getAllFilesListDetails(req) {
    
    if (req && req.body && req.body.directory){
      const dirPath = req.body.directory;
      let files = fs.readdirSync(dirPath);
      let fileListObject = [];

      files.forEach(file => {
        let fileData = {};
        let isSymbLink = false;
        fileData.name = file;

        fs.lstat(file, function(err, fileStats) {
          try {
            if(fileStats.isSymbolicLink()){
              isSymbLink = true;
            }
          } catch (error) {
            console.log(error);
            console.log("Dangling Symblink", dirPath+file, err);
            isSymbLink = true;
            return {
              status: 400,
              message: 'Something is wrong in the backend'
            };
          }
        });

        if (isSymbLink !== true) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            fileData.type = 'directory';
            let directoryData = this.getTotalSizeofDir(dirPath + file);
            fileData.size = directoryData.totalSize;
            fileData.totalFiles = directoryData.totalFiles;
          } else {
            fileData.type = 'file';
            fileData.size = fs.statSync(dirPath + file).size;
          }
        } else {
          console.log("Found Symbolic links", file );
        }
        fileData.modifiedTime = fs.statSync(dirPath + file).mtime;
        fileListObject.push(fileData);
      })
      return fileListObject;
    }
    else {
      return {
        status: 400,
        message: 'Bad request. No Body params found'
      };
    }

    
  }
}

module.exports = DirectoryFunctions;