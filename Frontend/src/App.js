import React, { useState } from 'react';
import './App.css';
import Post from "./Post";

const App = () => {
  const [linku, setLinku] = useState("");
  const [lista, setLista] = useState([]);
  const [kaItem, setKaItem] = useState(false);

  const submit = async() => {
    let apicall = await fetch("http://localhost:3000/",{
      method: "post",
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "linku": linku
      })
    })
    let response = await apicall.json();

    if(response.success === true){
      setLista([]);
      setLista(response.lista);
      setKaItem(true);
    }else{
      setKaItem(false);
    }
  }

  return (
    <div className="App">
      <h5 className="Title">Instagram Downloader</h5>
      <input className="Inputi" value={linku} onChange={(e) => setLinku(e.target.value)} type="url" placeholder="Type the URL here..." />
      <button className="Buttoni" onClick={() => submit()}>Submit</button>
      <div className="InstaPostsBox">
      {
        kaItem ?
        lista.map((item,i) => {
          return(
          <Post key={i} item={item}/>
          );
        })
        : null
      }
      </div>
    </div>
  );
}

export default App;
