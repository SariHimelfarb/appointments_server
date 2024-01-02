import { React , useState } from 'react';
import { observer } from 'mobx-react-lite';
import ShowBussiness from '../ForAdmin&Cliemt/ShowBussiness'
import Provider from '../ForAdmin&Cliemt/Provider';
import { Container } from '@mui/system';
import { Outlet, useNavigate } from 'react-router';
import Button from '@mui/material/Button';


const Manager = observer(() => {
    const navigate = useNavigate();

    const handleServicesClick = () => {
      navigate('/admin/service');
    };
  
    const handleMeetingClick = () => {
      navigate('/admin/meeting');
    };
   

    return (
       <Container>
        <Provider isAdmin={true}>
      <ShowBussiness />
    </Provider>

   
    <div >
  <Button onClick={handleServicesClick} variant="outlined" sx={{ borderColor: 'red' , color: 'red'}}>
    Services
  </Button>
  <Button onClick={handleMeetingClick} variant="outlined" sx={{ borderColor: 'red', color: 'red' }}>
    Meeting
  </Button>
  <Outlet />
</div>

       </Container>
    );
})

export default Manager;