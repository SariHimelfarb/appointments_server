import React, { useState, useContext, useNavigate } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MyContext from '../ForAdmin&Cliemt/MyContext';
import Manager from './Manager';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function LoginManager() {
  // const { updateCallingComponent } = useContext(MyContext);
  const [admin, setAdmin] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  function login() {
    fetch("http://localhost:8787/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": name, "password": password })
    }).then(response => response.text())
      .then(data => {
        if (data === "Login failed! ") {
          handleClick();
          return;
        }
        setName("");
        setPassword("");
        setAdmin(true);
        // updateCallingComponent("Manager");
        // navigate('/'); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>

      {!admin ?
      <Container   elevation={3} component="main" maxWidth="xs" sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #000', borderRadius: '8px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
  {/* <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}> */}

            <TextField id="outlined-basic" label="name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} margin="normal" required />
            <br></br>
            <TextField id="outlined-basic" label="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
            <br></br>
            <Button variant="outlined" onClick={login}>
              Login
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Login failed!
              </Alert>
            </Snackbar>

          {/* </Paper> */}
        </Container>
        :
        <Manager />
      }

    </>
  )
}
