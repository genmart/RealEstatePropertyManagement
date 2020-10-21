import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loan } from '../entity/Loan';
import { FloodRiskStatus } from '../entity/FloodRiskStatus';
//import * as readXLSX from 'read-excel-file';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';


@Component({
  selector: 'app-spreadsheet-upload',
  templateUrl: './spreadsheet-upload.component.html',
  styleUrls: ['./spreadsheet-upload.component.css']
})
export class SpreadsheetUploadComponent implements OnInit {

  accept:string;
  form: FormGroup;
  
  constructor(private fb: FormBuilder, private dataService:DataService){
    this.dataService.loans = <Loan[]>[];
  }

  ngOnInit(): void {
  this.accept = ".xlsx,.xls,.csv";
  this.form = this.fb.group({
    file: []
  });
  
  }

  readUploadFile() {
    console.log(this.form.value.file.name);
    const FILE_EXTENSION:string = this.form.value.file.name.split('.')[1]; 
    const reader: FileReader = new FileReader();
    //read file contents from form
    reader.readAsBinaryString(this.form.value.file);
    let fileData:any = [];
    reader.onloadend = (e) => {
      if(FILE_EXTENSION == 'xlsx' || FILE_EXTENSION == 'xls') {
      // read file contents as Excel workbook
      const wb: XLSX.WorkBook = XLSX.read(e.target.result,{ type: 'binary' });
      // get first sheet from workbook
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // convert rows and columns from excel into a 2D iterable object
      fileData = XLSX.utils.sheet_to_json(ws, { header: 1}).slice(1);
      // convert Excel date into standard datetime format
      for(let excelRow of fileData)
        excelRow[2]=new Date(Math.round((parseInt(excelRow[2]) - 25569)*86400*1000));
    } else {
      // separate the file string by lines
      let csvLines= e.target.result.toString().split('\r\n');
      csvLines = csvLines.splice(1,csvLines.length-1);
      // separate each line by columns and format the data
      for(let line of csvLines) {
        if(line.split(',').length>4) {
        let csvRow:any[] = line.toString().split(',');
        csvRow[2] = new Date(csvRow[2]);
        csvRow[0] = parseInt(csvRow[0]);
        csvRow[4] = parseInt(csvRow[4]);
        fileData.push(csvRow);
        }
      }
    }
    
    //convert data grabbed from file to entity list
    for(let row of fileData) {
      let loan:Loan = new Loan();
      loan.setLoanNumber(row[0]);
      loan.setBorrowerName(row[1]);
      loan.setDob(row[2]);
      loan.setPropertyAddress(row[3]);
      loan.setCost(row[4]);
      loan.setFloodRisk(row[5]);
      this.dataService.loans.push(loan);
    }
      console.log(JSON.stringify(this.dataService.loans));
      console.log('flood risk='+this.dataService.loans[0].getFloodRisk());
      if(this.dataService.loans[0].getFloodRisk() == null)
        this.dataService.floodRiskStatus = FloodRiskStatus.NotAvailable;
      else
        this.dataService.floodRiskStatus = FloodRiskStatus.NotSet;
      //set dataSource used by table
    }
  
  }
  
  dataExists() {
    return this.dataService.loans != null;
  };

}
