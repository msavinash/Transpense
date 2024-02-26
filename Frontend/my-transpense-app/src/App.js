import './App.css';
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      <div className="mask"></div>
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <body>
        <HomePage/>
      </body>
    </div>
  );
}

export default App;
