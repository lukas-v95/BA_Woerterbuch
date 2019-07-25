import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { DialectService } from '../../../shared/dialect.service';
import { Dialect } from '../../../shared/dialect';
import { DialectComponent } from '../dialect.component';

@Component({
  selector: 'app-add-synonym',
  templateUrl: './add-synonym.component.html',
  styleUrls: ['./add-synonym.component.css']
})
export class AddSynonymComponent implements OnInit {

  constructor(
    private service: DialectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DialectComponent>, // das richtige?
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }
    
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['dialectEntry', 'partOfSpeech', 'linguisticUsage', 'synonyms', 'synonymsCB'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  entryList: {};
  typesafeEntries: Dialect[];
  selectedElementId;



  ngOnInit() {
    this.selectedElementId = this.data.dialectId;
    this.getAllDialectEntries();
  }


  getAllDialectEntries(){
    this.service.getAllDialectEntries(this.data.language)
      .subscribe((resp: Dialect[]) => {
        this.typesafeEntries = this.removeClickedRow(resp);
        this.listData = new MatTableDataSource<Dialect>(this.typesafeEntries);
        this.listData.sort = this.sort;

        // enable sorting
        this.listData.sortingDataAccessor = (item, property) => {
          if (property === 'dialectEntry') {
            return item.dialect.dialectEntry;
          } else if (property === 'synonym') {
            return item.dialect.synonymObjectList.entryName;
          } else {
            return item[property];
          }
        };
        // enable pagination
        this.listData.paginator = this.paginator;

      });
  }

  removeClickedRow(resp){
    for(let i = 0; i < resp.length; i ++){
      // swap last element of array to the position of the clicked array!
        if(resp[i].dialect.dialectId === this.selectedElementId){
          resp[i] = resp[(resp.length-1)];
          return resp.slice(0, resp.length-1);
        }
    }
  }

  addSynonym(row){
    this.service.addBidirectionalSynonym(this.data.language, this.data.dialectId, row.dialect.dialectId);
    this.getAllDialectEntries();

  }


  onClose() {
    this.dialogRef.close();
  }
}
