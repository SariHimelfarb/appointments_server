import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import meetingsDetails from "../mobx/MeetingsDetails";


const Meetings = observer(() => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('dateTime');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const data = meetingsDetails.getMeetings;
  const sortedData = data.slice().sort(getComparator(order, orderBy));
  // console.log(sortedData);
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  // function backgroundColorDate(date){
  //   if(date=="2021-06-20T10:00:00.000Z")
  //   return "green"
  // }
 
  const getRowColor = (date) => {

    const currentDate = new Date();
    const currentWeekStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() 
    );
 
    
    const rowDate = new Date(date);
  
    if (rowDate.toDateString() === currentDate.toDateString()) {
      return 'red'; // Today
    } else if (
      rowDate >= currentWeekStart &&
      rowDate < new Date(currentWeekStart).setDate(currentWeekStart.getDate() + 7)
    ) {
      return 'orange'; // This week
    } else {
      return 'green'; // Other dates
    }
  };

  // const isSameDay = (date1, date2) =>
  // date1.getFullYear() === date2.getFullYear() &&
  // date1.getMonth() === date2.getMonth() &&
  // date1.getDate() === date2.getDate();

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">service type</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'dateTime'}
                direction={orderBy === 'dateTime' ? order : 'asc'}
                onClick={(e) => handleRequestSort(e, 'dateTime')}
              >
                date
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">client name</TableCell>
            <TableCell align="right">client phone</TableCell>
            <TableCell align="right">client email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: getRowColor(row.dateTime) }}
            >
              <TableCell align="right">{row.serviceType}</TableCell>
              <TableCell align="right">{row.dateTime}</TableCell>
              <TableCell align="right">{row.clientName}</TableCell>
              <TableCell align="right">{row.clientPhone}</TableCell>
              <TableCell align="right">{row.clientEmail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default Meetings;