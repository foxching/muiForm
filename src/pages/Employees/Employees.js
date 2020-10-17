import React, { useState } from "react";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from "@material-ui/core";

import PageHeader from "../../components/PageHeader";
import EmployeeForm from "./EmployeeForm";
import { useTable } from "../../components/useTable"
import Popup from "../../components/Popup"
import Notification from "../../components/Notification"
import ConfirmDialog from "../../components/ConfirmDialog"

import * as employeeService from "../../data/services"
import { Controls } from "../../components/controls/Controls";

import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add"
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: "75%"
  },
  newButton: {
    position: "absolute",
    right: "10px"
  }
}));

const headCells = [
  { id: "fullName", label: "Employe Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number" },
  { id: "departmentId", label: "Department" },
  { id: "actions", label: "Action", disableSorting: true }
]


const Employees = () => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [open, setOpen] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }
    resetForm();
    setRecordForEdit(null)
    setOpen(false)
    setRecords(employeeService.getAllEmployees())
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    })
  }

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items;
        else
          return items.filter(x => x.fullName.toLowerCase().includes(target.value))
      }
    })
  }

  const openInPopUp = item => {
    setRecordForEdit(item)
    setOpen(true)
  }

  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees())
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    })
  }


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn)
  return (
    <>
      <PageHeader
        title="Page Title"
        subTitle="Page description"
        icon={<PeopleAltIcon />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>)
            }}
            onChange={handleSearch}
          />

          <Controls.Button
            text='Add New'
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => { setOpen(true); setRecordForEdit(null) }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => openInPopUp(item)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { onDelete(item.id) }
                      })
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Employee Form"
        open={open}
        setOpen={setOpen}
      >
        <EmployeeForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        />
      </Popup>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

    </>
  );
};

export default Employees;
