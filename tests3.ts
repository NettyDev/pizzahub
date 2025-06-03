import { S3Client } from "bun";

const client = new S3Client({
  accessKeyId: "admin",
  secretAccessKey: "password",
  bucket: "pizzahub",
  endpoint: "http://localhost:19000"
});

const file = client.file("components.json");

const readFile = Bun.file("components.json");

await Bun.write(file, readFile);
