import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from './employee';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private baseUrl = 'http://localhost:5000/employees';
  private baseUrl = 'http://employeeapi-env.eba-9ps5d6d5.ap-southeast-2.elasticbeanstalk.com/employees';

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    taxNumber: new FormControl('', Validators.required),
    employmentType: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  initailizeFormGroup(){
    this.form.setValue({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      taxNumber: '',
      employmentType: '',
      department: '',
      role: '',
    });
  }


  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(employee: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeesList() {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  populateForm(employee){
    this.form.setValue(employee);
  }
}
