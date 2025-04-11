export default interface OlxOffer {
  id: number;
  status: "new" | "active" | "limited" | "removed_by_user";
  url: string;
  created_at: string;
  activated_at: string;
  valid_to: string;
  title: string;
  description: string;
  category_id?: number;
  advertiser_type?: "private" | "business";
  external_id?: string;
  external_url?: string;
  contact: {
    name: string;
    phone?: string;
  };
  location: {
    city_id: number;
    district_id?: number;
    latitude?: number;
    longitude?: number;
  };
  images?: {
    url: string;
  }[];
  price?: {
    value?: number;
    currency?: string;
    negotiable?: boolean;
    trade?: boolean;
    budget?: boolean;
  };
  salary?: {
    value_from?: number;
    value_to?: number;
    currency?: string;
    negotiable?: boolean;
    type?: "monthly" | "hourly";
  };
  attributes?: {
    code: string;
    value?: string;
    values?: string[];
  }[];
  courier?: boolean;
}
