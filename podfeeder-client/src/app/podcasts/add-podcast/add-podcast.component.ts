import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Podcast } from '../podcast.model';
import { PodcastDataService } from '../podcast-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-podcast',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-podcast.component.html',
  styleUrl: './add-podcast.component.scss'
})
export class AddPodcastComponent {
  constructor(private podcastDataService: PodcastDataService, private router: Router) { }

  private readonly rssUrlPattern = /^https?:\/\/.+\.(rss|xml|feed)$/i;

  addForm = new FormGroup({    
    name: new FormControl('', {nonNullable: true, validators: Validators.required}),    
    description: new FormControl('', {nonNullable: true}),
    feedUrl: new FormControl('', {nonNullable: true, validators: [
      Validators.required,
      Validators.pattern(this.rssUrlPattern)
    ]})
  });

  addPodcast() {
    const podcast = {
      ...this.addForm.value as Podcast,
      id: '00000000-0000-0000-0000-000000000000',
    };

    this.podcastDataService.addPodcast(podcast).subscribe({
      next: (newPodcast) => {
        this.router.navigate(['/podcasts', newPodcast.id]);
      },
      error: (err) => {
        console.error('Error adding podcast:', err);
      }
    });
  }
}
