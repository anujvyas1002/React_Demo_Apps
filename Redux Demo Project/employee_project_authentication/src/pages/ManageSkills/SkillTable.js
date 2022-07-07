/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills, removeSkills } from "../../store/manageSkillsSlice";
import { STATUSES } from "../../store/manageSkillsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";

import { skillsData } from "../../store/manageSkillsSlice";

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
import { AddSkill } from "./AddSkill";
// import { RemoveEmployee } from "./RemoveEmployee";
// import { UpdateSkill } from "./UpdateSkill";

export const SkillTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { skills, status } = useSelector((state) => state.manageSkills);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(skillsData());
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
    dispatch(removeSkills(id));
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
        {/* <UpdateSkill /> */}
        <AddSkill />
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
                {skills
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((skills) => (
                    <TableRow
                      key={skills.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {skills.skills.map((skill, index) => (
                          <div key={index}>{skill.skill}</div>
                        ))}
                      </TableCell>
                      <TableCell>{skills.description}</TableCell>
                      <TableCell>
                        <Fab size="small" color="secondary" aria-label="edit">
                          <EditIcon />
                        </Fab>
                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon onClick={() => handleDelete(skills.id)} />
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
            count={skills.length}
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
