import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Guid } from 'guid-typescript';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  products!: Product[];
  form: any;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      productId: new FormControl(),
      name: new FormControl(),
      quantity: new FormControl(),
      isFinished: new FormControl(),  
    });
  }

}
