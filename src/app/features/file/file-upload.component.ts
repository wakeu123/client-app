import { Component, inject } from '@angular/core';
import { FileService } from '@app/shared/services/file.service';

@Component({
  selector: 'file-upload',
  template: `
    <input type="file" (change)="onFileSelected($event)">
    <div *ngIf="isUploading">
        <p>Progression : {{ uploadProgress }}%</p>
        <progress [value]="uploadProgress" max="100"></progress>
    </div>
  `,
  styleUrls: []
})
export class FileUploadComponent {

  uploadProgress = 0;
  isUploading = false;

  private fileUploadService = inject(FileService);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFileInChunks(file);
    }
  }

  uploadFileInChunks(file: File) {
    this.isUploading = true;
    this.uploadProgress = 0;

    const chunkSize = 5 * 1024 * 1024; // 5 Mo
    const totalChunks = Math.ceil(file.size / chunkSize);
    let chunkNumber = 0;

    const uploadNextChunk = () => {
      if (chunkNumber >= totalChunks) {
        this.isUploading = false;
        return;
      }

      const start = chunkNumber * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      this.fileUploadService.uploadChunk(file, chunk, chunkNumber, totalChunks, (progress) => {
        this.uploadProgress = Math.round(((chunkNumber + progress / 100) / totalChunks) * 100);
      }).subscribe(() => {
        chunkNumber++;
        uploadNextChunk();
      }, error => {
        console.error(`Erreur sur le chunk ${chunkNumber}, tentative de réessai...`);
        setTimeout(uploadNextChunk, 2000); // Réessaye après 2s
      });
    };

    uploadNextChunk();
  }
}