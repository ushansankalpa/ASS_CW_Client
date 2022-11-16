import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url:any = null;
  constructor() { }
  

  ngOnInit(): void {
    this.url = environment.apiUrl;
  }

}
