import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../shared.service'
import { ApiService } from '../api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  projectId: string = SharedService.getProjectId();
  selectedFile: File = this.createPlaceholderFile();
  uploadedFileUrl: string = '';
  itemId: string;
  isFileDropped: string = "Drag and drop files here";
  isUploading = false;

  constructor(
    private dialogRef: MatDialogRef<FileUploadComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
  ) {
    this.itemId = data.itemId;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createPlaceholderFile(): File {
    const content = 'This is placeholder content';
    const fileName = 'placeholder.txt';
    const fileType = 'text/plain';
    const blob = new Blob([content], { type: fileType });
    return new File([blob], fileName, { type: fileType, lastModified: Date.now() });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.isFileDropped = "File " + this.selectedFile.name + " Added. Click 'Upload' to Continue.";
      event.dataTransfer.clearData();

    }
  }

  async onUpload() {
    if (this.isUploading) return;

    if (this.selectedFile) {
      const containerName = this.projectId;
      const blobName = `${this.itemId}-${this.selectedFile.name}`;

      try {
        this.isUploading = true; // Start loading indicator

        const response = await firstValueFrom(this.apiService.uploadFile(this.selectedFile, containerName, blobName));

        console.log('Files uploaded successfully', response);
        if (response) {
          this.dialogRef.close(response);
        }
      } catch (error) {
        console.error('Error uploading files', error);
        // Optionally handle error without closing dialog
      } finally {
        this.isUploading = false; // Stop loading indicator
      }
    } else {
      console.error('No files selected or item ID is missing');
      this.dialogRef.close('No files selected or item ID is missing');
    }
  }

  onCancel() {
    this.dialogRef.close('result');
  }
}
