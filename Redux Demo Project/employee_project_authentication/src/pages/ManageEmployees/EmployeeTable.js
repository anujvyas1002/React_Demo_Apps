/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, STATUSES } from "../../store/manageEmployeesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { skillsData, rolesData } from "../../store/manageEmployeesSlice";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  Fab,
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
import { UpdateEmployee } from "./UpdateEmployee";
import RemoveEmployee from "./RemoveEmployee";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const EmployeeTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add users form
  const [isAdd, setAdd] = useState(false);

  //state for open remove users form
  const [isRemove, setRemove] = useState(false);

  //state for open edit Group form
  const [isEdit, setEdit] = useState(false);

  //employee data
  const [employee , setEmployee] = useState([]);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { employees, status } = useSelector((state) => state.manageEmployees);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(rolesData());
    dispatch(skillsData());
  }, []);

  //on click of add employee
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new form
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save
  const onSaveUpdateTable = () => {
    // timerRef.current = window.setTimeout(() => {
      setAdd(false);
      dispatch(fetchEmployees());
    // }, constants.TIMEOUT);
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    // timerRef.current = window.setTimeout(() => {
      setEdit(false);
      dispatch(fetchEmployees());
    // }, constants.TIMEOUT);
  };

  const openConfirmBox = (employee) => {
    setRemove(true);
    setEmployee(employee);
  };

  //close add new form
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  const onSaveRemoveTable = () => {
    // timerRef.current = window.setTimeout(() => {
      setRemove(false);
      dispatch(fetchEmployees());
    // }, constants.TIMEOUT);
  };
  //on click of add group
  const openEditForm = (employee) => {
    console.log(employee)
    setEmployee(employee);
    setEdit(true);
  };

  //close edit form
  const onCloseEdit = () => {
    setEdit(false);
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
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            onClick={openAddForm}
            color="primary"
            data-testid="addEmployeeBtn"
          >
            Add Employee
          </Button>
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddEmployee
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddEmployee>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateEmployee
            onSaveUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            employee={employee}
          ></UpdateEmployee>
        </BootstrapDialog>

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveEmployee
            onSaveRemoveTable={onSaveRemoveTable}
            onClose={onCloseConfirmBox}
            employee={employee}
          ></RemoveEmployee>
        </Dialog>

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
                          <EditIcon onClick={()=>openEditForm(employee)} />
                        </Fab>
                        {/* </IconButton> */}

                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon onClick={()=>openConfirmBox(employee)} />
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
