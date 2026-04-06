import Link from "next/link";

const BG = "#1e1e1e";
const SH1 = "#111";
const SH2 = "#2b2b2b";
const RAISED = `5px 5px 14px ${SH1}, -4px -4px 10px ${SH2}`;
const INSET = `inset 5px 5px 12px ${SH1}, inset -4px -4px 10px ${SH2}`;

/* ─── 共通コンポーネント ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace", marginBottom: 6 }}>
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ boxShadow: RAISED, borderRadius: 16, padding: "28px 24px", ...style }}>
      {children}
    </div>
  );
}

function StatBig({ value, unit, label, sub }: { value: string; unit?: string; label: string; sub?: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ lineHeight: 1 }}>
        <span style={{ color: "#ff1a2e", fontSize: 42, fontWeight: 900 }}>{value}</span>
        {unit && <span style={{ color: "#cc3344", fontSize: 18, fontWeight: 700, marginLeft: 4 }}>{unit}</span>}
      </div>
      <div style={{ color: "#e8e8e8", fontSize: 13, fontWeight: 700, marginTop: 8 }}>{label}</div>
      {sub && <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Bar({ pct, label, value, delay = 0 }: { pct: number; label: string; value: string; delay?: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#bbb", fontSize: 12 }}>{label}</span>
        <span style={{ color: "#ff1a2e", fontWeight: 900, fontSize: 13 }}>{value}</span>
      </div>
      <div style={{ boxShadow: `inset 2px 2px 5px ${SH1}`, borderRadius: 4, height: 7, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #4a0010, #aa1122, #ff1a2e)",
          borderRadius: 4,
          transformOrigin: "left center",
          animation: `barFill 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms both`,
        }} />
      </div>
    </div>
  );
}

function Badge({ children, color = "#ff1a2e" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: `${color}22`,
      border: `1px solid ${color}55`,
      borderRadius: 4,
      padding: "2px 8px",
      color,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.05em",
    }}>
      {children}
    </span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" }} />;
}

function SectionTitle({ label, title, accent }: { label: string; title: string; accent: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <SectionLabel>{label}</SectionLabel>
      <h2 style={{ color: "#e8e8e8", fontSize: 26, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>
        <span style={{ color: "#ff1a2e" }}>{accent}</span>{title}
      </h2>
      <div style={{ height: 2, width: 48, background: "#ff1a2e", marginTop: 10, boxShadow: "0 0 8px #ff1a2e88" }} />
    </div>
  );
}

/* ─── ページ本体 ─── */
export default function HazardPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e8e8e8" }}>

      {/* ヘッダー */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.25em", fontFamily: "monospace", marginBottom: 4 }}>DISASTER RISK ANALYSIS</div>
            <div style={{ color: "#e8e8e8", fontSize: 18, fontWeight: 900 }}>災害リスク診断 <span style={{ color: "#444", fontSize: 13, fontWeight: 400 }}>& 備蓄提案</span></div>
            <div style={{ height: 2, width: 32, background: "#ff1a2e", marginTop: 6, boxShadow: "0 0 8px #ff1a2e88" }} />
          </div>
          <Link href="/" style={{
            background: "linear-gradient(135deg, #7a0015, #cc1525, #ff1a2e)",
            color: "#fff", fontWeight: 700, fontSize: 13,
            padding: "10px 20px", borderRadius: 10, textDecoration: "none",
            boxShadow: "0 4px 16px rgba(255,26,46,0.35)",
          }}>
            今すぐ診断する →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 60 }}>

        {/* ─── HERO ─── */}
        <section style={{ textAlign: "center" }}>
          <SectionLabel>HAZARD INTELLIGENCE REPORT — 2025</SectionLabel>
          <h1 style={{ color: "#e8e8e8", fontSize: 36, fontWeight: 900, lineHeight: 1.25, margin: "12px 0 20px" }}>
            日本を襲う<span style={{ color: "#ff1a2e" }}>3つの巨大災害</span><br />その現実を知っているか
          </h1>
          <p style={{ color: "#bbb", fontSize: 15, lineHeight: 1.9, maxWidth: 560, margin: "0 auto 32px" }}>
            南海トラフ地震・巨大津波・富士山噴火。<br />
            3つの脅威はすでに「いつ起きてもおかしくない」段階にある。<br />
            内閣府・気象庁の最新データで、その実態を直視する。
          </p>
          {/* 3大数字 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {[
              { v: "80%", l: "30年以内の発生確率", s: "南海トラフ地震（地震調査研究推進本部）" },
              { v: "29.8万人", l: "最大死者・行方不明者数", s: "内閣府 2025年3月公表" },
              { v: "292兆円", l: "経済損失推計", s: "直接・間接被害の合計" },
            ].map(({ v, l, s }) => (
              <div key={v} style={{ boxShadow: INSET, borderRadius: 12, padding: "20px 12px" }}>
                <div style={{ color: "#ff1a2e", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{v}</div>
                <div style={{ color: "#e8e8e8", fontSize: 12, fontWeight: 700, marginTop: 8 }}>{l}</div>
                <div style={{ color: "#555", fontSize: 10, marginTop: 4, lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 南海トラフ地震 ─── */}
        <section>
          <SectionTitle label="01 — NANKAI TROUGH EARTHQUAKE" title="南海トラフ地震" accent="⚠ " />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* 基本データ */}
            <Card>
              <SectionLabel>WHAT IS IT</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>南海トラフとは何か</h3>
              <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.8, margin: "0 0 20px" }}>
                駿河湾から九州沖にかけて延びる、全長約700kmの海底地形。
                フィリピン海プレートがユーラシアプレートの下に沈み込む境界で、
                プレート間に蓄積されたひずみが限界に達したとき、M8〜9クラスの超巨大地震が発生する。
                過去1,400年の記録では平均<strong style={{ color: "#e8e8e8" }}>90〜150年おきに繰り返し</strong>発生してきた。
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", marginBottom: 8 }}>MAGNITUDE</div>
                  <div style={{ color: "#ff1a2e", fontSize: 32, fontWeight: 900 }}>M8〜9<span style={{ fontSize: 14, color: "#cc3344" }}>クラス</span></div>
                  <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>最大震度7（静岡〜宮崎）</div>
                </div>
                <div>
                  <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", marginBottom: 8 }}>PROBABILITY</div>
                  <div style={{ color: "#ff1a2e", fontSize: 32, fontWeight: 900 }}>80%<span style={{ fontSize: 14, color: "#cc3344" }}>以上</span></div>
                  <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>今後30年以内（50年以内は90%超）</div>
                </div>
              </div>
            </Card>

            {/* 発生間隔タイムライン */}
            <Card>
              <SectionLabel>HISTORICAL TIMELINE</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>過去1,400年の発生記録</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { year: "684年", name: "白鳳地震", m: "M8.3", interval: null },
                  { year: "887年", name: "仁和地震", m: "M8.3", interval: "203年後" },
                  { year: "1099年", name: "永長・康和地震", m: "M8.0〜8.5", interval: "212年後" },
                  { year: "1361年", name: "正平地震", m: "M8.0〜8.5", interval: "262年後" },
                  { year: "1498年", name: "明応地震", m: "M8.2〜8.4", interval: "137年後" },
                  { year: "1707年", name: "宝永地震", m: "M8.6", interval: "209年後", highlight: true },
                  { year: "1854年", name: "安政地震", m: "M8.4", interval: "147年後" },
                  { year: "1944〜46年", name: "昭和東南海・南海地震", m: "M7.9〜8.0", interval: "90年後" },
                  { year: "2025年〜？", name: "次回発生", m: "M8〜9クラス", interval: "約80年経過", danger: true },
                ].map(({ year, name, m, interval, highlight, danger }) => (
                  <div key={year} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: danger ? "rgba(255,26,46,0.05)" : highlight ? "rgba(255,26,46,0.03)" : "transparent",
                    borderRadius: danger ? 8 : 0,
                    paddingLeft: danger ? 12 : 0,
                    paddingRight: danger ? 12 : 0,
                  }}>
                    <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: "50%", background: danger ? "#ff1a2e" : highlight ? "#cc2233" : "#333", boxShadow: danger ? "0 0 8px #ff1a2e" : "none" }} />
                    <div style={{ minWidth: 100, color: danger ? "#ff6677" : "#888", fontSize: 12, fontFamily: "monospace" }}>{year}</div>
                    <div style={{ flex: 1, color: danger ? "#e8e8e8" : "#ccc", fontSize: 13, fontWeight: danger ? 700 : 400 }}>{name}</div>
                    <div style={{ color: danger ? "#ff1a2e" : "#555", fontSize: 11, fontFamily: "monospace" }}>{m}</div>
                    {interval && <Badge color={danger ? "#ff1a2e" : "#444"}>{interval}</Badge>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,26,46,0.07)", borderLeft: "3px solid #ff1a2e", borderRadius: "0 8px 8px 0" }}>
                <div style={{ color: "#ff6677", fontSize: 12, fontWeight: 700 }}>⚠ 前回（1944〜46年）から既に約80年が経過。通常の発生間隔（90〜150年）に迫っている。</div>
              </div>
            </Card>

            {/* 被害想定 */}
            <Card>
              <SectionLabel>DAMAGE ESTIMATE — 内閣府 2025年3月公表（最新）</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 24px" }}>被害想定（最大ケース）</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 24 }}>
                <StatBig value="29.8万" unit="人" label="死者・行方不明者" sub="うち津波死 21.5万人" />
                <StatBig value="235万" unit="棟" label="全壊・焼失建物" sub="揺れ・津波・火災" />
                <StatBig value="1,230万" unit="人" label="避難者数（1週間後）" sub="前回想定比 +30%" />
                <StatBig value="292兆" unit="円" label="経済損失" sub="直接224兆＋間接68兆" />
              </div>
              <Divider />
              <div style={{ marginTop: 16 }}>
                <Bar pct={92} label="津波による建物全壊" value="18.8万棟" delay={0} />
                <Bar pct={78} label="揺れによる全壊" value="127.9万棟" delay={100} />
                <Bar pct={47} label="火災による焼失" value="76.7万棟" delay={200} />
                <Bar pct={20} label="液状化による全壊" value="11万棟" delay={300} />
              </div>
            </Card>
          </div>
        </section>

        {/* ─── 津波 ─── */}
        <section>
          <SectionTitle label="02 — TSUNAMI" title="巨大津波" accent="🌊 " />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card>
              <SectionLabel>WAVE HEIGHT BY REGION</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>地域別・最大津波高予測</h3>
              <p style={{ color: "#888", fontSize: 12, marginBottom: 20 }}>南海トラフ地震発生時の沿岸部最大波高（気象庁・内閣府想定）</p>
              <Bar pct={100} label="高知県黒潮町・土佐清水市" value="34.4m ★日本最大" delay={0} />
              <Bar pct={90} label="静岡県沿岸部" value="最大 31m" delay={80} />
              <Bar pct={87} label="和歌山県串本町" value="最大 30m" delay={160} />
              <Bar pct={72} label="三重県・愛知県沿岸" value="最大 20〜30m" delay={240} />
              <Bar pct={40} label="関東〜九州（太平洋側広域）" value="10m超（大半の地域）" delay={320} />
              <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,26,46,0.07)", borderLeft: "3px solid #ff1a2e", borderRadius: "0 8px 8px 0" }}>
                <div style={{ color: "#ff6677", fontSize: 12, fontWeight: 700 }}>東日本大震災の最大遡上高は岩手県で16.7m。南海トラフ津波はその2倍超に達する地域がある。</div>
              </div>
            </Card>

            {/* 到達時間 */}
            <Card>
              <SectionLabel>ARRIVAL TIME — 命を左右する時間</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>津波到達時間</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { region: "高知県沿岸（最速）", time: "3分", note: "1m津波が到達。逃げる猶予はほぼゼロ", critical: true },
                  { region: "和歌山県沿岸", time: "3〜5分", note: "14分後には10m超の波が到達", critical: true },
                  { region: "三重県・静岡県沿岸（一部）", time: "最短2分", note: "震源に近い地点では最速クラス", critical: true },
                  { region: "静岡県下田市", time: "13〜17分", note: "13分で1m、17分で20mの波が到達" },
                  { region: "神奈川県・東京湾奥", time: "40分〜", note: "相対的に到達は遅いが沿岸部は警戒が必要" },
                ].map(({ region, time, note, critical }) => (
                  <div key={region} style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "12px 14px",
                    boxShadow: critical ? `inset 3px 3px 7px ${SH1}, inset -2px -2px 5px ${SH2}` : `3px 3px 8px ${SH1}, -2px -2px 6px ${SH2}`,
                    borderRadius: 10,
                    borderLeft: critical ? "3px solid #ff1a2e" : "none",
                  }}>
                    <div style={{ flexShrink: 0, minWidth: 60, color: "#ff1a2e", fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{time}</div>
                    <div>
                      <div style={{ color: "#e8e8e8", fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{region}</div>
                      <div style={{ color: "#888", fontSize: 11 }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "16px", background: "rgba(255,26,46,0.1)", border: "1px solid rgba(255,26,46,0.3)", borderRadius: 10, textAlign: "center" }}>
                <div style={{ color: "#ff1a2e", fontSize: 14, fontWeight: 900, marginBottom: 6 }}>「揺れを感じたら、揺れが止まる前に逃げる」</div>
                <div style={{ color: "#aaa", fontSize: 12 }}>沿岸部では警報を待っている時間はない。揺れ＝即時避難が唯一の対策。</div>
              </div>
            </Card>

            {/* 東日本大震災との比較 */}
            <Card>
              <SectionLabel>COMPARISON — 東日本大震災との比較</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>南海トラフ津波はどれほど大きいか</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  {
                    title: "東日本大震災（2011年）",
                    items: [
                      ["マグニチュード", "M9.0"],
                      ["最大遡上高", "16.7m（岩手県）"],
                      ["浸水面積（30cm以上）", "約561km²"],
                      ["津波による死者", "約15,000人"],
                    ],
                    dim: true,
                  },
                  {
                    title: "南海トラフ想定（最大）",
                    items: [
                      ["マグニチュード", "M8〜9クラス"],
                      ["最大波高", "34.4m（高知県）"],
                      ["浸水面積（30cm以上）", "約1,152km²（2.1倍）"],
                      ["津波による死者", "最大21.5万人（14倍）"],
                    ],
                    dim: false,
                  },
                ].map(({ title, items, dim }) => (
                  <div key={title} style={{ boxShadow: dim ? INSET : RAISED, borderRadius: 12, padding: "16px 14px" }}>
                    <div style={{ color: dim ? "#666" : "#ff1a2e", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>{title}</div>
                    {items.map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
                        <span style={{ color: "#666", fontSize: 11 }}>{k}</span>
                        <span style={{ color: dim ? "#777" : "#e8e8e8", fontSize: 12, fontWeight: dim ? 400 : 700, textAlign: "right" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ─── 富士山噴火 ─── */}
        <section>
          <SectionTitle label="03 — MT. FUJI ERUPTION" title="富士山噴火" accent="🌋 " />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card>
              <SectionLabel>BACKGROUND</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>318年間沈黙する活火山</h3>
              <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.8, margin: "0 0 20px" }}>
                富士山の前回噴火は<strong style={{ color: "#e8e8e8" }}>1707年（宝永噴火）</strong>。
                以来318年にわたり噴火はないが、気象庁は24時間365日常時監視を続けている。
                2021年改定のハザードマップでは想定噴出量が<strong style={{ color: "#ff1a2e" }}>約2倍の13億m³</strong>に拡大。
                噴火口の想定数も<strong style={{ color: "#ff1a2e" }}>44か所から252か所</strong>へと大幅に増えた。
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
                {[
                  { v: "318年", l: "前回噴火からの経過年", s: "1707年 宝永噴火以来" },
                  { v: "13億m³", l: "最大噴出溶岩量", s: "旧想定の約2倍（2021年改定）" },
                  { v: "252か所", l: "想定噴火口数", s: "旧想定44か所→252か所" },
                  { v: "27自治体", l: "溶岩流到達エリア", s: "旧想定から12自治体追加" },
                ].map(({ v, l, s }) => (
                  <div key={v} style={{ boxShadow: INSET, borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                    <div style={{ color: "#ff1a2e", fontSize: 20, fontWeight: 900 }}>{v}</div>
                    <div style={{ color: "#ccc", fontSize: 11, fontWeight: 700, marginTop: 6 }}>{l}</div>
                    <div style={{ color: "#555", fontSize: 10, marginTop: 4 }}>{s}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 溶岩流 */}
            <Card>
              <SectionLabel>LAVA FLOW</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>溶岩流の到達シナリオ</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {[
                  { time: "約2時間", place: "御殿場市周辺（約15km）", note: "時速1〜2kmで流下" },
                  { time: "約24時間", place: "神奈川県相模原市付近（約60km）", note: "最大到達距離" },
                  { time: "発生直後", place: "避難対象 79.2万人", note: "要避難人口（推計）" },
                ].map(({ time, place, note }) => (
                  <div key={time} style={{ display: "flex", gap: 14, padding: "12px 14px", boxShadow: `3px 3px 8px ${SH1}, -2px -2px 6px ${SH2}`, borderRadius: 10 }}>
                    <div style={{ color: "#ff1a2e", fontSize: 14, fontWeight: 900, minWidth: 80, flexShrink: 0 }}>{time}</div>
                    <div>
                      <div style={{ color: "#e8e8e8", fontSize: 13, fontWeight: 700 }}>{place}</div>
                      <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 降灰マップ */}
            <Card>
              <SectionLabel>ASH FALL — 首都圏への降灰予測</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>火山灰が首都圏を覆う</h3>
              <p style={{ color: "#888", fontSize: 12, marginBottom: 20 }}>偏西風の影響で、噴火から数時間後に東京方面へ火山灰が到達（内閣府ハザードマップ）</p>
              <Bar pct={100} label="神奈川県相模原付近（約60km）— 噴火2日後" value="約20cm" delay={0} />
              <Bar pct={60} label="東京都新宿区付近（約100km）— 噴火2日後" value="約5cm以上" delay={100} />
              <Bar pct={30} label="東京都新宿区（15日間累計）" value="約10cm" delay={200} />
              <div style={{ marginTop: 20 }}>
                <div style={{ color: "#888", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>INFRASTRUCTURE IMPACT THRESHOLDS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { threshold: "微量〜", label: "鉄道運行停止", color: "#ff1a2e" },
                    { threshold: "0.3cm〜", label: "電力設備絶縁低下・停電リスク（湿潤時）", color: "#cc2233" },
                    { threshold: "3cm〜", label: "自動車走行不能（降雨時）", color: "#aa1122" },
                    { threshold: "10cm〜", label: "自動車走行不能（乾燥時）", color: "#881122" },
                    { threshold: "30cm〜", label: "木造家屋に倒壊リスク（降雨時）／内閣府の屋内避難基準", color: "#660011" },
                  ].map(({ threshold, label, color }) => (
                    <div key={threshold} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "rgba(255,26,46,0.04)", borderRadius: 6 }}>
                      <span style={{ color, fontSize: 12, fontFamily: "monospace", fontWeight: 700, minWidth: 52, flexShrink: 0 }}>{threshold}</span>
                      <span style={{ color: "#aaa", fontSize: 12 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,26,46,0.07)", borderLeft: "3px solid #ff1a2e", borderRadius: "0 8px 8px 0" }}>
                <div style={{ color: "#ff6677", fontSize: 12, fontWeight: 700 }}>最悪ケースでは7都県で鉄道・自動車が同時に機能停止。停電・断水と複合して首都機能が麻痺する。</div>
              </div>
            </Card>

            {/* 宝永噴火との比較 */}
            <Card>
              <SectionLabel>1707 HOEI ERUPTION — 過去最大噴火との比較</SectionLabel>
              <h3 style={{ color: "#e8e8e8", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>宝永噴火（1707年）が残した教訓</h3>
              <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
                宝永噴火は噴火規模VEI5、噴煙高度15〜20km、継続期間約16日間。
                江戸（現・東京）には<strong style={{ color: "#e8e8e8" }}>当日から大量の火山灰</strong>が降り積もり、
                房総半島にまで被害が及んだ。農地被壊による餓死者が多数出た記録が残る。
                新ハザードマップは宝永噴火より大規模な<strong style={{ color: "#ff1a2e" }}>864年貞観噴火</strong>をモデルとしている。
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { title: "1707年 宝永噴火", items: [["噴火規模", "VEI 5"], ["噴煙高度", "15〜20km"], ["継続期間", "約16日間"], ["総噴出量", "火山灰1.7km³"], ["江戸への影響", "当日から大量降灰"]], dim: true },
                  { title: "次回噴火の想定", items: [["参考モデル", "864年貞観噴火（より大規模）"], ["溶岩噴出量", "最大13億m³"], ["降灰到達時間", "3時間で都心部"], ["東京（新宿）", "15日で約10cm"], ["影響自治体", "27市区町村（溶岩流）"]], dim: false },
                ].map(({ title, items, dim }) => (
                  <div key={title} style={{ boxShadow: dim ? INSET : RAISED, borderRadius: 12, padding: "14px 12px" }}>
                    <div style={{ color: dim ? "#666" : "#ff1a2e", fontSize: 11, fontWeight: 700, marginBottom: 10 }}>{title}</div>
                    {items.map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, gap: 6 }}>
                        <span style={{ color: "#555", fontSize: 11 }}>{k}</span>
                        <span style={{ color: dim ? "#666" : "#e8e8e8", fontSize: 11, fontWeight: dim ? 400 : 700, textAlign: "right" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ─── 3大リスク比較 ─── */}
        <section>
          <SectionTitle label="SUMMARY" title="3大リスク比較" accent="📊 " />
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["リスク", "最大死者数想定", "経済損失", "発生確率・現況"].map((h) => (
                      <th key={h} style={{ color: "#555", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["南海トラフ地震", "29.8万人（関連死含め最大35万人超）", "292兆円", "30年以内 80%"],
                    ["巨大津波", "21.5万人（うち津波死）", "地震被害に含む", "地震発生時に同時発生"],
                    ["富士山噴火", "直接死は限定的（溶岩流次第）", "1.2〜2.5兆円", "現在レベル1・予知困難"],
                  ].map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "14px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: j === 0 ? "#e8e8e8" : "#bbb", fontWeight: j === 0 ? 700 : 400, verticalAlign: "top" }}>
                          {j === 1 ? <span style={{ color: "#ff1a2e", fontWeight: 700 }}>{cell}</span> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ color: "#555", fontSize: 11 }}>
                出典: 内閣府防災（2025年3月）、地震調査研究推進本部、気象庁、山梨県富士山ハザードマップ検討委員会
              </div>
            </div>
          </Card>
        </section>

        {/* ─── CTA ─── */}
        <section>
          <Card style={{ textAlign: "center" }}>
            <SectionLabel>NEXT ACTION</SectionLabel>
            <h2 style={{ color: "#e8e8e8", fontSize: 22, fontWeight: 900, margin: "8px 0 16px" }}>
              あなたの地域のリスクを、今すぐ診断する
            </h2>
            <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
              住所・家族構成・現在の備蓄を入力するだけで、<br />
              地震・津波・火山灰の影響と、最適な備蓄セットを算出します。
            </p>
            <Link href="/" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #7a0015, #cc1525, #ff1a2e)",
              color: "#fff", fontWeight: 700, fontSize: 16,
              padding: "18px 40px", borderRadius: 12, textDecoration: "none",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 24px rgba(255,26,46,0.45)",
            }}>
              無料で診断する →
            </Link>
          </Card>
        </section>

      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", textAlign: "center", marginTop: 40 }}>
        <p style={{ color: "#555", fontSize: 11, margin: 0 }}>
          掲載データは内閣府・気象庁・地震調査研究推進本部等の公式情報に基づく。数値は最大ケース想定であり、実際の被害は防災対策の充実度により異なります。
        </p>
      </footer>
    </div>
  );
}
