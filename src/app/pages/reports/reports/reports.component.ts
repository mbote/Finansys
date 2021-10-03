import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

import * as toastr from 'toastr';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any = 0;
  revenueChartData: any = 0;

  chartOption = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month!: ElementRef;
  @ViewChild('year') year!: ElementRef;


  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.entryService.getAll()
      .subscribe(
        categories => this.categories = categories
      )
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    console.log('-------------- ' + month)
    console.log('-------------- ' + year)

    if (!month || !year)
      toastr.error("você precisa selecionar o mês e o ano para poder gerar relatorio");
    else
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValue.bind(this));
  }

  private setValue(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == "revenue")
        revenueTotal += Number(entry.amount);
      else
        expenseTotal += Number(entry.amount);
    })

    this.expenseTotal = expenseTotal;
    this.revenueTotal = revenueTotal;
    this.balance = this.revenueTotal - this.expenseTotal;
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de despesas', '#e03131');
  }

  private getChartData(entryType:string, title:string, color:string){
    const chartData: any[] = [];
    this.categories.forEach(category => {

      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId == category.id) && entry.type == entryType
      );

      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + Number(entry.amount),0
        )
        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets:[{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }
}
