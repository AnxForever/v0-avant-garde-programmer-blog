// 声明 lucide-react 深层 ESM 导入模块
declare module "lucide-react/dist/esm/icons/*" {
  import type { LucideIcon } from "lucide-react"
  const icon: LucideIcon
  export default icon
}
