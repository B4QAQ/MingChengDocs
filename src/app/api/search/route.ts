import { createFromSource } from "fumadocs-core/search/server";
import { createTokenizer } from "@orama/tokenizers/mandarin";
import { source } from "@/lib/source";

export const revalidate = false;

// 静态导出：构建时把搜索索引预生成为 JSON，客户端通过 Orama 本地检索
// （站点是 output: 'export'，无法在请求时运行服务端搜索）
export const { staticGET: GET } = createFromSource(source, {
  localeMap: {
    "zh-CN": {
      components: {
        tokenizer: createTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
  },
});
