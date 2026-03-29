import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .middleware(() => {
      // auth check, if user is not logged in, then throw an error
      return {};
    })
    .onUploadComplete(({ file }) => {
      console.log("✅ Upload complete! URL:", file.url);
      console.log("✅ Upload complete! URL:", file);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
