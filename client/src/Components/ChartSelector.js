import React from 'react';

const ChartSelector = ({ csvData,selectedMetrics,setSelectedMetrics,chartType,setChartType }) => {

  const handleMetricChange = (e) => {
    const value = e.target.value;
    if (selectedMetrics.includes(value)) {
      setSelectedMetrics(prev => prev.filter(metric => metric !== value));
    } else {
      setSelectedMetrics(prev => [...prev,value]);
    }
  };

  return (
    <div className="chart-selector">
      <div className="input-field">
        <label style={{alignSelf:"center"}} htmlFor="chartType">Select Chart Type</label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="dropdown"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      <div className="input-field">
        <label style={{alignSelf:"center"}}  >Select Metrics</label>
        {getAvailableMetrics(csvData).map((metric) => (
          <label key={metric} style={{ marginLeft: '10px',display: 'flex', gap:"5px", alignItems:"center" }}>
            <input
              type="checkbox"
              value={metric}
              checked={selectedMetrics.includes(metric)}
              onChange={handleMetricChange}
            />
            {metric}
          </label>
        ))}
      </div>
    </div>
  );
};

const getAvailableMetrics = (data) => {
  const metrics = Object.keys(data[0] || {}).filter(key => key !== 'Name' && data.some(row => !isNaN(row[key])));
  return metrics;
};

export default ChartSelector;
