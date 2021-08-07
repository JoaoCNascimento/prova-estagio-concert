import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { SimulaLoadingService } from 'src/app/services/simula-loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private simulaLoading: SimulaLoadingService) { }

  ngOnInit(): void {
    this.simulaLoading.simulaLoading();
  }

}
