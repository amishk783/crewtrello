export interface Card {
  _id: string;
  title: string;
  status: string;
  description?: string;
  priority?: "Low" | "Medium" | "Urgent" | undefined;
  deadline?: string;
  createdAt: string;
  list_id: string;
}

export interface ListType {
  _id: string;
  name: string;
  position?: string;
  cards: Card[];
}
export type Boards = {
  id: string;
  name: string;
  createdAt: string;
};

export interface Board {
  lists: Map<string, List>;
}
