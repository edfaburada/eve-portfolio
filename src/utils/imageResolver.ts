const images = import.meta.glob("../assets/*", {
  eager: true,
  as: "url",
});

export function resolveImage(fileName: string) {
  return images[`../assets/${fileName}`] as string | undefined;
}