export default interface UsersRespose {
  count: number;
  prev: string | null;
  next: string | null;
  results: string[];
}
