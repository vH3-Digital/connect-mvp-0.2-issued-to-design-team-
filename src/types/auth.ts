export interface User {
  last_name: any;
  last_name: any;
  first_name: any;
  first_name: any;
  first_name: any;
  id: number;
  email: string;
  name: string;
  phone?: string;
  ws_id?: string | null;
  company_id?: string;
  profile_picture?: {
    access?: string;
    path?: string;
    name?: string;
    type?: string;
    size?: number;
    mime?: string;
    meta?: {
      width: number;
      height: number;
    };
    url: string;
  } | null;
  google_oauth?: {
    id: string;
    name: string;
    email: string;
  };
  _company?: {
    id: string;
    name: string;
  };
}

export interface AuthResponse {
  authToken: string;
  user?: User;
}