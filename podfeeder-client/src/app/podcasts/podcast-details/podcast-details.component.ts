import { Component } from '@angular/core';
import { EpisodeListComponent } from "../episodes/episode-list/episode-list.component";
import { ActivatedRoute } from '@angular/router';
import { PodcastDataService } from '../podcast-data.service';
import { Observable } from 'rxjs';
import { Podcast } from '../podcast.model';
import { AsyncPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-podcast-details',
  imports: [EpisodeListComponent, AsyncPipe],
  templateUrl: './podcast-details.component.html',
  styleUrl: './podcast-details.component.scss'
})
export class PodcastDetailsComponent {
  public podcastId: string;
  public podcast$: Observable<Podcast>;

  constructor(route: ActivatedRoute, data: PodcastDataService, title: Title) {
    this.podcastId = route.snapshot.paramMap.get('podcastId')!;
    this.podcast$ = data.getPodcast(this.podcastId)
    this.podcast$.subscribe((podcast) => {
      title.setTitle(`${podcast.name}`);
    });
  }
}
