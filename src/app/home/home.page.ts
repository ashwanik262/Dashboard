import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../provider/user.service';
import { PopulationService } from '../provider/population.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  // @ViewChild('CostSavingCanvas') CostSavingCanvas;
  public accountdata: any;
  duration: any;
  barChart: any;
  upperRange: any;
  lowerRange: any;
  todayPopulation: any = [];
  tomorrowPopulation: any;
  doughnutChart: any;
  costSavingChart: any;
  country: any = "India";
  lineChart: any;
  countries: any = [];
  agewiseData: any = [];
  age: any = []
  male: any = [];
  female = [];
  isFilterOpen: boolean = false;
  maleMortalityData:any=[];
  femaleMortalityData:any=[];
  maleMortalityPercent:any=[];
  femaleMortalityPercent:any=[];
  mortalityAgeArray:any=[];
  isMortalityFilterOpen:boolean=false;

  
  constructor(public api: UserService, private population: PopulationService, public loadingController: LoadingController) {
    Chart.defaults.global.legend.position = "bottom"
    Chart.defaults.global.legend.labels.boxWidth = 10;
    Chart.defaults.global.legend.labels.padding = 15;
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.animation.easing = "easeInOutSine";
  }

  ngOnInit() {
    this.getCountryList();
    this.onCountryChange(this.country);
    this.mortalityDistribution(this.country)
  }

  getCountryList() {
    this.population.getCountryList().subscribe(res => {
      this.countries = res;
    }, err => {
      console.log(err);
    });
  }

  async todayTomorrowdata(country) {
    await this.population.todayTomorrowdata(country).subscribe(res => {
      this.todayPopulation = res;
    }, err => {
      console.log(err);
    });
  }

  async mortalityDistribution(country) {
    this.maleMortalityPercent=[];
    this.femaleMortalityPercent=[];
    this.mortalityAgeArray=[];
    await this.population.mortalityDistribution(country).subscribe(res => {
      this.maleMortalityData = res[0].mortality_distribution;
      this.femaleMortalityData =res[1].mortality_distribution;
      for (let index = 1; index <this.maleMortalityData.length; index++) {
        this.mortalityAgeArray.push(this.maleMortalityData[index].age)
        this.maleMortalityPercent.push(this.maleMortalityData[index].mortality_percent)
        this.femaleMortalityPercent.push(this.femaleMortalityData[index].mortality_percent)
      }
      // for (let index = 1; index <this.femaleMortalityData.length; index++) {
      //   this.femaleMortalityPercent.push(this.femaleMortalityData[index].mortality_percent)
      // }
      this.initLineChart();
    }, err => {
      console.log(err);
    });
  }

  async onCountryChange(country) {
    let CustomEvent = {
      detail: {
        value: {
          lower: 20,
          upper: 50
        }
      }
    }
    await this.population.getPopulation(country, "2018").subscribe(res => {
      this.agewiseData = res;
      this.range(CustomEvent);
      this.todayTomorrowdata(country)
      this.mortalityDistribution(country)
    }, err => {
      console.log(err);
    });
  }

  range(CustomEvent) {
    this.lowerRange = CustomEvent.detail.value.lower;
    this.upperRange = CustomEvent.detail.value.upper;
    this.age = [];
    this.male = [];
    this.female = [];
    for (let index = this.lowerRange; index <= this.upperRange; index++) {
      this.age.push(this.agewiseData[index].age)
      this.male.push(this.agewiseData[index].males)
      this.female.push(this.agewiseData[index].females)
    }
    this.initBarChart();
  }

  openfilter() {
    this.isFilterOpen = !this.isFilterOpen
  }

  openMortalityFilter(){
     this.isFilterOpen = !this.isFilterOpen
  }

  initBarChart() {
    if (this.barChart != undefined) {
      this.barChart.destroy();
    }
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.age,
        datasets: [
          {
            label: "Female",
            backgroundColor: "#f25454",
            borderColor: "#f25454",
            data: this.female
          },
          {
            label: "Male",
            backgroundColor: "#24d6ea",
            borderColor: "#24d6ea",
            data: this.male
          }
          // {
          //     label: "Hybrid",
          //     backgroundColor: "rgba(108, 117, 193, 1)",
          //     borderColor: "rgba(108, 117, 193, 1)",
          //     data: this.MixData
          // }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
  }

  initLineChart() {
    if (this.lineChart != undefined) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.mortalityAgeArray,
        datasets: [
          {
            label: "Male",
            fill: true,
            lineTension: 0.4,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.maleMortalityPercent,
            spanGaps: false,
            steppedLine:false,
          },
          {
            label: "Female",
            fill: true,
            lineTension: 0.4,
            backgroundColor: "#FDEDED",
            borderColor: "#f25454",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#f25454",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#f25454",
            pointHoverBorderColor: "#FDEDED",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.femaleMortalityPercent,
            spanGaps: false,
            steppedLine:false
          }
        ]
      }

    });

  }

  doRefresh(event) {
    this.country = "India";
    this.getCountryList();
    this.initBarChart();
    this.initLineChart();
    this.onCountryChange(this.country);

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
