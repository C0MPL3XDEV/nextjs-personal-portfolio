import fs from "fs/promises";
import path from "path";

import {
    generateFaviconFiles,
    generateFaviconHtml,
    IconTransformationType,
} from "@realfavicongenerator/generate-favicon";

import {
    getNodeImageAdapter,
    loadAndConvertToSvg,
} from "@realfavicongenerator/image-adapter-node";

const imageAdapter = await getNodeImageAdapter();

const masterIcon = {
    icon: await loadAndConvertToSvg("public/logo.png"),
};

const faviconSettings = {
    icon: {
        desktop: {
            regularIconTransformation: { type: IconTransformationType.None },
            darkIconType: "regular",
            darkIconTransformation: { type: IconTransformationType.None },
        },

        touch: {
            transformation: { type: IconTransformationType.None },
            appTitle: "COMPL3XDEV",
        },

        webAppManifest: {
            transformation: { type: IconTransformationType.None },
            backgroundColor: "#050507",
            themeColor: "#7A5CFF",
            name: "COMPL3XDEV — Full Stack Developer",
            shortName: "COMPL3XDEV",
        },
    },

    path: "/icons/",
};

import { Buffer } from "buffer";

const result = await generateFaviconFiles(masterIcon, faviconSettings, imageAdapter);

for (const [name, value] of Object.entries(result)) {
    let contents = value;

    // unwrap comuni
    if (
        contents &&
        typeof contents === "object" &&
        !Buffer.isBuffer(contents) &&
        !(contents instanceof Uint8Array)
    ) {
        contents =
            contents.contents ??
            contents.content ??
            contents.data ??
            null;
    }

    // ❗ se NON è scrivibile → SKIP (questa è la chiave)
    if (
        !contents ||
        !(
            typeof contents === "string" ||
            Buffer.isBuffer(contents) ||
            contents instanceof Uint8Array
        )
    ) {
        console.log("↷ skipped non-file entry:", name);
        continue;
    }

    if (typeof contents === "string") {
        contents = Buffer.from(contents, "utf8");
    }
    if (contents instanceof Uint8Array) {
        contents = Buffer.from(contents);
    }

    const outputPath = path.join("public", name);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, contents);

    console.log("✔ generated", outputPath);
}


// (opzionale) HTML snippets
const htmlResult = await generateFaviconHtml(faviconSettings);

// alcune versioni ritornano string, altre un object
const html =
    typeof htmlResult === "string"
        ? htmlResult
        : (htmlResult?.html ??
            htmlResult?.markup ??
            htmlResult?.markups?.join?.("\n") ??
            htmlResult?.tags?.join?.("\n") ??
            null);

if (!html) {
    console.log("↷ skipped favicon-snippet.html (no html string returned)");
} else {
    await fs.writeFile("public/favicon-snippet.html", html, "utf8");
    console.log("✔ generated public/favicon-snippet.html");
}