import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Config } from '../core/config';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class CareersComponent implements OnInit {
  public uploader: FileUploader;
  public uploaderAdmin: FileUploader;
  public uploaderOps: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  constructor(
    private config: Config
  ) { 
    
  }

  ngOnInit() {
     this.uploader = new FileUploader({
      url: `${this.config.baseUrl}career/upload`,
      itemAlias: 'cv'
    });
    this.uploaderAdmin = new FileUploader({
      url: `${this.config.baseUrl}career/upload`,
      itemAlias: 'admin'
    });
    this.uploaderOps = new FileUploader({
      url: `${this.config.baseUrl}career/upload`,
      itemAlias: 'op'
    });
  }

    uploadCv(){

    this.uploader.uploadAll();
    this.uploader.onCompleteAll();
    console.log(this.uploader.onCompleteAll());
  }

  uploadAdmin(){

    this.uploaderAdmin.uploadAll();
    this.uploaderAdmin.onCompleteAll();
    console.log(this.uploaderAdmin.onCompleteAll());
  }

  uploadOps(){

    this.uploaderOps.uploadAll();
    this.uploaderOps.onCompleteAll();
    console.log(this.uploaderOps.onCompleteAll());
  }

}
