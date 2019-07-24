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


  
  ngOnInit() {
    console.log("inon init")
    console.log("aus neuer component:" , this.data.language);
    console.log("aus neuer component:" , this.data.dialectId);
  }

  ngAfterViewInit(): void {
    console.log("after init:")
    this.getAllGermanEntries();
  //  this.getAllDialectEntries();
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  getAllGermanEntries(){
    console.error("TODO")
    this.service.getAllGermanEntries()
      .subscribe((resp: German[]) => {
        console.log(resp);
        this.typesafeGermanEntries = resp;
        console.log("getAllGermanEntries inhalt: ", this.typesafeGermanEntries)
        this.germanListData = new MatTableDataSource<German>(this.typesafeGermanEntries);
        this.germanListData.sort = this.sort;
        console.log("daten aus der dialektliste: ", this.germanListData);

        // enable sorting
        // TODO:
        console.error("TODO: in add german reference component", resp);
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

  
  /*getAllDialectEntries(){
    console.error("TODO")
    this.service.getAllDialectEntries(this.data.language)
      .subscribe((resp: Dialect[]) => {
        console.log(resp);
        this.typesafeEntries = resp;
        this.dialectListData = new MatTableDataSource<Dialect>(this.typesafeEntries);
        this.dialectListData.sort = this.sort;
        console.log("daten aus der dialektliste: ", this.dialectListData);

        // enable sorting
        // TODO:
        this.dialectListData.sortingDataAccessor = (item, property) => {
          if (property === 'dialectEntry') {
            return item.dialect.dialectEntry;
          } else if (property === 'synonym') {
            return item.dialect.synonymObjectList.entryName;
          } else {
            return item[property];
          }
        };
        // enable pagination
        this.dialectListData.paginator = this.paginator;

      });
    
  }
    */








  onClose(){
    this.dialogRef.close();
  }

  // calls addBidirectionalReference()  dialectLanguage: string, dialectId: string, germanId: string
  addGermanRef(entry){
    let dialectLanguage = this.data.language;
    let dialectEntry = this.data.dialectId;
    console.error("entry.german.germanId:", entry.german.germanId);

    console.error("recheck if ok:")
    console.log(entry, "<------>");
    // dialektSprache, dialektId, dialektSprache2, DialektId2, GermanID
    this.service.addBidirectionalReference(dialectLanguage, dialectEntry, entry.german.germanId);
    console.warn("reference should be added")
    //this.service.addBidirectionalSynonym(this.data.language, this.data.dialectId, entry.dialect.dialectId);
    

  }

  addReferencesCompleteSet(entry){
    console.warn("TODO: to implement");

  }

  removeGermanRef(entry){

  }

}
