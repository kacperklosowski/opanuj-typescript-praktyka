type Pages = 'homepage' | 'about' | 'contact';

type PagesMap = {
  [P in Pages]: string;
};

type PagesAccessMap = {
  [P in Pages]: boolean
};

export function checkAccess(map: PagesMap): PagesAccessMap {
  const pagesAccessMap = {} as PagesAccessMap;

  let key: keyof PagesMap;

  for (key in map) {
    pagesAccessMap[key] = true;
  }

  return pagesAccessMap;
}
