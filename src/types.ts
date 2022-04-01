export interface RawContact {
  id: string;
  firstName: string;
  lastName: string;
  organization: string;
  phones: string[];
  emails: string[];
  addresses: string[];
  birthday: number[];
  avatar: string;
  searchText: string;
}

export interface RawCollection {
  id: string;
  title: string;
  list: [];
}
export interface RawAuth {
  id: string;
  firstName: string;
  lastName: string;
  organization: string;
  phones: string[];
  emails: string[];
  addresses: string[];
  birthday: number[];
  avatar: string;
}
