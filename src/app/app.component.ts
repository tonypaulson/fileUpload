import { Component ,OnInit} from '@angular/core';
import { UploadFileService } from './services/upload.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fileupload';
  SelectedFiles: FileList;
  
  constructor(private UploadService:UploadFileService){}

ngOnInit(): void {
  
}
upload(){
  const file = this.SelectedFiles.item(0);
  this.UploadService.uploadFile(file);
}

selectFile(event:any){
  this.SelectedFiles = event.target.files;
}

}
