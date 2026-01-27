export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
  featured: boolean;
}

// API Route definitions
export const api = {
  portfolio: {
    list: {
      path: '/api/portfolio',
      method: 'GET' as const,
      responses: {
        200: (data: PortfolioItem[]) => data,
      },
    },
  },
  services: {
    list: {
      path: '/api/services',
      method: 'GET' as const,
      responses: {
        200: (data: Service[]) => data,
      },
    },
  },
  clients: {
    list: {
      path: '/api/clients',
      method: 'GET' as const,
      responses: {
        200: (data: Client[]) => data,
      },
    },
  },
  contact: {
    create: {
      path: '/api/contact',
      method: 'POST' as const,
      responses: {
        201: (data: { message: string; id: string }) => data,
      },
    },
  },
};

export type InsertContactMessage = ContactMessage;
