import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FloodRiskStatus } from './entity/FloodRiskStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RealEstatePropertyManagement';

  constructor(private dataService:DataService) {
    
  }

  dataExists() {
    return this.dataService.loans != null && this.dataService.loans.length > 0;
  };

  floodRiskSet() {
    return this.dataService.floodRiskStatus != FloodRiskStatus.NotSet && this.dataService.floodRiskStatus != null;
  }
}
