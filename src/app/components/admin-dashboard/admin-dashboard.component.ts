import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private service: StoreService) { }

  currentgraph: string = 'ctx';
  orderGraph: boolean = true;
  categoryGraph: boolean = false;
  categoryRevenueGraph: boolean = false;
  revenueGraph:boolean=false;

  year: string = new Date().toString().slice(11, 15);

  orderDate: string[] = [];
  orderCount: number[] = [];
  categories: string[] = [];
  revenue:number[]=[];
  categoryCount: number[] = [];

  ordersChart: echarts.ECharts | undefined;
  categoriesChart: echarts.ECharts | undefined;
  categoriesRevenueChart: echarts.ECharts | undefined;
  revenueChart: echarts.ECharts | undefined;

  dateCountMap: Map<string, number> = new Map();
  categoryCountMap: Map<string, number> = new Map();
  categoryRevenueCountMap: Map<string, number> = new Map();
  revenueCountMap:Map<string,number>=new Map();


  ngOnInit() {
    this.dataCall();
  }

  show() {
    this.dataCall();
  }

  dataCall() {
    this.dateCountMap.clear();
    this.categoryCountMap.clear();
    this.categoryRevenueCountMap.clear();
    this.revenueCountMap.clear();

    this.service.allOrder().subscribe({
      next: (data) => {
        data.forEach(obj => {
          if (obj.orderDate.substring(0, 4) == this.year) {
            this.service.getProduct(obj.productId).subscribe({
              next: (data) => {
                //This is used by pie chart category wise revenue
                if (this.categoryRevenueCountMap.has(data.type)) {
                  this.categoryRevenueCountMap.set(data.type, this.categoryRevenueCountMap.get(data.type)! + obj.totalPrice);
                  console.log("if working");
                }
                else {
                  this.categoryRevenueCountMap.set(data.type, obj.totalPrice);
                  console.log("else working");
                }
                //Category Wise sales
                if (this.categoryCountMap.has(data.type)) {
                  this.categoryCountMap.set(data.type, this.categoryCountMap.get(data.type)! + 1);
                }
                else {
                  this.categoryCountMap.set(data.type, 1);
                }
              }
            })


            // This is used for montly orders Placed chart
            if (this.dateCountMap.has(obj.orderDate.substring(0, 7))) {
              this.dateCountMap.set(obj.orderDate.substring(0, 7), this.dateCountMap.get(obj.orderDate.substring(0, 7))! + 1);
            }
            else {
              this.dateCountMap.set(obj.orderDate.substring(0, 7), 1);
            }

            //Yearly revenue calculation
            if (this.revenueCountMap.has(obj.orderDate.substring(0, 7))) {
              this.revenueCountMap.set(obj.orderDate.substring(0, 7), this.revenueCountMap.get(obj.orderDate.substring(0, 7))! + obj.totalPrice);
            }
            else {
              this.revenueCountMap.set(obj.orderDate.substring(0, 7), obj.totalPrice);
            }
          }


        });
        if (this.orderGraph) {
          this.orderChart();
        }
        if (this.categoryGraph) {
          setTimeout(() => {
            this.categoryChart();
          }, 1000);
        }
        if (this.categoryRevenueGraph) {
          setTimeout(() => {
            this.categoryRevenueChart();
          }, 1000);
        }
        if(this.revenueGraph){
          this.yearlyRevenueChart();
        }

      }
    });
  }

  orderChart() {
    this.orderDate.length = 0;
    this.orderCount.length = 0;


    this.dateCountMap.forEach((count, date) => {
      this.orderDate.push(date);
      this.orderCount.push(count);
    });

    this.orderGraph = true;
    this.categoryGraph = false;
    this.categoryRevenueGraph = false;
    this.revenueGraph=false;

    setTimeout(() => {
      const canvas = document.getElementById('order');
      this.ordersChart = echarts.init(canvas);

      this.ordersChart.setOption({
        xAxis: {
          type: 'category',
          data: this.orderDate,
          axisLabel: {
            interval: 0,
            rotate: 0,
            color:'black',
            fontStyle:'bold'
          },
          name: '<---- Order Dates ---->',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            padding: [30, 0, 0, 0],
            color:'black',
            fontStyle:'bold'
          }
        },
        yAxis: {
          type: 'value',
          name: "<---- Total Orders ---->",
          nameLocation: 'middle',
          nameRotate: 90,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 30, 0],
            color:'black',
            fontStyle:'bold'
          },
          axisLabel: {
            color:'black',
            fontStyle:'bold',
            fontSize:13
          },
        },
        series: [
          {
            data: this.orderCount,
            type: 'line',
            smooth: false,
            itemStyle: {
              color: '#37B7C3'
            },
            
          },
          {
            data: this.orderCount,
            type: 'bar',
            barWidth: '25%',
            itemStyle: {
              color: '#088395'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        }
      });
    }, 50); //THis solve the issue of DOm getting loaded before the canvas element when we reclick on button

  }

  categoryChart() {
    this.categories.length = 0;
    this.categoryCount.length = 0;

    this.orderGraph = false;
    this.categoryGraph = true;
    this.categoryRevenueGraph = false;
    this.revenueGraph=false;

    this.categoryCountMap.forEach((count, category) => {
      this.categories.push(category);
      this.categoryCount.push(count);
    });

    setTimeout(() => {
      const canvas = document.getElementById('category');
      this.categoriesChart = echarts.init(canvas);

      this.categoriesChart.setOption({
        xAxis: {
          type: 'category',
          data: this.categories,
          name: '<---- Categories ---->',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            padding: [30, 0, 0, 0],
            color:'black',
            fontStyle:'bold'
          },
          axisLabel: {
            color:'black',
            fontStyle:'bold',
          },
        },
        yAxis: {
          type: 'value',
          name: "<---- Number Of Orders ---->",
          nameLocation: 'middle',
          nameRotate: 90,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 30, 0],
            color:'black',
            fontStyle:'bold'
          },
          axisLabel: {
            color:'black',
            fontStyle:'bold',
            fontSize:13
          },
        },
        series: [
          {
            data: this.categoryCount,
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              color: '#5A72A0'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        }
      });
    }, 50); //THis solve the issue of DOm getting loaded before the canvas element when we reclick on button
  }

  categoryRevenueChart() {
    this.orderGraph = false;
    this.categoryGraph = false;
    this.categoryRevenueGraph = true;
    this.revenueGraph=false;

    console.log(this.categoryRevenueCountMap);
    const chartData=Array.from(this.categoryRevenueCountMap,([name,value])=>({value,name}));
    console.log("array");
    console.log(chartData);

    setTimeout(() => {
      const canvas = document.getElementById('categoryRevenue');
      this.categoriesRevenueChart = echarts.init(canvas);

      this.categoriesRevenueChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle:{
            fontSize:16,
            color:'black',
            fontStyle:'bold'
          }
        },
        series: [
          {
            data: chartData,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10
            },
            label: {
              show: false,
              position: 'center',
              formatter:'Rs.{c}',
            },
            
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
      });
    }, 50); //THis solve the issue of DOm getting loaded before the canvas element when we reclick on button


  }

  yearlyRevenueChart(){
    this.orderDate.length = 0;
    this.revenue.length = 0;

    this.orderGraph = false;
    this.categoryGraph = false;
    this.categoryRevenueGraph = false;
    this.revenueGraph=true;

    this.revenueCountMap.forEach((count, date) => {
      this.orderDate.push(date);
      this.revenue.push(count);
    });

    setTimeout(() => {
      const canvas = document.getElementById('revenue');
      this.revenueChart = echarts.init(canvas);

      this.revenueChart.setOption({
        xAxis: {
          type: 'category',
          data: this.orderDate,
          axisLabel: {
            interval: 0,
            rotate: 0
          },
          name: '<---- Order Dates ---->',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            padding: [30, 0, 0, 0]
          }
        },
        yAxis: {
          type: 'value',
          name: "<---- Total Revenue ---->",
          nameLocation: 'middle',
          nameRotate: 90,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 40, 0]
          }
        },
        series: [
          {
            data: this.revenue,
            type: 'line',
            smooth: true,
            itemStyle: {
              color: ''
            }
          },
          {
            data: this.revenue,
            type: 'bar',
            barWidth: '25%',
            itemStyle: {
              color: '#088395'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        }
      });
    }, 50); //THis solve the issue of DOm getting loaded before the canvas element when we reclick on button


  }

}
