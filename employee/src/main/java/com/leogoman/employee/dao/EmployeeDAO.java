package com.leogoman.employee.dao;

import com.leogoman.employee.model.Employee;

import java.util.Collection;

public interface EmployeeDAO {
    Collection<Employee> getAllEmployees();

    Employee getEmployeeById(int id);

    void removeEmployeeById(int id);

    void updateEmployee(Employee employee);

    void createEmployee(Employee employee);
}