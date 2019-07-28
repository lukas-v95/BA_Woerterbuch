import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EditGermanEntryComponent } from './edit-german-entry/edit-german-entry.component';
import { NotificationService } from '../../shared/notification.service';
import { Entry, German } from '../../shared/entry';
import { NewGermanEntryComponent } from './new-german-entry/new-german-entry.component';
import { GermanServiceService } from '../../shared/german-service.service';


@Component({
  selector: 'app-german-list',
  templateUrl: './german-list.component.html',
  styleUrls: ['./german-list.component.css']
})
export class GermanListComponent implements OnInit {
  selectedLanguage: string;

  constructor(private service: GermanServiceService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['germanEntry', 'germanId', 'references', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  entryList: {};

  typesafeEntries: German[];
  currentViewData: German[];


  ngOnInit() {
    this.service.getAllGermanEntries()
      .subscribe((resp: German[]) => {
        this.currentViewData = resp;
        this.listData = new MatTableDataSource<German>(this.currentViewData);
        this.listData.sort = this.sort;

        // enable sorting
        this.listData.sortingDataAccessor = (item, property) => {
          if (property === 'germanEntry') {
            return item.germanEntry;
          } else if (property === 'germanId') {
            return item.germanId;
          } else {
            return item[property];
          }
        };

        // enable pagination
        this.listData.paginator = this.paginator;

      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.service.initGermanForm();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(NewGermanEntryComponent, {
      maxWidth: '70vw',
      maxHeight: '70vh',
     // height: '70%',
     // width: '70%',
     
      data: {
        selectedLanguage: this.selectedLanguage,
        previousViewData: this.currentViewData,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });

  }

  onEdit(row) {
    this.service.initGermanForm();
    this.service.setGermanForm(row); // pass german Object!

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(EditGermanEntryComponent, {
      maxWidth: '70vw',
      maxHeight: '70vh',
      height: '70%',
      width: '70%',
      data: {
        selectedLanguage: this.selectedLanguage,
        germanId: row.germanId,
        previousEntryData: row,
        previousViewData: this.currentViewData,
      }
    });
    dialogRef.afterClosed().subscribe((result: German[]) => {
      this.currentViewData = result;
      this.ngOnInit();
    });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteGermanEntry($key.germanId);
      //this.updateViewOnDelete($key);
      this.ngOnInit();

    }
  }

  updateViewOnDelete($key) {

    for (let i = 0; i < this.currentViewData.length; i++) {
      if (this.currentViewData[i].germanId === $key.germanId) {

        for (; i < (this.currentViewData.length - 1); i++) {
          this.currentViewData[i].germanId = this.currentViewData[i + 1].germanId;
          this.currentViewData[i].germanEntry = this.currentViewData[i+1].germanEntry;
          this.currentViewData[i].reverseTranslations = this.currentViewData[i+1].reverseTranslations;

        }
        this.currentViewData[i].germanId = undefined;
          this.currentViewData[i].germanEntry = undefined;
          this.currentViewData[i].reverseTranslations = undefined;

        return;
      }
    }
  }
}
