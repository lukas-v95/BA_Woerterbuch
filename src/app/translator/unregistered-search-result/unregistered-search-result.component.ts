import { Component, OnInit, ViewChild, ContentChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Entry } from '../shared/entry';
import { DialectService } from '../shared/dialect.service';

@Component({
  selector: 'app-unregistered-search-result',
  templateUrl: './unregistered-search-result.component.html',
  styleUrls: ['./unregistered-search-result.component.css']
})
export class UnregisteredSearchResultComponent implements OnInit {
@Input() childMessage;

  typesafeEntries: Entry[];
  listData: MatTableDataSource<Entry>;
  displayedColumns: string[] = ['searched', 'german', 'dialectEntry', 'partOfSpeech', 'linguisticUsage', 'synonyms', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private service: DialectService) {

    this.service.getCompleteSearchResults("dornbirnerisch", "tirolerisch", "Urloub0")
    .subscribe((resp: Entry[]) => {

        this.typesafeEntries = resp;
        this.listData = new MatTableDataSource<Entry>(this.typesafeEntries);
        this.listData.sort = this.sort;
        console.log(this.listData);

        // enable sorting
        this.listData.sortingDataAccessor = (item, property) => {
          if (property === 'dialectEntry') {
            return item.dialectB.dialectEntry;
          } else if (property === 'german') {
            return item.german.germanEntry;
          } else {
            return item[property];
          }
        };
        // enable pagination
        this.listData.paginator = this.paginator;

      });
  }

  ngOnInit() { }

  onCreate(){
    console.error("TO implement!!")
  }

}