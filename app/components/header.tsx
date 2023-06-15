import { LoginButton, LogoutButton, ProfileButton } from "./buttons.auth";

import Image from "next/image";
import LanguageSwitcher from "@/i18n/languageSwitcher";
import Link from "next/link";
import { Locale } from "@/i18n/i18n-config";
import React from "react";
import Script from "next/script";
import { getTranslation } from "@/i18n/translations";

export default async function Header({ params, session }) {
  const lang = params.lang as Locale;
  const translation = await getTranslation(lang);
  return (
    <div>
      {/* navbar for desktop */}
      <nav className="navbar d-none d-md-flex flex-row bg-primary navbar-dark">
        <Link className="navbar-brand mr-auto" href={`/${lang}`}>
          <Image
            height={40}
            width={40}
            className="mx-2"
            src="/images/ctdartlab-logo.png"
            alt="YIONZ"
          />
          <span>YIONZ</span>
        </Link>
        <ul className="navbar-nav me-auto flex-grow-1 d-flex flex-row justify-content-end">
          <MainMenu session={session} lang={lang} />
        </ul>
      </nav>
      {/* navbar for mobile */}
      <nav className="navbar navbar-expand-md bg-primary navbar-dark d-md-none">
        <Link className="navbar-brand mr-auto" href={`/${lang}`}>
          <Image
            height={30}
            width={30}
            src="/images/ctdartlab-logo.png"
            alt="YIONZ"
          />{" "}
          <span>YIONZ</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainMenu"
          aria-controls="mainMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      {/* navbar dropdown for mobile */}
      <div className="navbar-collapse collapse bg-light py-2" id="mainMenu">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <MainMenu session={session} lang={lang} />
        </ul>
      </div>
      {/* Strange workaround here to make navbar collapse work.*/}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" />
    </div>
  );
}

const MainMenu = ({ session, lang }) => {
  return (
    <>
      <li className="nav-item">
        <LanguageSwitcher lang={lang} />
      </li>
      {!session && (
        <li className="nav-item">
          <LoginButton />
        </li>
      )}
      {!!session && (
        <>
          <li className="nav-item">
            <ProfileButton />
          </li>
          <li className="nav-item">
            <Link className="btn" href="/templates">
              Templates
            </Link>
          </li>
          <li className="nav-item">
            <LogoutButton />
          </li>
        </>
      )}
    </>
  );
};

