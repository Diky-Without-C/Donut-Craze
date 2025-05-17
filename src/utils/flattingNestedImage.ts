import type { ImageMap } from "@services/stores/assetsStore";

function flattenImageMap(obj: ImageMap, prefix = ""): [string, string][] {
  const entries: [string, string][] = [];

  for (const key in obj) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      entries.push([path, value]);
    } else if (typeof value === "object" && value !== null) {
      entries.push(...flattenImageMap(value as ImageMap, path));
    }
  }

  return entries;
}

function unflattenImageMap(flatMap: Record<string, string>): ImageMap {
  const result: ImageMap = {};

  for (const path in flatMap) {
    const keys = path.split(".");
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current)) current[k] = {};
      current = current[k] as ImageMap;
    }

    current[keys[keys.length - 1]] = flatMap[path];
  }

  return result;
}

export { flattenImageMap, unflattenImageMap };
