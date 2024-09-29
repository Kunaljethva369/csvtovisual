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

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('csvfile',file);

    const response = await axios.post('https://csvtovisual.vercel.app/upload',formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const cleanedData = cleanData(response.data);
    setCsvData(cleanedData);
    setSelectedMetrics(getAvailableMetrics(cleanedData));
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
    <div className="container">
      <h1>Real-Time Data Visualization</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {csvData.length > 0 && (
        <ChartSelector
          csvData={csvData}
          selectedMetrics={selectedMetrics}
          setSelectedMetrics={setSelectedMetrics}
          chartType={chartType}
          setChartType={setChartType}
        />
      )}
      {csvData.length > 0 && (
        <Visualization csvData={csvData} selectedMetrics={selectedMetrics} chartType={chartType} />
      )}
    </div>
  );
};

export default App;
