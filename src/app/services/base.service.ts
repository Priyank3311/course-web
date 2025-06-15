import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export abstract class BaseService {
  public readonly baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = environment.baseURL;
  }

  get<ResModel>(endPoint: string) {
    return this.httpClient.get<ResModel>(`${this.baseUrl}${endPoint}`);
  }

  add<ReqDto, ResModel>(endPoint: string, dto: ReqDto) {
    return this.httpClient.post<ResModel>(`${this.baseUrl}${endPoint}`, dto);
  }

  update<ReqDto, ResModel>(endPoint: string, dto: ReqDto) {
    return this.httpClient.put<ResModel>(`${this.baseUrl}${endPoint}`, dto);
  }

  remove<ResModel>(endPoint: string) {
    return this.httpClient.delete<ResModel>(`${this.baseUrl}${endPoint}`);
  }
}
