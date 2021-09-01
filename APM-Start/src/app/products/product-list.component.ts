import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
   // providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy{

constructor(private productService: ProductService){
  //this._productService = productService;
}

pageTitle: string = 'Product List';
imageWidth = 50;
imageMargin = 2;
showImage: boolean = false;
errorMessage: string = '';
sub!: Subscription;

private _listFilter: string = '';
get listFilter(): string{
  return this._listFilter;
}
set listFilter(v : string) {
  this._listFilter = v;
  this.filteredProducts = this.filterProducts(v);
}

filteredProducts: IProduct[] = [];

products: IProduct[] = [];

toggleImage(): void{
    this.showImage = !this.showImage;
}

filterProducts(filterBy: string): IProduct[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) =>
  product.productName.toLocaleLowerCase().includes(filterBy))
} 

ngOnInit(): void {
this.sub = this.productService.getProducts().subscribe({
  next: products => {
    this.products = products;
    this.filteredProducts = this.products;
  },
  error: err => this.errorMessage = err
});

}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

onRatingClicked(message: string): void {
  this.pageTitle = 'Product List ' + message;
}
}