// app/page.tsx

import Footer from "@/app/components/footer";
import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div className="container vh-100 vw-100" id="page">
      <Image
        className="zindex-1 position-absolute w-100 h-100 top-0 start-0"
        src="/images/home-bg.jpg"
        alt=""
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
      />
      <div className="row justify-content-center zindex-2 ">
        <div className="col-10 col-md-8 position-relative">
          <div className="vh-100 d-flex flex-column justify-content-center">
            <Image
              className="mb-5 mx-auto"
              src="/images/ctdartlab-logo.png"
              alt=""
              width={96}
              height={96}
            />
            <h1 className="text-uppercase text-white">
              Before you forget
              <br />
              YIONZ made a video
            </h1>
            <h2 className="text-secondary">
              Produce video stories from text prompt. Coming soon...
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
