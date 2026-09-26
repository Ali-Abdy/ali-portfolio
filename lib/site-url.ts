// Set SITE_URL to the final public origin before the production build.
// No guessed production domain or localhost canonical is emitted.
export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  const url = new URL(value);
  if (
    url.protocol !== "https:" &&
    !(process.env.NODE_ENV === "development" && url.protocol === "http:")
  ) {
    throw new Error("SITE_URL must use HTTPS outside development");
  }
  return new URL(url.origin);
}
