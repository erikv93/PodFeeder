import { Component } from '@angular/core';
import { EpisodeListComponent } from "../episodes/episode-list/episode-list.component";

@Component({
  selector: 'app-podcast-details',
  imports: [EpisodeListComponent],
  templateUrl: './podcast-details.component.html',
  styleUrl: './podcast-details.component.scss'
})
export class PodcastDetailsComponent {

}
