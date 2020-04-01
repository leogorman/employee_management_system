package com.leogoman.employee.dao;

import com.leogoman.employee.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;

@Repository("mysql")
public class MySqlEmployeeDAO implements EmployeeDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static class EmployeeRowMapper implements RowMapper<Employee>{
        @Override
        public Employee mapRow(ResultSet resultSet, int i) throws SQLException {
            Employee employee = new Employee();
            employee.setId(resultSet.getInt("id"));
            employee.setRole(resultSet.getString("role"));
            employee.setEmploymentType(resultSet.getString("employmentType"));
            employee.setTaxNumber(resultSet.getString("taxNumber"));
            employee.setDepartment(resultSet.getString("department"));
            employee.setPhone(resultSet.getString("phone"));
            employee.setEmail(resultSet.getString("email"));
            employee.setFirstName(resultSet.getString("firstName"));
            employee.setLastName(resultSet.getString("lastName"));

            return employee;
        }
    }

    @Override
    public Collection<Employee> getAllEmployees() {
        final String sql = "SELECT id, role, employmentType, taxNumber, department, phone, email, firstName, lastName FROM employees";
        return jdbcTemplate.query(sql, new EmployeeRowMapper());
    }

    @Override
    public Employee getEmployeeById(int id) {
        final String sql = "SELECT id, role, employmentType, taxNumber, department, phone, email, firstName, lastName FROM employees where id = ?";
        return jdbcTemplate.queryForObject(sql, new EmployeeRowMapper(), id);
    }

    @Override
    public void removeEmployeeById(int id) {
        final String sql = "DELETE FROM employees WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    @Override
    public void updateEmployee(Employee employee) {
        final String sql = "UPDATE employees SET role = ?, employmentType = ?, taxNumber = ?, department = ?, phone = ?, email = ?, firstName = ?, lastName FROM employees WHERE id = ?";
        int id = employee.getId();
        jdbcTemplate.update(sql, employee.getRole(), employee.getEmploymentType(), employee.getTaxNumber(), employee.getDepartment(), employee.getPhone(), employee.getEmail(), employee.getFirstName(), employee.getLastName(), id);
    }

    @Override
    public void createEmployee(Employee employee) {
        final String sql = "INSERT INTO employees (role, employmentType, taxNumber, department, phone, email, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, employee.getRole(), employee.getEmploymentType(), employee.getTaxNumber(), employee.getDepartment(), employee.getPhone(), employee.getEmail(), employee.getFirstName(), employee.getLastName());
    }
}
