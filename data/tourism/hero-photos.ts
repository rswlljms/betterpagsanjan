export interface HeroPhoto {
  id: string;
  /** Local path under /public. */
  src: string;
  /** Short label of the depicted subject (verified against the file page). */
  subject: string;
  photographer: string;
  photographerUrl?: string;
  license: string;
  licenseUrl: string;
  /** Wikimedia Commons file page for full provenance. */
  filePageUrl: string;
}

/**
 * Homepage hero mosaic photos — real photographs of Pagsanjan landmarks,
 * downloaded from Wikimedia Commons (September 2026) and downsized to
 * 480px-wide JPEGs for mobile bandwidth. Each entry keeps its author and
 * license so credit stays attached to the file (CC BY / CC BY-SA
 * attribution requirement).
 */
export const heroPhotos: HeroPhoto[] = [
  {
    id: "pagsanjan-falls-1",
    src: "/images/hero/pagsanjan-falls-1.jpg",
    subject: "Pagsanjan Falls with a bamboo raft",
    photographer: "Kathleen Mae Tugano",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Kthlnmae",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Pagsanjan_Falls_-_Pagsanjan,_Laguna_1.jpg",
  },
  {
    id: "pagsanjan-falls-2",
    src: "/images/hero/pagsanjan-falls-2.jpg",
    subject: "Pagsanjan Falls",
    photographer: "Angelo Juan Ramos",
    photographerUrl: "https://www.flickr.com/photos/86518301@N00",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:Pagsanjan_Falls.jpg",
  },
  {
    id: "arch-of-pagsanjan",
    src: "/images/hero/arch-of-pagsanjan.jpg",
    subject: "Arch of Pagsanjan",
    photographer: "Ramon FVelasquez",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Ramon_FVelasquez",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Arch_of_Pagsanjan.jpg",
  },
  {
    id: "pagsanjan-stone-arch",
    src: "/images/hero/pagsanjan-stone-arch.jpg",
    subject: "Pagsanjan Stone Arch",
    photographer: "Ralff Nestor Nacor",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Ralffralff",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Pagsanjan_Stone_Arch,_Laguna,_Aug_2025_(1).jpg",
  },
  {
    id: "pagsanjan-church",
    src: "/images/hero/pagsanjan-church.jpg",
    subject: "Pagsanjan Church",
    photographer: "Ralff Nestor Nacor",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Ralffralff",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Pagsanjan_Church,_Laguna,_Aug_2025_(2).jpg",
  },
  {
    id: "pagsanjan-church-belfry",
    src: "/images/hero/pagsanjan-church-belfry.jpg",
    subject: "Pagsanjan Church belfry",
    photographer: "Ralff Nestor Nacor",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Ralffralff",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Pagsanjan_Church_Belfry,_Laguna,_Aug_2025.jpg",
  },
  {
    id: "pagsanjan-church-facade",
    src: "/images/hero/pagsanjan-church-facade.jpg",
    subject: "Pagsanjan Church facade",
    photographer: "Ramon FVelasquez",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Ramon_FVelasquez",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Pagsanjan,LagunaChurchjf4256_19.JPG",
  },
  {
    id: "municipal-hall",
    src: "/images/hero/municipal-hall.jpg",
    subject: "Pagsanjan Municipal Hall, Rizal Street",
    photographer: "Patrickroque01",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Pagsanjan_Municipal_Hall_(Rizal_Street,_Pagsanjan,_Laguna;_06-28-2023).jpg",
  },
  {
    id: "church-entrance-porch",
    src: "/images/hero/church-entrance-porch.jpg",
    subject: "Entrance porch of Pagsanjan Church",
    photographer: "Elmer B. Domingo",
    photographerUrl: "https://commons.wikimedia.org/wiki/User:Aerous",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Entrance_porch_of_Pagsanjan_Church_in_2017.jpg",
  },
];
