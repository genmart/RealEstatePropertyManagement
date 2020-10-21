import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Loan } from '../entity/Loan';
import { FloodRiskStatus } from '../entity/FloodRiskStatus';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit {
  displayedColumns: string[] = ['Loan No', 'Borrower Name', 'DOB', 'Prop Address', 'Cost'];
  floodRiskOption: number;
  constructor(private dataService:DataService) {
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

  dataExists() {
    return this.dataService.loans != null;
  };

  floodRiskNotSet() {
    return this.dataService.floodRiskStatus == FloodRiskStatus.NotSet;
  }
  floodRiskAvailable() {
    return this.dataService.floodRiskStatus != FloodRiskStatus.NotAvailable;
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

}
