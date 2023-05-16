import { LoginButton, LogoutButton, ProfileButton } from "./buttons.auth";

import Image from "next/image";
import LanguageSwitcher from "@/i18n/languageSwitcher";
import Link from "next/link";
import { Locale } from "@/i18n/i18n-config";
import React from "react";
import Script from "next/script";
import { getTranslation } from "@/i18n/translations";

async function Header({ params, session }) {
  const lang = params.lang as Locale;
  const translation = await getTranslation(lang);
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-primary navbar-dark">
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
          className="navbar-toggler collapsed"
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
      <div className="navbar-collapse collapse bg-light" id="mainMenu">
        <ul className="navbar-nav nav">
          <li className="nav-item active">
            <Link className="nav-link" href={`/${lang}`}>
              {translation.landingPage.videoLibrary}
            </Link>
          </li>
          <li className="nav-item">
            <LanguageSwitcher lang={lang} />
          </li>
          {!session &&
            <li className="nav-item">
              <LoginButton />
            </li>
          }
          {!!session &&
            <>
              <li className="nav-item">
                <LogoutButton />
              </li>
              <li className="nav-item">
                <ProfileButton />
              </li>
            </>
          }
        </ul>
      </div>
      {/* Stupid workaround here to make navbar collapse work*/}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" />
    </div>
  );
}

export default Header;
