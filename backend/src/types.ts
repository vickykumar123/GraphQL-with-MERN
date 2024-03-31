export type EventType = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  date?: Date;
  creator: UserType;
};

export interface UserType {
  email: string;
  password: string | undefined;
  createdEvents: EventType[];
}
