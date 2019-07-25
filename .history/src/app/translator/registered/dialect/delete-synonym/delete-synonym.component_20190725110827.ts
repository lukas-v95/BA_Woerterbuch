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
    public dialogRef: MatDialogRef<DialectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
    this.selectedLanguage = this.data.language;
    this.data.entry;  // complete dialect entry!

    this.allSynonyms = this.data.entry.dialect.synonymObjectList;

  }

  onClose(){
    this.dialogRef.close();
  }

  updateChange(){
    this.stateChanged = true;
  }

  onSubmit() {
    this.service.removeBidirectionalSynonyms(this.selectedLanguage, this.data.entry.dialect.dialectId, this.selectedSynonym.entryId);
    this.onClose();
  }

  onClear() {
    this.selectedSynonym = undefined;
    this.stateChanged = false;
  }
}
