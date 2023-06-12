import { Audio } from "@prisma/client";
import React from "react";

type Props = {
  audio: Audio;
};

export default function Audio({ audio }: Props) {
  return <div>Audio</div>;
}
