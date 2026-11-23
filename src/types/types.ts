export interface EventType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  name: string;
  description: string;
  location: string;
  image: string;
  imageId: string;
  userId: number;
  user: UserType;
  datetime: string;
  listBooking: null | BookingType[]
}

export interface UserType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  name: string;
  email: string;
  password: null | string;
  Events: null;
}

export interface ResponseLoginUserType {
  id: number;
  name: string;
  email: string;
  Events: null;
}

export interface EventFormData {
  name?: string;
  description?: string;
  location?: string;
  datetime?: string;
  image?: string;
}

export interface BookingType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  bookingCode: string;
  phone: string;
  userId: number;
  eventId: number;
  user: UserType;
  event: EventType;
}
