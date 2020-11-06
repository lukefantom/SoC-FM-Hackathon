import soc from "./soc.png";
import "./App.css";
import Spotify from "./Spotify";

function App() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <img className="logo" src={soc} alt="soc" />
      </nav>
      <header className="App-header">
        <Spotify />
      </header>
    </div>
  );
}

export default App;
