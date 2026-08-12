import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ImageZoom as FumadocsImageZoom } from "fumadocs-ui/components/image-zoom";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { DocImage } from "@/components/doc-image";
import Zoom from "react-medium-image-zoom";

/**
 * 内容中直接使用的 <ImageZoom src="..." alt="..." />。
 * 用原生 <img> + react-medium-image-zoom，避免 next/image 要求 width/height。
 */
function ImageZoom(props: {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}) {
  const { src, alt = "", className, ...rest } = props;
  return (
    <Zoom zoomMargin={20} wrapElement="span" zoomImg={{ src }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={
          className ??
          "mx-auto block w-4/5 max-w-md rounded-xl sm:w-2/5"
        }
        {...rest}
      />
    </Zoom>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => {
      const { width, height, ...rest } = props as any;
      const hasSize = width != null || height != null;

      if (hasSize) {
        return (
          <span className="block text-center">
            <FumadocsImageZoom {...(props as any)} />
          </span>
        );
      }

      return <DocImage {...props} />;
    },
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props} className="shadow-none">
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ImageZoom,
    ...components,
  };
}
