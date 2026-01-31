/**
 * 页面转场动画配置
 * 缓动曲线、弹簧配置、颜色方案、路由映射
 */

// 缓动曲线库
export const easings = {
  // 柔和减速 - 默认入场
  smooth: [0.22, 1, 0.36, 1] as const,
  // 弹性回弹 - 元素入场
  springy: [0.34, 1.56, 0.64, 1] as const,
  // 锐利加速 - 退出动画
  sharp: [0.4, 0, 0.2, 1] as const,
  // Neo-Brutalist 硬切 - 遮罩层
  brutal: [0.5, 0, 0.5, 0] as const,
  // 弹性退出
  elasticOut: [0.16, 1, 0.3, 1] as const,
}

// 弹簧物理配置
export const springs = {
  // 敏捷 - 快速响应，轻微过冲
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  // 弹性 - 明显回弹
  bouncy: { type: "spring" as const, stiffness: 300, damping: 15 },
  // 柔和 - 缓慢优雅
  gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
  // 俏皮 - 实验性
  wobbly: { type: "spring" as const, stiffness: 180, damping: 12 },
}

// 时长配置
export const durations = {
  overlay: {
    enter: 0.5,
    exit: 0.4,
    stagger: 0.08,
  },
  content: {
    enter: 0.6,
    exit: 0.3,
    delay: 0.25,
  },
}

// 颜色方案 - 柔化处理
export const colors = {
  // 基础底色
  base: {
    dark: "#1a1a1a",
    light: "#f5f5f0",
  },
  // 强调色叠加层（半透明）
  accents: {
    pink: "rgba(255, 0, 110, 0.15)",
    blue: "rgba(0, 217, 255, 0.15)",
    green: "rgba(204, 255, 0, 0.12)",
    yellow: "rgba(255, 149, 0, 0.10)",
    orange: "rgba(255, 107, 0, 0.12)",
  },
}

// 转场类型
export type TransitionType =
  | "geometric-wipe"    // 几何擦除
  | "diagonal-reveal"   // 对角线揭示
  | "perspective-zoom"  // 透视缩放
  | "split-horizontal"  // 分裂展开
  | "slide-stack"       // 堆叠滑入

// 路由转场映射
export const routeTransitions: Record<string, TransitionType> = {
  "/": "geometric-wipe",
  "/blog": "diagonal-reveal",
  "/work": "diagonal-reveal",
  "/lab": "split-horizontal",
  "/about": "slide-stack",
  "/contact": "slide-stack",
}

// 路由颜色映射
export const routeColors: Record<string, { overlay: string; accent: string }> = {
  "/": { overlay: colors.base.dark, accent: colors.accents.pink },
  "/blog": { overlay: colors.base.dark, accent: colors.accents.blue },
  "/work": { overlay: colors.base.dark, accent: colors.accents.pink },
  "/lab": { overlay: colors.base.dark, accent: colors.accents.green },
  "/about": { overlay: colors.base.dark, accent: colors.accents.green },
  "/contact": { overlay: colors.base.dark, accent: colors.accents.orange },
}

// 根据路径获取转场类型
export function getTransitionType(pathname: string): TransitionType {
  // 详情页使用透视缩放
  if (pathname.match(/^\/(blog|work|lab)\/[^/]+$/)) {
    return "perspective-zoom"
  }
  // 列表页和其他页面
  const baseRoute = "/" + (pathname.split("/")[1] || "")
  return routeTransitions[baseRoute] || "geometric-wipe"
}

// 根据路径获取颜色方案
export function getRouteColors(pathname: string) {
  const baseRoute = "/" + (pathname.split("/")[1] || "")
  return routeColors[baseRoute] || routeColors["/"]
}
