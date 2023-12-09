import { resolve } from "path";
import { readFileSync } from "fs";

const port = process.env.PORT ?? 3000;
Bun.serve(
    {
        fetch(req) {
            // Serve files through the server
            let parts = req.url.split("/").slice(3);
            if (parts.length == 0) parts = ["index.html"];

            let fileName = parts[parts.length - 1];
            if (fileName === "") fileName = "index.html";

            const extensionSplit = fileName.split(".");
            const extension = extensionSplit[extensionSplit.length - 1];
            if (extension == undefined) fileName += ".html";

            parts[parts.length - 1] = fileName;

            const headers =
                extension === "html"
                    ? {
                          "Content-Type": "text/html",
                      }
                    : extension === "js"
                    ? {
                          "Content-Type": "text/javascript",
                      }
                    : {};

            // Load the file
            try {
                const fileContents = readFileSync(
                    resolve(import.meta.dir, "..", "example", ...parts),
                    "utf-8"
                );
                return new Response(fileContents, { headers });
            } catch {
                console.log(`Could not find file ${parts.join("/")}`);
                return new Response("404 Not Found", {
                    status: 404,
                    headers: {
                        "Content-Type": "text/plain",
                    },
                });
            }
        },
    },
    port
);

console.log(`Listening on port ${port}`);
