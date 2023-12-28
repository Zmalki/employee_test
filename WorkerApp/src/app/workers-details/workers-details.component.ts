import { Component , OnInit } from '@angular/core';
import {WorkerDetailService} from  '../shared/worker-detail.service';
import {HttpClient} from "@angular/common/http" ;
import { environment } from 'src/environments/environment';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { WorkerDetailFormComponent } from './worker-detail-form/worker-detail-form.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-workers-details',
  templateUrl: './workers-details.component.html',
  styleUrls: ['./workers-details.component.css'],
  providers: [DatePipe],
})
export class WorkersDetailsComponent implements OnInit{
  displayedColumn : string[] = [
  'workerDetailId' ,
  'workerfirstame' ,
   'workerlastName' ,
    'workerbirthday' ,
    'stardate',
    'salary',
    'action'
  ] ;
  constructor(public service: WorkerDetailService , private dialog:MatDialog, public datePipe: DatePipe){
  }
  ngOnInit() {
    this.service.refreshTable1() ;
  }
  applyFilter(event : Event){
    const filterValur = (event.target as HTMLInputElement).value ;
    this.service.dataSource.filter = filterValur.trim().toLocaleLowerCase();
    if(this.service.dataSource.paginator){
      this.service.dataSource.paginator.firstPage();
    }
  }
  deleteWork(id:string)
  {
    this.service.deleteWorker(id).subscribe({
      next :(res)=>{
        alert("Worker deleted")
        this.service.refreshTable1() ; //for auto refresh data 
      },
      error : console.log ,
    })
  }
  openAddEditEmpform(){

    const dialogRef =  this.dialog.open(WorkerDetailFormComponent);
    dialogRef.afterClosed().subscribe({
      next :(val)=>{
        if(val){
          this.service.refreshTable1();
        }
      }
    })
  }
  editWorkForm(data : any){
    this.dialog.open(WorkerDetailFormComponent ,{
      data ,
    })
  }
}
