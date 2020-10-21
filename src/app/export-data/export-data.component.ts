import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FloodRiskStatus } from '../entity/FloodRiskStatus';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent implements OnInit {

  message:string;
  status:string;
  statusColor:string;

  constructor(private dataService:DataService, private httpClient : HttpClient ) {   
  }

  

  export() {
    this.dataService.postData().subscribe(data => {
      console.log(data);
      this.message=data;
      if(this.message.indexOf('Success')>-1) {
        this.status = 'Success';
        this.statusColor = "#008000";
      }
      else {
        this.status = 'Failure';
        this.statusColor = '#800000';
      }
    });
  }

  ngOnInit(): void {
    this.status = 'Pending';
    this.statusColor = '#555';
  }

  floodRiskSet() {
    return this.dataService.floodRiskStatus !=  FloodRiskStatus.NotSet;
  }
  
}
