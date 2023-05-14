"use client";

import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/i18n-config";
import React from "react";
import Script from "next/script";
import { getTranslation } from "@/i18n/translations";

function Header({ lang, translation }) {
  return (
    <div>
      <nav className="navbar navbar-expand-md px-2 bg-primary navbar-dark">
        <Link className="navbar-brand mr-auto" href={`/${lang}`}>
          <Image
            height="30"
            width="30"
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

        <div className="navbar-collapse collapse" id="mainMenu">
          <ul className="navbar-nav nav">
            <li className="nav-item active">
              <Link className="nav-link" href={`/${lang}`}>
                {translation.landingPage.videoLibrary}
              </Link>
            </li>
            <li className="nav-item">
            </li>
          </ul>
        </div>
      </nav>
      {/* Stupid workaround here to make navbar collapse work*/}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" />
    </div>
  );
}

export default Header;
