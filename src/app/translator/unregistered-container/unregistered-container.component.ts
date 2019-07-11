import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../shared/entry';
import { DialectService } from '../shared/dialect.service';
import { FormBuilder } from '@angular/forms';
import { FormInformation } from '../unregistered-search/unregistered-search.component';

@Component({
  selector: 'app-unregistered-container',
  templateUrl: './unregistered-container.component.html',
  styleUrls: ['./unregistered-container.component.css']
})
export class UnregisteredContainerComponent implements OnInit {
  parentMessage = "hallo!";

    //dataFromForm: FormInformation;
    dataFromForm: FormInformation;    
    typesafeEntries: Entry[];

    constructor(
      public service: DialectService,
    ) { }
    
    
    ngOnInit() { }
    
    
    // einstiegspunkt nach emit()
    handleSearchRequest(dataFromForm: FormInformation) {
      console.log("data from form:", dataFromForm, dataFromForm.language1, dataFromForm.language2, dataFromForm.searchString);
      this.dataFromForm = dataFromForm;
    
      this.performRestRequest(dataFromForm.language1, dataFromForm.language2, dataFromForm.searchString);
    
    }
    
    
    performRestRequest(language1: string, language2: string, searchString: string) {
      console.log("performing rest request");
    
      this.service.getCompleteSearchResults(language1, language2, searchString)
        .subscribe((resp: Entry[]) => {
    
          this.typesafeEntries = resp;
          console.error("habe entries bekommen!", this.typesafeEntries);
          
          
          /*console.log(this.typesafeEntries);
          console.log(resp[0].myNewRoot.dialectA);
          console.log(this.typesafeEntries[0].myNewRoot.dialectA);
          console.log("hallo");
          console.log(resp[3].myNewRoot.dialectA.dialectId);
          console.log(this.typesafeEntries[0].myNewRoot.dialectA.dialectId);
          console.log("blablabal");
          console.log(resp[0].myNewRoot.dialectA.dialectEntry);
          //console.log(this.typesafeEntries[0].);
    
          */
    
          console.log("end of rest request 'getCompleteSearchResults' --> inhalt: " + this.typesafeEntries);
          console.log(this.typesafeEntries);
        })
    }
    
    }
    