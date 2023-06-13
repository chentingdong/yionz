// /app/api/services/s3-upload.js
import { APIRoute, sanitizeKey } from "next-s3-upload";

export default APIRoute.configure({
  key(req, filename) {
    return `artifacts/${req.body.path}/${sanitizeKey(filename)}`;
  },
});

// Add extra field to upload body
export const uploadToS3Options = (userId: string) => {
  const defaultPath = "lost-found";
  const path = userId || defaultPath;
  return {
    endpoint: {
      request: {
        headers: {},
        body: {
          path: path,
        },
      },
    },
  };
};
