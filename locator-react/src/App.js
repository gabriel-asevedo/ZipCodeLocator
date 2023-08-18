import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [zipCode, setZipCode] = useState({});

  async function handleSearch() {
    //  01310930/json/

    if (input === '') {
      alert("Fill in some zip code!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setZipCode(response.data);
      setInput("");
    } catch {
      alert("..Error when fetching");
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Zip Code Finder</h1>

      <div className="containerInput">

        <input type="text" placeholder="Type your zip code:"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"></FiSearch>
        </button>

      </div>


      {Object.keys(zipCode).length > 0 && (
        <main className='main'>
          <h2>ZipCode: {zipCode.zipCode}</h2>
         
          <span>{zipCode.logradouro}</span>
          <span>Complement: {zipCode.complemento}</span>
          <span>{zipCode.bairro}</span>
          <span>{zipCode.localidade} - {zipCode.uf}</span>
        
        </main>
      )}


    </div>
  );
}

export default App;
