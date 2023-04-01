import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Wiki from './Page/Wiki';
import Main from './Page/Main';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';
import Data from './mocks/data';
function App() {
  const[currentWikiId,setCurrentWikiId] = useState(null)
  const[currentWiki,setCurrentWiki] = useState(Data)


  return (
    <div className="App">
      <BrowserRouter>
        <Header 
        title={currentWiki[currentWikiId]
        &&currentWiki[currentWikiId].title}
        />
        <Routes>
          <Route path="/" element={<Main data={currentWiki} setCurrentWiki={setCurrentWiki}
          setCurrentWikiId={setCurrentWikiId}  
          />}
          />
          <Route 
            path={`/doc/${currentWikiId}`} 
            element={<Wiki 
            data={currentWiki[currentWikiId]} 
            totalData={currentWiki}
            currentWikiId={currentWikiId}
            setCurrentWikiId={setCurrentWikiId}
            setCurrentWiki={setCurrentWiki}
            />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
