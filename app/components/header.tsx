import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            height="40"
            width="40"
            src="/ctdartlab-logo.png"
            alt="CTDARTLAB"
            style={{ marginTop: 0 }}
          />
        </Link>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                products
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
