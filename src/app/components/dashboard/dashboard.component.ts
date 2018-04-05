import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';

//Services
import { BargraphService } from '../../services/bargraph.service';
import { PiechartService } from '../../services/piechart.service';
import { DonutService } from '../../services/donut.service'

import {IMyDpOptions} from 'mydatepicker';

import * as Highcharts from 'highcharts';

import * as MostVisitedSpot from 'highcharts';

import * as Emotions from 'highcharts';

import * as DwellTimeChart from 'highcharts';

import * as BarGraph from 'highcharts';

import * as CustomerJourney from 'highcharts';

import * as Exporting from 'highcharts/modules/exporting';

import * as funnel from 'highcharts/modules/funnel';

declare var AmCharts
declare var zingchart
declare var d3
declare var $

Exporting(Highcharts);
funnel(Highcharts);



@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    store: string = 'Malir Branch';
    public fromDate: FormGroup;
    public toDate: FormGroup;    
    private placeholder: string = 'Select date';

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        showInputField:true,
        ariaLabelInputField: 'abc',
        inline: false
    };

//   @ViewChild("funnel", { read: ElementRef }) funnel: ElementRef;
//   @ViewChild("mostVis", { read: ElementRef }) mostVis: ElementRef;  
//   @ViewChild("emotions", { read: ElementRef }) emotions: ElementRef;    
//   @ViewChild("dwellTime", { read: ElementRef }) dwellTIme: ElementRef;    
//   @ViewChild("sales", { read: ElementRef }) sales: ElementRef;    
  @ViewChild("dwell_time", { read: ElementRef }) dwell_time: ElementRef; 
  @ViewChild("mostVis", { read: ElementRef }) mostVis: ElementRef;             
  @ViewChild("emotions", { read: ElementRef }) emotions: ElementRef;    
  @ViewChild("cust_demo", { read: ElementRef }) cust_demo: ElementRef;        
//   @ViewChild("donut", { read: ElementRef }) donut: ElementRef;        

  
  MostVisitedSpot = MostVisitedSpot;
  Emotions = Emotions;
  DwellTimeChart = DwellTimeChart;
  BarGraph = BarGraph;

  mostVisOpts;
  emotionOpts;
  optFromInput;
  barGraph;

  chart = AmCharts.makeChart("chartdiv", {
    "hideCredits":true,
    "type": "serial",
    "theme": "none",
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": true,
        "oneBalloonOnly": true
      },
    "dataProvider": [{
        "title": "Downloads",
        "category": "Customer Potential Outside Store",
        "value": 3000,
        "value2": -3000,
        "color": "#0e5a7e"
    },{
        "title": "Purchased more",
        "category": "Store Visitors",
        "value": 2500,
        "value2": -2500,
        "color": "#166f99"
    }, {
        "title": "Purchased more",
        "category": "Transactions",
        "value": 800,
        "value2": -800,
        "color": "#736969"
    }, {
        "title": "Purchased more",
        "category": "Transactions",
        "value": 800,
        "value2": -800,
        "color": "#736969"
    }],
    "valueAxes": [{
        "axisAlpha": 0,
        "labelsEnabled": false,
        "gridAlpha": 0
    }],
    "graphs": [{
        "id": "fromGraph",
        "alphaField": "alpha",
        "lineAlpha": 0,
        "showBalloon": false,
        "fontSize": 12,
        "valueField": "value2",
        "fillAlphas": 0,
        "bulletSize": 40,
        "labelPosition": "middle",
        "color": "#000",
    }, {
        "fillAlphas": 1,
        "fillToGraph": "fromGraph",
        "lineAlpha": 0,
        "lineColorField": "color",
        "fillColorsField": "color",
        "showBalloon": true,
        "fontSize": 12,
        "valueField": "value",
        "labelText": "[[value]]",
        "bullet": "round",
        "bulletAlpha": 0,
        "balloonText": "<span style='font-size:15px;'>[[value]]</span>"
    }],
    "categoryField": "category",
    "minMarginLeft": 50,
    "categoryAxis": {
        "startOnAxis": true,
        "axisAlpha": 0.1,
        "gridPosition": "left",
        "gridAlpha": 0.1,
        "tickLength": 20,
        "tickPosition": "start",
        "showLastLabel": false,
        "fontSize": 13
    }
});



  constructor(private formBuilder: FormBuilder,
            private _barGraph: BargraphService,
            private _pieChart: PiechartService,
            private _donut: DonutService) {}
  
  ngOnInit() {

    this.fromDate = this.formBuilder.group({
        fromDate: [null, Validators.required]
    });

    this.toDate = this.formBuilder.group({
        toDate: [null, Validators.required]
    });

    this._barGraph.customerDemographics(this.cust_demo.nativeElement, 400);
    this._barGraph.dwellTime(this.dwell_time.nativeElement, 270);
    this._pieChart.emotions(this.emotions.nativeElement,130);
    this._pieChart.mostVisSpot(this.mostVis.nativeElement, 130);
    // this._donut.donutLoader(this.donut.nativeElement,50)
    
    /////////////// FUNNEL SECTION //////////////

    // Highcharts.chart(this.funnel.nativeElement, {
    //         chart: {
    //             type: 'funnel',
    //             width: 700,
    //             height: 400
    //         },
    //         title: {
    //             text: ''
    //         },
    //         credits:{
    //             enabled: false
    //         },
    //         plotOptions: {
    //             series: {
    //                 dataLabels: {
    //                     enabled: true,
    //                     format: '<b>{point.name}</b> ({point.y:,.0f})',
    //                     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
    //                     softConnector: true
    //                 },
    //                 center: ['40%', '50%'],
    //                 neckWidth: '30%',
    //                 neckHeight: '25%',
    //                 width: '40%'
    //             }
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         series: [{
    //             name: 'Unique users',
    //             data: [
    //                 ['Website visits', 15654],
    //                 ['Downloads', 4064],
    //                 ['Requested price list', 1987],
    //                 ['Invoice sent', 976],
    //                 ['Finalized', 846]
    //             ]
    //         }]
    //     });

        /////////////// MOST VISITED SECTION //////////////

        // Highcharts.chart(this.mostVis.nativeElement, {
        //     chart: {
        //         plotBackgroundColor: null,
        //         plotBorderWidth: null,
        //         plotShadow: false,
        //         type: 'pie'
        //     },
        //     title: {
        //         text: 'Most Visited Spot'
        //     },
        //     credits:{
        //         enabled: false
        //     },
        //     tooltip: {
        //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        //     },
        //     plotOptions: {
        //         pie: {
        //             allowPointSelect: true,
        //             cursor: 'pointer',
        //             dataLabels: {
        //                 enabled: true,
        //                 format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
        //                 distance: -50
        //             },
        //             showInLegend: false
        //         }
        //     },
        //     series: [{
        //         name: "Most Visited Spots",
        //         colorByPoint: true,
        //         data: [{
        //             name: "Grocery",
        //             y: 60
        //         }, {
        //             name: "Clothing",
        //             y: 20,
        //             sliced: true,
        //             selected: true
        //         }, {
        //             name: "Electronics",
        //             y: 10
        //         }]
        //     }]
        // });



        /////////////// EMOTIONS SECTION //////////////

        // Highcharts.chart(this.emotions.nativeElement, {
        //     chart: {
        //         plotBackgroundColor: null,
        //         plotBorderWidth: null,
        //         plotShadow: false,
        //         type: 'pie'
        //     },
        //     title: {
        //         text: 'Emotions'
        //     },
        //     credits:{
        //         enabled: false
        //     },
        //     tooltip: {
        //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        //     },
        //     plotOptions: {
        //         pie: {
        //             allowPointSelect: true,
        //             cursor: 'pointer',
        //             dataLabels: {
        //                 enabled: true,
        //                 format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
        //                 distance: -50
        //             },
        //             showInLegend: false
        //         }
        //     },
        //     series: [{
        //         name: "Emotions",
        //         colorByPoint: true,
        //         data: [{
        //             name: "Happy",
        //             y: 40
        //           }, 
        //           {
        //             name: "Neutral",
        //             y: 24,
        //             sliced: true,
        //             selected: true
        //           }, 
        //           {
        //             name: "Sad",
        //             y: 36
        //         }]
        //     }]
        // });

        /////////////// DWELL TIME SECTION //////////////

        // Highcharts.chart(this.dwellTIme.nativeElement, {
        //     chart: {
        //         type: 'column'
        //     },
        //     title: {
        //         text: 'Dwell Time'
        //     },
        //     credits:{
        //         enabled: false
        //     },
        //     xAxis: {
        //         type: 'category'
        //     },
        //     yAxis: {
        //         title: {
        //             text: 'Total Dwell Time'
        //         }
        
        //     },
        //     legend: {
        //         enabled: false
        //     },
        //     plotOptions: {
        //         series: {
        //             borderWidth: 0,
        //             dataLabels: {
        //                 enabled: true,
        //                 format: '{point.y:.1f}%'
        //             }
        //         }
        //     },
        
        //     tooltip: {
        //         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        //     },
        
        //     series: [{
        //         name: 'Brands',
        //         colorByPoint: true,
        //         data: [{
        //             name: 'Spot 1',
        //             y: 56.33
        //         }, {
        //             name: 'Spot 2',
        //             y: 24.03
        //         }, {
        //             name: 'Spot 3',
        //             y: 10.38
        //         }, {
        //             name: 'Spot 4',
        //             y: 4.77
        //         }, {
        //             name: 'Spot 5',
        //             y: 0.91
        //         }]
        //     }],
        //     drilldown: {
        //         series: [{
        //             name: 'Microsoft Internet Explorer',
        //             id: 'Microsoft Internet Explorer',
        //             data: [
        //                 [
        //                     'v11.0',
        //                     24.13
        //                 ],
        //                 [
        //                     'v8.0',
        //                     17.2
        //                 ],
        //                 [
        //                     'v9.0',
        //                     8.11
        //                 ],
        //                 [
        //                     'v10.0',
        //                     5.33
        //                 ],
        //                 [
        //                     'v6.0',
        //                     1.06
        //                 ],
        //                 [
        //                     'v7.0',
        //                     0.5
        //                 ]
        //             ]
        //         }, {
        //             name: 'Chrome',
        //             id: 'Chrome',
        //             data: [
        //                 [
        //                     'v40.0',
        //                     5
        //                 ],
        //                 [
        //                     'v41.0',
        //                     4.32
        //                 ],
        //                 [
        //                     'v42.0',
        //                     3.68
        //                 ],
        //                 [
        //                     'v39.0',
        //                     2.96
        //                 ],
        //                 [
        //                     'v36.0',
        //                     2.53
        //                 ],
        //                 [
        //                     'v43.0',
        //                     1.45
        //                 ],
        //                 [
        //                     'v31.0',
        //                     1.24
        //                 ],
        //                 [
        //                     'v35.0',
        //                     0.85
        //                 ],
        //                 [
        //                     'v38.0',
        //                     0.6
        //                 ],
        //                 [
        //                     'v32.0',
        //                     0.55
        //                 ],
        //                 [
        //                     'v37.0',
        //                     0.38
        //                 ],
        //                 [
        //                     'v33.0',
        //                     0.19
        //                 ],
        //                 [
        //                     'v34.0',
        //                     0.14
        //                 ],
        //                 [
        //                     'v30.0',
        //                     0.14
        //                 ]
        //             ]
        //         }, {
        //             name: 'Firefox',
        //             id: 'Firefox',
        //             data: [
        //                 [
        //                     'v35',
        //                     2.76
        //                 ],
        //                 [
        //                     'v36',
        //                     2.32
        //                 ],
        //                 [
        //                     'v37',
        //                     2.31
        //                 ],
        //                 [
        //                     'v34',
        //                     1.27
        //                 ],
        //                 [
        //                     'v38',
        //                     1.02
        //                 ],
        //                 [
        //                     'v31',
        //                     0.33
        //                 ],
        //                 [
        //                     'v33',
        //                     0.22
        //                 ],
        //                 [
        //                     'v32',
        //                     0.15
        //                 ]
        //             ]
        //         }, {
        //             name: 'Safari',
        //             id: 'Safari',
        //             data: [
        //                 [
        //                     'v8.0',
        //                     2.56
        //                 ],
        //                 [
        //                     'v7.1',
        //                     0.77
        //                 ],
        //                 [
        //                     'v5.1',
        //                     0.42
        //                 ],
        //                 [
        //                     'v5.0',
        //                     0.3
        //                 ],
        //                 [
        //                     'v6.1',
        //                     0.29
        //                 ],
        //                 [
        //                     'v7.0',
        //                     0.26
        //                 ],
        //                 [
        //                     'v6.2',
        //                     0.17
        //                 ]
        //             ]
        //         }, {
        //             name: 'Opera',
        //             id: 'Opera',
        //             data: [
        //                 [
        //                     'v12.x',
        //                     0.34
        //                 ],
        //                 [
        //                     'v28',
        //                     0.24
        //                 ],
        //                 [
        //                     'v27',
        //                     0.17
        //                 ],
        //                 [
        //                     'v29',
        //                     0.16
        //                 ]
        //             ]
        //         }]
        //     }
        // });


        /////////////// DWELL TIME SECTION //////////////

        // Highcharts.chart(this.sales.nativeElement, {
        //     chart: {
        //         type: 'column'
        //     },
        //     title: {
        //         text: 'Monthly Average Sales'
        //     },
        //     credits:{
        //         enabled: false
        //     },
        //     xAxis: {
        //         categories: [
        //             'Jan',
        //             'Feb',
        //             'Mar',
        //             'Apr',
        //             'May',
        //             'Jun',
        //             'Jul',
        //             'Aug',
        //             'Sep',
        //             'Oct',
        //             'Nov',
        //             'Dec'
        //         ],
        //         crosshair: true
        //     },
        //     yAxis: {
        //         min: 0,
        //         title: {
        //             text: 'Sales'
        //         }
        //     },
        //     tooltip: {
        //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        //             '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        //         footerFormat: '</table>',
        //         shared: true,
        //         useHTML: true
        //     },
        //     plotOptions: {
        //         column: {
        //             pointPadding: 0.2,
        //             borderWidth: 0
        //         }
        //     },
        //     series: [{
        //         name: 'Store 1',
        //         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
        //     }]
        // });



//     let dwellTime = `
//     {
//       "chart": {
//           "type": "column"
//       },
//       "title": {
//           "text": "Dwell Time"
//       },
//       "credits": {
//         "enabled": false
//     },
//       "xAxis": {
//           "type": "category"
//       },
//       "yAxis": {
//           "title": {
//               "text": "Total Dwell Time"
//           }
//       },
//       "legend": {
//           "enabled": false
//       },
//       "plotOptions": {
//           "series": {
//               "borderWidth": 0,
//               "dataLabels": {
//                   "enabled": true,
//                   "format": "{point.y:.1f}%"
//               }
//           }
//       },
  
//       "tooltip": {
//           "headerFormat": "<span style='font-size:11px'>{series.name}</span><br>",
//           "pointFormat": "<span style='color:{point.color}'>{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>"
//       },
  
//       "series": [{
//           "name": "Dwell Time",
//           "colorByPoint": true,
//           "data": [{
//               "name": "Spot 1",
//               "y": 56.33
//           }, {
//               "name": "Spot 2",
//               "y": 24.03
//           }, {
//               "name": "Spot 3",
//               "y": 10.38
//           }, {
//               "name": "Spot 4",
//               "y": 4.77
//           }, {
//               "name": "Spot 5",
//               "y": 0.91
//           }]
//       }] 
//   }`

//   let optFromInputString = `
//   {
//   "title": {
//     "text": "Dwell Time"
// },

// "yAxis": {
//     "title": {
//         "text": "Number of Employees"
//     }
// },
// "legend": {
//     "layout": "vertical",
//     "align": "right",
//     "verticalAlign": "middle"
// },

// "plotOptions": {
//     "series": {
//         "label": {
//             "connectorAllowed": false
//         },
//         "pointStart": 2010
//     }
// },

// "series": [{
//     "name": "Installation",
//     "data": [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
// }, {
//     "name": "Manufacturing",
//     "data": [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
// }, {
//     "name": "Sales & Distribution",
//     "data": [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
// }, {
//     "name": "Project Development",
//     "data": [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
// }, {
//     "name": "Other",
//     "data": [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
// }],

// "responsive": {
//     "rules": [{
//         "condition": {
//             "maxWidth": 500
//         },
//         "chartOptions": {
//             "legend": {
//                 "layout": "horizontal",
//                 "align": "center",
//                 "verticalAlign": "bottom"
//             }
//         }
//     }]
// }
// }`;

// let mostVisOpts = `
// {
//   "chart": {
//       "plotBackgroundColor": null,
//       "plotBorderWidth": null,
//       "plotShadow": false,
//       "type": "pie"
//   },
//   "title": {
//       "text": "Most Visited Spots"
//   },
//   "tooltip": {
//       "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
//   },
//   "plotOptions": {
//       "pie": {
//           "allowPointSelect": true,
//           "cursor": "pointer",
//           "dataLabels": {
//               "enabled": true,
//               "format": "<b>{point.name}</b><br>{point.percentage:.1f} %",
//               "distance": -50
//           },
//           "showInLegend": false
//       }
//   },
//   "credits": {
//     "enabled": false
// },
//   "series": [{
//       "name": "Most Visited Spots",
//       "colorByPoint": true,
//       "data": [{
//           "name": "Grocery",
//           "y": 45
//       }, {
//           "name": "Clothing",
//           "y": 30,
//           "sliced": true,
//           "selected": true
//       }, {
//           "name": "Electronics",
//           "y": 15
//       }, {
//         "name": "Cosmetics",
//         "y": 10
//     }]
//   }]
// }
// `

// let emotionOpts = `
// {
//   "chart": {
//       "plotBackgroundColor": null,
//       "plotBorderWidth": null,
//       "plotShadow": false,
//       "type": "pie"
//   },
//   "title": {
//       "text": "Emotions"
//   },
//   "tooltip": {
//       "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
//   },
//   "plotOptions": {
//       "pie": {
//           "allowPointSelect": true,
//           "cursor": "pointer",
//           "dataLabels": {
//               "enabled": true,
//               "format": "<b>{point.name}</b><br>{point.percentage:.1f} %",
//               "distance": -50
//           },
//           "showInLegend": false
//       }
//   },
//   "credits": {
//     "enabled": false
// },
//   "series": [{
//       "name": "Emotions",
//       "colorByPoint": true,
//       "data": [{
//           "name": "Happy",
//           "y": 40
//         }, 
//         {
//           "name": "Neutral",
//           "y": 24,
//           "sliced": true,
//           "selected": true
//         }, 
//         {
//           "name": "Sad",
//           "y": 36
//       }]
//   }]
// }
// `


// let barGraph = `
// {
//   "chart": {
//       "type": "column"
//   },
//   "title": {
//       "text": "Monthly Average Rainfall"
//   },
//   "subtitle": {
//       "text": "Source: WorldClimate.com"
//   },
//   "credits": {
//     "enabled": false
// },
//   "xAxis": {
//       "categories": [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec"
//       ],
//       "crosshair": true
//   },
//   "yAxis": {
//       "min": 0,
//       "title": {
//           "text": "Rainfall (mm)"
//       }
//   },
//   "tooltip": {
//       "headerFormat":"<span style='font-size:10px'>{point.key}</span><table>",
//       "pointFormat": "<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y:.1f} mm</b></td></tr>",
//       "footerFormat": "</table>",
//       "shared": true,
//       "useHTML": true
//   },
//   "plotOptions": {
//       "column": {
//           "pointPadding": 0.2,
//           "borderWidth": 0
//       }
//   },
//   "series": [{
//       "name": "Tokyo",
//       "data": [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//   }, {
//       "name": "New York",
//       "data": [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
//   }, {
//       "name": "London",
//       "data": [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
//   }, {
//       "name": "Berlin",
//       "data": [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
//   }]
// }`

//   this.optFromInput = JSON.parse(optFromInputString);
//   this.mostVisOpts = JSON.parse(mostVisOpts);
//   this.emotionOpts = JSON.parse(emotionOpts);
//   this.barGraph = JSON.parse(barGraph);   



//   this.mostVisitedChart(this.mostVis.nativeElement,130);
//   this.dwellTimeChart(this.cust_demo.nativeElement, 380);
//   this.custDemoChart(this.dwell_time.nativeElement, 400)
  }

  ///////////////EMOTION CHART/////////////////////

// emotionChart(element, radius) {
//         // Basic setup
//         // ------------------------------

//         // Colors
//         var color = d3.scale.category20();

//         // Create chart
//         // ------------------------------

//         // Add SVG element
//         var container = d3.select(element).append("svg");

//         // Add SVG group
//         var svg = container
//             .attr("width", radius * 2)
//             .attr("height", radius * 2)
//             .append("g")
//                 .attr("transform", "translate(" + radius + "," + radius + ")");


//         // Construct chart layout
//         // ------------------------------

//         // Arc
//         var arc = d3.svg.arc()
//             .outerRadius(radius)
//             .innerRadius(radius / 1.75);


//         // Pie
//         var pie = d3.layout.pie()
//             .value(function(d) { return d.lemons; })
//             .sort(null);


//         // Load data
//         // ------------------------------

//         d3.tsv("assets/demo_data/d3/pies/donuts_update.tsv", function(error, data) {

//             // Pull out values
//             data.forEach(function(d) {
//                 d.lemons = +d.lemons || 0;
//                 d.melons = +d.melons || 0;
//             });


//             //
//             // Append chart elements
//             //

//             // Bind data
//             var path = svg.datum(data).selectAll("path")
//                 .data(pie)
//                 .enter()
//                 .append("path")
//                     .attr("fill", function(d, i) { return color(i); })
//                     .attr("d", arc)
//                     .style("stroke", "#fff")
//                     .each(function(d) { this._current = d; }); // store the initial angles

//             // Apply change event
//             d3.selectAll(".donut-radios input").on("change", change);

//             // Change values on page load
//             var timeout = setTimeout(function() {
//                 d3.select("input[value=\"melons\"]").property("checked", true).each(change);
//                 $.uniform.update();
//             }, 2000);

//             // Change values
//             function change() {
//                 var value = this.value;
//                 clearTimeout(timeout);
//                 pie.value(function(d) { return d[value]; }); // change the value function
//                 path = path.data(pie); // compute the new angles
//                 path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
//             }
//         });


//         // Store the displayed angles in _current.
//         // Then, interpolate from _current to the new angles.
//         // During the transition, _current is updated in-place by d3.interpolate.
//         function arcTween(a) {
//             var i = d3.interpolate(this._current, a);
//             this._current = i(0);
//             return function(t) {
//                 return arc(i(t));
//             };
//         }
//     }

    // mostVisitedChart(element, radius) {
    //     // Basic setup
    //     // ------------------------------

    //     // Colors
    //     var color = d3.scale.category20();

    //     // Create chart
    //     // ------------------------------

    //     // Add SVG element
    //     var container = d3.select(element).append("svg");

    //     // Add SVG group
    //     var svg = container
    //         .attr("width", radius * 2)
    //         .attr("height", radius * 2)
    //         .append("g")
    //             .attr("transform", "translate(" + radius + "," + radius + ")");


    //     // Construct chart layout
    //     // ------------------------------

    //     // Arc
    //     var arc = d3.svg.arc()
    //         .outerRadius(radius)
    //         .innerRadius(radius / 1.75);


    //     // Pie
    //     var pie = d3.layout.pie()
    //         .value(function(d) { return d.lemons; })
    //         .sort(null);


    //     // Load data
    //     // ------------------------------

    //     d3.tsv("assets/demo_data/d3/pies/donuts_update.tsv", function(error, data) {

    //         // Pull out values
    //         data.forEach(function(d) {
    //             d.lemons = +d.lemons || 0;
    //             d.melons = +d.melons || 0;
    //         });


    //         //
    //         // Append chart elements
    //         //

    //         // Bind data
    //         var path = svg.datum(data).selectAll("path")
    //             .data(pie)
    //             .enter()
    //             .append("path")
    //                 .attr("fill", function(d, i) { return color(i); })
    //                 .attr("d", arc)
    //                 .style("stroke", "#fff")
    //                 .each(function(d) { this._current = d; }); // store the initial angles

    //         // Apply change event
    //         d3.selectAll(".donut-radios input").on("change", change);

    //         // Change values on page load
    //         var timeout = setTimeout(function() {
    //             d3.select("input[value=\"melons\"]").property("checked", true).each(change);
    //             $.uniform.update();
    //         }, 2000);

    //         // Change values
    //         function change() {
    //             var value = this.value;
    //             clearTimeout(timeout);
    //             pie.value(function(d) { return d[value]; }); // change the value function
    //             path = path.data(pie); // compute the new angles
    //             path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    //         }
    //     });


    //     // Store the displayed angles in _current.
    //     // Then, interpolate from _current to the new angles.
    //     // During the transition, _current is updated in-place by d3.interpolate.
    //     function arcTween(a) {
    //         var i = d3.interpolate(this._current, a);
    //         this._current = i(0);
    //         return function(t) {
    //             return arc(i(t));
    //         };
    //     }
    // }

///////////////DWELL TIME CHART/////////////////////


///////////////CUSTOMER DEMOGRAPHICS CHART/////////////////////

    custDemoChart(element, height) {


        // Basic setup
        // ------------------------------

        // Define main variables
        var d3Container = d3.select(element),
            margin = {top: 5, right: 20, bottom: 20, left: 40},
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height:any = height - margin.top - margin.bottom - 5;

        // Format data
        var formatPercent = d3.format(".0%");



        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1, 1);

        // Vertical
        var y = d3.scale.linear()
            .range([height, 0]);

        // Colors
        var colors = d3.scale.category20c();



        // Create axes
        // ------------------------------

        // Horizontal
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        // Vertical
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);



        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append("svg");

        // Add SVG group
        var svg = container
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Load data
        // ------------------------------

        d3.tsv("assets/demo_data/d3/bars/bars_basic.tsv", function(error, data) {

            // Pull out values
            data.forEach(function(d) {
                d.frequency = +d.frequency;
            });


            // Set input domains
            // ------------------------------

            // Horizontal
            x.domain(data.map(function(d) { return d.letter; }));

            // Vertical
            y.domain([0, d3.max(data, function(d) { return d.frequency; })]);


            //
            // Append chart elements
            //

            // Append axes
            // ------------------------------

            // Horizontal
            svg.append("g")
                .attr("class", "d3-axis d3-axis-horizontal d3-axis-strong")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Vertical
            var verticalAxis = svg.append("g")
                .attr("class", "d3-axis d3-axis-vertical d3-axis-strong")
                .call(yAxis);

            // Add text label
            verticalAxis.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 10)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("fill", "#999")
                .style("font-size", 12)
                .text("Frequency");


            // Append bars
            // ------------------------------

            svg.selectAll(".d3-bar")
                .data(data)
                .enter()
                .append("rect")
                    .attr("class", "d3-bar")
                    .attr("fill", function(d, i) { return colors(i); })
                    .attr("x", function(d) { return x(d.letter); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.frequency); })
                    .attr("height", function(d) { return height - y(d.frequency); });


            // Change data sets
            // ------------------------------

            // Attach change event
            d3.select(".toggle-sort").on("change", change);

            // Sort values on page load with delay
            var sortTimeout = setTimeout(function() {
                d3.select(".toggle-sort").property("checked", true).each(change);
                $.uniform.update();
            }, 2000);

            // Sorting function
            function change() {
                clearTimeout(sortTimeout);

                // Copy-on-write since tweens are evaluated after a delay.
                var x0 = x.domain(data.sort(this.checked
                    ? function(a, b) { return b.frequency - a.frequency; }
                    : function(a, b) { return d3.ascending(a.letter, b.letter); })
                    .map(function(d) { return d.letter; }))
                    .copy();

                var transition = svg.transition().duration(750),
                    delay = function(d, i) { return i * 50; };

                transition.selectAll(".d3-bar")
                    .delay(delay)
                    .attr("x", function(d) { return x0(d.letter); });

                transition.select(".d3-axis-horizontal")
                    .call(xAxis)
                    .selectAll("g")
                    .delay(delay);
            }
        });



        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', resize);

        // Call function on sidebar width change
        $('.sidebar-control').on('click', resize);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function resize() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);


            // Axes
            // -------------------------

            // Horizontal range
            x.rangeRoundBands([0, width], .1, 1);

            // Horizontal axis
            svg.selectAll('.d3-axis-horizontal').call(xAxis);


            // Chart elements
            // -------------------------

            // Line path
            svg.selectAll('.d3-bar').attr("width", x.rangeBand()).attr("x", function(d) { return x(d.letter); });
        }
    }

    setDate(): void {
        // Set today date using the patchValue function
        let date = new Date();
        this.fromDate.patchValue({myDate: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        }});
    }

    clearDate(): void {
        // Clear the date using the patchValue function
        this.fromDate.patchValue({myDate: null});
    }

}

