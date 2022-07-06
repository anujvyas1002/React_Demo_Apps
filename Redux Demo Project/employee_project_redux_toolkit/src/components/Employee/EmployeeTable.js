/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, removeEmployee } from "../../store/employeeSlice";
import { STATUSES } from "../../store/employeeSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";

import { skillsData } from "../../store/employeeSlice";
import { rolesData } from "../../store/employeeSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Grid,
  Button,
} from "@mui/material";
import { AddEmployee } from "./AddEmployee";
// import { RemoveEmployee } from "./RemoveEmployee";
// import { UpdateEmployee } from "./UpdateEmployee";

export const EmployeeTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  // handle model popup
  const [show, setShow] = useState(false);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { employees, status } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(rolesData());
    dispatch(skillsData());
  }, []);

  // //Modal popup close
  // const handleClose = () => setShow(false);

  // //Modal popup show
  // const handleShow = () => {
  //   setShow(true);
  // };

  const handleModel = () => {
    setShow(!show);
  };

  // pagination set new Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    dispatch(removeEmployee(id));
  };

  // date format
  function formatDate(timestamp) {
    var x = new Date(timestamp);
    var DD = x.getDate();
    var MM = x.getMonth() + 1;
    var YYYY = x.getFullYear();
    return DD + "/" + MM + "/" + YYYY;
  }

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div>
        <AddEmployee show={show}></AddEmployee>

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => handleModel()}
          >
            Add Employee
          </Button>
        </Grid>

        <hr />
        {/* table */}
        <Paper sx={{ width: "100%", mb: 0 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              className="table table-striped table-hover"
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell> About</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow
                      key={employee.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{formatDate(employee.dob)}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.role.role}</TableCell>
                      <TableCell>
                        {employee.skills.map((skill, index) => (
                          <div key={index}>{skill.skill}</div>
                        ))}
                      </TableCell>
                      <TableCell>{employee.employee_about}</TableCell>
                      <TableCell>
                        {/* <IconButton color="primary"> */}
                        {/* <EditIcon /> */}

                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon />
                        </Fab>
                        {/* </IconButton> */}

                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon
                            onClick={() => handleDelete(employee.id)}
                          />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};
