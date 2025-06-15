export interface ResponseModel<T> {
  data: T;
  success_message: string;
  error_message: string;
}
