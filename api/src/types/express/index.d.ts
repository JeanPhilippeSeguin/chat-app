declare global {
  namespace Express {
    interface User {
      uuid: string;
    }
  }
}
export {};
