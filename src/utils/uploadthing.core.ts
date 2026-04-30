import { createUploadthing, type FileRouter } from "uploadthing/server";
console.log("TOKEN CHECK:", process.env.UPLOADTHING_TOKEN);
console.log("LENGTH:", process.env.UPLOADTHING_TOKEN?.length);
const f = createUploadthing();

export const ourFileRouter: any = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      console.log("✅ Upload complete! URL:", file.ufsUrl);
      console.log("✅ Upload complete! URL:", file);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
