import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "./buttons.auth";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Script from "next/script";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

async function Header({ lang, translation }) {
  const session = await getServerSession(authOptions);
  console.log(session);

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
      </nav>
      {/* Stupid workaround here to make navbar collapse work*/}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" />
    </div>
  );
}

export default Header;
