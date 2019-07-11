import { DialectService } from '../shared/dialect.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {

  constructor(private service: DialectService) { }

  ngOnInit() {
  }

}
