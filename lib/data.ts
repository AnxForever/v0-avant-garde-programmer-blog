import Cpu from "lucide-react/dist/esm/icons/cpu"
import Layers from "lucide-react/dist/esm/icons/layers"
import Mic from "lucide-react/dist/esm/icons/mic"
import Zap from "lucide-react/dist/esm/icons/zap"
import Type from "lucide-react/dist/esm/icons/type"
import Brain from "lucide-react/dist/esm/icons/brain"
import Palette from "lucide-react/dist/esm/icons/palette"
import ScanSearch from "lucide-react/dist/esm/icons/scan-search"
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap"

export const posts = [
  {
    id: 1,
    title: "Vibe Coding：当编程遇上直觉",
    category: "编程哲学",
    date: "2025.03.20",
    slug: "vibe-coding-philosophy",
    content:
      "Vibe Coding 不是随意编码，而是在逻辑与直觉之间找到平衡。作为一名数据科学学生，我发现最好的算法往往诞生于深夜、音乐和纯粹的'感觉对了'的时刻。这篇文章探讨了如何在严谨的数据分析中保持创造力，以及为什么有时候'跟着感觉走'能带来意想不到的突破。",
  },
  {
    id: 2,
    title: "用 Python 可视化我的网易云音乐品味",
    category: "数据分析",
    date: "2025.03.10",
    slug: "netease-music-analysis",
    content:
      "作为一个音乐爱好者和数据科学学生，我用 Python 爬取并分析了我的网易云音乐听歌记录。通过 Pandas、Matplotlib 和 Seaborn，我发现了自己的音乐品味模式：原来我在深夜最喜欢听日系动漫 OST，而写代码时则偏爱电子音乐。数据不会说谎，但它揭示的真相有时会让你惊讶。",
  },
  {
    id: 3,
    title: "AI 让动漫角色'活'过来了？",
    category: "人工智能",
    date: "2025.02.28",
    slug: "ai-anime-characters",
    content:
      "从 Stable Diffusion 到 ChatGPT，AI 正在改变我们与二次元世界的互动方式。作为一个动漫爱好者和 AI 学习者，我尝试用 LLM 创建了一个能够模拟动漫角色对话的聊天机器人。虽然它还不完美，但当它用初音未来的语气回复我时，那种感觉真的很奇妙。这篇文章记录了我的实验过程和一些有趣的发现。",
  },
  {
    id: 4,
    title: "大四迷茫期：我为什么选择做博客",
    category: "随想",
    date: "2025.02.15",
    slug: "why-i-started-blogging",
    content:
      "大四了，身边的同学有的准备考研，有的已经拿到 offer，而我还在摸索自己的方向。做这个博客，是想记录下我在数据科学、AI 和前端开发之间游走的过程。也许这些文字能帮助到同样迷茫的你，或者只是给未来的自己留下一些可以回顾的轨迹。无论如何，coding is fun，而这个博客就是我最好的证明。",
  },
  {
    id: 5,
    title: "从零开始学 Next.js：我的前端入坑记",
    category: "技术学习",
    date: "2025.01.20",
    slug: "learning-nextjs-journey",
    content:
      "作为一个数据科学专业的学生，我的技术栈一直围绕着 Python、Pandas 和 Jupyter Notebook。但当我想要把自己的分析结果用一个酷炫的网站展示出来时，我发现自己需要学习前端。Next.js 成了我的选择——Server Components、路由系统、还有这个疯狂的 Neo-Brutalist 设计风格。这是我的学习笔记，记录了一个后端人的前端冒险。",
  },
  // ========== 毕业设计 ==========
  {
    id: 102,
    title: "AI 文本检测数据集构建：从「造数据」到「治数据」的血泪史",
    category: "毕业设计",
    date: "2026.01.01",
    slug: "ai-text-detection-dataset-construction",
    content: `做 AI 文本检测的毕业设计，我以为最难的是调模型。结果发现，**数据集构建才是真正的地狱**。这篇文章记录了我从零开始构建高质量训练数据的完整过程，包括踩过的坑、学到的经验、以及最终形成的方法论。

## 一、问题的起源：为什么不能直接用 HC3？

HC3 (Human ChatGPT Comparison Corpus) 是目前最常用的 AI 文本检测数据集，包含约 2.4 万条问答对。但当我用它训练 BERT 时，发现了一个严重的问题：

> **模型可能学会了"看长度"而不是"看内容"**

审计数据后发现：
- Human 回答中位长度：**506 字符**
- AI 回答中位长度：**1,208 字符**（2.4 倍！）

这意味着模型可能只是在做一个简单的判断："长的就是 AI"。这种"捷径学习"在真实场景中毫无用处。

## 二、数据治理框架：不是"保证质量"，而是"证明没问题"

这是我这次最大的认知升级。导师说了一句话让我醍醐灌顶：

> **旧数据不需要"保证质量"，只需要"可量化地证明它没有明显问题"**

基于这个原则，我建立了五维数据审计框架：

| 维度 | 检查内容 | 工具 |
|------|----------|------|
| 1. 基础统计 | 样本数、长度分布、重复率 | \`dataset_audit.py\` |
| 2. AI 模式检测 | 典型话术命中率 | 正则匹配 |
| 3. 长度分桶对齐 | Human/AI 长度分布一致性 | 分位数分析 |
| 4. 探针模型 | 用简单模型检测数据泄露 | 决策树 |
| 5. 学术合规性 | 是否可以在论文中说明 | 人工审核 |

### 审计结果揭示的问题

**英文数据 (HC3 v1)：**
- Human 重复率：11.67%（同一问题多个回答）
- AI 话术命中率：**54.01%**（超过一半的 AI 文本包含 "In conclusion"、"Overall" 等套话）
- 长度严重失衡

**中文数据 (v1)：**
- Human 重复率：22.93%
- AI 文本反而偏短（与英文相反）

## 三、v2 数据升级：LENGTH_BUCKETS 机制

为了解决长度失衡问题，我设计了**长度分桶控制**机制：

\`\`\`python
# 英文长度分桶
EN_LENGTH_BUCKETS = [
    (160, 422),   # 短文本
    (422, 825),   # 中等文本
    (825, 1025),  # 长文本
]

# 根据 Human 文本长度，动态调整 AI 生成参数
def get_target_bucket(human_length):
    for min_len, max_len in EN_LENGTH_BUCKETS:
        if min_len <= human_length < max_len:
            return (min_len, max_len)
    return EN_LENGTH_BUCKETS[-1]
\`\`\`

在 prompt 中显式约束输出长度：

> "The response should be around 80-200 tokens. Complete your point directly without additional summaries. Avoid phrases like 'In conclusion', 'Overall' at the end."

### v2 升级效果

| 指标 | v1 | v2 | 改善 |
|------|-----|-----|------|
| 长度对齐得分 | 26.7 | 44.6 | +67% |
| 中位长度差 | 706 字符 | 278 字符 | -61% |
| AI 话术命中率 | 54% | ~20% | -63% |

## 四、多进程 + 多模型：工程化数据生成

生成 2 万条高质量 AI 回答，单线程太慢了。我实现了：

### 1. 多进程并行
\`\`\`python
# 3 进程并行，速度提升 3 倍
python src/upgrade_hc3_v2.py --workers 3 --limit 1000
\`\`\`

### 2. 多模型混合
- DeepSeek-V3（主力）
- Qwen2.5-72B（备用）

混合多个模型可以增加数据多样性，避免单一模型的"指纹"。

### 3. 失败重试机制
\`\`\`python
MAX_RETRIES = 2  # 每条数据最多重试 2 次
# 检测无效输出
def is_invalid_output(text, target_bucket):
    if len(text) < 100:
        return True, "too_short"
    if text.endswith("..."):
        return True, "truncated"
    return False, None
\`\`\`

### 4. 完整元数据追溯
每条生成的数据都包含：
\`\`\`json
{
  "id": "uuid",
  "model": "deepseek-ai/DeepSeek-V3",
  "prompt_version": "v2_length_controlled",
  "temperature": 0.7,
  "target_length": "160-422",
  "actual_length": 380,
  "timestamp": "2026-01-01T12:00:00"
}
\`\`\`

## 五、分层采样：确保训练公平性

有了高质量数据，还需要正确的采样策略。我实现了 \`stratified_processor.py\`：

1. **去重**：基于文本哈希去除重复样本
2. **分桶平衡**：每个长度桶内 Human:AI = 1:1
3. **分层分割**：train/val/test 保持类别比例一致

最终数据规模：
| 语言 | 训练集 | 验证集 | 测试集 |
|------|--------|--------|--------|
| 英文 | 3,400 | 425 | 425 |
| 中文 | 4,798 | 600 | 600 |

## 六、踩过的坑

### 坑 1：中文引号导致语法错误
\`\`\`python
# 错误写法（中文引号与 f-string 冲突）
f"不要使用"总的来说"等结尾词"

# 正确写法
f'不要使用"总的来说"等结尾词'
\`\`\`

### 坑 2：API 限流
SiliconFlow API 有请求频率限制，需要合理设置并发数和超时时间。

### 坑 3：数据量的执念
一开始我以为数据越多越好，想着把 2.4 万条全部升级。后来明白了：

> **Level 2 甜蜜区（本科毕设）：每类 4,000-6,000，总量 8,000-12,000**

超过这个范围，性价比急剧下降。

## 七、最终数据盘点

| 数据类型 | Human | AI | 合计 |
|----------|-------|-----|------|
| 英文 | 7,664 | 7,664 | 15,328 |
| 中文 | 6,463 | 6,463 | 12,926 |
| **总计** | 14,127 | 14,127 | **28,254** |

✅ 远超 Level 2 甜蜜区，可以放心开始训练了！

## 八、写给后来者的建议

1. **先审计，再升级**：不要盲目造数据，先搞清楚现有数据有什么问题
2. **长度对齐是关键**：AI 检测任务中，长度是最容易被模型利用的"捷径特征"
3. **保留元数据**：每条数据都要可追溯，出问题时能快速定位
4. **够用就停**：数据构建有"边际递减效应"，到了甜蜜区就该开始训练了
5. **工程化思维**：多进程、重试机制、日志记录，这些"脏活"能救命

## 结语

这篇文章记录的不是"完美的数据集"，而是**识别问题、分析问题、解决问题的过程**。

正如导师所说：数据治理能力比追求"零缺陷数据"更有学术价值。希望这些经验能帮到同样在做毕设的你。

下一篇将记录模型训练和对比实验的过程。敬请期待！`,
    isGraduation: true,
  },
  {
    id: 101,
    title: "基于 BERT 的 AI 文本检测：从 98% 到 100% 召回率的探索",
    category: "毕业设计",
    date: "2024.12.27",
    slug: "bert-ai-text-detection",
    content: `随着 ChatGPT 的爆发式普及，如何区分人类撰写的文本与 AI 生成的内容成为了一个紧迫的研究课题。这篇文章完整记录了我的毕业设计——基于 BERT 微调的 AI 生成文本二分类器的研发全过程。

## 研究背景

2023年以来，大语言模型（LLM）的滥用引发了学术诚信、假新闻传播等社会问题。现有的检测工具多为黑盒 API，缺乏透明性和鲁棒性分析。本研究旨在构建一个可解释、高精度的 AI 文本检测系统。

## 数据与方法

使用 HC3 (Human ChatGPT Comparison Corpus) 数据集，包含约 6.8 万条人类回答与 ChatGPT 回答的对比样本。采用两阶段方法：

**阶段一：Baseline 模型**
- TF-IDF 特征提取 + Logistic Regression
- 5折交叉验证自动调参
- **结果**：准确率 98.48%，AUC 0.9985

**阶段二：BERT 微调**
- 使用 bert-base-uncased（110M 参数）
- AdamW 优化器，学习率 2e-5
- **结果**：准确率 99.36%，召回率 100%（零漏检）

## 核心发现：反直觉的鲁棒性分析

这是本研究最有趣的部分。我通过同义词替换和停用词删除两种扰动策略测试模型鲁棒性，发现了一个反直觉的现象：

| 扰动类型 | Baseline 下降 | BERT 下降 |
|---------|--------------|----------|
| 同义词替换 | -3.11% | **-9.52%** |
| 停用词删除 | -2.82% | **-9.08%** |

**为什么复杂的 BERT 反而更脆弱？**

- TF-IDF 依赖"词汇共现"的宏观统计特征，即使替换几个同义词，整体分布不变
- BERT 过度拟合了训练数据中的精细句法结构和微观语序，这恰恰是扰动最容易破坏的部分

这揭示了一个重要的 Trade-off：**高精度并不等同于高鲁棒性**。

## 改进方案：模型集成

为了结合两者的优势，我提出了加权集成策略：

\`Score = 0.4 × P_Baseline + 0.6 × P_BERT\`

集成后，在保持 99.58% 准确率的同时，扰动场景下的性能下降减少了约 1%。

## 结语

这个项目让我深刻理解了：在 AI 安全领域，盲目追求单一指标的极致是危险的。一个真正可用的检测系统，需要在精度与鲁棒性之间找到平衡。未来的改进方向包括对抗训练（Adversarial Training）和跨域泛化（使用 GPT-4 等新模型的数据）。`,
    isGraduation: true,
  },
]

export const projects = [
  {
    id: 1,
    title: "动漫推荐系统",
    client: "个人项目",
    year: "2025",
    description:
      "基于协同过滤和深度学习的动漫推荐系统。爬取了 MAL 和豆瓣的数据，使用 TensorFlow 构建推荐模型。前端用 Next.js + D3.js 做了可视化，可以看到不同动漫之间的相似度网络图。",
    tags: ["PYTHON", "TENSORFLOW", "NEXT.JS", "D3.JS"],
    image: "/neon-cyberpunk-interface.jpg",
    slug: "anime-recommender",
  },
  {
    id: 2,
    title: "音乐情绪分析器",
    client: "课程项目",
    year: "2024",
    description:
      "音乐情绪分析工具，通过分析歌曲的音频特征（节奏、音调、能量）来判断歌曲的情绪类型。结合 Spotify API 和机器学习模型，可以自动为你的歌单打上'快乐''忧伤''热血'等标签。",
    tags: ["PYTHON", "SKLEARN", "WEB AUDIO API", "REACT"],
    image: "/audio-visualization-abstract.jpg",
    slug: "music-mood-analyzer",
  },
  {
    id: 3,
    title: "疫情数据看板",
    client: "数据可视化作业",
    year: "2024",
    description:
      "疫情数据可视化仪表盘，使用 Python Flask 后端 + Echarts 前端，展示全球和中国各地区的疫情趋势。支持时间轴动画、地图热力图、以及多维度数据对比。虽然疫情已经过去，但这个项目让我学会了如何处理时序数据。",
    tags: ["FLASK", "ECHARTS", "PANDAS", "SQL"],
    image: "/brutalist-architecture-website.jpg",
    slug: "covid-dashboard",
  },
  {
    id: 4,
    title: "AI风格迁移",
    client: "个人实验",
    year: "2023",
    description:
      "基于神经风格迁移的图片艺术化工具。上传一张照片和一张艺术作品，AI 会把艺术风格应用到你的照片上。我用它把自己的自拍变成了新海诚风格的动漫场景，效果出奇地好。",
    tags: ["PYTORCH", "FASTAPI", "REACT", "AI"],
    image: "/glitch-art-digital.jpg",
    slug: "style-transfer-app",
  },
  {
    id: 5,
    title: "3D圣诞树",
    client: "个人项目",
    year: "2024",
    description:
      "一个基于 WebGL 的 3D 圣诞树体验项目。在这个虚拟空间里，你可以装饰你的圣诞树，添加回忆照片，并与漫天飞舞的雪花互动。这是一个关于节日、记忆和代码的浪漫实验。",
    tags: ["THREE.JS", "REACT", "WEBGL", "NETLIFY"],
    image: "/Christmas.png",
    slug: "christmas-tree-3d",
    demoUrl: "https://toxiaoxinxin.netlify.app/",
    repoUrl: "https://github.com/AnxForever/Christmas",
  },
  {
    id: 6,
    title: "AI文本检测器",
    client: "毕业设计",
    year: "2025",
    description:
      "基于 BERT 微调的 AI 生成文本二分类器。在 HC3 数据集上实现 99.36% 准确率和 100% 召回率。核心创新点：发现深度模型在文本扰动下的鲁棒性反而不如传统 TF-IDF 模型，并提出了集成策略来平衡精度与鲁棒性。",
    tags: ["BERT", "PYTORCH", "TRANSFORMERS", "NLP"],
    image: "/ai-text-detector.jpg",
    slug: "ai-text-detector",
    isGraduation: true,
    status: "已完成",
  },
]

export const experiments = [
  {
    id: 1,
    title: "神经网络可视化",
    description: "神经网络训练过程的 3D 可视化，看见每一层的激活和权重变化。",
    tags: ["THREE.JS", "WEBGL", "TENSORFLOW.JS"],
    color: "bg-accent-pink",
    slug: "neural-net-visualizer",
    icon: Brain,
  },
  {
    id: 2,
    title: "音频反应粒子",
    description: "实时响应麦克风输入的粒子系统，音乐越大声，粒子越疯狂。",
    tags: ["WEB AUDIO", "CANVAS", "PHYSICS"],
    color: "bg-accent-green",
    slug: "audio-reactive-particles",
    icon: Mic,
  },
  {
    id: 3,
    title: "生成式排版",
    description: "鼠标经过时文字会被'推开'的实验性排版效果。",
    tags: ["SVG", "GSAP", "INTERACTION"],
    color: "bg-accent-blue",
    slug: "generative-typography",
    icon: Type,
  },
  {
    id: 4,
    title: "物理布局引擎",
    description: "基于 Matter.js 的物理引擎，方块会真实地碰撞和弹跳。",
    tags: ["MATTER.JS", "REACT", "PHYSICS"],
    color: "bg-accent-yellow",
    slug: "physics-based-layout",
    icon: Layers,
  },
  {
    id: 5,
    title: "AI 聊天机器人",
    description: "基于 GPT 的角色扮演聊天机器人，可以模拟动漫角色对话。",
    tags: ["OPENAI API", "NEXT.JS", "AI"],
    color: "bg-accent-red",
    slug: "ai-chatbot",
    icon: Cpu,
  },
  {
    id: 6,
    title: "数据可视化画廊",
    description: "收集了我做过的各种数据可视化作品，从简单的折线图到复杂的网络图。",
    tags: ["D3.JS", "ECHARTS", "VISUALIZATION"],
    color: "bg-white",
    slug: "data-viz-gallery",
    icon: Zap,
  },
  {
    id: 7,
    title: "AI 风格迁移",
    description: "上传照片和艺术作品，AI 会将艺术风格应用到你的照片上。把自拍变成新海诚动漫风格。",
    tags: ["PYTORCH", "NEURAL STYLE", "AI"],
    color: "bg-accent-pink",
    slug: "style-transfer",
    icon: Palette,
  },
  {
    id: 8,
    title: "AI 文本检测",
    description: "基于 BERT 的文本检测器，99.36% 准确率 + 100% 召回率。发现了深度模型鲁棒性的反直觉现象。",
    tags: ["BERT", "NLP", "TRANSFORMERS"],
    color: "bg-gradient-to-br from-accent-green to-accent-blue",
    slug: "ai-text-detector",
    icon: ScanSearch,
    isGraduation: true,
  },
]
