import { Routes } from '@angular/router';
import { PodcastListComponent } from './podcasts/podcast-list/podcast-list.component';
import { EpisodeListComponent } from './podcasts/episodes/episode-list/episode-list.component';
import { AddPodcastComponent } from './podcasts/add-podcast/add-podcast.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'podcasts',
        pathMatch: 'full'   
    },
    {  
        path: 'podcasts',    
        component: PodcastListComponent,    
        title: 'Podcast list',  
    },
    {
        path: 'podcasts/add',
        component: AddPodcastComponent,
        title: 'Add Podcast'
    },
    {    
        path: 'podcasts/:podcastId',    
        component: EpisodeListComponent,    
        title: 'Podcast',  
    }
];
