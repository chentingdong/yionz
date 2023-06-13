declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string;
    };
    idToken: string;
    accessToken: string;
  }

  interface User extends DefaultUser {
    id: string;
    idToken?: string;
    accessToken?: string;
  }
}
