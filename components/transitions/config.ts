/**
 * 页面转场动画配置
 * 每个路由使用不同的转场类型，更丰富的视觉效果
 */

// 缓动曲线库
export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  springy: [0.34, 1.56, 0.64, 1] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
  brutal: [0.5, 0, 0.5, 0] as const,
  elasticOut: [0.16, 1, 0.3, 1] as const,
  expo: [0.87, 0, 0.13, 1] as const,
}

// 转场类型 - 每个路由用不同的
export type TransitionType =
  | "grid-blocks"       // 首页 - 网格方块交错
  | "horizontal-bars"   // 博客 - 水平条纹扫入
  | "vertical-columns"  // 作品 - 垂直列百叶窗
  | "circle-wipe"       // 实验室 - 圆形扩展
  | "diagonal-wipe"     // 关于 - 对角线擦除
  | "curtain-drop"      // 联系 - 幕帘下落
  | "scale-zoom"        // 详情页 - 缩放进入

// 更柔和、更专业的配色方案
export const routeThemes: Record<string, {
  primary: string      // 主色块
  secondary: string    // 辅助色块
  accent: string       // 高亮线条
}> = {
  "/": {
    primary: "#0a0a0a",
    secondary: "#1a1a1a",
    accent: "#e91e63",  // 柔和粉
  },
  "/blog": {
    primary: "#0d1b2a",
    secondary: "#1b263b",
    accent: "#00bcd4",  // 青色
  },
  "/work": {
    primary: "#1a1a2e",
    secondary: "#16213e",
    accent: "#9c27b0",  // 紫色
  },
  "/lab": {
    primary: "#0f0f0f",
    secondary: "#1f1f1f",
    accent: "#4caf50",  // 绿色
  },
  "/about": {
    primary: "#1c1c1c",
    secondary: "#2d2d2d",
    accent: "#ff9800",  // 橙色
  },
  "/contact": {
    primary: "#141414",
    secondary: "#242424",
    accent: "#03a9f4",  // 天蓝
  },
}

// 路由转场映射
export const routeTransitions: Record<string, TransitionType> = {
  "/": "grid-blocks",
  "/blog": "horizontal-bars",
  "/work": "vertical-columns",
  "/lab": "circle-wipe",
  "/about": "diagonal-wipe",
  "/contact": "curtain-drop",
}

// 根据路径获取转场类型
export function getTransitionType(pathname: string): TransitionType {
  if (pathname.match(/^\/(blog|work|lab)\/[^/]+$/)) {
    return "scale-zoom"
  }
  const baseRoute = "/" + (pathname.split("/")[1] || "")
  return routeTransitions[baseRoute] || "grid-blocks"
}

// 根据路径获取配色方案
export function getRouteTheme(pathname: string) {
  const baseRoute = "/" + (pathname.split("/")[1] || "")
  return routeThemes[baseRoute] || routeThemes["/"]
}
