import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportDataComponent } from './export-data/export-data.component';
import { FileTableComponent } from './file-table/file-table.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { ImportTableComponent } from './import-table/import-table.component';
import { SpreadsheetUploadComponent } from './spreadsheet-upload/spreadsheet-upload.component';

const routes: Routes = [
  {path:'', redirectTo:'welcome',pathMatch:'full' },
  {path:'upload',component:SpreadsheetUploadComponent},
  {path:'filetable',component:FileTableComponent},
  {path:'export',component:ExportDataComponent},
  {path:'import',component:ImportDataComponent},
  {path:'dbtable',component:ImportTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
