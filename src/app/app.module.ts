import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SpreadsheetUploadComponent } from './spreadsheet-upload/spreadsheet-upload.component';
import { LoadTableComponent } from './load-table/load-table.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { HttpClientModule} from '@angular/common/http';
import { ImportDataComponent } from './import-data/import-data.component';
import { ImportTableComponent } from './import-table/import-table.component';
import { FileTableComponent } from './file-table/file-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SpreadsheetUploadComponent,
    LoadTableComponent,
    ExportDataComponent,
    ImportDataComponent,
    ImportTableComponent,
    FileTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
