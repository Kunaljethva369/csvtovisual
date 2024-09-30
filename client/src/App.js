import React,{ useState } from 'react';
import axios from 'axios';
import FileUpload from './Components/FileUpload';
import ChartSelector from './Components/ChartSelector';
import Visualization from './Components/Visualization';
import './App.css';

const App = () => {
  const [csvData,setCsvData] = useState([]);
  const [selectedMetrics,setSelectedMetrics] = useState([]);
  const [chartType,setChartType] = useState('line');
  const [loader,setLoader] = useState(false);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('csvfile',file);

    setLoader(true)

    const response = await axios.post('https://csvtovisual.vercel.app/api/upload',formData,{
      // const response = await axios.post('http://localhost:3001/api/upload',formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const cleanedData = cleanData(response.data);
    setCsvData(cleanedData);
    setSelectedMetrics(getAvailableMetrics(cleanedData));

    setLoader(false);
  };

  const cleanData = (data) => {
    return data
      .filter(row => row.Name)
      .map((row) => {
        const cleanedRow = { Name: row.Name };

        Object.keys(row).forEach((key) => {
          if (key !== 'Name' && !isNaN(row[key]) && row[key] !== '') {
            cleanedRow[key] = parseFloat(row[key]);
          }
        });
        return cleanedRow;
      });
  };

  const getAvailableMetrics = (data) => {
    const metrics = Object.keys(data[0] || {}).filter(key => key !== 'Name' && data.some(row => !isNaN(row[key])));
    return metrics;
  };

  return (
    <>
      <div className={loader ? 'loader' : 'loader hide'}>
        <img src="https://cdn.dribbble.com/users/1523313/screenshots/13671653/media/7c52f9d4b1117aa12f3bf9f9c3b9e1aa.gif"/>
      </div>
      <div className="container">
        <h1>Real-Time Data Visualization</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        {!loader && csvData.length > 0 && (
          <ChartSelector
            csvData={csvData}
            selectedMetrics={selectedMetrics}
            setSelectedMetrics={setSelectedMetrics}
            chartType={chartType}
            setChartType={setChartType}
          />
        )}
        {!loader && csvData.length > 0 && (
          <Visualization csvData={csvData} selectedMetrics={selectedMetrics} chartType={chartType} />
        )}
      </div>
    </>
  );
};

export default App;
