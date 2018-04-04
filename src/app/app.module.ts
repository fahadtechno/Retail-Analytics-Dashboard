import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Charts Module
import { ChartsModule } from '@progress/kendo-angular-charts';
import { SparklineModule } from '@progress/kendo-angular-charts';
import { SliderModule } from '@progress/kendo-angular-inputs';

//Date Picker Module

import { MyDatePickerModule } from 'mydatepicker';

//Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Services
import { BargraphService } from './services/bargraph.service';
import { PiechartService } from './services/piechart.service';
import { DonutService } from './services/donut.service'

import { HighchartsChartComponent } from 'highcharts-angular';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    SparklineModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    MyDatePickerModule
  ],
  providers: [BargraphService, PiechartService, DonutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
