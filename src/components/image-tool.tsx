"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowDownIcon,
  ArrowsClockwiseIcon,
  ArrowsOutCardinalIcon,
  ImageIcon,
  LockKeyIcon,
  LockKeyOpenIcon,
  ScalesIcon,
  SparkleIcon,
  SquareHalfIcon,
  TrashIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

type Format = "image/png" | "image/jpeg";
type CropMode = "cover" | "stretch";

const PRESETS = [
  { label: "自由裁剪", w: 0, h: 0 },
  { label: "小米手表 S 系列 (466×466)", w: 466, h: 466 },
  { label: "小米手环 Pro 系列 (336×480)", w: 336, h: 480 },
  { label: "小米手环 10 (212×520)", w: 212, h: 520 },
  { label: "红米手表系列 (432×514)", w: 432, h: 514 },
];

const FORMAT_LABEL: Record<Format, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
};

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function ImageTool() {
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [srcUrl, setSrcUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [srcSize, setSrcSize] = useState<number>(0);

  const [presetIdx, setPresetIdx] = useState(0);
  const [customW, setCustomW] = useState<number>(466);
  const [customH, setCustomH] = useState<number>(466);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const ratioRef = useRef<number>(1);

  const [cropMode, setCropMode] = useState<CropMode>("cover");
  const [rotation, setRotation] = useState<number>(0); // 0..3 (×90°)
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);

  const [format, setFormat] = useState<Format>("image/png");
  const [quality, setQuality] = useState<number>(1);
  const [blur, setBlur] = useState<number>(0);
  const [overlay, setOverlay] = useState<number>(0); // 黑色遮罩浓度 0-100

  const [outUrl, setOutUrl] = useState<string>("");
  const [outSize, setOutSize] = useState<number>(0);
  const [compressed, setCompressed] = useState<boolean>(false);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const preset = PRESETS[presetIdx];
  const targetW = preset.w || customW;
  const targetH = preset.h || customH;
  const isFree = preset.w === 0;

  // rotated source dimensions
  const rotatedW =
    imgEl && rotation % 2 === 1 ? imgEl.naturalHeight : imgEl?.naturalWidth ?? 0;
  const rotatedH =
    imgEl && rotation % 2 === 1 ? imgEl.naturalWidth : imgEl?.naturalHeight ?? 0;

  const panRange = useMemo(() => {
    if (!imgEl || cropMode !== "cover") return { maxX: 0, maxY: 0 };
    const s = Math.max(targetW / rotatedW, targetH / rotatedH);
    const dw = rotatedW * s;
    const dh = rotatedH * s;
    return {
      maxX: Math.max(0, (dw - targetW) / 2),
      maxY: Math.max(0, (dh - targetH) / 2),
    };
  }, [imgEl, cropMode, targetW, targetH, rotatedW, rotatedH]);

  // clamp pan
  useEffect(() => {
    setPanX((x) => Math.max(-panRange.maxX, Math.min(panRange.maxX, x)));
    setPanY((y) => Math.max(-panRange.maxY, Math.min(panRange.maxY, y)));
  }, [panRange]);

  const ratio = useMemo(() => {
    if (!srcSize) return 0;
    return ((srcSize - outSize) / srcSize) * 100;
  }, [srcSize, outSize]);

  // any edit to the image invalidates a previous compression result
  const editKey = [
    targetW,
    targetH,
    presetIdx,
    customW,
    customH,
    cropMode,
    rotation,
    panX,
    panY,
    blur,
    overlay,
    format,
    quality,
  ].join("|");
  const editKeyRef = useRef<string>(editKey);
  useEffect(() => {
    if (editKeyRef.current !== editKey) {
      editKeyRef.current = editKey;
      if (compressed) {
        setCompressed(false);
        if (outUrl) URL.revokeObjectURL(outUrl);
        setOutUrl("");
        setOutSize(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editKey]);

  // ===== file handling =====
  const handleFile = useCallback(
    (file: File) => {
      setError("");
      if (!file.type.startsWith("image/")) {
        setError("请选择图片文件");
        return;
      }
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      const url = URL.createObjectURL(file);
      setFileName(file.name);
      setSrcSize(file.size);
      setRotation(0);
      setPanX(0);
      setPanY(0);
      setCompressed(false);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl("");
      setOutSize(0);
      const img = new Image();
      img.onload = () => {
        setImgEl(img);
        setSrcUrl(url);
        ratioRef.current = img.naturalWidth / img.naturalHeight;
        if (isFree) {
          setCustomH(Math.round(customW / ratioRef.current));
        }
      };
      img.onerror = () => setError("图片加载失败");
      img.src = url;
    },
    [srcUrl, isFree, customW],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const reset = useCallback(() => {
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setImgEl(null);
    setSrcUrl("");
    setOutUrl("");
    setFileName("");
    setSrcSize(0);
    setOutSize(0);
    setCompressed(false);
    setError("");
    setRotation(0);
    setPanX(0);
    setPanY(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [srcUrl, outUrl]);

  useEffect(() => {
    return () => {
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== dimension / rotation helpers =====
  const rotate = (delta: number) => {
    setRotation((r) => (r + delta + 4) % 4);
    setPanX(0);
    setPanY(0);
  };

  const onWChange = (v: number) => {
    setCustomW(v);
    if (lockRatio && ratioRef.current) {
      setCustomH(Math.max(1, Math.round(v / ratioRef.current)));
    }
  };
  const onHChange = (v: number) => {
    setCustomH(v);
    if (lockRatio && ratioRef.current) {
      setCustomW(Math.max(1, Math.round(v * ratioRef.current)));
    }
  };

  // ===== render to canvas =====
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgEl;
    if (!canvas || !img) return;

    const w = Math.max(1, Math.floor(targetW));
    const h = Math.max(1, Math.floor(targetH));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, w, h);

    // --- Step 1: rotate the ORIGINAL image first, without any scaling ---
    // A 90°/270° rotation swaps width/height (pixels preserved, no distortion).
    const rotRad = (rotation * Math.PI) / 2;
    const rw = rotation % 2 === 1 ? img.naturalHeight : img.naturalWidth;
    const rh = rotation % 2 === 1 ? img.naturalWidth : img.naturalHeight;

    const rotated = document.createElement("canvas");
    rotated.width = rw;
    rotated.height = rh;
    const rctx = rotated.getContext("2d");
    if (rctx) {
      rctx.imageSmoothingEnabled = true;
      rctx.imageSmoothingQuality = "high";
      rctx.translate(rw / 2, rh / 2);
      rctx.rotate(rotRad);
      rctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    }

    // --- Step 2: crop the (already rotated) image into the target box ---
    // stretch: fill exactly (may distort aspect ratio, by design)
    // cover:   scale to cover, then pan to choose which part shows
    if (cropMode === "stretch") {
      ctx.drawImage(rotated, 0, 0, w, h);
    } else {
      const s = Math.max(w / rw, h / rh);
      const dw = rw * s;
      const dh = rh * s;
      ctx.drawImage(
        rotated,
        (w - dw) / 2 + panX,
        (h - dh) / 2 + panY,
        dw,
        dh,
      );
    }

    // --- Step 3: gaussian blur (apply on the cropped result, then recrop
    //     from an oversized buffer so edges blur uniformly, not sharp) ---
    if (blur > 0) {
      const pad = Math.ceil(blur * 3);
      const bc = document.createElement("canvas");
      bc.width = w + pad * 2;
      bc.height = h + pad * 2;
      const bctx = bc.getContext("2d");
      if (bctx) {
        bctx.imageSmoothingEnabled = true;
        bctx.filter = `blur(${blur}px)`;
        bctx.drawImage(canvas, pad, pad);
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(bc, -pad, -pad);
      }
    }

    // --- Step 4: black overlay ---
    if (overlay > 0) {
      ctx.fillStyle = `rgba(0,0,0,${overlay / 100})`;
      ctx.fillRect(0, 0, w, h);
    }
    // NOTE: PNG quantization / encoding happens in compress() after the
    // user clicks "压缩图片", so the live preview reflects edits and the
    // compressed preview reflects the actual exported bytes.
  }, [
    imgEl,
    targetW,
    targetH,
    rotation,
    cropMode,
    panX,
    panY,
    blur,
    overlay,
  ]);

  useLayoutEffect(() => {
    render();
  }, [render]);

  // ===== compress & export =====
  const compress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgEl) {
      setError("请先选择图片");
      return;
    }
    setError("");
    setCompressing(true);

    // draw latest edits onto canvas first
    render();

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // PNG color quantization for real size reduction
    if (format === "image/png" && quality < 0.98 && ctx) {
      const levels = Math.max(2, Math.round(quality * 8)); // 2..7 per channel
      const step = 256 / levels;
      const img = ctx.getImageData(0, 0, w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        d[i] = Math.min(255, Math.round(d[i] / step) * step);
        d[i + 1] = Math.min(255, Math.round(d[i + 1] / step) * step);
        d[i + 2] = Math.min(255, Math.round(d[i + 2] / step) * step);
      }
      ctx.putImageData(img, 0, 0);
    }

    canvas.toBlob(
      (blob) => {
        setCompressing(false);
        if (!blob) {
          setError("压缩失败");
          return;
        }
        if (outUrl) URL.revokeObjectURL(outUrl);
        setOutUrl(URL.createObjectURL(blob));
        setOutSize(blob.size);
        setCompressed(true);
      },
      format,
      quality,
    );
  }, [imgEl, format, quality, outUrl, render]);

  // ===== drag to pan (cover mode) =====
  const onPointerDown = (e: React.PointerEvent) => {
    if (!imgEl || cropMode !== "cover" || !hasOverflow) return;
    // 阻止触摸滚动/缩放在 canvas 上触发
    e.preventDefault();
    dragRef.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !canvasRef.current) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = canvasRef.current.width / rect.width;
    const dx = (e.clientX - lastPos.current.x) * scale;
    const dy = (e.clientY - lastPos.current.y) * scale;
    lastPos.current = { x: e.clientX, y: e.clientY };
    // 手指往哪个方向划，图片就跟着往哪个方向移动
    setPanX((x) => Math.max(-panRange.maxX, Math.min(panRange.maxX, x + dx)));
    setPanY((y) => Math.max(-panRange.maxY, Math.min(panRange.maxY, y + dy)));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const download = () => {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    const base = (fileName || "image").replace(/\.[^.]+$/, "");
    const ext = format === "image/png" ? "png" : "jpg";
    a.download = `${base}_${targetW}x${targetH}.${ext}`;
    a.click();
  };

  const canPan = Boolean(imgEl) && cropMode === "cover";
  const hasOverflow = panRange.maxX > 0 || panRange.maxY > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-fd-foreground md:text-3xl">
          <ImageIcon className="size-7 text-fd-primary" weight="duotone" />
          图片处理工具
        </h1>
        <p className="mt-2 text-sm text-fd-muted-foreground">
          单张图片裁剪为手表/手环尺寸，支持旋转、拉伸/裁剪、黑色遮罩、高斯模糊与压缩。所有处理在浏览器本地完成，图片不会上传。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_360px]">
        {/* ===== 左侧：预览 ===== */}
        <section className="flex flex-col gap-4 rounded-2xl border border-fd-border/60 bg-fd-card/40 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-fd-foreground">导出预览</h2>
            {imgEl && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 rounded-lg border border-fd-border px-2.5 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
              >
                <TrashIcon className="size-3.5" /> 清除
              </button>
            )}
          </div>

          {!imgEl ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-fd-border/70 bg-fd-background/40 p-8 text-center transition-colors hover:border-fd-primary/60 hover:bg-fd-primary/5"
            >
              <UploadSimpleIcon
                className="size-10 text-fd-muted-foreground"
                weight="duotone"
              />
              <div>
                <p className="text-sm font-medium text-fd-foreground">
                  点击或拖拽图片到此处
                </p>
                <p className="mt-1 text-xs text-fd-muted-foreground">
                  支持 PNG / JPG，单张处理
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </label>
          ) : (
            <>
              <div className="relative flex min-h-[320px] items-center justify-center overflow-auto rounded-xl border border-fd-border/60 bg-[conic-gradient(at_50%_50%,#f3f4f6_0deg,#e5e7eb_90deg,#f3f4f6_180deg,#e5e7eb_270deg,#f3f4f6_360deg)] bg-[length:20px_20px] p-4 dark:bg-[conic-gradient(at_50%_50%,#1f2937_0deg,#111827_90deg,#1f2937_180deg,#111827_270deg,#1f2937_360deg)]">
                <canvas
                  ref={canvasRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  className={`max-h-[520px] max-w-full touch-none select-none rounded-lg shadow-xl ${
                    canPan && hasOverflow
                      ? "cursor-grab active:cursor-grabbing"
                      : ""
                  }`}
                />
                {compressed && (
                  <span className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[11px] font-medium text-white shadow">
                    已压缩
                  </span>
                )}
                {compressing && (
                  <span className="absolute right-3 top-3 rounded-full bg-fd-primary/90 px-2 py-0.5 text-[11px] font-medium text-white shadow">
                    压缩中…
                  </span>
                )}
              </div>

              {canPan && hasOverflow && (
                <p className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
                  <ArrowsOutCardinalIcon className="size-3.5" />
                  在预览图上拖动可调整裁剪区域
                </p>
              )}

              {!compressed && imgEl && (
                <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
                  调整好裁剪、模糊、遮罩等参数后，点击右侧「压缩图片」生成最终图片，预览会显示压缩后的效果。
                </p>
              )}

              {srcSize > 0 && (
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-fd-border/60 bg-fd-background/50 p-3 text-center text-xs">
                  <div>
                    <p className="text-fd-muted-foreground">原始大小</p>
                    <p className="mt-0.5 font-semibold text-fd-foreground">
                      {formatBytes(srcSize)}
                    </p>
                  </div>
                  <div>
                    <p className="text-fd-muted-foreground">处理后</p>
                    <p className="mt-0.5 font-semibold text-fd-foreground">
                      {outSize ? formatBytes(outSize) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-fd-muted-foreground">压缩率</p>
                    <p
                      className={`mt-0.5 font-semibold ${
                        ratio > 0
                          ? "text-emerald-500"
                          : ratio < 0
                            ? "text-amber-500"
                            : "text-fd-foreground"
                      }`}
                    >
                      {outSize
                        ? `${ratio > 0 ? "-" : "+"}${Math.abs(ratio).toFixed(1)}%`
                        : "—"}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* ===== 右侧：参数 ===== */}
        <aside className="flex flex-col gap-5 rounded-2xl border border-fd-border/60 bg-fd-card/40 p-5 backdrop-blur-sm">
          {/* 裁剪尺寸 */}
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-fd-foreground">
              <ScalesIcon className="size-4 text-fd-primary" weight="duotone" /> 裁剪尺寸
            </h3>
            <label className="block">
              <span className="mb-1 block text-xs text-fd-muted-foreground">预设</span>
              <select
                value={presetIdx}
                onChange={(e) => setPresetIdx(Number(e.target.value))}
                className="w-full rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground outline-none focus:border-fd-primary"
              >
                {PRESETS.map((p, i) => (
                  <option key={i} value={i}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            {isFree && (
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-fd-muted-foreground">自定义 (px)</span>
                  <button
                    onClick={() => setLockRatio((v) => !v)}
                    className="inline-flex items-center gap-1 text-xs text-fd-muted-foreground hover:text-fd-primary"
                    title="锁定长宽比（按原图比例）"
                  >
                    {lockRatio ? (
                      <LockKeyIcon className="size-3.5" />
                    ) : (
                      <LockKeyOpenIcon className="size-3.5" />
                    )}
                    {lockRatio ? "已锁定原图比例" : "未锁定"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={customW}
                    onChange={(e) => onWChange(Number(e.target.value))}
                    className="w-full rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none focus:border-fd-primary"
                  />
                  <span className="text-fd-muted-foreground">×</span>
                  <input
                    type="number"
                    min={1}
                    value={customH}
                    onChange={(e) => onHChange(Number(e.target.value))}
                    className="w-full rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none focus:border-fd-primary"
                  />
                </div>
              </div>
            )}
            <p className="mt-2 text-xs text-fd-muted-foreground">
              输出尺寸：<span className="font-mono text-fd-foreground">{targetW}×{targetH}</span>
            </p>
          </div>

          {/* 裁剪方式 + 旋转 */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-fd-foreground">裁剪方式</h3>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setCropMode("cover")}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                  cropMode === "cover"
                    ? "border-fd-primary bg-fd-primary/10 text-fd-primary"
                    : "border-fd-border text-fd-muted-foreground hover:bg-fd-accent"
                }`}
              >
                直接裁剪
              </button>
              <button
                onClick={() => setCropMode("stretch")}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                  cropMode === "stretch"
                    ? "border-fd-primary bg-fd-primary/10 text-fd-primary"
                    : "border-fd-border text-fd-muted-foreground hover:bg-fd-accent"
                }`}
              >
                拉伸填充
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => rotate(-1)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fd-border px-3 py-2 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              >
                <ArrowsClockwiseIcon className="size-4 -scale-x-100" /> 向左旋转
              </button>
              <span className="w-14 text-center font-mono text-xs text-fd-foreground">
                {rotation * 90}°
              </span>
              <button
                onClick={() => rotate(1)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fd-border px-3 py-2 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              >
                向右旋转 <ArrowsClockwiseIcon className="size-4" />
              </button>
            </div>
          </div>

          <div className="h-px bg-fd-border/60" />

          {/* 格式与压缩 */}
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-fd-foreground">
              <SparkleIcon className="size-4 text-fd-primary" weight="duotone" /> 格式与压缩
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(FORMAT_LABEL) as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                    format === f
                      ? "border-fd-primary bg-fd-primary/10 text-fd-primary"
                      : "border-fd-border text-fd-muted-foreground hover:bg-fd-accent"
                  }`}
                >
                  {FORMAT_LABEL[f]}
                </button>
              ))}
            </div>

            <label className="mt-3 block">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-fd-muted-foreground">
                  {format === "image/png" ? "压缩 / 色彩" : "质量"}
                </span>
                <span className="font-mono text-fd-foreground">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.01}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-fd-primary"
              />
              <p className="mt-1 text-[11px] leading-tight text-fd-muted-foreground">
                {format === "image/png"
                  ? "PNG 为无损格式，调低将减少颜色数以减小体积（可能出现色带）；拉满即无损。"
                  : "JPG 质量越低体积越小，画质也会下降。"}
              </p>
            </label>
          </div>

          <div className="h-px bg-fd-border/60" />

          {/* 黑色遮罩 */}
          <div>
            <h3 className="mb-2 flex items-center justify-between text-sm font-semibold text-fd-foreground">
              <span className="flex items-center gap-1.5">
                <SquareHalfIcon className="size-4 text-fd-primary" weight="duotone" /> 黑色遮罩
              </span>
              <span className="font-mono text-xs text-fd-muted-foreground">{overlay}%</span>
            </h3>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={overlay}
              onChange={(e) => setOverlay(Number(e.target.value))}
              className="w-full accent-fd-primary"
            />
          </div>

          {/* 高斯模糊 */}
          <div>
            <h3 className="mb-2 flex items-center justify-between text-sm font-semibold text-fd-foreground">
              <span className="flex items-center gap-1.5">
                <SparkleIcon className="size-4 text-fd-primary" weight="duotone" /> 高斯模糊
              </span>
              <span className="font-mono text-xs text-fd-muted-foreground">{blur}px</span>
            </h3>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-fd-primary"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={compress}
              disabled={!imgEl || compressing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-fd-primary bg-fd-primary/10 px-4 py-2.5 text-sm font-semibold text-fd-primary transition-colors hover:bg-fd-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SparkleIcon className="size-4" weight="bold" />
              {compressing ? "压缩中…" : compressed ? "重新压缩" : "压缩图片"}
            </button>
            <button
              onClick={download}
              disabled={!compressed}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-fd-primary px-4 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowDownIcon className="size-4" weight="bold" />
              下载图片
            </button>
            {!compressed && (
              <p className="text-center text-[11px] text-fd-muted-foreground">
                压缩后才能下载
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
