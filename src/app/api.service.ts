import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './shared/data/project/user';
import { Project } from './shared/data/project/project-list';
import { Subcontractor } from './shared/data/project/subcontractors';
import { SubcontractorGroup } from './shared/data/project/subcontractorgroup';
import { Material } from './shared/data/project/material';
import { LineItem } from './shared/data/project/line-item';
import { Invoice } from './shared/data/invoice/invoice';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Method to get user data by email
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/users/email/${email}`;
    return this.http.get<User>(url);
  }

  // Method to check if user info is complete
  isUserInfoComplete(email: string): Observable<{ isComplete: boolean }> {
    return this.http
      .get<{ isComplete: boolean }>(
        `${this.apiUrl}/users/info-complete/${email}`
      )
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            // Handle 404 error and return { isComplete: false }
            return of({ isComplete: false });
          } else {
            // Rethrow other errors
            throw error;
          }
        })
      );
  }

  // Method to create a new user
  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/users`, user)
      .pipe(catchError(this.handleError));
  }

  // Method to update a user by email
  updateUser(email: string, user: User): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/users/email/${email}`, user)
      .pipe(catchError(this.handleError));
  }

  // Method to delete a user by email
  deleteUser(email: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/users/email/${email}`)
      .pipe(catchError(this.handleError));
  }

  // Generic handler for 404 errors
  private handle404<T>(result: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.error('Not Found: ', error.message);
        return of(result);
      }
      return throwError(error);
    };
  }

  // Generic error handler for other errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(error);
  }

  // Method to get all projects
  getProjects(userEmail: string, projectStatus: number): Observable<Project[]> {
    return this.http
      .get<Project[]>(
        `${this.apiUrl}/project/?userEmail=${encodeURIComponent(
          userEmail
        )}&projectStatus=${encodeURIComponent(projectStatus)}`
      )
      .pipe(
        map((projects: any[]) =>
          projects.map((project) => ({
            ...project,
            id: project._id, // Map _id to id for easier reference
          }))
        ),
        catchError(this.handleError)
      );
  }

  // Method to get a project by ID
  getProjectById(userEmail: string, projectId: string): Observable<Project> {
    const url = `${
      this.apiUrl
    }/project/projectbyid?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    return this.http.get<Project>(url);
  }

  createProject(userEmail: string, project: Project): Observable<Project> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiUrl}/project/create?userEmail=${encodeURIComponent(
      userEmail
    )}`;

    return this.http.post<Project>(url, project, { headers });
  }

  updateProject(email: string, id: string, project: Project): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiUrl}/project/update?email=${encodeURIComponent(
      email
    )}&id=${encodeURIComponent(id)}`;

    return this.http.put<void>(url, project, { headers });
  }

  updateProjectStatus(
    email: string,
    id: string,
    status: number
  ): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiUrl}/project/updateStatus?email=${encodeURIComponent(
      email
    )}&id=${encodeURIComponent(id)}`;

    return this.http.put<void>(url, status, { headers });
  }

  deleteProject(email: string, id: string): Observable<void> {
    const params = new HttpParams().set('email', email);
    return this.http.delete<void>(`${this.apiUrl}/project/${id}`, { params });
  }

  getSubcontractors(userEmail: string): Observable<Subcontractor[]> {
    return this.http.get<Subcontractor[]>(
      `${this.apiUrl}/subcontractor/${userEmail}/subcontractors`
    );
  }

  getSubcontractorById(
    userEmail: string,
    subcontractorId: string
  ): Observable<Subcontractor> {
    const url = `${this.apiUrl}/subcontractor/${userEmail}/subcontractors/${subcontractorId}`;
    return this.http.get<Subcontractor>(url);
  }

  createSubcontractor(
    userEmail: string,
    subcontractor: Subcontractor
  ): Observable<void> {
    const url = `${this.apiUrl}/subcontractor/${userEmail}/subcontractors`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(url, subcontractor, { headers });
  }

  updateSubcontractor(
    userEmail: string,
    subcontractorId: string,
    subcontractor: Subcontractor
  ): Observable<Subcontractor> {
    const url = `${this.apiUrl}/subcontractor/${userEmail}/subcontractors/${subcontractorId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Subcontractor>(url, subcontractor, { headers });
  }

  deleteSubcontractor(
    userEmail: string,
    subcontractorId: string
  ): Observable<void> {
    const url = `${this.apiUrl}/subcontractor/${userEmail}/subcontractors/${subcontractorId}`;
    return this.http.delete<void>(url);
  }

  // Subcontractor Groups Methods
  addSubcontractorsToGroup(
    userEmail: string,
    subcontractorIds: string[],
    groupName: string,
    groupCity: string,
    groupType: string
  ): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      userEmail,
      subcontractorIds,
      groupName,
      groupCity,
      groupType,
    };
    return this.http.post<void>(
      `${this.apiUrl}/SubcontractorGroups/AddSubcontractors`,
      body,
      { headers }
    );
  }

  getSubcontractorGroups(userEmail: string): Observable<SubcontractorGroup[]> {
    return this.http.get<SubcontractorGroup[]>(
      `${this.apiUrl}/SubcontractorGroups/${userEmail}`
    );
  }

  getSubcontractorGroupById(
    userEmail: string,
    groupId: string
  ): Observable<SubcontractorGroup> {
    return this.http.get<SubcontractorGroup>(
      `${this.apiUrl}/SubcontractorGroups/${userEmail}/${groupId}`
    );
  }

  deleteSubcontractorGroup(
    userEmail: string,
    groupId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/SubcontractorGroups/${userEmail}/groups/${groupId}`
    );
  }

  bulkDeleteSubcontractors(
    userEmail: string,
    subcontractorIds: string[]
  ): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.request<void>(
      'delete',
      `${this.apiUrl}/subcontractor/${userEmail}/subcontractors`,
      { body: subcontractorIds, headers }
    );
  }

  removeMemberFromSubcontractorGroup(
    userEmail: string,
    groupId: string,
    subcontractorId: string
  ): Observable<void> {
    const params = new HttpParams().set('subcontractorId', subcontractorId);
    return this.http.delete<void>(
      `${this.apiUrl}/SubcontractorGroups/${userEmail}/groups/${groupId}/members`,
      { params }
    );
  }

  getMaterialsByProjectId(
    userEmail: string,
    projectId: string
  ): Observable<Material[]> {
    const params = new HttpParams()
      .set('userEmail', userEmail)
      .set('projectId', projectId);
    return this.http.get<Material[]>(`${this.apiUrl}/Materials/byProjectId`, {
      params,
    });
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/Materials/${id}`);
  }

  createMaterial(userEmail: string, material: Material): Observable<Material> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Material>(
      `${this.apiUrl}/Materials?userEmail=${userEmail}`,
      material,
      { headers }
    );
  }

  updateMaterial(
    userEmail: string,
    id: string,
    material: Material
  ): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(
      `${this.apiUrl}/Materials/${id}?userEmail=${userEmail}`,
      material,
      { headers }
    );
  }

  deleteMaterial(userEmail: string, id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Materials/${id}?userEmail=${userEmail}`
    );
  }

  // Line Item Methods
  getLineItems(userEmail: string, projectId: string): Observable<LineItem[]> {
    return this.http.get<LineItem[]>(
      `${this.apiUrl}/lineitems?userEmail=${encodeURIComponent(
        userEmail
      )}&projectId=${encodeURIComponent(projectId)}`
    );
  }

  getLineItemById(
    userEmail: string,
    projectId: string,
    lineItemId: string
  ): Observable<LineItem> {
    const url = `${
      this.apiUrl
    }/lineitems/${lineItemId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    return this.http.get<LineItem>(url);
  }

  createLineItem(
    userEmail: string,
    projectId: string,
    lineItem: LineItem
  ): Observable<LineItem> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/lineitems?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    return this.http.post<LineItem>(url, lineItem, { headers });
  }

  updateLineItem(
    userEmail: string,
    projectId: string,
    lineItemId: string,
    lineItem: LineItem
  ): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${
      this.apiUrl
    }/lineitems/${lineItemId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    return this.http.put<void>(url, lineItem, { headers });
  }

  updateLineItemSubs(
    userEmail: string,
    projectId: string,
    lineItemId: string,
    subcontractor: Subcontractor
  ): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${
      this.apiUrl
    }/lineitems/sub/${lineItemId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    return this.http.put<void>(url, subcontractor, { headers });
  }

  deleteLineItem(
    userEmail: string,
    projectId: string,
    lineItemId: string
  ): Observable<void> {
    const url = `${
      this.apiUrl
    }/lineitems/${lineItemId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    return this.http.delete<void>(url);
  }

  deleteLineItemSubs(
    userEmail: string,
    projectId: string,
    lineItemId: string,
    subcontractor: Subcontractor
  ): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${
      this.apiUrl
    }/lineitems/sub/${lineItemId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(projectId)}`;
    const options = {
      headers: headers,
      body: subcontractor,
    };
    return this.http.delete<void>(url, options);
  }

  getInvoices(
    userEmail: string,
    projectId: string,
    lineItemId: string
  ): Observable<Invoice[]> {
    const url = `${this.apiUrl}/invoices?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(
      projectId
    )}&lineItemId=${encodeURIComponent(lineItemId)}`;
    return this.http.get<Invoice[]>(url).pipe(catchError(this.handleError));
  }

  createInvoice(
    userEmail: string,
    projectId: string,
    lineItemId: string,
    invoice: Invoice
  ): Observable<Invoice> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/invoices?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(
      projectId
    )}&lineItemId=${encodeURIComponent(lineItemId)}`;
    return this.http
      .post<Invoice>(url, invoice, { headers })
      .pipe(catchError(this.handleError));
  }

  updateInvoice(
    userEmail: string,
    projectId: string,
    lineItemId: string,
    invoiceId: string,
    invoice: Invoice
  ): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${
      this.apiUrl
    }/invoices/${invoiceId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(
      projectId
    )}&lineItemId=${encodeURIComponent(lineItemId)}`;
    return this.http
      .put<void>(url, invoice, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteInvoice(
    userEmail: string,
    projectId: string,
    lineItemId: string,
    invoiceId: string
  ): Observable<void> {
    const url = `${
      this.apiUrl
    }/invoices/${invoiceId}?userEmail=${encodeURIComponent(
      userEmail
    )}&projectId=${encodeURIComponent(
      projectId
    )}&lineItemId=${encodeURIComponent(lineItemId)}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  // Retrieve file
  getFile(containerName: string, blobName: string): Observable<Blob> {
    const url = `${this.apiUrl}/file/${containerName}/${blobName}`;
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  // Get files by itemId
  getFilesByItemId(
    containerName: string,
    itemId: string
  ): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}/file/${containerName}/search/${itemId}`)
      .pipe(catchError(this.handleError));
  }
}
