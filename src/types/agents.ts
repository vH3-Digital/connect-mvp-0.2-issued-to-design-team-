export interface Agent {
  id: number;
  name: string;
  description: string;
  introduction: string;
  avatar: {
    url: string;
  };
}