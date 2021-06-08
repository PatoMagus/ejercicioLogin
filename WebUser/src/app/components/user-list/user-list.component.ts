import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers: any[];
  page: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAll()
      .then(users => this.arrUsers = users)
      .catch(error => console.log(error));
  }

}
