import {React, useState} from 'react';
import MyContext from './MyContext';

const Provider = ({ children, isAdmin }) => {
  return (
    <MyContext.Provider value={{ isAdmin }}>
      {children}
    </MyContext.Provider>
  );
};



// const Provider = ({ children }) => {
//   const [callingComponent, setCallingComponent] = useState('Client');

//   const updateCallingComponent = (newCallingComponent) => {
//     setCallingComponent(newCallingComponent);
//   }; 

//   return (
//     <MyContext.Provider value={{ callingComponent, updateCallingComponent }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

export default Provider;