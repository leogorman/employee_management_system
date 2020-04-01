import { EmployeeService } from '../employee.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // employees: Employee[] = [];
  employees: MatTableDataSource<any>;
  displayColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'employmentType', 'department', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private employeeService: EmployeeService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.getEmployeesList().subscribe(
      list => {
        const array = list.map(item => {
          return {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone,
            taxNumber: item.taxNumber,
            employmentType: item.employmentType,
            department: item.department,
            role: item.role,
          };
        });
        this.employees = new MatTableDataSource(array);
        this.employees.sort = this.sort;
        this.employees.paginator = this.paginator;
      });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }

  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(){
    this.employees.filter = this.searchKey.trim().toLowerCase();
  }
}
