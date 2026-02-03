import { Component, Input, signal } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { Episode } from '../episode.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PodcastDataService } from '../../podcast-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { toObservable } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ViewDescriptionDialog } from '../../../shared/view-description/view-description-dialog';

@Component({
  selector: 'app-episode-list',
  imports: [
    AsyncPipe, 
    MatIconModule, 
    MatTableModule, 
    MatExpansionModule, 
    MatButtonModule, 
    DatePipe, 
    MatProgressSpinnerModule, 
    MatPaginatorModule, 
    MatTooltipModule],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent {
  public pageSize: number = 10;
  public length: number = 0;
  public pageChange = signal<PageEvent>({pageIndex: 0, pageSize: this.pageSize, length: 0});
  public paginatedEpisodes$: Observable<Episode[]>;

  constructor(
    private podcastDataService: PodcastDataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    const podcastId = this.route.snapshot.paramMap.get('podcastId')!;
    const episodes$ = this.podcastDataService.getEpisodesForPodcast(podcastId);
    const pageChange$ = toObservable(this.pageChange);
    this.paginatedEpisodes$ = combineLatest([pageChange$, episodes$])
    .pipe(
      tap(([, episodes]) => {
        this.length = episodes.length;
      }),
      map(([pageEvent, episodes]) => {
        const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
        const endIndex = startIndex + pageEvent.pageSize;
        return episodes.slice(startIndex, endIndex);
      }));
    }

   displayedColumns: string[] = ['title', 'publishDate', 'downloadUrl'];

   downloadEpisode(episode: Episode): void {
    this.http.get(episode.downloadUrl, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      const fileExtension = episode.downloadUrl.split('.')[episode.downloadUrl.split('.').length - 1];
      link.download = `${episode.title}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
   }

   viewDescription(description: string): void {
      this.dialog.open(ViewDescriptionDialog, {
        data: { description: description }
    });
  }
}


