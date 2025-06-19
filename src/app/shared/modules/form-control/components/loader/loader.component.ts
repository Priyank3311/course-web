// loader.component.ts
import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common'

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loader-overlay" *ngIf="loaderService.loading$ | async">
      <mat-spinner color="primary" diameter="50"></mat-spinner>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
