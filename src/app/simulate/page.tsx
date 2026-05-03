"use client";

import { useEffect, useRef, useState } from "react";
import { useM } from "@/lib/providers";

type FlowKey = "deposit" | "transfer" | "claim" | "withdraw";
type ArchKey = "multisig" | "validator" | "optimistic" | "zk" | "psy";

interface Step {
  fromActor: string;
  toActor: string;
  msgEn: string;
  msgZh: string;
  trustEn: string;
  trustZh: string;
  trustLevel: "required" | "minimized" | "trustless";
}

const ACTORS = ["User", "L1", "Bots", "Bridge", "Psy"];

const FLOWS: Record<FlowKey, Record<ArchKey, Step[]>> = {
  deposit: {
    multisig: [
      { fromActor: "User", toActor: "L1", msgEn: "Lock USDT in vault contract", msgZh: "把 USDT 锁进资金池合约", trustEn: "L1 contract is trustless", trustZh: "L1 合约无需信任", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "Bots", msgEn: "Emit Deposit event", msgZh: "发出 Deposit 事件", trustEn: "Event emission is L1-native", trustZh: "事件由 L1 原生发出", trustLevel: "trustless" },
      { fromActor: "Bots", toActor: "Bots", msgEn: "M-of-N signers approve", msgZh: "M-of-N 签名者批准", trustEn: "Trust at most N−M signers are honest", trustZh: "信任至多 N−M 个签名者诚实", trustLevel: "required" },
      { fromActor: "Bots", toActor: "Bridge", msgEn: "Mint wrapped USDT to user", msgZh: "向用户铸出 wrapped USDT", trustEn: "Trust signers did not collude", trustZh: "信任签名者未串通", trustLevel: "required" },
    ],
    validator: [
      { fromActor: "User", toActor: "L1", msgEn: "Lock USDT in vault", msgZh: "把 USDT 锁进资金池", trustEn: "L1 contract is trustless", trustZh: "L1 合约无需信任", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "Bots", msgEn: "Validators observe deposit", msgZh: "验证者观察到充值", trustEn: "Validator quorum stays online", trustZh: "验证者法定多数保持在线", trustLevel: "minimized" },
      { fromActor: "Bots", toActor: "Bots", msgEn: "2/3 quorum signs", msgZh: "2/3 法定多数签名", trustEn: "Trust 2/3 of validators are honest", trustZh: "信任 2/3 验证者诚实", trustLevel: "required" },
      { fromActor: "Bots", toActor: "Bridge", msgEn: "Mint wrapped tokens", msgZh: "铸出 wrapped 代币", trustEn: "Trust quorum did not collude", trustZh: "信任法定多数未串通", trustLevel: "required" },
    ],
    optimistic: [
      { fromActor: "User", toActor: "L1", msgEn: "Lock funds on L1", msgZh: "在 L1 锁定资金", trustEn: "L1 contract trustless", trustZh: "L1 合约无需信任", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "Bridge", msgEn: "Sequencer credits user on L2", msgZh: "排序器在 L2 给用户记账", trustEn: "Trust sequencer in the short term", trustZh: "短期内信任排序器", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "Bridge", msgEn: "Posted to L1; 7-day window", msgZh: "上链到 L1；7 天争议窗口", trustEn: "1-of-N watchers must be honest", trustZh: "需 1-of-N 观察者诚实", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "User", msgEn: "Final after window closes", msgZh: "窗口结束后最终", trustEn: "Math + 1 honest watcher", trustZh: "数学 + 1 个诚实观察者", trustLevel: "minimized" },
    ],
    zk: [
      { fromActor: "User", toActor: "L1", msgEn: "Lock funds on L1", msgZh: "在 L1 锁定资金", trustEn: "L1 contract trustless", trustZh: "L1 合约无需信任", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "Bridge", msgEn: "Prover network produces validity proof", msgZh: "证明者网络生成有效性证明", trustEn: "Provers are trustless (only liveness)", trustZh: "证明者无需信任（仅活性）", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "L1", msgEn: "Submit ZK proof to L1 verifier", msgZh: "向 L1 验证器提交 ZK 证明", trustEn: "Verifier circuit + trusted setup", trustZh: "验证电路 + 可信设置", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "User", msgEn: "Mint on L2 / credit user", msgZh: "在 L2 铸出 / 给用户记账", trustEn: "Math holds; final immediately", trustZh: "数学成立；即刻最终", trustLevel: "trustless" },
    ],
    psy: [
      { fromActor: "User", toActor: "L1", msgEn: "Lock USDT on L1 vault", msgZh: "在 L1 资金池锁定 USDT", trustEn: "L1 contract trustless", trustZh: "L1 合约无需信任", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "Bots", msgEn: "Relayer observes deposit", msgZh: "中继者观察到充值", trustEn: "Relayer for liveness only", trustZh: "中继者仅为活性", trustLevel: "minimized" },
      { fromActor: "Bots", toActor: "Psy", msgEn: "Psy mints USDT_P after Plonky2 proof", msgZh: "经 Plonky2 证明后 Psy 铸出 USDT_P", trustEn: "Trust circuit soundness, not relayers", trustZh: "信任电路可靠性，不是中继者", trustLevel: "trustless" },
      { fromActor: "Psy", toActor: "User", msgEn: "User holds USDT_P on Psy", msgZh: "用户在 Psy 上持有 USDT_P", trustEn: "ZK-final; force-claim if relayer fails", trustZh: "ZK 最终；中继失败可强制领取", trustLevel: "trustless" },
    ],
  },
  transfer: {
    multisig: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Sign transfer", msgZh: "签名转账", trustEn: "Self-custody on chain", trustZh: "链上自托管", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "Bridge", msgEn: "Wrapped token contract executes", msgZh: "wrapped 代币合约执行", trustEn: "Trust wrapper not pausable by signers", trustZh: "信任 wrapper 不被签名者暂停", trustLevel: "required" },
      { fromActor: "Bridge", toActor: "User", msgEn: "Recipient receives", msgZh: "接收方到账", trustEn: "Standard ERC-20 mechanics", trustZh: "标准 ERC-20 机制", trustLevel: "trustless" },
    ],
    validator: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Sign transfer on bridged chain", msgZh: "在桥上链签名转账", trustEn: "Self-custody", trustZh: "自托管", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "Bridge", msgEn: "Validator chain processes", msgZh: "验证者链处理", trustEn: "Quorum is liveness", trustZh: "法定多数即活性", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "User", msgEn: "Recipient receives", msgZh: "接收方到账", trustEn: "Final after quorum signs", trustZh: "法定多数签署后最终", trustLevel: "minimized" },
    ],
    optimistic: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Sign L2 transfer", msgZh: "在 L2 签名转账", trustEn: "Sequencer can censor briefly", trustZh: "排序器可短暂审查", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "Bridge", msgEn: "Sequencer batches", msgZh: "排序器打包", trustEn: "L1 force-include possible", trustZh: "可通过 L1 强制收录", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "User", msgEn: "Recipient sees on L2", msgZh: "接收方在 L2 看到", trustEn: "Soft finality on L2; hard on L1 after window", trustZh: "L2 软最终性；窗口后 L1 硬最终", trustLevel: "minimized" },
    ],
    zk: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Sign L2 transfer", msgZh: "在 L2 签名转账", trustEn: "Self-custody on L2", trustZh: "L2 自托管", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "Bridge", msgEn: "Prover proves batch", msgZh: "证明者为批次出证明", trustEn: "Math, not validators", trustZh: "数学，不是验证者", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "User", msgEn: "Final on next L1 verification", msgZh: "下一次 L1 验证后最终", trustEn: "Verifier accepts; final", trustZh: "验证器接受即最终", trustLevel: "trustless" },
    ],
    psy: [
      { fromActor: "User", toActor: "Psy", msgEn: "Sign tx on Psy realm", msgZh: "在 Psy realm 上签名交易", trustEn: "Self-custody on Psy", trustZh: "Psy 上自托管", trustLevel: "trustless" },
      { fromActor: "Psy", toActor: "Psy", msgEn: "Realm executes; produces Plonky2 proof", msgZh: "Realm 执行；产出 Plonky2 证明", trustEn: "Circuit soundness", trustZh: "电路可靠性", trustLevel: "trustless" },
      { fromActor: "Psy", toActor: "User", msgEn: "Recipient sees in same checkpoint", msgZh: "同一 checkpoint 内接收方可见", trustEn: "Final once aggregated", trustZh: "聚合后即最终", trustLevel: "trustless" },
    ],
  },
  claim: {
    multisig: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Request claim", msgZh: "发起领取请求", trustEn: "Off-chain request", trustZh: "链下请求", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "Bots", msgEn: "Signers approve M-of-N", msgZh: "签名者 M-of-N 批准", trustEn: "Trust at most N−M malicious", trustZh: "信任最多 N−M 个恶意", trustLevel: "required" },
      { fromActor: "Bots", toActor: "User", msgEn: "Funds released", msgZh: "释放资金", trustEn: "Trust signers did not steal", trustZh: "信任签名者没偷", trustLevel: "required" },
    ],
    validator: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Submit claim on bridged chain", msgZh: "在桥上链提交领取", trustEn: "Self-custody on bridged side", trustZh: "桥另一侧自托管", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "Bots", msgEn: "Validator quorum signs", msgZh: "验证者法定多数签署", trustEn: "Trust 2/3 honest", trustZh: "信任 2/3 诚实", trustLevel: "required" },
      { fromActor: "Bots", toActor: "User", msgEn: "L1 releases", msgZh: "L1 释放", trustEn: "Trust validators did not collude", trustZh: "信任验证者未串通", trustLevel: "required" },
    ],
    optimistic: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Initiate withdrawal", msgZh: "发起提取", trustEn: "Posted to L1", trustZh: "已上链 L1", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "Bridge", msgEn: "7-day challenge window", msgZh: "7 天争议窗口", trustEn: "1-of-N honest watcher needed", trustZh: "需 1-of-N 观察者诚实", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "User", msgEn: "Funds released after window", msgZh: "窗口结束后释放资金", trustEn: "Math + 1 honest party", trustZh: "数学 + 1 方诚实", trustLevel: "minimized" },
    ],
    zk: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Submit ZK proof", msgZh: "提交 ZK 证明", trustEn: "Math, not parties", trustZh: "数学，不是某些方", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "L1", msgEn: "Verifier accepts", msgZh: "验证器接受", trustEn: "Circuit soundness", trustZh: "电路可靠性", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "User", msgEn: "Funds released; final", msgZh: "释放资金；最终", trustEn: "Cryptographically final", trustZh: "密码学最终", trustLevel: "trustless" },
    ],
    psy: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Initiate claim with Plonky2 proof", msgZh: "用 Plonky2 证明发起领取", trustEn: "User-side proving possible", trustZh: "用户侧可生成证明", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "L1", msgEn: "Groth16 wrapper verified on L1", msgZh: "Groth16 包装在 L1 被验证", trustEn: "Trustless verification", trustZh: "无需信任的验证", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "User", msgEn: "Funds released to user", msgZh: "向用户释放资金", trustEn: "Final the moment proof is verified", trustZh: "证明被验证的瞬间即最终", trustLevel: "trustless" },
    ],
  },
  withdraw: {
    multisig: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Request L1 withdrawal", msgZh: "请求 L1 提款", trustEn: "Off-chain", trustZh: "链下", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "Bots", msgEn: "Signers must approve", msgZh: "需签名者批准", trustEn: "Trust signers", trustZh: "信任签名者", trustLevel: "required" },
      { fromActor: "Bots", toActor: "L1", msgEn: "L1 vault releases", msgZh: "L1 资金池释放", trustEn: "Whoever holds keys can withdraw", trustZh: "持密钥者即可提款", trustLevel: "required" },
      { fromActor: "L1", toActor: "User", msgEn: "Funds in user wallet", msgZh: "资金到达用户钱包", trustEn: "—", trustZh: "—", trustLevel: "trustless" },
    ],
    validator: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Submit on bridged chain", msgZh: "在桥上链提交", trustEn: "Self-custody", trustZh: "自托管", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "Bots", msgEn: "Validator quorum signs", msgZh: "验证者法定多数签署", trustEn: "Trust 2/3 honest", trustZh: "信任 2/3 诚实", trustLevel: "required" },
      { fromActor: "Bots", toActor: "L1", msgEn: "L1 verifier accepts quorum signature", msgZh: "L1 验证器接受法定多数签名", trustEn: "Validators have not colluded", trustZh: "验证者未串通", trustLevel: "required" },
      { fromActor: "L1", toActor: "User", msgEn: "Funds in user wallet", msgZh: "资金到达用户钱包", trustEn: "—", trustZh: "—", trustLevel: "trustless" },
    ],
    optimistic: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Submit withdrawal on L2", msgZh: "在 L2 提交提款", trustEn: "Sequencer mediates", trustZh: "排序器中介", trustLevel: "minimized" },
      { fromActor: "Bridge", toActor: "L1", msgEn: "Posted to L1", msgZh: "上链到 L1", trustEn: "L1 storage", trustZh: "L1 存储", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "L1", msgEn: "7-day window", msgZh: "7 天窗口", trustEn: "1-of-N honest watcher", trustZh: "1-of-N 诚实观察者", trustLevel: "minimized" },
      { fromActor: "L1", toActor: "User", msgEn: "Funds released after window", msgZh: "窗口结束后释放", trustEn: "Math + watchers", trustZh: "数学 + 观察者", trustLevel: "minimized" },
    ],
    zk: [
      { fromActor: "User", toActor: "Bridge", msgEn: "Submit on L2", msgZh: "在 L2 提交", trustEn: "Self-custody", trustZh: "自托管", trustLevel: "trustless" },
      { fromActor: "Bridge", toActor: "L1", msgEn: "Validity proof posted", msgZh: "提交有效性证明", trustEn: "Math", trustZh: "数学", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "L1", msgEn: "Verifier accepts; immediate finality", msgZh: "验证器接受；立即最终", trustEn: "Circuit soundness", trustZh: "电路可靠性", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "User", msgEn: "Funds in user wallet", msgZh: "资金到达用户钱包", trustEn: "—", trustZh: "—", trustLevel: "trustless" },
    ],
    psy: [
      { fromActor: "User", toActor: "Psy", msgEn: "Burn USDT_P on Psy", msgZh: "在 Psy 上销毁 USDT_P", trustEn: "Self-custody on Psy", trustZh: "Psy 自托管", trustLevel: "trustless" },
      { fromActor: "Psy", toActor: "Bots", msgEn: "Plonky2 proof aggregated to checkpoint", msgZh: "Plonky2 证明聚合进 checkpoint", trustEn: "Worker network (liveness only)", trustZh: "Worker 网络（仅活性）", trustLevel: "minimized" },
      { fromActor: "Bots", toActor: "L1", msgEn: "Groth16 wrapper verified on L1", msgZh: "Groth16 包装在 L1 上被验证", trustEn: "Trustless. ~285k gas.", trustZh: "无需信任。约 28.5 万 gas。", trustLevel: "trustless" },
      { fromActor: "L1", toActor: "User", msgEn: "L1 vault releases USDT", msgZh: "L1 资金池释放 USDT", trustEn: "Final at proof acceptance", trustZh: "证明被接受的瞬间即最终", trustLevel: "trustless" },
    ],
  },
};

const FLOW_KEYS: { k: FlowKey; tk: any }[] = [
  { k: "deposit", tk: "flowDeposit" },
  { k: "transfer", tk: "flowTransfer" },
  { k: "claim", tk: "flowClaim" },
  { k: "withdraw", tk: "flowWithdraw" },
];

const ARCH_KEYS: { k: ArchKey; tk: any; psy?: boolean }[] = [
  { k: "multisig", tk: "archMultisig" },
  { k: "validator", tk: "archValidator" },
  { k: "optimistic", tk: "archOptimistic" },
  { k: "zk", tk: "archZK" },
  { k: "psy", tk: "archPsy", psy: true },
];

export default function SimulatePage() {
  const { tr, lang } = useM();
  const [flow, setFlow] = useState<FlowKey>("withdraw");
  const [arch, setArch] = useState<ArchKey>("multisig");
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  const steps = FLOWS[flow][arch];
  const lastIdx = steps.length;

  // Auto-advance when running
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStepIdx((i) => {
        if (i >= lastIdx) {
          setRunning(false);
          return i;
        }
        return i + 1;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [running, lastIdx]);

  // Reset when flow/arch changes
  useEffect(() => {
    setStepIdx(0);
    setRunning(false);
  }, [flow, arch]);

  const reset = () => {
    setStepIdx(0);
    setRunning(false);
  };

  const currentStep = stepIdx > 0 && stepIdx <= steps.length ? steps[stepIdx - 1] : null;

  return (
    <main className="container-cm py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("simEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("simTitle")}</h1>
        <p className="lede max-w-2xl">{tr("simSubtitle")}</p>
      </header>

      {/* Controls */}
      <div className="card mb-6">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <div className="eyebrow mb-2">{tr("simFlow")}</div>
            <div className="flex flex-wrap gap-2">
              {FLOW_KEYS.map((f) => (
                <button
                  key={f.k}
                  onClick={() => setFlow(f.k)}
                  className={`pill ${flow === f.k ? "active" : ""}`}
                >
                  {tr(f.tk)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow mb-2">{tr("simArch")}</div>
            <div className="flex flex-wrap gap-2">
              {ARCH_KEYS.map((a) => (
                <button
                  key={a.k}
                  onClick={() => setArch(a.k)}
                  className={`pill ${arch === a.k ? "active" : ""} ${
                    a.psy ? "border-psy/40 hover:border-psy hover:text-psy" : ""
                  }`}
                  style={a.psy && arch === a.k ? { borderColor: "#A78BFA", color: "#A78BFA", background: "rgba(167,139,250,0.1)" } : undefined}
                >
                  {tr(a.tk)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2">
            {running ? (
              <button onClick={() => setRunning(false)} className="btn-primary">
                {tr("simPause")}
              </button>
            ) : (
              <button onClick={() => setRunning(true)} className="btn-primary">
                {tr("simPlay")}
              </button>
            )}
            <button onClick={() => setStepIdx((i) => Math.min(i + 1, lastIdx))} className="btn-ghost">
              {tr("simStep")}
            </button>
            <button onClick={reset} className="btn-ghost">
              {tr("simReset")}
            </button>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card !p-6">
          <FlowDiagram steps={steps} stepIdx={stepIdx} arch={arch} />
        </div>

        <aside className="card sticky top-20 self-start">
          <div className="eyebrow mb-3">step {stepIdx} / {steps.length}</div>
          {currentStep ? (
            <>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-bone">
                {currentStep.fromActor} → {currentStep.toActor}
              </div>
              <h3 className="display-3 mt-2 mb-5 text-paper">{lang === "zh" ? currentStep.msgZh : currentStep.msgEn}</h3>
              <div className="hairline mb-4" />
              <div className="eyebrow mb-2">{tr("simTrustNow")}</div>
              <div
                className={`rounded-sm px-3 py-2 text-sm ${
                  currentStep.trustLevel === "trustless"
                    ? "cell-trustless"
                    : currentStep.trustLevel === "minimized"
                    ? "cell-trust-minimized"
                    : "cell-trust-required"
                }`}
              >
                {lang === "zh" ? currentStep.trustZh : currentStep.trustEn}
              </div>
            </>
          ) : (
            <p className="prose-body">
              {lang === "en"
                ? "Press Play to walk the flow. Each step labels the trust assumption being invoked at that moment."
                : "按播放以走完整个流程。每一步都会标注此刻被调用的信任假设。"}
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}

function FlowDiagram({ steps, stepIdx, arch }: { steps: Step[]; stepIdx: number; arch: ArchKey }) {
  const W = 760, H = 360;
  const PAD = 60;
  // Position actors on a horizontal line
  const actors = ACTORS;
  const xOf = (a: string) => {
    const i = actors.indexOf(a);
    return PAD + (i / (actors.length - 1)) * (W - 2 * PAD);
  };
  const yMid = H / 2;

  const accent = arch === "psy" ? "#A78BFA" : "#5C9BFF";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" style={{ maxHeight: 380 }}>
      {/* horizontal axis */}
      <line x1={PAD - 20} y1={yMid} x2={W - PAD + 20} y2={yMid} stroke="#252938" strokeWidth="1" />

      {/* Actor nodes */}
      {actors.map((a) => (
        <g key={a}>
          <circle cx={xOf(a)} cy={yMid} r="18" fill="#10121C" stroke={accent} strokeWidth="1.5" />
          <text x={xOf(a)} y={yMid + 4} fontSize="11" fill="#E5E7EE" textAnchor="middle" fontFamily="ui-monospace">
            {a}
          </text>
          <text x={xOf(a)} y={yMid + 40} fontSize="10" fill="#6E7187" textAnchor="middle" fontFamily="ui-monospace">
            {a === "Bridge" ? "off-chain" : a === "Bots" ? "off-chain" : a === "User" ? "client" : a === "L1" ? "Ethereum" : "Psy chain"}
          </text>
        </g>
      ))}

      {/* Step arcs */}
      {steps.map((s, i) => {
        const active = i < stepIdx;
        const current = i === stepIdx - 1;
        const x1 = xOf(s.fromActor);
        const x2 = xOf(s.toActor);
        const dir = x2 > x1 ? 1 : x2 < x1 ? -1 : 0;
        const yOffset = -50 - i * 10;
        const cx = (x1 + x2) / 2;
        const cy = yMid + yOffset;
        const path = dir === 0
          ? `M ${x1} ${yMid - 18} q ${30} ${yOffset} 0 ${-Math.abs(yOffset)*2/3} q ${-30} 0 0 ${Math.abs(yOffset)*2/3}`
          : `M ${x1 + dir * 18} ${yMid} Q ${cx} ${cy} ${x2 - dir * 18} ${yMid}`;
        const color = !active ? "#252938" : current ? accent : (s.trustLevel === "trustless" ? "#10B981" : s.trustLevel === "minimized" ? "#5C9BFF" : "#EF4444");
        return (
          <g key={i}>
            <path d={path} fill="none" stroke={color} strokeWidth={current ? 2 : active ? 1.5 : 1} opacity={active ? 1 : 0.5} />
            {active && (
              <text
                x={cx}
                y={cy - 4}
                fontSize="10"
                fill={color}
                textAnchor="middle"
                fontFamily="ui-monospace"
                style={{ paintOrder: "stroke", stroke: "#08090F", strokeWidth: 4 }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
