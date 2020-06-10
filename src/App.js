// React
import React, { useState, useEffect } from 'react';

// API Calls
import axios from 'axios';

// Components
import Navigation from './Navigation';

function App() {

  // Online data from COVID-19 API
  const [onlineData, setOnlineData] = useState(
    JSON.parse(sessionStorage.getItem('localCoronaDataCache')) || 'Ładowanie');

  // Locally saved elements in browser's memory
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem('localUserData')) || []);

  // Loading state for button disabling
  const [isLoading, setLoading] = useState(true);

  // Alert handling
  const [alertOptions, setAlertOptions] = useState({ show: false, title: '', body: '', variant: 'danger' });

  // UseEffect for downloading the data every time the loading changes
  useEffect(() => {
    if (isLoading) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      axios.get('https://covid-193.p.rapidapi.com/statistics',
        { cancelToken: source.token, headers: { 'x-rapidapi-host': 'covid-193.p.rapidapi.com', 'x-rapidapi-key': process.env.REACT_APP_API_KEY } })
        .then(result => {
          let pulledData = result.data.response;
          pulledData = pulledData.map((element, index) => ({ ...element, country: element.country.replace(/-/g, ' '), id: generateId(index, element.country) }));
          setOnlineData(pulledData);
          setLoading(false);
        }).catch((thrown) => {
          if (axios.isCancel(thrown)) {
            displayAlert('Oh snap! You got an error!', thrown.message);
          } else {
            displayAlert('Oh snap! You got an error!', thrown.message === 'Network Error' ? 'Check your internet connection.\nAre you sure you have fresh internet?' : thrown.message);
          }
        }).finally(() => setLoading(false));

      setTimeout(() => {
        source.cancel('This operation was taking too long.\nCheck your internet connection and try again later.');
      }, 20000);
      
    }
  }, [isLoading]);

  // UseEffect for saving onlineData to sessionStorage every time onlineData changes
  useEffect(() => {
    sessionStorage.setItem('localCoronaDataCache', JSON.stringify(onlineData));
  }, [onlineData]);

  // UseEffect for saving localData to localStorage (not cleared after closing tab)
  // every time localData changes
  useEffect(() => {
    localStorage.setItem('localUserData', JSON.stringify(localData));
  }, [localData]);

  // Function for saving elements from onlineData to localData based on the ids.
  const saveLocalData = (props) => {
    const tmp = props.reduce((akum, element) => {
      const index = element.split('x')[0];
      const onlineElement = onlineData[+index];
      if (onlineElement.id === element) {
        return [...akum, onlineElement];
      }
      return akum;
    }, []);
    setLocalData([...localData, ...tmp]);
  }

  const overrideLocalData = (data) => setLocalData(data);

  const deleteFromLocal = (props) => {
    const newLocalData = localData.filter(element => !props.includes(element.id));
    setLocalData(newLocalData);
  }

  const clearLocalData = () => {
    setLocalData([]);
  }

  // Update localData elements info about cases
  const syncLocalData = () => {
    const ids = localData.reduce((akum, element) => [...akum, element.id], []);
    const syncedData = onlineData.filter(element => ids.includes(element.id));
    const mixedData = syncedData.reduce((akum, onlineElement) => {
      const localElement = localData.find(element => element.id === onlineElement.id);
      if (localElement.blockSync) return [...akum, localElement];
      return [...akum, { ...localElement, ...onlineElement }];
    }, []);
    const withLocalEntry = [...mixedData, ...localData.filter(element => element.localEntry)];
    setLocalData(withLocalEntry);
  }

  const displayAlert = (title, body) => {
    // Display alert when error
    setAlertOptions({show: true, title, body});
  }

  const fetchData = () => {
    setLoading(true);
  };

  // Props to pass forward, controls for localData
  const local = { localData, saveLocalData, deleteFromLocal, clearLocalData, syncLocalData, overrideLocalData };

  // Props to pass forward, controls for Alert
  const alert = { alertOptions, setAlertOptions, displayAlert };

  const navigationProps = { onlineData, isLoading, fetchData, local, alert };

  return (
    <div className="App">
      <Navigation {...navigationProps} />
    </div>
  );
}

// Id generation for every element based on the index in data
// and the sum of squared char codes of every char in name.
// This way I'm sure that the id is unique and if the order of the data
// will somehow change I won't override anything.
const generateId = (index, string) => {
  const stringHash = string.split("").reduce((akum, char) => akum + char.charCodeAt() ** 2, 0);
  const result = `${index}x${stringHash}`;
  return result;
}

export default App;
