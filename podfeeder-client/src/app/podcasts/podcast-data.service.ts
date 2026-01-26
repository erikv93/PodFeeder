import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Podcast } from './podcast.model';
import { HttpClient } from '@angular/common/http';
import { Episode } from './episodes/episode.model';

@Injectable({
  providedIn: 'root'
})
export class PodcastDataService {

  constructor(private http: HttpClient) { }

  public getPodcasts() : Observable<Podcast[]> {
    return this.http.get<Podcast[]>('/api/podcasts');
  }

  public getEpisodesForPodcast(podcastId: string) : Observable<Episode[]> {
    return this.http.get<Episode[]>(`/api/podcasts/${podcastId}/episodes`);
  }

  public addPodcast(podcast: Podcast) : Observable<Podcast> {
    return this.http.post<Podcast>('/api/podcasts', podcast);
  }

  public deletePodcast(podcastId: string) : Observable<void> {
    return this.http.delete<void>(`/api/podcasts/${podcastId}`);
  }
}
