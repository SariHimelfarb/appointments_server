import {React, useContext } from "react";
import { observer } from "mobx-react";
import ServicesDetails from '../mobx/ServicesDetails';
import MyContext from './MyContext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



const Services = observer(({  }) => {


  const { isAdmin } = useContext(MyContext);
  const [see, setSee] = useState(isAdmin);
const data=ServicesDetails.getServices;

 const [expanded, setExpanded] = useState(false);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(isExpanded);
      };
      
      const { register, handleSubmit ,reset } = useForm("");


      function handleSubmitForm(form) {
        ServicesDetails.postService(form);
          reset();
          setExpanded(false);
      }

    return (
      <div>
             {data.map((service) => (
                <>
     
        <Accordion  expanded={expanded === service.name} onChange={handleChange(service.name)} sx={{ width: "100%" }} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        // border: '1px solid #000',
         borderRadius: '8px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {service.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{service.description}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            price: {service.price}
          </Typography>
          <br></br>
          <Typography>
          duration: {service.duration}
          </Typography>
        </AccordionDetails>
      </Accordion>
     </>
        ))}
            <br></br>
            {see?<Accordion sx={{ width: "50%" }} component="form" onSubmit={handleSubmit(handleSubmitForm)} expanded={expanded === 'add'} onChange={handleChange('add')}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #000', borderRadius: '8px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            <AccordionSummary         
                            expandIcon={<AddIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        ></AccordionSummary>       
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={6}>
                        <TextField
                            {...register('name')}
                            id="standard-password-input"
                            label="name"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                            {...register('description')}
                            id="standard-password-input"
                            label="description"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                            {...register('price')}
                            id="standard-password-input"
                            label="price"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                            {...register('during')}
                            id="standard-password-input"
                            label="during"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                        />
                    </Grid>
                </Grid>   
                <br></br>           
                <Button style={{ backgroundColor: 'red', color: 'white' }}
                        startIcon={<CheckIcon />}
                        variant="contained"
                        type="submit"
                    ></Button>            
            </Accordion>
            :""}
             </div>
            
    )
})

export default Services;