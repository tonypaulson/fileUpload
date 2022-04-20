import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app.config.service';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { filedetails } from './filedetails';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl:any;
  private gobj:any;

  constructor(private environmentService : AppConfigService,
    private httpClient:HttpClient) { 
      this.baseUrl = this.environmentService.environment.AssistAPI_URL;
    }

   
  uploadFile(file:any){
      this.baseUrl = this.environmentService.environment.AssistAPI_URL;
      const contentType=file.type;
      const bucket = new S3(
        {
          accessKeyId:'AKIAQIMMHGNTJYPHQ2IE',
          secretAccessKey:'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',
          region:'us-east-1'

        }
      );

      const params={
        Bucket:'fileupload12345',
        Key:file.name,
        Body:file,
        ACL:'public-read',
        contentType:contentType
      };

      bucket.upload(params,(err:any,data:any):any=>{
      this.baseUrl = this.environmentService.environment.AssistAPI_URL;
      const url = `${this.baseUrl}/api/file`
        if(err){
          console.log('There was an error uploading file',err);
          return false;
        }
        console.log('successfully uploaded file',data);
        
        this.fileupload(data).subscribe(result=>{
          if(result!=null){
            alert("file added");
          }
          else{
            alert("not added");
          }
          return result;
        })
         //return data;
        
      })    
  
  }
  public fileupload(data:any):Observable<any>{
      this.baseUrl = this.environmentService.environment.AssistAPI_URL;
      const url = `${this.baseUrl}/api/file`
      return this.httpClient.post(url,data);
  }

}
