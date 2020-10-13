import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PageHeader from "../../components/PageHeader";
import EmployeeForm from "./EmployeeForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}));

const Employees = () => {
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="Page Title"
        subTitle="Page description"
        icon={<PeopleAltIcon />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
      </Paper>
    </>
  );
};

export default Employees;
