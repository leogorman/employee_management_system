import { EmployeeService } from '../employee.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: MatTableDataSource<any>;
  displayColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'employmentType', 'department', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private employeeService: EmployeeService, private notificationService: NotificationService,
              private router: Router, private dialog: MatDialog) {}

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

  onCreate(){
    this.employeeService.initailizeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    this.dialog.open(CreateEmployeeComponent, dialogConfig);
  }

  onUpdate(row){
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    this.dialog.open(CreateEmployeeComponent, dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
      this.notificationService.success('Employee successfully deleted');
    }
  }

}
