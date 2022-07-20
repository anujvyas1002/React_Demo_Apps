/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills, STATUSES } from "../../store/manageSkillsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  Grid,
  Button,
  TablePagination,
} from "@mui/material";
import { AddSkill } from "./AddSkill";
import { UpdateSkill } from "./UpdateSkill";
import RemoveSkill from "./RemoveSkill";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const SkillTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add Skill  Dialog
  const [isAdd, setAdd] = useState(false);

  //state for open remove Skill confirmBox
  const [isRemove, setRemove] = useState(false);

  //state for open edit Skill Dialog
  const [isEdit, setEdit] = useState(false);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Skill Data 
  const [skill, setSkill] = useState([]);

  const dispatch = useDispatch();
  const { skillsData, status } = useSelector((state: any) => state.manageSkills);

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  // onClick open ConfirmBox
  const openConfirmBox = (skill: React.SetStateAction<never[]>) => {
    setRemove(true);
    setSkill(skill);
  };

  //close add new form
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after Remove Skill
  const onRemoveSkill = () => {
    setRemove(false);
    dispatch(fetchSkills());
  };

  //on click of add Skill
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new form
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save
  const onSaveUpdateTable = () => {
    setAdd(false);
    dispatch(fetchSkills());
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    setEdit(false);
    dispatch(fetchSkills());
  };

  //on click of add Skill Dialog
  const openEditForm = (skill: React.SetStateAction<never[]>) => {
    setEdit(true);
    setSkill(skill);
  };

  //close edit Skill Dialog
  const onCloseEdit = () => {
    setEdit(false);
  };

  // pagination set new Page
  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
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
            Add Skills
          </Button>
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddSkill
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddSkill>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateSkill
            onEditUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            skill={skill}
          ></UpdateSkill>
        </BootstrapDialog>

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveSkill
            onRemoveSkill={onRemoveSkill}
            onClose={onCloseConfirmBox}
            skill={skill}
          ></RemoveSkill>
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
                  <TableCell>Skills</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skillsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((skills: any) => (
                    <TableRow
                      key={skills.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{skills.skill}</TableCell>
                      <TableCell>{skills.description}</TableCell>
                      <TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon onClick={() => openEditForm(skills)} />
                        </Fab>
                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon onClick={() => openConfirmBox(skills)} />
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
            count={skillsData.length}
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
