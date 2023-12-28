import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkerDetailFormComponent } from './workers-details/worker-detail-form/worker-detail-form.component';
import { WorkerDetailService } from './shared/worker-detail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
})
export class AppComponent {
  title = 'WorkerApp';
  constructor(private dialog:MatDialog ,private service : WorkerDetailService ){
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
}
