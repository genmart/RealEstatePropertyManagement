import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Loan } from '../entity/Loan';
import { FloodRiskStatus } from '../entity/FloodRiskStatus';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-load-table',
  templateUrl: './load-table.component.html',
  styleUrls: ['./load-table.component.css']
})

export class LoadTableComponent implements OnInit {

  dataSource: MatTableDataSource<Loan>;
  displayedColumns: string[] = ['Loan No', 'Borrower Name', 'DOB', 'Prop Address', 'Cost'];
  floodRiskOption: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dataService:DataService) {
    
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataService.loans);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleFloodRisk() {
    const FLOOD_RISK:string = 'Flood Risk';
    if (this.floodRiskOption == FloodRiskStatus.YES)
      this.displayedColumns.push(FLOOD_RISK);
    else if (this.floodRiskOption == FloodRiskStatus.NO)
      this.displayedColumns = ['Loan No', 'Borrower Name', 'DOB', 'Prop Address', 'Cost'];
    else {    }
    this.dataService.floodRiskStatus = this.floodRiskOption;
  }

  formatDate(date:Date): string {
    let newDate:Date = date;
    if(typeof date == 'string')
      newDate = new Date(date);
    return newDate.getMonth()+'/'+newDate.getDate()+'/'+newDate.getFullYear();
  }


  dataExists() {
    return this.dataService.loans != null;
  };

  floodRiskSet() {
    return this.dataService.floodRiskStatus != FloodRiskStatus.NotSet;
  }
  floodRiskAvailable() {
    return this.dataService.floodRiskStatus != FloodRiskStatus.NotAvailable;
  }

}
