"use client";

import { signIn, signOut } from "next-auth/react";

import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      className="btn btn-link"
      style={{ marginRight: 10 }}
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link
      className="btn btn-primary"
      href="/register"
      style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="btn btn-link"
      style={{ marginRight: 10 }}
      onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return (
    <Link className="btn btn-link" href="/profile">
      Profile
    </Link>
  );
};
