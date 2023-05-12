import { I18nUrlManager } from "./I18nUrlManager";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { preferredTranslations } from "@/translation";

function Header({ searchParams }) {
  const i18n = preferredTranslations(searchParams?.language || null);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            height="30"
            width="30"
            src="/images/ctdartlab-logo.png"
            alt="YIONZ"
          /> {' '}
          <span>YIONZ</span>
        </Link>
        <I18nUrlManager />
        <span>{i18n.greeting}</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
