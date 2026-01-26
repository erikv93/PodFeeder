import { Component } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Episode } from '../episode.model';
import { AsyncPipe } from '@angular/common';
import { PodcastDataService } from '../../podcast-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-episode-list',
  imports: [AsyncPipe, MatIconModule, MatTableModule, MatExpansionModule, MatButtonModule],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent {
  public episodes$: Observable<Episode[]>;

  constructor(
    private podcastDataService: PodcastDataService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private http: HttpClient) {
    const id: string = this.route.snapshot.paramMap.get('podcastId')!;
    this.episodes$ = this.podcastDataService.getEpisodesForPodcast(id);
   }

   displayedColumns: string[] = ['title', 'description', 'downloadUrl'];

   downloadEpisode(episode: Episode): void {
    this.http.get(episode.downloadUrl, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `${episode.title || 'episode'}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
   }
}


