import fs from "node:fs/promises";
import { jsx, jsxs } from "react/jsx-runtime";
import satori from "satori";
import sharp from "sharp";

const diatypeRegular = await fs.readFile("./src/fonts/ABCDiatype-Regular.otf");
const diatypeLight = await fs.readFile("./src/fonts/ABCDiatype-Light.otf");
const tobiasThin = await fs.readFile("./src/fonts/Tobias-Thin.otf");

export async function renderOGImage(title: string, description?: string) {
  const svg = await satori(
    jsxs("div", {
      style: {
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        background: "white",
        fontFamily: "Diatype",
      },
      children: [
        jsx("div", {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 4,
            background:
              "linear-gradient(90deg, #320f1e 0%, #c83228 12.56%, #fb873f 25.06%, #d2dc91 37.56%, #5a8250 50.06%, #002314 62.06%, #00143c 74.06%, #2873d7 86.06%, #9bc3ff 97.06%)",
          },
        }),
        jsxs("div", {
          style: {
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            padding: 48,
            gap: 80,
          },
          children: [
            jsx("div", {
              style: {
                display: "flex",
                fontWeight: 300,
                height: "100%",
                alignItems: "center",
                fontSize: 48,
                flexBasis: "25%",
                justifyContent: "flex-end",
                fontFamily: "Tobias",
              },
              children: jsx("span", { children: "gram" }),
            }),
            jsxs("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                flexBasis: "75%",
                flexShrink: 1,
              },
              children: [
                jsx("div", {
                  style: {
                    fontSize: 42,
                    fontWeight: 300,
                    lineHeight: 1.2,
                  },
                  children: title,
                }),
                description
                  ? jsx("div", {
                      style: {
                        fontSize: 24,
                        fontWeight: 300,
                        lineHeight: 1.2,
                        marginTop: 8,
                        color: "#383838",
                      },
                      children: description,
                    })
                  : null,
              ],
            }),
          ],
        }),
      ],
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Diatype",
          data: diatypeRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Diatype",
          data: diatypeLight,
          weight: 300,
          style: "normal",
        },
        {
          name: "Tobias",
          data: tobiasThin,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
