import './App.css';
import { useState, useEffect} from 'react';
import * as d3 from 'd3';
import Diagram from './Diagram';


function App() {
    const [gamesData, setGamesData] = useState([])
    const gamesURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
    const width = 1200;
    const height = 800;

    useEffect(()=> {
      fetch(gamesURL)
        .then(response => response.json())
        .then(data => setGamesData(data))
    },[])

  return (
    <div className="main--container">
      <h1 id='title'>Video Game Sales</h1>
      <p id='description'>Top 100 Most Sold Video Games Grouped by Platform</p>
      <Diagram
        values={gamesData}
        width={width}
        height={height}
      />
    </div>
  );
}

export default App;
