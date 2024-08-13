import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { SharedService } from './shared.service'

@Injectable({
  providedIn: 'root'
})
export class BlobService {
  private baseUrl = environment.apiUrl + '/blob'; // Update with your .NET Core API URL
  public projectId = SharedService.getProjectId;

  constructor(private http: HttpClient) { }

  uploadFile(file: File, projectId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('projectId', projectId);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getFile(projectId: string, fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${projectId}/${fileName}`, { responseType: 'blob' });
  }

  deleteFile(projectId: string, fileName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${projectId}/${fileName}`);
  }
}
