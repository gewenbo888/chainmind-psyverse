export type Lang = "en" | "zh";
type T = { en: string; zh: string };
type Dict = Record<string, T>;

export const t: Dict = {
  brand: { en: "ChainMind", zh: "链脑" },
  brandSub: { en: "Cognitive system for blockchain security, architecture, and trust", zh: "区块链安全、架构与信任的认知系统" },
  langToggle: { en: "中文", zh: "EN" },

  // Nav
  navArchitectures: { en: "Architectures", zh: "架构" },
  navTrust: { en: "Trust", zh: "信任" },
  navRisks: { en: "Risks", zh: "风险" },
  navSimulate: { en: "Simulate", zh: "模拟" },
  navPsy: { en: "Psy", zh: "Psy" },

  // ── Landing
  heroEyebrow: { en: "An interactive system for security reasoning", zh: "面向安全推理的交互系统" },
  heroTitle: { en: "Where does the safety actually come from?", zh: "安全，到底从哪里来？" },
  heroSubtitle: {
    en: "Most blockchain systems are explained as if they were trustless. Almost none of them are. ChainMind takes the architectures, the trust assumptions, and the historical failures, and lays them on the same table — so you can see where math protects you, and where you are simply trusting people.",
    zh: "多数区块链系统对外宣传时都把自己说成「无需信任」。但几乎没有一个真的如此。ChainMind 把架构、信任假设和历史故障摆在同一张桌子上——让你看清：哪里是数学在保护你，哪里只是你在相信某些人。",
  },
  heroCta: { en: "Open the system", zh: "进入系统" },
  heroSecondary: { en: "Read the premise", zh: "阅读前提" },

  // Stats
  statLost: { en: "Lost in cross-chain bridge incidents", zh: "在跨链桥事件中已损失" },
  statIncidents: { en: "Independent failure events catalogued", zh: "已收录的独立故障事件" },
  statSystems: { en: "Architectures compared", zh: "对比的架构数" },

  // Premise
  premiseEyebrow: { en: "Three premises", zh: "三个前提" },
  premise1Title: { en: "Trustless is not a binary.", zh: "「无需信任」不是非黑即白。" },
  premise1Body: {
    en: "Every system trusts something — at minimum, that the math is right and the verifier was implemented correctly. The honest question is what *else* a system requires you to trust beyond that, and how many people have to be honest at once.",
    zh: "每一个系统都至少要信任一件事——至少要相信数学正确、验证器实现无误。诚实的问题是：除此之外，这个系统还要求你信任什么；又要求多少人同时保持诚实。",
  },
  premise2Title: { en: "Architecture is the trust set.", zh: "架构本身就是信任集。" },
  premise2Body: {
    en: "A monolithic chain trusts its validators. A rollup trusts its sequencer plus a fraud-prover or a verifier circuit. A multisig bridge trusts its keyholders. The choice of architecture is the choice of who gets the keys to the safety property.",
    zh: "单体链信任它的验证者。Rollup 信任它的排序器加上欺诈证明者或验证电路。多签桥信任它的密钥持有人。架构选型，就是在选定谁拿着安全属性的钥匙。",
  },
  premise3Title: { en: "Failure leaves a trail.", zh: "故障会留下痕迹。" },
  premise3Body: {
    en: "$2.8B+ has been stolen across cross-chain bridge incidents alone. Every incident is a leak from one specific assumption: a multisig was compromised, a signature was replayed, a contract was deployed with the wrong initializer. Reading the trail tells you which assumptions don't survive contact with attackers.",
    zh: "仅跨链桥事件中已被盗超过 28 亿美元。每一次事件都是某一个具体假设被泄露的痕迹：多签被攻陷、签名被重放、合约用错了初始化器。读这串痕迹，就知道哪些假设撑不住攻击者的现实接触。",
  },

  // Module index
  modIndexEyebrow: { en: "Five chambers", zh: "五个分卷" },
  modIndexTitle: { en: "Move from architecture to attack to math.", zh: "从架构出发，经过攻击，落到数学。" },

  cardArchTitle: { en: "Architecture Explorer", zh: "架构索引" },
  cardArchDesc: { en: "Five archetypes — monolithic, modular, optimistic rollup, ZK rollup, cross-chain — with stack diagrams and component owners.", zh: "五种原型——单体、模块化、乐观 Rollup、ZK Rollup、跨链——配以分层图与组件归属。" },
  cardTrustTitle: { en: "Trust Matrix", zh: "信任矩阵" },
  cardTrustDesc: { en: "Nine systems × six trust dimensions. Each cell colour-coded: trust-required, trust-minimized, trustless, structurally impossible.", zh: "九个系统 × 六个信任维度。每一格按色彩标注：需信任、信任最小化、无需信任、结构上不可能。" },
  cardRisksTitle: { en: "Risk & Failure Database", zh: "风险与故障库" },
  cardRisksDesc: { en: "A taxonomy of attack vectors plus a chronological catalogue of ~25 historical incidents, each tagged with the assumption that broke.", zh: "一份攻击向量分类，加上约 25 起历史事件的时序目录，每一起都标注「破裂的假设」。" },
  cardSimTitle: { en: "Cross-chain Simulator", zh: "跨链模拟器" },
  cardSimDesc: { en: "Animated step-by-step flows for deposit / claim / transfer / withdraw across architectures, with live trust callouts.", zh: "为充值 / 领取 / 转账 / 提取在不同架构下做动画化逐步演示，配以实时的信任提示。" },
  cardPsyTitle: { en: "Psy Deep Dive", zh: "Psy 深度解析" },
  cardPsyDesc: { en: "How Psy collapses cross-chain trust to circuit soundness. The Plonky2 → Groth16 → L1 verification path, with honest framing of relayers.", zh: "Psy 如何把跨链信任压缩为电路可靠性。Plonky2 → Groth16 → L1 的验证路径，并对中继者作诚实定位。" },

  // ── Architectures
  archEyebrow: { en: "Module · 1", zh: "模块·一" },
  archTitle: { en: "Five archetypes of a chain.", zh: "一条链的五种原型。" },
  archSubtitle: {
    en: "Each archetype is the same five layers — consensus, execution, data availability, settlement, proof — assigned to different actors. Where the boundary falls determines who you trust.",
    zh: "每一种原型都是同样的五层——共识、执行、数据可用性、结算、证明——只是被分给了不同的角色。这条边界落在哪里，就决定了你需要信任谁。",
  },
  archLayer: { en: "Layer", zh: "分层" },
  archOwner: { en: "Owned by", zh: "归属" },
  archConsensus: { en: "Consensus", zh: "共识" },
  archExecution: { en: "Execution", zh: "执行" },
  archDA: { en: "Data Availability", zh: "数据可用性" },
  archSettlement: { en: "Settlement", zh: "结算" },
  archProof: { en: "Proof / Validity", zh: "证明 / 有效性" },

  // ── Trust matrix
  trustEyebrow: { en: "Module · 2", zh: "模块·二" },
  trustTitle: { en: "Who do you have to trust?", zh: "你究竟要信任谁？" },
  trustSubtitle: {
    en: "Nine systems on the rows. Six trust dimensions on the columns. Every cell labels one fact: at this dimension, this system requires this kind of trust.",
    zh: "行是九个系统，列是六个信任维度。每一格只表达一件事：在这个维度上，这个系统要求的是哪一种信任。",
  },
  trustLegendRequired: { en: "Trust required", zh: "需信任" },
  trustLegendMinimized: { en: "Trust minimized", zh: "信任最小化" },
  trustLegendTrustless: { en: "Trustless", zh: "无需信任" },
  trustLegendImpossible: { en: "Structurally impossible", zh: "结构上不可能" },

  trustDimValidity: { en: "Validity", zh: "有效性" },
  trustDimAvailability: { en: "Availability", zh: "可用性" },
  trustDimCensorship: { en: "Censorship", zh: "抗审查" },
  trustDimCustody: { en: "Custody", zh: "资产托管" },
  trustDimFinality: { en: "Finality", zh: "最终性" },
  trustDimExit: { en: "Exit", zh: "退出" },

  // Risks
  risksEyebrow: { en: "Module · 3", zh: "模块·三" },
  risksTitle: { en: "Where systems fail. And why.", zh: "系统在哪里、因何失效。" },
  risksSubtitle: {
    en: "The first column groups failure types by category. The second column places each historical incident on its category. Every dot is a real loss; every dot is a specific assumption that did not survive.",
    zh: "第一列按类别归纳故障类型。第二列把每一起历史事件放回它所属的类别。每一个点都是真实损失；每一个点都是某个具体假设没有挺住的瞬间。",
  },
  risksTotalLost: { en: "Total losses catalogued", zh: "已归档总损失" },
  risksByCategory: { en: "By category", zh: "按类别" },
  risksTimeline: { en: "Chronological", zh: "时序" },

  // Simulate
  simEyebrow: { en: "Module · 4", zh: "模块·四" },
  simTitle: { en: "Watch the trust assumption travel.", zh: "看着信任假设一步一步走过去。" },
  simSubtitle: {
    en: "Pick a flow. Pick an architecture. The animation below shows messages and state changes, and the right rail labels the trust assumption at every step. Play it on a multisig bridge, then play it on Psy. The difference is visible.",
    zh: "选一种流程，选一种架构。下方动画展示消息与状态的流动，右栏在每一步标出此刻的信任假设。先在多签桥上跑一遍，再在 Psy 上跑一遍。差别一目了然。",
  },
  simPlay: { en: "Play", zh: "播放" },
  simPause: { en: "Pause", zh: "暂停" },
  simReset: { en: "Reset", zh: "重置" },
  simStep: { en: "Step", zh: "单步" },
  simFlow: { en: "Flow", zh: "流程" },
  simArch: { en: "Architecture", zh: "架构" },
  simTrustNow: { en: "Trust assumption right now", zh: "此刻的信任假设" },

  flowDeposit: { en: "Deposit", zh: "充值" },
  flowTransfer: { en: "Transfer", zh: "转账" },
  flowClaim: { en: "Claim", zh: "领取" },
  flowWithdraw: { en: "Withdraw", zh: "提取" },

  archMultisig: { en: "Multisig bridge", zh: "多签桥" },
  archValidator: { en: "Validator-set bridge", zh: "验证者集桥" },
  archOptimistic: { en: "Optimistic rollup", zh: "乐观 Rollup" },
  archZK: { en: "ZK rollup", zh: "ZK Rollup" },
  archPsy: { en: "Psy (ZK + L1 anchored)", zh: "Psy（ZK + L1 锚定）" },

  // Psy
  psyEyebrow: { en: "Module · 5", zh: "模块·五" },
  psyTitle: { en: "Trust collapsed to circuit soundness.", zh: "信任，压缩到电路可靠性。" },
  psySubtitle: {
    en: "Psy is a sovereign ZK-native L1 with cross-chain bridges anchored on EVM and TRON. The safety property is not held by validators or relayers. It is held by a Plonky2 proof, recursively aggregated, wrapped in Groth16/BN254, and verified by a Solidity contract on each L1.",
    zh: "Psy 是一条原生 ZK 的主权 L1，桥锚定在 EVM 与 TRON 上。安全属性不由验证者或中继者持有——它由一份 Plonky2 证明持有：递归聚合后，被包成 Groth16/BN254，再由每个 L1 上的 Solidity 合约去验证。",
  },

  psyArchTitle: { en: "The verification path", zh: "验证路径" },
  psyStep1Title: { en: "1. State transition", zh: "1. 状态转移" },
  psyStep1Body: {
    en: "A user submits a transaction on Psy. A Realm node executes it, producing a Plonky2 proof of correct execution against the Goldilocks field. Each transaction proof is small; thousands fit in a checkpoint.",
    zh: "用户在 Psy 上提交一笔交易。一个 Realm 节点执行它，并基于 Goldilocks 字段生成一份 Plonky2 的正确执行证明。每笔交易证明都很小；一个 checkpoint 内可容纳数千份。",
  },
  psyStep2Title: { en: "2. Recursive aggregation", zh: "2. 递归聚合" },
  psyStep2Body: {
    en: "Worker nodes recursively aggregate transaction proofs into one checkpoint proof per realm, then 128 realm proofs into one coordinator proof. Recursive Plonky2 makes this aggregation cheap — proof size stays constant.",
    zh: "Worker 节点把交易证明递归聚合成每个 Realm 一份的 checkpoint 证明，再把 128 份 Realm 证明聚合成一份 Coordinator 证明。Plonky2 的递归性让这种聚合代价极低——证明大小保持不变。",
  },
  psyStep3Title: { en: "3. Groth16 wrapper", zh: "3. Groth16 包装" },
  psyStep3Body: {
    en: "The aggregated Plonky2 proof is wrapped in a Groth16 proof over BN254 (via gnark-plonky2-verifier). The wrapping is a one-time circuit that proves: 'I have verified a valid Plonky2 proof.' This step exists because BN254 has a cheap on-chain pairing — Goldilocks does not.",
    zh: "聚合后的 Plonky2 证明再用 BN254 上的 Groth16 包装一层（通过 gnark-plonky2-verifier）。这层包装是一次性电路，要证明的事情是：「我验证过一份合法的 Plonky2 证明」。它存在的唯一原因是——BN254 在链上做配对运算很便宜，而 Goldilocks 不便宜。",
  },
  psyStep4Title: { en: "4. L1 verification", zh: "4. L1 上验证" },
  psyStep4Body: {
    en: "A Solidity contract on Ethereum (and a Tron equivalent) verifies the Groth16 proof and updates a Checkpoint Root Registry. Verification cost is ~285k gas — comparable to a single Uniswap swap. Anyone can read the registry to confirm a Psy state transition without trusting any operator.",
    zh: "以太坊上的一份 Solidity 合约（TRON 上有一份对等的）验证这份 Groth16 证明，并更新一个 Checkpoint Root Registry。验证成本约 28.5 万 gas——和一次 Uniswap 兑换相当。任何人都可以读取这个注册表，从而在不信任任何运营者的情况下确认一次 Psy 状态转移。",
  },

  psyClaim1Title: { en: "Claim 1 — No multisig holds the safety property", zh: "声明一 — 没有任何多签持有安全属性" },
  psyClaim1Body: {
    en: "Bridge funds on L1 are released only when the L1 verifier accepts a Groth16 proof of the corresponding Psy state transition. There is no M-of-N keyholder set whose collusion can fabricate a fraudulent withdrawal. Compromising every Psy operator does not let anyone steal — without a valid proof, the L1 contract refuses.",
    zh: "L1 上的桥资金，只有当 L1 验证器接受了对应 Psy 状态转移的 Groth16 证明时才会释放。不存在一个 M-of-N 密钥持有者集合，能用串通去伪造提款。即便攻陷 Psy 的所有运营者也偷不到钱——没有合法证明，L1 合约就是不放。",
  },
  psyClaim2Title: { en: "Claim 2 — Relayers exist, but only for liveness", zh: "声明二 — 中继者存在，但只为活性" },
  psyClaim2Body: {
    en: "An M-of-N relayer set exists in the Psy bridge design. Their only role is to push proofs and checkpoints to L1 promptly. If they all go offline, any user can self-generate a withdrawal proof after the bot timeout (force-withdrawal). Liveness is degraded; safety is not. This is the structural distinction between safety-critical and liveness-only trust.",
    zh: "Psy 的桥设计里确实有一个 M-of-N 的中继者集合。它们的唯一职责是把证明和 checkpoint 及时推上 L1。如果它们全部下线，任何用户都可以在机器人超时后自行生成提款证明（force-withdrawal）。活性会下降，安全性不会下降。这就是「安全关键的信任」与「仅活性的信任」之间的结构性区别。",
  },
  psyClaim3Title: { en: "Claim 3 — Trust collapses to four objects", zh: "声明三 — 信任压缩到四件事上" },
  psyClaim3Body: {
    en: "After every layer is unrolled, the safety property reduces to: (a) Plonky2 cryptographic soundness, (b) Groth16 cryptographic soundness, (c) the gnark-plonky2-verifier wrapper circuit being free of constraint bugs, and (d) the L1 verifier contract being free of bugs. Each is auditable. None require any human to remain honest. This is what 'trust minimization' means when made concrete.",
    zh: "把每一层都展开之后，安全属性最终归结到四件事：（a）Plonky2 的密码学可靠性，（b）Groth16 的密码学可靠性，（c）gnark-plonky2-verifier 这层包装电路没有约束漏洞，（d）L1 上那份验证合约没有漏洞。每一项都可审计。任何一项都不要求某个人保持诚实。具体到地，「信任最小化」就是这么回事。",
  },

  psyHonest: { en: "What Psy does not solve", zh: "Psy 没有解决什么" },
  psyHonestBody: {
    en: "Psy reduces cross-chain and cross-realm trust to circuit soundness. It does not reduce: (a) bugs in user-deployed Psy-lang contracts (smart-contract risk persists), (b) bugs in the Psy compiler or VM (a circuit-generation bug would corrupt every contract built with it), (c) social-engineering attacks on individual users, (d) governance compromise of the L1 verifier upgrade key (an upgradeable verifier is itself a trust assumption — Psy's verifier is non-upgradeable). Honest framing matters.",
    zh: "Psy 把跨链和跨 Realm 的信任压缩到了电路可靠性上。但它没有解决：（a）用户自己部署的 Psy-lang 合约里的 bug（智能合约风险仍在）；（b）Psy 编译器或虚拟机里的 bug（电路生成阶段的一个 bug 会污染所有用它构建的合约）；（c）对个体用户的社交工程攻击；（d）L1 验证器升级密钥被治理攻陷（可升级的验证器本身就是一种信任假设——Psy 的验证器是不可升级的）。诚实地说清楚很重要。",
  },

  // Footer
  footerLine: { en: "Trust the math. Audit everything else.", zh: "信任数学，其他全部审计。" },
  footerPart: { en: "Part of", zh: "属于" },
  footerPsyverse: { en: "the Psyverse", zh: "Psyverse 宇宙" },
};

export const tr = (k: keyof typeof t, lang: Lang) => t[k][lang];
