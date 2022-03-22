import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Guid } from 'guid-typescript';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,FormControl } from '@angular/forms';
import { IfStmt, ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  products!: Product[];
  form: any;
  selected:string = "X";
  checkbox = false;
  
  

  constructor() { }

  ngOnInit(): void {
    
    this.ShoppingCart();
    this.form = new FormGroup({
      purchaseId: new FormControl(),
      name: new FormControl(),
      observation: new FormControl(),
      quantity: new FormControl(),
      isFinished: new FormControl(),  
    });
    //console.log( "valor react = " + this.form.value.reactCheck)
    console.log(this.checkbox);
  }

  checkBoxSelected(event:any)
  {
    if(event.checked === undefined)
    {
      this.checkbox = true;
    }else{
      this.checkbox = false;
    }
    return this.checkbox;
  }

  RegisterProduct():void {
    
   
    //marcando ou não ocheckbox o valor será sempre undefined
    if(this.checkbox === true )
    {
      this.form.value.reactCheck = this.selected;
      this.form.value.vueCheck = this.selected;
      this.form.value.angularCheck = this.selected;
    }
    console.log(this.checkbox);
    console.log("quantity" + this.form.value.quantity);
   
    if(this.form.name == null)
    {
      this.form.value.purchaseId = null;
      console.log("->>>> primeiro if " + this.form.value.purchaseId); 
      if(this.form.value.name != null){
        this.form.value.purchaseId = Guid.create().toString();
        console.log("->>>>outro if " + this.form.value.purchaseId); 
      }
    
    }
    

    
    this.form.value.isFinished = false;
    //console.log("refresh react = " + this.form.value.reactCheck);
    

    const product: Product = this.form.value;
    this.products.push(product);
    localStorage.setItem('DB',JSON.stringify(this.products));
    this.form.reset();
  }

  ShoppingCart():void{
    if(localStorage.getItem('DB')){
      this.products = JSON.parse(localStorage.getItem('DB')!); 
    }
    else{
      this.products = [];
    }
  }
  

  RefreshProduct(purchaseId: string){
      const index: number = this.products.findIndex(p => p.purchaseId === purchaseId);

      if(this.products[index].isFinished){
        this.products[index].isFinished = false;
      }
      else{
        this.products[index].isFinished = true;
      }

      localStorage.setItem('DB',JSON.stringify(this.products));
  }

 
  
  
}
