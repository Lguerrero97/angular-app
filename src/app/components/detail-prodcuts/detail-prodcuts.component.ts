import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/models/products';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-detail-prodcuts',
  templateUrl: './detail-prodcuts.component.html',
  styleUrls: ['./detail-prodcuts.component.css']
})
export class DetailProdcutsComponent implements OnInit {
  product: IProducts | undefined;
  constructor(private productService: ProductServiceService, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).then((p: any) => { (this.product = p) });
  }

}
