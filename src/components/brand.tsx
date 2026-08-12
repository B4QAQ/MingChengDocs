type BrandIconProps = {
  className?: string;
};

export function BrandIcon({ className }: BrandIconProps) {
  return (
    // 多色 logo 直接用 <img> 显示原图，不再用 CSS mask + 主题色填充
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/brand/favicon.svg"
      alt="铭诚"
      className={`inline-block h-5 w-auto shrink-0 select-none ${className ?? ""}`}
      draggable={false}
    />
  );
}

export function BrandTitle({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 mx-1 ${className ?? ""}`}>
      <BrandIcon />
      <span
        className="text-[15px] font-bold tracking-tight text-fd-foreground"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        DOCS
      </span>
    </span>
  );
}
