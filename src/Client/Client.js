import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "@mui/system";
// import Box from "@mui/system/Box";
// import Paper from "@mui/material/Paper";
// import Tooltip from "@mui/material/Tooltip";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import BusinessDetails from "../mobx/BussinessDetails";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MeetingsDetails from "../mobx/MeetingsDetails";
import { useForm } from 'react-hook-form';
import Meetings from "../Manager/Meetings";
import ShowBussiness from '../ForAdmin&Cliemt/ShowBussiness'
import Provider from "../ForAdmin&Cliemt/Provider";
import ShowServices from '../ForAdmin&Cliemt/ShowServices'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ServicesDetails from "../mobx/ServicesDetails";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Client = observer(() => {

    const data=ServicesDetails.getServices;

    const [open, setOpen] = useState(false);


    const [flag, setFlag] = useState(false);

    const { register, handleSubmit ,reset } = useForm("");

    

    async function handleSubmitForm(form) {
        const combinedDateTime = new Date(`${form.date}T${form.hour}:00`);

        const flagValue = await MeetingsDetails.postMeeting({
            id: "",
            serviceType: form.serviceType,
            dateTime: combinedDateTime.toISOString(),
            clientName: form.clientName,
            clientPhone: form.clientPhone,
            clientEmail: form.clientEmail
        });

        setFlag(flagValue);


        if (!flagValue) {
            handleClose();
            
        }
        errorMsgOpen();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        
        setOpen(false);
        reset();
    };


    const [service, setService] = React.useState('');

    const handleChange = (event) => {
        setService(event.target.value);
    };


    const [msg, setMsg] = React.useState(false);
    
    const errorMsgOpen = () => {
        setMsg(true);
      };
    
      const errorMsgClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMsg(false);
      };


    return (

        <Container>
            <Provider isAdmin={false}>
                <ShowBussiness />
            </Provider>
            <Provider isAdmin={false}>
                <ShowServices />
            </Provider>

            <Button variant="outlined" onClick={handleClickOpen} sx={{ borderColor: 'red' , color: 'red'}} >
                Made an appointment
            </Button>
            <Dialog open={open} onClose={handleClose} component="form"
                onSubmit={handleSubmit(handleSubmitForm)}
            >
                <DialogTitle>Made an appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <br></br>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Service</InputLabel>
                            <Select
                            {...register('serviceType')}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={service}
                                label="Service"
                                focused
                                onChange={handleChange}
                            >
                                {data.map((serv)=>(
                                <MenuItem value={serv.name}>{serv.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        {...register('clientName')}
                        autoFocus
                        margin="dense"
                        id="clientName"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        focused
                    />
                    <TextField
                        {...register('clientPhone')}
                        autoFocus
                        margin="dense"
                        id="clientPhone"
                        label="Phon"
                        type="text"
                        fullWidth
                        variant="standard"
                        focused
                    />
                    <TextField
                        {...register('clientEmail')}
                        autoFocus
                        margin="dense"
                        id="clientEmail"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        focused
                    />
                    <TextField

                        {...register('date')}
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        color={flag && "warning"}
                        focused
                    />
                    <TextField
                        {...register('hour')}
                        autoFocus
                        margin="dense"
                        id="hour"
                        label="Hour"
                        type="time"
                        fullWidth
                        variant="standard"
                        color={flag && "warning"}
                        focused
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>

           { flag&&<Snackbar open={msg} autoHideDuration={6000} onClose={errorMsgClose}>
              <Alert onClose={errorMsgClose} severity="error" sx={{ width: '100%' }}>
                Login failed!
              </Alert>
            </Snackbar>}

        </Container>

    )
}
);

export default Client;