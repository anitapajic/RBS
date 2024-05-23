
import { useState } from 'react';
import './App.css';
import Service from './service/Service';



function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await Service.submit(inputValue);
  };
  
  return (
    <div className="App">
      
      <form className='form'>
        <h2 className='h2'>Happy hacking!</h2>
        <input className="input"
               type='text'
               placeholder='Enter here'
               value={inputValue}
               onChange={handleInputChange}/>
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
