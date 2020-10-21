import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Loan } from '../entity/Loan';

@Component({
  selector: 'app-import-table',
  templateUrl: './import-table.component.html',
  styleUrls: ['./import-table.component.css']
})
export class ImportTableComponent implements OnInit {

  dataSource: MatTableDataSource<Loan>;
  displayedColumns: string[] = ['Loan No', 'Borrower Name', 'DOB', 'Prop Address', 'Cost'];
  floodRiskOption: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dataService:DataService) {
    
  }
  ngOnInit(): void {}

  /*
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataService.loans);
  }

  ngAfterViewInit() {
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }
*/


  dataExists() {
    return this.dataService.loans != null;
  };

  formatDate(date:Date): string {
    let newDate:Date = date;
    if(typeof date == 'string')
      newDate = new Date(date);
    return newDate.getMonth()+'/'+newDate.getDate()+'/'+newDate.getFullYear();
  }

}
