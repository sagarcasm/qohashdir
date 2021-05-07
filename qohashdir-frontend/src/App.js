//React imports
import React, {Component} from 'react';
import shortid  from 'shortid';

//Component imports
import {Search, Loading, Tooltip} from 'carbon-components-react';
import { Folder20, Document20  } from '@carbon/icons-react';
import { DonutChart } from "@carbon/charts-react";
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';

//CSS
import './App.scss';
import "@carbon/charts/styles.css";
import 'react-notifications/lib/notifications.css';

//API calls
import api from '../src/api/getDirectorylisting'

//utils
import { convertBytes } from './utils/bytetomemory';
import { getChartData } from './utils/convertChartData';
import { sortData } from './utils/sortingFunction';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      directory:'',
      loader: false,
      directoryStats: undefined,
      directoryFileList: undefined
    };
  }

  async getDirectoryDetails(){
    const { directory } = this.state;
    const payload = {
      directory,
    }
    try {
      const directoryStats = await api.getDirectoryDetails(payload);
      const directoryFileList = await api.getFileList(payload);
  
      this.setState({
        loader: false,
        directoryStats,
        directoryFileList
      }, ()=>{
        NotificationManager.success('Directory search successfull', 'Successful!', 5000);
      });
    }
    catch (err) {
      this.setState({
        loader: false,
      }, ()=>{
        NotificationManager.error('Oops something is wrong please try again!', 'Error!', 5000);
      });
      console.log(err);
    }
  }

  handleKeyDown = (e) => {
    const { directory } = this.state;
    if (e.key === 'Enter') {
      if (directory === '') {
        NotificationManager.warning('Please input the appropriate value in the search bar', 'Warning!', 5000);
      }
      else {
        this.setState({
          loader: true,
        }, ()=>{
          this.getDirectoryDetails();
        });
      }
    }
  }

  getDirectoryInput = (e) => {
    const directory = e.target.value;
    this.setState({
      directory: directory
    })
  }

  getNotification = (fileData) => {
    let notificationJsx = '';
    if (fileData.type === 'directory'){
      notificationJsx = (<>
        <p>File Type: Directory</p>
        <p>Total Size: {convertBytes(fileData.size)}</p>
        <p>Total number of Files: {fileData.totalFiles}</p>
        <p>Last Modified Time Files: {fileData.modifiedTime}</p>
        </>)
    }
    else {
      notificationJsx = (<>
      <p>File Type: Document</p>
      <p>File Size: {convertBytes(fileData.size)}</p>
      <p>Last Modified Time: {fileData.modifiedTime}</p>
      </>)
    }

    return notificationJsx;
  }

  render() {
    const { loader, directoryStats, directoryFileList } = this.state;
    let chartData = []; 
    let sortedDirFileList = []; 

    //get the data sanitised for charts and sorting
    if (directoryFileList){
      chartData = getChartData(directoryFileList);
       sortedDirFileList = sortData(directoryFileList);
    }
    
    const serarchProps = {
      size: 'lg',
      light: false,
      name: 'search',
      labelText:'Directory',
      placeholder: 'Please give the directory path here...',
      onChange: this.getDirectoryInput,
      onKeyDown: this.handleKeyDown,
      // defaultValue: '/Users/sagar.dwarkanath.sawant@ibm.com/Projects/qohash/qohashdir-backend/'
    }

    const tooltiprops = {
      align: 'center',
      direction: 'right',
      triggerText: 'Details'
    }

    const options = {
      "title": "Directory Stats",
      "resizable": true,
      "donut": {
        "center": {
          "label": "File/Directories Size"
        }
      },
      "height": "400px"
    };

    return (
      <>
      {
        //Loader for the API 
        loader ? (<Loading/>): <></>
      }
      <div className="bx--grid">
        <div className="bx--row">
          <h1 className="application-title">QohashDirectory Listing</h1>
            <Search 
            {...serarchProps}
            id="search-directory" />
            <div className='search-label'>
              <span className='search-label-text'>Please input the directory</span>
              <Tooltip className='search-label' {...tooltiprops} tooltipBodyId="tooltip-body">
              Please input the directory bellow with a trailing forward slash '/'. Example: /Users/Projects/qohash/qohashdir-backend/
              </Tooltip>
            </div>
        </div> {/*end of <div className="bx--row">*/}
        {
          (directoryStats && directoryFileList) ? 
          (
            <div className="bx--row data-section">
              <div className="bx--col">
                <h2 className="section-headings">Directory Structure</h2>
                <div className="bx--col">
                    {
                      sortedDirFileList.map((fileDir) => (
                        <div key={shortid.generate()}>
                          {
                            (fileDir.type === 'directory') ? (<Folder20 className='file-icons' aria-label="Folder"/>):(<Document20  className='file-icons' aria-label="Document"/>)
                          }
                          <span className="file-textname">{fileDir.name}</span>
                          <Tooltip {...tooltiprops} tooltipBodyId="tooltip-body">
                          {
                            this.getNotification(fileDir)
                          }
                          </Tooltip>
                        </div>
                      ))
                    }
                </div>
              </div>
              <div className="bx--col">
                <div className="bx--row">
                  <div className="bx--col">
                  <h2 className="section-headings">Directory/File Statistics</h2>
                    <DonutChart
                    data={chartData}
                    options={options}>
                    </DonutChart>
                    <br/>
                    <span className="section-headings-small section-margin">Total Size:</span> {convertBytes(directoryStats.totalSize)}
                  </div>
                  <div className="bx--col big-number">
                  <h2 className="section-headings">Files</h2>
                  <span className="section-headings-small">Total Files: </span> {directoryStats.totalFiles}
                  </div>
              </div>
              </div>
            </div>
          ):<></>
        }
        <NotificationContainer />
      </div>{/*end of  <div className="bx--grid">*/}
      </>
    )
  }
}

export default App;
