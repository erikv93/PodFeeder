import { Component } from '@angular/core';
import { PodcastDataService } from '../podcast-data.service';
import { Observable } from 'rxjs';
import { Podcast } from '../podcast.model';
import { AsyncPipe } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-podcast-list',
  imports: [AsyncPipe, MatListModule, RouterLink],
  templateUrl: './podcast-list.component.html',
  styleUrl: './podcast-list.component.scss'
})
export class PodcastListComponent {

  public podcasts$: Observable<Podcast[]>;
  
  constructor(private data: PodcastDataService) {
    this.podcasts$ = this.data.getPodcasts();
  }

}
