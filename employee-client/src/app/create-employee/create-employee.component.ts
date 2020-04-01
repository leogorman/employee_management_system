import { EmployeeService } from '../employee.service';
import { NotificationService } from '../notification.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;

  constructor(public employeeService: EmployeeService, private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employeeService.form.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.notificationService.success('Employee Created');
    this.gotoList();
  }

  onSubmit() {
    if (this.employeeService.form.valid) {
      this.submitted = true;
      this.save();
    }
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

  clearForm(){
    this.employeeService.form.reset();
    this.employeeService.initailizeFormGroup();
  }
}
