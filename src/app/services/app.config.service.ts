import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { rejects } from "assert";
import { throwError as ObservableThrowError} from "rxjs";
import { catchError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()

export class AppConfigService{
    private configURL = environment.name ==='local'?`assets/config/config.json`:
    `assets/config/config.${environment.name}.json`;

    public environment:any;

    constructor(private httpService: HttpClient){ }

    loadConfiguration(){
        return new Promise((resolve,reject)=>{
            this.httpService
            .get(this.configURL,{headers:{internal:"true"}}).pipe(catchError((error:any)=>{
                resolve(true);
                return ObservableThrowError(error||'server error');
            }))
            .subscribe((envResponse:any)=>{
                this.environment = envResponse;
                resolve(true);
            })
        })
    }
}


