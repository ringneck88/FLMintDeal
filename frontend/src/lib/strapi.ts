interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

class StrapiAPI {
  private baseURL: string;

  constructor() {
    // Use environment variable or default to localhost for development
    this.baseURL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1338';
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching from Strapi: ${error}`);
      throw error;
    }
  }

  // Fetch multiple items with optional query parameters
  async getMany<T>(endpoint: string, query?: Record<string, string>): Promise<StrapiResponse<T[]>> {
    const queryString = query ? '?' + new URLSearchParams(query).toString() : '';
    return this.get<StrapiResponse<T[]>>(`${endpoint}${queryString}`);
  }

  // Fetch a single item by ID
  async getOne<T>(endpoint: string, id: string | number): Promise<StrapiSingleResponse<T>> {
    return this.get<StrapiSingleResponse<T>>(`${endpoint}/${id}`);
  }
}

export const strapi = new StrapiAPI();
export type { StrapiResponse, StrapiSingleResponse };