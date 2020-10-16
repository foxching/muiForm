let KEYS = {
  employees: "employees",
  employeeId: "employeeId"
};

export const getDepartmentCollections = () => [
  { id: "1", title: "Accounting" },
  { id: "2", title: "IT" },
  { id: "3", title: "Engineering" },
  { id: "4", title: "HR" }
];

export const insertEmployee = (data) => {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const updateEmployee = data => {
  let employees = getAllEmployees()
  let recordIndex = employees.findIndex(x => x.id == data.id)
  employees[recordIndex] = { ...data }
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export const generateEmployeeId = () => {
  if (localStorage.getItem(KEYS.employeeId) == null) {
    localStorage.setItem(KEYS.employeeId, "0");
  }
  let id = parseInt(localStorage.getItem(KEYS.employeeId), 0);
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
};
export const getAllEmployees = () => {
  if (localStorage.getItem(KEYS.employees) == null) {
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  }
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  let departments = getDepartmentCollections()
  return employees.map(x => ({
    ...x,
    department: departments[x.departmentId - 1].title
  }))
};
