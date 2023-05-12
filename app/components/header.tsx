import React, { useEffect } from "react";

import { I18nUrlManager } from "./I18nUrlManager";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { preferredTranslations } from "@/translation";

function Header({ searchParams }: {
  searchParams?: { language?: string; };
}) {
  const i18n = preferredTranslations(searchParams?.language || null);

  return (
    <div>
      <nav className="navbar navbar-expand-md px-2 bg-primary navbar-dark">
        <Link className="navbar-brand mr-auto" href="/">
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
              <Link className="nav-link" href="/v">
                Video Library
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                href={`?language=${i18n.languageSwitcher.code}`}
              >
                {i18n.languageSwitcher.code}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <I18nUrlManager />
      {/* Stupid workaround here to make navbar collapse work*/}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" />
    </div>
  );
}

export default Header;
