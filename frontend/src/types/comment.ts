export interface IComment {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    name: string;
    role?: string;
  };
  createdAt: string;
}
