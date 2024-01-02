import { React } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Provider from './ForAdmin&Cliemt/Provider';
import './index.css';
import LoginManager from './Manager/LoginManager';
import reportWebVitals from './reportWebVitals';
import Meetings from './Manager/Meetings';
import Services from './ForAdmin&Cliemt/ShowServices';
import Client from './Client/Client';
import { Navigate } from 'react-router';
import MyContext from './ForAdmin&Cliemt/MyContext';



const App = () => {
  return (
    
    <Router>
      <Routes >
        <Route path="/" element={<Client />} />


        <Route path="/admin" element={<LoginManager />} >
          
          <Route path='meeting' element={

            <Provider isAdmin={true}>
          <Meetings />
          </Provider>

          } />
          <Route path="service" element={

           <Provider isAdmin={true}>
           <Services />
           </Provider>
          
          } />
          
        </Route>

      </Routes >
    </Router>




  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//      {/* <Provider > */}
//       <Home />
//          {/* </Provider> */}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
