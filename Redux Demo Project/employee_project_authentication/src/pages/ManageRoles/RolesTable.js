/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRole, removeRole } from "../../store/manageRolesSlice";
import { STATUSES } from "../../store/manageRolesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";

import { rolesData } from "../../store/manageRolesSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { AddRole } from "./AddRole";
// import { RemoveEmployee } from "./RemoveEmployee";
// import { UpdateRole } from "./UpdateRole";

export const RolesTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { roles, status } = useSelector((state) => state.manageRoles);

  useEffect(() => {
    dispatch(fetchRole());
    dispatch(rolesData());
  }, []);

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
    dispatch(removeRole(id));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div>
        {/* <UpdateRole /> */}
        <AddRole />
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
                  <TableCell>Role</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((role) => (
                    <TableRow
                      key={role.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{role.role.role}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon />
                        </Fab>
                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon onClick={() => handleDelete(role.id)} />
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
            count={roles.length}
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
