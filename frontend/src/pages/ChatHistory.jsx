import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ChatHistory = ()=>
{

const columns = [
  { field: 'id', headerName: 'Id', width: 25 },
  { field: 'roomName', headerName: 'Room Name', width: 200 },
  { field: 'sessionId', headerName: 'Session Id', width: 300,sortable:false },
  { field: 'userName', headerName: 'User Name', width: 100 },
  { 
    field: 'userMsg',
    headerName: 'Message',
    type: 'string',
    width: 350,
    description: 'Message',
    sortable:false,
  },
  {
    field: 'msgTime',
    headerName: 'Time',
    description: 'Message Sent Time',
    sortable: false,
    width: 100,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

  return (
    <div style={{ height: 400, width: '100%' , backgroundColor: 'white'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: 
          {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
export default ChatHistory;