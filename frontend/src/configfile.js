// config.js

const configfile = {
    BASE_URL: process.env.REACT_APP_BACKEND_URL, // Default to local development URL if environment variable is not set
    UPLOAD_PRESET: process.env.UPLOAD_PRESET
  };
export default configfile;
