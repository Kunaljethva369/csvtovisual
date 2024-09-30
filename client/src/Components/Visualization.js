import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

const Visualization = ({ csvData, selectedMetrics, chartType, xAxisKey }) => {
  // Function to truncate the x-axis labels
  const truncate = (str, length = 10) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  return (
    <div className="chart-container">
      {selectedMetrics.length > 0 && (
        <>
          <h2>Data Visualization</h2>
          {chartType === 'line' ? (
            <LineChart width={1500} height={400} data={csvData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey={xAxisKey}
                tickFormatter={(value) => truncate(value, 10)} // Customize truncation length as needed
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedMetrics.map((metric) => (
                <Line key={metric} type="monotone" dataKey={metric} stroke="#8884d8" />
              ))}
            </LineChart>
          ) : (
            <BarChart width={1500} height={400} data={csvData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey={xAxisKey}
                tickFormatter={(value) => truncate(value, 10)} // Customize truncation length as needed
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedMetrics.map((metric) => (
                <Bar key={metric} dataKey={metric} fill="#8884d8" />
              ))}
            </BarChart>
          )}
        </>
      )}
    </div>
  );
};

export default Visualization;
