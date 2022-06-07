import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CardPlanOptions from '../../../../components/CotizarPage/CardPlanOptions/CardPlanOptions';
import CardPlan from '../../../../components/CotizarPage/CardPlans/CardPlans';
import './planes.css';

//componentes Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #fc2d22 !important;
  }
  .Mui-selected {
    color: #fc2d22 !important;
  }
`;

export default function TabsPlanes({ planes }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <CustomTabs
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Planes" {...a11yProps(0)} />
        </CustomTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <CardPlanOptions />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container spacing={1}>
              {planes?.map((item) => (
                <Grid item xs sm md lg={3}>
                  <CardPlan
                    plan_id={item.plan_id}
                    sumaaseg={item.sumaaseg}
                    descplanprod={item.descplanprod}
                    prima={item.prima}
                    fraccionamiento={item.fraccionamiento}
                    codmoneda={item.codmoneda}
                    indsumaaseg={item.indsumaaseg}
                    indmodsum={item.indmodsum}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
}
