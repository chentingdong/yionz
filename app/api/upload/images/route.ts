import { NextResponse } from 'next/server';
import { s3Upload } from "../../services/s3";

export async function POST(req) {
  const artifactId = 'testArtifactId';
  const clipId = 'testClipId';
  const inputStream = await req.json();

  const url = s3Upload({
    fileBuffer: inputStream,
    filename: 'image.png',
    artifactId: artifactId,
    clipId: clipId
  });

  return NextResponse.json({ "url": url });

}