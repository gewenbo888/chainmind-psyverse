// 5 architectural archetypes. Each is the same five layers
// (Consensus, Execution, Data Availability, Settlement, Proof)
// assigned to different actors.

export type LayerKey = "consensus" | "execution" | "da" | "settlement" | "proof";

export interface Layer {
  key: LayerKey;
  ownerEn: string;
  ownerZh: string;
  trust: "minimized" | "required" | "trustless";
}

export interface Architecture {
  id: string;
  en: string;
  zh: string;
  taglineEn: string;
  taglineZh: string;
  examples: string;
  layers: Layer[];
  noteEn: string;
  noteZh: string;
}

export const ARCHITECTURES: Architecture[] = [
  {
    id: "monolithic",
    en: "Monolithic L1",
    zh: "单体 L1",
    taglineEn: "One chain handles consensus, execution, data availability, and settlement together.",
    taglineZh: "一条链同时承担共识、执行、数据可用性与结算。",
    examples: "Solana, Aptos, Sui, BSC",
    layers: [
      { key: "consensus", ownerEn: "Validator set", ownerZh: "验证者集合", trust: "minimized" },
      { key: "execution", ownerEn: "Validator set", ownerZh: "验证者集合", trust: "minimized" },
      { key: "da", ownerEn: "Validator set", ownerZh: "验证者集合", trust: "minimized" },
      { key: "settlement", ownerEn: "Validator set", ownerZh: "验证者集合", trust: "minimized" },
      { key: "proof", ownerEn: "Re-execution by full nodes", ownerZh: "全节点重新执行", trust: "minimized" },
    ],
    noteEn: "Performance comes from putting everything in one place. Trust is reduced to: enough validators are honest. Re-execution is the only proof — there is no proof artifact.",
    noteZh: "性能来自把所有东西塞进同一处。信任被压缩为：足够多的验证者是诚实的。所谓「证明」就是全节点自己跑一遍——没有任何证明产物。",
  },
  {
    id: "modular",
    en: "Modular stack",
    zh: "模块化栈",
    taglineEn: "Layers are sold separately. Each rented from a different provider.",
    taglineZh: "各层单独出售，每一层从不同提供方租用。",
    examples: "Celestia + Rollup + EVM L1",
    layers: [
      { key: "consensus", ownerEn: "DA chain (e.g. Celestia)", ownerZh: "DA 链（如 Celestia）", trust: "minimized" },
      { key: "execution", ownerEn: "Rollup operator", ownerZh: "Rollup 运营者", trust: "required" },
      { key: "da", ownerEn: "DA chain (Celestia / EigenDA)", ownerZh: "DA 链（Celestia / EigenDA）", trust: "minimized" },
      { key: "settlement", ownerEn: "Settlement L1 (Ethereum)", ownerZh: "结算 L1（以太坊）", trust: "minimized" },
      { key: "proof", ownerEn: "Fraud or validity proof", ownerZh: "欺诈证明或有效性证明", trust: "minimized" },
    ],
    noteEn: "Specialization. Each layer can be replaced. The cost is more interfaces and more attack surface — bridges between the layers themselves become a trust point.",
    noteZh: "专业化。每一层都可替换。代价是接口更多、攻击面更大——层与层之间的桥本身就成为一个新的信任点。",
  },
  {
    id: "optimistic",
    en: "Optimistic rollup",
    zh: "乐观 Rollup",
    taglineEn: "Execute optimistically. Trust 1-of-N watchers to spot a fraud and submit proof.",
    taglineZh: "先乐观执行。靠 1-of-N 的观察者发现欺诈并提交证明。",
    examples: "Arbitrum, Optimism, Base",
    layers: [
      { key: "consensus", ownerEn: "Settlement L1 (inherited)", ownerZh: "结算 L1（继承）", trust: "minimized" },
      { key: "execution", ownerEn: "Sequencer (often singleton)", ownerZh: "排序器（通常单一）", trust: "required" },
      { key: "da", ownerEn: "Settlement L1 (Ethereum)", ownerZh: "结算 L1（以太坊）", trust: "minimized" },
      { key: "settlement", ownerEn: "Settlement L1", ownerZh: "结算 L1", trust: "minimized" },
      { key: "proof", ownerEn: "Fraud proof, after challenge window", ownerZh: "欺诈证明（争议窗口结束后）", trust: "minimized" },
    ],
    noteEn: "Cheaper than ZK rollups. The 7-day challenge window is the price. Liveness depends on at least one honest watcher being online with a working bridge to the L1.",
    noteZh: "比 ZK Rollup 便宜。代价是 7 天的争议窗口。其活性依赖：至少有一个诚实观察者在线，并且与 L1 之间的桥能正常工作。",
  },
  {
    id: "zk-rollup",
    en: "ZK rollup",
    zh: "ZK Rollup",
    taglineEn: "Every batch is accompanied by a validity proof verified on the settlement chain.",
    taglineZh: "每一批交易都附带一份有效性证明，在结算链上被验证。",
    examples: "zkSync Era, StarkNet, Scroll, Polygon zkEVM",
    layers: [
      { key: "consensus", ownerEn: "Settlement L1 (inherited)", ownerZh: "结算 L1（继承）", trust: "minimized" },
      { key: "execution", ownerEn: "Prover network", ownerZh: "证明者网络", trust: "minimized" },
      { key: "da", ownerEn: "Settlement L1", ownerZh: "结算 L1", trust: "minimized" },
      { key: "settlement", ownerEn: "Settlement L1 verifier contract", ownerZh: "结算 L1 上的验证合约", trust: "trustless" },
      { key: "proof", ownerEn: "Validity proof (ZK)", ownerZh: "有效性证明（ZK）", trust: "trustless" },
    ],
    noteEn: "No challenge window. Withdrawal is final the moment a proof is verified on L1. Cost: heavy proving, often a trusted setup, sometimes a centralized sequencer for the moment of submission.",
    noteZh: "没有争议窗口。证明在 L1 上被验证的那一刻，提款就是最终的。代价：证明计算重、通常需要可信设置、提交瞬间往往仍是中心化排序器。",
  },
  {
    id: "psy",
    en: "Psy (sovereign ZK L1)",
    zh: "Psy（主权 ZK L1）",
    taglineEn: "Sovereign L1 with native ZK. Cross-chain anchored to EVM/TRON via on-L1 verifiers.",
    taglineZh: "原生 ZK 的主权 L1。跨链通过 L1 上的验证器锚定 EVM/TRON。",
    examples: "Psy Protocol",
    layers: [
      { key: "consensus", ownerEn: "Coordinator + 128 realms (PARTH)", ownerZh: "协调器 + 128 个 Realm（PARTH）", trust: "minimized" },
      { key: "execution", ownerEn: "Realm prover network (Plonky2)", ownerZh: "Realm 证明者网络（Plonky2）", trust: "trustless" },
      { key: "da", ownerEn: "Native (ScyllaDB + checkpoints)", ownerZh: "原生（ScyllaDB + checkpoint）", trust: "minimized" },
      { key: "settlement", ownerEn: "Native L1, plus EVM/TRON anchor for bridges", ownerZh: "原生 L1，桥锚定到 EVM/TRON", trust: "trustless" },
      { key: "proof", ownerEn: "Plonky2 → Groth16 → on-L1 verifier", ownerZh: "Plonky2 → Groth16 → L1 上验证器", trust: "trustless" },
    ],
    noteEn: "Not a rollup — Psy is its own L1. But its bridges are settled by ZK proofs on EVM and TRON, so withdrawal trust reduces to circuit soundness, not validator honesty. M-of-N relayers exist for liveness only — any user can self-generate a withdrawal proof if relayers go silent.",
    noteZh: "不是 Rollup——Psy 自己就是 L1。但它的桥在 EVM 与 TRON 上由 ZK 证明结算，因此提款的信任压缩到电路可靠性，而不是验证者诚实。M-of-N 中继者只为活性存在——若它们集体下线，任何用户都可以自己生成提款证明。",
  },
];
