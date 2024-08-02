import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const context = createContext({isAuthorized:false});
const AppWrapper = () =>
{
  const [isAuthorized,setIsAuthorized] = useState(false);
  const [user,setUser] = useState();
  console.log(isAuthorized,"rfrkfr")
  console.log(user,"user")

  return (
     <context.Provider value={{isAuthorized,setIsAuthorized,user,setUser}}>
        <App />
     </context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);