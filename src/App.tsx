import React from 'react';
import './App.css';
import { FilterMessage, FilterMessageResponse, MessageType } from './types';
import { Tiers, Licenses } from './filter/GitlabReleaseFilter';

function App() {
  const [affected, setAffected] = React.useState(0);
  const [mode, setMode] = React.useState(Tiers.all);
  const [tier, setTier] = React.useState(Licenses.all);

  const filterRelease = React.useCallback(() => {
     chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      const message: FilterMessage = { 
        type: MessageType.FILTER_DOM, mode, tier 
      };

      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        message,
        (response: FilterMessageResponse) => {
          if (response) {
            setAffected(response?.count); 
          }
        });
    });
  }, [mode, tier]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Gitlab Feature Filter</h1>
        <label htmlFor="mode">Instance Mode:</label>
        <select id="mode" onChange={(ev) => {
          setMode(ev.target.value as Tiers);
        }}>
          {Object.values(Tiers).map((key:string) => (
            <option key={key} value={key as Tiers}>{key}</option>
          ))}
        </select>
        <label htmlFor="tier">Instance Tier:</label>
        <select id="tier" onChange={(ev) => {
          setTier(ev.target.value as Licenses);
        }}>
          {Object.values(Licenses).map((key:string) => (
            <option key={key} value={key as Licenses}>{key}</option>
          ))}
        </select>
        <p>Hidden features: {affected}</p>
        <button onClick={filterRelease}>Filter Features</button>
      </header>
    </div>
  );
}

export default App;
