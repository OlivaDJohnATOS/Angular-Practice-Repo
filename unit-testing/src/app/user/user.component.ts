import { DataService } from './daa.service';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, DataService]
})
export class UserComponent implements OnInit {
  user: {name: string} = {name: ''};
  isLoggedIn = false;
  //data: string;

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    //this.dataService.getDeails().then((data: string) => this.data = data);
  }

}
