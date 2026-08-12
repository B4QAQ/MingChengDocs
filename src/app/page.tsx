import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CaretRightIcon,
  CloudSunIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  LinkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { HomeHeroBackground } from "@/components/home-hero-background";
import { HeroTyping } from "@/components/hero-typing";
import { Footer } from "@/components/footer";
import {
  siteDescription,
  siteKeywords,
  siteTitle,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

const docEntries = [
  {
    title: "Eternal 永昼天气",
    desc: "功能强大的全能型天气快应用，支持多城市天气、长期存储与智能预测。",
    icon: CloudSunIcon,
    href: "/docs/eternal",
  },
  {
    title: "WearPost 腕上信驿",
    desc: "Vela智能穿戴邮件客户端，在手表上收发邮件、支持离线查看",
    icon: EnvelopeSimpleIcon,
    href: "/docs/wearpost",
  },
  {
    title: "SimpleFetch",
    desc: "AstroBox 网络桥接插件，让不支持联网的设备连接网络",
    icon: LinkIcon,
    href: "/docs/simplefetch",
  },
  {
    title: "铭诚 API",
    desc: "高自由度、高可拓展、开放的第三方API服务",
    icon: CodeIcon,
    href: "/docs/mingcheng-api",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeLayout
        {...baseOptions()}
        searchToggle={{ enabled: true }}
        className="bg-fd-background"
      >
        <div className="pb-16 pt-2 md:pb-24 *:font-sans">
          {/* Hero Section */}
          <section className="relative mx-auto flex min-h-[80%] w-full max-w-[95%] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-fd-border/60 px-6 py-24 text-center md:px-12">
            <HomeHeroBackground />
            <div className="relative z-10 flex max-w-7xl flex-col items-center">
              {/* 大标题与打字机效果 */}
              <h1 className="text-4xl font-semibold tracking-tight text-fd-foreground leading-[1.25] sm:text-5xl md:text-6xl">
                <span className="hero-bottom-line block md:inline">
                  铭诚网络应用服务统一文档
                </span>
                <br className="hidden md:block" />
                <span
                  className="hero-typing-wrapper block md:inline"
                  style={{ minHeight: "1.25em" }}
                >
                  <HeroTyping
                    words={[
                      "Eternal永昼天气",
                      "WearPost腕上信驿",
                      "SimpleFetch",
                      "MingChengAPI",
                    ]}
                    className="text-fd-primary"
                  />
                </span>
                
              </h1>

              <p className="mt-6 max-w-2xl text-sm text-fd-muted-foreground md:text-base">
                {siteDescription}
              </p>

              {/* CTA 按钮 */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/docs/eternal"
                  className="group inline-flex items-center justify-center rounded-full border border-transparent bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:brightness-110"
                >
                  <span className="flex items-center gap-2">
                    从此开始
                    <ArrowRight
                      weight="bold"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
                <Link
                  href="/docs/simplefetch"
                  className="inline-flex items-center justify-center rounded-full border border-fd-border bg-fd-secondary px-6 py-3 text-sm font-medium text-fd-secondary-foreground transition-all hover:brightness-95"
                >
                  SimpleFetch
                </Link>
              </div>

              {/* 四大文档入口 */}
              <div className="mt-16 grid w-full gap-6 text-left sm:grid-cols-2 xl:grid-cols-4">
                {docEntries.map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <Link
                      key={entry.title}
                      href={entry.href}
                      className="group relative flex flex-col rounded-3xl border border-fd-border/60 bg-fd-background/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-fd-primary/50 hover:bg-fd-primary/5 hover:shadow-xl hover:shadow-fd-primary/10"
                    >
                      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary transition-colors group-hover:bg-fd-primary group-hover:text-primary-foreground">
                        <Icon className="size-6" weight="duotone" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold tracking-tight text-fd-foreground transition-colors">
                        {entry.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-fd-foreground/50">
                        {entry.desc}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-medium text-fd-primary opacity-80 transition-opacity group-hover:opacity-100">
                        浏览文档{" "}
                        <CaretRightIcon className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </HomeLayout>
      <Footer />
    </>
  );
}
