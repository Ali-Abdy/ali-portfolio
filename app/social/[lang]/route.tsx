import { ImageResponse } from "next/og";
import { content, isLocale } from "@/content/site";
const size = { width: 1200, height: 630 };
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const text = content[lang];
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 76px",
        background: "#0a1228",
        color: "#eef3ff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
          color: "#8faeff",
        }}
      >
        <span>ALI ABDI / PORTFOLIO</span>
        <span>{text.hero.location}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          Ali Abdi.
        </div>
        <div style={{ display: "flex", fontSize: 36, maxWidth: 950 }}>
          {text.hero.title.replace("\n", " ")}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #293b5f",
          paddingTop: 26,
          fontSize: 23,
        }}
      >
        {text.career.tags.join(" · ")}
      </div>
    </div>,
    size,
  );
}
