import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { healthInsurance } from '../interfaces/healthInsurance';

@Injectable({
  providedIn: 'root',
})
export class HealthInsuranceService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getHealthInsurances(): Observable<any[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any>(`${this.myAppUrl}healthInsurance/`, {
      headers: headers,
    });
  }

  createHealthInsurance(
    healthInsurance: healthInsurance
  ): Observable<healthInsurance> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    const body = { description: healthInsurance.description };
    return this.http.post<healthInsurance>(
      `${this.myAppUrl}healthInsurance/`,
      body,
      {
        headers: headers,
      }
    );
  }
}
