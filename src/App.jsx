import { useEffect, useState } from 'react';
import './App.css';
import ArtCard from './components/ArtCard';
import BanList from './components/BanList';

function App() {
  const [currentArt, setCurrentArt] = useState(null);
  const [banned, setBanned] = useState([]);
  const [error, setError] = useState(null);

  const isBanned = (art) => {
    return (
      banned.includes(art.artistDisplayName) ||
      banned.includes(art.culture) ||
      banned.includes(art.medium) ||
      banned.includes(art.period) ||
      banned.includes(art.objectName)

    )
  };

  const fetchRandomArt = async () => {
    try{
      setError(null);
      const searchRes = await fetch(

        'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting'

      );
    
    const data = await searchRes.json();
    const ids = data.objectIDs;

    if (!ids || ids.length === 0) {
      setError('No art found for this query.');
      return;
    }

    for (let i=0; i<20;i++){
      const randomId = ids[Math.floor(Math.random()*ids.length)];
      const res = await fetch (
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
      );

      const art = await res.json();

      if (art.primaryImageSmall &&
        art.title && !isBanned(art)){
        setCurrentArt(art);
        return;
      }

    }

    setError('No matching results found. Try changing ban list')
  }
  catch (err) {
    setError('Failed to fetch art')
  }
  };

  const toggleBan = (value) => {
    setBanned((prev)=> {

      if(prev.includes(value)){
        return prev.filter((v)=> v !== value);
      } 
      else{
        return [...prev, value]
      }

    }
    
    );

  };

  return (

    <div className = "App">
      <h1>Discover Museum Art</h1>
      <p>Click on discover button to discover more. You can also ban 
        any attributes to filter your search</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      
      <ArtCard art={currentArt} onAttributeClick={toggleBan}/>
      <button className="discover-button" onClick={fetchRandomArt}>
        Discover!
      </button>

      <BanList bannedItems={banned} onUnban={toggleBan}/>
      

    </div>


  );

};

export default App
