// lib/fonts.ts

import {
  Inter,
  Manrope,
  Roboto,
  Open_Sans,
  Poppins,
  Lato,
  Raleway,
  Montserrat,
  Source_Sans_3,
  Merriweather,
  Ubuntu,
  Rubik,
  Mulish,
  Nunito,
  Work_Sans,
  Noto_Sans_Thai,
  Prompt,
  Kanit,
  Sarabun,
  Silkscreen,
  Geist,
  Geist_Mono,
  Fira_Sans,
  DM_Sans,
  Outfit,
  Space_Grotesk,
  Exo,
  Karla,
} from "next/font/google";

// Latin / General Fonts
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const roboto = Roboto({ weight: ["400"], subsets: ["latin"], variable: "--font-roboto" });
export const openSans = Open_Sans({ weight: ["400"], subsets: ["latin"], variable: "--font-open-sans" });
export const poppins = Poppins({ weight: ["400"], subsets: ["latin"], variable: "--font-poppins" });
export const lato = Lato({ weight: ["400"], subsets: ["latin"], variable: "--font-lato" });
export const raleway = Raleway({ weight: ["400"], subsets: ["latin"], variable: "--font-raleway" });
export const montserrat = Montserrat({ weight: ["400"], subsets: ["latin"], variable: "--font-montserrat" });
export const sourceSans = Source_Sans_3({ weight: ["400"], subsets: ["latin"], variable: "--font-source-sans" });
export const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"], variable: "--font-merriweather" });
export const ubuntu = Ubuntu({ weight: ["400"], subsets: ["latin"], variable: "--font-ubuntu" });
export const rubik = Rubik({ weight: ["400"], subsets: ["latin"], variable: "--font-rubik" });
export const mulish = Mulish({ weight: ["400"], subsets: ["latin"], variable: "--font-mulish" });
export const nunito = Nunito({ weight: ["400"], subsets: ["latin"], variable: "--font-nunito" });
export const workSans = Work_Sans({ weight: ["400"], subsets: ["latin"], variable: "--font-work-sans" });
export const firaSans = Fira_Sans({ weight: ["400"], subsets: ["latin"], variable: "--font-fira-sans" });
export const dmSans = DM_Sans({ weight: ["400"], subsets: ["latin"], variable: "--font-dm-sans" });
export const outfit = Outfit({ weight: ["400"], subsets: ["latin"], variable: "--font-outfit" });
export const spaceGrotesk = Space_Grotesk({ weight: ["400"], subsets: ["latin"], variable: "--font-space-grotesk" });
export const exo = Exo({ weight: ["400"], subsets: ["latin"], variable: "--font-exo" });
export const karla = Karla({ weight: ["400"], subsets: ["latin"], variable: "--font-karla" });

// Thai Fonts
export const notoSansThai = Noto_Sans_Thai({ weight: ["400"], subsets: ["thai"], variable: "--font-noto-thai" });
export const prompt = Prompt({ weight: ["400", "700"], subsets: ["thai"], variable: "--font-prompt" });
export const kanit = Kanit({ weight: ["400", "700"], subsets: ["thai"], variable: "--font-kanit" });
export const sarabun = Sarabun({ weight: ["400", "700"], subsets: ["thai"], variable: "--font-sarabun" });

// Decorative / Mono
export const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-silkscreen" });
export const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const FONT_OPTIONS = {
  "geist-sans": { label: "Geist Sans", var: "--font-geist-sans" },
  inter: { label: "Inter", var: "--font-inter" },
  manrope: { label: "Manrope", var: "--font-manrope" },
  roboto: { label: "Roboto", var: "--font-roboto" },
  openSans: { label: "Open Sans", var: "--font-open-sans" },
  lato: { label: "Lato", var: "--font-lato" },
  montserrat: { label: "Montserrat", var: "--font-montserrat" },
  nunito: { label: "Nunito", var: "--font-nunito" },
  poppins: { label: "Poppins", var: "--font-poppins" },
  raleway: { label: "Raleway", var: "--font-raleway" },
  ubuntu: { label: "Ubuntu", var: "--font-ubuntu" },
  firaSans: { label: "Fira Sans", var: "--font-fira-sans" },
  dmSans: { label: "DM Sans", var: "--font-dm-sans" },
  outfit: { label: "Outfit", var: "--font-outfit" },
  workSans: { label: "Work Sans", var: "--font-work-sans" },
  spaceGrotesk: { label: "Space Grotesk", var: "--font-space-grotesk" },
  exo: { label: "Exo", var: "--font-exo" },
  karla: { label: "Karla", var: "--font-karla" },
  sourceSans: { label: "Source Sans 3", var: "--font-source-sans" },
  merriweather: { label: "Merriweather", var: "--font-merriweather" },
  rubik: { label: "Rubik", var: "--font-rubik" },
  mulish: { label: "Mulish", var: "--font-mulish" },
  notoSansThai: { label: "Noto Sans Thai", var: "--font-noto-thai" },
  prompt: { label: "Prompt (TH)", var: "--font-prompt" },
  kanit: { label: "Kanit (TH)", var: "--font-kanit" },
  sarabun: { label: "Sarabun (TH)", var: "--font-sarabun" },
  silkscreen: { label: "Silkscreen", var: "--font-silkscreen" },
  system: { label: "System UI", var: "system-ui" },
} as const;

export type FontKey = keyof typeof FONT_OPTIONS;

export const allFontVars = [
  geistSans,
  geistMono,
  inter,
  manrope,
  roboto,
  openSans,
  poppins,
  lato,
  raleway,
  montserrat,
  sourceSans,
  merriweather,
  ubuntu,
  rubik,
  mulish,
  nunito,
  workSans,
  firaSans,
  dmSans,
  outfit,
  spaceGrotesk,
  exo,
  karla,
  notoSansThai,
  prompt,
  kanit,
  sarabun,
  silkscreen,
];