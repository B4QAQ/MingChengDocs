import type { Metadata } from "next";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Footer } from "@/components/footer";
import { ImageTool } from "@/components/image-tool";

export const metadata: Metadata = {
  title: "图片处理工具",
  description:
    "在线图片处理：裁剪为手表/手环尺寸，支持压缩、黑色阴影、高斯模糊。本地处理，不上传图片。",
  robots: { index: true, follow: true },
};

export default function ImageToolPage() {
  return (
    <HomeLayout {...baseOptions()}>
      <ImageTool />
      <Footer />
    </HomeLayout>
  );
}
