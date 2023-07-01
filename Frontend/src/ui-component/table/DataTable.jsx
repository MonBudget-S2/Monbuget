import React from 'react';
import { Paper } from '@mui/material';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DataTable = ({ rows, columns, isLoading }) => {
  // const [showTable, setShowTable] = useState(false);

  // // Simulate loading for 2 seconds
  // const timer = setTimeout(() => {
  // setShowTable(true);
  // }, 2000);

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' }
      },
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              '& .MuiDataGrid-cell': {
                color: '#333'
              },
              '& .MuiDataGrid-row:hover .MuiDataGrid-cell': {
                backgroundColor: '#f5f5f5'
              },
              '& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell': {
                backgroundColor: '#e3f2fd'
              }
            }
          }
        }
      }
    },
    frFR
  );

  return (
    <Paper sx={{ boxShadow: 'none' }}>
      <Paper sx={{ boxShadow: 'none' }}>
        <ThemeProvider theme={theme}>
          {/* {!showTable ? (
                        <Grid container justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                            <CircularProgress />
                            <Typography variant="body2" align="center">
                                Chargement en cours...
                            </Typography>
                        </Grid>
                    ) : ( */}
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            autoHeight
            style={{ animation: 'fadeIn 0.5s' }}
            loading={isLoading}
          />
          {/* )} */}
        </ThemeProvider>
      </Paper>
    </Paper>
  );
};

export default DataTable;
