import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

const Visualization = ({ csvData, selectedMetrics, chartType }) => {
  return (
    <div className="chart-container">
      {selectedMetrics.length > 0 && (
        <>
          <h2>Data Visualization</h2>
          {chartType === 'line' ? (
            <LineChart width={1000} height={400} data={csvData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedMetrics.map((metric) => (
                <Line key={metric} type="monotone" dataKey={metric} stroke="#8884d8" />
              ))}
            </LineChart>
          ) : (
            <BarChart width={1000} height={400} data={csvData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="Name" />
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
