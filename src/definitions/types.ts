export type User = {
  uid: string;
  email: string | null;
  photoURL: string | null;
};

export type Story = {
  text: string;
  date: Date;
  tags: string[];
};
