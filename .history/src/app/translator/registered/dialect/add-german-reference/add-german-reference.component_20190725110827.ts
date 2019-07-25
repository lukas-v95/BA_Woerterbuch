import { Component, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef} from '@angular/material'
import { Inject } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { DialectService } from '../../../shared/dialect.service';
import { Dialect } from '../../../shared/dialect';
import { DialectComponent } from '../dialect.component';
import { German } from '../../../shared/german';
@Component({
  selector: 'app-add-german-reference',
  templateUrl: './add-german-reference.component.html',
  styleUrls: ['./add-german-reference.component.css']
})
export class AddGermanReferenceComponent implements OnInit {

  constructor(
    private service: DialectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DialectComponent>, // das richtige? löschen?
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }
  //dialectListData: MatTableDataSource<any>;
  germanListData: MatTableDataSource<any>;

  //displayedDialectColumns: string[] = ['dialectEntry', 'partOfSpeech', 'linguisticUsage', 'synonyms', 'synonymsCB'];
  displayedGermanColums: string[] = ['germanEntry', 'germanId', 'references', 'referenceIcons'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  entryList: {};
  typesafeEntries: Dialect[];
  typesafeGermanEntries: German[];

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.getAllGermanEntries();
  }

  getAllGermanEntries(){
    this.service.getAllGermanEntries()
      .subscribe((resp: German[]) => {
        this.typesafeGermanEntries = resp;
        this.germanListData = new MatTableDataSource<German>(this.typesafeGermanEntries);
        this.germanListData.sort = this.sort;

        // enable sorting
        this.germanListData.sortingDataAccessor = (item, property) => {
          if (property === 'germanEntry') { // TODO: check if correct!!
            return item.german.germanEntry; // check here too! davor: item.dialect.dialectEntry
          } else if (property === 'germanId') {
            return item.german.germanEntry.synonymObjectList.entryName;
          } else {
            return item[property];
          }
        };
        // enable pagination
        this.germanListData.paginator = this.paginator;

      });
  }

  onClose(){
    this.dialogRef.close();
  }

  // calls addBidirectionalReference()  dialectLanguage: string, dialectId: string, germanId: string
  addGermanRef(entry){
    let dialectLanguage = this.data.language;
    let dialectEntry = this.data.dialectId;

    // dialektSprache, dialektId, dialektSprache2, DialektId2, GermanID
    this.service.addBidirectionalReference(dialectLanguage, dialectEntry, entry.german.germanId);
  }
}
