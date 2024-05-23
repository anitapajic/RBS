
import { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = async (event: any) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8085/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } else {
      console.error('No file selected');
    }
  };
  
  return (
    <div className="App">
      
      <form className='form'>
        <h2 className='h2'>Happy hacking!</h2>
        <input className="input"
               type='file'
               placeholder='Enter here'
               onChange={handleFileChange}/>
        <button className='button'
                type='submit'
                onClick={handleClick}
                >
          Submit
        </button>

      </form>
    </div>
  );
}

export default App;
