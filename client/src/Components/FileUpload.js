import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  // Validate the uploaded file
  const validateFile = (file) => {
    if (file && file.type === 'text/csv') {
      setFile(file);
    } else {
      setFile(null);
      toast.error('Only CSV files are allowed!');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
    } else {
      toast.error('Please select a CSV file to start visualization!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        <button type="submit" style={styles.button}>
          Start Visualization
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

const styles = {
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default FileUpload;
