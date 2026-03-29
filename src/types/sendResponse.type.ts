export type TResponse<T> = {
  statusCode: number;
  message?: string;
  success: boolean;
  data?: T;
  // meta?: {
  //   page: number;
  //   limit: number;
  //   total: number;
  //   totalPage: number;
  // };
};
