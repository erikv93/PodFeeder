import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Episode } from './episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeDataService {

  constructor(private http: HttpClient) { }

  public getEpisodesForPodcast(podcastId: number) : Observable<Episode[]> {
    return this.http.get<Episode[]>("/api/podcasts/1/episodes");
  }
}
