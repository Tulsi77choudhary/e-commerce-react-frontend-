import React, { useEffect } from 'react';
import { 
  Box, Card, CardHeader, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Chip 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// Maan lijiye aapne Admin actions mein getUsers banaya hai
// import { getAllCustomers } from '../../State/Admin/Customers/Action'; 

const CustomersTable = () => {
  const dispatch = useDispatch();
  // State se customers ka data nikalna
  // const { customers } = useSelector((state) => state.adminCustomer);

  // Mock Data (Jab tak backend integrate na ho)
  const customers = [
    { id: 1, firstName: "Nikhil", lastName: "Telase", email: "nikhil@example.com", role: "CUSTOMER", image: "" },
    { id: 2, firstName: "Tulsi", lastName: "Choudhary", email: "tulsi@example.com", role: "ADMIN", image: "" },
  ];

  /* useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]); 
  */

  return (
    <Box className="p-10">
      <Card sx={{ borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardHeader 
          title={<Typography variant="h5" fontWeight={800}>User Management</Typography>} 
          sx={{ borderBottom: '1px solid #eee', bgcolor: '#fafafa' }}
        />
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: "#F9FAFB" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={user.image} 
                        sx={{ bgcolor: '#9155FD', fontWeight: 'bold' }}
                      >
                        {user.firstName[0]}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                    #{user.id}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      size="small"
                      sx={{ 
                        bgcolor: user.role === 'ADMIN' ? '#ede7f6' : '#e3f2fd', 
                        color: user.role === 'ADMIN' ? '#673ab7' : '#1976d2',
                        fontWeight: 700
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default CustomersTable;