import { formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTransfert } from '@app/core/models/data-transfert.model';
import { Decision } from '@app/core/models/decision.enum';
import { BlobUploadCommonResponse, BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import { Observable } from 'rxjs';

export type record = Record<string, string>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup | null = null;
  registerForm: FormGroup | null = null;
  
  private fb = inject(FormBuilder);

  ngOnInit(): void {
      this.initLoginForm();
      const observer = {
        next: (item: unknown) => console.log(`Voici la donnée ${ item }.`),
        error: (error: unknown) => console.log(`Oups une erreur s'est produite: ${ error }`),
        complete: () => console.log(`Terminée... plus rien.`)
      };

      const stream = new Observable(observer => {
        observer.next()
      });

      
  }

  public initLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public initRegisterForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let formatDate = new FormData();
    let fileReader = new FileReader();
    let stream = new WritableStream();
  }

  upload(files: File[]): void {
    let folder: string = 'upload_data_' + new Date(Date.now()).getMilliseconds();
    let itemsLoaders: record[] = [];
    let currentParentPosition: number = 0;
    let parentCount: number = files.length;
    for(var file of files) {
      let disc: record;                
      let stream: ReadableStream<Uint8Array> = file.stream();
      let maxreader: number = 5 * 1024 * 1024;
      if(file.size < maxreader) {
          maxreader = file.size;
      }
      let bytes_: Uint8Array = new Uint8Array(maxreader);
      let response: DataTransfert | null = null;
      let currentChildrenPosition: number = 0;
      let childrenCount = (file.size / maxreader) + 1;
      let itemsLoaded: string | null = null;
      while (maxreader > 0) {
        //maxreader = await stream.ReadAsync(bytes_).AsTask();
        const afef = stream.getReader();
        if (maxreader > 0)
        {
            let decision: Decision = response == null ? Decision.NEW : Decision.CONTINUE;
            let path: string | null = response == null ? null : response.remotePath;
            response = new DataTransfert(bytes_, decision, file.name, folder, path!, '' );
            currentChildrenPosition++;
            //await AppState.SetChildrenProgressbar(ChildrenCount, currentChildrenPosition, id);
            if (response != null && itemsLoaded == null)
            {
                //await AppState.SetParentProgressbar(parentCount, currentParentPosition, id);
                itemsLoaded = response.remotePath;
            }
        }
        bytes_ = new Uint8Array(maxreader);
      }
      stream.cancel();
      let fileName = file.name;
      let itemsLoaded_ = itemsLoaded!;
      disc = { fileName, itemsLoaded_ }
      itemsLoaders.push(disc);
    }
  }

  
}
