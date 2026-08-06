const PANGASINAN_CENTER = { lon: 120.42, lat: 15.95 };
const ZOOM = 9;
const PIN_COLOR = "e11d2f";

export function getPangasinanMapUrl(width: number, height: number): string {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const { lon, lat } = PANGASINAN_CENTER;

  return (
    `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/` +
    `pin-s+${PIN_COLOR}(${lon},${lat})/${lon},${lat},${ZOOM}/${width}x${height}@2x` +
    `?access_token=${token}`
  );
}
