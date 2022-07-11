/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRole, STATUSES } from "../../store/manageRolesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  Button,
  Grid,
} from "@mui/material";
import { AddRole } from "./AddRole";
import { RemoveRole } from "./RemoveRole";
import { UpdateRole } from "./UpdateRole";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const RolesTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add Role Dialog
  const [isAdd, setAdd] = useState(false);

  //state for open remove ConfirmBox
  const [isRemove, setRemove] = useState(false);

  const [role, setRole] = useState([]);

  //state for open edit Role form
  const [isEdit, setEdit] = useState(false);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { rolesData, status } = useSelector((state) => state.manageRoles);

  useEffect(() => {
    dispatch(fetchRole());
  }, []);

  // onclick open confirmbox
  const openConfirmBox = (role) => {
    setRemove(true);
    setRole(role);
  };

  //close add new confirmbox
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after remove Role
  const onRemoveRole = () => {
    setRemove(false);
    dispatch(fetchRole());
  };

  //on click of add Role
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new Role Dialog
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save Role
  const onSaveUpdateTable = () => {
    setAdd(false);
    dispatch(fetchRole());
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    setEdit(false);
    dispatch(fetchRole());
  };

  //on click of add Role
  const openEditForm = (role) => {
    setEdit(true);
    setRole(role);
  };

  //close edit Dialog
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
            Add Role
          </Button>
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddRole
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddRole>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateRole
            onEditUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            role={role}
          ></UpdateRole>
        </BootstrapDialog>
        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveRole
            onRemoveRole={onRemoveRole}
            onClose={onCloseConfirmBox}
            role={role}
          ></RemoveRole>
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
                  <TableCell>Role</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((roles) => (
                    <TableRow
                      key={roles.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{roles.role}</TableCell>
                      <TableCell>{roles.description}</TableCell>
                      <TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon onClick={() => openEditForm(roles)} />
                        </Fab>
                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon onClick={() => openConfirmBox(roles)} />
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
            count={rolesData.length}
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
