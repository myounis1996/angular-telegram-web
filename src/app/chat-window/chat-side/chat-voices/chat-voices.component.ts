import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-voices',
  templateUrl: './chat-voices.component.html',
  styleUrl: './chat-voices.component.scss'
})
export class ChatVoicesComponent implements OnInit{
  data: {
    month: string,
    audios: {
      src: string,
      id: string,
      isPlaying: boolean,
      audioElement: HTMLAudioElement | null,
      currentTime: number,
      duration: number
    }[]
  }[] = [
    {
      month: "June",
      audios: [{
        src: "/voice/test.mp3",
        id: "001",
        isPlaying: false,
        audioElement: null,
        currentTime: 0,
        duration: 204
      },
        {
          src: "/voice/test2.mp3",
          id: "002",
          isPlaying: false,
          audioElement: null,
          currentTime: 0,
          duration: 204
        }]
    },
    {
      month: "May",
      audios: [{
        src: "/voice/test3.mp3",
        id: "001",
        isPlaying: false,
        audioElement: null,
        currentTime: 0,
        duration: 204
      },
        {
          src: "/voice/test.mp3",
          id: "002",
          isPlaying: false,
          audioElement: null,
          currentTime: 0,
          duration: 204
        }]
    }
  ]
  isLoading = true;

  ngOnInit(): void {
    setTimeout(()=> {
      this.isLoading = false;
    },500);
  }
  async play(voice: {
    src: string,
    id: string,
    isPlaying: boolean,
    audioElement: HTMLAudioElement | null,
    currentTime: number
  }) {
    this.data.forEach((element) => {
      element.audios.forEach((audio) => {
        if (audio.audioElement !== null) {
          audio.audioElement.pause();
          audio.isPlaying = false;
          audio.audioElement.currentTime = 0;
          audio.currentTime = 0;
        }
      })
    })
    voice.audioElement = document.getElementById(voice.id) as HTMLAudioElement;
    await voice.audioElement.play();
    voice.isPlaying = true;
    voice.audioElement.ontimeupdate = (ev) => {
      voice.currentTime = voice.audioElement?.currentTime || 0;
    };
  }

  async pause(voice: {
    src: string,
    id: string,
    isPlaying: boolean,
    audioElement: HTMLAudioElement | null,
    currentTime: number
  }) {
    voice.audioElement?.pause();
    voice.isPlaying = false;
  }

  formatSecondsAsTime(seconds: number): string {
    return `${(Math.floor(seconds / 60)).toString().padStart(2, '0')}:${(Math.floor(seconds % 60)).toString().padStart(2, '0')}`
  }

  changeCurrentTime(voice: {
    isPlaying: boolean,
    audioElement: HTMLAudioElement | null,
    currentTime: number
  }, event: any) {
    if (voice.audioElement) {
      voice.audioElement.currentTime = event.target.value;
    }
  }

  onLoadMetaData(media: any, event: any) {
    media.duration = event.target.duration;
  }

  onEndVoice(voice: {
    src: string;
    id: string;
    isPlaying: boolean;
    audioElement: HTMLAudioElement | null;
    currentTime: number;
    duration: number
  }) {
    if (voice.audioElement) {
      voice.audioElement.currentTime = 0;
      voice.currentTime = 0;
      voice.isPlaying = false;
    }
  }
}
