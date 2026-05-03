// Trust matrix: 9 systems × 6 trust dimensions.
// Each cell labels what kind of trust the system requires for that dimension.

export type TrustLevel = "required" | "minimized" | "trustless" | "impossible";

export type DimKey = "validity" | "availability" | "censorship" | "custody" | "finality" | "exit";

export interface SystemRow {
  id: string;
  en: string;
  zh: string;
  cells: Record<DimKey, { level: TrustLevel; noteEn: string; noteZh: string }>;
}

export const SYSTEMS: SystemRow[] = [
  {
    id: "bank",
    en: "Bank / clearinghouse",
    zh: "银行 / 清算所",
    cells: {
      validity: { level: "required", noteEn: "Trust the bank's ledger", noteZh: "信任银行账簿" },
      availability: { level: "required", noteEn: "Trust the bank stays open", noteZh: "信任银行不关门" },
      censorship: { level: "required", noteEn: "Bank can freeze you", noteZh: "银行可冻结你" },
      custody: { level: "required", noteEn: "Bank holds your funds", noteZh: "银行掌握资金" },
      finality: { level: "minimized", noteEn: "Settlement finality is legal", noteZh: "结算最终性来自法律" },
      exit: { level: "required", noteEn: "Bank must approve withdrawal", noteZh: "提款须经银行批准" },
    },
  },
  {
    id: "bitcoin",
    en: "Bitcoin",
    zh: "比特币",
    cells: {
      validity: { level: "minimized", noteEn: "PoW + UTXO consensus", noteZh: "PoW + UTXO 共识" },
      availability: { level: "minimized", noteEn: "Distributed miners", noteZh: "分布式矿工" },
      censorship: { level: "minimized", noteEn: "Any miner can include", noteZh: "任意矿工可打包" },
      custody: { level: "trustless", noteEn: "Self-custody (your keys)", noteZh: "自托管（私钥在你手上）" },
      finality: { level: "minimized", noteEn: "Probabilistic, ~6 blocks", noteZh: "概率性，约 6 块" },
      exit: { level: "trustless", noteEn: "Sign and broadcast", noteZh: "签名后广播即可" },
    },
  },
  {
    id: "ethereum",
    en: "Ethereum L1",
    zh: "以太坊 L1",
    cells: {
      validity: { level: "minimized", noteEn: "PoS + full nodes re-execute", noteZh: "PoS + 全节点重新执行" },
      availability: { level: "minimized", noteEn: "Distributed validators", noteZh: "分布式验证者" },
      censorship: { level: "minimized", noteEn: "MEV is the loophole", noteZh: "MEV 是漏洞" },
      custody: { level: "trustless", noteEn: "Self-custody", noteZh: "自托管" },
      finality: { level: "minimized", noteEn: "~12 minutes economic finality", noteZh: "约 12 分钟经济最终性" },
      exit: { level: "trustless", noteEn: "Sign and broadcast", noteZh: "签名后广播即可" },
    },
  },
  {
    id: "lightning",
    en: "Lightning Network",
    zh: "闪电网络",
    cells: {
      validity: { level: "minimized", noteEn: "Inherits Bitcoin", noteZh: "继承比特币" },
      availability: { level: "required", noteEn: "Counterparty must stay online", noteZh: "对手方必须在线" },
      censorship: { level: "required", noteEn: "Channel partner can refuse", noteZh: "通道伙伴可拒绝" },
      custody: { level: "minimized", noteEn: "Funds in 2-of-2 multisig", noteZh: "资金在 2-of-2 多签里" },
      finality: { level: "trustless", noteEn: "Instant within channel", noteZh: "通道内即时最终" },
      exit: { level: "minimized", noteEn: "Force-close to L1 (slow)", noteZh: "强制关闭到 L1（慢）" },
    },
  },
  {
    id: "multisig-bridge",
    en: "Multisig bridge (M-of-N)",
    zh: "多签桥（M-of-N）",
    cells: {
      validity: { level: "required", noteEn: "Trust M signers", noteZh: "信任 M 个签名者" },
      availability: { level: "required", noteEn: "Need M online", noteZh: "需 M 个在线" },
      censorship: { level: "required", noteEn: "Signers can refuse", noteZh: "签名者可拒绝" },
      custody: { level: "required", noteEn: "Signers control L1 vault", noteZh: "签名者掌控 L1 资金池" },
      finality: { level: "required", noteEn: "Signers declare finality", noteZh: "签名者声明最终性" },
      exit: { level: "required", noteEn: "M signers must approve", noteZh: "需 M 个签名批准" },
    },
  },
  {
    id: "validator-bridge",
    en: "Validator-set bridge",
    zh: "验证者集合桥",
    cells: {
      validity: { level: "required", noteEn: "Trust 2/3 of bridge validators", noteZh: "信任 2/3 桥验证者" },
      availability: { level: "required", noteEn: "Need a quorum online", noteZh: "需法定多数在线" },
      censorship: { level: "required", noteEn: "Validator quorum can censor", noteZh: "验证者法定多数可审查" },
      custody: { level: "required", noteEn: "Validators control vault", noteZh: "验证者掌控资金池" },
      finality: { level: "required", noteEn: "Validators sign finality", noteZh: "验证者签署最终性" },
      exit: { level: "required", noteEn: "Quorum approval required", noteZh: "需法定多数批准" },
    },
  },
  {
    id: "optimistic-rollup",
    en: "Optimistic rollup",
    zh: "乐观 Rollup",
    cells: {
      validity: { level: "minimized", noteEn: "1-of-N honest watcher", noteZh: "1-of-N 诚实观察者" },
      availability: { level: "minimized", noteEn: "L1 force-include if sequencer fails", noteZh: "排序器故障时可由 L1 强制收录" },
      censorship: { level: "minimized", noteEn: "Force-include via L1", noteZh: "通过 L1 强制收录" },
      custody: { level: "trustless", noteEn: "L1 contract holds funds", noteZh: "资金存放在 L1 合约" },
      finality: { level: "minimized", noteEn: "After 7-day challenge window", noteZh: "7 天争议窗口结束后" },
      exit: { level: "minimized", noteEn: "Wait 7 days; force-exit possible", noteZh: "等待 7 天，可强制退出" },
    },
  },
  {
    id: "zk-rollup",
    en: "ZK rollup",
    zh: "ZK Rollup",
    cells: {
      validity: { level: "trustless", noteEn: "Validity proof on L1", noteZh: "L1 上的有效性证明" },
      availability: { level: "minimized", noteEn: "DA on L1 (or specialized DA)", noteZh: "DA 在 L1（或专用 DA 链）" },
      censorship: { level: "minimized", noteEn: "Force-include via L1", noteZh: "通过 L1 强制收录" },
      custody: { level: "trustless", noteEn: "L1 contract holds funds", noteZh: "资金存放在 L1 合约" },
      finality: { level: "trustless", noteEn: "Final on L1 proof verification", noteZh: "L1 验证证明的瞬间即最终" },
      exit: { level: "trustless", noteEn: "Generate withdrawal proof", noteZh: "生成提款证明" },
    },
  },
  {
    id: "psy",
    en: "Psy",
    zh: "Psy",
    cells: {
      validity: { level: "trustless", noteEn: "Plonky2 → Groth16 → L1 verifier", noteZh: "Plonky2 → Groth16 → L1 验证器" },
      availability: { level: "minimized", noteEn: "Coordinator + 128 realms", noteZh: "协调器 + 128 个 Realm" },
      censorship: { level: "minimized", noteEn: "Force-withdrawal via self-proof", noteZh: "自生成证明强制提款" },
      custody: { level: "trustless", noteEn: "L1 vault released only on proof", noteZh: "L1 资金池仅凭证明释放" },
      finality: { level: "trustless", noteEn: "Final on L1 proof verification", noteZh: "L1 验证证明的瞬间即最终" },
      exit: { level: "trustless", noteEn: "Self-generate proof, bypass relayers", noteZh: "自生成证明，绕过中继者" },
    },
  },
];
