import { useEffect, useRef } from "react";
import "./App.css";

const sections = [
  {
    title: "Today's Loop",
    subtitle: "Quick snapshots • 08:00 → 20:30",
    items: [
      "朝の準備とチェックイン",
      "カフェで作業とレビュー",
      "午後のスプリント",
      "夕方の散歩と整理",
      "夜のログと明日の準備",
    ],
  },
  {
    title: "Roadmap Bits",
    subtitle: "2週間の小さな目標",
    items: [
      "UI改善の優先順位付け",
      "通知設計の見直し",
      "新しいカードレイアウト",
      "読み込み体験の最適化",
      "アクセシビリティ微調整",
    ],
  },
  {
    title: "Notes Shelf",
    subtitle: "気になるメモの束",
    items: [
      "スクロールに合わせた陰影",
      "フッターの視認性",
      "タップ領域の最小サイズ",
      "バッジの色数を整理",
      "短いマイクロコピー",
    ],
  },
];

const cards = Array.from({ length: 12 }, (_, i) => ({
  title: `セクション ${i + 1}`,
  meta: `#${(i + 1).toString().padStart(2, "0")} • 3 min read`,
  body: "縦に長いダミーコンテンツ。読みやすさとリズム感のためにテキストを分割しています。",
}));

function App() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    if (CSS.supports("height: 100svh")) {
      return;
    }

    let minHeight = window.innerHeight;
    let lastWidth = window.innerWidth;

    const update = () => {
      const viewport = window.visualViewport;
      const height = viewport?.height ?? window.innerHeight;
      const width = viewport?.width ?? window.innerWidth;

      if (Math.abs(width - lastWidth) > 1) {
        minHeight = height;
        lastWidth = width;
      } else {
        minHeight = Math.min(minHeight, height);
      }

      const offset = Math.max(0, height - minHeight);
      page.style.setProperty("--footer-offset", `${offset}px`);
    };

    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="page" ref={pageRef}>
      <header className="app-header">
        <div className="header-left">
          <span className="logo-dot" />
          <div>
            <p className="brand">TapeStack</p>
            <p className="tagline">Mobile dummy page</p>
          </div>
        </div>
        <button className="primary-btn">Action</button>
      </header>

      <main className="app-main">
        <section className="hero">
          <div className="hero-top">
            <p className="pill">02.07 • Saturday</p>
            <p className="pill ghost">Tokyo • 12℃</p>
          </div>
          <h1>縦に長いモバイル用のダミーページ</h1>
          <p className="hero-lead">
            スクロールしてもHeaderとFooterが追従する構成。情報ブロックを連続させて
            リズム感のある長いページを再現しています。
          </p>
          <div className="hero-metrics">
            <div>
              <p className="metric-label">Sections</p>
              <p className="metric-value">12</p>
            </div>
            <div>
              <p className="metric-label">Notes</p>
              <p className="metric-value">36</p>
            </div>
            <div>
              <p className="metric-label">Status</p>
              <p className="metric-value">Active</p>
            </div>
          </div>
        </section>

        <section className="grid">
          {cards.map((card) => (
            <article className="card" key={card.title}>
              <div className="card-head">
                <span className="badge">LIVE</span>
                <span className="card-meta">{card.meta}</span>
              </div>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <div className="card-footer">
                <span>保存済み</span>
                <span>→</span>
              </div>
            </article>
          ))}
        </section>

        <section className="stack">
          {sections.map((section) => (
            <div className="stack-block" key={section.title}>
              <div className="stack-title">
                <h3>{section.title}</h3>
                <p>{section.subtitle}</p>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    <span className="dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="cta">
          <h2>Footerに近づいても余白を確保</h2>
          <p>
            最後のセクションです。フッターに重ならないように、メイン領域に下側の
            パディングを入れています。
          </p>
          <div className="cta-actions">
            <button className="primary-btn">Save</button>
            <button className="ghost-btn">Preview</button>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-left">
          <div className="footer-chip">On Scroll</div>
          <p>15:24 • Syncing</p>
        </div>
        <div className="footer-right">
          <button className="ghost-btn">メニュー</button>
          <button className="primary-btn">追加</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
