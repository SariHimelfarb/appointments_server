import { React, useState, useContext } from "react";
import { observer } from "mobx-react";
import BussinessDetails from '../mobx/BussinessDetails';
import { Button } from '@mui/base';
import { Container, Tooltip, Typography, TextField, Avatar, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { Box } from "@mui/system";
import MyContext from './MyContext';
import { Grid, IconButton } from '@mui/material';




const Bussiness = observer(() => {

    const { isAdmin } = useContext(MyContext);
    const [see, setSee] = useState(isAdmin);

    const data = BussinessDetails.getBusiness;



    const [flag, setFlag] = useState(true);
    const { register, handleSubmit } = useForm();



    function handleSubmitForm(form) {
        BussinessDetails.updateBusiness(form);
        hundleclick();
    }
    function hundleclick() {
        setFlag(!flag);
    }

    return (
        <Container>

            {flag ?
                <Paper elevation={3} sx={{ padding: 4, width: '75%', margin: 'auto', marginTop: 2 }} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',
                //  border: '1px solid #000',
                  borderRadius: '8px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                width: "100%",
                                height: "40%",
                            },
                        }}
                    >

                        <Tooltip title="logo" placement="left" >
                            <Avatar
                                variant="circular"
                                src={data.logo}

                                style={{ width: '90px', height: '90px', marginRight: '2px' }}
                                placement="left"
                            />
                        </Tooltip>
                        <Grid container spacing={2}>
                            <Grid item xs={3.5}>
                                <Typography variant="h6" gutterBottom >
                                    <Tooltip title="name" placement="right">
                                        name: {data.name}
                                    </Tooltip>
                                </Typography>
                            </Grid>
                            <Grid item xs={3.5}>
                            <Typography variant="h6" gutterBottom>
                                <Tooltip title="address" placement="right">
                                    address: {data.address}
                                </Tooltip>
                            </Typography>
                            </Grid>
                            <Grid item xs={3.5}>
                            <Typography variant="h6" gutterBottom>
                                <Tooltip title="phone" placement="right">
                                    phone: {data.phone}
                                </Tooltip>
                            </Typography>
                            </Grid>
                            <Grid item xs={3.5}>
                            <Typography variant="h6" gutterBottom>
                                <Tooltip title="owner" placement="right">
                                    owner: {data.owner}
                                </Tooltip>
                            </Typography>
                            </Grid>
                            <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom>
                                <Tooltip title="description" placement="right">
                                    description: {data.description}
                                </Tooltip>
                            </Typography>
                            </Grid>

                            {see ?
                             <Grid item xs={2}>
                                <IconButton aria-label="update" onClick={hundleclick} placement="right" style={{ color: 'red' }}>
                                    <CreateIcon />
                                </IconButton>
                                </Grid>
                                :
                                ""}
                                </Grid>

                    </Box>
                </Paper>
                :
                <Paper elevation={3} sx={{ padding: 3, width: '100%', marginTop: 2 }}
                    component="form" onSubmit={handleSubmit(handleSubmitForm)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #000', borderRadius: '8px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                width: "100%",
                                height: "50%",
                            },
                        }}
                    >
<Grid container spacing={2}>
<Grid item xs={3.5}>
                        <TextField
                            {...register('name')}
                            id="standard-password-input"
                            label="Name"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.name}
                        />
                        </Grid>
                            <Grid item xs={3.5}>
                                <TextField
                                    {...register('id')}
                                    id="standard-password-input"
                                    label="Id"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    defaultValue={data.id}
                                />


                            </Grid>
                            <Grid item xs={3.5}>
                                <TextField
                                    {...register('address')}
                                    id="standard-password-input"
                                    label="Address"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    defaultValue={data.address}
                                />
                            </Grid>
                            <Grid item xs={3.5}>
                                <TextField
                                    {...register('phone')}
                                    id="standard-password-input"
                                    label="Phone"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    defaultValue={data.phone}
                                />
                            </Grid>
                            <Grid item xs={3.5}>
                                <TextField
                                    {...register('owner')}
                                    id="standard-password-input"
                                    label="Owner"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    defaultValue={data.owner}
                                />
                            </Grid>
                            <Grid item xs={3.5}>
                                <TextField
                                    {...register('description')}
                                    id="standard-password-input"
                                    label="Description"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    defaultValue={data.description}
                                />
                            </Grid>
                            <Grid item xs={3.5}>

                                <IconButton aria-label="save" type="submit" style={{ color: 'red' }}>
                                    <SaveIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            }
            <br></br>

        </Container>
    );
})


export default Bussiness;