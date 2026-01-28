export interface Work {
  id: string;
  title: string;
  category?: string;
  type: 'video' | 'image';
  url: string;
  description?: string;
}

export const portfolioWorks: Work[] = [
  {
    id: '1',
    title: 'R motion - Cinematic Portfolio Showcase',
    category: 'Showreel',
    type: 'video',
    url: '/site1.mp4',
    description: 'A stunning visual journey through our cinematic expertise, featuring premium motion graphics and sophisticated transitions that demonstrate our creative capabilities and attention to detail.'
  },
  {
    id: '2',
    title: 'YouTube Example - Creative Motion',
    category: 'Commercial',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Example of YouTube video integration with ReactPlayer for seamless streaming and professional playback.'
  },
  {
    id: '3',
    title: 'Vimeo Example - Professional Film',
    category: 'Film',
    type: 'video',
    url: 'https://vimeo.com/148751763',
    description: 'Professional Vimeo integration showcasing high-quality video playback with clean controls and branding.'
  }
];
