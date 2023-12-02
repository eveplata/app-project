import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Imgbb } from '../interfaces/imgbb.interface';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  subirImagen(file: File): Observable<Imgbb> {

    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient
      .post<Imgbb>(`${environment.urlImgbb}/upload`, formData, {
        params: { key: environment.apiKeyImgbb },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );

  }

  editarImagen(file: File, imageId: string): Observable<Imgbb> {
    const formData = new FormData();
    formData.append('image', file);

    // Definir los encabezados de la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    // Enviar la solicitud PUT para editar la imagen con el ID correspondiente
    return this.httpClient.put<Imgbb>(`${environment.urlImgbb}/edit/${imageId}`, formData, {
      headers: headers,
      params: { key: environment.apiKeyImgbb },
    });
  }

}
