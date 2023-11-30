export type Gallery = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
  };
  avatar_url: string;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
};
