export type UserCreateInput = {
  id?: string;
  email: string;
  name: string;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
};
