import { Component, OnInit, ViewChild } from '@angular/core';
import { DialectService } from '../../../shared/dialect.service';
import { NotificationService } from '../../../shared/notification.service';
import { MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MatInputModule } from '@angular/material';
import { DialectComponent } from '../dialect.component';
import { ILanguage } from '../../../shared/language';
import { MatButtonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule } from '@angular/material';



@Component({
  selector: 'app-create-dialect-language',
  templateUrl: './create-dialect-language.component.html',
  styleUrls: ['./create-dialect-language.component.css']
})
export class CreateDialectLanguageComponent implements OnInit {



  availableLanguages: ILanguage[];
  displayedColumns = ['language'];
  dataSource: MatTableDataSource<ILanguage>;
  buttonActive = false;
  userInput;

  // neu:
  searchKey;
  onSearchClear(){

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: DialectService,
    public dialogRef: MatDialogRef<DialectComponent>) {}

    ngOnInit(): void { }


  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.service.getLanguages()
        .subscribe((resp: ILanguage[]) => {
            this.availableLanguages = resp;
            this.dataSource = new MatTableDataSource(resp);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
}


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.buttonControl(filterValue);
    console.log(this.dataSource.filter, filterValue);
  }

  buttonControl(filterValue){
    if(filterValue.length < 4){
      this.buttonActive = false;
    } else {
      this.buttonActive = true;
    }
  }


  onSubmit() { 
    console.log(this.userInput);
    this.service.createNewLanguage(this.userInput);
  }

  onClear() {
    this.userInput = "";
    this.buttonControl("");
   }

   onClose(){
    this.dialogRef.close();
   }

}
