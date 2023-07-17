"use client";

import { signIn, signOut } from "next-auth/react";
import { useTranslation } from '@/i18n/i18n.client';
import Link from "next/link";

export const LoginButton = ({lang}: {lang: string}) => {
  const { t } = useTranslation(lang);
  return (
    <button
      className="btn"
      style={{ marginRight: 10 }}
      onClick={() => signIn()}
    >
      {t('header.login')}
    </button>
  );
};

export const RegisterButton = ({lang}: {lang: string}) => {
  const { t } = useTranslation(lang);
  return (
    <Link
      className="btn"
      href="/register"
      style={{ marginRight: 10 }}>
      {t('header.register')}
      Register
    </Link>
  );
};

export const LogoutButton = ({lang}: {lang: string}) => {
  const { t } = useTranslation(lang);
  return (
    <button
      className="btn"
      style={{ marginRight: 10 }}
      onClick={() => signOut()}>
      {t('header.logout')}
    </button>
  );
};

export const ProfileButton = ({lang}: {lang: string}) => {
  const { t } = useTranslation(lang);

  return (
    <Link className="btn" href="/profile">
      {t('header.profile')}
    </Link>
  );
};
