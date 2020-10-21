import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../entity/Loan';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  
  message:string;
  status:string;
  statusColor:string;

  constructor(private dataService:DataService, private httpClient : HttpClient ) {   
  }

  ngOnInit(): void {
    this.status = 'Pending';
    this.statusColor = '#555';
  }

  import() {
    /*
    this.dataService.getSingleRow().subscribe(data => {
      
      console.log(data);
      try {
          //this.dataService.loans = <Loan[]>JSON.parse(data);
          this.status = 'Success';
          this.statusColor = "#008000";
          this.message = 'SuccessFully Retrieved all records in the database!';
          this.dataService.dataSource = new MatTableDataSource(this.dataService.loans);
      } catch (e) {
          console.log(e);
          this.status = 'Failure';
          this.statusColor = '#800000';
          this.message = data;
      }
    });
    */
    this.dataService.getData().subscribe(data => {
      console.log(data);
      console.log(data.length);
      try {
          //this.dataService.loans = <Loan[]>JSON.parse(data);
          if(data.length==0) {
            this.status = 'Empty Data';
            this.message = 'No records have been added to the database';
          } else {
            this.status = 'Success';
            this.statusColor = "#008000";
            this.message = 'Successfully retrieved all records in the database!' + '\n' + 'response data type: '+typeof data;
            this.dataService.loans = data;
            console.log('response data type: '+typeof data);
          }
          //console.log('Loan No: '+ typeof data[0].getLoanNumber() +', Borrower Name: '+ typeof data[0].getBorrowerName() +', Cost: '+ typeof data[0].getCost() +', DOB: '+ data[0].getDob() +', Prop Address: '+ typeof data[0].getPropertyAddress() +', Flood Risk: '+ typeof data[0].getFloodRisk());
      } catch (e) {
          console.log(e);
          this.status = 'Failure';
          this.statusColor = '#800000';
          this.message = JSON.stringify(data);
      }
    });
    
  }

}
