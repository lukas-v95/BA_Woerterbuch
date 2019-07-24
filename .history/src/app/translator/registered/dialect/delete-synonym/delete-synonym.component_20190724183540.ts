import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef} from '@angular/material'
import { Inject } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { DialectService } from '../../../shared/dialect.service';
import { Dialect } from '../../../shared/dialect';
import { DialectComponent } from '../dialect.component';
import { German } from '../../../shared/german';

@Component({
  selector: 'app-delete-synonym',
  templateUrl: './delete-synonym.component.html',
  styleUrls: ['./delete-synonym.component.css']
})
export class DeleteSynonymComponent implements OnInit {

  selectedSynonym;
  allSynonyms;
  selectedLanguage;
  stateChanged = false;

  value: string;
  viewValue: string;

  constructor(private service: DialectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DialectComponent>, // das richtige? löschen?
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.selectedLanguage = this.data.language;
    this.data.entry;  // complete dialect entry!

    console.log("in init delete synonym component!", this.data.language, this.data.entry.dialect.synonymObjectList);

    this.allSynonyms = this.data.entry.dialect.synonymObjectList;

  }

  ngAfterViewInit(): void {
    console.log("To Do");
  }

  onClose(){
    this.dialogRef.close();
  }


  updateChange(){
    console.log("change called");
    this.stateChanged = true;
  }

  onSubmit(){
    console.error("sel syn: ", this.selectedSynonym);
    this.service.removeBidirectionalSynonyms(this.selectedLanguage, this.data.entry.dialect.dialectId, this.selectedSynonym.entryId);
    this.onClose();
  }

  onClear() {
    this.selectedSynonym = undefined;
    this.stateChanged = false;
  }
}
