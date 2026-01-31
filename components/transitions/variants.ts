/**
 * 页面转场动画变体
 * 包含遮罩层变体和内容变体
 */

import type { Variants } from "framer-motion"
import { easings, durations, type TransitionType } from "./config"

// ============================================
// 遮罩层变体
// ============================================

// 几何擦除（首页）- 双层从右到左
export const geometricWipeVariants = {
  layer1: {
    initial: { clipPath: "inset(0 0 0 100%)" },
    animate: {
      clipPath: "inset(0 0 0 0%)",
      transition: { duration: durations.overlay.enter, ease: easings.brutal },
    },
    exit: {
      clipPath: "inset(0 100% 0 0)",
      transition: { duration: durations.overlay.exit, ease: easings.sharp },
    },
  } satisfies Variants,
  layer2: {
    initial: { clipPath: "inset(0 0 0 100%)" },
    animate: {
      clipPath: "inset(0 0 0 0%)",
      transition: {
        duration: durations.overlay.enter,
        ease: easings.brutal,
        delay: durations.overlay.stagger,
      },
    },
    exit: {
      clipPath: "inset(0 100% 0 0)",
      transition: {
        duration: durations.overlay.exit,
        ease: easings.sharp,
        delay: durations.overlay.stagger / 2,
      },
    },
  } satisfies Variants,
}

// 对角线揭示（博客/作品列表）
export const diagonalRevealVariants = {
  overlay: {
    initial: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.6, ease: easings.smooth },
    },
    exit: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transition: { duration: durations.overlay.exit, ease: easings.elasticOut },
    },
  } satisfies Variants,
}

// 分裂展开（实验室）
export const splitHorizontalVariants = {
  top: {
    initial: { y: "-100%" },
    animate: {
      y: "0%",
      transition: { duration: 0.55, ease: easings.springy },
    },
    exit: {
      y: "-100%",
      transition: { duration: durations.overlay.exit, ease: easings.sharp },
    },
  } satisfies Variants,
  bottom: {
    initial: { y: "100%" },
    animate: {
      y: "0%",
      transition: { duration: 0.55, ease: easings.springy, delay: 0.05 },
    },
    exit: {
      y: "100%",
      transition: { duration: durations.overlay.exit, ease: easings.sharp, delay: 0.02 },
    },
  } satisfies Variants,
}

// 堆叠滑入（关于/联系）
export const slideStackVariants = {
  overlay: {
    initial: { y: "100%" },
    animate: {
      y: "0%",
      transition: { duration: 0.5, ease: easings.smooth },
    },
    exit: {
      y: "-100%",
      transition: { duration: durations.overlay.exit, ease: easings.sharp },
    },
  } satisfies Variants,
}

// ============================================
// 内容变体
// ============================================

// 默认内容动画（带 skew）
export const defaultContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    skewY: 2,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    skewY: 0,
    scale: 1,
    transition: {
      duration: durations.content.enter,
      ease: easings.smooth,
      delay: durations.content.delay,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    skewY: -1,
    scale: 0.98,
    transition: { duration: durations.content.exit, ease: easings.sharp },
  },
}

// 透视缩放（详情页）- 3D 纵深感
export const perspectiveVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    rotateX: 8,
    y: 100,
    transformPerspective: 1200,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
      delay: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    rotateX: -5,
    y: -60,
    transition: { duration: 0.35, ease: easings.sharp },
  },
}

// 对角线内容（列表页）
export const diagonalContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    skewY: 1.5,
  },
  animate: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.55,
      ease: easings.smooth,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    skewY: -1,
    transition: { duration: 0.25, ease: easings.sharp },
  },
}

// 分裂内容（实验室）
export const splitContentVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
      delay: 0.35,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: easings.sharp },
  },
}

// 堆叠内容（关于/联系）
export const stackContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 80,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
      delay: 0.25,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.25, ease: easings.sharp },
  },
}

// ============================================
// 工具函数
// ============================================

// 根据转场类型获取内容变体
export function getContentVariants(transitionType: TransitionType): Variants {
  switch (transitionType) {
    case "perspective-zoom":
      return perspectiveVariants
    case "diagonal-reveal":
      return diagonalContentVariants
    case "split-horizontal":
      return splitContentVariants
    case "slide-stack":
      return stackContentVariants
    case "geometric-wipe":
    default:
      return defaultContentVariants
  }
}
