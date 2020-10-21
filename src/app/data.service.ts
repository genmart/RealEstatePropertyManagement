import { Injectable } from '@angular/core';
import { Loan } from './entity/Loan';
import { FloodRiskStatus } from './entity/FloodRiskStatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import properties from './properties.json';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  private _loans: Loan[];
  private _floodRiskStatus: number;

  constructor(private httpClient : HttpClient) {
  }
  public get loans(): Loan[] {
    return this._loans;
  }
  public set loans(value: Loan[]) {
    this._loans = value;
  }
  public get floodRiskStatus(): number {
    return this._floodRiskStatus;
  }
  public set floodRiskStatus(value: number) {
    this._floodRiskStatus = value;
  }
  
  postData(): Observable<string> {
    if(this.floodRiskStatus == FloodRiskStatus.NO) {
      for(let loan of this.loans)
        loan.setFloodRisk(null);
    }
    let url:string = this.urlBuilder['add'];
    console.log(this.loans);
    console.log('URL : '+url);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return  this.httpClient.post(url,this.loans,{'headers': headers, responseType: 'text'})
      .pipe(map(response => response.toString()));
  }

  getData(): Observable<Loan[]> {
    let url:string = this.urlBuilder('get');
    console.log('URL : '+url);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this.httpClient.get(url,{'headers': headers, responseType: 'json'})
    .pipe(map(response => <Loan []>response));
  }

  urlBuilder(action:string):string {
    let urlJson:string = properties['springbootBackend'];
    let protocol:string = urlJson['protocol'];
    let host:string = urlJson['hostname']['host'];
    let port:string = urlJson['hostname']['port'];
    let hostname:string = host+port;
    let path:string = '';
    if(action == 'get')
      path = urlJson['getPath'];
    else
      path = urlJson['addPath'];
    return protocol+hostname+path;
  }

}



