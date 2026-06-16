export interface SilhouettePoint {
  x: number;
  y: number;
  z: number;
}

export interface SilhouetteData {
  bounds: { width: number; height: number };
  count: number;
  points: SilhouettePoint[];
  mobile?: { count: number; points: SilhouettePoint[] };
}

export async function loadSilhouetteData(
  mobile = false,
): Promise<SilhouetteData> {
  const res = await fetch("/data/silhouette-points.json");
  if (!res.ok) throw new Error("Failed to load silhouette data");
  const data = (await res.json()) as SilhouetteData;
  if (mobile && data.mobile) {
    return { ...data, points: data.mobile.points, count: data.mobile.count };
  }
  return data;
}
