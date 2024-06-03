import { Button } from '@mui/material';
import React from 'react'
import { CSVLink } from 'react-csv';

const ExportData = ({data}) => {
    const csvData = (data) || [];

    return (
      <Button variant="contained" color="success">
        <CSVLink
          filename="orderStatus.csv"
          data={csvData}
        >
          Xuất File
        </CSVLink>
      </Button>
    );
}

export default ExportData