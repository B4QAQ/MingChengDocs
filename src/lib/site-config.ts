import type { MainItemType } from "fumadocs-ui/layouts/shared";

export const siteHomeHref = "/";
export const siteBrandName = "铭诚网络";
export const siteGithubUrl = "";
export const siteTitle = "铭诚网络应用服务统一文档";
export const siteLocale = "zh_CN";
export const siteLanguage = "zh-CN";
export const sitePublisherName = "铭诚网络工作室";
export const siteDescription =
  "铭诚网络工作室应用服务统一文档站，包含 Eternal 永昼天气、WearPost 腕上信驿、SimpleFetch 网络桥接等服务的完整使用指南。";
export const siteKeywords = [
  "铭诚网络",
  "铭诚网络工作室",
  "铭诚API",
  "应用服务文档",
  "Eternal",
  "永昼天气",
  "WearPost",
  "腕上信驿",
  "SimpleFetch",
  "AstroBox",
  "Vela",
  "快应用",
  "开发者文档",
  "穿戴设备",
  "小米手表",
];

const defaultSiteUrl = "https://docs.b4qaq.cn";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl
).replace(/\/+$/, "");

export function getSiteUrl(path = siteHomeHref) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function resolvePageDescription(
  title: string,
  description?: string | null,
) {
  return description?.trim() || `${title} - ${siteDescription}`;
}

export const topNavLinks: MainItemType[] = [
  { text: "永昼天气", url: "/docs/eternal", active: "nested-url" },
  { text: "腕上信驿", url: "/docs/wearpost", active: "nested-url" },
  { text: "SimpleFetch", url: "/docs/simplefetch", active: "nested-url" },
  { text: "铭诚API", url: "/docs/mingcheng-api", active: "nested-url" },
  { text: "图片处理", url: "/tools/image", active: "url" },
];
