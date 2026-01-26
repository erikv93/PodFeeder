import { Component } from '@angular/core';
import { PodcastDataService } from '../podcast-data.service';
import { map, Observable } from 'rxjs';
import { Podcast } from '../podcast.model';
import { AsyncPipe } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-podcast-list',
  imports: [AsyncPipe, MatListModule, RouterLink, MatIconModule,  MatButtonModule],
  templateUrl: './podcast-list.component.html',
  styleUrl: './podcast-list.component.scss'
})
export class PodcastListComponent {

  public podcasts$: Observable<Podcast[]>;
  
  constructor(private data: PodcastDataService) {
    this.podcasts$ = this.data.getPodcasts();
  }

  deletePodcast(podcastId: string): void {
    this.data.deletePodcast(podcastId).subscribe(() => {
      this.podcasts$ = this.podcasts$.pipe(map(podcasts => podcasts.filter(p => p.id !== podcastId)));
    });
  }

  hasNewEpisodes(podcast: Podcast): boolean {
    if (!podcast.lastViewedTime || !podcast.lastUpdatedTime) {
      return false;
    }

    return podcast.lastUpdatedTime > podcast.lastViewedTime;
  }

}
