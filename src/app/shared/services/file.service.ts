import { catchError, map, Observable } from "rxjs";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class FileService {

    private readonly http = inject(HttpClient);

    uploadChunk(file: File, chunk: Blob, chunkNumber: number, totalChunks: number, onProgress: (progress: number) => void ): Observable<any> {
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('fileName', file.name);
        formData.append('chunkNumber', chunkNumber.toString());
        formData.append('totalChunks', totalChunks.toString());

        return this.http.post(`${environment.apiUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events'
        }).pipe(
        map((event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / (chunk.size || 1));
            onProgress(percentDone);
            }
            return event;
        }),
        catchError((error) => {
            console.error(`Erreur lors de l'upload du chunk ${chunkNumber}`, error);
            throw error;
        })
        );
    }
}