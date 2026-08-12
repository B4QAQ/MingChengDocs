/**
 * 根据文档路径返回对应的 Section 名称，用于切换主题色
 * - eternal: Eternal 永昼天气（绿色）
 * - wearpost: WearPost 腕上信驿（紫色）
 * - simplefetch: SimpleFetch 网络桥接（天蓝）
 * - mingcheng: 铭诚 API（琥珀）
 */
export function getSection(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const [dir] = path.split("/", 1);
  if (!dir) return undefined;

  switch (dir) {
    case "eternal":
      return "eternal";
    case "wearpost":
      return "wearpost";
    case "simplefetch":
      return "simplefetch";
    case "mingcheng-api":
      return "mingcheng";
    default:
      return undefined;
  }
}
