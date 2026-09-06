> **ChoTech Design System v2 — 正本（spec）**
> Figma: https://www.figma.com/design/CPqI3iL7yOiR8AqUG7YC1L （実装は本書から生成。値はすべて Variables / テキストスタイル経由）
>
> 実装との既知の差分（2026-08-31 時点）:
> - Color は 59 行 + Lime 検討で `poster/action/fill` `poster/action/ink` `poster/focus/ring` を追加（面の明度反転に備えたポスター専用ロール）
> - 既定モードは **Lime accent**（2026-09-01 クライアント確定）。Mono は検証モード、Indigo accent は決定過程の記録として残置（付録 C）
> - Icon は必須 10 + 任意 3 + ライブラリ予備 6 の **19 セット**（Size 16 / 20 / 24 variant)
> - `opacity/disabled` は Figma 上 **48**（Figma の opacity バインドは 0–100 解釈。CSS は 0.48）
> - アクセントは **アシッドライム（Tailwind v4 lime）に確定**。本文の数値はすべて Lime モードの実測値。比較の経緯と Indigo の数値は付録 C
> - Color コレクションは 3 モード（Mono / Indigo accent / Lime accent）・62 行、Shape 10 行、Spacing 64 行
> - **2026-09-01 の実装レビューを反映**（付録 A.8 / U-1〜U-14）: 角丸はチャットのみ例外（Messages 風）、リンク下線 2 / 3px、ヒーロー回転語はアクセント文字（下線廃止）、セクション見出しの連番廃止・和文の題が先、活動内容はベント 4 セル（Hackathon 追加）、用語は「パートナー」に統一、Member カードに SNS リンク
> - **2026-09-07**: Members の Staff（運営 3 名）は写真が揃うまで**写真枠ごと暫定非表示**（`showStaffPhotos` false。パスと素材は残置、§6.15 の写真つきが到達点）。Partner の Placeholder から「パートナーになる」（mailto）を撤去し、セルは `YOUR LOGO HERE` のみ（§6.16）。Partner セルは**正方形タイル**に変更（Desktop 6 列 197.67 / tablet 3 列 237.33 / Mobile 2 列 168、DECISION L-31）。マーキーの語は partners.ts から生成
- **2026-09-05 の実装レビューを反映**（U-21〜U-29 / L-30）: 写真・イラスト・ロゴは原色（B/W 撤回）、Hero の格子線撤去、Discord マークは filled、Stat の数字は白の Display/L + 所属の内訳、全発言にリアクション（実際の絵文字、数字が巻き上がる）、ペルソナとチャットのアバターは Humation（女 3・男 3）、Poster の Social はマークのみ、ロゴマークは外接矩形の mark.svg を 24 / 20（U-27 の Nav CTA マークは同日撤回）

# ChoTech Design Guidelines

長崎大学公認の学生技術コミュニティ ChoTech のワンページサイト刷新（コンセプト「ポスター×ベント」、Modernist 方向）のためのデザインシステム規範。Desktop 1440（container 1200）/ Mobile 390（container 342）。書体は LINE Seed JP のみ（400 / 700 / 800）、アイコンは Tabler Icons outline のみ、アクセントはアシッドライム 1 色。

本書は Color / Typography / Layout / Components / Motion・A11y・Content の 5 分冊を統合したもの。分冊間の食い違いは §0.4 で解決し、以降の本文はすべて解決後の値で書く。値の所有者: 色 → §1、文字 → §2、余白・寸法 → §3、線・角・影 → §4、アイコン・画像 → §5、部品 → §6、動き → §7、支援技術 → §8、コピー → §9。**DECISION** はコンセプトから導出できず本書で決めた項目（1 行根拠つき、一覧は付録 A）。

コントラストは WCAG 2.x 相対輝度で算出（`guide-contrast.mjs`、付録 B）。アルファは sRGB で下地に合成し 8bit hex に丸めてから比を取る。判定: 通常テキスト 4.5:1、大きなテキスト（≥ 24px、または ≥ 18.66px かつ Bold 以上）3:1、UI 部品・意味のある図形 3:1（1.4.11）、装飾罫線は対象外。

---

## 0. Principles

### 0.1 五つのレンズ（Apple の八原則を本サイトに当てたもの）

| レンズ | 規則 | 帰結 |
|---|---|---|
| **Purpose（目的）** | ページの仕事は「ChoTech を知り、Discord に来てもらう」の 1 つ。要素はこの仕事に寄与するときだけ置く | 主 CTA は 1 画面 1 つ。装飾のためだけの動き・色・影を足さない（M9）。落としたもの: チャット再生ループ、浮遊バブル、編集ヒント、accent-2、絵文字 |
| **Clarity（明快）** | 読めることが最初。インク・オン・グラウンド（14.86:1）で成立させ、色は構造を補わない | 明るい面の文字は ink / ink-secondary の 2 段、暗い面は ground のアルファ 100 / 88 / 72 / 48。全ペアを計算し AA を満たす。12px 未満の文字はない |
| **Hierarchy（階層）** | 階層は「ウェイト × サイズ × 行送り」の組と、罫線の太さ（1 / 2 / 4px）と余白の段（4px モジュール）で作る。色で作らない | Display 800 −2%、見出し 800、声 700、本文 400。2px rule = 区画、1px hairline = 行、4px = ポスターの下線。罫線の上 80 ≥ 下 64 |
| **Restraint（抑制）** | 一書体、一色相、角丸ゼロ、影ゼロ、中央揃えなし。Mono モードで成立しない設計は Lime でも不可 | アクセントの出現は Lime で 4 箇所（マーキー区切り、活動バッジ、ポスター面、ヒーロー下線）+ 状態 4 種（hover 下線 / pressed 文字 / focus / selection）だけ。写真・イラスト・ロゴは原色（U-21） |
| **Craft（精度）** | すべての値が梯子の段であり、根拠を言える。Figma と CSS が同じ構造で同じ数を持つ | 4px モジュール、整数 px の行送り、高さ駆動のコントロール（36 / 44）、fill + gap で描く罫線グリッド、`n 文字 = n em` の和文組版、compositor プロパティだけの動き |

Familiarity（慣れ）・Agency（主体性）・Flexibility（柔軟）・Responsibility（責任）は個別規則に溶かした: 矢印の意味を 2 種に固定する（§5）、`target="_blank"` を使わない（§8）、ループはページ内スイッチで止められる（§7）、Mobile は 1 列で DOM 順（§3）、200% 拡大とリフローで壊れない（§8）。

### 0.2 ハード制約（クライアント）

| 制約 | 本書での扱い |
|---|---|
| LINE Seed JP のみ（400 / 700 / 800、Thin 不使用） | §2。`sans-serif` は読み込み中の代替のみで設計には現れない |
| アクセント = アシッドライム、Tailwind v4 lime のランプ（基底 lime-400 `#9ae600`） | §1.2.2。段の変更なし。**極性が二つ**: 面・印は 400、明るい地の上の文字は 800、12px 以下は 900（§1.4.5） |
| 絵文字・記号文字をアイコンにしない。Tabler outline 24 grid stroke 2 | §5。矢印は `arrow-right`（サイト内）/ `arrow-up-right`（外部）の 2 つ |
| コンセプトは方向のみ。ピクセル値は権威ではない | §10 に概念値 → システム値の対応表 |
| Figma Variables: Color（Mono / Lime accent、+ Indigo accent は記録用）、Spacing / Typography（Desktop / Mobile） | §11。Mono ではアクセントは状態にしか現れない |

### 0.3 ページの骨格（コンセプトの認識可能な部分）

Nav（sticky、2px 下罫）→ Hero（インク面、背景写真、回転語をアクセントで塗る）→ Marquee 帯（2px 上下罫、asterisk 区切り、停止ボタン）→ About（ベント 4 列罫線グリッド: テキスト / 統計 / チャット / 写真 / CTA）→ Activities（ベント 4 セル: Feature 1 + Compact 3）→ For You（ペルソナカード 3 × 2）→ Members（リーダー 2 列 + スタッフ 3 列）→ Partners（正方形ロゴタイル 6 列 + プレースホルダ）→ Poster（クロージング CTA、唯一のアクセント面）→ Footer。全要素左揃え。

### 0.4 分冊間の矛盾と解決

分冊の最終版どうしで残っていた食い違い。左が採用値。以降の本文はすべてこの値で統一している。

| # | 項目 | 採用 | 退けた案 | 理由 |
|---|---|---|---|---|
| R1 | neutral-600 の値と `ink-tertiary` の役割 | `#7d7979`（概念値）を保持し、**大きな文字と図形専用**。12–15px の補助文字（キッカー、肩書、タグライン、©、サブタイトル、Mono バッジ）は **すべて `ink-secondary`（n700、5.83）** | Typography / Layout / Components / Motion が計算に使った再調整値 `#6b6767`（5.00） | Color の最終判断: `#6b6767` は hover-tint 上 4.44 / pressed-tint 上 3.96 で AA を割り、700 との差 1.17 は知覚できず、ランプの等比も壊す。小さな文字の階層は size / weight / case が担う（Components D-1、Motion D10 と同じ結論） |
| R2 | タグとリアクションチップの構造 | **塗り `color/chip/fill`（= surface n200）、枠なし**、文字 `chip/ink`（= ink-secondary、n200 上 5.30） | Color D11 の「塗りなし + 1px hairline 枠」 | 1px hairline は「行・語の仕切り」の語彙であり、2.59 の線を唯一の輪郭にしない（Layout D17 最終版、Components §4）。n200 は ground 比 1.10 で罫線なしに輪郭が読める最小段（Color §3.1 の surface 定義と同じ根拠）。文字は Color 原則 3 に従い n800 ではなく ink-secondary |
| R3 | インク面のアウトラインボタン枠 | **`inverse/outline` = inverse/ink 100% の 1 種**（14.86） | Components の Soft（ground@72）/ Strong（100%）2 種 | 部品境界は 3:1 が要り、1 トークンで済む。主副の差は「塗り vs 枠」で十分に出る（Restraint）。variant 数も減る |
| R4 | リンクの状態モデル | ホバーで **文字色を変えず下線で示す**: ナビ・ワードマーク 2px アクセント下線、フッター・ソーシャルは 1px currentColor 下線（フッターは同時に文字 ink-secondary → ink）、インラインは常時 1px → 2px。プレスは文字 `link/pressed`（lime-900、7.85）。現在地は 2px ink 下線 | Components §3.1 の「ホバーで文字を有彩色に変える + 1px 下線」 | Color D16 と Motion D9 が一致。Mono 原則「アクセントは一時的状態のみ、ホバーは下線」。1.4.1 の色以外の手がかり |
| R5 | ソーシャルリンク（ポスター上）のプレス | **ホバーと同じ**（`poster/ink` + 1px 下線） | 全スタイル共通の `link/pressed` | lime-900 はポスター面（lime-400）上 1.89 で不可、lime-400 は同色 1.00。ポスター面にアクセント文字は置けない |
| R6 | マーキー帯の高さ | **`size/band-marquee` 56**（高さ駆動、行ボックス 26 を中央、上下 2px 罫を含む）。停止セルは 44 × 52 | Typography の導出値 54、Components の 53.65 | 帯は Layout 原則 6「高さで決める」に従う。内側 52 = 4 × 13 で 4px モジュールに乗り、停止セルの高さも 4 の倍数。`band/pad-y` 12 は最小値（実効 13） |
| R7 | マーキー区切りアイコンの径 | **20**（`icon/md`） | Components の 16 | Layout §5.2 の判定「15–19px の文字の横は 20」。Title 3 Caps 19 の cap 高 ≈ 15 に釣り合う |
| R8 | 停止ボタンのアクセシブルネーム | **固定「ページの動きを止める」+ `aria-pressed`** | ラベルを「止める / 再開する」で切り替える | トグルボタンは名前を変えず状態で伝える（ARIA APG）。Motion が支援技術の所有者 |
| R9 | ヒーロー副 CTA「活動を見る」 | **アイコンなし** | Components §2.7 の `arrow-right` | ページ内スクロールは遷移ではない（Motion §9.6、Layout §5.1）。矢印 = 別のページ／サイトへの遷移という規則を 1 つに保つ |
| R10 | 最小文字サイズ | **12px、例外なし**。Overline S 11 は Overline 12 に統合 | Components 分冊の「Latin 大文字のみ 11 可」 | Typography P6。例外規定をなくす。11px の和文は潰れ、Latin だけ例外にする理由が階層にない |
| R11 | ボタンラベルのウェイトと行ボックス | **700、行ボックス 20**（Label/M 15、Label/S 14）。36 = 8 + 20 + 8、44 = 12 + 20 + 12 | Components の 800 / 120% | 14–15px の ExtraBold は漢字のカウンターが潰れる。Typography D7 / D9 |
| R12 | ナビリンクのロール | **`Label/Nav`（14 / 20、Regular、段落間隔 0）** | Components の Body/S | 1 行のコントロールに段落の行送りを付けない。ヒット領域計算（20 → ±12 で 44）が整数になる |
| R13 | 和欧間のアキ | **手動スペースなし、`text-autospace: no-autospace`** | Motion §2.7 / Components §2.5 の `text-autospace: normal` | Figma に自動アキはなく、有効にすると CSS だけ広がり Figma と幅が一致しない。`n 文字 = n em` の設計計算を守る（Typography D6） |
| R14 | 影の濃度 | **`color/shadow` = ink@24 の 1 濃度**。段差は y / blur の幾何のみ | Layout D18 の 6 / 12 / 24 | 色トークン 1 つ。ページに影はなく、ライブラリの dialog にだけ使う。48 は blur 32 で幕と同濃度になるため採らない |
| R15 | 幕（backdrop）の高コントラスト・低透明時の値 | **ink@88**（アルファ尺度の最大段） | Color の「ink 実色 90% 相当」、Layout の n900@88 | 尺度上の値で表す。色は ink に統一（Color D15） |
| R16 | ナビ現在地の下線太さ | **2px ink**（Mobile メニュー行も、ラベル幅の 2px 下線） | Components D-4 の 1px、Color の Menu row「左 2px 罫」 | ホバー下線（2px アクセント）と同じ幾何・別の色 = 「同じ装置、別の意味」。縦線は Layout §4.3 規則 6 の 3 種に限る |
| R17 | Mono のマーキー区切りアイコンの色 | **`ink-tertiary`（n600、3.85 ≥ 3）** | Layout / Components の `divider`（n500、2.59、装飾扱い） | 「線は divider、図形は ink-tertiary 以上」（Color §1.4）。アイコンは形であり線ではない |
| R18 | 段落幅 | **`measure/paragraph` 588 / 342** の 1 本 | Components 分冊のポスター 36em | Layout D8 / Typography D13。15px で 39 全角、可読域 35–45 |
| R19 | Mobile メニューの展開 | **`translateY` + `spring/quick`、`overflow: hidden` のラッパー** | Components §7.3 の `clip-path` | M6: `clip-path` は compositor 処理されない |
| R20 | メンバー写真の `alt` | **`alt=""`** | Layout §6.2 の `alt="氏名"` | 氏名は常に隣接する h3 にある（Motion D16） |
| R21 | ゴーストボタン（ライブラリ）のラベル | **ink 固定、状態はティントのみ** | Components の accent-text | ティント面にアクセント文字を置かない（Color D24: pressed-tint 上 4.59 で余裕 0.09） |
| R22 | 高コントラスト時の divider | **neutral-700（5.83）** | Motion の neutral-600（旧値で 5.00、現値 3.85） | R1 により 600 は 3.85。線を 3:1 超にするなら 700 |
| R23 | スキップリンクのサイズ | **Desktop sm 36 / Mobile md 44（ナビ CTA と同じ規則）** | Components の md 固定、Motion D19 の S 固定 | ナビ帯の位置に現れる部品はナビ CTA と同じ高さ。キーボード専用なのでヒット領域の議論は不要 |
| R24 | モーショントークンの置き場 | **Figma Variables にしない**。CSS カスタムプロパティと `01 Foundations / Motion` の表、プロトタイプ設定（§7.6）で保持 | Motion 分冊の `V2 Motion` コレクション | プロトタイプの duration / spring は変数に束縛できない。束縛できない変数は表示専用になり、CSS と乖離する |

---
## 1. Color

Figma: コレクション `Primitives`（単一モード）と `Color`（モード `Mono` / `Lime accent`、記録用に `Indigo accent`）。`Color` の全行はエイリアス。Scopes 略号: **FF** FRAME_FILL / **SF** SHAPE_FILL / **TF** TEXT_FILL / **SC** STROKE_COLOR / **OP** OPACITY。サイズは §2 のロール名で引用する。

### 1.1 原則

| # | 原則 | 内容と根拠 |
|---|---|---|
| 1 | **インク・オン・グラウンドが先** | ページはウォームグラウンド `#f3f2f2` の上のインク `#201e1d`（14.86:1）で成立させる。構造は罫線と余白が担い、色は構造を補わない。色を抜いても崩れない設計だけを許可する |
| 2 | **アクセントは一色、面は一つ** | 色相はアシッドライム 1 系統。塗り面として現れるのはポスター（クロージング CTA）だけ。それ以外は「印」（下線、バッジ文字、区切りアイコン、フォーカスリング）に限る。競合する強調がないから、一つの面が「声」になる |
| 3 | **小さな文字の階層は色で作らない** | グラウンド（Y 0.890）で 4.5:1 を満たす文字色の上限は Y 0.159。neutral-700（Y 0.111）より明るく AA を保てる段は 700 との差が最大 1.30:1 で、階層として知覚できない。よって明るい面の文字色は **primary（ink）/ secondary（neutral-700）の 2 段** とし、tertiary（neutral-600、3.85）は大テキストと非テキスト専用にする。小さな文字の階層は size / weight / case が担う（Apple「Build hierarchy from weight + size + leading」） |
| 4 | **反転面は同じ梯子を逆から読む** | 面のテキストは「**反対極の色 × 不透明度**」で定義する。暗い面（インク）はグラウンド × α、明るいポスター面（lime-400）はインク × α。色を固定せず不透明度にすることで、ティントが面の色を継承し、一つの梯子がどちらの極でも成立する |
| 5 | **状態は反対の極の不透明度で表す** | 明るい面のホバー/プレスはインクのアルファ、暗い面はグラウンドのアルファ。どの面でも同じ規則で、色を増やさない。フォーカスは常にアクセント（面ごとに段を変える: 明るい面 700 / インク面 300 / ポスター面 900） |
| 6 | **モードは「抑制の度合い」** | `Mono` はアクセントが状態（フォーカス／選択／ホバー下線／プレス文字）にしか現れない状態で、アクセントが情報を担っていないことの証明として機能する。`Lime accent` はそこに正確に 4 つの出現（マーキー区切り、活動バッジ、ポスター面、ヒーロー下線）を加える。Mono で成立しない設計は Lime でも不可 |
| 7 | **色だけに頼らない（WCAG 1.4.1）** | リンクは下線で示す（インライン常時 1px、ナビ・ワードマークはホバーで 2px、フッター・ソーシャルはホバーで 1px）。現在地は 2px インク下線。バッジは文字を持つ。フォーカスは 2px オフセットのリング。モード切替で情報が失われないことがその検証になる |
| 8 | **写真とロゴは原色のまま** | 画像に処理を掛けない（grayscale・tint・duotone を使わない、**DECISION U-21**）。実写と Humation のイラストの色は「コミュニティの実像」を運ぶ情報で、モノクロ化はそれを削っていた。当初の「彩度をアクセント一色に集約する」規則は撤回。パートナーロゴもブランド規定の色のまま |

### 1.2 プリミティブ

#### 1.2.1 Warm neutral（50–950）

コンセプトのランプを **値を変えずに** 保持し、グラウンドを 100、インクを 950 として梯子に組み込んだ（コンセプトの 100 `#f8f4f4` は 50 に改番）。隣接段の輝度比は 1.5 前後で一定（500→600 1.49、600→700 1.52、700→800 1.55）。Y = 相対輝度。

| Step | Hex | Y | vs ground `#f3f2f2` | vs ink `#201e1d` | 役割 |
|---|---|---|---|---|---|
| 50 | `#f8f4f4` | 0.912 | 1.02 | 15.21 | 予備。テキスト不可。ページ未使用 |
| 100 | `#f3f2f2` | 0.890 | 1.00 | 14.86 | **ground**、暗い面のテキスト基底、グラウンド色ボタン |
| 200 | `#eae7e7` | 0.804 | 1.10 | 13.51 | **surface**、チップの塗り、グラウンド色ボタンのホバー |
| 300 | `#d7d3d3` | 0.657 | 1.33 | 11.19 | アバター、グラウンド色ボタンのプレス |
| 400 | `#bab6b6` | 0.473 | 1.80 | 8.27 | 予備。無効時のアウトライン・装飾のみ、**テキスト不可**（1.80）。ページ未使用 |
| 500 | `#9b9797` | 0.313 | 2.59 | 5.75 | **divider**（2px / 1px 罫）。線専用、文字・図形不可 |
| 600 | `#7d7979` | 0.194 | 3.85 | 3.86 | **ink-tertiary**: 大テキスト（≥ 24px / ≥ 18.66px Bold）と非テキスト図形（3:1）のみ |
| 700 | `#605d5d` | 0.111 | 5.83 | 2.55 | **ink-secondary**: 明るい面の小さな補助文字すべて。インク色ボタンのプレス。高コントラスト時の divider |
| 800 | `#444141` | 0.054 | 9.04 | 1.64 | インク色ボタンのホバー |
| 900 | `#2d2b2b` | 0.025 | 12.60 | 1.18 | ヒーロー格子線 |
| 950 | `#201e1d` | 0.013 | 14.86 | 1.00 | **ink**、インク面、ポスター面（Mono）、backdrop / shadow の基底 |

**600 を再調整しない根拠**（DECISION C-1）: グラウンド上で AA を満たす最も明るい段は 700（5.83）。600 を Y 0.159 以下に暗くして AA 化しても（例 `#6b6767` 5.00）、700 との差は 1.17:1 で知覚できず、ランプの等比（×1.5）も壊れる（500→600 が ×2.27、600→700 が ×1.24）。さらにその値はホバー面 4.44 / プレス面 3.96 で活動セルの副題が AA を割る。600 は概念値のまま、役割を「大テキスト・図形専用」に限定する方が一貫する。

#### 1.2.2 Lime（200–900）

Tailwind v4 lime をそのまま採用。段の変更なし。**インディゴと極性が逆**であることがこのランプの設計を決めている: 明るい段（400）は墨地の上と大面で強く、明るい地の上では文字にも輪郭にも使えない。地の上のアクセントは 700 以降の暗い段が担う。

| Step | Hex | Y | vs ground | vs surface `#eae7e7` | vs ink | 役割 |
|---|---|---|---|---|---|---|
| 200 | `#d8f999` | 0.847 | 1.05 | 1.05 | 14.18 | accent-subtle（淡い塗り、ライブラリ） |
| 300 | `#bbf451` | 0.759 | 1.16 | 1.06 | 12.79 | インク面のフォーカスリング |
| 400 | `#9ae600` | 0.635 | 1.37 | 1.25 | **10.83** | **accent 基底**: ポスター面、インク面上の印（ヒーロー下線・選択）。**明るい地の上では文字にも面の輪郭にも使えない**（1.37、C-25） |
| 500 | `#7ccf00` | 0.489 | 1.74 | 1.58 | 8.52 | accent ホバー（面。上のインク文字 8.52） |
| 600 | `#5ea500` | 0.293 | 2.74 | 2.49 | 5.42 | accent プレス（面。上のインク文字 5.42） |
| 700 | `#497d00` | 0.161 | 4.46 | 4.05 | 3.33 | 地の上の**図形**専用: フォーカスリング、マーキー区切り（3:1 ✓、4.5 ✗） |
| 800 | `#3c6300` | 0.099 | **6.31** | 5.74 | 2.35 | 地の上の**アクセント文字**の基底: リンク文字、活動バッジ |
| 900 | `#35530e` | 0.070 | 7.85 | 7.13 | 1.89 | 12px 以下のアクセント文字、淡い塗り上の文字（lime-200 上 7.49）、ポスター面上のリング（5.72）、高コントラスト時のアクセント文字 |

コンセプトの赤 `#ec3013` はグラウンド上約 3:1 で本文不可。lime-400 は墨地の上で 10.83:1 と極めて強いが、地の上では 1.37 で文字・輪郭ともに不可のため、**地の上のアクセントは 800（6.31）に切り替える**。lime-700（4.46）は AA を 0.04 下回るので文字には使わず、3:1 で足りる図形（リング・区切り）に限る。（DECISION C-25、C-26）

インディゴのランプ（100–900）は `Primitives` に残置する。Indigo accent モードを比較・記録用に保持しているため（付録 C）。新規のロールをインディゴに割り当てないこと。

#### 1.2.3 Alpha scale

不透明度は 6 段。**6 → 12 → 24 → 48 は倍々**（ティント・影・幕・無効）。**72 = 3 × 24**（tertiary 文字）。**88** は secondary 文字（インク面 11.78 / ライムのポスター面 8.23）。48 は ink 上で大テキスト 3:1 を満たす（4.45）が通常テキスト 4.5 には届かないため、ディスプレイサイズ専用。（DECISION C-5）

ライムのポスター面は**明るい面**なので、そこだけテキストは「グラウンド × α」ではなく「**インク × α**」で組む。合成後の比は 88 % → 8.23、72 % → 5.32、48 % → 2.79。72 % が N を満たすため、ポスターは原理上 3 段の階層を持てる（インディゴ面では 3.70 で不可だった）。ただし §1.5 の抑制原則により **運用は 2 段に留める**（C-14 は制約ではなく選択に変わった）。

| α | インク over 明るい面（ground / ポスター面） | グラウンド over 暗い面（インク面） | アクセント | 根拠 |
|---|---|---|---|---|
| 6 % | `alpha/ink/6` → `state/hover-tint`（vs ground 1.13） | — | — | 知覚できる最小のティント |
| 12 % | `alpha/ink/12` → `state/pressed-tint`（1.26）、ポスター面の `poster/selection`（`#8bce03`、上のインク文字 8.64） | `alpha/ground/12` → `inverse/state/hover-tint`（vs ink 1.40） | — | ホバーの 2 倍 |
| 24 % | `alpha/ink/24` → `shadow`（1.64） | `alpha/ground/24` → `inverse/state/pressed-tint`（2.10） | `alpha/lime-400/24` → `selection`（地の上 `#deefb8`）+ `inverse/selection`（インク面 `#3d4e16`） | ティントの上限。選択上のインク文字 13.55、インク面の選択上のグラウンド文字 8.17 |
| 48 % | `alpha/ink/48` → `backdrop`（2.99）、`opacity/disabled` | `alpha/ground/48` → `inverse/ink-quaternary`（ink 4.45） | — | 幕として面を半分に落とす。ディスプレイ文字は L 合格 |
| 72 % | ポスター面の tertiary（lime-400 上 5.32、`#425615`）。運用では使わない | `alpha/ground/72` → `inverse/ink-tertiary`（ink 8.29） | — | 3 × 24。インク面・ライムのポスター面ともに N |
| 88 % | `alpha/ink/88` → ポスター面の `poster/ink-secondary`（lime-400 上 8.23、`#2f361a`） | `alpha/ground/88` → `inverse/ink-secondary`（ink 11.78） | — | どちらの面でも secondary を N で通す。低透明・高コントラスト時の backdrop |

アルファは 13 個（ink 5、ground 5、indigo 2〈Indigo モードの記録用〉、lime 1）。Figma では `Primitives` に RGBA リテラルとして置く（エイリアスはアルファを付与できない）。合成値: ground@88 / 72 / 48 over ink = `#dad9d8` / `#b8b7b6` / `#858483`。ink@6 / 12 / 24 / 48 over ground = `#e6e5e5` / `#dad9d8` / `#c0bfbf` / `#8e8c8c`。ink@88 / 72 / 48 over lime-400 = `#2f361a` / `#425615` / `#5f860e`、ink@12 / 24 over lime-400 = `#8bce03` / `#7db607`。ground@12 / 24 over ink = `#393737` / `#535150`。lime-400@24 over ground = `#deefb8`、over ink = `#3d4e16`。

### 1.3 セマンティックロール

「=」は Mono と同値。

#### 1.3.1 面

| ロール | Mono | Lime accent | Scopes | 使用箇所 | 根拠 |
|---|---|---|---|---|---|
| `color/ground` | neutral-100 | = | FF SF | ページ、ナビ、マーキー帯、明るいセル、フッター、画像スロット背後、Mobile メニューパネル | 基準面 |
| `color/surface` | neutral-200 | = | FF SF | チャット相手側バブル、ペルソナ引用枠、画像プレースホルダ、チップの塗り（`chip/fill`） | グラウンドとの比 1.10 で罫線なしに輪郭が読める最小段 |
| `color/inverse/ground` | neutral-950 | = | FF | ヒーロー、ベント統計セル、ベント CTA セル、チャット自分側バブル | インクを塗りに転用 |
| `color/poster/ground` | neutral-950 | **lime-400** | FF | ポスター（Join）セクションのみ | 唯一のアクセント面。Mono では暗い面、Lime では**明るい面**（上のインク文字 10.83）。極性が反転するため専用ロール群を持つ（C-28） |

#### 1.3.2 明るい面のテキスト

| ロール | Mono | Lime | Scopes | 使用箇所 | 比 (ground / surface / hover-tint / pressed-tint) |
|---|---|---|---|---|---|
| `color/ink` | neutral-950 | = | TF SF SC | h2（Title 1）、セル見出し（Title 2 / 3 / Headline）、活動タイトル（Display M）、氏名、ナビ（Label Nav）、マーキー JP 項目（Title 3 Caps）、バブル・引用（Callout）、アバター頭文字とチップ数値（Caption B）、インラインリンク、ボタンラベル（アウトライン・ゴースト） | 14.86 / 13.51 / 13.21 / 11.78 |
| `color/ink-secondary` | neutral-700 | = | TF SF | **明るい面の小さな補助文字すべて**: 段落（Body S / M）、フッターリンク静止（Footnote）、紹介文・スキル行（Footnote / Caption）、推薦文（Footnote B）、画像キャプション（Caption）、©、入力中ラベル、タグ文字（`chip/ink`）、タグライン（Caption B）、セクション番号・キッカー・肩書・マーキーラベル（Overline）、活動サブタイトル（Subheadline）、活動バッジ（Mono、Overline JP）、チップのアイコン | 5.83 / 5.30 / 5.19 / 4.62 |
| `color/ink-tertiary` | neutral-600 | = | TF SF SC | **大テキストと図形のみ**: マーキーゴースト「Your Company Here」（Title 3 Caps 19 EB）、Mono のマーキー区切りアイコン、typing dot、画像プレースホルダのアイコン、アイコンの最薄値 | 3.85 / 3.50 / 3.42 / 3.05（L / U のみ） |

明るい面に quaternary は置かない。neutral-500 は `color/divider` としてだけ現れる（線専用、§1.3.4）。

#### 1.3.3 反転面のテキスト（インク面・ポスター面）

インク面は常に暗い面。ポスター面は Mono では暗い面、Lime では**明るい面**になるため、`inverse/*`（グラウンド × α）と `poster/*` を別系統に分ける。比の列はインク面の値、ポスターは Lime の lime-400 面の値。
|---|---|---|---|---|---|

| ロール | Mono | Lime | Scopes | 使用箇所 | 比 |
|---|---|---|---|---|---|
| `color/inverse/ink` | neutral-100 | = | TF SF SC | h1 回転語（Display XL）、リード（Title 3）、統計値（Display M）、自分側バブル（Callout）、CTA 見出し（Title 3）、アウトラインボタンのラベルと枠 | ink 14.86 |
| `color/inverse/ink-secondary` | `alpha/ground/88` | = | TF | ヒーロー段落（Body L）、CTA サブ（Footnote） | ink 11.78 |
| `color/inverse/ink-tertiary` | `alpha/ground/72` | = | TF | ヒーローメタ行（Overline）、統計セルキッカー（Overline）。**インク面のみ** | ink 8.29 |
| `color/inverse/ink-quaternary` | `alpha/ground/48` | = | TF | h1 導入句「仲間と、」（Display XL）。**インク面・ディスプレイサイズのみ** | ink 4.45（L） |
| `color/poster/ink` | → inverse/ink | **neutral-950** | TF SF SC | ポスター見出し（Display L）、ソーシャルリンクのホバー | Mono 14.86 / Lime 10.83 |
| `color/poster/ink-secondary` | → inverse/ink-secondary | **`alpha/ink/88`** | TF | ポスターキッカー「Join us」、段落（Body M）、ソーシャルリンク静止（Overline） | Mono 11.78 / Lime 8.23（`#2f361a`） |
| `color/inverse/hairline` | neutral-900 | = | SF SC | ヒーロー格子線（1px × 4） | 1.18（テクスチャ、対象外） |

ポスター専用エイリアスを置くのは、モードがポスターの面だけを差し替え、ベントのインクセルに波及しないため。Lime ではさらに面の**明度が反転**するので、`poster/*` は `inverse/*` のエイリアスではなく独立した値を持つ。ポスターの階層は primary / secondary の 2 段に限定する（Lime では tertiary = ink@72 が 5.32 で N を満たすが、抑制原則により使わない。C-14 は制約から選択に変わった）。（DECISION C-4、C-14、C-28）

#### 1.3.4 罫線と枠

| ロール | Mono | Lime | Scopes | 使用箇所 | 根拠 |
|---|---|---|---|---|---|
| `color/divider` | neutral-500 | = | SC SF FF | 2px: ナビ下、マーキー上下、セクション上、フッター上、格子フレームの塗り＋ gap、マーキー停止ボタンの左罫 | 一つの色、二つの太さ。強弱は太さで出す。装飾（1.4.11 対象外、2.59） |
| `color/divider-hairline` | → divider | = | SC SF | 1px: 活動セル、締めの罫、タグライン左罫、Mobile メニュー行間（明るい面のみ）。インク面の縦罫（ヒーローメタ行）は currentColor = `inverse/ink-tertiary` | 同上。インク面に divider（n500）を置かない |
| `color/chip/fill` | → surface | = | FF | タグとリアクションチップの塗り（非対話、枠なし） | 罫線なしに輪郭が読める最小段（1.10）。1px 線は行の仕切りに温存する（R2） |
| `color/link-underline` | currentColor | = | SF SC | インラインリンク（常時 1px）、フッター・ソーシャルのホバー下線（1px） | 下線は文字色を継ぐ。Figma は文字色を bind した高さ 1 の矩形、CSS は `text-decoration` |
| `color/inverse/outline` | → inverse/ink | = | SC | インク面のアウトラインボタン（ヒーロー副 CTA、ベント CTA「Discord」）の 1px 枠 | 部品境界は 3:1 必須 → 実色 100%（ink 14.86）。1 種に統合（R3） |

規則: **線は divider、図形は ink-tertiary 以上**。罫線は装飾として divider（2.59）で良いが、アイコン・点・ゴースト文字など「形」は非テキストとして 3:1（ink-tertiary 3.85）を床にする。部品境界（ボタン枠）は divider を使わない。

#### 1.3.5 アクセント

アクセントは **2 極** で使う。**明るい地の上**では暗い段（700 / 800 / 900）が文字・線として働き、**インク面とポスター面**では lime-400 が面・印として働く。同じ段を両方に使うことはできない（lime-400 は地の上 1.37、lime-800 はインク面 2.35）。

| ロール | Mono | Lime | Scopes | 使用箇所 | 比 |
|---|---|---|---|---|---|
| `color/accent` | lime-400 | = | FF SF | 基底。ポスター面、インク面上の印。**明るい地の上で面として使わない**（C-25） | ink 10.83 / ground 1.37（不可） |
| `color/on-accent` | neutral-950 | = | TF SF | アクセント塗り上の文字・アイコン | 10.83 |
| `color/accent-hover` | lime-500 | = | FF | アクセント塗りボタンのホバー（ライブラリ） | on-accent 8.52 |
| `color/accent-pressed` | lime-600 | = | FF | 同プレス | on-accent 5.42 |
| `color/accent-subtle` | lime-200 | = | FF SF | 淡い強調塗り（ライブラリの強調セル・チップ） | ground との差 1.05 |
| `color/on-accent-subtle` | lime-900 | = | TF | 淡い塗り上の文字 | 7.49 |
| `color/accent-text` | lime-800 | = | TF | 13px 以上のアクセント文字: リンクのホバー下線・プレス文字（Label Nav / Footnote / Title 3） | 6.31（ground）/ 5.74（surface） |
| `color/accent-text-small` | lime-900 | = | TF | 12px 以下のアクセント文字: 活動バッジ（Overline JP） | 7.85 / hover-tint 6.97 / pressed-tint 6.22 |
| `color/accent-on-ink` | lime-400 | = | SF SC | インク面上の印（ヒーロー下線、インク面の選択基底）。**文字には使わない**（抑制。数値上は 10.83 で N 合格） | ink 10.83 |

`accent-text` に lime-700 を使わない根拠（DECISION C-26）: lime-700 はグラウンド上 **4.46** で AA（4.5）を 0.04 下回る。3:1 で足りる図形（フォーカスリング、マーキー区切り）にだけ 700 を使い、文字は 800 を床にする。`accent-text-small` の根拠: 高彩度の有彩色は同じ輝度比でも細字が痩せて見えるため、12px 以下は 1 段深い 900 を使う。この補正は有彩色固有で、無彩色（ink-secondary 5.83）には適用しない。

モード依存の 10 行。Mono と Lime の差は「4 つの出現」（マーキー区切り、活動バッジ、ヒーロー下線、ポスター面）と、**ポスター面の明度反転に伴う 6 行**:

| ロール | Mono | Lime accent | Scopes | 使用箇所 | 比 |
|---|---|---|---|---|---|
| `color/pop/separator` | → ink-tertiary (neutral-600) | lime-700 | SF | マーキー区切りアイコン（Tabler `asterisk` 20） | 3.85 / 4.46 |
| `color/pop/badge` | → ink-secondary (neutral-700) | lime-800 | TF SF | 活動バッジ（Overline JP 12 B）+ `arrow-right` 16 | 5.83 / 6.31（hover-tint 5.19 / 5.61、pressed-tint 4.62 / 5.00） |
| `color/hero/word` | → inverse/ink | lime-400 | TF | 回転語の**文字色**。インク面上（下線は持たない、DECISION U-3） | 14.86 / 10.83 |
| `color/poster/ground` | neutral-950 | lime-400 | FF | ポスター面 | — |
| `color/poster/ink` | → inverse/ink | neutral-950 | TF SF SC | ポスターの primary 文字 | 14.86 / 10.83 |
| `color/poster/ink-secondary` | → inverse/ink-secondary | `alpha/ink/88` | TF | ポスターの secondary 文字 | 11.78 / 8.23 |
| `color/poster/selection` | → inverse/selection | `alpha/ink/12` | FF | ポスター面の `::selection` | 上の primary 10.28 / 8.64 |
| `color/poster/action/fill` | → inverse/action/fill (neutral-100) | neutral-950 | FF | ポスター CTA の面 | 面 vs ポスター 14.86 / 10.83 |
| `color/poster/action/ink` | → inverse/action/ink (neutral-950) | neutral-100 | TF SF | 同ラベル・アイコン | 14.86 / 14.86 |
| `color/poster/focus/ring` | → focus/ring-inverse (lime-300) | lime-900 | SC | ポスター面上のリング | 12.79 / 5.72 |

ポスター専用の `action` と `focus` を切るのは、ポスター面の明度が Mono（暗い面）と Lime（明るい面）で反転し、汎用 `inverse/action/*`・`focus/ring-inverse` では両立しないため。Lime の lime-400 面に lime-300 のリングを置くと 1.18 で消える。（DECISION C-28）

#### 1.3.6 状態

| ロール | Mono | Lime | Scopes | 使用箇所 | 比・根拠 |
|---|---|---|---|---|---|
| `color/state/hover-tint` | `alpha/ink/6` | = | FF | 活動セルホバー、Mobile メニュー行ホバー、アウトライン／ゴースト／アイコンボタン・マーキー停止ボタンのホバー、**Lime のポスター面上の状態** | 上の ink 13.21、ink-secondary 5.19、accent-text-small 6.97 |
| `color/state/pressed-tint` | `alpha/ink/12` | = | FF | 同プレス | 11.78 / 4.62 / 6.22 |
| `color/inverse/state/hover-tint` | `alpha/ground/12` | = | FF | インク面アウトライン／アイコンボタンのホバー | 上の ground 10.58 |
| `color/inverse/state/pressed-tint` | `alpha/ground/24` | = | FF | 同プレス | 7.06（**インク面のみ**。Lime のポスター面は明るい面なので `state/*`〈ink アルファ〉側を使う） |
| `color/focus/ring` | lime-700 | = | SC | 明るい面上の `:focus-visible` リング（2px、offset 2） | ground 4.46、surface 4.05、hover-tint 3.96、pressed-tint 3.53（すべて U 3:1 ✓） |
| `color/focus/ring-inverse` | lime-300 | = | SC | **インク面**上の同リング（ポスター面は `poster/focus/ring`） | ink 12.79、inverse hover-tint 9.11 |
| `color/selection` | `alpha/lime-400/24` | = | FF | 明るい面の `::selection` 塗り（`#deefb8`）。**文字は `ink` を強制** | 上の ink 13.55（ink-secondary も 5.32 で N） |
| `color/inverse/selection` | `alpha/lime-400/24` | = | FF | インク面の `::selection` 塗り（`#3d4e16`）。文字は `inverse/ink` を強制 | 上の ground 8.17 |
| `color/poster/selection` | → inverse/selection | `alpha/ink/12` | FF | ポスター面の `::selection` 塗り（Lime `#8bce03`）。文字は `poster/ink` を強制 | 上の primary 10.28 / 8.64 |
| `opacity/disabled` | 0.48 | = | OP | 無効ボタン（ノード全体、ライブラリのみ） | アルファ尺度の 48。1.4.3 適用除外 |
| `color/link/hover` | → accent-text (lime-800) | = | SF SC | ナビリンク・ワードマークのホバー下線（2px） | 6.31（U）。**lime-400 は 1.37 で不可** |
| `color/link/pressed` | → accent-text-small (lime-900) | = | TF | ナビ・フッター・インラインリンクのプレス文字 | 7.85 |
| `color/link/current` | → ink | = | SF | `aria-current` の 2px 下線（ナビ）、Mobile メニュー行のラベル下 2px | 持続状態にアクセントを使わない |
| `color/inverse/link/hover` | → inverse/ink | **neutral-950**（ポスター面） | TF SF | ソーシャルリンクのホバーとプレス（secondary → primary、+ 1px 下線） | 14.86 / 10.83 |

リンクの状態モデル（DECISION C-16）: 文字色はホバーで変えない。ホバーは **下線** で示し、ナビ・ワードマークは `link/hover`（lime-800 の 2px）、フッター・ソーシャルは `link-underline`（currentColor 1px、フッターは同時に文字を ink-secondary → ink）、インラインは常時 1px → ホバー 2px。プレスは `link/pressed`（lime-900。ソーシャルはホバーと同じ、R5）。現在地は `link/current`。Mono でアクセントが現れるのはホバー下線・プレス文字・フォーカス・選択の 4 状態だけで、いずれも一時的。

選択範囲で文字色を強制する理由（DECISION C-9）: ライムの `selection`（lime-400@24）上では ink-secondary も 5.32 で AA を満たすため数値上の強制は不要になったが、規則は残す。選択中に階層が見えると選択の境界が読みにくく、面によって挙動が変わるのを避けるため、`::selection { background; color }` を対で書き、選択中の文字は面の primary にする（明るい面 13.55 / インク面 8.17 / ポスター面 8.64）。

リングを面ごとに 3 トークンに分けるのは（DECISION C-8 改）、ライムではポスター面の明度が反転するため。明るい面は `focus/ring` lime-700（4.46）、インク面は `focus/ring-inverse` lime-300（12.79）、ポスター面（lime-400）は `poster/focus/ring` lime-900（5.72）。lime-300 を lime-400 面に置くと 1.18 で消え、lime-700 でも 3.25 と余裕がない。

#### 1.3.7 アクション（ボタン）

ページの主要アクションはインク色ボタン。アクセント塗りボタンはライブラリのみ（ポスター面と競合させない、DECISION C-18）。

| ロール | 値 | Scopes | 使用箇所 | 比 |
|---|---|---|---|---|
| `color/action/fill` / `fill-hover` / `fill-pressed` | neutral-950 / 800 / 700 | FF | ナビ CTA「参加する」、Mobile メニュー CTA、スキップリンク | ラベル 14.86 / 9.04 / 5.83 |
| `color/action/ink` | neutral-100 | TF SF | 同ラベルとアイコン | — |
| `color/inverse/action/fill` / `fill-hover` / `fill-pressed` | neutral-100 / 200 / 300 | FF | ヒーロー主ボタン（**インク面のみ**） | ラベル 14.86 / 13.51 / 11.19 |
| `color/poster/action/fill` | Mono → inverse/action/fill (neutral-100) / Lime neutral-950 | FF | ポスター CTA の面 | 面 vs ポスター 14.86 / 10.83 |
| `color/poster/action/fill-hover` | Mono → inverse/action/fill-hover (neutral-200) / Lime neutral-800 | FF | 同ホバー。汎用 `action/fill-hover` を直接引くと Mono で反転しないので専用ロールにする（C-28 の原則をホバーにも通す） | 13.51 / 7.61 |
| `color/poster/action/fill-pressed` | Mono → inverse/action/fill-pressed (neutral-300) / Lime neutral-700 | FF | 同プレス。ホバーの次の 1 段 | 11.19 / 5.29 |
| `color/poster/action/ink` | Mono → inverse/action/ink (neutral-950) / Lime neutral-100 | TF SF | 同ラベルとアイコン | 14.86 / 14.86 |
| `color/inverse/action/ink` | neutral-950 | TF SF | 同ラベルとアイコン | — |

規則（DECISION C-10）: ホバーは基底から中間調へ 1 段（950 → 800。900 は 950 との差 1.18 で区別できないため飛ばす）、プレスはさらに 1 段（700、800 との差 1.55）。Apple の「押下は即時、ホバーより強く」に従い、プレスがホバーの手前に戻ることはない。アウトライン・ゴースト・アイコンボタンはラベルを ink（インク面は inverse/ink）に固定し、状態は `state/*` のティントだけで示す。ティント上にアクセント文字を置かない（DECISION C-24: 600 は pressed-tint 上 4.59 で余裕がない）。マーキー停止／再生ボタンとスキップリンクは上記と `divider` / `focus/ring` で足り、専用ロールを置かない。

#### 1.3.8 部品固有

| ロール | 値 | Scopes | 使用箇所 | 根拠 |
|---|---|---|---|---|
| `color/chip/ink` | → ink-secondary | TF SF | タグ文字（Caption 12 R）、リアクションチップのアイコン。チップの数値（Caption 12 B）は `ink` | `chip/fill`（n200）上 5.30。タグとチップは同一装置（DECISION C-11 改、R2） |
| `color/avatar` | neutral-300 | FF | チャットアバター矩形 | 上の頭文字 11.19 |
| `color/image/placeholder` | → surface | FF SF | 空の画像スロット | 罫線と同居しても濁らない |
| `color/image/caption` | → ink-secondary | TF | スロット内キャプション（制作時のみ表示） | surface 上 5.30 |
| typing dot | → ink-tertiary | SF | 入力中インジケータの 3 点 | 図形 3.85 ≥ 3:1（`ink-tertiary` に直接バインド、専用ロールなし） |
| placeholder アイコン | → ink-tertiary | SF SC | `Icon/Photo` | surface 上 3.50 |
| `color/shadow` | `alpha/ink/24` | — | `shadow/sm` / `md` / `lg` の色（ライブラリ。ページに影はない） | 影は 1 濃度、段差は幾何（§4.4） |
| `color/backdrop` | `alpha/ink/48` | FF | ダイアログの幕（ライブラリ）。`prefers-reduced-transparency` / `prefers-contrast: more` では `alpha/ink/88` | 幕は面を半分に落とす |
| アイコン | currentColor | — | すべての Tabler アイコン | 行のテキスト色を継ぐ。アイコン専用トークンは置かない。最薄値は ink-tertiary |

### 1.4 コントラストマトリクス

区分: N = 通常テキスト（4.5）、L = 大テキスト（3.0）、U = UI 部品・図形（3.0）、— = 装飾（対象外）。Title 3 Caps 19 EB は ≥ 18.66 Bold で L。

#### 1.4.1 グラウンド `#f3f2f2`

| ロール | 代表用途（ロール名） | 区分 | 比 | 判定 | 修正 |
|---|---|---|---|---|---|
| ink | Title 1 32 EB、Title 2 / 3 / Headline、Display M 56 EB、Label Nav 14 R、Title 3 Caps 19 EB、Caption 12 B | N | 14.86 | PASS | — |
| ink-secondary | Body S / M 14–15 R、Footnote 13 R / B、Caption 12 R / B、Overline 12 B、Subheadline 15 B、Overline JP 12 B（Mono バッジ） | N | 5.83 | PASS | コンセプト n600 3.85 / n500 2.59 / ink@55 3.66 → FAIL。すべて 700 に統一 |
| ink-tertiary | マーキーゴースト Title 3 Caps 19 EB | L | 3.85 | PASS | コンセプト ink@40 2.41 → 大テキストでも FAIL |
| ink-tertiary | Mono 区切り `asterisk`、typing dot、placeholder アイコン | U | 3.85 | PASS | コンセプト n400 1.80 / n500 2.59 → FAIL |
| accent-text | リンクプレス Label Nav 14 R、Footnote 13、Title 3 19 EB | N | 5.79 | PASS | — |
| accent-text-small | 活動バッジ Overline JP 12 B | N | 7.85 | PASS | コンセプト赤 3.76 → FAIL。lime-900 を採用（lime-700 は 4.46 で不足） |
| link/hover | ナビ・ワードマークのホバー下線 2px | U | 5.79 | PASS | — |
| link/current | 現在地の下線 2px（ink） | U | 14.86 | PASS | — |
| pop/separator (lime-700) | マーキー区切りアイコン | U | 4.46 | PASS | 図形なので 3:1。文字には使わない |
| focus/ring | 2px リング | U | 5.79 | PASS | — |
| divider | 2px / 1px 罫線 | — | 2.59 | n/a | 装飾。3:1 が必要になれば ink-tertiary（3.85） |

#### 1.4.2 サーフェス、ティント、塗り

| ロール | 下地 | 代表用途 | 区分 | 比 | 判定 |
|---|---|---|---|---|---|
| ink | surface | Callout 14 B（相手側バブル、ペルソナ引用）、チップ数値 Caption 12 B | N | 13.51 | PASS |
| ink-secondary | surface / chip/fill | Caption 12 R（画像キャプション、タグ文字）、チップアイコン | N / U | 5.30 | PASS |
| ink-tertiary | surface | placeholder アイコン | U | 3.50 | PASS |
| chip/fill | ground / hover-tint / pressed-tint | チップの面 | — | 1.10 / 1.03 / 1.15 | 装飾（面の差で読む） |
| ink | hover-tint / pressed-tint | 活動セルタイトル Display M、Mobile メニュー行 Label Nav、ボタンラベル | N | 13.21 / 11.78 | PASS |
| ink-secondary | hover-tint / pressed-tint | 活動セルの Subheadline 15 B、Body S 14 R、Mono バッジ Overline JP 12 B | N | 5.19 / 4.62 | PASS |
| accent-text-small | hover-tint / pressed-tint | 活動バッジ Overline JP 12 B | N | 6.97 / 6.22 | PASS |
| ink | selection | 選択テキスト（文字色を ink に強制） | N | 10.23 | PASS（ink-secondary のままなら 4.02 で FAIL） |
| ink | avatar (300) | 頭文字 Caption 12 B | N | 11.19 | PASS |
| action/ink | action/fill / -hover / -pressed | ナビ CTA Label S 14 B | N | 14.86 / 9.04 / 5.83 | PASS |
| on-accent-subtle | accent-subtle | ライブラリ強調セル | N | 8.06 | PASS |
| on-accent | accent / -hover / -pressed | ライブラリ主ボタン | N | 5.79 / 7.24 / 8.89 | PASS |
| focus/ring | surface / hover-tint / pressed-tint | リング | U | 5.26 / 5.14 / 4.59 | PASS |

#### 1.4.3 インク面 `#201e1d`（ヒーロー、ベントのインクセル、Mono ポスター）

| ロール | 代表用途 | 区分 | 比 | 判定 | 修正 |
|---|---|---|---|---|---|
| inverse/ink | Display XL 124 EB、Title 3 19 EB、Display M 56 EB、Callout 14 B、Label M 15 B | N | 14.86 | PASS | — |
| inverse/ink-secondary (88 %) | ヒーロー段落 Body L 16 R、CTA サブ Footnote 13 R | N | 11.78 | PASS | コンセプト n300 11.19 / ground@70 7.89 を 1 値に統合 |
| inverse/ink-tertiary (72 %) | ヒーローメタ Overline 12 B、統計キッカー Overline 12 B | N | 8.29 | PASS | コンセプト n400 8.27 / ground@60 6.15 を統合 |
| inverse/ink-quaternary (48 %) | 導入句「仲間と、」Display XL 124 EB | L | 4.45 | PASS | コンセプト n500 5.75。ディスプレイ限定 |
| inverse/outline (100 %) | 副ボタンの 1px 枠 | U | 14.86 | PASS | コンセプト ground@55 5.41 / 100 を 1 種に統合 |
| inverse/ink | inverse hover-tint / pressed-tint 上 | N | 10.58 / 7.06 | PASS | — |
| inverse/action/ink | inverse/action fill / -hover / -pressed | N | 14.86 / 13.51 / 11.19 | PASS | — |
| accent-on-ink (lime-400) | ヒーロー下線 | U | 10.83 | PASS | — |
| focus/ring-inverse (lime-300) | リング（ink / inverse hover-tint 上） | U | 12.79 / 9.11 | PASS | — |
| inverse/ink | inverse/selection 上（lime-400@24） | N | 8.17 | PASS | — |
| inverse/hairline (900) | 格子線 | — | 1.18 | n/a | テクスチャ |

#### 1.4.4 アクセント面 `#9ae600`（Lime のポスターのみ。**明るい面**）

ポスター面は Lime では明るい面になるため、テキストは `inverse/*`（グラウンド × α）ではなく **インク × α** の梯子で組む。

| ロール | 代表用途 | 区分 | 比 | 判定 | 修正 |
|---|---|---|---|---|---|
| poster/ink (neutral-950) | 見出し Display L 96 EB、ソーシャルホバー Overline 12 B | N | 10.83 | PASS | — |
| poster/ink-secondary (ink@88) | キッカー Overline 12 B、段落 Body M 15 R、ソーシャル静止 Overline 12 B | N | 8.23 | PASS | 面が反転したため ground@88 → ink@88 に差し替え |
| （参考）ink@72 | — | N | 5.32 | PASS | 数値上は使えるが抑制原則で使わない（階層は 2 段） |
| （参考）ink@48 | — | N | 2.79 | FAIL | アクセント面で禁止 |
| poster/action/fill (neutral-950) / hover (neutral-800) | インク色 CTA ボタンの面 | U | 10.83 / 7.61 | PASS | ラベルはグラウンド 14.86 / 10.45 |
| poster/focus/ring (lime-900) | リング | U | 5.72 | PASS | lime-300 なら 1.18、lime-700 でも 3.25 で余裕なし |
| poster/ink | poster/selection (ink@12) 上 | N | 8.64 | PASS | secondary も 6.57 で N |
| ground 系のアウトラインボタン | アウトラインボタン | U | 1.53 | FAIL | アクセント面ではアウトラインボタンを使わない（塗りボタンのみ） |

### 1.5 ルール

#### 1.5.1 アクセントの出現場所

| 出現 | Mono | Lime accent | 値 |
|---|---|---|---|
| フォーカスリング | ○ | ○ | 700（明るい面）/ 300（インク面）/ 900（ポスター面） |
| 選択範囲 | ○ | ○ | 400@24（明るい面・インク面）/ ink@12（ポスター面） |
| テキストリンクのホバー下線（ナビ・ワードマーク） | ○ | ○ | 800、2px |
| テキストリンクのプレス文字 | ○ | ○ | 900 |
| マーキー区切りアイコン | — | ○ | 700 |
| 活動バッジ文字 | — | ○ | 800 |
| ポスター面 | — | ○ | 400 |
| ヒーロー回転語の下線 | — | ○ | 400（インク面上） |
| 上記以外（見出し、アイコン、ボタン塗り、罫線、写真の着色、ホバー中の文字色） | × | × | — |

- Mono の 4 出現はすべて一時的状態（hover / pressed / focus / selection）。持続状態（`aria-current`、静止テキスト）にアクセントを使わない。
- **段は面で決まる**。明るい地の上では 700（図形のみ）/ 800（文字）/ 900（12px 以下の文字）。インク面とポスター面では 400（面・印）。この二極を混ぜない。
- アクセントを文字に使うときの下限: 13px 以上は 800（6.31）、12px 以下は 900（7.85）。lime-700 は 4.46 で AA を割るため文字に使わない。ティント面にはアクセント文字を置かない（バッジのみ例外、900 で 6.22）。
- インク面のアクセントは印（下線・選択）だけで、値は 400。数値上は 10.83 で文字も通るが、抑制原則により文字には使わない。
- 明るい地の上で lime-400 を**面**として使わない（1.37。C-25）。地の上のアクションは `action/fill`（インク）で、ライムは大面・印・状態に限る。
- アクセント塗りは面積の大きい順に「ポスター > 何もない」。2 つ目のアクセント面を足したくなったら、それはアクセントではなく新しいセクション色であり、本システムの外。
- 既定モードは **Lime accent**、Mono は検証モード（DECISION C-17、2026-09-01 クライアント確定）。

#### 1.5.2 暗い面

- テキストは `inverse/*` の梯子だけを使い、実色のニュートラルを置かない（ティントが面の色相を継がなくなる）。
- インク面: primary / secondary / tertiary を使用可、quaternary はディスプレイサイズのみ。
- アクセント面（Lime のポスター）: primary / secondary のみ。**明るい面**なのでテキストはインク × α、状態は `state/*`（インクのアルファ）を使う。ボタンはインク塗りのみ、アウトライン不可。リングは `poster/focus/ring`（900）。
- ヒーロー・ベントのインクセルはモードで変わらない。モードが差し替えるのはポスターの面とヒーロー下線だけ。

#### 1.5.3 Do / Don't

| Do | Don't |
|---|---|
| 罫線を見せる。区切りは divider の太さで、色で差をつけない | 罫線を 500 より薄くしてヘアライン化する（「強い 2px」が消える） |
| 明るい面の文字は ink / ink-secondary の 2 段。差は size / weight / case で | n600 / n500 / n400 を小さな文字に使う。3 段目の灰色を作る |
| 大きなゴースト文字・アイコン・点は ink-tertiary を床にする | アイコンや点を divider 色（2.59）で描く |
| 暗い面ではグラウンドのアルファで階層を組む | 暗い面に n300 / n400 を実色で置く |
| リンクは下線で示し、ホバーは下線（ナビは 2px アクセント）、プレスは文字を 600 | ホバーで文字色だけを変える。持続状態にアクセントを使う |
| ホバー／プレスは反対の極のアルファ | ホバーにアクセント塗りを使う（フォーカスと区別がつかない） |
| 写真・ロゴは原色のまま（U-21） | 写真をライムでデュオトーンにする、セピアにする、白黒にする |
| 新しい色が要るときは既存の段から選び、比を再計算する | 段の間の値を作る（ランプが「値の袋」に戻る） |
| Mono で先に検証する | Lime でしか読めない設計 |

#### 1.5.4 日本語固有

- 12px 以下の和文補助文字（Overline JP、Caption）は ink-secondary（5.83）が床。画数の多いグリフは同じ比でも細く見えるため、これらは Bold 700 で組む（§2.2.4）。
- 和欧混植の 1 行は 1 つの色トークンで組む。英字部分だけを別色にしない。
- 段落は ink-secondary で 14px 以上。ティント面（surface、hover-tint、pressed-tint）に日本語段落が乗る場合も同じトークンで 4.62 以上を保証済み。
- 明るい面の文字にアルファを使わない。アルファ文字は平坦でない地（写真・ティント・モード切替）で合成結果を検証できず、Figma でエイリアスにもできない。反転面で例外的に許すのは、面が 2 色（ink / lime-400）に限定され、両方を §1.4.3 / §1.4.4 で検算済みだから。
- 選択範囲では文字色を面の primary に強制する（§1.3.6）。ink-secondary の和文は選択上 4.02 で AA を割る。

#### 1.5.5 高コントラスト（`prefers-contrast: more`）

§7.5 はこの表の名前で参照する。フォーカスリングの太さは §4.2（3px）。

| 通常 | 高コントラスト | 比 |
|---|---|---|
| `ink-secondary` (700) | → `ink` | 14.86 |
| `ink-tertiary` (600): ゴースト文字、アイコン、点 | → `ink-secondary` | 5.83 |
| `divider` / `divider-hairline` (500) | → neutral-700 | 5.83（線が 3:1 を超える） |
| `inverse/ink-secondary` / `-tertiary` / `-quaternary` | → `inverse/ink` 100 % | 14.86 / 5.79 |
| `accent-text` / `accent-text-small` / `pop/badge` | → lime-900 | 7.85 |
| `state/hover-tint` 6 → 12、`state/pressed-tint` 12 → 24 | — | ink 11.78 / 9.05 |
| `inverse/state/*` | 変更なし | ラベルは inverse/ink 100 % で 10.58 / 7.06。48 % に上げると ground ラベルが約 3.4 で N 不合格 |
| `inverse/hairline` | 変更なし（テクスチャ） | — |
| `backdrop` 48 → 88 | `prefers-reduced-transparency` と同値 | — |

CSS 変数名は Figma 名の `/` を `-` に置換する（例 `--color-inverse-ink-secondary`）。アルファは `color-mix(in srgb, var(--color-ground) 88%, transparent)` で表現し、合成値をハードコードしない（固定値が要る `prefers-reduced-transparency` だけ §1.2.3 の合成 hex を使う）。

---
## 2. Typography

書体は **LINE Seed JP のみ**（Regular 400 / Bold 700 / ExtraBold 800。Thin は使わない）。本章が決めるのはサイズ・ウェイト・行送り・トラッキング・大文字化・段落間隔・和文組版規則・部品スロットとロールの対応。色は §1 のトークン名、行長の px と余白は §3、記号→アイコンの置換は §5 / §9、ヒット領域とボタン寸法は §6 を参照する。

計測根拠: `LINESeedJP-*.ttf` のメトリクス（`typo-metrics.mjs`）。

### 2.0 書体の事実（設計の前提）

| 項目 | 値 | 設計への含意 |
|---|---|---|
| UPM / hhea ascender / descender / lineGap | 1000 / 932 / −168 / 0（`USE_TYPO_METRICS` 有効） | `line-height: normal` = **1.10**。これ未満の行送りは content area が重なる → ディスプレイ帯の下限 |
| 漢字の字面（ExtraBold「仲」） | x 0.012–0.955em、y −0.089–0.851em | 字面幅 0.94em、左右サイドベアリング合計 ≈ **0.06em**。−2% を超える詰めは太字で字面が接触する → 負トラッキングの上限 |
| cap-height / x-height | Regular 0.751 / 0.509em、Bold 0.758 / 0.524em、ExtraBold 0.773 / 0.548em | x/cap ≈ 0.68–0.71 と大きく、12px でも読める。12px を最小サイズにできる根拠 |
| 欧文小文字の平均送り幅 | Regular 0.566em、Bold 0.609em、ExtraBold 0.649em | 欧文は全角 1em に対し約 0.6em/字で行長換算 |
| 全角文字の送り幅 | すべて 1.000em（かな・漢字・約物） | `palt` を使わない限り「n 文字 = n em」で幅が計算でき、見出しの収まりを設計段階で保証できる（§2.6.3） |
| 実測幅（ExtraBold） | Talk Day 5.15em、Dev Day 4.84em、Project 4.12em、ChoTech 5.12em、50+ 2.13em | Display M の欧文 1 行判定に使用 |
| 数字 | プロポーショナル（0 = 0.725em）。**`tnum` なし** | 桁揃えは不可。統計「50+」は 1 値なので不要。`tabular-nums` 指定は無効（書体に無い） |
| GSUB | `palt pwid halt hwid fwid liga dlig kern…` | `palt` / `halt` は **使用しない**（§2.6.2） |
| name table | Regular/Bold: family "LINE Seed JP"。ExtraBold: legacy family "LINE Seed JP ExtraBold" + typographic family "LINE Seed JP" / subfamily "ExtraBold" | Figma は `{family:"LINE Seed JP", style:"ExtraBold"}` を `listAvailableFontsAsync()` で確認。見つからない環境では `{family:"LINE Seed JP ExtraBold", style:"Regular"}` が同じファイル |

### 2.1 原則

| # | 原則 | 規則 | 根拠 |
|---|---|---|---|
| P1 | 階層は「ウェイト × サイズ × 行送り」の組で作る | 各ロールは 3 値をセットで持つ。構造（17px 以上の見出し・ディスプレイ）は 800、声（ラベル・強調・会話・キッカー、12–15px）は 700、読む本文は 400 | Apple「Build hierarchy from weight + size + leading as a set」。ウェイトは面積を増やさずに存在感を足せる。14–15px の ExtraBold は漢字のカウンターが潰れる |
| P2 | トラッキングは帯ごとに固有 | ディスプレイ帯 −2%、Title 1 −1%、本文・ラベル 0、大文字ラベルのみ正（+3 / +6 / +12%）。ロールは両モードで同じ値を持つ | 大きな文字は離れて見え、小さな大文字は詰まって見える（Apple WWDC20 *Details of UI Typography*）。1 つのモードの中で同じサイズが異なる値を持つことはない（§2.2.3） |
| P3 | 行送りは整数 px、サイズに反比例 | ディスプレイ 1.10–1.13 → 見出し 1.25–1.40 → 1〜3 行のライン系 1.5–1.6 → 段落 1.7–1.75。値は偶数 px に丸めて Figma 変数で持つ | 日本語段落の可読域は 1.6–1.8。偶数にすると half-leading が整数になり em ボックスがピクセルに乗る。ディスプレイは書体の `normal`（1.10）を下限にして行の重なりを避ける |
| P4 | 常に左揃え、両端揃え禁止 | `text-align: start`。ボタンラベルもプレースホルダも左。中央揃えはページ上に存在しない | コンセプトの骨格（flush-left everything）。日本語の両端揃えは字間が不均一になる |
| P5 | 和欧混植は一書体、アキは入れない | 欧文・数字も LINE Seed JP。和欧間に手動スペースを入れず、自動アキ（`text-autospace`）も無効にする | 同一書体なのでベースラインが揃う。Figma に自動アキはないため、有効にすると Figma と CSS の幅が一致しなくなる（§2.6.2） |
| P6 | 最小サイズ 12px、例外なし | 12px 未満のスタイルを持たない。コンセプトの 10 / 11px はすべて 12 に上げる | 12px で字面 ≈ 11px。11px の和文は画数の多い字が潰れる。Latin 大文字にも例外を置かない（R10） |
| P7 | 文字色は §1 のトークンで束縛し、AA を計算で確認する | 本文 4.5:1、大きな文字（≥ 24px、または ≥ 18.66px かつ 700 以上）3:1。ロールは §1 のトークン名だけを参照し、hex を持たない | 本章は各ロールが置かれる面ごとに比を再計算する（§2.4） |

### 2.2 スケール

#### 2.2.1 サイズの梯子

`12 · 13 · 14 · 15 · 16 · 17 · 19 · 22 · 26 · 32 · 40 · 56 · 72 · 96 · 124`（72 は未使用の予備段）

| 帯 | 段 | 段差 | 根拠 |
|---|---|---|---|
| Text | 12 · 13 · 14 · 15 · 16 · 17 | +1px（≈ ×1.07） | 読むサイズでは 1px が知覚できる最小の階層差。HIG の 11/12/13/15/16/17 と同じ発想 |
| Heading | 19 · 22 · 26 · 32 | ×1.16–1.23 | 見出し同士は「一段大きい」と分かる比率が要る。1px 刻みは無意味 |
| Display | 40 · 56 · 72 · 96 · 124 | ×1.29–1.40 | ポスター的な段差。Mobile ではこの帯を連続段（26 · 32 · 40 · 56）に圧縮し序列を保つ |

半端な値（10 / 11 / 12.5 / 13.5 / 18 / 20 / 24 / 34 / 52）は使わない。コンセプトの値は最寄りの段に丸めた（§10）。（DECISION T-1、T-2）

#### 2.2.2 行送り（整数 px）

| 帯 | ロール | 目標比 | 丸め | 結果 D / M |
|---|---|---|---|---|
| Display | XL / L / M | 1.10（書体の `normal`）を下限 | 切り上げて偶数 | 138/62 · 106/44 · 62/36（1.10–1.13） |
| Heading | Title 1 / 2 / 3 · Headline | 1.25 / 1.30 / 1.35 / 1.40 | 最寄りの偶数 | 40/32 · 28 · 26 · 24 |
| Line（≤ 3 行） | Subheadline / Callout / Footnote / Caption | 1.60 / 1.55 / 1.55 / 1.50 | 最寄りの偶数 | 24 · 22 · 20 · 18 |
| Paragraph | Body L / M / S | 1.75 / 1.70 / 1.70 | 最寄りの偶数 | 28 · 26 · 24 |
| Label（1 行） | Label M / S / Nav · Overline | 固定 | 4 の倍数 | 20 · 20 · 20 · 16 |

- Title 1 だけ 1.25（見出し帯の 1.2 より広い）: 行ボックス 40 が 4px モジュールに乗り、セクション上部のリズム（rule → 64 → h2 40 → 32）を整数で組める。
- Label 帯は行ボックスを固定する: 36px コントロール = 8 + 20 + 8、44px = 12 + 20 + 12（§3 `size/control/sm` / `md`）。Overline 16 は 12px の 1 行ラベルで、キッカー→内容の `stack/md` 16 と同じ高さ。
- 段落間隔（Figma `paragraphSpacing` / CSS `margin`）: Body L / M / S とも **12**（`stack/sm`）。行間の白（行送り − サイズ = 10–12px）と同量を足し、段落の切れ目が行間の 2 倍の白になる。他ロールは 0。（DECISION T-14）

#### 2.2.3 トラッキング

| 値 | 適用 | 根拠 |
|---|---|---|
| −2% | Display XL / L / M（両モード） | 大きな文字は離れて見える。上限は ExtraBold 漢字のサイドベアリング合計 0.06em: −2% でも 124px で 4.6px、32px で 1.2px の余白が残る |
| −1% | Title 1 | 見出し帯の最上段だけ半分の詰め。Title 2 以下は字面が小さく詰める必要がない |
| 0 | Title 2 以下、本文、ラベル | 書体の既定 |
| +3% | Title 3 Caps | 大文字 1 行の帯。走査に耐える最小の開き |
| +6% | Overline/JP | 全角ボックスが既に空くため欧文の半分 |
| +12% | Overline/Latin | 小さな大文字は詰まって見える。正側は 3 → 6 → 12 の倍々で 1 本の梯子 |

1 つのモードの中で同じ px が異なるトラッキングを持つ組はない（Desktop: 124/96/56 = −2、32 = −1。Mobile: 56/40/32 = −2、26 = −1）。Display M Mobile 32（−2%）と Title 1 Desktop 32（−1%）はモードが異なり同一画面に現れない。（DECISION T-4）

#### 2.2.4 ウェイト

`font-weight` は 400 / 700 / 800 の 3 値だけを宣言する（500・600 は書かない。`font-synthesis: none`）。斜体は書体に無いので使わない。

| ウェイト | 適用 | 規則 |
|---|---|---|
| 800 ExtraBold | Display XL / L / M、Title 1 / 2 / 3 / 3 Caps、Headline | **17px 以上のみ**。構造 |
| 700 Bold | Subheadline、Callout、Footnote/Bold、Caption/Bold、Label M / S、Overline | 12–15px の声（ラベル・強調・会話・キッカー） |
| 400 Regular | Body L / M / S、Footnote、Caption、Label/Nav | 読む本文と、目立たせない 1 行ラベル |

### 2.3 タイプランプ

#### 2.3.1 ロール定義

サイズ・行送りは Desktop / Mobile（単一値は両モード同値）。行送りは px（括弧は比）。トラッキングは em 比。色は §1 のトークン名（スタイルは色を持たない）。

| ロール | サイズ D / M | W | 行送り D / M | LS | Case | 行数・行長 | 色トークン | 用途 |
|---|---|---|---|---|---|---|---|---|
| **Display/XL** | 124 / 56 | 800 | 138 / 62（1.11） | −2% | — | 1 行 ≤ 9 全角（D）。M は読点で 2 行 | `color/inverse/ink`（回転語）、`color/inverse/ink-quaternary`（導入句） | ヒーロー h1「仲間と、学ぶ。」 |
| **Display/L** | 96 / 40 | 800 | 106 / 44（1.10） | −2% | — | 2 行（著者改行）。1 行 ≤ 12 全角（D）/ ≤ 8 全角（M） | `color/poster/ink` | ポスター「いっしょに、／やろう。」 |
| **Display/M** | 56 / 32 | 800 | 62 / 36（1.11 / 1.13） | −2% | — | 1 行、欧文 ≤ 10 字 | `color/ink`、統計は `color/inverse/ink` | 活動タイトル Talk Day / Dev Day / Project、統計「50」 |
| **Title/1** | 32 / 26 | 800 | 40 / 32（1.25 / 1.23） | −1% | — | 1 行 ≤ 12 全角（M は 2 行可） | `color/ink`、「+」は `color/inverse/ink` | セクション h2 ×5、統計の「+」（range） |
| **Title/2** | 22 | 800 | 28（1.27） | 0 | — | ≤ 2 行 | `color/ink` | ベント 2×1 見出し、リーダー名 |
| **Title/3** | 19 | 800 | 26（1.37） | 0 | — | ≤ 2 行 | `color/ink` / `color/inverse/ink` | ベント 1×1（中）見出し、CTA セル見出し、ヒーローのリード文、ナビのワードマーク |
| Title/3 Caps | 19 | 800 | 26 | +3% | UPPER | 1 行 | `color/ink`、ゴーストは `color/ink-tertiary` | マーキー項目 |
| **Headline** | 17 | 800 | 24（1.41） | 0 | — | ≤ 3 行 | `color/ink` | ベント 1×1（小）見出し、ペルソナ見出し、スタッフ名、フッターのワードマーク |
| **Subheadline** | 15 | 700 | 24（1.60） | 0 | — | ≤ 2 行 | `color/ink-secondary` | 活動サブタイトル（Display M とベースライン揃え） |
| **Callout** | 14 | 700 | 22（1.57） | 0 | — | ≤ 3 行 | `color/ink`（surface 上）/ `color/inverse/ink` | チャット吹き出し、ペルソナ引用 |
| **Body/L** | 16 | 400 | 28（1.75） | 0 | — | 35–45 全角（§2.6.3） | `color/inverse/ink-secondary` | ヒーロー段落（反転地の長文は行送りを最大に） |
| **Body/M** | 15 | 400 | 26（1.73） | 0 | — | 35–45 全角 | `color/poster/ink-secondary` | ポスター段落 |
| **Body/S** | 14 | 400 | 24（1.71） | 0 | — | 35–45 全角 | `color/ink-secondary` | 活動説明、パートナー導入、ベント本文。段落として許す最小サイズ |
| **Footnote/Regular** | 13 | 400 | 20（1.54） | 0 | — | ≤ 2 行 | `color/ink-secondary` / `color/inverse/ink-secondary` | フッターリンク、リーダー紹介、CTA セル副文 |
| Footnote/Bold | 13 | 700 | 20 | 0 | — | ≤ 2 行 | `color/ink-secondary`、インラインリンクは `color/ink` | ペルソナ推薦、パートナー申込リンク |
| **Caption/Regular** | 12 | 400 | 18（1.50） | 0 | — | ≤ 2 行 | `color/ink-secondary`、タグは `color/chip/ink` | ©、入力中…、チャット注記、タグ、画像キャプション、スタッフ紹介 |
| Caption/Bold | 12 | 700 | 18 | 0 | — | 1 行 | `color/ink-secondary`（タグライン）、`color/ink`（頭文字・数） | Hack Your Limits.、アバター頭文字、リアクション数 |
| **Label/M** | 15 | 700 | 20（1.33） | 0 | — | 1 行 ≤ 12 全角、折返し禁止 | ボタンの ink トークン（§6.2） | 44px コントロール（`size/control/md`）: ヒーロー・ポスター・ベント CTA、Mobile ナビ CTA・スキップリンク |
| Label/S | 14 | 700 | 20（1.43） | 0 | — | 1 行 | 同上 | 36px コントロール（`size/control/sm`）: Desktop ナビ CTA・スキップリンク |
| Label/Nav | 14 | 400 | 20（1.43） | 0 | — | 1 行 | `color/ink` | ナビリンク、Mobile メニュー行 |
| **Overline/Latin** | 12 | 700 | 16（1.33） | +12% | UPPER | 1 行 | `color/ink-secondary` / `color/inverse/ink-tertiary` / `color/poster/ink-secondary` | セクション番号、セルキッカー、CASE 01、ヒーローメタ（欧文）、統計キッカー、JOIN US、ソーシャルリンク、役職（欧文）、YOUR LOGO HERE、マーキーラベル |
| Overline/JP | 12 | 700 | 16 | +6% | ORIGINAL | 1 行 | `color/ink-secondary` / `color/inverse/ink-tertiary`、活動バッジは `color/pop/badge` | ヒーローメタ（和文）、役職（和文）、活動バッジ「月1〜2回」、チャット見出し |

ラベルのサイズはコントロール高で決まる（36 → Label/S、44 → Label/M）。1px の差は階層ではなく、行ボックス 20 を両方の高さで中央に置くための調整。（DECISION T-9、T-10）

#### 2.3.2 部品スロット → ロール対応（単一参照）

§6 はこの表を参照し、px を再記述しない。「概念」列は元の値（サイズ / 行送り / LS）。行ボックスはヒット領域の計算（§6.1.5）と Rule 1/V の高さ（§6.5）の入力。

| セクション | スロット | 概念 | ロール（サイズ / 行送り） | 色トークン | 変更 |
|---|---|---|---|---|---|
| Nav | ワードマーク ChoTech | Archivo 800 18 | Title/3（19 / 26） | `color/ink` | 書体統一、18 → 19 |
| Nav | タグライン Hack Your Limits. | 12 B | Caption/Bold（12 / 18） | `color/ink-secondary` | Rule 1/V の高さ = `size/rule-v` 12 |
| Nav | リンク About … | 14 R | Label/Nav（14 / 20） | `color/ink` | 段落ロールから分離 |
| Nav | CTA 参加する（36） | 14 EB | Label/S（14 / 20） | §6.2 | 800 → 700 |
| Nav | Mobile CTA（44）、メニュー行 | — | Label/M / Label/Nav | §6.2 | 新設部品 |
| Nav | スキップリンク | — | Label/S（D）/ Label/M（M） | §6.2 | 新設 |
| Hero | メタ SINCE 2025 · 長崎大学公認 学生団体 · サポーターズ 技育プロジェクト 学生団体公式パートナー · MEMBERS 50+ | 12 / +14% · +6% | Overline/Latin + Overline/JP（12 / 16、range） | `color/inverse/ink-tertiary` | +14 → +12。区切りは 1×12 hairline（§4.3）。折返しあり（DECISION U-13） |
| Hero | h1 導入「仲間と、」 | 124 / 104% / −2% | Display/XL | `color/inverse/ink` | 行送り 138。quaternary → ink（DECISION U-3） |
| Hero | h1 回転語「学ぶ。」 | 同 | Display/XL | `color/hero/word`（Mono inverse/ink 14.86 / Lime lime-400 10.83） | 同 |
| Hero | リード 長崎にテック好きのためのハブを。 | 18 EB | Title/1 | `color/inverse/ink` | 18 → 32（DECISION U-5） |
| Hero | 段落 | 16 / 175%、36em | Body/L（16 / 28） | `color/inverse/ink-secondary` | 行長は `measure/paragraph` |
| Hero | ボタン ×2（44） | 15 EB | Label/M | §6.2 | 800 → 700 |
| Marquee | ラベル PARTNERS | 11 / +16% | Overline/Latin | `color/ink-secondary` | 11 → 12、+16 → +12 |
| Marquee | 項目 長崎大学 / パートナー募集中 | 20 / +3% | Title/3 Caps（19 / 26） | `color/ink` | 20 → 19。帯高 `size/band-marquee` 56（R6） |
| Marquee | ゴースト YOUR COMPANY HERE | 20、ink@40 | Title/3 Caps | `color/ink-tertiary` | 大きな文字 3:1 → 3.85 |
| Section | ラベル ACTIVITY | 12 / +14% | Overline/Latin | `color/ink-secondary` | +12%。連番は廃止し、和文の題の**後ろ**に置く（U-4） |
| Section | h2 | 34 / 112% / −1.5% | Title/1（32 / 40、M 26 / 32） | `color/ink` | 34 → 32、−1% |
| Bento | キッカー CULTURE … | 10 / +14% | Overline/Latin | `color/ink-secondary`、統計セルは `color/inverse/ink-tertiary` | 10 → 12 |
| Bento | 2×1 見出し | 24 | Title/2（22 / 28） | `color/ink` | 24 → 22 |
| Bento | 1×1 中 / 小 見出し | 19 / 17 | Title/3 / Headline | `color/ink` | — |
| Bento | 本文 | 13.5 / 170% | Body/S（14 / 24） | `color/ink-secondary` | 13.5 → 14 |
| Bento | 統計 50 + | 56 + 34 | Display/M + Title/1（range、ベースライン揃え） | `color/inverse/ink` | 34 → 32。`tabular-nums` 不要 |
| Bento | チャット見出し #general — いつものChoTech | 10 UPPER | Overline/JP（ORIGINAL） | `color/ink-secondary` | ブランド名を大文字化しない |
| Bento | アバター頭文字 | 12 B | Caption/Bold | `color/ink`（`color/avatar` 上） | — |
| Bento | 吹き出し | 13.5 B | Callout（14 / 22） | `color/ink`（surface）/ `color/inverse/ink`（ink） | 13.5 → 14 |
| Bento | リアクション数 3 / 4 | 11 | Caption/Bold | `color/ink` | 絵文字はそのまま 👍 / 👀（U-25、§9.6） |
| Bento | 入力中…、注記 こんな会話が、毎日どこかで。 | 12 | Caption/Regular | `color/ink-secondary` | 「↑」は削除（§9.6） |
| Bento | CTA セル見出し / 副文 | 19 / 12.5 | Title/3 / Footnote/Regular | `color/inverse/ink` / `color/inverse/ink-secondary` | 12.5 → 13 |
| Bento | CTA ボタン（44） | 14 EB | Label/M | §6.2 | コピーは §9.6 |
| Activities | タイトル Talk Day | 52 / 100% / −2% | Display/M（56 / 62、M 32 / 36） | `color/ink` | 52 → 56 |
| Activities | サブタイトル | 15 B | Subheadline（15 / 24） | `color/ink-secondary` | ベースライン揃え。ティント面で 5.19 / 4.62 |
| Activities | バッジ 月1〜2回 | 12 / +10% | Overline/JP + `arrow-right` | `color/pop/badge` | +6% |
| Activities | 説明 | 14 / 170%、46em | Body/S | `color/ink-secondary` | 行長は `measure/paragraph`（42 全角） |
| Activities | タグ | 11 / +2% | Caption/Regular | `color/chip/ink` | 11 → 12、LS 0 |
| For You | CASE 01 / 見出し / 引用 / 推薦 | 10 / 17 / 13.5 B / 12.5 B | Overline/Latin / Headline / Callout / Footnote/Bold | `color/ink-secondary` / `color/ink` / `color/ink` / `color/ink-secondary` | 10 → 12、13.5 → 14、12.5 → 13 |
| Members | 役職 代表 / TECH LEAD | 11 / +12% · 10 | Overline/JP / Overline/Latin | `color/ink-secondary` | 12 に統一 |
| Members | リーダー名 / スタッフ名 | 22 / 17 | Title/2 / Headline | `color/ink` | — |
| Members | 紹介（skills） | 13 / 150% · 12 | Footnote/Regular（リーダー）/ Caption/Regular（スタッフ） | `color/ink-secondary` | 行送り 20 / 18 |
| Partners | 導入 | 14 / 170%、40em | Body/S | `color/ink-secondary` | 行長は `measure/paragraph` |
| Partners | YOUR LOGO HERE | 11 | Overline/Latin | `color/ink-secondary` | 11 → 12。左揃え（§5.7.3） |
| Poster | JOIN US | 12 | Overline/Latin | `color/poster/ink-secondary` | — |
| Poster | 見出し | 96 / 105% / 52 | Display/L（96 / 106、M 40 / 44） | `color/poster/ink` | 52 → 40 |
| Poster | 段落 | 15 / 155%、32em | Body/M（15 / 26） | `color/poster/ink-secondary` | 1.55 → 1.73。行長は `measure/paragraph`（39 全角） |
| Poster | ボタン（44） | 15 EB | Label/M | §6.2 | 800 → 700 |
| Poster | ソーシャル X · INSTAGRAM · GITHUB | 13 / +6% | Overline/Latin（12 / 16） | `color/poster/ink-secondary` | 13 → 12。行ボックス 16 → ヒット領域は §6.1.5 |
| Footer | ワードマーク / タグライン | 15 / 12 B | Headline / Caption/Bold | `color/ink` / `color/ink-secondary` | 15 → 17 |
| Footer | リンク / © | 13 / 12 | Footnote/Regular / Caption/Regular | `color/ink-secondary` | — |
| Image slot | プレースホルダ説明（制作時のみ） | 12 | Caption/Regular | `color/image/caption`（surface 上） | 本番非表示 |

コンセプトの 47 テキストスタイルは 22 ロールに統合される。

### 2.4 文字色との組み合わせ（WCAG 2.x、再計算値）

判定: 本文 ≥ 4.5、大きな文字（≥ 24px、または ≥ 18.66px かつ 700 以上 = Title 3 以上）≥ 3。値は §1.4 と同一（同じスクリプト）。

#### 2.4.1 明るい面（ground / surface / chip / avatar）

| 色トークン | 使うロール | on ground | on surface | 判定 |
|---|---|---|---|---|
| `color/ink` | Display M、Title 1–3、Headline、Callout、Label/Nav、Caption/Bold（頭文字・数） | 14.86 | 13.51 | PASS |
| `color/ink` on `color/avatar`（n300） | Caption/Bold 頭文字 | 11.19 | — | PASS |
| `color/ink-secondary`（n700） | Body S、Footnote、Caption、Overline、Subheadline、Caption/Bold タグライン、© | 5.83 | 5.30 | PASS |
| `color/chip/ink`（→ n700）on `color/chip/fill`（n200） | Caption タグ、チップアイコン | — | 5.30 | PASS |
| `color/ink-tertiary`（n600） | Title 3 Caps ゴースト（L） | 3.85 | — | PASS（L のみ。12–17px には使わない） |
| `color/pop/badge`（Mono: ink-secondary / Lime: lime-800） | Overline/JP 活動バッジ | 5.83 / 6.31 | — | PASS |
| `color/accent-text`（lime-800） | リンクホバー下線・プレス（13px 以上） | 6.31 | 5.74 | PASS |
| 概念 n600 `#7d7979` を小文字に | キッカー・役職・タグライン | 3.85 | — | **FAIL** → ink-secondary |
| 概念 n500 `#9b9797` | キッカー・© | 2.59 | — | **FAIL** → ink-secondary |
| 概念 ink@40 | マーキーゴースト | 2.41 | — | **FAIL** → ink-tertiary（L） |

#### 2.4.2 インク面（ヒーロー、ベントのインクセル、Mono のポスター）

| 色トークン | 使うロール | 比 | 判定 |
|---|---|---|---|
| `color/inverse/ink`（ground） | Display XL 回転語、Title 3、Display M 統計、Callout、Label（アウトラインボタン） | 14.86 | PASS |
| `color/inverse/ink-secondary`（ground@88） | Body L、Footnote CTA 副文 | 11.78 | PASS |
| `color/inverse/ink-tertiary`（ground@72） | Overline ヒーローメタ・統計キッカー | 8.29 | PASS |
| `color/inverse/ink-quaternary`（ground@48） | Display XL 導入句のみ | 4.45 | PASS（大きな文字 3:1。12–17px には **使わない**） |
| lime-800（明るい地の文字色をそのまま持ち込む） | — | 2.35 | FAIL → インク面のアクセントは印のみ（`color/accent-on-ink` = lime-400。抑制により文字には使わない） |

#### 2.4.3 アクセント面（Lime モードのポスター、lime-400。**明るい面**）

| 色トークン | 使うロール | 比 | 判定 |
|---|---|---|---|
| `color/poster/ink`（neutral-950） | Display L | 10.83 | PASS |
| `color/poster/ink-secondary`（ink@88） | Overline JOIN US・ソーシャル（12 Bold）、Body M | 8.23 | PASS |
| （参考）ink@72 | — | 5.32 | 数値上は N。抑制原則によりポスターでは使わない |
| （参考）ink@48 | — | 2.79 | FAIL → ポスターで禁止 |
| グラウンド系の文字（ground / ground@88） | — | 1.53 / 1.45 | **FAIL** → 明るい面にグラウンド色の文字を置かない |

ポスターの階層は primary / secondary の 2 段（Display L と Overline / Body M）。3 段目が要るコピーはポスターに置かない。

#### 2.4.4 状態

| 組み合わせ | 比 | 判定 |
|---|---|---|
| `color/link/pressed`（accent-text）on ground / surface | 5.79 / 5.26 | PASS |
| `color/action/ink` on `color/action/fill-hover`（n800）/ `-pressed`（n700） | 9.04 / 5.83 | PASS |
| `color/inverse/action/ink` on `color/inverse/action/fill-hover`（n200）/ `-pressed`（n300） | 13.51 / 11.19 | PASS |
| `color/ink` / `color/ink-secondary` on `color/state/hover-tint`（活動セル） | 13.21 / 5.19 | PASS |
| `color/ink` / `color/ink-secondary` on `color/state/pressed-tint` | 11.78 / 4.62 | PASS |
| `color/ink` on `color/selection`、`color/inverse/ink` on `color/inverse/selection`、`color/poster/ink` on `color/poster/selection` | 10.23 / 10.28 / 10.27 | PASS |

### 2.5 Figma テキストスタイル

#### 2.5.1 変数（collection `Typography`、modes `Desktop` / `Mobile`）

| 変数 | 型・scope | Desktop | Mobile |
|---|---|---|---|
| `font/family` | STRING · FONT_FAMILY | LINE Seed JP | = |
| `font/style/regular` · `bold` · `extrabold` | STRING · FONT_STYLE | Regular · Bold · ExtraBold | = |
| `font/size/display-xl` · `display-l` · `display-m` · `title-1` | FLOAT · FONT_SIZE | 124 · 96 · 56 · 32 | 56 · 40 · 32 · 26 |
| `font/size/title-2` · `title-3` · `headline` · `subheadline` · `callout` · `body-l` · `body-m` · `body-s` · `footnote` · `caption` · `label-m` · `label-s` · `overline` | FLOAT · FONT_SIZE | 22 · 19 · 17 · 15 · 14 · 16 · 15 · 14 · 13 · 12 · 15 · 14 · 12 | = |
| `font/leading/display-xl` · `display-l` · `display-m` · `title-1` | FLOAT · LINE_HEIGHT（px） | 138 · 106 · 62 · 40 | 62 · 44 · 36 · 32 |
| `font/leading/title-2` · `title-3` · `headline` · `subheadline` · `callout` · `body-l` · `body-m` · `body-s` · `footnote` · `caption` · `label` · `overline` | FLOAT · LINE_HEIGHT（px） | 28 · 26 · 24 · 24 · 22 · 28 · 26 · 24 · 20 · 18 · 20 · 16 | = |

37 変数。`fontSize` と `lineHeight` を対で束縛する（P1）。`letterSpacing` は変数を置かず PERCENT リテラルで持つ（束縛すると px 固定になり、モードでサイズが変わるロールに追従しない）。`paragraphSpacing` は Body 3 スタイルだけ Spacing コレクションの `stack/sm`（12）を束縛する。（DECISION T-15）

#### 2.5.2 スタイル一覧と `createTextStyle` パラメータ

`fontName.family` は全スタイル `"LINE Seed JP"`。`textDecoration: "NONE"`、`paragraphIndent: 0`、`textCase` は記載のない行は `"ORIGINAL"`、`paragraphSpacing` は記載のない行は 0。Headline / Subheadline / Callout は Figma のグループ化のため `Text/` 接頭辞を持つ（§11）。

| name | fontName.style | fontSize ← 変数 | lineHeight ← 変数 | letterSpacing | textCase | paragraphSpacing |
|---|---|---|---|---|---|---|
| `Display/XL` | ExtraBold | `font/size/display-xl` | `font/leading/display-xl` | PERCENT −2 | — | — |
| `Display/L` | ExtraBold | `display-l` | `display-l` | PERCENT −2 | — | — |
| `Display/M` | ExtraBold | `display-m` | `display-m` | PERCENT −2 | — | — |
| `Title/1` | ExtraBold | `title-1` | `title-1` | PERCENT −1 | — | — |
| `Title/2` | ExtraBold | `title-2` | `title-2` | PERCENT 0 | — | — |
| `Title/3` | ExtraBold | `title-3` | `title-3` | PERCENT 0 | — | — |
| `Title/3 Caps` | ExtraBold | `title-3` | `title-3` | PERCENT 3 | `"UPPER"` | — |
| `Text/Headline` | ExtraBold | `headline` | `headline` | PERCENT 0 | — | — |
| `Text/Subheadline` | Bold | `subheadline` | `subheadline` | PERCENT 0 | — | — |
| `Text/Callout` | Bold | `callout` | `callout` | PERCENT 0 | — | — |
| `Body/L` | Regular | `body-l` | `body-l` | PERCENT 0 | — | `stack/sm` |
| `Body/M` | Regular | `body-m` | `body-m` | PERCENT 0 | — | `stack/sm` |
| `Body/S` | Regular | `body-s` | `body-s` | PERCENT 0 | — | `stack/sm` |
| `Footnote/Regular` | Regular | `footnote` | `footnote` | PERCENT 0 | — | — |
| `Footnote/Bold` | Bold | `footnote` | `footnote` | PERCENT 0 | — | — |
| `Caption/Regular` | Regular | `caption` | `caption` | PERCENT 0 | — | — |
| `Caption/Bold` | Bold | `caption` | `caption` | PERCENT 0 | — | — |
| `Label/M` | Bold | `label-m` | `label` | PERCENT 0 | — | — |
| `Label/S` | Bold | `label-s` | `label` | PERCENT 0 | — | — |
| `Label/Nav` | Regular | `label-s` | `label` | PERCENT 0 | — | — |
| `Overline/Latin` | Bold | `overline` | `overline` | PERCENT 12 | `"UPPER"` | — |
| `Overline/JP` | Bold | `overline` | `overline` | PERCENT 6 | — | — |

22 スタイル。スタイルは色を持たない。色は §2.3.2 の列に従い、部品側でテキストの fill を `Color` のトークンに束縛する。

```js
// 生成の型（1 スタイル分）
await figma.loadFontAsync({ family: "LINE Seed JP", style: "ExtraBold" });
const s = figma.createTextStyle();
s.name = "Display/XL";
s.fontName = { family: "LINE Seed JP", style: "ExtraBold" };
s.fontSize = 124;                                          // 既定値。次行でモード変数に束縛
s.setBoundVariable("fontSize", vars["font/size/display-xl"]);
s.lineHeight = { unit: "PIXELS", value: 138 };
s.setBoundVariable("lineHeight", vars["font/leading/display-xl"]);
s.letterSpacing = { unit: "PERCENT", value: -2 };          // リテラル（束縛しない）
s.textCase = "ORIGINAL";
s.textDecoration = "NONE";
s.paragraphSpacing = 0;
s.description = "Hero h1. 1 line ≤ 9 zenkaku (D) / 2 authored lines (M). Color: inverse/ink; lead-in inverse/ink-quaternary.";
```

混在ノードは `setRangeTextStyleId` で範囲適用する（`setRangeFontName` はスタイルを外すので使わない）: 統計「50+」= `Display/M` + `Title/1`（「+」）、ヒーローのメタ行 = `Overline/Latin` + `Overline/JP`。

### 2.6 日本語組版の規則

#### 2.6.1 約物・文字種

| 項目 | 規則 | 例（ページ） |
|---|---|---|
| 句読点・括弧 | 和文中は全角「、。「」（）」。欧文のみの文字列は半角 | ChoTech（チョーテック）は… ／ Hack Your Limits. |
| 全角英数字 | 禁止（ＡＢＣ１２３）。英数字は常に半角プロポーショナル | 50+、2025、UI/UX |
| 三点リーダ | 「…」U+2026 を 1 つ。「...」「・・・」は不可 | 入力中… |
| 波ダッシュ | 「〜」U+301C。「～」U+FF5E は使わない | 月1〜2回 |
| 中黒 | 並列は「・」 | 勉強会・ハンズオン、チーム開発・イベント企画 |
| ダッシュ | 欧文ラベル内の区切りは「—」U+2014 と半角スペース | #general — いつものChoTech |
| 引用 | 発話は「」。“ ” は和文で使わない | 「プログラミング、何から始めればいいか分からない…」 |
| 姓名 | 姓と名の間は半角スペース 1 つ。全角スペース U+3000 は禁止 | 田中 太郎 |
| 数値と単位 | 和文単位・記号は詰める。数字と欧文単位の間も詰める | 5分、50+、1人5分 |
| 行頭の「 | 「 で始まる見出しは `text-spacing-trim: trim-start` で左端の字面を揃える。Figma は開き括弧分 −0.5em の位置調整 | 「やってみたい」に、すぐ仲間が集まる。 |
| 記号・絵文字 | 文字として置かない。置換表は §9.6 | — |

#### 2.6.2 プロポーショナル / 全角 / 和欧間

- かな・漢字・全角約物は **全角送り（1em）** のまま組む。`font-feature-settings: "palt"` / `"halt"` は使わない（Figma の OpenType 設定でもオフ）。理由: n 文字 = n em の幅計算が成り立ち、Figma と CSS の折返しが一致する。ポスター的な等幅リズムがコンセプトの骨格。
- 欧文・数字は書体のプロポーショナル幅（`pwid` 既定）。
- 和欧間: **手動スペースを入れない**（「Discordに参加する」「Dev Dayで一緒に」）。半角スペース 0.345em は広すぎ、環境で二重幅になる。**自動アキも無効にする**: `text-autospace: no-autospace`。実装エンジンの初期値 `normal` は 1/8em を挿入するため、宣言しないと CSS だけ広がり、Figma と幅が一致しない。書体の欧文サイドベアリングで足りる。（DECISION T-6、R13）
- 欧文内のスペース、キッカー内の分かち書き（長崎大学公認 学生団体）は §9.5 のとおり保つ。
- 行頭・行末の約物: ぶら下げ（`hanging-punctuation`）は行わない。`text-spacing-trim` は既定（`normal`: 連続約物の詰めと 2 行目以降の行頭詰め）を許容し、Figma との差は「 で始まる折返し行の ≤ 0.5em に限られる。見出しは §2.6.1 の `trim-start` で一致させる。

#### 2.6.3 行長

行長の規則は **文字数** で定義し、px は §3 の `measure/paragraph`（Desktop 588 = 12 col のうち 6 col、Mobile 342）1 本に委ねる。em 指定は持たない。（DECISION T-13）

| ロール | 規則 | `measure/paragraph` での実測 |
|---|---|---|
| Body S / M / L | 35–45 全角 | 588 / 14 = 42.0、588 / 15 = 39.2、588 / 16 = 36.8 全角。すべて可読域。コンセプトの 46 全角（活動説明）は上限超過、32 全角（ポスター）は下限未満だったため例外を置かない |
| Mobile の段落 | 342 / 14 = 24.4、/ 15 = 22.8、/ 16 = 21.4 全角 | 幅の制約で下限を割る。段落を 5 行以内に保ち、サイズを落として収めない |
| 見出し | Title 1 は 1 行、Title 2 / 3 は 2 行以内、Headline は 3 行以内 | 超える場合はコピーを詰める（サイズを落とさない） |
| Display | 改行位置は著者が決める（読点の直後） | `<br>` を許す唯一の場所 |
| 欧文段落 | 45–75 字 | 本ページに欧文段落はない |

収まりの検算（幅 = 文字数 × サイズ × (1 + LS)）:

| 対象 | Desktop 1200 | Mobile 342 | 320px（内側 272） |
|---|---|---|---|
| Display XL「仲間と、学ぶ。」7 全角 | 7 × 124 × 0.98 = 851 ≤ 1200 → 1 行 | 7 × 56 × 0.98 = 384 > 342 → 読点で 2 行（「仲間と、」4 全角 = 220） | 220 ≤ 272 ✓ |
| Display L「いっしょに、」6 全角 | 6 × 96 × 0.98 = 565 → 1 行/行 | 6 × 40 × 0.98 = 235 ≤ 342 | 235 ≤ 272 ✓ |
| Display M「Talk Day」5.15em | 5.15 × 56 × 0.98 = 283 | 5.15 × 32 × 0.98 = 162 | ✓ |
| Title 1「こんな人に、おすすめ。」11 全角 | 11 × 32 × 0.99 = 348 → 1 行 | 11 × 26 × 0.99 = 283 ≤ 342 → 1 行 | 283 > 272 → 2 行（`text-wrap: balance`、許容） |

WCAG 1.4.10（320px リフロー）: 上記のとおり横スクロールは発生しない。

#### 2.6.4 改行・禁則・孤立行

- `line-break: strict; word-break: normal; overflow-wrap: anywhere;`（URL 以外で単語の途中で切れることはない）。Figma の折返しが同じ禁則（行頭の 、。」）ー っ ゃ 禁止）になっているか、Foundations ページで 1 例確認する。
- 段落末が 1〜2 文字だけの行を作らない。`text-wrap: pretty` を段落に、`text-wrap: balance` を 2 行見出しに適用し、それでも残る場合はコピーを直す。
- 見出しは文節または読点の直後でだけ改行する。基準は著者の `<br>` / `<wbr>`（Figma も同じ位置で手動改行）。`word-break: auto-phrase` は対応ブラウザでの補助として許す。「ChoTech」「Discord」「Dev Day」などの固有名詞の途中で改行しない（`white-space: nowrap` の span）。
- 両端揃え禁止（`text-align: justify` を書かない）。中央揃えもページ上に存在しない。
- ルビ: 対象なし。縦組み: 使わない（水平のルールドグリッドと矛盾する）。

#### 2.6.5 強調

- 強調は **ウェイト（700）** で行う。色・下線・斜体・「」の多用で強調しない。
- 下線はリンク専用（`stroke/underline` 2px / `stroke/underline-strong` 3px、§6.1.6 のレシピ）。見出し・ラベルに下線を引かない。ヒーロー回転語は下線ではなく**文字色**（`color/hero/word`）で示す（DECISION U-3）。
- 大文字化は Overline/Latin と Title 3 Caps のみ。本文・ボタン・見出しを `uppercase` にしない。ブランド名（ChoTech、Discord、GitHub）は大文字化しない（DOM は正書法、表示は CSS）。

### 2.7 Do / Don't（ページの実例）

| 場所 | Do | Don't |
|---|---|---|
| ヒーロー | `Display/XL` 1 行「仲間と、学ぶ。」。Mobile は「仲間と、」／「学ぶ。」の 2 行（読点で改行）。導入「仲間と、」は `color/inverse/ink-quaternary`（4.45、ディスプレイ専用）、回転語は `color/inverse/ink`。段落は `Body/L`、`color/inverse/ink-secondary`、幅 `measure/paragraph` | 7 文字を 1 行に収めるためにサイズを 48px に落とす（梯子にない）。段落を quaternary で組む。リード文を Body L の太字で代用する（`Title/3` を使う） |
| ベントセル（1×1） | `Overline/Latin` CULTURE（`color/ink-secondary`）→ `Headline`（`color/ink`）→ `Body/S`（`color/ink-secondary`）。見出し ≤ 3 行、本文 ≤ 4 行 | キッカーを 10px にする。本文を 13.5px にする。吹き出しに絵文字を置く |
| 活動セル | `Display/M` Talk Day と `Subheadline` ライトニングトーク をベースラインで揃える。バッジは `Overline/JP` + `arrow-right`、`color/pop/badge`。説明は `Body/S`、`measure/paragraph`。タグは `Caption/Regular` | 説明を 46 全角まで伸ばす。バッジを 10–11px で組む。タイトルに `tabular-nums` を指定する（書体に無い） |
| メンバーカード | 役職 `Overline/Latin` TECH LEAD / `Overline/JP` 広報（`color/ink-secondary`）→ 名前 `Title/2`（リーダー）/ `Headline`（スタッフ）→ 紹介 `Footnote/Regular` / `Caption/Regular` ≤ 2 行。姓名は半角スペース | 役職に n600 `#7d7979` を使う（3.85）。名前に字間を入れる。紹介文が 3 行を超えたまま放置する |
| ナビ | リンクは `Label/Nav`（14 / 20）。CTA は 36 → `Label/S`、Mobile 44 → `Label/M`。ラベルは 700 | リンクに `Body/S`（段落間隔付き）を使う。ボタンラベルを 800 で組む |
| フッター | `Headline` ChoTech + `Caption/Bold` Hack Your Limits.（`color/ink-secondary`）、リンク `Footnote/Regular`（`color/ink-secondary`）、© `Caption/Regular`（`color/ink-secondary`） | © とタグラインを n500 で組む（2.59）。リンクに常時下線を引く |
| ポスター | `Overline/Latin` JOIN US → `Display/L` 2 行（著者改行）→ `Body/M` → `Label/M` + `arrow-up-right` → `Overline/Latin` X · INSTAGRAM · GITHUB。副次コピーはすべて `color/poster/ink-secondary`（8.23） | ライム地にグラウンド色の文字を置く（1.5 前後）。段落を 155% で組む。3 段目の階層を足す |
| マーキー | `Title/3 Caps` +3%、YOUR COMPANY HERE は `color/ink-tertiary`。区切りは `asterisk` 20（`color/pop/separator`） | ゴーストを ink@40 にする（2.41）。区切りに「✳」文字を置く |
| 和欧混植 | 「Discordに参加する」「Dev Dayで一緒に手を動かそう」— スペースなし、`text-autospace: no-autospace` | 「Discord に参加する」と手動スペースを入れる。`palt` で和文を詰める |

### 2.8 実装ノート（CSS）

`1rem = 16px`（`html { font-size: 100% }`）。サイズ・行送りは rem で書き、ユーザーのテキストサイズ設定に追従させる（Apple「Respect the user's text-size setting」、WCAG 1.4.4）。Figma の px と 1:1 に対応する。（DECISION T-16）

```css
@font-face { font-family: "LINE Seed JP"; font-weight: 400; src: url(LINESeedJP-Regular.woff2) format("woff2"); font-display: swap; }
@font-face { font-family: "LINE Seed JP"; font-weight: 700; src: url(LINESeedJP-Bold.woff2) format("woff2"); font-display: swap; }
@font-face { font-family: "LINE Seed JP"; font-weight: 800; src: url(LINESeedJP-ExtraBold.woff2) format("woff2"); font-display: swap; }

html {
  font-size: 100%;                            /* 1rem = 16px。px を書かない */
  font-family: "LINE Seed JP", sans-serif;    /* sans-serif は読み込み中の代替のみ。デザイン上の書体は 1 つ */
  font-synthesis: none;
  font-feature-settings: normal;              /* palt / halt / dlig を有効にしない */
  text-autospace: no-autospace;               /* 和欧間の自動アキなし（Figma と一致） */
  text-spacing-trim: normal;
  hanging-punctuation: none;
  line-break: strict; word-break: normal; overflow-wrap: anywhere;
  text-align: start;
  -webkit-text-size-adjust: 100%;
}

/* 固定ロール: サイズ / 行送りを rem の対で（Figma の px ÷ 16） */
.title-2     { font: 800 1.375rem/1.75rem "LINE Seed JP"; }          /* 22 / 28 */
.title-3     { font: 800 1.1875rem/1.625rem "LINE Seed JP"; }        /* 19 / 26 */
.title-3-caps{ font: 800 1.1875rem/1.625rem "LINE Seed JP"; letter-spacing: .03em; text-transform: uppercase; }
.headline    { font: 800 1.0625rem/1.5rem "LINE Seed JP"; }          /* 17 / 24 */
.subheadline { font: 700 .9375rem/1.5rem "LINE Seed JP"; }           /* 15 / 24 */
.callout     { font: 700 .875rem/1.375rem "LINE Seed JP"; }          /* 14 / 22 */
.body-l      { font: 400 1rem/1.75rem "LINE Seed JP"; }              /* 16 / 28 */
.body-m      { font: 400 .9375rem/1.625rem "LINE Seed JP"; }         /* 15 / 26 */
.body-s      { font: 400 .875rem/1.5rem "LINE Seed JP"; }            /* 14 / 24 */
.footnote    { font: 400 .8125rem/1.25rem "LINE Seed JP"; }          /* 13 / 20 (.bold → 700) */
.caption     { font: 400 .75rem/1.125rem "LINE Seed JP"; }           /* 12 / 18 (.bold → 700) */
.label-m     { font: 700 .9375rem/1.25rem "LINE Seed JP"; white-space: nowrap; }   /* 15 / 20 */
.label-s     { font: 700 .875rem/1.25rem "LINE Seed JP"; white-space: nowrap; }    /* 14 / 20 */
.label-nav   { font: 400 .875rem/1.25rem "LINE Seed JP"; white-space: nowrap; }    /* 14 / 20 */
.overline    { font: 700 .75rem/1rem "LINE Seed JP"; letter-spacing: .12em; text-transform: uppercase; }  /* 12 / 16 */
.overline-jp { font: 700 .75rem/1rem "LINE Seed JP"; letter-spacing: .06em; }

/* 流動ロール: 390px で Mobile 値、1440px で Desktop 値に一致する一次補間（size・leading とも） */
.display-xl { font-weight: 800; letter-spacing: -.02em;
  font-size:   clamp(3.5rem,   calc(1.9214rem + 6.476vw), 7.75rem);    /* 56 → 124 */
  line-height: clamp(3.875rem, calc(2.1107rem + 7.238vw), 8.625rem); } /* 62 → 138 */
.display-l  { font-weight: 800; letter-spacing: -.02em;
  font-size:   clamp(2.5rem,   calc(1.2rem + 5.333vw), 6rem);          /* 40 → 96 */
  line-height: clamp(2.75rem,  calc(1.3107rem + 5.905vw), 6.625rem); } /* 44 → 106 */
.display-m  { font-weight: 800; letter-spacing: -.02em;
  font-size:   clamp(2rem,     calc(1.4429rem + 2.286vw), 3.5rem);     /* 32 → 56 */
  line-height: clamp(2.25rem,  calc(1.6464rem + 2.476vw), 3.875rem); } /* 36 → 62 */
.title-1    { font-weight: 800; letter-spacing: -.01em;
  font-size:   clamp(1.625rem, calc(1.4857rem + .571vw), 2rem);        /* 26 → 32 */
  line-height: clamp(2rem,     calc(1.8143rem + .762vw), 2.5rem); }    /* 32 → 40 */

p { text-wrap: pretty; margin-block: 0 .75rem; }   /* 段落間隔 12 = stack/sm。max-width は部品側で var(--measure-paragraph) */
h1, h2, h3 { text-wrap: balance; word-break: auto-phrase; }
.trim-start { text-spacing-trim: trim-start; }     /* 「 で始まる見出し */
.on-ink { -webkit-font-smoothing: antialiased; }   /* 反転地で細字が太るのを防ぐ */
```

- 流動 4 ロールは補間中も比が下限を割らない（Display XL 1.107→1.113、L 1.10→1.104、M 1.125→1.107、Title 1 1.23→1.25）。
- 行長の `max-width` は本章では宣言しない。§3 の `measure/paragraph`（`--measure-paragraph`）を段落を持つ部品が適用する。
- サブセット化（`unicode-range` で JIS 第 1 水準＋かな＋約物＋Latin）でファイルを分割し、`font-display: swap` の代替表示時間を短くする。代替書体はレイアウト保護のためだけに存在し、デザイン仕様には含めない（§8.7）。

---
## 3. Layout & Spacing

Figma Variables は `Spacing`（modes: Desktop / Mobile）に格納する。単位: Figma は px。CSS は rem（= px / 16）で書き、余白は rem / em。`size/control/*`・`size/cell-min`・sponsor cell の 120 は `min-height`（WCAG 1.4.4 の 200% 拡大で内容が切れない）。

### 3.0 原則

| # | 原則 | 帰結 |
|---|---|---|
| 1 | 4px モジュール | すべての余白・寸法は 4 の倍数。2px は罫線専用。例外は罫線を含む帯の全高（62 / 56）のみ |
| 2 | 構造は罫線が担う | 影・面の重なりで階層を作らない（§4.4）。1px hairline / 2px rule / 4px underline の 3 段のみ |
| 3 | すべて左揃え | 見出し・本文・ボタンラベル・プレースホルダー文言まで `text-align: start`。中央揃えは「箱に左右がないもの」だけ: contain 配置のロゴと icon-only ボタンのアイコン |
| 4 | 値は役割で選ぶ | 生の `space/*` は直接使わず、`inset / stack / inline / section / page / nav / band` の alias を通す（§3.2）。寸法は `size/*`（§3.5） |
| 5 | 触れるものは 44 | タップ領域 44×44（Apple HIG 最小サイズ）。ポインタ専用 UI のみ 36 を許容。非テキスト要素のコントラスト 3:1（WCAG 1.4.11） |
| 6 | 高さで決める | コントロール・chip・帯は padding の合算ではなく高さ token で決め、内容を垂直中央に置く（§3.4、§3.8）。端数を構造から排除する |

### 3.1 基本スケール `space/*`

4px 基底。小さい側は 4 刻み、24 以上は 8 刻み、64 以上は 16 刻み（見た目の差が等比に近づく）。

| Token | px | Tailwind v4 | 主な役割 |
|---|---|---|---|
| `space/0` | 0 | `0` | リセット、罫線同士の密着 |
| `space/2` | 2 | `0.5` | 罫線グリッドの gap のみ（余白としては使わない） |
| `space/4` | 4 | `1` | アイコンとインライン文字の間、role → name の微差 |
| `space/8` | 8 | `2` | 最小の内側余白・スタック、Mobile nav の縦 inset |
| `space/12` | 12 | `3` | 帯（nav / marquee）の縦余白、小さな面の横余白 |
| `space/16` | 16 | `4` | 標準の inline gap、密なカードの inset |
| `space/20` | 20 | `5` | 44px コントロールの横 inset、Mobile のセル inset（この 2 役に限定） |
| `space/24` | 24 | `6` | セル・カードの inset、ページ左右 inset |
| `space/32` | 32 | `8` | 見出し → 内容、hero の縦リズム、行の縦 inset |
| `space/40` | 40 | `10` | footer の縦 inset（この 1 役に限定） |
| `space/48` | 48 | `12` | Mobile セクション上余白 |
| `space/64` | 64 | `16` | Desktop セクション上余白 / Mobile 下余白 / Mobile display 帯 |
| `space/80` | 80 | `20` | Desktop セクション下余白、hero 下余白 |
| `space/96` | 96 | `24` | Desktop display 帯（hero 上・poster 上下）、persona イラスト径 |
| `space/128` | 128 | `32` | 予備（現ページで未使用。将来の全幅 display 用） |

**DECISION L-1** 20 と 40 をスケールに残すが役割を限定する — 16↔24 / 32↔48 の間隔が広すぎる箇所（44px コントロールの横 inset、footer）にだけ必要で、汎用にすると 16/24 との使い分けが崩れるため。

### 3.2 意味付き alias

Desktop / Mobile が同値の行は Mobile 列を「=」とする。根拠中の文字サイズは §2 のロール値。

| Alias | Desktop | Mobile | → `space/*` | 用途 | 根拠 |
|---|---|---|---|---|---|
| `inset/xs` | 8 | = | 8 | chat bubble・quote の縦 inset、chip / tag の横 inset | Callout 14 の吹き出しで 8 ≈ 0.57em。これ以下だと面に見えない |
| `inset/sm` | 12 | = | 12 | bubble・quote の横 inset | 横は縦の 1.5 倍で吹き出しの重心が安定する |
| `inset/md` | 16 | = | 16 | staff card 本文、36px ボタンの横 inset、Menu panel 末尾ボタンの縦 inset、placeholder のアイコン位置 | 密度の高い 2 段目カード用 |
| `inset/control` | 20 | = | 20 | 44px ボタンの横 inset | 高さ 44・Label/M 行ボックス 20 のとき上下の空きは 12。横 20 で横:縦 ≈ 1.7 — 左詰めラベルの箱として安定する比（§3.4） |
| `inset/cell` | 24 | 20 | 24 / 20 | bento セル、persona / leader card、sponsor cell、activity 行の左右 | 24 = 4×6。Mobile は 342 幅で本文幅 298 を確保するため 20 |
| `inset/row` | 32 | = | 32 | activity 行の縦 inset | Display M 56 の見出しを含む行。hairline から見出しまで 32 で「行」として独立する |
| `page/inset` | 24 | = | 24 | ページ左右 inset（viewport < 1248 で container に効く）、nav・Menu row・marquee 停止セルの横 inset | 帯は container ではなく紙の端に属する（§3.6）。Mobile も 24: 342 = 390 − 48 |
| `nav/pad-y` | 12 | 8 | 12 / 8 | nav の縦 inset | 12 + 36 + 12 = 8 + 44 + 8 = 60。CTA の高さが viewport で変わっても帯高 `size/nav` 62 を保つ（**DECISION L-22**） |
| `band/pad-y` | 12 | = | 12 | marquee の縦 inset の最小値（帯は `size/band-marquee` 56 の高さ駆動、実効 13） | `inset/sm`。帯は section ではないので 12 |
| `stack/2xs` | 4 | = | 4 | role → name、dots 群 → ラベル | 同一ブロック内の最小差。目で分離しない距離 |
| `stack/xs` | 8 | = | 8 | title → body、activity の title 行 → description、description → tags、chat の message 間 | 行間（本文 1.7）より少し大きく、段落の切れ目に見える最小値 |
| `stack/sm` | 12 | = | 12 | section 見出し → intro 段落、段落間隔 | 見出しの下端と本文の上端が「同じ塊」に読める上限 |
| `stack/md` | 16 | = | 16 | kicker → 内容、card 内のブロック間、poster kicker → display、chat note 上 | 1 行分（≈ 16px × 1.0） |
| `stack/lg` | 24 | = | 24 | intro → grid、poster display → 段落、footer の行間（Mobile） | inset/cell と同値: セル境界と同じ強さの区切り |
| `stack/xl` | 32 | = | 32 | section 見出し → grid、hero の要素間、poster 段落 → actions | 2 行分。見出し塊と内容塊の分離 |
| `inline/icon` | 4 | = | 4 | 文中アイコン ↔ 文字（badge・chip・rec・sponsor link） | Tabler の glyph は 24 grid の内側 20 に描かれ外側 2px が余白として付く。4 + 光学余白 ≈ 5〜6 |
| `inline/xs` | 8 | = | 8 | コントロール内アイコン ↔ ラベル、avatar ↔ bubble、tag・chip の並び、Mobile nav の CTA ↔ menu button | 同上の理由でコントロール内は 8 |
| `inline/sm` | 12 | = | 12 | hero のボタン間、brand lockup（mark ↔ wordmark ↔ rule ↔ tagline） | 隣接コントロールを 1 群に見せる距離 |
| `inline/md` | 16 | = | 16 | nav 項目間、section title ↔ label、CTA セルの文 ↔ ボタン、social links、Mobile layout grid の gutter | 語間の 4 倍。別要素だが同一行 |
| `inline/lg` | 24 | = | 24 | activity title 群 ↔ badge、footer 項目間、poster ボタン ↔ socials、Desktop layout grid の gutter | 役割の異なる群を同一行に置く距離 |
| `inline/xl` | 32 | = | 32 | marquee の項目間（asterisk を挟む） | Title 3 Caps 19 の大文字帯。24 では項目が連結して読める |
| `grid/gutter` | 24 | 16 | 24 / 16 | 12 col / 4 col layout grid の gutter（= `inline/lg` / `inline/md`） | §3.7 |
| `section/pad-top` | 64 | 48 | 64 / 48 | 2px rule → section 見出し | 罫線と見出しを 1 塊に読ませる（下余白より小さい、§3.9） |
| `section/pad-bottom` | 80 | 64 | 80 / 64 | 内容 → 次の 2px rule | 「罫線の上の余白 ≥ 下の余白」で罫線が次の section に帰属する |
| `section/pad-display` | 96 | 64 | 96 / 64 | hero 上、poster 上下 | display 型（見出し塊を持たない）帯は section より 1 段広い |
| `section/heading-mb` | 32 | 24 | 32 / 24 | 見出し → grid / list | `stack/xl`。Mobile は見出しが 2 段化するため 24 |
| `section/heading-mb-list` | 8 | = | 8 | 見出し → hairline 行リスト | 行が `inset/row` 32 を持つので、見出し直下は 8 で十分（合計 40） |
| `section/heading-mb-intro` | 12 | = | 12 | 見出し → intro 段落 | `stack/sm` |
| `footer/pad-y` | 40 | 32 | 40 / 32 | footer 上下 | section より静か、帯より広い。**DECISION** 36 は 32/40 の等距離 → footer は最終区画なので広い側 |

### 3.3 使い分けルール

1. **inset** は「面の内側」、**stack** は「縦に積む兄弟間」、**inline** は「横に並ぶ兄弟間」、**section** は「ページの縦リズム」、**page / nav / band** は「紙の端と帯」。1 つの gap に 2 系統を混ぜない（例: セル内は `inset/cell` + `stack/*` だけ）。
2. 同じ親の中で stack は最大 2 種類まで（例: card = `stack/md` と `stack/2xs`）。3 種類必要なら構造を分ける。
3. 兄弟間の差は原則 2 段以上離す（8 と 12 を隣接させない。8 と 16、16 と 32）。
4. Figma では CSS の非対称 margin を再現せず、auto-layout の `itemSpacing` = stack alias、個別差は wrapper frame の padding に alias を bind する。
5. `space/2` は罫線グリッドの gap 専用。`space/4` は inline/icon・stack/2xs 以外で使わない。

### 3.4 コントロールは高さで決める

**DECISION L-2** ボタン・chip は padding ではなく高さ（`size/control/*`）で定義する。コンセプトの 34.8 / 44 / 46 の 3 種は、行送り + padding + 1px 枠の合算で生まれた端数であり、高さを固定してラベルを垂直中央に置けば同じ見た目で整数化できる。**52 は存在しない**（hero 44、poster 46 は同じ 44 に収束する）。

| Token | 高さ | 横 inset | Label role | ラベル横のアイコン | icon-only のアイコン | 用途 |
|---|---|---|---|---|---|---|
| `size/control/sm` | 36 | `inset/md` 16 | `Label/S` 14/20 | 16 | 20 | Desktop nav CTA、Desktop skip link、library の icon button。ポインタ専用（WCAG 2.5.8 の 24 は満たす。タッチ環境では md を使う） |
| `size/control/md` | 44 | `inset/control` 20 | `Label/M` 15/20 | 20 | 24 | hero 主・副 CTA、poster CTA、bento CTA、Mobile nav CTA、Mobile skip link、Mobile menu button、Menu row、marquee 停止セル。Apple HIG 最小タップ 44 |
| `size/chip` | 24 | `inset/xs` 8 | `Caption` 12/18 | 16 | — | tag、reaction chip。塗り `color/chip/fill`（neutral-200）、枠なし。非操作要素（操作化する場合は sm ボタンに置換） |

- ボタン: `display:inline-flex; align-items:center; justify-content:flex-start; min-height: var(--size-control-md); padding-inline: var(--inset-control)`。ラベルは左詰め、trailing arrow はラベル直後 `inline/xs` 8（右端に寄せない — **DECISION L-3** 「ラベル + 矢印」を 1 語として読ませる。`fullWidth` でも同じ）。Figma: 固定高さ × hug 幅、`counterAxisAlignItems: CENTER`。
- 同じ nav CTA が Desktop では sm（Label/S）、Mobile では md（Label/M）になる。Figma は Spacing と Typography の両モードで切り替える。
- icon-only ボタンは正方形で、アイコンは中央。左揃え原則は「ラベルの箱」に適用するもので、正方形の箱には左右がない。
- chip: `size/chip` 24 は Caption の行送り 18 + 3 × 2。24 grid のアイコンと同じ高さで行に揃う。

### 3.5 寸法 `size/*`

余白ではなく「箱の大きさ」。Figma は `Spacing` collection に FLOAT として置く（WIDTH_HEIGHT scope）。CSS 変数名は `/` を `-` に置換（`--size-nav`）。

| Token | 値 D / M | 用途 | 根拠 |
|---|---|---|---|
| `size/control/sm` | 36 | Desktop nav CTA、skip link、library icon button | §3.4 |
| `size/control/md` | 44 | 主要 CTA、Mobile nav CTA、menu button、Menu row、marquee 停止セル | HIG 44pt |
| `size/chip` | 24 | tag、reaction chip | Caption 行送り 18 + 3 × 2 |
| `size/nav` | 62 | nav 帯の全高（下罫 2 を含む）。hero の `min-height` と section の `scroll-margin-top` に使う | 12 + 36 + 12 + 2 = 8 + 44 + 8 + 2。概念 61 |
| `size/band-marquee` | 56 | marquee 帯の全高（上下罫 2 を含む）。内側 52 に Title 3 Caps の行ボックス 26 を中央配置 | 2 + 52 + 2。52 = 4 × 13、停止セルの高さ。概念 55（R6） |
| `size/hero-max` | 960 | hero `min-height` の上限 | 10 × `space/96`。1440 × 900 では `100svh − 62` = 838 が効き、960 は縦 1022px 以上の画面でだけ効く上限 |
| `size/cell-min` | 120 | 罫線グリッドの行の最小高、sponsor cell の高さ | 24 × 5。**床であって目標ではない**: kicker（Overline 16）+ `stack/md` 16 + Headline 2 行（48）+ inset 48 = 128 で、kicker + 2 行見出しの 1×1 セルは行ごと 128 に伸びる（stretch）。sponsor cell と 1 行見出しのセル（104）は 120 |
| `size/avatar` | 24 | chat avatar（矩形） | = `icon/lg`。chat indent = 24 + `inline/xs` 8 = 32 |
| `size/dot` | 7 | typing dot（円） | 吹き出しの中に置くので、点そのものが見えるサイズが要る。3 点 + gap 5 = 31 幅（DECISION U-1 で 4 → 7） |
| `size/illustration` | 96 | persona イラスト（円） | `space/96`、24 grid × 4 |
| `size/mark-nav` / `size/mark-footer` | 28 / 24 | logo mark（両 viewport 同値） | 4 の倍数。wordmark Title 3 19 / Headline 17 に対する比 1.47 / 1.41（**DECISION L-21**） |
| `size/rule-v` | 12 | 縦 hairline の高さ（brand tagline の左、hero meta の区切り） | 隣接文字の font-size（Caption / Overline 12）と同値。行送り 18 だと行を跨いで見え、cap 高 9 だと点に見える（**DECISION L-16**） |
| `measure/paragraph` | 588 / 342 | 段落の `max-width` | §3.10 |

CSS: `--size-nav: 3.875rem; --size-hero-max: 60rem; --size-cell-min: 7.5rem; --size-control-md: 2.75rem`。固定値ではなく `min-height` に渡す。

### 3.6 Viewport と container

| | Desktop | Mobile |
|---|---|---|
| Frame | 1440 | 390 |
| Container | 1200（x 120…1320） | 342（x 24…366） |
| ページ左右 inset | `page/inset` 24（viewport < 1248 で効く） | 24 |
| 全幅 (full-bleed) 要素 | nav、hero、marquee、section の 2px 上罫線、poster、footer 上罫線、Menu panel | 同じ |
| container 幅の要素 | section 内容、罫線グリッド、activity 行、footer 内容、poster 内容 | 同じ |
| viewport inset 24 の要素（container に縛らない） | nav の内容（brand x = 24、CTA 右端 = 1416）、Menu row、marquee 停止セル | 同じ（Mobile では container と一致） |

**DECISION L-23** nav の内容は container ではなく viewport inset 24 に置く。sticky な帯は「紙」ではなく「窓枠」に属し、container に縛ると 1440 で帯の左右に 120 の空白が生じて帯が紙の一部に見える。コンセプトの実測（nav padding 12 / 24、CTA 右端 1440 − 24）と一致する。section 見出し（x 120）と brand（x 24）の不一致は意図。

CSS: `.container { width: min(100% - 2 * var(--page-inset), 75rem); margin-inline: auto }`。

**DECISION L-29 実装のブレークポイント（Figma には持たない）**

本書は Desktop 1440 / Mobile 390 の 2 フレームしか定義しない。ブラウザの幅は連続なので、その間をどう扱うかは実装が決めなければならない。トークン（タイポ・余白）のモード切替は **1248px = 78rem** に置く — container が設計値 1200 に達し、§3.7 の 12 列幾何が成立する唯一の点で、本書が自ら言及している唯一の viewport 値でもある（`page/inset` の「viewport < 1248 で効く」）。

ただし次の 2 つは「構造」の問題なので、トークンより早く切り替える:

| 何を | いつ | なぜ |
|---|---|---|
| ナビを横並びに開く | 768px = 48rem | 英語 1 語のリンク 4 本 + CTA sm は 768 に余裕をもって収まる。ここでハンバーガーを維持するのは、タイプスケールの忠実さより明らかに悪い体験 |
| 罫線グリッドを 2 列に開く | 768px = 48rem | L-10 が退けたのは列数ではなく「セル内容 128px（Body S で 9 字）」。768 の 2 列はセル内容 ≈ 320px（22 字）で閾値を満たす |
| 罫線グリッドを設計どおりの列数（bento 4、persona / staff 3、partner 6）に開く | 1248px = 78rem | トークンのモードと一致させ、Figma の Desktop フレームと同一幾何にする |

タイポグラフィを中間帯で流体補間（`clamp()`）しない: §2 の行長計算は「n 文字 = n em」の離散値に依存しており、補間した中間サイズでは §9.3 の文字数上限が検証されていない。CSS では `--breakpoint-tablet` 48rem / `--breakpoint-desktop` 78rem の 2 つだけを持ち、Tailwind の既定階梯は消す。

### 3.7 2 つのグリッド

| | 12 カラム layout grid | 罫線グリッド (ruled grid) |
|---|---|---|
| 目的 | 自立するテキスト塊（hero lead、intro、poster 段落、見出し）の幅と揃え | 等幅セルを罫線で仕切る面（bento、persona、member、sponsor） |
| Desktop | 12 col × 78 + 11 gutter × `grid/gutter` 24 = 1200 | 外枠 2 + gap 2、n 等分（§3.8） |
| Mobile | 4 col × 73.5 + 3 gutter × `grid/gutter` 16 = 342（ガイドのみ、端数可） | 1 列 338 |
| 共有するもの | container の両端のみ。罫線グリッドは 12 col に従わない | |
| Figma | Layout grid: Columns 12 / gutter 24 / margin 0 を 1200 の container frame に設定 | auto-layout（§3.8 recipe） |

**DECISION L-24** Mobile の gutter は 16 = `inline/md`。24 では列幅が 66 に落ち、2 col span（148）で Headline 17 が 8 字に割れる。16 で列幅 73.5、2 col span 163。

### 3.8 罫線グリッドの recipe

```
frame:  fill = color/divider, padding 2 (= 外枠), 縦 auto-layout gap 2
row:    横 auto-layout gap 2, width FILL, minHeight = size/cell-min (120)
cell:   fill = color/ground (or inverse/ground), width FILL, height FILL, inset/cell
```

CSS: `.grid { display:grid; grid-template-columns: repeat(n, 1fr); gap: 2px; padding: 2px; background: var(--color-divider); grid-auto-rows: minmax(var(--size-cell-min), auto) }` — セルの `background` を塗り、gap と padding が罫線になる。`border` は使わない。**DECISION L-9** 罫線を fill + gap の 1 色 1 レイヤーで描くのは、Figma（frame fill + itemSpacing）と CSS（background + gap）が同じ構造になり、外枠と内側の線が同一 token `color/divider` から出ることを構造的に保証するため。コンセプトの外枠 64% / 内側 40% の濃度差は CSS の合成による副産物で、divider が実色（neutral-500）になった現在は再現もされない。

| 列数 n | セル幅 Desktop（inner 1196） | 2 列 span | 用途 |
|---|---|---|---|
| 6 | 197.67 | — | sponsor（正方形タイル、L-31。tablet 3 列 237.33 / Mobile 2 列 168） |
| 4 | 297.5 | 597 | bento |
| 3 | 397.33 | — | persona、staff |
| 2 | 597 | — | leader |
| 1 (Mobile) | 338 | — | sponsor 以外すべて |

セル幅 = (W − 2(n+1)) / n。1200 では n = 2 以外が端数になる。**端数は許容する**: ブラウザは各セルの矩形を物理ピクセルに snap するため、gap は常に 2px で描画される。Figma は FILL に任せ、幅を手入力しない。

**span と行、Mobile での折りたたみ**

| 規則 | 値 |
|---|---|
| 行の単位高さ | `size/cell-min` 120。行は内容で伸び、同じ行のセルは最も高いセルに揃う（stretch） |
| 横 span (n) | 幅 = n × cell + (n−1) × 2 |
| 縦 span (m) | 最小高さ = m × 120 + (m−1) × 2 = 242（m=2）。画像セルは隣接セル（chat）の高さに合わせて伸びる |
| Desktop bento | 行 1 [2×1 · 1×1 · 1×1] / 行 2–3 [2×2 chat · 2×2 photo] / 行 4 [1×1 · 1×1 · 2×1 CTA] |
| 連結グリッド | leader (2 col) の直下に staff (3 col) を置くときは staff 側の上枠を 0 にし、leader の下枠を共有する。2px 罫線を 2 本重ねない |
| Mobile | **すべて 1 列**、DOM 順。span は無視。2×2 photo は 338 × 190（16:9）、chat は hug。**DECISION L-10** 2 列（168px）だと inset 20 を引いた本文幅 128 ≈ Body S 14 で 9 字。和文の最小行長（≈ 20 字）を割るため |
| Mobile 行最小 | 120（同値。1 列でも 1×1 セルは kicker + 見出し 2 行で 128 に伸びる） |

### 3.9 セクションの縦リズム

| 帯 | Desktop の箱 | Mobile |
|---|---|---|
| Nav | `nav/pad-y` 12 + `size/control/sm` 36 + 12 + `stroke/rule` 2 = **62** = `size/nav`（sticky） | `nav/pad-y` 8 + `size/control/md` 44 + 8 + 2 = **62**。幅検算: 24 + mark 28 + 12 + wordmark ≈ 86 + ≥ 16 + CTA 128 + 12 + menu 44 + 24 = **374 ≤ 390** |
| Menu panel（Mobile） | — | nav 直下、全幅、`color/ground`、下辺 `stroke/rule`。行 = `size/control/md` 44 高 × 横 `page/inset` 24、行間 `stroke/hair`。末尾に md ボタン `fullWidth`（上下 `inset/md` 16、横 `page/inset` 24）。**DECISION L-25** 行の寸法は nav CTA と同じ 44 / 24: パネルは nav の延長であり、brand と同じ x = 24 に揃う |
| Hero | `section/pad-display` 96 / `section/pad-bottom` 80、`min-height: min(100svh − var(--size-nav), var(--size-hero-max))`、内容は垂直中央 | 64 / 64、`min-height` 同式 |
| Marquee | `size/band-marquee` **56** = `stroke/rule` 2 + 52 + 2。項目（Title 3 Caps 19 / 26）は内側 52 の中央。右端に停止セル（下記） | 同じ |
| Section | (rule 2) + 64 + 見出し + 32 + 内容 + 80 | (rule 2) + 48 + 見出し + 24 + 内容 + 64 |
| Poster | 96 + 内容 + 96（罫線なし。色面の切替が境界） | 64 / 64 |
| Footer | rule 2 + `footer/pad-y` 40 + 内容 + 40 | 2 + 32 + 内容 + 32 |

**Marquee 停止セル**（WCAG 2.2.2 の停止手段。挙動は §7.4.2）:

| 項目 | 値 |
|---|---|
| 位置 | 帯の右端、上下罫線の間（`position:absolute; inset-block:0; right:0`）。トラックはセルの下に潜る（`overflow:hidden`） |
| 寸法 | 幅 `size/control/md` 44 × 高さ = 帯の内側全高 52（56 − 罫 2 × 2）。hit area 44 × 52 ≥ 44 |
| 左辺 | `stroke/rule` 2、`color/divider`（帯の罫線と同じ語彙で「セル」として切り出す） |
| 地 / アイコン | `color/ground` / `Icon/PlayerPause` ⇄ `Icon/PlayerPlay` 24、`color/ink`、中央配置（icon-only） |
| 状態 | icon button と同じ（hover `color/state/hover-tint`、pressed `pressed-tint`、focus ring `color/focus/ring` inset offset −2） |

規則:

- **罫線と見出しは 1 塊**: 罫線の下 64 < 罫線の上 80。罫線は次の section に帰属して見える（ポスターの見出し罫の慣習）。（DECISION L-4、L-5）
- **罫線は重ねない**: marquee の下罫線が About の上罫線を兼ねる（About は上罫線なし）。hero と marquee、poster と footer の間も同様に 1 本。
- **hero の高さ** **DECISION L-7** `88vh` → `min(100svh − size/nav, size/hero-max)`。nav を除いた初期 viewport をちょうど満たし、縦長モニタで空白が伸びるのを 960 で止める。`svh` はモバイルのアドレスバーを考慮。
- **アンカー**: sticky nav の分 `scroll-margin-top: var(--size-nav)` を section に付ける。
- **section 内の順序**: 見出し行 → (`heading-mb-intro` 12 → intro 段落 → `stack/lg` 24) → grid / list。
- **activity 行の内部**: `inset/row` 32 → title 行（Display M + Subheadline を baseline 揃え、`inline/md` 16、右端 badge へ `inline/lg` 24）→ `stack/xs` 8 → description → `stack/xs` 8 → tags → `inset/row` 32。
- **hero の縦リズム**は 32 で統一（meta → h1 → lead → actions は `stack/xl`、lead → 段落は `stack/xs` 8）。（DECISION L-6）

### 3.10 行長 (measure)

| Token | Desktop | Mobile | 適用 |
|---|---|---|---|
| `measure/paragraph` | **588**（12 col のうち 6 col = 6×78 + 5×24） | 342（container 幅） | hero lead（Body L）、activity description・sponsors intro（Body S）、poster 段落（Body M） |

**DECISION L-8** コンセプトの 4 種（576 / 644 / 560 / 480）を 1 本化し、`max-width: 40em` も本 token で置換する。588 は本文サイズ 16 / 15 / 14 px でそれぞれ 36.8 / 39.2 / 42.0 字 — 和文の適正行長 35〜45 全角字に全サイズで収まり、12 col グリッドの列端に揃い、Figma の FLOAT 変数としてモード保持できる（em だとロールごとに px が変わり Figma と CSS の折返しが一致しない）。644（46 字）は上限超過、480（32 字）は下限未満だった。Mobile は 342 / 14 = 24 字で下限を割るが、これは幅の制約であり許容する（行送り側で補う）。

和文組版の付帯規則（layout が担う分）:

- `text-align: start` のみ。両端揃え禁止（和文は語間が無く、字間が不均一になる）。
- `overflow-wrap: anywhere; line-break: strict`。英単語を含む行は英単語で折り返す。
- 見出しが「 で始まる場合は `text-spacing-trim: trim-start`（Figma は開き括弧分 −0.5em の位置調整）。
- 和欧混植の行（和文見出し + 欧文ラベル、title + subtitle）は **baseline** で揃える。アイコンは baseline ではなく行ボックス中央（§5.3）。

### 3.11 Do / Don't

| Do | Don't |
|---|---|
| alias（`inset/cell`、`stack/xl`…）と `size/*` で余白・寸法を指定する | 生の px や `space/*` を直接 bind する、マジックナンバー（62、960）を式に書く |
| コントロールは 36 / 44 の高さで作り、ラベルを左詰めにする | padding で高さを作る、52 のボタン、ラベルや矢印を中央・右端に寄せる |
| 2px rule と hairline の 2 段で構造を示す | 影、角丸、3px 以上の枠線、途中で終わる線 |
| 罫線グリッドは fill + gap 2 + padding 2 で描く | `border` で外枠を描く（Figma と CSS で構造が分かれる） |
| Mobile は 1 列、DOM 順 | 168px の 2 列セル、span の維持 |
| 段落は `measure/paragraph` 588 / 342 | `max-width: 40em`、640 超の本文行、両端揃え |
| 罫線の上 80・下 64 で section を刻む | 上下均等、罫線の二重化 |
| tag / chip は `color/chip/fill` の塗り、枠なし | hairline 枠だけの chip（2.59 の線が唯一の輪郭になる） |

---
## 4. Shape & Elevation

Figma Variables は `Shape`（単一モード）。

### 4.1 角丸

| Token | 値 | 適用 |
|---|---|---|
| `radius/none` | 0 | すべて（ボタン、chip、セル、image slot、focus ring） |
| `radius/full` | 9999 (ELLIPSE) | 例外 3 つ: persona イラスト（`size/illustration` 96 円）、typing dot（`size/dot` 7 円）、チャット avatar（24 円） |
| `radius/bubble` | 18 | チャット吹き出しと typing 吹き出し（**DECISION U-1**） |
| `radius/bubble-tail` | 4 | 吹き出しの**外側の下角のみ**。テールが接する側を締める |

角丸を持つのは「人物の似顔絵」「点」「Messages 風のチャット吹き出し」だけ。

- **DECISION U-1** チャットにだけ角丸を許す。あの部品はサイトの UI コントロールではなく、**実在するアプリ（Messages）の引用**である。引用は元の見えを保つほうが「これはチャットの様子だ」と速く伝わる。ボタン・chip・セル・入力には波及させない — 波及した時点でサイト全体の性格が変わる。トレードオフ: 角丸ゼロの原則に例外が 1 つ増える。例外を 1 つに閉じるため、`radius/bubble` の適用先はチャット部品に限ると明記する。

### 4.2 線の太さ

色は用途ごとに §1 の role を引く。同じ太さでも色 token は 1 つに束ねない。

| Token | 値 | 色 | 用途 | 根拠 |
|---|---|---|---|---|
| `stroke/hair` | 1 | `color/divider-hairline` | activity 行の上線・末尾線、Menu row 間、縦 hairline（brand tagline の左、hero meta の区切り。高さ `size/rule-v` 12） | 構成要素「内部」の仕切り |
| | | `color/inverse/outline` | ink 面の outline ボタンの枠（hero 副 CTA / bento CTA） | 部品境界は 3:1 が要る（14.86）。divider（2.59）は使わない |
| | | `color/inverse/hairline` | hero の格子線 × 4（§4.3 例外） | テクスチャ、1.18 |
| `stroke/rule` | 2 | `color/divider` | nav 下、marquee 上下と停止セル左、section 上、footer 上、Menu panel 下、罫線グリッドの枠と gap | 構成要素「間」の仕切り。hairline の 2 倍で明確に別段 |
| `stroke/underline` | 2 | `color/link-underline`（currentColor） | リンクの**静止時**の下線（inline 常時、他は hover 以降） | **DECISION U-2** 1 → 2。ヘアライン罫（`stroke/hair` 1）と独立した token にし、罫線を動かさずに下線だけ太くできるようにした |
| `stroke/underline-strong` | 3 | `color/link/hover` / `color/link/current` / currentColor | hover / pressed / current の下線 | 静止 +1px。太さだけで状態を示し、文字色は動かさない。同じ幾何・別の色 = 同じ装置・別の意味（R16） |
| `stroke/focus` | 2 | `color/focus/ring` / `color/focus/ring-inverse`（§4.5） | `:focus-visible` の outline。`prefers-contrast: more` では 3 | rule と同じ太さで「構造の線」として読ませる |
| `focus/offset` | 2 | — | outline-offset（full-bleed の行は −2） | 要素の枠（1px）と混ざらない最小距離 |
| `opacity/disabled` | 0.48 | — | 無効ノード全体の不透明度（ライブラリのみ） | §1.2.3 のアルファ尺度 |

tag / reaction chip に枠はない（塗り `color/chip/fill` が境界、§3.4）。

下線の実装:

- link: `text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 0.2em`（複数行でも追従）。hover の 3px 化は `text-decoration-thickness` だけを変える（レイアウト不変）。Figma は text 下に高さ 2 / 3 の RECTANGLE（幅 FILL、**絶対配置**なので状態でレイアウトが動かない）。
- 回転語に下線は引かない（DECISION U-3）。ヒーローで語を際立たせるのは下線ではなく文字色。

### 4.3 罫線とグリッドの出会い方

1. 2px rule は親の全幅を走る。途中で終わる装飾的な短い線は作らない。
2. 全幅罫線（nav、marquee、section、footer）は viewport 端まで。container 幅の罫線（グリッド枠、hairline 行）は container 端まで。両者を同じ x で重ねない。
3. 交差は「+」で連続させる（グリッドは fill + gap で描くので自動）。線を線の上に載せない。
4. 2px rule どうしを隣接させない（§3.9）。hairline と 2px rule の最小距離 8（`section/heading-mb-list`）。
5. 内容と罫線の最小距離: hairline から 8、2px rule から 24（セルの inset）。帯（nav / marquee）だけ 12。
6. 縦線は (a) 罫線グリッドの仕切り、(b) `size/rule-v` 12 の hairline（brand tagline、hero meta 区切り）、(c) marquee 停止セルの左罫のみ。例外だった hero 背景の格子線（K-12）は撤去した（U-22）。
7. **DECISION L-16** hero meta 行の区切りは asterisk アイコンではなく **1 × 12 の hairline**（tagline の縦線と同じ装置 `size/rule-v`）。Overline 12 の大文字 kicker（cap 高 ≈ 9px）の横に 16px 以上のアイコンは大きすぎ、asterisk は marquee の display モチーフに限定した方が強い。

### 4.4 Elevation

既定は完全にフラット。ページ上の要素はどれも影を持たない。面の前後関係は「ink 面 / ground 面」の色の切替と 2px rule で表す。

| Token | 値 | 使用 |
|---|---|---|
| `shadow/sm` | `0 1px 2px` `color/shadow`（ink @ 24%） | 予備（ページで未使用） |
| `shadow/md` | `0 4px 8px` `color/shadow` | 予備（menu / popover が将来必要になった場合） |
| `shadow/lg` | `0 16px 32px` `color/shadow` | **dialog のみ**。必ず幕 `color/backdrop`（ink @ 48%）と併用 |

Figma は `shadow/{sm,md,lg}/y` と `shadow/{sm,md,lg}/blur` の FLOAT 2 本（`Shape`）と `color/shadow` で持つ。

**DECISION L-18 / C-15（R14）** y と blur は段ごとに倍、色は `color/shadow` = ink@24 の 1 濃度。段差は幾何だけで作る（48 だと blur 32 の影が第 2 の幕に見える）。Mobile nav の展開は「ground 色の不透明パネル + 2px 下罫線」で viewport を覆うため影は不要（Apple の "dim to focus" は dialog にだけ適用）。`prefers-reduced-transparency` / `prefers-contrast: more` では幕を ink@88（同尺度の最大段）にする。半透明マテリアル（`backdrop-filter`）は導入しない: nav は不透明で、半透明トークンは平坦な地の上にしか置かない。

### 4.5 Focus ring

token は §1.3.6 のもの。地は「outline-offset 2 の外側にある親の面」で決める。

| 地 | Token | 値 | 比 | 判定 |
|---|---|---|---|---|
| ground `#f3f2f2` / surface `#eae7e7` / hover-tint / pressed-tint（ページ、セル、chip 上も含む） | `color/focus/ring` | lime-700 `#497d00` | 4.46 / 4.05 / 3.96 / 3.53 | ✓ 3:1 |
| ink `#201e1d`（hero、stat / CTA セル、Mono の poster）、inverse hover-tint | `color/focus/ring-inverse` | lime-300 `#bbf451` | 12.79 / 9.11 | ✓ |
| lime-400 `#9ae600`（Lime の poster） | `color/poster/focus/ring` | lime-900 `#35530e` | 5.72 | ✓。面が反転するため専用 token |

**DECISION L-14 / C-8 改** リングは面ごとに 3 token。明るい面 `focus/ring` lime-700（4.46）、インク面 `focus/ring-inverse` lime-300（12.79）、ポスター面 `poster/focus/ring` lime-900（5.72）。ライムはポスター面の明度が反転するため、暗い面用の 1 token では賄えない（lime-300 を lime-400 面に置くと 1.18 で消える）。Mono でも focus ring はライム（アクセントが状態表示にだけ現れる規則の一部）。`outline: 2px solid; outline-offset: 2px; border-radius: 0`。full-bleed の行（activity row、Menu row、marquee 停止セル）は inset（offset −2）で隣接罫線と交差させない（DECISION K-7）。

---

## 5. Iconography & Imagery

### 5.1 セットと描画規則

- Tabler Icons **outline** のみ。24 grid、stroke 2、round cap / round join（Tabler 既定）。filled 版・他セット（lucide、react-icons）は混ぜない。例外は Discord のブランドマークだけ `brand-discord-filled`（**DECISION U-23**: 輪郭版は顔の目が線になって崩れて見える。塗り版は 24 grid のまま stroke を持たない）。
- 絵文字・記号文字（✳ → ↑ 🙌 👀）をアイコン代わりに使わない。矢印は `Icon/ArrowRight`（サイト内へ進む）と `Icon/ArrowUpRight`（外部へ出る: Discord、X、Instagram、GitHub、mailto）の 2 つ。ページ内スクロール（hero「活動を見る」、Nav リンク）はアイコンなし（R9）。例外はチャットのリアクション（§6.4、**DECISION U-25**）: Discord の実際のリアクションを写す絵なので、アイコンではなく実際の絵文字を置く。
- stroke: 16 / 20 / 24 では **2**（16 では実効 1.33px だが Retina では鮮明、Tabler の意図通り）。**32 以上は 1.5**（そのままだと 2.67px になり太る）。現ページに 32 以上の用途はない。

### 5.2 サイズ

| Token | px | 隣に置く文字 / 文脈 | 根拠 |
|---|---|---|---|
| `icon/sm` | 16 | 12〜14px の文字（badge Overline 12、chip Caption 12、persona rec / sponsor link Footnote 13、footer の任意 brand アイコン）、36px コントロールのラベル横 | glyph の実寸は 16 × 20/24 ≈ 13px ≈ 14px 文字の cap 高 + α |
| `icon/md` | 20 | 15〜19px の文字（marquee Title 3 Caps 19 の区切り）、44px コントロールのラベル横、icon-only 36 | glyph ≈ 17px。19px 大文字の cap 高 ≈ 15px と釣り合う |
| `icon/lg` | 24 | icon-only 44（menu、x、player-pause / play）、placeholder の写真アイコン | Tabler のネイティブサイズ |

判定順: コントロール内 → 高さで決める（ラベル横: 36 → 16、44 → 20。icon-only: 36 → 20、44 → 24）。文中 → 文字サイズで決める（≤ 14 → 16、15〜19 → 20）。（DECISION L-27、R7）

### 5.3 配置

- 行ボックスの中央に置く: CSS `display:inline-flex; align-items:center`、Figma 横 auto-layout `counterAxisAlignItems: CENTER`。和文は em ボックス中央に重心があるため、baseline 揃えより中央揃えが正しい。
- 大文字 Latin kicker の横だけ 1px 下げる（cap 高中心が em 中心より低い）。
- 文中のインライン SVG（persona rec の先頭矢印）は `vertical-align: -0.2em`。
- アイコン ↔ 文字の距離: コントロール内 `inline/xs` 8、文中 `inline/icon` 4（§3.2）。
- 順序: 遷移を示す矢印は trailing。leading は「次に」を指す指示子（persona rec の `Icon/ArrowRight`）だけ。ボタンに leading アイコン（brand）は置かない — コンセプトにも無く、ラベルが行き先を言う。

### 5.4 色とコントラスト

- 色は常に `currentColor`。独自の色 token を持たない。例外は marquee 区切りの asterisk（`color/pop/separator`）。
- 非テキスト要素として **3:1**（WCAG 1.4.11）を満たす。計算結果:

| アイコンの色（= 行の文字色） | 地 | 比 | 判定 |
|---|---|---|---|
| `color/ink` | ground / surface | 14.86 / 13.51 | ✓ |
| `color/ink-secondary` n700 `#605d5d` | ground / surface / chip/fill | 5.83 / 5.30 / 5.30 | ✓ |
| `color/ink-tertiary` n600 `#7d7979` | ground / surface | 3.85 / 3.50 | ✓ 最も薄い許容値（図形専用。テキストは L のみ） |
| `color/divider` n500 `#9b9797` | ground / surface | 2.59 / 2.35 | ✗ → **アイコンには使わない** |
| `color/inverse/ink` / `inverse/ink-tertiary`（ground @ 72%） | ink | 14.86 / 8.29 | ✓ hero kicker 行 |
| `color/pop/badge` lime-800（Lime）/ ink-secondary（Mono） | ground | 6.31 / 5.83 | ✓ badge の矢印 |
| `color/pop/separator` lime-700（Lime）/ ink-tertiary（Mono） | ground | 4.46 / 3.85 | ✓（R17: アイコンは形なので 3:1 を床にする） |
| `color/poster/action/ink` ground | poster CTA の面（Lime: neutral-950） | 14.86 | ✓ |

**DECISION L-15** typing dot と placeholder のアイコンは `color/ink-tertiary`（3.85 / 3.50）以上。コンセプトは n500 の `currentColor` だが非テキストとして不足。

### 5.5 インベントリ

| Figma | Tabler | `@tabler/icons-react` | Size | 出現箇所 | 位置・gap |
|---|---|---|---|---|---|
| `Icon/ArrowRight` | `arrow-right` | `IconArrowRight` | 16 / 20 | activity badge（行リンク、サイト内）、persona rec の先頭 | trailing 4（badge）/ leading 4（rec）/ trailing 8（サイト内 CTA が生じた場合） |
| `Icon/ArrowUpRight` | `arrow-up-right` | `IconArrowUpRight` | 16 / 20 | nav CTA、hero 主 CTA、bento CTA、poster CTA（Discord）、sponsor link（mailto） | trailing 8（コントロール）/ trailing 4（文中） |
| `Icon/Asterisk` | `asterisk` | `IconAsterisk` | 20 | marquee の区切り（4 個 / 群） | 単独。`color/pop/separator` |
| ~~`Icon/ThumbUp`~~ | — | — | — | reaction chip は実際の絵文字（U-25）。アイコンは使わない | — |
| `Icon/Eye` | `eye` | `IconEye` | 16 | reaction chip「4」 | leading 4 |
| `Icon/Menu2` | `menu-2` | `IconMenu2` | 24 | Mobile nav の開く | icon button 44 |
| `Icon/X` | `x` | `IconX` | 24 / 20 | Mobile nav の閉じる（icon button 44 → 24）、library dialog の閉じる（36 → 20） | 中央 |
| `Icon/PlayerPause` | `player-pause` | `IconPlayerPause` | 24 | marquee 停止セル（動作中） | 中央 |
| `Icon/PlayerPlay` | `player-play` | `IconPlayerPlay` | 24 | marquee 停止セル（停止中） | 中央 |
| `Icon/Photo` | `photo` | `IconPhoto` | 24 | image placeholder（§5.7.3） | 単独。`color/ink-tertiary` |
| `Icon/BrandX` / `Icon/BrandInstagram` / `Icon/BrandGithub` | `brand-x` / `brand-instagram` / `brand-github` | `IconBrandX` … | 16 | **footer 任意**（Footnote 13 のリンク先頭）。poster の social はテキストラベルのみ | leading 4 |

必須 10 種 + 任意 3 種。追加するときは「同じ意味に 2 つのアイコンを使わない」— 内部（`ArrowRight`）と外部（`ArrowUpRight`）は別の意味であり、この 2 つ以外の矢印を増やさない。

### 5.6 命名

- Figma: `Icon/<PascalCase>`（Tabler 名のハイフンを除去、数字はそのまま: `Icon/Menu2`）。variant property `Size` {16, 20, 24}、stroke は 2 固定（32 以上は別 variant を作る）。fill は `color/ink` を既定 bind、instance で上書き。
- コード: `@tabler/icons-react` の export 名（`IconArrowRight`）、props `size={16|20|24} stroke={2} aria-hidden`。意味を持つ単独アイコン（menu / x / player）だけ `aria-label` を持つボタンに包む。

### 5.7 Imagery

#### 5.7.1 色の扱い

- **DECISION U-21（2026-09-05）** B/W 処理を撤回。写真・イラスト・パートナーロゴは原色のまま置き、CSS の `filter` も Figma の Saturation −100 も掛けない。理由: 実写と Humation のイラスト（§6.14）の色は「コミュニティの実像」を運ぶ情報で、モノクロ化はそれを削っていた。以降の節に残る「B/W」の表記は失効。
- 色を乗せない（duotone・tint 禁止）。写真の上に面や線を重ねない（Hero の格子線を撤去した理由、U-22）。
- logo mark は図の外接矩形で切った `icons/mark.svg` を `size/mark-nav` 24 / `size/mark-footer` 20 で置く（**DECISION L-30**、§6.6）。favicon.svg は余白込みなので lockup には使わない。
- パートナーロゴはブランド規定の色のまま ground に置く（L-20 / C-23 の「白黒」は U-21 で失効、「tint しない」は維持）。

#### 5.7.2 スロットと比率

| スロット | Desktop | Mobile | 比率 | fit / 焦点 |
|---|---|---|---|---|
| bento photo (2×2) | 597 × 行高（≈ 336） | 338 × 190 | **16:9** | cover、`object-position: 50% 40%` |
| leader photo | 597 × 336 | 338 × 190 | 16:9 | cover、`50% 30%`（顔は上 1/3） |
| staff photo | 397.33 × 298 | 338 × 253.5 | 4:3 | cover、`50% 30%` |
| persona イラスト | 96 円 | 96 円 | 1:1 | cover |
| sponsor logo | 197.67 角のセル、内側 149.67 角（inset 24） | 168 角、内側 128 角（inset 20） | 1:1 | contain、セル中央（L-31: タイルは正方形） |

**DECISION L-20** bento photo は 16:9 固定。コンセプトの「min 280」は撤廃し、Desktop では chat セルの高さ（≈ 339 ≈ 597 × 9/16 = 336）に stretch、Mobile は 16:9 で高さを決める。
**DECISION L-26** sponsor ロゴはセル中央（左揃え原則の例外）。ロゴは「ラベル」ではなく「図」で、幅も形も揃わないものを左に寄せると右側の空きが不揃いに見える。placeholder の文言（§5.7.3）は例外ではない。

書き出し: スロット幅の 2 倍（DPR 2）で AVIF / WebP。`loading="lazy"`（Bento 写真は `eager`）、`width` `height` 属性で CLS 防止。alt は §8.6。

#### 5.7.3 Placeholder

| 要素 | 値 |
|---|---|
| 面 | `color/image/placeholder`（→ surface `#eae7e7`）、角丸 0、枠なし（周囲の罫線グリッドが境界） |
| アイコン | `Icon/Photo` 24、`color/ink-tertiary`（surface 上 3.50 ✓ 3:1） |
| キャプション | Caption 12、`color/image/caption`（→ ink-secondary、surface 上 5.30 ✓ AA）。**制作環境（Figma / エディタ）のみ。本番は surface のみ** |
| 配置 | 矩形: 左上 `inset/md` 16 からアイコン、`stack/xs` 8 下にキャプション（左揃え）。円: アイコンのみ中央、キャプションなし |
| sponsor placeholder cell | **DECISION L-19** 「Your logo here」（Overline/Latin）は左揃え・inset 24・垂直中央（コンセプトは中央揃えだが「ラベルはすべて左」の規則を優先） |

#### 5.7.4 Do / Don't

| Do | Don't |
|---|---|
| アイコンは Tabler outline、stroke 2、`currentColor`、内部 / 外部で矢印を分ける | 絵文字・記号文字、他セットの混在、divider 色のアイコン、3 つ目の矢印 |
| 写真は原色のまま、16:9 / 4:3 / 1:1 の 3 比率 | tint・duotone・grayscale（U-21）、任意比率 |
| focus ring は `color/focus/ring`（明るい面）/ `color/focus/ring-inverse`（インク面）/ `color/poster/focus/ring`（ポスター面） | インク面やポスター面に lime-700 の ring、面をまたいで 1 つの ring token で済ませる |

---
## 6. Components & States

範囲は「部品の形・寸法・状態・振る舞い・Figma 構成」。色は §1 のトークン名、文字は §2.3 のロール名、余白・寸法・線・アイコンは §3–§5 のエイリアス、モーションは §7 のトークンで指定し、値を再記述しない。記法: モードで異なる値は `Mono / Lime` の順。

### 6.0 部品インベントリ

| # | 部品 | 置き換える概念部品 | 出現箇所 |
|---|---|---|---|
| 1 | Button（Ground 2 / Ground Quiet 2 / On Ink 2 / Icon） | Button / Ground {Ink, Primary, Secondary, Ghost}・Button / Ink {Solid, Outline 55, Outline 100}・Button / Icon | Nav・Hero・Bento CTA・Poster・Mobile nav・Skip link |
| 2 | Link（Nav / Footer / Social / Inline） | Link {Nav, Footer, Social, Inline} | Nav・Footer・Poster・Partner cell |
| 3 | Chip（Tag / Reaction） | Tag {Neutral, Accent}・Chat / Reaction | Activity セル・Chat cell |
| 4 | Rule | Rule | 全セクション境界・行区切り・タグライン・Hero meta |
| 5 | Brand lockup | Brand / Lockup | Nav・Footer |
| 6 | Nav bar（Desktop / Mobile）+ Menu panel | Nav / Bar | 上部固定 |
| 7 | Hero / Meta strip | V2 / Hero / Meta Strip | Hero |
| 8 | Hero / Rotating word | V2 / Hero / Rotating Word | Hero |
| 9 | Section / Hero | V2 / Section / Hero | 先頭 |
| 10 | Marquee band + item + control | Marquee / Band, Item | Hero 直下 |
| 11 | Section heading | Section / Heading | 5 セクション |
| 12 | Bento grid + cell（Text / Stat / Chat / Image / CTA） | Bento / Grid, Cell * | About |
| 13 | Chat message / typing | Chat / Message, Typing | Bento Chat cell |
| 14 | Activity cell | Activity / Cell, Bento | Activities |
| 15 | Persona card | Persona / Card | For You |
| 16 | Member card（Leader / Staff） | Member / Card | Members |
| 17 | Partner cell | Partner / Cell | Partners |
| 18 | Poster CTA | Section / Poster | Join |
| 19 | Footer | Section / Footer | 末尾 |
| 20 | Image slot | Media / Image Slot | Bento・Persona・Member・Partner |

コンセプトにあって **落とした** もの: Tag `Accent 2` / `Outline`（1 アクセント原則）、テキスト記号アイコン（`→ ↑ ✳ 🙌 👀` → Tabler、§5.5）、Chat 再生ループと Hero 浮遊バブル（§7 M9）、Members 見出しの編集ヒント `写真はドロップで差し替え可`（制作ツールの痕跡）、Section heading の `note`（同）。

### 6.1 グローバル・インタラクション原則

#### 6.1.1 状態モデル

| 状態 | 発火条件 | 表現の原則 |
|---|---|---|
| Default | — | フラットな面と 1px / 2px の線 |
| Hover | ポインタが乗る（`@media (hover: hover)` 内のみ） | 塗りを §1.3.7 の段へ（950 → 800、100 → 200）／透明部品は `color/state/hover-tint` ink@6／リンクは下線 |
| Pressed | `pointerdown` 〜 `pointerup`（`:active`） | Hover の次の段（950 → 800 → 700、100 → 200 → 300）／ティントは `pressed-tint` ink@12／リンクは文字 `link/pressed`。**即時**（`motion/duration/0`） |
| Focus-visible | キーボード到達（`:focus-visible`） | `stroke/focus` 2 リング・`focus/offset` 2。他の状態と **合成** される（Figma では boolean） |
| Disabled | `<button aria-disabled="true">` | 全体 `opacity/disabled` 0.48。ページ上には出現しない（全ボタンがリンク）。ライブラリ完備のため定義 |
| Current | `aria-current="true"`（Nav のみ、任意） | 2px `color/link/current`（ink）下線（持続状態にアクセントを使わない） |

Apple HIG「Feedback」: 操作の結果は即時に、しかし控えめに。フィードバックは色と下線で足りるので、動き・影・拡縮は使わない（§6.1.3）。

#### 6.1.2 ルール一覧

| # | ルール | 値 | 根拠 |
|---|---|---|---|
| G1 | 応答は **pointer-down** で | `:active` を pointerdown で適用、`touch-action: manipulation`、`-webkit-tap-highlight-color: transparent`（独自 Pressed で置換） | §7 M1（Apple「Response」） |
| G2 | Pressed は色 1 段、**scale なし** | fill: §1.3.7 の段 / tint: `pressed-tint` | §6.1.3、§7 D6 |
| G3 | Hover はポインタデバイスのみ | すべての `:hover` を `@media (hover: hover)` で包む | タッチでは hover が固着し Pressed と区別できない。**DECISION K-14** |
| G4 | Focus ring | `outline: 2px solid <ring>; outline-offset: 2px`、`:focus-visible` のみ、`border-radius: 0`、`motion/duration/0` | §4.5、§8.4。リング色は地で決める |
| G5 | Disabled | `opacity/disabled` 0.48、`aria-disabled="true"` でタブ順に **残す**、`cursor: default`。`<a>` は Disabled を持たない（`href` を外すとフォーカス不能になる） | 支援技術に「存在するが無効」を伝える（ARIA APG）。**DECISION K-13** |
| G6 | 遷移 | 色・下線: `motion/duration/1` 100ms 入り / `motion/duration/2` 200ms 離脱、`motion/ease/color`。Pressed 入り `duration/0`。移動（Menu panel、Rotating word）は `motion/spring/*` | §7.2 |
| G7 | Reduced motion | 色の遷移は維持、移動・ループは静止（§7.5） | Apple「reduced motion ≠ no feedback」 |
| G8 | Hit area | 既定 44 × 44。可視ボックスが小さい部品は `::before { position:absolute; inset:-N }` で **レイアウトに影響せず** 拡張 | HIG 44pt、§8.3。§6.1.5 |
| G9 | Link underline | `text-decoration` 静止 2px / 状態 3px、offset 0.2em（§4.2、DECISION U-2）。`border-bottom` は使わない。太さの変更は `text-decoration-thickness` だけなのでレイアウトには影響しない | 折返し行でも下線が続く |
| G10 | Focus order | DOM 順 = 視覚順。Skip link を先頭に | §6.1.7 |
| G11 | アイコン | Tabler outline、24 grid、stroke 2、`icon/sm|md|lg` 16 / 20 / 24。装飾は `aria-hidden="true"`。絵文字・記号文字禁止 | §5、§6.1.9 |
| G12 | 角丸 | `radius/none` 0。例外は Persona イラスト・typing dot・チャット avatar の `radius/full` と、チャット吹き出しの `radius/bubble` 18（DECISION U-1）だけ | §4.1 |
| G13 | ラベル配置 | すべて左揃え（ボタン内も）。`text-align: left; justify-content: flex-start`。矢印はラベル直後 `inline/xs` 8（右端に送らない） | §3.4 DECISION L-3 |
| G14 | Cursor | link / button に `cursor: pointer` | Web の慣習。**DECISION K-15** |
| G15 | Selection | `color/selection`（ground 地）/ `color/inverse/selection`（ink 地）/ `color/poster/selection`（Poster）、文字は面の primary を強制。上の文字 10.23 / 10.28 / 10.27 | §1.3.6 |

#### 6.1.3 Pressed に scale(0.98) を使わない

Apple の `scale(0.97)` は「押し込める物体」の比喩で、影・奥行きを持つ UI に合う。本システムは **印刷物のように平ら**（「Nothing floats」、影ゼロ、角丸ゼロ、2px 罫線）で、次の 3 点から scale を採用しない。

1. 0.98 × 44px = 0.44px のずれ。角丸 0 の矩形が 1px 枠・2px 罫線の上で拡縮するとエッジがサブピクセルで滲み、罫線グリッドの精度が損なわれる。
2. 色 1 段の変化は pointer-down で即時に出せる（Apple の要件を満たす）。
3. Reduced motion で分岐が不要になる（色は前庭系に影響しない）。

代わりに **Pressed = Hover の次の段** を必ず用意する（「pressed one step past base」）。

#### 6.1.4 色トークンと比

部品が参照する色トークンは §1.3、面ごとの比は §1.4 に一本化した（ティント面上の値 ★ を含む）。**ティントされる面（Activity セル、Menu row、透明ボタン）の小さな文字は `ink-secondary` 以上**（DECISION K-1: `ink-tertiary` 3.85 は hover-tint 上 3.42 / pressed-tint 上 3.05 で AA を割る。secondary は 5.19 / 4.62 ✓）。階層は色ではなくロール（Subheadline 700 / Overline / Body S）で足りる。

#### 6.1.5 Hit area（44px 規則）

| 部品 | 可視サイズ | 44 の作り方 |
|---|---|---|
| Button md、Icon button md、Marquee control | 44 | そのまま |
| Button sm、Icon button sm（Desktop のみ） | 36 | ポインタ専用（§3.0 原則 5、WCAG 2.5.8 の 24 は満たす）。`@media (pointer: coarse)` では md を使う。Nav CTA は `::before { inset: -4px }` で 44 に拡張（隣接 gap 16 と重ならない） |
| Nav link | Label/Nav 行ボックス 20 | `::before { inset: -12px -4px }` → 44 高。横 ±4 で隣接 gap `inline/md` 16 の間に 8 が残る |
| Footer link | Footnote 行 20 | `::before { inset: -12px -4px }` |
| Social link | Overline 行 16 | `::before { inset: -14px -4px }`。gap `inline/md` 16 |
| Inline link（段落内） | 行内 | 例外（WCAG 2.5.8 inline）。Partner cell の単独リンクは Footer と同じ拡張 |
| Menu row | 44 高 | `size/control/md` |
| Brand lockup | 28 高 | `::before { inset: -8px -4px }` |
| Chip、Marquee item | 非インタラクティブ | 不要 |

隣接ターゲットは拡張領域が重ならないよう gap ≥ 8 を確保する。

#### 6.1.6 Link underline レシピ

```css
.link {
  text-decoration-line: underline;
  text-decoration-thickness: 1px;        /* stroke/hair。inline の hover は 2px */
  text-underline-offset: 0.2em;          /* 和文のベースライン下、Latin のディセンダと衝突しない */
  text-decoration-color: currentColor;   /* color/link-underline。nav / brand の hover は color/link/hover */
  text-decoration-skip-ink: none;        /* 線として読ませる */
}
```

- 状態は **下線の有無・太さ・色 + プレス時の文字色** で作る（§1.3.6 のモデル）。
- Nav / Brand / Footer / Social は at rest 下線なし、hover で下線。Inline は常時 1px。
- `border-bottom` 方式（概念 H:221, H:235）は採用しない: 折返し・`text-underline-offset` に追従できない。Figma は高さ 1 / 2 の RECTANGLE（幅 FILL）。

#### 6.1.7 フォーカス順序と支援技術

1. Skip link `本文へスキップ`（フォーカス時のみ表示）
2. Nav: Brand lockup → About / Activities / Members / Partners → CTA `参加する`
3. Mobile: Brand → CTA → Menu button →（open 時）Menu rows → Menu CTA
4. Hero: 主 CTA → 副 CTA
5. Marquee: トラックは `aria-hidden="true"`（複製グループ含む）。**停止/再生ボタンのみ** フォーカス可（§6.9.3）
6. Bento: Chat cell は `<figure>` の静的内容 → CTA cell のボタン
7. Activities: 各 row の `<a>`（名前 = title + subtitle）
8. For You / Members: 対話なし
9. Partners: 対話なし
10. Poster: CTA → X / Instagram / GitHub
11. Footer: Brand → 4 リンク

Rotating word: 可視部分は `aria-hidden`、`<h1>` の名前は visually-hidden の全文 `仲間と、学ぶ。創る。話す。`（§8.5）。`aria-live` は使わない。アンカー移動後は見出しへフォーカス（`tabindex="-1"`、§7.4.6）。

#### 6.1.8 モーション（§7 のトークンで参照）

| 対象 | 通常 | Reduced motion |
|---|---|---|
| 色・下線・背景（Hover / Current） | `motion/duration/1` 入り / `duration/2` 離脱、`motion/ease/color` | 同じ |
| Pressed 入り・Focus ring・アイコン差し替え | `motion/duration/0` | 同じ |
| Menu panel 開閉 | `motion/spring/quick`、Nav 下罫を起点に `translateY(−100% → 0)`（`overflow: hidden` のラッパー内）、閉じは逆再生 | `opacity` `duration/2` |
| Marquee | `motion/marquee/speed` 40 px/s `linear`。hover / focus-within / pointer-down / control で停止 | 静止（先頭グループを折返し配置） |
| Rotating word | `motion/word/period` 2.5s、退出 `spring/quick`、入り `spring/default`、**無限ループ**（DECISION U-15） | 静止 `学ぶ。` |
| Typing dots | `motion/dots/period` 1.2s、セル可視時のみ | 静止（opacity 1） |
| Chat 再生 | `motion/chat/step` 900ms ごとに 1 手、一巡したら `motion/chat/hold` 2.4s 置いて先頭へ（U-16） | 静止（全行を表示） |
| Photo 送り | `motion/photo/step` 4s ごとに 1 枚、`spring/default` でスライド（U-18） | 静止（先頭の 1 枚） |
| Button / Link hover | 色・下線のみ（矢印の移動など装飾の動きは足さない、M9） | 同じ |

Spring は移動にだけ使う（M2）。本章の部品で移動するのは Menu panel と Rotating word のみ。

#### 6.1.9 アイコン規則

| 用途 | アイコン | サイズ | 置き換える記号 |
|---|---|---|---|
| サイト内へ進む（Activity badge） | `arrow-right` | control sm 16 / md 20、文中 16 | `→` |
| 外部へ出る（Discord、X、Instagram、GitHub、mailto） | `arrow-up-right` | 同上 | `→` |
| ページ内スクロール（Hero `活動を見る`、Nav リンク） | なし | — | `→` を削除（R9） |
| Persona の推薦行 | `arrow-right`（先頭。「次に」を指す指示子） | 16 | `→` |
| Marquee separator | `asterisk` | `icon/md` 20 | `✳` |
| Hero meta separator | Rule 1/V（1 × 12 hairline） | — | `✳`（§4.3 規則 7） |
| Chat reaction | 実際の絵文字 👍 / 👀（U-25） | 16 相当 | `🙌` → 👍 |
| Marquee 停止 / 再生 | `player-pause` / `player-play` | `icon/lg` 24 | — |
| Mobile menu 開 / 閉 | `menu-2` / `x` | Icon button md 24（sm なら 20） | — |
| Image placeholder | `photo` | 24 | — |
| Discord への導線（ボタン） | `brand-discord`（**先頭**）+ `arrow-up-right`（末尾） | 16 / 20 | — |
| SNS への導線（X / Instagram / GitHub） | `brand-x` / `brand-instagram` / `brand-github`（**先頭**）+ `arrow-up-right`（末尾） | 16 | — |

**DECISION U-19** Discord と SNS の導線にはブランドマークを**先頭**に添える。行き先が「外部」であることは `arrow-up-right` が言うが、**どこへ**行くかは文字を読まないと分からない。ロゴは読む前に分かる唯一の記号で、ここだけは §5.1 の「アイコンは装飾、意味は隣の文字が運ぶ」の例外にあたる（マークそのものが固有名詞）。

例外の範囲を閉じるため、次の 2 つは守る。(1) マークを置くのは**サービスへ出る導線だけ**。節の見出しや本文には置かない。(2) Nav の CTA には置かない — sm の 36 に 16 のマークと 8 の送りを足すと Mobile 390 の幅検算（§6.7.2 の 374）が 398 になって溢れる。

- Icon button の径は 1 か所で決める: **sm 36 → 20、md 44 → 24**（§5.2）。
- stroke-width は 24 grid の 2 のまま拡縮。数値を上書きしない。色は `currentColor`（例外は `pop/separator`）。
- アイコンは **末尾**（trailing）、ラベル直後 `inline/xs` 8。文中は `inline/icon` 4。例外は Persona 推薦行の先頭矢印。
- `<svg aria-hidden="true" focusable="false">`。アイコンのみのボタンは `aria-label` 必須。Social はテキストラベルのみで brand アイコンを使わない（**DECISION K-10**: Poster はタイポグラフィで組む）。

### 6.2 Button

#### 6.2.1 目的と解剖

行動を起こす唯一の「面」。ページの CTA はすべて Discord への導線か、ページ内移動。

```
[ inset ][ label ][ inline/xs 8 ][ icon ][ inset ]      高さ = size/control/*（高さ駆動、ラベルは垂直中央）
```

| 要素 | 仕様 |
|---|---|
| Container | `display: inline-flex; align-items: center; justify-content: flex-start`、`radius/none`、`height: var(--control)`、`box-shadow: inset 0 0 0 1px <border>`（境界は inset shadow で描き、全スタイルの高さを同一に保つ） |
| Label | `Label/M`（md）/ `Label/S`（sm）= LINE Seed JP **Bold 700**、行ボックス 20、tracking 0、`white-space: nowrap`、左揃え |
| Icon | Tabler、trailing、`currentColor`、`showIcon=false` で省略 |
| fullWidth | `width: 100%`。ラベルと矢印の並びは変えない（矢印はラベル直後、DECISION L-3） |

#### 6.2.2 サイズ（§3.4 の 2 段）

| Size | 高さ | 横 inset | Label | Icon | 用途 |
|---|---|---|---|---|---|
| **sm** | 36 `size/control/sm` | `inset/md` 16 | `Label/S` 14 / 20 | `icon/sm` 16 | Desktop Nav CTA、Desktop Skip link。**ポインタ専用** |
| **md（既定）** | 44 `size/control/md` | `inset/control` 20 | `Label/M` 15 / 20 | `icon/md` 20 | Hero・Bento CTA・Poster・Mobile Nav CTA・Menu panel CTA・Mobile Skip link |

- 幅 = inset × 2 + ラベル + 8 + アイコン。Label/M の全角 1 字 = 15px、Latin Bold ≈ 0.609em ≈ 9.1px（§2.0）。
- 検算: `参加する` + arrow = 20 + 60 + 8 + 20 + 20 = **128**；`活動を見る`（アイコンなし）= 20 + 75 + 20 = **115**；Hero 2 本 = 128 + 12 + 115 = **255 ≤ 342** で Mobile も 1 行。`Discordに参加する` = 20 + (64 + 75) + 8 + 20 + 20 = **207**。Nav sm `参加する` = 16 + 56 + 8 + 16 + 16 = **112**。
- コンセプトの 34.8 / 44 / 46 を 36 / 44 の 2 段に正規化（DECISION L-2）。

#### 6.2.3 スタイル × 状態マトリクス

Focus-visible は全スタイル共通で **リング 2px offset 2**、色は地で決まる（ground 地 `focus/ring`、ink / poster 地 `focus/ring-inverse`）。Disabled は `opacity/disabled`（ほかの状態を持たない）。

**地 = ground（`Button / Ground`, `Button / Ground Quiet`）**

| Style | 状態 | fill | label | border 1px | 概念部品 |
|---|---|---|---|---|---|
| **Ink solid** | Default | `action/fill` 950 | `action/ink` ground（14.86） | — | Ground / Ink（H:28） |
| | Hover | `action/fill-hover` 800 | ground（9.04） | — | |
| | Pressed | `action/fill-pressed` 700 | ground（5.83） | — | |
| **Accent primary**（ライブラリ） | Default | `accent` lime-400 | `on-accent` ink（10.83） | — | Ground / Primary（S:81） |
| | Hover | `accent-hover` lime-500 | ink（8.52） | — | |
| | Pressed | `accent-pressed` lime-600 | ink（5.42） | — | |
| **Outline**（ライブラリ） | Default | なし | `ink` | currentColor（ink） | Ground / Secondary（S:84） |
| | Hover | `state/hover-tint` | ink（13.21） | ink | |
| | Pressed | `state/pressed-tint` | ink（11.78） | ink | |
| **Ghost**（ライブラリ） | Default | なし | `ink`（14.86） | — | Ground / Ghost（S:87） |
| | Hover | `state/hover-tint` | ink（13.21） | — | |
| | Pressed | `state/pressed-tint` | ink（11.78） | — | |

- **DECISION K-5** Accent primary・Outline・Ghost は **ページに置かない**（§1 C-18。Lime が着色する 4 箇所に CTA は含まれず、アクセント文字のボタンは Mono 原則に反する。加えて lime-400 の面は地に対し 1.37 で輪郭が読めない、C-25）。ページの ground 地ボタンは Ink solid（Nav CTA・Menu panel CTA・Skip link）のみ。
- **DECISION K-2** Outline の枠は `color/divider`（2.59）ではなく **currentColor（ink）**。枠だけがボタンを識別する情報なので非テキスト 3:1 が要る（WCAG 1.4.11）。
- Ghost のラベルは ink 固定（R21）。

**地 = ink（`Button / On Ink`）**

| Style | 状態 | fill | label | border 1px | 概念部品 |
|---|---|---|---|---|---|
| **Ground solid** | Default | `inverse/action/fill` 100 | `inverse/action/ink` ink（14.86） | — | Ink / Solid（H:46, 233） |
| | Hover | `inverse/action/fill-hover` 200 | ink（13.51） | — | |
| | Pressed | `inverse/action/fill-pressed` 300 | ink（11.19） | — | |
| **Outline** | Default | なし | `inverse/ink` | `inverse/outline`（14.86） | Ink / Outline 55・100 を統合（R3） |
| | Hover | `inverse/state/hover-tint` | ground（10.58） | 同 | |
| | Pressed | `inverse/state/pressed-tint` | ground（7.06） | 同 | |

- 制約: **Outline は ink 地専用**（Hero・Bento Ink cell）。Lime の Poster は明るい面なので、グラウンド色の枠・ラベルが 1.53 で読めない（§1.4.4）。Poster の CTA は **Ink solid**（`poster/action/*`）のみで、面 vs 地が 10.83 / 7.61 で UI 3:1 ✓。
- 同じ面に主ボタン（Ground solid）があるとき副次は Outline。

**Icon button（`Button / Icon`）**

| Tone | 状態 | fill | icon | 用途 |
|---|---|---|---|---|
| Ground | Default | なし | `ink` | Mobile menu（`menu-2` / `x`）、Marquee control（`player-pause` / `player-play`） |
| | Hover / Pressed | `state/hover-tint` / `pressed-tint` | ink | |
| Ink | Default | なし | `inverse/ink` | （ライブラリ）Ink 地の閉じるなど |
| | Hover / Pressed | `inverse/state/hover-tint` / `pressed-tint` | ground | |

サイズ: **sm 36（icon 20、Desktop・ポインタ専用）、md 44（icon 24、Mobile）**。正方形。`aria-label` 必須。Menu button に `aria-expanded` `aria-controls`。

#### 6.2.4 キーボードとポインタ

| 入力 | 振る舞い |
|---|---|
| Pointer down | 即時に Pressed（`duration/0`）。ドラッグして外へ出たら Default に戻し、戻れば再度 Pressed（Apple「cancel-by-dragging-away」） |
| Pointer up（要素内） | 発火。Pressed → Hover（ポインタ）/ Default（タッチ）へ `duration/1` |
| Hover | ポインタデバイスのみ |
| Tab | `:focus-visible` リング（`duration/0`）。マウスクリックでは出さない |
| Enter / Space | `<button>` は両方、`<a>` は Enter のみ（ブラウザ既定を上書きしない） |
| Disabled | `<button aria-disabled="true">` のみ。クリックを無視、タブ順に残す |

#### 6.2.5 コンテンツ規則（§9.6）

- ラベルは **目的語 + 動詞終止形** 2–10 全角字（`参加する`、`活動を見る`、`Discordに参加する`、`パートナーになる`）。名詞だけの CTA は不可。1 行固定、折返し禁止。
- 和欧間に手動スペースを **入れない**（`Discordに参加する`）。自動アキも無効（§2.6.2）。
- 外部リンクは `arrow-up-right`、サイト内は `arrow-right`、ページ内スクロールはアイコンなし（§6.1.9）。矢印は必ず末尾。
- ラベルに記号（`→`、`!`）を含めない。
- 同一画面の主 CTA は 1 つ（Hero: Ground solid、Poster: Ground solid、Bento: Outline は副次）。

#### 6.2.6 Figma

| Set | Variant 軸 | 数 | Component properties |
|---|---|---|---|
| `Button / Ground` | `Style` {Ink, Accent} × `Size` {sm, md} × `State` {Default, Hover, Pressed, Disabled} | 16 | `label` TEXT、`showIcon` BOOL(true)、`icon` INSTANCE_SWAP(`arrow-up-right`)、`focus` BOOL(false)、`fullWidth` BOOL(false) |
| `Button / Ground Quiet` | `Style` {Outline, Ghost} × Size 2 × State 4 | 16 | 同上 |
| `Button / On Ink` | `Style` {Ground, Outline} × Size 2 × State 4 | 16 | 同上 |
| `Button / Icon` | `Tone` {Ground, Ink} × `Size` {sm, md} × State 4 | 16 | `icon` INSTANCE_SWAP、`focus` BOOL |

- Focus を State 軸ではなく boolean にする理由: フォーカスは Hover / Pressed と **同時に成立** する。
- `focus=true` はラッパーの 2px 外側ストローク（offset 2）。リング色は Set ごとに固定（Ground set → `focus/ring`、On Ink set → `focus/ring-inverse`）。
- 高さは `size/control/*` を bind、幅 hug（`fullWidth` は FILL）、`counterAxisAlignItems: CENTER`。

#### 6.2.7 ページ上の使用

| 場所 | Set / Style / Size | ラベル | アイコン |
|---|---|---|---|
| Nav CTA（Desktop） | Ground / Ink / **sm** | `参加する` | `arrow-up-right` 16 |
| Nav CTA（Mobile） | Ground / Ink / **md** | `参加する` | `arrow-up-right` 20 |
| Hero 主 | On Ink / Ground / md | `参加する` | `arrow-up-right` 20 |
| Hero 副 | On Ink / Outline / md | `活動を見る` | なし（ページ内スクロール） |
| Bento CTA | On Ink / Outline / md | `Discordに参加する` | `arrow-up-right` 20 |
| Poster | On Ink / Ground / md | `Discordに参加する` | `arrow-up-right` 20 |
| Mobile menu | Icon / Ground / md | — | `menu-2` / `x` 24 |
| Menu panel CTA | Ground / Ink / md、`fullWidth` | `参加する` | `arrow-up-right` 20 |
| Marquee control | Icon / Ground / md | — | `player-pause` / `player-play` 24 |
| Skip link | Ground / Ink / sm（D）/ md（M） | `本文へスキップ` | なし |

Desktop Nav に sm を使う理由: バー高 `nav/pad-y` 12 + 36 + 12 + `stroke/rule` 2 = **62**（§3.9）。Mobile は 8 + 44 + 8 + 2 = 62 で同じ帯高を保つ。

### 6.3 Link

#### 6.3.1 目的と解剖

テキストのまま遷移する部品。状態は **下線（有無・太さ・色）+ プレス時の文字色**（§1.3.6、§6.1.6）。

| Style | ロール・色 | at rest | Hover | Pressed | Current | Focus ring |
|---|---|---|---|---|---|---|
| **Nav** | `Label/Nav` 14、`ink` | 下線なし | 文字 ink のまま + **3px `link/hover`** 下線（6.31 U） | 文字 `link/pressed` lime-900（7.85）+ 下線維持（`duration/0`） | **3px `link/current`**（ink）下線（`aria-current`、任意） | `focus/ring` |
| **Footer** | `Footnote` 13、`ink-secondary`（5.83） | 下線なし | 文字 `ink` + 3px currentColor 下線 | 文字 `link/pressed` | — | `focus/ring` |
| **Social**（Poster 上） | `Overline/Latin` 12 UPPER、`poster/ink-secondary`（11.78 / 4.82） | 下線なし | 文字 `inverse/link/hover`（poster/ink）+ 3px 下線 | = Hover（R5） | — | `focus/ring-inverse` |
| **Inline**（段落・Partner cell） | 継承サイズ Bold、`ink` | **2px** 下線常時（`link-underline`） | 下線 **3px**（文字は ink） | 文字 `link/pressed`（下線は currentColor で追従） | — | `focus/ring` |

- Hover で文字色を変えない（Mono 原則: アクセントは一時的状態でも「印」として現れる）。
- **DECISION K-3 改** Link の Pressed は文字色 1 段（`link/pressed`）を `duration/0` で出す。タッチではこれが唯一の押下フィードバック。暗い面（Social）だけはアクセント文字が置けないため Hover と同じ表現。
- **DECISION K-4 改** Current は 3px `ink` 下線。持続状態にアクセントを使わない。
- **DECISION U-2** 静止 2px / 状態 3px。1px は 124px の Display や 32px の見出しと同じ画面に置くと消える。太さの梯子を hairline 罫（1）から切り離したので、罫線の細さは保ったまま下線だけ上げられる。

#### 6.3.2 振る舞い

- Nav link はページ内アンカー（`scroll-behavior: smooth`、Reduced motion で `auto`）。`aria-current="true"` を使う場合は IntersectionObserver 閾値 50%。
- 外部リンク（Social・Discord・mailto）は **`target="_blank"` を使わない**（§8.5、ユーザーの制御）。visually-hidden で `（外部）` を添え、`arrow-up-right` を付ける。文字ラベルは CSS で大文字化し、ソースは `X` `Instagram` `GitHub` の正書法。
- Hit area は §6.1.5。

#### 6.3.3 コンテンツ規則

- Nav ラベルは英語 1 語（`About` `Activities` `Members` `Partners`）。セクション見出しの label と対応させる。
- Inline link は文の中で **動詞句** を丸ごとリンクにする（`パートナーになる` + `arrow-up-right` 16）。「こちら」禁止。

#### 6.3.4 Figma

`Link`: `Style` {Nav, Footer, Social, Inline} × `State` {Default, Hover, Pressed, Current}、sparse **12**（Nav 4、Footer 3、Social 2、Inline 3）。Props: `label` TEXT、`showIcon` BOOL(false)、`icon` INSTANCE_SWAP、`focus` BOOL。下線は高さ `stroke/underline` 2 / `stroke/underline-strong` 3 の RECTANGLE（幅 FILL、絶対配置。fill = 文字色または `link/hover` / `link/current`）。

### 6.4 Chip（Tag / Reaction）

Activity セル のキーワードと Chat のリアクションを **同じ 24px チップ** で表す（1 装置）。**非インタラクティブ**（状態なし）。

| 項目 | 値 |
|---|---|
| 高さ | `size/chip` **24**（Caption 行 18 + 上下 3）。アイコン 24 grid と同じ高さで行に揃う |
| 横 inset | `inset/xs` 8 |
| 面 | `color/chip/fill`（→ surface、neutral-200）、枠なし（罫線は構造専用、§6.5） |
| 面 vs 地 | ground 1.10（罫線なしに輪郭が読める最小段）。pressed-tint 上 1.15 |
| Tag ラベル | `Caption/Regular` 12、`color/chip/ink`（→ ink-secondary、5.30） |
| Reaction | 絵文字（👍 / 👀）16 相当 + `inline/icon` 4 + `Caption/Bold` 数字 `ink`（13.51）。絵文字は Discord の実際のリアクションを写すので実文字で置く（**DECISION U-25**、§5.1 の例外）。数字は再生中に 1 から最終値まで 1 ずつ巻き上がる — 旧値が上へ抜け、新値が下から入る `spring/quick`（間隔は §6.12） |
| Accent（ライブラリ） | 面 `accent-subtle` lime-200、文字 `on-accent-subtle` lime-900（7.49）。ページに出さない（K-5） |
| Inverse（ink 面） | 面 `color/inverse/chip/fill`（→ ground@12、hover tint と同じ段）、文字 `color/inverse/chip/ink`（→ inverse/ink-secondary、≈ 8.3）。Cell Stat の所属バッジ（U-29）だけに出る |
| radius | `radius/none` |

- コンセプトの Tag 塗り neutral-50 は ground 比 1.02 で輪郭が見えない。hairline 枠案は「1px 線 = 行・語の仕切り」という語彙を崩すので採らない（R2）。
- Reaction の `<span role="img" aria-label="いいね 3">`（内部の svg と数字は presentational）。Tag は `<ul aria-label="キーワード">` の `<li>`。
- フィルタとして対話化する必要が生じたら Chip ではなく Button Outline sm を使う（24px は hit area 拡張でも隣接が密になり過ぎる）。

Figma: `Chip` `Kind` {Tag, Reaction} × `Tone` {Neutral, Accent, Inverse} sparse 4。Props: `label` `emoji` TEXT。

### 6.5 Rule

| Variant | 太さ | 向き | 色 | 用途 |
|---|---|---|---|---|
| Rule 2 / H | `stroke/rule` 2 | 横、幅 FILL | `color/divider` | Nav 下・Marquee 上下・セクション上・Footer 上・罫線グリッド |
| Rule 1 / H | `stroke/hair` 1 | 横 | `color/divider-hairline` | Activity セル 上・一覧末尾・Menu row 間 |
| Rule 1 / V | 1 | 縦、高さ `size/rule-v` 12 | `divider-hairline`。Hero meta では **currentColor**（区切りは行の文字色を継ぐ） | Brand tagline の左、Hero meta の区切り |
| Rule 2 / V | 2 | 縦 | `divider` | Marquee control の左、（ライブラリ）横並びセルの区切り |

- 2px = 構造（セクション・グリッド）、1px = 行・語の区切り。**この 2 段しか使わない**（§4.2）。
- Ink 地には罫線を引かない。
- 罫線は装飾（1.4.11 対象外）なので `divider` 2.59 で良いが、**部品の境界**（ボタン枠）には使わない（K-2）。

Figma: `Rule` `Weight` {2, 1} × `Orientation` {Horizontal, Vertical} = 4。

### 6.6 Brand lockup

```
[ mark ][ inline/sm 12 ][ ChoTech ][ 12 ][ Rule 1/V ][ 12 ][ Hack Your Limits. ]
```

| 要素 | Nav | Footer |
|---|---|---|
| mark | `icons/mark.svg`（図の外接矩形 704 × 704、原色）を `size/mark-nav` **24** × 24 | `size/mark-footer` **20** × 20 |
| wordmark | `Title/3` 19、`ink` | `Headline` 17 |
| tagline | Rule 1/V（高さ 12）+ `Caption/Bold` 12、`ink-secondary`（5.83）、`lang="en"` | 同 |
| gap | `inline/sm` 12（DECISION L-12） | 同 |
| showTagline | Desktop true / Mobile **false**（Nav 幅の検算 §6.7.2） | true |

状態（全体が `#hero` へのリンク）: Hover = wordmark の下に 2px `link/hover` 下線（Nav link と同じレシピ）、Pressed = wordmark 文字 `link/pressed`、Focus = `focus/ring`。mark と tagline は変化しない。

**DECISION L-30** mark は favicon.svg ではなく、図の外接矩形で切った `icons/mark.svg` を 24 / 20 で置く。favicon.svg は図が箱の 65% しかなく（maskable アイコン用の余白）、28 の箱では図が 18 前後にしか見えないうえ、余白ぶん wordmark から離れて見えた — gap `inline/sm` 12 は図の縁から測って 12 でなければならない。図の実寸は旧 18 → 24 / 16 → 20。hit area 44 は wordmark の行ボックス（26 / 24）を Nav ±9 / Footer ±10 に広げて保つ（§8.3）。Footer も同じ部品なので同時に変わる。

Figma: `Brand / Lockup` `Size` {Nav, Footer} × `State` {Default, Hover} = 4。Props: `name` `tagline` TEXT、`showTagline` BOOL、`focus` BOOL。

### 6.7 Nav bar

#### 6.7.1 Desktop（1440）

| 項目 | 値 |
|---|---|
| 高さ | **62** = `nav/pad-y` 12 + `size/control/sm` 36 + 12 + `stroke/rule` 2 |
| 横 | full-bleed、`page/inset` 24（container に縛らない: バーは紙の端まで、DECISION L-23） |
| 構成 | Brand lockup（左）← `margin-right: auto` → Link Nav × 4（gap `inline/md` 16）→ 16 → Button Ground / Ink / sm `参加する` + `arrow-up-right`（Discord マークは置かない: U-19。U-27 で一度足したが同日に撤回 — 帯の CTA は文言だけで足りる） |
| 塗り | `ground`、下辺 Rule 2/H |
| 固定 | `position: sticky; top: 0`。不透明（半透明マテリアルは使わない: フラット原則、`prefers-reduced-transparency` 分岐不要） |
| スクロール中 | 変化なし（影・縮小・自動隠しをしない、§7 D7）。セクションに `scroll-margin-top: var(--size-nav)` |

#### 6.7.2 Mobile（390）

| 項目 | 値 |
|---|---|
| 高さ | 62 = 8 + `size/control/md` 44 + 8 + 2（DECISION L-22） |
| 構成 | Brand（tagline なし）← auto → Button Ground / Ink / md `参加する` + `arrow-up-right` → `inline/sm` 12 → Icon button md `menu-2` |
| 幅検算 | 24 + mark 24 + 12 + wordmark 95（`ChoTech` Title 3 19、実測）+ ≥ 16 + CTA 127（inset 20 + ラベル 59 + 8 + 矢印 20 + 20）+ 12 + 44 + 24 = **378 ≤ 390**（実測 2026-09-05: brand 131、CTA 127、余り 28）。wordmark は `white-space: nowrap` で折らない |

#### 6.7.3 Menu panel（Mobile、DECISION K-6）

| 項目 | 値 |
|---|---|
| 位置 | Nav bar 直下、幅 100%、`ground`、下辺 Rule 2/H |
| 行 | Menu row 高 `size/control/md` 44、`Label/Nav` 14 `ink`、横 inset `page/inset` 24、行間 Rule 1/H。4 行 + 末尾に Button Ground / Ink / md `参加する`（`fullWidth`、上下 `inset/md` 16、左右 24） |
| 状態（row） | Default `ink` / Hover `state/hover-tint`（13.21）/ Pressed `pressed-tint`（11.78）/ Current ラベル幅の 2px `link/current` 下線（R16。左の縦バーは §4.3 規則 6 に反する）/ Focus **inset** ring（offset −2、K-7） |
| 開閉 | Icon button `aria-expanded` `aria-controls`。開: **フォーカスはボタンに留める**（非モーダル disclosure、APG）。ArrowDown で 1 行目へ。閉: Escape / 外側タップ / 行選択、フォーカスをボタンへ戻す。アイコン `menu-2` ↔ `x` は `duration/0` |
| モーダル性 | 非モーダル（背後を暗くしない・スクロールロックなし）。項目 4 つの開示であり、Apple「dim to focus, separate to keep flow」の後者 |
| モーション | `motion/spring/quick`、Nav 下罫直下の `overflow: hidden` ラッパー内で `translateY(−100% → 0)`、閉じは逆再生。項目に stagger なし（§7.4.6） |

#### 6.7.4 Figma

`Nav / Bar` `Viewport` {Desktop, Mobile} × `Menu` {Closed, Open} sparse 3。`Nav / Menu Row` `State` {Default, Hover, Pressed, Current} 4 + `focus` BOOL。Props: nested（brand、link1–4、ctaLabel）。

### 6.8 Hero

#### 6.8.1 Section / Hero（解剖）

```
┌ inverse/ground  ─ 背景写真（不透明度 0.2、原色）────────────────────────────┐
│ section/pad-display 96 (M 64)                                                  │
│ SINCE 2025 | 長崎大学公認 学生団体 |                     meta strip（折返し）  │
│ サポーターズ 技育プロジェクト 学生団体公式パートナー | MEMBERS 50+              │
│ stack/xl 32                                                                    │
│ 仲間と、学ぶ。                                            h1 = lead-in + word   │
│   ink    accent                                                                │
│ stack/xl 32                                                                    │
│ 長崎にテック好きのためのハブを。                          lead (Title/1)       │
│ stack/xs 8                                                                     │
│ 段落 Body/L、measure/paragraph 588                                              │
│ stack/xl 32                                                                    │
│ [ 参加する [arrow-up-right] ]  inline/sm 12  [ 活動を見る ]                     │
│ section/pad-bottom 80 (M 64)                                                   │
└────────────────────────────────────────────────────────────────────────────────┘
```

| 要素 | 仕様 |
|---|---|
| 面 | `color/inverse/ground`。`min-height: min(100svh − var(--size-nav), var(--size-hero-max))`、内容は垂直中央（DECISION L-7）。full-bleed、内容は container 1200 / 342 |
| 背景写真 | ink 面の**上**に `--hero-backdrop-opacity` **0.2** で重ねる（`cover`、原色 U-21、`aria-hidden`）。動きは §7.3（U-20）。**不透明度は測って決める値**: 実レンダリングの合成結果から測った文字コントラストの最小は ink 8.94 / secondary 7.37 / **tertiary 5.55**（12px の meta strip が最も厳しい）で、AA 4.5 を下回る面積は 0 %。素材を替えたら測り直す — 明部の多い写真は同じ 0.2 で通らない |
| 格子線 | **なし**（**DECISION U-22**: K-12 の 4 本を撤去。写真の上に線が乗ると写真の一部に見え、何の線か分からない。`color/inverse/hairline` は用途を失うが、トークンは残す） |
| Meta strip | §6.8.2 |
| h1 | `Display/XL` 124 / 56。lead-in `仲間と、` **`inverse/ink`**（14.86）+ Rotating word（§6.8.3、`color/hero/word`）。**白 → アクセントの 2 色**で「仲間と ＋ 動詞」を対比させる（DECISION U-3）。Desktop 1 行（7 全角 × 124 × 0.98 ≈ 851 ≤ 1200）。Mobile は読点で 2 行（`仲間と、` / `学ぶ。`）。`text-wrap: balance` は使わず著者改行 |
| lead | `Title/1` **32 / 26**、`inverse/ink`（14.86）。Display 124 と本文 16 の間に中間の階層を作る（**DECISION U-5**） |
| 段落 | `Body/L` 16、`inverse/ink-secondary`（11.78）、`max-width: measure/paragraph` 588（≈ 36.8 全角）。Mobile は container 幅 |
| actions | 横 flex、gap `inline/sm` 12。主 = On Ink / Ground / md、副 = On Ink / Outline / md（アイコンなし）。Mobile も 1 行（255 ≤ 342） |
| 縦リズム | meta → h1 → lead → actions は `stack/xl` 32、lead → 段落は `stack/xs` 8（DECISION L-6） |
| 状態 | ボタン §6.2、Focus ring `focus/ring-inverse`、Selection `inverse/selection` |
| Reveal | §7.4.1（Hero はオブザーバなし、`document.fonts.ready` か 400ms） |

#### 6.8.2 Hero / Meta strip

| 要素 | 仕様 |
|---|---|
| 項目 | `Overline/Latin` 12 UPPER（`Since 2025`、`Members 50+`）/ `Overline/JP` 12（`長崎大学公認 学生団体`、`サポーターズ 技育プロジェクト 学生団体公式パートナー`）、`inverse/ink-tertiary`（8.29）。**DECISION U-13** 公認と公式パートナーは同じ強さで並べる — どちらも「第三者が裏づけた事実」で、片方だけを本文に落とすと格が下がって見える |
| 区切り | Rule 1/V 1 × 12、**currentColor**（DECISION L-16） |
| gap | `inline/md` 16、`flex-wrap`（Desktop 1–2 行 / Mobile 3–4 行、行間 `stack/xs` 8）。区切り罫は行頭に来ないよう項目とセットで折返す |
| 意味 | `<p>`（見出しにしない、§8.5）。数字は半角、`Since 2025` に `lang="en"` は付けない（単語レベル） |

#### 6.8.3 Hero / Rotating word

| 要素 | 仕様 |
|---|---|
| 語 | `学ぶ。` / `創る。` / `話す。`（ちょうど全角 3 字、§9.3）。`Display/XL`、**`color/hero/word`**（Mono inverse/ink 14.86 / Lime lime-400 10.83） |
| 枠 | **幅 3em 固定**、新旧 2 語を絶対配置で重ねる（レイアウトシフトゼロ） |
| 下線 | **持たない**（**DECISION U-3**）。語そのものを塗る。面ではなく**文字**なので、ライムを明るい地で面に使えない制約（1.37、C-25）に触れずアクセントを 124px で出せる。墨地の上で 10.83 |
| 周期 | `motion/word/period` 2.5s で**回り続ける**（**DECISION U-15**）。退出 `spring/quick`（上へ −0.15em）、入り `spring/default`（下から +0.15em → 0）。開始は h1 の reveal 静定 2.5s 後 |
| 停止 | Hero 非可視・タブ非表示・Marquee control（§6.9.3）・reduced-motion（静止 `学ぶ。`） |
| 支援技術 | 可視部分 `aria-hidden`、名前は visually-hidden の全文（§6.1.7） |

#### 6.8.4 Figma

`Hero / Meta Strip` 1（`item1–4` TEXT）。`Hero / Rotating Word` `Word` {学ぶ。, 創る。, 話す。} 3（下線プロパティは廃止）。`Section / Hero` `Viewport` {Desktop, Mobile} 2（`word` INSTANCE_SWAP、`leadStrong` `leadBody` `primaryLabel` `secondaryLabel` TEXT）。プロトタイプ: Word 変種を After delay 2,500ms で連結、Smart animate = `spring/default`（§7.6）。

### 6.9 Marquee band + item + control

#### 6.9.1 Band

| 項目 | 値 |
|---|---|
| 高さ | `size/band-marquee` **56**（高さ駆動。上下 Rule 2/H を含む、内側 52。項目の行ボックス 26 を中央、R6） |
| 塗り | `ground`、上下 Rule 2/H、トラックは `overflow: hidden` |
| トラック | 同一グループ × 2（`translateX(0 → −グループ幅)`）。トラック全体 `aria-hidden="true"` |
| 速度 | `motion/marquee/speed` 40 px/s `linear`（duration = グループ幅 ÷ 40、ResizeObserver）。hover / focus-within / pointer-down で `animation-play-state: paused`（`duration/0`） |
| Reduced motion | 静止。先頭グループを container 内に折返し配置、クリップなし |
| 対話 | トラックにリンクを入れない（動く要素をフォーカス対象にしない。パートナー導線は Partners セクションが担う） |

#### 6.9.2 Item

| Kind | ロール | 色 | 例 |
|---|---|---|---|
| Label | `Overline/Latin` 12 UPPER | `ink-secondary`（5.83） | `PARTNERS` |
| Word JP | `Title/3 Caps` 19（和文には uppercase 無効） | `ink` | `長崎大学`、`パートナー募集中` |
| Ghost | `Title/3 Caps` 19 UPPER | `ink-tertiary`（大型 19px 800 → 3:1 に対し 3.85 ✓） | `YOUR COMPANY HERE` |
| Separator | `asterisk` `icon/md` 20 | `pop/separator`（ink-tertiary / lime-700） | — |

アイテム間 gap `inline/xl` 32。順序: Label · ✳ · Word JP · ✳ · Ghost · ✳ · Word JP · ✳（✳ = `asterisk`）。

#### 6.9.3 Control（停止 / 再生ボタン、§7 D3）

| 項目 | 値 |
|---|---|
| 位置 | バンド右端、帯の内側高さいっぱい 52 × 幅 **44**。左に Rule 2/V `divider`、地 `ground`。トラックの上に重ねず、トラック幅を 44 + 2 だけ縮める |
| アイコン | `player-pause`（再生中）/ `player-play`（停止中）`icon/lg` 24、`ink` |
| 要素 | `<button type="button" aria-pressed="false">`、名前は **固定** visually-hidden `ページの動きを止める`。停止中は `aria-pressed="true"`（R8）。`aria-hidden` トラックの外に置く |
| 状態 | Hover `state/hover-tint`、Pressed `pressed-tint`（アイコン ink 13.21 / 11.78）、Focus **inset** ring（offset −2、K-7: 帯の上下罫と交差させない）、アイコン差し替え `duration/0` |
| 効果 | Marquee・Rotating word・Typing dots の **すべて** を停止 / 再開（§7 M8「1 つのページ内スイッチ」）。`localStorage["chotech:motion"]` に保存。reduced-motion 時の初期状態は停止（`aria-pressed="true"`、押せば再生できる） |
| 根拠 | WCAG 2.2.2 は OS 設定ではなくページ内の手段を求める。hover は停止手段にならない。ボタンはヒーロー直下にあり最初のスクロール内で見つかる |

#### 6.9.4 Figma

`Marquee / Item` `Kind` {Label, Word, Ghost, Separator} 4。`Marquee / Control` `Playing` {True, False} × `State` {Default, Hover, Pressed} 6 + `focus` BOOL。`Marquee / Band` 1（`showGroupB` BOOL、`showControl` BOOL(true)、Control を右端に配置）。

### 6.10 Section heading

```
活動内容   inline/md 16   ACTIVITY        （baseline 揃え）
```

| 要素 | 仕様 |
|---|---|
| title | `Title/1` **32 / 26**、`ink`、`<h2>`。1 行（最長 11 全角 × 26 = 286 ≤ 342）。`word-break: auto-phrase`（対応ブラウザ） |
| label | `Overline/Latin` 12 UPPER、`ink-secondary`（5.83）。`ABOUT` / `ACTIVITY` / `FOR YOU` / `MEMBERS` / `PARTNERS`。**title の後ろ**。`<p>`（見出しにしない） |
| 並び | Desktop: 横、**ベースライン揃え**、gap `inline/md` 16。Mobile: 縦、gap `stack/xs` 8、左揃え |
| 下マージン | `section/heading-mb` 32 / 24。ベントの直前 `heading-mb-list` 8（Activities）。導入文の前 `heading-mb-intro` 12 |
| note | 持たない（**DECISION K-9**: 概念の note は編集ヒントの受け皿。本番に置かない） |

- **DECISION U-4** 連番（`01 —`）を廃止し、和文の題を先・欧文ラベルを後に置く。理由は 2 つ。(1) 番号は読者に順路を約束するが、このページは目次のない 1 枚もので、飛ばし読みの入口はナビが担っている。番号は情報を足さずに視線の最初の一撃を数字に取られる。(2) 日本語話者にとって節の意味を運ぶのは和文の題であり、英字ラベルは調子付け。強い方を先に置く。
- 順序が要る場面（ナビ、目次）は DOM 順で足りる。

Figma: `Section / Heading` `Layout` {Row, Stacked} 2。Props: `title` `label` TEXT。

### 6.11 Bento grid + cells

#### 6.11.1 Grid（罫線グリッド、§3.8）

| 項目 | Desktop | Mobile |
|---|---|---|
| 描き方 | frame fill `divider`、padding `space/2`、gap `space/2`。セルが `ground` / `inverse/ground` を塗る（`border` は使わない、DECISION L-9） | 同 |
| 列 | 4 列均等（(1200 − 10) / 4 = 297.5）。2×1 = 597 | 1 列（338）、DOM 順、span 無視 |
| 行の最小高 | `size/cell-min` 120 | 120 |
| セル inset | `inset/cell` **24** | **20** |
| 行構成 | 行 1 [2×1 CULTURE · 1×1 OFFICIAL · Stat] / 行 2–3 [Chat 2×2 · Image 2×2] / 行 4 [1×1 · 1×1 · CTA 2×1] | 縦に 1 列 |
| 行の高さ | 背の高いセルが HUG で決め、同じ行の他のセルが FILL で追う（行 1 は OFFICIAL セルが駆動） | 各セルが HUG |

#### 6.11.2 Cell Text

| Kind | kicker | title | body |
|---|---|---|---|
| 2×1 | `Overline/Latin` 12 UPPER `ink-secondary` | `Title/2` 22 `ink`、≤ 2 行 | `Body/S` 14 `ink-secondary`、上 `stack/xs` 8 |
| 1×1 md | 同 | `Title/3` 19、≤ 2 行 | 同（`showBody`） |
| 1×1 sm | 同 | `Headline` 17、≤ 3 行 | 同（`showBody`） |

- セルは縦 flex、`justify-content: space-between`（kicker 上・title 下）、kicker → title の最小距離 `stack/md` 16。
- Tone Ink（ライブラリ）: fill `inverse/ground`、kicker `inverse/ink-tertiary`、title `inverse/ink`、body `inverse/ink-secondary`。
- kicker は英語 1–2 語（`CULTURE` `OFFICIAL` `ONLINE & OFFLINE` `FOR EVERYONE`）。title は `<br>` で意図的に改行してよい（ポスターの語割り）。`<h3>`。
- **DECISION U-11** `ONLINE & OFFLINE` を `ONLINE & OFFLINE` にする。「first」は序列の宣言なので、対面が二番手だという含みが残る。実態はどちらもあるので、並列の接続詞で言う。title も「チャットも通話もDiscordで。対面イベントも定期的に。」と両方を主語にする。
- **DECISION U-14** `body` は全 Kind で使える（`showBody`）。OFFICIAL セルは title に長崎大学公認、body にサポーターズ 技育プロジェクト公式パートナーを置き、**公的な裏づけを 1 セルに集約**する。
- 状態なし。

#### 6.11.3 Cell Stat（Ink）

fill `inverse/ground`。kicker `Overline/Latin` `MEMBERS` `inverse/ink-tertiary`（8.29）。value `50` **`Display/L` 96 / 40** + `+` **`Display/M` 56 / 32**、ベースライン揃え、**`inverse/ink`**（14.86、**DECISION U-24**: U-6 のアクセントを撤回。規模は色ではなく大きさで語る — lime の Display/M は kicker との間に空きが目立ち、アクセントの枠を 1 つ使うわりに釣り合わなかった）。数字の下 `stack/sm` 12 に所属のバッジ `<ul aria-label="所属">` > Chip / Tag / **Inverse**（§6.4）× 5: `長崎大学 情報データ科学部` `長崎大学 工学部` `長崎大学 大学院` `長崎県立大学` `長崎総合科学大学`。`flex-wrap`、chip 間 `inline/xs` 8。人数は確定するまで出さない（**DECISION U-29**: 文の列ではなく、Activity のキーワードと同じ装置で「タグ」として読ませる — 一覧性が高く、学部ごとに 1 つずつ数えられる）。数字とバッジは 1 つの塊としてセルの底に置く。`<p><span aria-hidden="true">50+</span><span class="vh">メンバー 50人以上</span></p>`。数字は半角（書体に `tnum` はない）。

#### 6.11.4 Cell Chat

§6.12 の部品を積む。`<figure>`: kicker `<p>` `Overline/JP`（ORIGINAL）`#general — いつものChoTech` `ink-secondary` → `stack/md` 16 → thread `<ul>`（message 間 `stack/xs` 8）→ `<figcaption>` `Caption/Regular` `こんな会話が、毎日どこかで。` `ink-secondary`、`margin-top: auto`、上 `stack/md` 16。**矢印なし**（§9.6: 注記は位置で分かる）。図の名前は figcaption（DECISION M-18）。

#### 6.11.5 Cell Image

fill `ground`、Image slot Rect / Cover を `inset: 0`。比率 **16:9**（DECISION L-20: Desktop は Chat セル高 ≈ 336 に stretch、Mobile 338 × 190）。原色（U-21）。`alt` = 被写体を 1 文 ≤ 60 字（§8.6）。

**DECISION U-18** 1 枚ではなく複数枚を横にスライドさせて回す。活動の様子は「1 枚の代表写真」では出ない — Talk Day と Hackathon と勉強会が同じ枠に並んで初めて「いろいろやっている」が伝わる。ベントの中で唯一「時間を持つ」セルになるので、隣のチャットと合わせて 2 つ以上は作らない。

| 項目 | 値 |
|---|---|
| 送り | `translateX(-n × 100%)`、`spring/default`。フェードではなく**スライド**（面が入れ替わる、という物理を保つ） |
| 間隔 | `motion/photo/step` 4,000 ms。1 枚を見終える時間 |
| ループ | 末尾に先頭の複製を 1 枚置き、そこまで送ったらトランジション無しで 0 に戻す。逆回しの掃引を見せない |
| 停止 | セルが非可視、タブ非表示、ページのスイッチ、reduced-motion。止まっているときは**先頭の 1 枚**を出す |
| 支援技術 | トラックは `aria-hidden`。写真は装飾（`alt=""`）で、活動の情報は Activities 節が本文として持つ |

#### 6.11.6 Cell CTA（Ink、2×1）

| 項目 | Desktop | Mobile |
|---|---|---|
| 構成 | 横 flex、`align-items: center`、gap `inline/md` 16 | **縦**、gap `stack/md` 16（**DECISION K-8**） |
| title | `Title/3` 19 `inverse/ink`（`まずはDiscordから`、1 行） | 同、折返し可 |
| sub | `Footnote/Regular` 13 `inverse/ink-secondary`（11.78） | 同 |
| button | On Ink / Outline / md `Discordに参加する` + `arrow-up-right` 20 | 同、`fullWidth`・左揃え |

K-8 の根拠: Mobile セル内幅 338 − 40 = 298。横並びでは title が 3 字/行になる。

- **DECISION U-10** Discord の導線は「参加する」1 本にする。「見学」という中間段階を作らない。理由: Discord に入ること自体が可逆で低コストな行為なので、その手前に軽い段階を用意しても心理的な障壁は下がらず、**導線が 2 つに割れて主導線が弱くなる**。ハードルは文言（`見るだけ参加も歓迎です`）で下げ、動詞は 1 つに保つ。

#### 6.11.7 Figma

`Bento / Cell Text` `Kind` {2x1, 1x1-md, 1x1-sm} × `Tone` {Ground, Ink} 6。`Cell Stat` 1、`Cell Chat` 1、`Cell Image` 1、`Cell CTA` `Viewport` 2、`Bento / Grid` `Viewport` 2。Props: `kicker` `title` `body` TEXT、`showBody` BOOL。**注**: `body` は当初 6 variant すべてで `characters` が未配線で、値を入れても既定文が出ていた（2026-09-01 修正）。

### 6.12 Chat message / typing

会話の「絵」。操作する UI ではないので状態も入力も持たないが、**静止画でもない** — 発言とスタンプが 1 つずつ順に現れ、最後まで出たら少し置いて先頭から繰り返す（**DECISION U-16**）。

**DECISION U-16** チャットを再生する。当初は静止スレッドにしていた（旧 M-5）。理由は「5 秒超の自動更新領域には停止 UI が要る」だったが、§7 M8 のスイッチが既にページ内の全ループを止めるので、その条件は満たされている。静止スレッドは「会話のスクリーンショット」に見え、伝えたいこと — **いま誰かが喋っていて、返事が返ってくる場所である** — が伝わらない。順に現れることでしか出せない情報なので、装飾の動き（§7 M9 が禁じるもの）には当たらない。

再生の規則:

| 項目 | 値 |
|---|---|
| 1 手の間隔 | `motion/chat/step` 900 ms。読点まで目が追える最短 |
| 一巡後の間 | `motion/chat/hold` 2,400 ms。最後の発言を読み終える時間を置いてから畳む |
| 出方 | `opacity 0 → 1` と `translateY(8 → 0)`、`spring/default`。左右の寄せは変えない（動く方向が発言者を示す情報になってしまう） |
| 高さ | **最初から全行ぶんの高さを取る**。1 行ずつ足すとセルが伸び縮みして隣の写真セルまで動く（CLS）。未再生の行は不透明度だけを 0 にする |
| 停止 | セルが非可視、タブ非表示、ページのスイッチ、reduced-motion。止まっているときは**全行を最初から見せる**（何も見えない状態で止めない） |
| リアクション数 | 行が現れて `motion/chat/reaction-delay` 300 ms 後、1 から最終値へ `motion/chat/reaction-tick` 260 ms 間隔で 1 ずつ巻き上げる。2 つ目の chip は `motion/chat/reaction-stagger` 130 ms 遅れて始める（同時に増えると 1 人が 2 つ押したように読める）。止まっているときは最終値（**DECISION U-25**） |

#### 6.12.1 Message

```
[ avatar 24 ][ inline/sm 12 ][ bubble r18 ]                  Left（相手）
                                     [ bubble r18 accent ]   Right（自分・右寄せ）
```

| 要素 | Left（相手） | Right（自分） |
|---|---|---|
| avatar | `size/avatar` 24 × 24、fill `color/avatar` neutral-300 の上に Humation のイラスト（§6.14 と同じ SVG、`alt=""`、**DECISION U-26**）、**`radius/full`**、bubble の下端に揃える | **持たない**（Messages と同じ。送り手は右寄せで示す） |
| bubble | fill `surface`、`Callout` 14 Bold `ink`（**13.51**）、inset `inset/xs` 8 × `inset/sm` 12、`radius/bubble` 18（**左下だけ** `radius/bubble-tail` 4）+ テール | fill **`color/accent`**、文字 **`color/on-accent`**（**10.83**）、`radius/bubble` 18（**右下だけ** 4）+ テール |
| テール | 幅 10 × 高さ 12 のベクター、吹き出しと同色。外側へ 6 はみ出し、下端は吹き出しと面一 | 同（左右反転）。コンポーネント右に padding 6 を持たせ、はみ出しを枠内に収める |
| 最大幅 | 親の 80% | 同 |

- **DECISION U-1 / U-12** チャットだけ Messages の見えに寄せる（角丸・テール・自分側アクセント・avatar は相手だけ）。理由: この部品は操作する UI ではなく「**Discord でこういう会話が起きている**」という状況の**絵**である。読み手が 0.2 秒で「チャットだ」と分かることが、様式の一貫性より価値が高い。
- 自分側の面と地のコントラストは lime-400 / ground = **1.37**（3:1 未満）。ただしこれは装飾の境界で、意味は (1) 文字 10.83、(2) 右寄せ、(3) avatar の有無 の 3 つが冗長に運ぶ。WCAG 1.4.11 の「理解に必要な図形」には当たらない（§8.2 参考行）。相手側の `surface` / ground = 1.10 も同じ扱い（従来どおり）。

概念 13.5px → Callout 14、avatar 26 → 24（DECISION L-12、= `icon/lg`）。`<li>` に発言者は visually-hidden「参加者」（フルネーム不要）。自分側は avatar がないので visually-hidden で「自分」と補う。

#### 6.12.2 Reaction row

**全ての発言**の直下に Chip / Reaction × 2（§6.4、U-25 改: 反応の無い発言を残さない — 「反応が返ってくる場所」を見せるのがこの図の仕事）。相手側の行は avatar 幅 + gap = **32** だけインデント、自分側の行は右寄せで bubble と同じ右 padding 6。chip 間 `inline/xs` 8。絵文字は発言ごとに変える（👍 👀 / 🎉 🔥 / 💡 👏 / ✨ 🙌）— 同じ 2 つが並び続けると定型に見える。数は 1〜4 に留め、巻き上げを短く保つ。

#### 6.12.3 Typing

インデント 32。`surface` の吹き出し（`radius/bubble` 18 + 左下 4 + テール、inset 16 × 11）に dot **7 × 7** `radius/full` × 3、dot 間 5、`ink-tertiary`（3.85 ✓ UI、DECISION L-15）。**ラベルは持たない**（Messages と同じ。3 点の動きだけで「入力中」は伝わる）。アニメーションは `motion/dots/period`（§6.1.8）。支援技術には visually-hidden で「入力中」を残す。

#### 6.12.4 Figma

`Chat / Message` `Side` {Left, Right} 2（`initial`（Left のみ）・`message` TEXT）。`Chat / Typing` 1（プロパティなし）。Reaction は `Chip / Reaction`。テールは VECTOR（`vectorPaths`）で、吹き出しの `clipsContent = false` が要る。

### 6.13 Activity cell + bento

#### 6.13.1 解剖（読ませるための面。リンクではない）

```
┌ divider grid: frame fill divider, padding 2, gap 2 ────────────────────────────┐
│ ┌ Feature 797 ─────────────────────────┐ ┌ Compact 397 ───────────────────┐   │
│ │ inset/cell 24                         │ │ Talk 以外                      │   │
│ │ Talk Day            [arrow-right]     │ │ Dev Day          [arrow-right] │   │
│ │ ライトニングトーク                     │ │ 勉強会・ハンズオン              │   │
│ │ 説明（measure/paragraph 588）          │ │ 説明（セル幅）                  │   │
│ │ [Chip][Chip][Chip]                    │ │ [Chip][Chip][Chip]             │   │
│ └───────────────────────────────────────┘ └────────────────────────────────┘   │
│ ┌ Compact 597 ─────────────────────────┐ ┌ Compact 597 ───────────────────┐   │
│ │ Project                               │ │ Hackathon                      │   │
│ └───────────────────────────────────────┘ └────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────┘
```

**DECISION U-8** 活動内容を hairline の一覧からベント 4 セルにする。理由は 2 つ。(1) 4 件は「並んだ行」で読ませると同格に見えるが、実際には Talk Day が最も入口として太い。面積で差をつけると、読み手は最初に見るべきものを選ばずに済む。(2) About が既にベントなので、罫線グリッドという同じ装置を 2 回使うことでページの語彙が減る。

| 項目 | Desktop | Mobile |
|---|---|---|
| 構成 | 行 1 [Feature 797 + Compact 397] / 行 2 [Compact 597 × 2] | Feature → Compact × 3 の縦積み（338） |
| 行の高さ | 背の高いセルが HUG で決め、もう一方が FILL で追う | 各セル HUG |
| セル inset | `inset/cell` **24** | **20** |

| 要素 | 仕様 |
|---|---|
| title | Feature `Display/M` **56 / 32**、Compact `Title/1` **32 / 26**、`ink`、`<h3>` 内。4 件は `Talk Day` / `Dev Day` / `Project` / `Hackathon` |
| subtitle | `Subheadline` 15 Bold、`ink-secondary`（K-1）、title の**下**（`stack/2xs` 4）。セルが縦に伸びるので横並びにしない |
| badge | `Overline/JP` 12、`pop/badge`（ink-secondary / lime-800）。**`showBadge` は既定 false**（**DECISION U-9**: 開催頻度が確定するまで出さない。空欄や「随時」で埋めると、確定した情報と見分けがつかなくなる）。**矢印は置かない**（U-17: 行き先が無いのに遷移の印を出さない） |
| description | `Body/S` 14、`ink-secondary`。Feature は `measure/paragraph` 588、Compact はセル幅いっぱい |
| tags | Chip / Tag × 3、gap `inline/xs` 8、上 `stack/xs` 8。Compact では折返す |
| Head の折返し | title 群と badge は `flex-wrap`。セル幅が足りなければ badge が title の下に落ちる |

**DECISION U-17** セルをリンクにしない。当初はセル全体を Discord への外部リンクにしていたが、4 セルとも同じ Discord に着地するので「Talk Day を押した」のに「Discord のトップ」に出る — 押した対象と行き先が対応しない。活動ごとの行き先が用意できるまでは、ここは**読ませるための面**に徹する。参加への導線は Hero・About の CTA・Poster が 3 度受け持っていて足りている。

したがってこのセルは hover / pressed / focus を持たず、矢印も持たない。「押せそうに見えて押せない」より「押せるように見えない」ほうが誠実で、状態を持たないぶん罫線グリッドの静けさも保てる。

内容の区別（**DECISION U-8b**）:

| セル | 副題 | 中身 |
|---|---|---|
| Talk Day | ライトニングトーク | 5 分の発表。聞くだけ参加も可 |
| Dev Day | 勉強会・ハンズオン | 手を動かして学ぶ |
| Project | チーム開発・イベント企画 | 開発、コードレビュー、学内イベントの企画・運営 |
| Hackathon | 出るのも、開くのも | 外部ハッカソンへの参加と、自分たちでの**開催**の両方 |

Project と Hackathon を分ける理由: 前者は継続的な営み、後者は期間の区切られた催しで、参加者から見た関わり方（週次の役割 vs 数日の集中）が違う。1 つのセルにまとめると、どちらの顔で入ればよいか読み手が決められない。

#### 6.13.2 状態

**持たない**（U-17）。リンクでもボタンでもないので hover / pressed / focus は無く、
地は `ground` のまま動かない。文字の比は ink 14.86 / n700 5.83 / lime-800 6.31。

これは「機能を削った」のではなく、状態を出さないことが正しい表示だという判断である。
押せない面がポインタに反応すると、読み手は一度クリックして何も起きないことを確かめる。

#### 6.13.3 アクセシビリティ

- DOM（**DECISION M-12 改**）: `<li><h3><span>Talk Day</span> <span>ライトニングトーク</span></h3> …説明・タグ… </li>`。リンクではなくなった（U-17）ので `aria-labelledby` は要らず、見出しがそのまま節の名前になる。
- セル内にリンク・ボタンを置かない。面全体を押させないので、テキストは普通にドラッグ選択できる（旧 M-12 のトレードオフが消えた）。
- グリッドは `<ul>`。ベントの見た目上の並び（Feature が大きい）と DOM 順を一致させる。

#### 6.13.4 Figma

`Activity / Cell` `Size` {Feature, Compact} × `State` {Default, Hover, Pressed} **6** + `focus` BOOL、`showBadge` BOOL(false)。Props: `title` `subtitle` `badge` `description` TEXT、tag は exposed instance。`Activity / Bento` `Viewport` {Desktop, Mobile} 2。旧 `Activity / Row` `Activity / List` は後継ありとして残置（新規の画面では使わない）。

### 6.14 Persona card

```
┌ inset/cell 24 (M 20) ────────────────────┐
│ CASE 01                   ( 96 )         │  header: space-between, gap inline/sm 12
│ これから始めたい人                         │  title Headline
│ ▌「プログラミング、何から…」              │  quote: surface, inset 8×12
│ [arrow-right] Dev Dayで一緒に手を動かそう │  rec: margin-top auto
└──────────────────────────────────────────┘
```

| 要素 | 仕様 |
|---|---|
| caseNo | `Overline/Latin` 12 UPPER、`ink-secondary`、上 `stack/2xs` 4（円との視覚バランス） |
| illustration | Image slot Circle `size/illustration` 96、Humation のイラスト（hand-drawn kawaii avatar、MIT）、原色、`alt=""`。`scripts/generate-avatars.mjs` が部位と色から決定的に SVG を生成し `public/images/personas/` に置く（**DECISION U-26**: 実在しない人物像に実写の顔を当てると「誰？」が先に立つ。イラストなら人物像として読める） |
| title | `Headline` 17、`ink`、`<h3>` |
| quote | fill `surface`、inset `inset/xs` 8 × `inset/sm` 12、`Callout` 14 Bold `ink`（13.51）。鉤括弧はコンテンツ側 |
| rec | `arrow-right` 16（先頭、`inline/icon` 4）+ `Footnote/Bold` 13 `ink-secondary`（5.83）。和欧間スペースなし（`Dev Dayで一緒に`） |
| card | `ground`、inset `inset/cell` 24 / 20、ブロック間 `stack/md` 16、高さは行で揃う（stretch） |

イラスト 104 → 96 は DECISION L-12。状態なし（カードはリンクではない）。Desktop 3 列（397.33）× 2 行、Mobile 1 列。`<ul>` > `<li>`。

Figma: `Persona / Card` 1。Props: `caseNo` `title` `quote` `rec` TEXT、`image` INSTANCE_SWAP。

### 6.15 Member card（Leader / Staff）

| 要素 | Leader | Staff |
|---|---|---|
| photo | Image slot Rect / Cover、**16:9**、原色（U-21）、`alt=""`（氏名が隣に可視、§8.6） | 4:3、同。**暫定非表示**（`showPhoto` false で写真枠ごと落とし、body がセル上端から始まる。本人写真が揃ったら戻す） |
| body inset | `inset/cell` 24 / 20 | `inset/md` 16 |
| role | `Overline/Latin` / `Overline/JP` 12、`ink-secondary`（5.83）、下 `stack/2xs` 4 | 同 |
| name | `Title/2` 22 `ink`、`<h3>`、姓名の間は半角スペース | `Headline` 17 |
| skills | `Footnote/Regular` 13 `ink-secondary`、上 `stack/xs` 8、≤ 2 行 | `Caption/Regular` 12 |
| 列 | Desktop 2 列（597）/ Mobile 1 列 | Desktop 3 列（397.33）/ Mobile 1 列 |

Leader と Staff の差は **写真比・inset・name・skills の 4 点**（Socials は共通）。Staff グリッドは Leader グリッドの直下に上枠なしで接続（1 つの罫線列、§3.8）。カード自体はリンクではない。

**Socials（DECISION U-12）**

| 項目 | 仕様 |
|---|---|
| 位置 | skills の下、`stack/xs` 8。カードの最終行 |
| 中身 | アイコン **20**（`icon/md`）× 最大 3、`color/ink`。既定は X / GitHub / 外部リンク（個人サイト）。Instagram・mail に差し替え可 |
| gap | Leader `inline/md` 16 / Staff `inline/sm` 12 |
| ターゲット | 見た目 20 でも hit area は `::before` inset −12 で 44 を確保（§6.1.5、§8.3） |
| 意味 | `<ul>` > `<li>` > `<a>`。アイコンは `aria-hidden`、名前は visually-hidden で「田中 太郎 の X」のように**人名を含める**（同じ「X」が 5 枚並ぶため） |
| 外部 | `target="_blank"` は使わない。`arrow-up-right` は付けない（アイコン自体が行き先を示す。§9.6 の矢印規則の例外） |
| 無い場合 | `showSocials` false で行ごと落とす。空のアイコンや無効リンクは置かない |

根拠: 運営メンバーは「顔と実績が見える」ことが入会検討者の判断材料になる。ただし本文でリンクを列挙すると紹介文の可読性が落ちるので、**アイコン 1 行**に閉じてカードの構造（役職 → 名前 → 紹介 → 導線）を保つ。

Figma: `Member / Card` `Size` {Leader, Staff} 2。Props: `role` `name` `skills` TEXT、`social1–3` INSTANCE_SWAP、`showSocials` BOOL(true)、`photo` INSTANCE_SWAP。

### 6.16 Partner cell

| Type | 内容 |
|---|---|
| Logo | **正方形タイル**（幅 = 高さ。Desktop 6 列 197.67 / tablet 3 列 237.33 / Mobile 2 列 168、DECISION L-31）、`ground`、inset `inset/cell` 24 / 20、Image slot 1:1 / **Contain**（セル中央。画像の中央配置は左揃え原則の唯一の例外、DECISION L-26）、ブランド規定の色のまま（U-21）、`alt` = 団体名 |
| Placeholder | Logo と同じ正方形タイル、`ground`、inset 24 / 20、**左揃え・縦中央**: `YOUR LOGO HERE` `Overline/Latin` 12 UPPER `ink-secondary`（5.83）のみ。導線は持たない（相談の呼びかけは導入文が担う）。Mobile の内側 128 では 2 行に折り返す |

Placeholder の左揃えは DECISION L-19（「center labels」禁止）。縦位置は中央（正方形のセルで上寄せは空きが不自然）。

**DECISION L-31** Partner セルは正方形タイル。パートナーのロゴは正方形のアイコンが基本なので、図の形とタイルの形を揃える。列数は Desktop 6 / tablet 3 / Mobile 2 — 文字を運ばないタイルは和文の最小行長（L-10）の制約を受けず、Mobile 1 列にすると 342 角のタイルが 6 枚縦に積まれる。§0.1「Mobile は 1 列」の唯一の例外で、DOM 順は保つ。

Figma: `Partner / Cell` `Type` {Logo, Placeholder} 2。Props: `logo` INSTANCE_SWAP、`label` TEXT。

### 6.17 Poster CTA

```
section/pad-display 96 (M 64)
JOIN US                                    kicker Overline/Latin
stack/md 16
いっしょに、                               Display/L 96 (M 40)
やろう。
stack/lg 24
段落 Body/M、measure/paragraph 588
stack/xl 32
[ Discordに参加する [arrow-up-right] ]  inline/lg 24  [x]  24  [instagram]  24  [github]
section/pad-display 96 (M 64)
```

| 要素 | 仕様 |
|---|---|
| 背景 | `poster/ground`（neutral-950 / **lime-400**）。角丸なし。上端に 2px の `poster/ink` 罫（Top rule、絶対配置で高さに影響させない）。Lime では地との輝度差が 1.37（色相のみの境界）のため（C-27） |
| kicker | `Overline/Latin` 12 UPPER、`poster/ink-secondary`（11.78 / 4.82）、`<p>` |
| display | `Display/L` **96 / 40**、`poster/ink`、`<h2>`、2 行（著者改行 `<br>`）。Mobile 6 全角 × 40 = 240 ≤ 272（320px リフロー ✓） |
| 段落 | `Body/M` 15、`poster/ink-secondary`、`max-width: measure/paragraph` 588（39 全角、R18） |
| actions | 横 flex、`align-items: center`、ボタン ↔ Social `inline/lg` 24、Social 間 **`inline/lg` 24**（44 角の hit area が重ならない間隔）、`flex-wrap`（Mobile: ボタン 207 → 次行に Social） |
| CTA | `poster/action/*`（Mono: Ground solid / Lime: **Ink solid**）/ md、`Discordに参加する` + `arrow-up-right` 20。Lime 地で面 10.83 / hover 7.61（UI ✓）、ラベル 14.86 |
| Social | ブランドマーク **20 のみ** × 3（Link Social の色と状態、ラベルは visually-hidden「X（外部）」、hit area 44 角、**DECISION U-28**: ラベルと矢印を落とす。マークが行き先を言い切るので文字は冗長で、CTA と同じ行で目立ち過ぎていた） |
| Focus / Selection | `poster/focus/ring`（Mono → focus/ring-inverse lime-300 12.79 / Lime lime-900 5.72）、`poster/selection`（Mono → inverse/selection / Lime ink@12） |

Lime モードの補助文字は ink@88（8.23 ✓）。面が明るいのでグラウンド色の文字は使えない（1.53）。Poster 上に Outline ボタンを置かない（§6.2.3）。

Figma: `Section / Poster` 1（色はモード）。Props: `kicker` `display` `paragraph` `ctaLabel` `social1–3` TEXT、`showSocial` BOOL。

### 6.18 Footer

| 項目 | Desktop | Mobile |
|---|---|---|
| 上辺 | Rule 2/H | 同 |
| pad | `footer/pad-y` **40** × `page/inset` 24 | **32** × 24 |
| 構成 | Brand Footer（左）← auto → Link Footer × 4（gap `inline/lg` 24）→ 24 → `© 2026 ChoTech` | 3 行、`stack/lg` 24: Brand / リンク 4 つ（1 行、左揃え、≈ 273 ≤ 342）/ © |
| © | `Caption/Regular` 12、`ink-secondary`（5.83） | 同 |
| 高さ | 2 + 40 + 24（mark 24 ≥ Headline 行 24）+ 40 = **106** | ≈ 176 |
| 意味 | `<footer>`、リンクは `<nav aria-label="フッター">` | 同 |

Footer link の状態は §6.3。概念 36 → 40 / 32 は §3.2（最終区画なので広い側）。

Figma: `Section / Footer` `Viewport` {Desktop, Mobile} 2。Props: `copyright` TEXT、nested links。

### 6.19 Image slot

| 項目 | 値 |
|---|---|
| Shape | Rect / Circle（Persona のみ） |
| Fit | Cover（写真、`object-position` は §5.7.2）/ Contain（ロゴ、内側 inset 24）。**素材が入った Contain は placeholder の地を持たない** — 箱を埋めないので地が残るとロゴを縁取る。ロゴはセルの `ground` に直接置く（§6.16） |
| Placeholder | fill `image/placeholder`（surface）、`photo` 24 `ink-tertiary` を左上 `inset/md` 16、`stack/xs` 8 下に caption `Caption/Regular` `image/caption`（5.30）。**本番では caption を出さない**。円はアイコンのみ中央 |
| 色 | 原色のまま。`filter` を掛けない（U-21）。ロゴマーク（Brand）も同じ |
| 比率 | Bento 写真 16:9 / Leader 16:9 / Staff 4:3 / Persona 1:1 円 96 / Partner ロゴ: 正方形タイル 1:1（§5.7.2 の 3 比率） |
| 読み込み | `loading="lazy"`（Bento 写真は `eager`）、`width` `height` 属性で CLS 防止。DPR 2 で AVIF / WebP |
| alt | 活動写真 = 被写体 1 文 ≤ 60 字、人物 = `""`（氏名が隣に可視）、ロゴ = 団体名、イラスト = `""`。「写真」「画像」の接頭辞は付けない（§8.6） |
| 状態 | なし。hover で色を戻す等の演出はしない（「tint imagery」禁止） |

Figma: `Media / Image Slot` `Shape` {Rect, Circle} × `Fit` {Cover, Contain} × `Content` {Placeholder, Image} sparse 6。Props: `caption` TEXT。

### 6.20 和文組版の部品内ルール

| 規則 | 適用 |
|---|---|
| 行送り | ロールが持つ（§2.2.2）: 段落 1.70–1.75、ライン系 1.50–1.60、見出し 1.25–1.41、Display 1.10–1.13（書体の `normal` 1.10 が下限）、Label 行ボックス 20 |
| 行長 | 段落は `measure/paragraph` 588（Body/S 42・M 39・L 37 全角）/ 342。35–45 全角 |
| 揃え | 左揃えのみ。`text-align: justify` 禁止。中央揃えはロゴの contain 配置と icon-only ボタンだけ |
| 改行 | 見出し `word-break: auto-phrase`（未対応は `normal`）、`line-break: strict`、`overflow-wrap: anywhere`。Display は著者改行（`<br>`）。固有名詞の途中で改行しない |
| 混植 | LINE Seed JP 1 書体で Latin も組む。**和欧間に手動スペースを入れない**、`text-autospace: no-autospace`（R13）。数字・欧文は半角。和欧混植の行は baseline 揃え、アイコンは行ボックス中央（§5.3） |
| 大文字化 | `text-transform: uppercase` は Latin の Overline / Title 3 Caps のみ。和文 kicker は `Overline/JP`（+6%） |
| 記号 | 矢印・星・絵文字を文字として置かない（§6.1.9）。鉤括弧・em dash・中黒・三点リーダ（U+2026 × 1）は句読点として可 |
| 最小サイズ | 12px、例外なし（R10） |

---
## 7. Motion

本章がモーションのオーナー。§6 の部品はここで定義するトークン名で動きを参照し、値を再記述しない。原則の出典: Apple *Designing Fluid Interfaces* / HIG、WCAG 2.2。本ページにジェスチャ駆動 UI（ドラッグ、シート、スワイプ）はなく、動くものは reveal・回転語・マーキー・入力中ドット・Mobile メニュー・Hero の背景写真の 6 つだけ。

### 7.1 原則

| # | 原則 | 規定 | 根拠 |
|---|---|---|---|
| M1 | 応答は pointer-down | 押下フィードバックは pointer-down で 0 ms。hover の入りは `duration/1` 100 ms、離脱は `duration/2` 200 ms | 遅延が 1 フレームでも直接操作の感覚は崩れる（Apple「Response」） |
| M2 | 動きはスプリング、色は固定時間 | 位置・不透明度の「移動」（reveal、回転語、メニュー展開）は臨界減衰スプリング。色・下線・背景色は固定時間トランジション | スプリングは現在値から再ターゲットでき中断可能。色には物理がない |
| M3 | 既定は減衰比 1.0 | `spring/default` = damping 1.0 / response 0.40 s。damping 0.8 は **ユーザーの投げ・フリックが先行した時のみ**。本ページに該当操作はない | 勝手に現れたものが跳ねると不自然。運動量を継いだものだけが跳ねる |
| M4 | 中断可能・現在値から | すべてのトランジションは途中で逆転できる。hover 離脱、メニューの再タップ、語の切替中の停止のいずれも、表示中の値から次の目標へ | 「思考とジェスチャは並行する」。入力をロックする時間を作らない |
| M5 | 出入りは対称、起点は発生源 | 開閉するものは同じ経路を逆再生。展開パネルは発生源（Nav の下罫）から現れる | 「消えた方向から戻ってくる」空間的一貫性 |
| M6 | compositor プロパティのみ | アニメーションは `transform` と `opacity` のみ（色は `background-color` / `color` / `text-decoration-color` / `text-decoration-thickness` を固定時間で）。`height` / `top` / `clip-path` / `filter` は不可 | 60 fps とジッターのなさが craft の最低条件。`clip-path` は全エンジンで compositor 処理されない |
| M7 | 減速運動の停止は 1 % 残りで判定 | スプリングの「見かけの長さ」= 目標との差が 1 % を切る時刻 | 0.1 % まで待つと約 1.4 倍長くなり、体感と一致しない |
| M8 | ループは有限・停止可能 | 自動で動くもの（マーキー、回転語、入力中ドット）は **1 つのページ内スイッチ** で全停止でき、`prefers-reduced-motion` で初期状態が停止 | WCAG 2.2.2（5 秒超の自動移動は停止手段が必須） |
| M9 | 追加しない | 装飾のためだけの動きは足さない。ヒーローの浮遊バブルと矢印の nudge は **採用しない**。チャットの再生と写真の送りは装飾ではなく情報（順に現れることでしか出せない、U-16 / U-18）。**唯一の例外が Hero の背景写真の漂い**（U-20）— 情報を運ぶのは写真であって動きではないと認めたうえで採った | Apple「Purpose」: 動きはユーザーの注意を消費する予算。1 つの状態に 2 つの信号を出さない |

### 7.2 トークン

CSS カスタムプロパティで持つ。Figma には Variables として置かず、Foundations ページの表と §7.6 のプロトタイプ設定で保持する（R24: プロトタイプの duration / spring は変数に束縛できない）。

| トークン | CSS | 値 | 用途 | 根拠 |
|---|---|---|---|---|
| `motion/spring/default` | `--spring-default` | damping **1.0** / response **0.40 s**（90 % 到達 0.25 s、見かけ 0.42 s） | reveal、回転語の入り、パネル展開 | Apple の「移動・再配置」既定値 |
| `motion/spring/quick` | `--spring-quick` | damping **1.0** / response **0.30 s**（90 % 0.19 s、見かけ 0.32 s） | 回転語の退出、Mobile メニュー | Apple の「シート・ドロワー」値から跳ねを除いたもの。小さい要素ほど短く |
| `motion/spring/momentum` | — | damping **0.8** / response **0.40 s** | **予約**。フリック後のカルーセル等、運動量を継ぐ時のみ | Apple「回転・ドロワー」値。本ページでは未使用 |
| `motion/duration/0` | `--dur-0` | **0 ms** | 押下、フォーカスリング、アイコン差し替え、マーキーの一時停止 | M1 |
| `motion/duration/1` | `--dur-1` | **100 ms** | hover の入り、押下解除、`aria-current` の切替 | 知覚できる最短の「追従」 |
| `motion/duration/2` | `--dur-2` | **200 ms** | hover の離脱、下線、reduced-motion 時のクロスフェード | 離脱側を長くすると行を横切る時のちらつきが消える |
| `motion/duration/3` | `--dur-3` | **400 ms** | スプリング非対応環境の固定時間代替、Hero 開始のタイムアウト | 倍数スケール 100 / 200 / 400（= `spring/default` の response） |
| `motion/ease/spring` | `--ease-spring` | `linear(0, .145, .387, .598, .752, .853, .916, .956, .979, .992, 1)` | CSS のみでスプリングを再現。`spring/default` は **420 ms**、`spring/quick` は **320 ms** で再生 | 臨界減衰解 x(t)=1−(1+ωt)e^(−ωt) を見かけの長さ（99 %）で 10 分割し正規化。曲線の形は response に依存しないので 1 本で足りる |
| `motion/ease/color` | `--ease-color` | `ease-out` | 色・下線・背景色 | 出だしの反応を優先 |
| `motion/stagger/desktop` | `--stagger` | **80 ms** | reveal の兄弟間ディレイ | 1 要素の 90 % 到達（250 ms）の 1/3。個々が読める最小差 |
| `motion/stagger/mobile` | `--stagger` | **60 ms** | 同、Mobile | 画面内要素が縦に密で総待ち時間を抑える |
| `motion/stagger/max-steps` | — | **4** | 5 番目以降は 4 番目と同時 | 最大待ち 320 / 240 ms。それ以上は「遅い」 |
| `motion/distance/reveal` | `--reveal-y` | **16 px** | reveal の translateY | `space/16`。読み始めに気づく最小距離で、視差には見えない |
| `motion/distance/word` | `--word-y` | **0.15 em** | 回転語の translateY（Display XL 124 px → 19 px、56 px → 8 px） | 距離は字面サイズに比例させる |
| `motion/reveal/root-margin` | — | `0 0 -10% 0` | 要素上端がビューポート下 10 % を越えたら発火 | 900 px で 90 px。視界に入ってから、読まれる前 |
| `motion/marquee/speed` | `--marquee-speed` | **40 px/s** | マーキー速度（duration ではなく速度で指定） | 19 px 級の大文字を約 2 字/秒で追える。内容量が変わっても速さが変わらない |
| `motion/word/period` | `--word-period` | **2.5 s** | 回転語 1 語の周期（切替 ≈ 0.5 s、静止 ≈ 2.0 s） | 3 文字の読取 0.5 s + 余裕。概念版 2.6 s を丸めた（DECISION M-4） |
| `motion/dots/period` | `--dots-period` | **1.2 s**（= 3 × `duration/3`）、ドット間 **200 ms** | 入力中ドット | 0.8 Hz。Apple が避けよと言う 0.2 Hz 級の緩慢な振動から離す |
| `motion/chat/step` | — | **900 ms** | チャットの 1 手（U-16） | 短い台詞を読み終える最短。これより速いと会話ではなく点滅に見える |
| `motion/chat/hold` | — | **2,400 ms** | 一巡後の間（U-16） | 最後の発言を読み切ってから畳む。`chat/step` の約 2.7 倍 |
| `motion/photo/step` | — | **4,000 ms** | 写真の送り（U-18） | 1 枚を見終える時間。文字より情報が多いので `chat/step` の 4 倍以上取る |
| `motion/hero-backdrop/period` | `--hero-backdrop-period` | **48 s**（片道・`alternate` で往復 96 s） | Hero 背景写真の漂い（U-20） | 1440 幅で片道 ≈ 29 px = 0.6 px/s。マーキー 40 px/s の 1/60 で、視線を引かない上限 |
| `motion/hero-backdrop/drift` | `--hero-backdrop-drift` | **2 %**（片道、縦は 1 %） | 同上の移動量 | `scale` の余白 6 % の 1/3。往復しても縁が出ない |
| `motion/hero-backdrop/scale` | `--hero-backdrop-scale` | **1.12** | 移動の余白（**静的**でアニメーションではない） | 個別プロパティ `scale` に置き、動く `translate` と 1 つの transform を奪い合わせない |
| `color/hero/backdrop-opacity` | `--hero-backdrop-opacity` | **0.2** | Hero 背景写真の不透明度 | §6.8.1 の実測上限。`prefers-reduced-transparency` で 0 |

### 7.3 ページのモーション・インベントリ

| 要素 | 概念版 | 本書（正） | `prefers-reduced-motion` |
|---|---|---|---|
| Reveal on scroll（`data-reveal`） | opacity 0→1, y 18→0, 0.7 s cubic-bezier, delay N×80 ms | opacity 0→1, y **16→0**、`spring/default`、stagger **80/60 ms** 上限 4、root-margin −10 %、**1 回のみ** | y なし。opacity 0→1 を `duration/2`、stagger 0 |
| 状態遷移（hover / current / 下線） | 0.2 s | 入り `duration/1` 100、離脱 `duration/2` 200、`ease/color` | 同じ（色変化は前庭刺激ではない） |
| Pressed | — | 入り `duration/0`、戻り `duration/1` | 同じ |
| Focus ring | 未定義 | `duration/0`、トランジションなし | 同じ |
| Marquee | translateX 0→−50 %, 26 s linear infinite | 速度 **40 px/s** linear（duration = グループ幅 ÷ 40）。hover / focus-within / pointer-down で `duration/0` 停止。右端に **停止/再生ボタン**（§7.4.2） | **静止**: 先頭グループを container 内に折返し、クリップなし |
| Hero 回転語 | 2.6 s ごと、wordIn 0.55 s | 周期 **2.5 s**。退出 `spring/quick`（opacity→0, y→−0.15 em）、80 ms 後に入り `spring/default`（opacity→1, y +0.15 em→0）。**無限ループ**（U-15） | 静止 `学ぶ。` |
| Button hover / press | hover のみ | hover: 塗りを 1 段（`duration/1` / `duration/2`）。press: さらに 1 段を `duration/0`。**transform なし** | 同じ |
| Link hover（Nav / Brand / Footer / Social / Inline） | 色・下線 | `text-decoration-thickness` と `text-decoration-color` を `duration/1` / `duration/2`。Nav / Brand は 2 px アクセント下線、文字は ink（§1.3.6） | 同じ |
| Chat 再生ループ（14 s） | 未定義 | **削除**。スレッドは静止（DECISION M-5） | — |
| 入力中ドット | 未定義 | opacity 0.3⇄1、周期 1.2 s、ドット間 200 ms、**セルが可視の間のみ** | 静止（不透明度 100 %） |
| Hero 浮遊バブル | 未定義 | **削除** | — |
| Hero 背景写真（`.hero__backdrop`） | 未定義 | `scale` 1.12 を静的に当て、`translate` を ±2 % / ±1 % に `48s ease-in-out infinite alternate`。不透明度 0.2 で ink 面に重ね、原色（U-20 / U-21） | **静止**（`animation: none`）。写真は残る。`prefers-reduced-transparency` と `forced-colors` では層ごと消える |
| Nav（sticky） | sticky | 縮小・隠れなし。アンカー移動は `scroll-behavior: smooth` | `scroll-behavior: auto` |
| Mobile メニュー | — | `overflow: hidden` のラッパー内でパネルを `translateY(−100 %) → 0` に `spring/quick`。閉じは逆再生。アイコン `menu-2` ⇄ `x` は `duration/0` | opacity `duration/2` |
| Mono ⇄ Lime | — | デザインモード。ランタイム切替なし | — |

### 7.4 個別仕様

#### 7.4.1 Reveal

- 隠し状態（opacity 0 / y 16 px）は **JS が有効かつ reduced-motion でない時だけ** 付与する（`html.js:not(.reduced) [data-reveal]`）。JS 失敗時にコンテンツが消えない。
- 発火は IntersectionObserver（root-margin −10 %）、**一度だけ**。上へ戻った時に再び消さない — 読み終えたものが消えるのは予測可能性に反する。
- Hero はオブザーバを使わず、`document.fonts.ready` か `duration/3` 400 ms のどちらか早い方で開始する。代替フォントで動かしてから本フォントで再描画すると二重に動いて見える。
- インデックスはセクション内の順序。Hero 0/1/3/4、About 0/1、Activities 0、For You 0/1、Members 0/1/2、Partners 0/1/2、Poster 0/1/2/3（概念版のまま）。ベント・グリッドとカードのセル群は **親 1 つとして** reveal し、セル個別には動かさない — 2 px 罫線で結ばれた格子は 1 つの面。（DECISION M-2）

#### 7.4.2 Marquee と停止/再生ボタン

- トラック = 同一グループ × 2、`translateX(0 → −グループ幅)`、`linear`。duration は ResizeObserver でグループ幅 ÷ 40 を `--marquee-duration` に書き込む（1,040 px なら 26 s — 概念版と一致）。
- 停止: `:hover`、`:focus-within`、pointer-down で `animation-play-state: paused`（`duration/0`）。再開も `duration/0` — 一定速度のコンベアに緩急は付けない。
- バックグラウンドタブでは停止（`visibilitychange`）。
- トラックは `aria-hidden="true"`。情報（パートナー団体）はパートナー節が本文として持つ。reduced-motion の **静止フォールバック** = 先頭グループを container 1200 / 342 内に `inline/xl` 32 の gap で折返し、クリップしない。

**停止/再生ボタン**（DECISION M-3。部品の寸法は §6.9.3）

| 項目 | 仕様 |
|---|---|
| 部品 | `Button / Icon`、Tone **Ground**、Size **md 44**。アイコン `player-pause` ⇄ `player-play` **24**、stroke 2、`currentColor` |
| セル | 帯の右端、帯の内側高さ **52** × 幅 **44**（R6）。地 `color/ground`、左に `stroke/rule` 2 px（`color/divider`）。ヒット領域はセル全体（44 × 52 ≥ 44） |
| クリップ | トラックの `overflow: hidden` 境界 = セルの左罫。文字は罫の下をくぐらない |
| 状態 | hover `state/hover-tint`（`duration/1` / `duration/2`）、pressed `state/pressed-tint`（`duration/0`）、focus `color/focus/ring` 2 px **inset**（offset −2、帯の上下罫と交差させない） |
| ARIA | `<button type="button" aria-pressed="false">`。アクセシブルネームは **固定**「ページの動きを止める」（visually-hidden）。停止中は `aria-pressed="true"`（トグルボタンはラベルを変えず状態で伝える — ARIA APG、R8）。アイコン `aria-hidden` |
| 効果 | `localStorage["chotech:motion"]` に保存し、**マーキー・回転語・入力中ドットすべて** に適用（ページ内スイッチ = M8）。reduced-motion 時は初期状態 `aria-pressed="true"` で、押せば再生できる |
| 位置の根拠 | WCAG 2.2.2 は OS 設定ではなくページ内の手段を求める。ボタンはヒーロー直下にあり最初のスクロール内で見つかる |

#### 7.4.3 Hero 回転語

- 1 周期 2.5 s: t=0 退出開始（`spring/quick`: opacity 1→0, y 0→−0.15 em）、t=80 ms 入り開始（`spring/default`: opacity 0→1, y +0.15 em→0）、t≈0.5 s から静止。上へ抜け下から入る「ドラム」の一方向運動（DECISION M-4）— 循環する語列には開閉の対称則ではなく連続方向が一貫性を作る。
- 語列 `学ぶ。→創る。→話す。` を 2 周し `学ぶ。` で静止（遷移 6 回、≈ 17.5 s）。開始は Hero reveal の h1 が静定した 2.5 s 後。
- 語枠は **幅 3 em 固定**、新旧 2 語を絶対配置で重ねる。3 語とも全角 3 字なのでレイアウトシフトはゼロ（§9.3）。下線は持たない（U-3）。変わるのは語そのものと、その色だけ。
- 停止条件: Hero が非可視、タブ非表示、ページのスイッチ、reduced-motion。

**DECISION U-15** 回転語は 2 周で静止せず、回り続ける。当初「2 周で止める」を選んだのは WCAG 2.2.2 を停止 UI 無しで満たすためだったが、§7 M8 のページ内モーションスイッチ（マーキー帯の停止ボタン）が回転語・マーキー・入力中ドットの 3 つすべてを止めるので、2.2.2 の「一時停止する手段」は既に存在する。止める理由が消えた以上、3 語を見せ切って静止する動きは「途中で力尽きた」ようにしか見えない。スイッチはヒーローの直下（マーキー帯）にあり、5 秒を超えて動くものと同じ画面内で見つかる。
- アクセシブルネーム（§8.5）: `<h1>` の可視部分は `aria-hidden`、visually-hidden の「仲間と、学ぶ。創る。話す。」が名前になる。`aria-live` は使わない。

#### 7.4.4 Hover / Press

- Button: hover = 塗りをランプ 1 段（Ink → n800、Ground solid → n200、Outline on ink → `inverse/state/hover-tint` ground@12）`duration/1` / `duration/2`。press = さらに 1 段（n700 / n300 / `inverse/state/pressed-tint` ground@24）を `duration/0`（§1.3.7）。**`scale()` は使わない**（DECISION M-6）— 2 px 罫に接するボタンが縮むと格子が壊れる。フィードバックは塗りの段差で足りる。
- Link: 下線は `text-decoration-line: underline; text-decoration-thickness; text-underline-offset: 0.2em`。`text-decoration-thickness` の変更は **レイアウトに影響しない**（行ボックス外に描画される）ので、`border-bottom` は使わない（DECISION M-9）。Nav / Brand: hover = 2 px `color/link/hover` 下線、文字は `ink` のまま。Footer: hover = 文字 `ink` + 1 px 下線。Social: hover = 文字 `poster/ink` + 1 px 下線。Inline: 常時 1 px、hover 2 px。pressed は文字 `color/link/pressed`（Social はホバーと同じ、R5）。
- Focus: リング `duration/0`（§8.4）。

#### 7.4.5 Chat セル

- 14 s の再生ループは削除（DECISION M-5）: 5 秒超の自動更新領域で停止 UI が要り、隣接セルの読み取りと競合する。静止スレッドで意図は伝わる。
- 入力中ドット: 3 点（`size/dot` 7、`radius/full`）、opacity 0.3⇄1、周期 1.2 s、ease-in-out、ドット間 200 ms、色 `color/ink-tertiary`。`surface` の吹き出し（`radius/bubble` 18 + テール、inset 16 × 11）の中に置く。セルが可視の間のみ動き、スイッチと reduced-motion に従う。

#### 7.4.6 Nav とアンカー移動

- Nav は不透明な ground、縮小・自動隠しなし（DECISION M-7）— 「今どこか」を常に答えるため。区切りは 2 px 罫で十分。
- セクションに `scroll-margin-top: var(--size-nav)`（62）。
- アンカー移動後は見出しへフォーカスを移す（`h2[tabindex="-1"]`、`focus({ preventScroll: true })`）— 根拠は WCAG 2.4.3（フォーカス順序が移動先に追従する）と、SR ユーザーの読み上げ位置の保持。
- Mobile メニュー: `aria-expanded` / `aria-controls` を持つ開閉ボタン。パネルは Nav 下罫直下の `overflow: hidden` ラッパー内で `translateY(−100 %) → 0`（`spring/quick`）、閉じは同じ経路（R19）。項目に stagger なし（メニューは 1 つの物体）。Esc / 外側タップ / 行選択で閉じ、フォーカスをボタンへ戻す。非モーダルなので背後を暗くしない（§6.7.3）。

### 7.5 ユーザー設定への応答

| 設定 | 規定 |
|---|---|
| `prefers-reduced-motion: reduce` | §7.3 右列。移動はすべてクロスフェード `duration/2` か静止。自動ループの初期状態 = 停止（スイッチで任意に再生可）。`scroll-behavior: auto`。押下・hover の色変化は維持（理解を助ける） |
| `prefers-reduced-transparency: reduce` | ページに `backdrop-filter` / 素材はない（Nav は不透明）。半透明トークンは平坦な地の上にしか置かないので分岐は不要。検証・Figma 用の実効色: `state/hover-tint` ink@6 → `#e6e5e5`、`pressed-tint` @12 → `#dad9d8`、`inverse/state/hover-tint` ground@12 → `#393737`、`pressed-tint` @24 → `#535150`、`inverse/ink-secondary` @88 → `#dad9d8`、`inverse/ink-tertiary` @72 → `#b8b7b6`、`inverse/ink-quaternary` @48 → `#858483`、`poster/ink-secondary` ink@88 over lime-400 → `#2f361a`、`poster/selection` ink@12 over lime-400 → `#8bce03`、`selection` lime-400@24 over ground → `#deefb8`、`inverse/selection` lime-400@24 over ink → `#3d4e16`。ライブラリの幕 `backdrop` は ink@88（→ `#393737` over ground）。今後も素材（ぼかし）は導入しない |
| `prefers-contrast: more` | §1.5.5 の写像: `ink-secondary` → `ink`、`ink-tertiary`（ゴースト・アイコン・点）→ `ink-secondary`、`divider` → neutral-700（5.83、R22）、不透明度階層（88 / 72 / 48 %）→ 100 %、hover 6 → 12 %・pressed 12 → 24 %、アクセント文字 lime-800 / 900 → lime-900（7.85）、`backdrop` 48 → 88 %。フォーカスリング `stroke/focus` 2 → **3 px** |
| `forced-colors: active` | フォーカスは `outline` なので残る。罫は塗りなので消える → 罫線グリッドと 2 px rule に 1 px `border: solid` を補う（`forced-color-adjust` の下でも線が残る）。hover の塗りは消えるため、リンクは hover で下線（既に `text-decoration`）。アイコンは `stroke: currentColor` |
| バックグラウンド / 非可視 | すべてのループを停止（`visibilitychange` + IntersectionObserver） |

装飾罫線（`color/divider` 2.59:1）は WCAG 1.4.11 の対象外（§1.4.1）。`prefers-contrast: more` でのみ 700 に上げる。

```css
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { transform: none; transition: opacity var(--dur-2) var(--ease-color); transition-delay: 0s; }
  .marquee__track, .typing__dot { animation: none; }
  .hero__word { transition: none; }
  .menu__panel { transition: opacity var(--dur-2) var(--ease-color); transform: none; }
  html { scroll-behavior: auto; }
}
@media (prefers-contrast: more) {
  :focus-visible { outline-width: 3px; }
}
```

### 7.6 実装と Figma への写し方

| 対象 | Web（CSS / Motion） | Figma プロトタイプ |
|---|---|---|
| `spring/default` | `{ type: 'spring', bounce: 0, duration: 0.4 }` または `transition: transform 420ms var(--ease-spring)` | Smart animate / Spring（custom）mass 1・stiffness **247**・damping **31.4** |
| `spring/quick` | `{ type: 'spring', bounce: 0, duration: 0.3 }` / `320ms var(--ease-spring)` | Spring mass 1・stiffness **439**・damping **41.9** |
| Reveal | 上記 + `transition-delay: calc(min(var(--i), 4) * var(--stagger))` | セクションごとに After delay 0/80/160/240/320 ms |
| 回転語 | JS タイマー 2,500 ms、2 語を重ねて同時アニメーション | Word 変種を After delay **2,500 ms** で連結、Smart animate `spring/default` |
| Marquee | CSS keyframes、duration = 幅 ÷ 40 | 表示のみ（26 s linear、ループ）。速度 40 px/s を説明に明記 |
| Hover / press | `:hover` `duration/1` / `duration/2` `ease-out`、`:active` `duration/0` | While hovering → Change to（100 ms ease-out）、While pressing → Instant |
| Mobile メニュー | `translateY` + `spring/quick`、ラッパー `overflow: hidden` | Move in（上から）Spring `spring/quick`、閉じは Move out（同経路） |

stiffness = (2π / response)²、damping = 2·√stiffness（減衰比 1.0）。

---
## 8. Accessibility

WCAG 2.2 **AA** を必須とし、HIG のターゲット寸法（44pt）と以下の AAA 項目を追加で満たす。値はすべて §1–§6 の最終トークンで検証した。

### 8.1 目標基準

| 基準 | 要求 | このページでの適用 |
|---|---|---|
| 1.4.3 コントラスト（最低限） | 本文 4.5:1、大きな文字（≥ 24 px または ≥ 18.66 px Bold）3:1 | §1.4 で全ロール × 全面を算出。小さな補助文字は `ink-secondary`、`ink-tertiary` は大文字と図形のみ（R1）。ティント面の小文字は `ink-secondary` 以上（K-1） |
| 1.4.11 非テキストのコントラスト | UI 部品の境界・状態・アイコン 3:1 | フォーカスリング、Outline ボタン枠（100 %）、Hero 下線（lime-400、ink 上 10.83）、アイコン（最薄 `ink-tertiary` 3.85）。装飾罫線は対象外 |
| 1.4.1 色の使用 | 色だけで意味を伝えない | hover は下線 / 塗り + カーソル、リンクは下線か文脈、バッジは文字、現在地は ink 下線。Mono モードで機能が損なわれないことが証明 |
| 2.5.8 ターゲットサイズ（最低限） | 24 × 24 CSS px | HIG 推奨 **44 × 44** をすべての対話部品で満たす（§8.3）。36 の sm はポインタ専用で `::before` により 44 |
| 2.4.7 / 2.4.11 / 2.4.13 | フォーカス可視・非隠蔽（最低限）・外観（AAA） | 2 px 外側リング + 2 px オフセット、sticky Nav 分の `scroll-margin-top`（§8.4） |
| 2.2.2 一時停止・停止・非表示 | 5 秒超の自動移動に停止手段 | マーキーの停止ボタン = ページ内スイッチ（§7.4.2） |
| 2.3.1 / 2.3.3 | 3 回/秒の閃光なし・操作起因アニメーション（AAA） | 最速の周期は 0.8 Hz。reduced-motion で全停止 |
| 2.4.2 ページタイトル | ページの主題を表すタイトル | `<title>` の組立規則と meta description（§9.9） |
| 1.4.10 リフロー | 320 px 幅（container 272）で横スクロールなし | Hero h1 Mobile 56 px × 4 字 = 220 ≤ 272 ✓。Poster 見出し Mobile 40 px × 6 字 = 235 ≤ 272 ✓。h2 Title 1 26 px × 11 字 = 283 → 320 px では 2 行に折返す（許容）。Marquee は装飾でクリップ可、静止時は折返し |
| 1.4.12 テキストの間隔 | 行間 1.5・字間 0.12 em・段落 2 倍で欠損なし | テキスト容器の `overflow: hidden` はマーキー帯（装飾）以外禁止。Hero h1 の `nowrap` は 7 × 124 × 1.12 = 972 < 1200、Mobile 4 × 56 × 1.12 = 251 < 342 で安全 |
| 1.4.4 テキストのサイズ変更 | 200 % | サイズは `rem`、余白は `em` / `rem`。固定高さのセル（`size/cell-min` 120）・コントロール（36 / 44）は `min-height` |
| 1.3.1 / 2.4.1 / 2.4.6 | 構造・ブロックスキップ・見出し | ランドマーク、h1→h2→h3、スキップリンク（§8.5）。回転見出しの名前は全文で安定 |
| 1.1.1 非テキストコンテンツ | 代替テキスト | §8.6 |
| 3.1.1 / 3.1.2 | ページと部分の言語 | `lang="ja"`、英文に `lang="en"`（§8.7） |
| 4.1.2 名前・役割・値 | 状態を持つ部品 | 停止ボタン `aria-pressed`、メニュー `aria-expanded`、Nav `aria-current` |

### 8.2 コントラスト検証（ページ上の全ペア）

§1.4 のマトリクスをセクション別に読み直したもの。区分: N = 通常テキスト 4.5、L = 大きな文字 3.0、U = UI 部品 3.0、— = 装飾（対象外）。実効色は §7.5 の合成値。

**明るい面（ground `#f3f2f2` / surface `#eae7e7`）**

| トークン | 前景 → 背景 | 比 | 使用（サイズ / ウェイト） | 区分 | 判定 |
|---|---|---|---|---|---|
| `ink` / `ground` | #201e1d → #f3f2f2 | **14.86** | h2 32 EB、セル題、Nav 14 R、氏名、Activity 題 56 EB、Marquee 項目 19 EB | N | ✓ |
| `ink` / `surface` | #201e1d → #eae7e7 | 13.51 | Persona 引用 14 B、相手側バブル 14 B、チップ数値 12 B | N | ✓ |
| `ink-secondary` / ground | #605d5d → #f3f2f2 | **5.83** | 段落 14 R、Footer リンク 13 R、Persona 推奨 13 B、Activity 副題 15 B・説明 14 R、Member 紹介 12–13 R、セクション番号・キッカー・肩書・タグライン・© 12 B/R、Marquee ラベル 12 B、Mono バッジ 12 B | N | ✓（コンセプト n600 3.85 / n500 2.59 は ✗） |
| `ink-secondary` / surface | #605d5d → #eae7e7 | 5.30 | タグ 12 R、チップアイコン、画像キャプション 12 R（制作時のみ） | N / U | ✓ |
| `ink-tertiary` / ground | #7d7979 → #f3f2f2 | 3.85 | Marquee ghost「YOUR COMPANY HERE」19 EB | L | ✓（コンセプト ink@40 は 2.41 ✗） |
| `ink-tertiary` / ground・surface | #7d7979 → #f3f2f2 / #eae7e7 | 3.85 / 3.50 | 入力中ドット、placeholder アイコン、Mono の Marquee 区切り | U | ✓ |
| `ink` / `state/hover-tint` | #201e1d → #e6e5e5 | 13.21 | Activity 題、Menu row、Icon button（hover 中） | N | ✓ |
| `ink-secondary` / `state/hover-tint` | #605d5d → #e6e5e5 | 5.19 | Activity 副題・説明・タグ・Mono バッジ（hover 中） | N | ✓ |
| `ink-secondary` / `state/pressed-tint` | #605d5d → #dad9d8 | 4.62 | 同（押下中） | N | ✓（`ink-tertiary` なら 3.42 / 3.05 ✗ → K-1） |
| `accent-text-small` / ground・hover・pressed | #35530e → #f3f2f2 / #e6e5e5 / #dad9d8 | 7.85 / 6.97 / 6.22 | Activity バッジ 12 B | N | ✓ |
| `accent-text` / ground | #3c6300 → #f3f2f2 | **6.31** | Nav / Brand hover の 2 px 下線（U）、リンク hover 文字 13–14（N） | U / N | ✓ |
| `pop/separator` / ground | #497d00 → #f3f2f2 | 4.46 | Marquee 区切り（図形） | U | ✓（文字には使わない） |
| `action/ink` / `action/fill`・`-hover`・`-pressed` | #f3f2f2 → #201e1d / #444141 / #605d5d | 14.86 / 9.04 / 5.83 | Nav CTA 14 B、Menu CTA 15 B、Skip link | N | ✓ |
| `ink` / `avatar` | #201e1d → #d7d3d3 | 11.19 | 頭文字 12 B | N | ✓ |
| `ink` / `selection` | #201e1d → #ccc6f3 | 10.23 | 選択テキスト（文字色を ink に強制） | N | ✓ |
| `focus/ring` / ground・surface・hover・pressed | #4f39f6 → #f3f2f2 / #eae7e7 / #e6e5e5 / #dad9d8 | 5.79 / 5.26 / 5.14 / 4.59 | 2 px リング（Activity・Menu row・Marquee control の inset リングは hover 面上） | U | ✓ |
| `chip/fill` / ground | #eae7e7 → #f3f2f2 | 1.10 | チップの面 | — | 装飾（面の差で読む） |
| `divider` / ground | #9b9797 → #f3f2f2 | 2.59 | 2 px / 1 px 罫 | — | 対象外 |

**暗い面（`inverse/ground` ink `#201e1d`: Hero、Stat / CTA セル、Mono の Poster）**

| トークン | 前景 → 背景 | 比 | 使用 | 区分 | 判定 |
|---|---|---|---|---|---|
| `inverse/ink` / `inverse/ground` | #f3f2f2 → #201e1d | **14.86** | h1 回転語 124 EB、Stat 56 EB、CTA 題 19 EB、自分側バブル 14 B、Outline ボタン 15 B | N | ✓ |
| `inverse/ink-secondary` / ink | #dad9d8 → #201e1d | 11.78 | Hero 段落 16 R、CTA 副 13 R | N | ✓ |
| `inverse/ink-tertiary` / ink | #b8b7b6 → #201e1d | 8.29 | Hero メタ 12 B、Stat キッカー 12 B | N | ✓ |
| `inverse/ink-quaternary` / ink | #858483 → #201e1d | 4.45 | 「仲間と、」124 EB のみ | L | ✓（N には使わない） |
| `inverse/outline` / ink | #f3f2f2 → #201e1d | 14.86 | Hero 副・Bento CTA の 1 px 枠 | U | ✓ |
| `inverse/ink` / `inverse/state/hover-tint`・`pressed-tint` | #f3f2f2 → #393737 / #535150 | 10.58 / 7.06 | Outline ボタン hover / press | N | ✓ |
| `inverse/action/ink` / `inverse/action/fill`・`-hover`・`-pressed` | #201e1d → #f3f2f2 / #eae7e7 / #d7d3d3 | 14.86 / 13.51 / 11.19 | Hero 主・Poster CTA 15 B | N | ✓ |
| `hero/word`（Lime）/ ink | #9ae600 → #201e1d | 10.83 | 回転語 124 EB | L | ✓。Mono は `inverse/ink` 14.86 |
| `on-accent` / `accent`（チャット自分側） | #201e1d → #9ae600 | 10.83 | 吹き出しの文 14 B | N | ✓ |
| `accent` / `ground`（チャット自分側の面） | #9ae600 → #f3f2f2 | 1.37 | 吹き出しの境界 | [参考] | 装飾。意味は文字 10.83・右寄せ・avatar の有無が冗長に運ぶ |
| `focus/ring-inverse` / ink・inverse hover-tint | #c6d2ff → #201e1d / #393737 | 11.12 / 7.92 | 2 px リング | U | ✓ |
| `inverse/ink` / `inverse/selection` | #f3f2f2 → #363753 | 10.28 | 選択テキスト | N | ✓ |
| `inverse/hairline` / ink | #2d2b2b → #201e1d | 1.18 | Hero 格子線 | — | 対象外 |

**アクセント面（`poster/ground` lime-400 `#9ae600`: Lime モードの Poster。明るい面）**

| トークン | 前景 → 背景 | 比 | 使用 | 区分 | 判定 |
|---|---|---|---|---|---|
| `poster/ink` / lime-400 | #201e1d → #9ae600 | **10.83** | 見出し 96 EB、Social hover 12 B | N | ✓ |
| `poster/ink-secondary` / lime-400 | #2f361a → #9ae600 | 8.23 | キッカー 12 B、段落 15 R、Social 12 B | N | ✓（ink@72 = 5.32 も N だが抑制原則で使わない） |
| （参考）ink@48 / lime-400 | #5f860e → #9ae600 | 2.79 | 使わない | N | Poster で quaternary を使わない |
| `poster/action/fill` / lime-400 | #201e1d → #9ae600 | 10.83 | CTA ボタン境界（ラベルは ground 14.86） | U | ✓ |
| `poster/focus/ring` / lime-400 | #35530e → #9ae600 | 5.72 | 2 px リング | U | ✓（lime-300 は 1.18 ✗、lime-700 は 3.25 で余裕なし） |
| `poster/ink` / `poster/selection` | #f3f2f2 → #312c85 | 10.27 | 選択テキスト | N | ✓ |
| `inverse/outline` + `inverse/state/pressed-tint` | #f3f2f2 → #7665f5 | 3.80 | — | N | ✗ → Poster に Outline ボタンを置かない |
| `opacity/disabled` 48 % | ラベル実効 ≈ 2.99 | — | ページに無効部品なし | — | 1.4.3 の適用除外 |

結果: ページ上の全ペアが AA を満たす。不合格になり得る 3 組（ティント面の `ink-tertiary`、Poster の Outline、Poster の 48 / 72 %）は使用を禁止して回避する。

### 8.3 ターゲットサイズ

視覚ボックスは §3.4（`size/control/*`）と §6 の所有。ヒット領域は **`::before { position:absolute; inset:-N }`** で広げ、視覚ボックスを変えない（G8）。隣接ターゲットの拡張領域は重ねない（gap ≥ 8）。

| 部品 | 視覚ボックス（トークン） | 必要 | 方法 |
|---|---|---|---|
| Nav リンク × 4 | Label/Nav 14 / 行ボックス 20 | 44 高 | 上下 −12。横 ±4（ラベル幅 ≥ 24）。隣接 gap `inline/md` 16 の間に 8 が残る |
| Nav CTA（Desktop） | `size/control/sm` 36 | 44 | `::before { inset: -4px }`。Nav リンクとの gap 16 と重ならない |
| Nav CTA（Mobile） | `size/control/md` 44 | ✓ | — |
| ブランドリンク | mark 28 + 文字 | 44 | `::before { inset: -8px -4px }` |
| Hero 主・副ボタン | `size/control/md` 44 | ✓ | — |
| Marquee 停止ボタン | 44 × 52（セル） | ✓ | セル全体をヒット領域に |
| Bento CTA | `size/control/md` 44 | ✓ | — |
| Member の SNS アイコン | 20 | ::before inset −12 で 44 | 同じカード内で 3 個並ぶため、間隔 12–16 を確保 |
| Partner インラインリンク | Footnote Bold 13 / 20 | 44 | 上下 −12（セル内に余白あり） |
| Poster CTA | `size/control/md` 44 | ✓ | — |
| Social リンク × 3 | Overline 12 / 16 | 44 | 上下 −14。gap `inline/md` 16 ≥ 8 |
| Footer リンク × 4 | Footnote 13 / 20 | 44 | 上下 −12。gap `inline/lg` 24 |
| Mobile メニューボタン | `size/control/md` 44 | ✓ | 拡張不要（DECISION M-13） |
| Menu row × 4 + CTA | 44 高 | ✓ | — |
| Skip link | Desktop `size/control/sm` 36（フォーカス時のみ表示）/ Mobile 44 | 44 | Desktop は `::before { inset: -4px }`（キーボード専用なので実質不要） |

### 8.4 フォーカス

| 項目 | 値 | 根拠 |
|---|---|---|
| 形 | `outline: 2px solid; outline-offset: 2px`（`stroke/focus` 2、`focus/offset` 2）、角なし | 2 px 罫の言語と一致。外側リングは 2.4.13（AAA: 2 px 周長分の面積）を満たす |
| 色（明るい面） | `color/focus/ring` = lime-700。ground 4.46 / surface 4.05 / hover-tint 3.96 / pressed-tint 3.53 | §1.3.6 |
| 色（インク面） | `color/focus/ring-inverse` = lime-300。ink 12.79 / inverse hover-tint 9.11 | §1.3.6 |
| 色（ポスター面） | `color/poster/focus/ring` = lime-900。lime-400 上 5.72 | C-8 改・C-28: 面の明度が反転するため 3 トークンに分ける |
| 適用面の決め方 | リングは `outline-offset` により **親の地** に乗る。ground 上の Ink ボタン → `ring`、ink 上の Ground ボタン → `ring-inverse`、Poster → `ring-inverse` | 部品の塗りではなく親で選ぶ（§6.2.6: Set ごとに固定） |
| inset リング | Menu row / Marquee control は `outline-offset: -2px`（K-7）。リングは行自身の地（ground / hover-tint / pressed-tint）に乗り、4.59 以上 | 全幅の行で外側リングが隣接罫線と交差するのを避ける |
| タイミング | `duration/0` | 即時性が要件 |
| 適用 | `:focus-visible` のみ。マウスクリックでは出さない | ノイズを避ける（HIG: フォーカスはキーボード操作の道標） |
| 順序 | DOM 順 = 視覚順。`tabindex > 0` 禁止 | 2.4.3 |
| 非隠蔽 | `scroll-margin-top: var(--size-nav)`（62）で 2.4.11 を満たす | §3.9 |
| `prefers-contrast: more` | 3 px | §7.5 |

### 8.5 セマンティック構造

**ランドマーク**

| 領域 | 要素 |
|---|---|
| スキップリンク | `<a href="#main" class="skip">本文へスキップ</a>` を DOM 先頭に。フォーカス時のみ表示、Nav 直下・左寄せの Button Ink（DECISION M-19、サイズは R23） |
| Nav | `<header>` > `<nav aria-label="メイン">`。スクロール中のセクションに `aria-current="true"`（§6.3.2） |
| 本文 | `<main id="main">` に Hero から Poster まで。各節は `<section aria-labelledby="{h2 id}">` |
| Marquee | `<div aria-hidden="true">`（トラック）+ 停止 `<button>`（aria-hidden の外） |
| Footer | `<footer>`（contentinfo）。リンクは `<nav aria-label="フッター">` |

**フォーカス順序**: Skip → Brand → Nav リンク × 4 → Nav CTA →（Mobile: メニューボタン → 開時 Menu row × 4 → Menu CTA）→ Hero 主 → Hero 副 → **Marquee 停止ボタン** → Bento CTA → Activity セル × 3 → Partner リンク → Poster CTA → Social × 3 → Footer Brand → Footer リンク × 4。

**見出し階層**（h1 は 1 つ、階層を飛ばさない）

- h1: 仲間と、学ぶ。創る。話す。（可視はアニメーション、名前は全文）
- h2: コミュニティの、今。／活動内容／こんな人に、おすすめ。／運営メンバー／パートナー／いっしょに、やろう。
- h3: ベントのセル題（「やってみたい」に、…／長崎大学公認の…／まずはDiscordから）、Activity 題（Talk Day / Dev Day / Project / Hackathon）、Persona 題、Member 名
- 見出しにしないもの: セクションの欧文ラベル（ABOUT / ACTIVITY …）、キッカー（Culture / Members）、統計「50+」、チャットのチャンネル名。これらは `<p>` で見出しの直前後に置く

**パターン**（`aria-label` は `<p>` / `<span>`（role paragraph / generic）では naming prohibited のため使わない）

| 部品 | 構造 |
|---|---|
| 回転見出し | `<h1><span class="vh">仲間と、学ぶ。創る。話す。</span><span aria-hidden="true">仲間と、<span class="word">学ぶ。</span></span></h1>`。`aria-live` なし |
| Activity セル | `<li><a href aria-labelledby="t1 s1"><h3><span id="t1">Talk Day</span> <span id="s1">ライトニングトーク</span></h3> …説明・タグ… </a></li>`（DECISION M-12）。名前 = 題 + 副題、説明・タグは名前に含めないがリンク内容として読める。セル内に別のリンクを置かない。トレードオフ: リンク内のテキストはドラッグ選択しにくい（マーケティング面では許容） |
| Member の SNS | `<ul>` > `<li>` > `<a>`。アイコンは `aria-hidden`、名前は visually-hidden で人名込み（「田中 太郎 の X」）。同じアイコンが 5 枚並ぶため、人名がないと区別できない |
| Activity タグ | `<ul aria-label="キーワード">` > `<li>` |
| Bento | `<ul>` ではなく `<section>` 群（内容が異種）。Stat は `<p><span aria-hidden="true">50+</span><span class="vh">メンバー 50人以上</span></p>` |
| Chat | `<figure>` > `<p class="kicker">#general — いつものChoTech</p>` + `<ul>`（`<li>` = 頭文字 `<span aria-hidden>` + vh「参加者」+ 本文）+ `<figcaption>こんな会話が、毎日どこかで。</figcaption>`。図の名前は figcaption（DECISION M-18）。リアクションは `<span role="img" aria-label="いいね 3">`（内部の svg と数字は presentational） |
| Persona / Member / Partner | `<ul>` > `<li>`。カードに `<article>` は不要（見出し + 段落で足りる） |
| ボタン内アイコン | `<svg aria-hidden="true" focusable="false">`。名前は可視ラベルのみ |
| 外部リンク | Discord / X / Instagram / GitHub / mailto: `arrow-up-right` アイコン + vh「（外部）」。`target="_blank"` は使わない（DECISION M-15）— 新しいタブはユーザーが選ぶ（Agency） |
| 停止ボタン | `<button aria-pressed>`、名前固定「ページの動きを止める」（§7.4.2） |
| Mobile メニュー | `<button aria-expanded aria-controls>`、パネルは非モーダル。開いてもフォーカスはボタンに留め、ArrowDown で 1 行目へ（§6.7.3） |

### 8.6 画像と代替テキスト

| 画像 | `alt` | 根拠 |
|---|---|---|
| Hero / Bento の活動写真 | 内容を 1 文、≤ 60 字。例「勉強会でノート PC を囲む 5 人のメンバー」 | B/W は CSS 処理。処理ではなく被写体を書く |
| Member 写真 | `alt=""`（DECISION M-16、R20）— 氏名は常に隣接する h3 にあり、写真は情報を追加しない | 「田中 太郎、画像、田中 太郎、見出し」の重複を避ける |
| Persona イラスト | `alt=""` | 見出しが意味を持つ装飾 |
| Partner ロゴ | 団体名（例「長崎大学」） | ロゴ = 名前 |
| ロゴマーク | `alt="ChoTech"`（リンク内なら名前 = リンク先） | |
| 空のスロット | `alt=""`、キャプションは制作時のみ表示 | プレースホルダは本番に出さない |
| 「写真」「画像」の接頭辞 | 使わない | SR が役割を読む |

### 8.7 言語とフォント

| 項目 | 規定 |
|---|---|
| 文書言語 | `<html lang="ja">`。英文（`Hack Your Limits.`）に `lang="en"`。単語レベルの英語キッカー（ABOUT, Talk Day）は付けない |
| フォント | デザインは **LINE Seed JP** のみ（400 / 700 / 800）。`font-synthesis: none`（擬似ボールド禁止。500 / 600 は指定しない） |
| フォールバック | `font-family: "LINE Seed JP", sans-serif`（§2.8 と同一）。`sans-serif` は読込中の代替のみで、**デザインに system font は現れない**（DECISION M-20） |
| 配信 | セルフホスト WOFF2、日本語サブセット（JIS 第 1・2 水準 + 使用記号）、`font-display: swap`。`preload` は **Regular / Bold / ExtraBold の 3 本**（ファーストビューの Hero メタ・タグラインが Bold） |
| 実装ノート（デザイン外） | 代替表示中のずれは、`local()` を参照する fallback face に `size-adjust` / `ascent-override` / `descent-override` を与えて吸収してよい。仕様上の書体は 1 つで変わらない |
| 日本語組版 CSS | §2.8 の `html` 宣言（`text-align: start`、`line-break: strict`、`word-break: normal`、`overflow-wrap: anywhere`、`text-autospace: no-autospace`、`text-spacing-trim: normal`、`-webkit-text-size-adjust: 100%`）。`justify` / `break-all` 禁止 |
| 行長 | 段落は `measure/paragraph` **588** px: Body L 16 → 36 字、Body M 15 → 39 字、Body S 14 → 42 字（すべて 35–45 全角）。Mobile 342 → 21 / 22 / 24 字（幅の制約、L-8 で許容） |
| 行間 | §2.2.2: Display 1.10–1.13、Title 1.23–1.41、ライン系 1.50–1.60、段落 1.70–1.75（日本語段落の可読域 1.6–1.8） |
| 和欧混植 | ベースライン揃え（`vertical-align: baseline`）。数字・欧文は半角、日本語との間に手動スペースなし（§9.5） |

---
## 9. Content

### 9.1 ボイス

短く、あたたかく、自信をもって。

| 特性 | する | しない |
|---|---|---|
| 短い | 一文一義。見出しは体言止めか「〜しよう」 | 接続詞でつなぐ長文、二重否定 |
| あたたかい | 相手の状況から書く（「何から始めればいいか分からない」） | 内輪の専門用語、上から目線の「初心者でも大丈夫」 |
| 自信 | 言い切る（「それで十分です」） | 「〜かもしれません」「ぜひ」「！」 |
| 誘う | 「〜しよう」「〜から」（まずはDiscordから） | 「〜してください」「〜しませんか？」 |

- 主語は ChoTech。「私たち」「あなた」は使わない。
- 敬体（です・ます）は本文のみ。見出し・キッカー・ボタンは常体・体言止め。
- 感嘆符「！」はチャット引用の発話内のみ。UI コピーでは使わない。
- 絵文字は使わない（ハード制約）。

### 9.2 要素別の文体

| 要素 | 文体 | 例 |
|---|---|---|
| Hero h1 | 体言 + 動詞終止「〜。」 | 仲間と、学ぶ。 |
| セクション h2 | 体言止め or 読点区切りの短句 | コミュニティの、今。 |
| セル題 h3 | 2 行までの短句 | 「やってみたい」に、すぐ仲間が集まる。 |
| 本文 | です・ます | 誰でも参加することができます。 |
| キッカー | 英語 1–3 語、大文字 | CULTURE / PARTNERS |
| CTA | 動詞終止形、目的語 + 動詞 | 参加する／活動を見る／Discordに参加する |
| バッジ | 頻度・状態の名詞 | 月1〜2回／随時 |
| タグ | 名詞、4–8 字 | 初心者歓迎 |
| Persona 引用 | 「」内に話し言葉 | 「個人開発、一人だと続かないんだよね」 |
| Persona 推奨 | 「〜しよう」「〜でOK」 | Dev Dayで一緒に手を動かそう |

### 9.3 文字数上限

全角換算（英数字は 0.5、`palt` なしで n 字 = n em — §2.0）。1 行の字数 = **§3 の幅 ÷ §2 のロールサイズ**（切り捨て）。幅: container 1200 / 342、`measure/paragraph` 588 / 342、Bento 2×1 セル内 549（597 − 24×2）/ Mobile 298（338 − 20×2）、1×1 セル内 249、Persona カード内 349、引用枠内 325（− 12×2）、Staff カード内 365（397 − 16×2）、Leader カード内 549。

| 部品 | ロール（D / M px） | 幅 D / M | 1 行の字数 D / M | 上限 | 行数 D / M |
|---|---|---|---|---|---|
| Hero 導入「仲間と、」 | Display XL 124 / 56 | 1200 / 342 | 導入 4 + ワード 3 = 7 × 124 × 0.98 = 851 ≤ 1200 | **4** | 1 / 2（読点で改行、`<br>`） |
| Hero 回転語 | Display XL | 幅 3 em 固定 | — | **ちょうど 3**（末尾「。」） | 1 |
| Hero リード | Title 3 19 | 588 / 342 | 30 / 18 | 16 | 1 / 1（16 × 19 = 304 ≤ 342） |
| Hero 段落 | Body L 16 | 588 / 342 | 36 / 21 | 72 | 2 / 4（`<br>` なし、§2.6.3） |
| Hero メタ | Overline 12 | — | — | 12 × 3 項目 | Mobile は折返し |
| セクション番号 | Overline 12 | — | — | `NN — WORD`、WORD ≤ 10 | 1 |
| セクション h2 | Title 1 32 / 26 | 1200 / 342 | 37 / 13 | **12** | 1 / 1（12 × 26 = 312 ≤ 342） |
| キッカー（英） | Overline 12 | — | — | 20（"Partners" = 19） | 1 |
| Bento 2×1 題 | Title 2 22 | 549 / 298 | 24 / 13 | 24 | 1 / 2 |
| Bento 1×1 題 | Title 3 19 · Headline 17 | 249 / 298 | 13 · 14 / 15 · 17 | 26 | ≤ 2 |
| Bento 本文 | Body S 14 | 549 · 249 / 298 | 39 · 17 / 21 | 2×1: 70、1×1: 45 | 2 · 3 / 4 |
| Stat | Display M 56 + Title 1 32 | — | — | 数字 ≤ 3 桁 + `+`、キッカー ≤ 10（英） | 1 |
| CTA セル題 / 副 | Title 3 19 / Footnote 13 | ≈ 326（549 − gap 16 − ボタン 207）/ 298 | 17 · 25 / 15 · 22 | 14 / 20 | 1 / 1（Mobile は縦積み: 題 → 副 → fullWidth ボタン、K-8） |
| Bento CTA ボタン | Label M 15 | — | — | 10（「Discordに参加する」= 8.5） | 1 |
| Chat 発言 | Callout 14 | 吹出し内 386 / 185 | 27 / 13 | 24 | 1 / 2 |
| Chat 見出し | Overline JP 12 | — | — | `#channel — 説明` ≤ 20 | 1 |
| Chat 注記（figcaption） | Caption 12 | 549 / 298 | 45 / 24 | 20 | 1 |
| Activity 題 | Display M 56 / 32 | — | — | 欧文 ≤ 10（"Talk Day" = 5.15 em = 288 px） | 1 |
| Activity 副題 | Subheadline 15 | 題の右 / 題の下 | — | 12 | 1 / 1–2 |
| Activity バッジ | Overline JP 12 | — | — | 6 | 1 |
| Activity 説明 | Body S 14 | 588 / 342 | 42 / 24 | **60**（概念版最長 57） | 2 / 3 |
| Activity タグ | Caption 12 | — | — | 8 × 3 | 1 |
| Persona 題 | Headline 17 | 349 / 298 | 20 / 17 | 12 | 1 |
| Persona 引用 | Callout 14 | 325 / 274 | 23 / 19 | 44（「」込み。概念版最長 26） | 2 / 3 |
| Persona 推奨 | Footnote Bold 13（先頭に arrow-right 16 + 4） | 329 / 278 | 25 / 21 | 20 | 1 / 1 |
| Member 役職 | Overline 12 | — | — | 6（英 10） | 1 |
| Member 氏名 | Title 2 22 · Headline 17 | 549 · 365 | 24 · 21 | 8（姓 + 半角空白 + 名） | 1 |
| Member 紹介 | Footnote 13 · Caption 12 | 549 · 365 / 298 | 42 · 30 / 22 · 24 | 40 | 1 · 2 / 2 |
| Partners 導入 | Body S 14 | 588 / 342 | 42 / 24 | 70 | 2 / 3 |
| Partner placeholder | Overline 12 + Footnote Bold 13 | — | — | "YOUR LOGO HERE"、リンク ≤ 10 | 1 |
| Poster キッカー（英） | Overline 12 | — | — | 12 | 1 |
| Poster 見出し | Display L 96 / 40 | 1200 / 342 | 12 / 8 | **6 / 行 × 2 行**（6 × 96 × 0.98 = 565、6 × 40 × 0.98 = 235 ≤ 272 で 320 px 幅でも安全） | 2 / 2（著者改行） |
| Poster 段落 | Body M 15 | 588 / 342 | 39 / 22 | 64（概念版 56.5） | 2 / 3 |
| Poster CTA | Label M 15 | — | — | 12（「Discordに参加する」= 8.5） | 1 |
| Social ラベル（英） | Overline 12 | — | — | 10 | 1 |
| Nav リンク（英） | Label/Nav 14 | — | — | 10 | 1 |
| Nav CTA | Label S 14 / M 15 | — | — | 6 | 1 |
| タグライン（英） | Caption Bold 12 | — | — | 20（"Hack Your Limits." = 17） | 1 |
| Footer リンク / © | Footnote 13 / Caption 12 | — | — | 10 / `© YYYY ChoTech` | 1 |
| Marquee 項目 | Title 3 Caps 19 | — | — | 12 | 1 |

### 9.4 句読点・記号

| 記号 | 規定 |
|---|---|
| 、。 | 全角。文末の「。」は見出しにも付ける（ポスター的な言い切り）。ただしキッカー・ボタン・タグ・バッジには付けない |
| 「」『』 | 発話・強調は「」、入れ子は『』。“ ” は日本語文に使わない |
| （） | 日本語文中は全角「（）」（ChoTech（チョーテック））。英文中は半角 |
| ？ ！ | 全角。「！」は引用発話のみ |
| ・ | 並列は中黒（学ぶ・作る・話す／勉強会・ハンズオン）。読点で並べない |
| 〜 | 範囲は波ダッシュ U+301C（月1〜2回）。全角チルダ U+FF5E は使わない |
| … | 三点リーダ U+2026 を 1 つ（「…」）。「...」「‥」は不可 |
| — | 前後に半角スペース。使う場所は 2 つ: チャット見出し（#general — いつものChoTech）、ページタイトル（§9.9）。セクション見出しの連番は廃止（U-4） |
| # | チャンネル名（#general）のみ |
| © | 著作権表記のみ |
| 矢印・星・手・目の記号 | **禁止**。アイコンで置換（§9.6） |

### 9.5 和欧混植

- 数字・欧文は半角。全角英数字は使わない。
- 日本語と英数字の間に **手動スペースを入れない**（DECISION M-14、R13: Discordに参加する／Dev Dayで一緒に）。自動アキも `text-autospace: no-autospace` で無効にし、Figma と幅を一致させる（§2.6.2）。
- 欧文内のスペースは保つ（Talk Day、Since 2025、UI/UX）。
- 日本語の中の分かち書きスペースはキッカーと Meta のみ許可（長崎大学公認 学生団体、パートナー募集中）。本文では読点か中黒。
- 単位・助数詞は続けて書く（5分、50人、月1〜2回）。
- 英語の複数形・所有格は日本語に持ち込まない（Members → メンバー 50+ の表示はキッカー扱い）。

### 9.6 ラベル・CTA・アイコン

| 規則 | 内容 |
|---|---|
| 左寄せ | すべてのラベルは flush-left。ボタン内も左寄せ、アイコンはラベル直後（L-3） |
| 動詞先行 | CTA は目的語 + 動詞終止形で終える（参加する／活動を見る／パートナーになる）。名詞だけの CTA は不可 |
| 1 画面 1 主 CTA | Hero の「参加する」が主。他は目的語付きで区別（Discordに参加する／Discordに参加する） |
| 矢印の意味 | 末尾の矢印 = 遷移。サイト内（Activity 行）: `arrow-right`。外部（Discord、X、Instagram、GitHub、mailto）: `arrow-up-right`。ページ内スクロール（Hero「活動を見る」、Nav リンク）: アイコンなし（R9）。先頭の `arrow-right` は Persona 推奨の「次の一歩」を指す指示子のみ（リンクではない） |
| アイコン仕様 | Tabler outline、24 グリッド、stroke 2、`currentColor`、常に `aria-hidden`。サイズは §5.2 の判定順: **コントロール高で決める** 36 → 16、44 → 20、アイコンボタン 44 → 24。**文中は文字サイズで決める** ≤ 14 px → 16、15–19 px → 20（Marquee 19 Caps → 20） |
| 大文字化 | キッカー・Meta・Social ラベルは CSS `text-transform: uppercase`。DOM は固有名詞の正書法（GitHub、Instagram、X）を保つ。日本語には適用しない |

**記号 → アイコン置換（コンセプトのコピーの修正）**

| コンセプト | 置換 |
|---|---|
| `参加する →`（Nav / Hero）、`Discord に参加する →`（Poster） | ラベル + `arrow-up-right` 16 / 20（外部） |
| `活動を見る` | アイコンなし（ページ内スクロール） |
| `月1〜2回 →` `随時 →` | バッジ文字 + `arrow-right` 16（行全体がサイト内リンク。行先が外部になる場合は `arrow-up-right`） |
| `Discord →`（Bento CTA） | **「Discordに参加する」** + `arrow-up-right` 20（DECISION M-14: 名詞のみの CTA を動詞化） |
| `→ Dev Day で一緒に手を動かそう`（Persona 推奨） | `arrow-right` 16 先頭 + 「Dev Dayで一緒に手を動かそう」 |
| `↑ こんな会話が、毎日どこかで。` | 矢印を **削除**（DECISION M-14）— 注記は `<figcaption>` で図に属し、参照先（直上のスレッド）は隣接して一意。読み終えたものを指す矢印は冗長で、SR には何も伝えない |
| `🙌 3` `👀 4` | 👍 3／👀 4 — 実際の絵文字のまま（U-25）。🙌 だけ 👍 に置き換える |
| Marquee `✳` | `asterisk` **20**（`color/pop/separator`） |
| Hero Meta `✳` | アイコンではなく **1 × 12 の縦 hairline**（L-16） |
| Mobile メニュー | `menu-2` ⇄ `x` 24 |
| Marquee 停止 | `player-pause` ⇄ `player-play` 24 |

### 9.7 数字

| 種類 | 形式 |
|---|---|
| 統計 | 整数 + 接尾 `+`、空白なし（50+）。3 桁まで。4 桁以上は千区切り（1,200） |
| 頻度 | 月1〜2回／随時 |
| 時間 | 5分／2時間。「分」「時間」は続け書き |
| 年 | 西暦 4 桁（© 2026、Since 2025）。和暦不可 |
| 番号 | 2 桁ゼロ埋め（Persona の `CASE 01` のみ。セクション見出しの連番は廃止、U-4） |
| パーセント | 半角 `%`、空白なし |

### 9.8 固有名詞・用語

| 用語 | 表記 |
|---|---|
| ChoTech | 初出のみ「ChoTech（チョーテック）」。以後 ChoTech |
| 長崎大学公認 学生団体 / 学生技術系コミュニティ | この 2 語で固定（コンセプトの本文コピーどおり） |
| Talk Day / Dev Day / Project / Hackathon | 英語のまま、翻訳しない。副題で説明（ライトニングトーク／勉強会・ハンズオン／チーム開発・イベント企画／出るのも、開くのも）。Project は継続の営み、Hackathon は期間の区切られた催しとして分ける |
| パートナー | 「スポンサー」「協賛」は使わない（DECISION U-7）。金銭支援に限らない関係を指すため |
| サポーターズ 技育プロジェクト 学生団体公式パートナー | 正式名称。分かち書きのスペースを保つ（Meta とキッカーのみ許可、§9.5） |
| LT | 初出は「ライトニングトーク（LT）」 |
| Discord | サービス名。「ディスコード」不可 |
| X / Instagram / GitHub | 正書法。表示は CSS で大文字化可 |
| エンジニア／デザイナー／研究好き | 対象者はこの 3 語 |
| ハッカソン／勉強会／ハンズオン | カタカナ固定。「ハッカソン」を「ハッカーソン」と書かない |

### 9.9 ページタイトルと meta（WCAG 2.4.2、DECISION M-17）

| 項目 | 規則 | 値 |
|---|---|---|
| `<title>` | 固有名詞（初出表記）→ ` — ` → 説明。**全角 32 字以内**（読みを含めると 31 字。検索結果で切れない上限） | `ChoTech（チョーテック）— 長崎大学公認の学生技術系コミュニティ` |
| `meta[name=description]` | 90–110 文字（文字数。全角換算ではない）、§9.1 のボイス（言い切り、「ぜひ」なし）。対象者 3 語と Discord を含める | `ChoTechは長崎大学公認の学生技術系コミュニティです。エンジニアも、デザイナーも、研究好きも。Talk Day・Dev Day・Project・Hackathonで学ぶ・作る・話す。Discordに参加できます。`（108 文字） |
| OG タイトル / 説明 | `<title>` / description と同一 | — |
| OG 画像 | 写真（原色）+ ワードマーク。1200 × 630、文字は左寄せ | §5.7.1（U-21） |
| `lang` | `<html lang="ja">` | — |

### 9.10 コンセプトのコピーからの修正一覧

| 箇所 | コンセプト | 修正 | 規則 |
|---|---|---|---|
| Nav / Hero / Poster CTA | `参加する →` 等 | 矢印をアイコンへ（外部 = `arrow-up-right`） | §9.6 |
| Hero 副 CTA | `活動を見る` | 文言そのまま、アイコンなし | R9 |
| Bento CTA | `Discord →` | Discordに参加する + `arrow-up-right` | 動詞先行 |
| Chat 注記 | `↑ こんな会話が、毎日どこかで。` | こんな会話が、毎日どこかで。（`<figcaption>`） | 記号禁止・冗長 |
| Chat リアクション | `🙌 3` `👀 4` | アイコン + 数、`role="img" aria-label` | 絵文字禁止 |
| Persona 推奨 ×6 | `→ Dev Day で…` | アイコン + 「Dev Dayで…」 | 記号禁止、和欧スペースなし |
| Poster CTA | `Discord に参加する →` | Discordに参加する + アイコン | 和欧スペースなし |
| Persona 05 | `Talk Day のテーマは技術も研究もOK` | Talk Dayのテーマは技術も研究もOK | 同上 |
| Persona 01 | `…分からない…」` | 三点リーダ 1 つを確認（U+2026） | §9.4 |
| Members 注記 | `写真はドロップで差し替え可` | 本番から削除 | 制作用ヒント |
| Section heading の note | 編集ヒント | 削除 | K-9 |
| Partner プレースホルダ | `Your logo here`（中央寄せ） | 左寄せに変更。文言は維持 | flush-left（L-19） |
| Hero Meta 区切り | `✳` | 1 × 12 縦 hairline | L-16 |
| Chat 見出し | `#GENERAL — いつものCHOTECH`（uppercase） | `#general — いつものChoTech`（ORIGINAL） | ブランド名を大文字化しない |
| h1 アクセシブルネーム | なし | 仲間と、学ぶ。創る。話す。 | §8.5 |
| 外部リンク | — | `target="_blank"` なし、vh「（外部）」 | §8.5 |
| 停止ボタン | なし | 「ページの動きを止める」（vh）、`aria-pressed` | §7.4.2 |
| スキップリンク | なし | 「本文へスキップ」 | §8.5 |

---
## 10. Migration from the concept

コンセプト（刷新案「ポスター×ベント」、Modernist DS）の値 → 本システムの値。左列はコンセプトのトークン名・実測値、右列は本書のトークン名・値。「なし」= 値は同じで名前だけ整理。

### 10.1 Color

| コンセプト | 本書 | 値の変化 |
|---|---|---|
| Archivo / 赤 `#ec3013`（accent）、`accent-2` `#e15b47` 系 | LINE Seed JP / `color/accent` lime-400 `#9ae600`、accent-2 廃止 | 赤 → アシッドライム。地の上の**文字**は lime-800 で 3.0 → 6.31、**面・印**は lime-400（インク面 10.83） |
| `bg` / `color/ground` `#f3f2f2` | `color/ground`（neutral-100） | なし |
| `surface` `#eae9e9` | `color/surface`（neutral-200 `#eae7e7`） | 差 1.01。ランプに統一 |
| `text` / `color/ink` `#201e1d` | `color/ink`（neutral-950） | なし |
| `neutral/100` `#f8f4f4` | `neutral-50` | 改番（ground を 100、ink を 950 に） |
| `neutral/600` `#7d7979`（キッカー・肩書・タグライン） | `neutral-600` = `color/ink-tertiary`、大テキスト・図形専用。小文字は `color/ink-secondary`（n700） | 値同一。3.85 は小文字 AA 不合格 |
| `color/ink-muted`（n500、セクション番号・©・マーキーラベル） | `color/ink-secondary` | 2.59 → 5.83 |
| `color/ink-muted-55`（ink@55、編集ヒント） | `color/ink-secondary` | 実色化 |
| `color/marquee/ghost`（ink@40） | `color/ink-tertiary` | 2.41 → 3.85（L） |
| `color/divider`（ink@40、外周 64 %） | `color/divider` / `divider-hairline`（neutral-500 実色） | 実色化。外周と内側が同一色 |
| `color/hover-tint`（ink@4） | `color/state/hover-tint`（ink@6）、`pressed-tint`（ink@12）を追加 | 4 → 6 / 12 |
| `color/tag/fill` n100 + `tag/ink` n800 | `color/chip/fill`（surface）+ `chip/ink`（ink-secondary） | 1.02 → 1.10 の面、文字 700（R2） |
| `color/action/fill` / `-hover` / `ink` | 同名。`fill-pressed` = neutral-700 を追加 | なし |
| `color/nav/link-hover`（アクセント文字） | `color/link/hover`（アクセント 2px **下線**）+ `link/pressed`（文字）+ `link/current`（ink 下線） | 文字色 → 下線 |
| `color/pop/separator`（n400 / accent） | `color/pop/separator`（ink-tertiary / lime-700） | Mono 1.80 → 3.85、Lime 4.46 |
| `color/pop/badge`（n700 / accent） | `color/pop/badge`（ink-secondary / lime-800） | lime-400 は地の上 1.37 で不可 → 800（6.31） |
| `color/inverse/ink-secondary`（n300）/ `kicker`（n400）/ `ink-muted`（n500） | `color/inverse/ink-secondary` / `-tertiary` / `-quaternary`（ground@88 / 72 / 48） | 実色 → アルファ |
| `color/inverse/kicker-separator`（n400@45） | 廃止（1×12 hairline、currentColor） | — |
| `color/inverse/grid`（bg@6） | `color/inverse/hairline`（neutral-900） | 実色化 |
| `color/inverse/kicker-soft` / `ink-soft` / `ink-paragraph`（bg@60 / 70 / 75） | `color/inverse/ink-tertiary`（72）/ `color/poster/ink-secondary`（88） | 60 / 70 / 75 → 72 / 88 |
| `color/inverse/outline`（bg@55）/ `cta-outline`（bg） | `color/inverse/outline`（inverse/ink 100 %） | 2 種 → 1 種（R3） |
| `color/inverse/outline-hover`（bg@12）/ `cta-hover`（bg@15）/ `-pressed`（bg@24）/ `cta-pressed`（bg@30） | `color/inverse/state/hover-tint`（12）/ `pressed-tint`（24） | 統合 |
| `color/inverse/action/fill` / `-hover` / `ink` | 同名。`fill-pressed` = neutral-300 | なし |
| `color/hero/word-underline`（bg / accent-400） | `color/hero/word`（inverse/ink / lime-400） | 下線を廃し、語そのものを塗る（インク面 10.83、U-3） |
| `color/poster/ink` / `kicker-soft` / `ink-paragraph` / `ink-soft` | `color/poster/ink` / `color/poster/ink-secondary` | 4 → 2 ロール |
| `color/poster/social-hover` | `color/inverse/link/hover` | なし |
| `color/focus-ring`（accent、全面） | `color/focus/ring`（lime-700）+ `color/focus/ring-inverse`（lime-300）+ `color/poster/focus/ring`（lime-900） | 面の極性ごとに 3 トークン |
| `color/selection`（accent@30） | `color/selection`・`inverse/selection`（lime-400@24）+ `poster/selection`（ink@12）、文字色を強制 | 30 → 24、面別 |
| `opacity/disabled` 0.45 | 0.48 | 尺度化 |
| `color/backdrop`（n900@50） | `color/backdrop`（ink@48、低透明時 88） | 尺度化 |
| `--shadow-sm/md/lg` | `shadow/sm/md/lg` = `0 1 2` / `0 4 8` / `0 16 32`、色 `color/shadow` ink@24 | 1 濃度、ライブラリのみ |
| `color/library/primary/*`（accent / 600 / 700） | `color/accent` / `-hover` / `-pressed`（600 / 700 / 800） | 1 段深く |
| `color/library/ghost/*`（accent 文字） | `color/ink` + `state/*` | ラベルは ink 固定 |
| `color/library/tag/accent-*` | `color/accent-subtle` / `on-accent-subtle` | — |
| `color/library/card/meta`（ink@50）/ `table/th`（ink@60）/ `field/label`（ink@70）/ 入力プレースホルダ | `color/ink-secondary` | 実色化 |
| アルファ 23 個 | 11 個（6 / 12 / 24 / 48 / 72 / 88） | 尺度化 |
| OKLCH ランプ | Tailwind v4 lime（sRGB hex）+ 概念のウォームニュートラル | 値はクライアント指定（2026-09-01 確定） |

### 10.2 Typography

| コンセプト | 本書 | 変化 |
|---|---|---|
| Archivo（見出し・本文）、Inter / system 代替 | LINE Seed JP 400 / 700 / 800 のみ | 書体統一 |
| 47 テキストスタイル | 22 ロール（§2.5.2） | 統合 |
| 10px（セルキッカー・CASE 01・Chat 見出し）、11px（マーキーラベル・役職・タグ・リアクション数） | 12（Overline / Caption） | 最小 12 |
| 12.5px（CTA 副文・推薦文）、13.5px（ベント本文・吹き出し・引用） | 13（Footnote）/ 14（Body S / Callout） | 梯子に丸め |
| 18px（ヒーローリード・ワードマーク）、20px（マーキー項目） | 19（Title 3 / Title 3 Caps） | 同上 |
| 24px（ベント 2×1 見出し） | 22（Title 2） | 同上 |
| 34px / 112% / −1.5%（h2） | 32 / 40 / −1%（Title 1）、Mobile 26 / 32 | 同上 |
| 52px / 100% / −2%（活動タイトル・Mobile ポスター） | 56 / 62（Display M）、Mobile 32 / 36。ポスター Mobile は 40（Display L） | 同上 |
| 96 / 105%（ポスター見出し） | 96 / 106（Display L）、Mobile 40 / 44 | 行送り整数化 |
| 124 / 104% / −2%（h1） | 124 / 138（Display XL）、Mobile 56 / 62 | 行送り 1.11（書体の normal 1.10 以上） |
| 155%（ポスター段落）、170% / 175%（段落） | 1.73 / 1.71 / 1.75（整数 px: 26 / 24 / 28） | 可読域 1.6–1.8 |
| トラッキング +14 / +16 / +10 / +2%（大文字ラベル・バッジ・タグ） | +12（Overline/Latin）/ +6（Overline/JP）/ +3（Title 3 Caps）/ 0 | 6 段の梯子 |
| ボタン ExtraBold 800 | Bold 700（Label M / S） | 14–15px の 800 はカウンターが潰れる |
| 段落 `max-width: 40em / 36em`（576 / 644 / 560 / 480） | `measure/paragraph` 588 / 342 | 1 本化 |
| 和欧間の手動スペース（`Discord に参加する`） | スペースなし + `text-autospace: no-autospace` | Figma と一致 |
| `tabular-nums`（統計） | 指定なし（書体に `tnum` なし） | — |
| Chat 見出し UPPERCASE | ORIGINAL | ブランド名を大文字化しない |

### 10.3 Spacing & size

| コンセプト | 出現箇所 | 本書 | Alias / size |
|---|---|---|---|
| 1 | chip pad-y | — | `size/chip` 24（高さ駆動） |
| 3 | tag pad-y、staff role-mb | — / 4 | `size/chip` / `stack/2xs` |
| 5 | chip 間 | 8 | `inline/xs`（4 は文中アイコン専用） |
| 6 | btn icon gap、lead-title-mb、skills-mt、placeholder gap | 8 | `inline/xs` / `stack/xs` |
| 7 | bubble pad-y、chip pad-x | 8 | `inset/xs` |
| 10 | brand gap、tagline pad-left | 12 | `inline/sm` |
| 10 | marquee pad-y | 12 | `band/pad-y` |
| 10 | culture p-mt、chat stack、quote pad-y | 8 | `stack/xs` / `inset/xs` |
| 11 | bubble pad-x | 12 | `inset/sm` |
| 12 | nav pad-y | 12 / 8 | `nav/pad-y` |
| 12 | hero cta-gap、persona header-gap | 12 | `inline/sm` |
| 13 | quote pad-x | 12 | `inset/sm` |
| 13 | poster btn pad-y | — | `size/control/md` 44 |
| 14 | hero meta gap、chat kicker-mb、persona gap、staff pad-top、note pad-top | 16 | `inline/md` / `stack/md` |
| 14.4 | nav btn pad-x | 16 | `inset/md` |
| 16 | nav gap、heading gap、CTA gap、poster label-mb | 16 | `inline/md` / `stack/md` |
| 18 | activity title-gap、social gap、staff pad-bottom | 16 | `inline/md` / `inset/md` |
| 18 | leader pad-top | 24 | `inset/cell` |
| 18.6 | tagline 縦罫の高さ | 12 | `size/rule-v` |
| 20 | leader pad-x、poster cta-gap | 24 | `inset/cell` / `inline/lg` |
| 22 | hero btn pad-x、leader pad-bottom | 20 / 24 | `inset/control` / `inset/cell` |
| 24 | セル inset、section gaps、footer gap、ページ inset、nav pad-x | 24 | `inset/cell` / `inline/lg` / `stack/lg` / `page/inset` |
| 24 | poster btn pad-x | 20 | `inset/control` |
| 26 | avatar | 24 | `size/avatar` |
| 28 | marquee gap、heading-mb、hero lead-mt | 32 | `inline/xl` / `section/heading-mb` / `stack/xl` |
| 30 | activity row pad-y、hero cta-mt | 32 | `inset/row` / `stack/xl` |
| 34 | hero eyebrow-mb、chat indent | 32 | `stack/xl` / 派生（24 + 8） |
| 34.8 / 44 / 46 | ボタン高（nav / hero / poster） | 36 / 44 | `size/control/sm` / `md` |
| 36 | footer pad-y | 40 / 32 | `footer/pad-y` |
| 36 | icon button | 36 / 44 | `size/control/sm` / `md` |
| 55 | marquee 帯 | 56 | `size/band-marquee` |
| 61 | nav 帯 | 62 | `size/nav` |
| 72 | section pad-top | 64 | `section/pad-top` |
| 72 | hero pad-bottom | 80 | `section/pad-bottom` |
| 80 | section pad-bottom | 80 | `section/pad-bottom` |
| 88vh | hero 高 | `min(100svh − 62, 960)` | `size/nav` / `size/hero-max` |
| 104 | persona イラスト径 | 96 | `size/illustration` |
| 110 | hero pad-top、poster pad-y | 96 | `section/pad-display` |
| 120 | bento 行、sponsor cell | 120 | `size/cell-min` |
| 280 | photo cell min-height | — | 16:9 で派生 |
| 28 / 24 | logo mark | 28 / 24 | `size/mark-nav` / `size/mark-footer`（同値） |
| ブレークポイントなし | — | Desktop 1440 / Mobile 390 の 2 モード、Mobile は 1 列 | §3.6–3.8 |

### 10.4 Shape & elevation

| コンセプト | 本書 |
|---|---|
| radius 0 | `radius/none` 0（同）。`radius/full` は persona 円・typing dot・チャット avatar。`radius/bubble` 18 はチャット吹き出しのみ（U-1） |
| 罫線 2px / 1px | `stroke/rule` 2 / `stroke/hair` 1（同）。色は実色 neutral-500 |
| 回転語の下線 5px | **廃止**（U-3）。`stroke/underline` 2 / `stroke/underline-strong` 3 はリンク専用 |
| focus 2px accent offset 2 | `stroke/focus` 2 / `focus/offset` 2（同）。色は面で 600 / 200 |
| shadow sm / md / lg（3 濃度） | 幾何 3 段 × 1 濃度（ink@24）。ページ未使用 |
| 半透明マテリアルなし | なし（同）。`prefers-reduced-transparency` の分岐不要 |

### 10.5 Icons & imagery

| コンセプト | 本書 |
|---|---|
| Lucide | Tabler Icons outline、24 grid、stroke 2 |
| 記号文字 `→ ↑ ✳ 🙌 👀` | `arrow-right` / `arrow-up-right` / `asterisk` / `thumb-up` / `eye`。`↑` は削除 |
| 矢印 1 種 | 2 種（サイト内 / 外部）。ページ内スクロールはアイコンなし |
| アイコン径 未定義 | 16 / 20 / 24（`icon/sm|md|lg`）、コントロール高と文字サイズで判定 |
| 写真 B/W（`.grayscale`） | `filter: grayscale(1) contrast(1.08)`（同）。パートナーロゴも B/W、ロゴマークは原色 |
| photo min-height 280 | 16:9 固定（bento / leader）、4:3（staff）、1:1（persona） |
| sponsor logo 中央 | 中央（唯一の例外、図であってラベルではない）。placeholder 文言は左揃え |

### 10.6 Components

| コンセプト | 本書 |
|---|---|
| Button 7 種（Ground Ink / Primary / Secondary / Ghost、Ink Solid / Outline 55 / Outline 100） | ページ 3 種（Ink solid、Ground solid、Outline on ink）+ ライブラリ 3 種（Accent、Outline、Ghost）。Outline 55 / 100 は 1 種に統合 |
| ボタン高 34.8 / 44 / 46、ラベル 800 | 36 / 44、ラベル 700、行ボックス 20、矢印はラベル直後 8 |
| Link hover = アクセント文字 | hover = 下線（Nav / Brand 2px アクセント、他 1px currentColor）、pressed = アクセント文字、current = 2px ink 下線 |
| Tag（Neutral / Accent / Accent 2 / Outline）、Reaction | Chip（Tag / Reaction）1 装置。Accent 2 / Outline 廃止 |
| Nav 61、Mobile 未定義 | Nav 62（両 viewport）、Mobile Menu panel（44 行、非モーダル）を新設 |
| Hero 88vh、格子線 x 359 / 719 / 1079 / 1439 | `min(100svh − 62, 960)`、格子線は viewport の 25 / 50 / 75 / 100 % |
| Hero meta 区切り `✳` | 1 × 12 hairline |
| Marquee 55、停止手段なし、60 px/s | 56、右端に 44 × 52 の停止/再生セル、40 px/s |
| Section heading `note` | 廃止 |
| Bento CTA `Discord →` | 「Discordに参加する」+ `arrow-up-right`、Mobile は縦積み |
| Chat 再生ループ、`↑` 注記、絵文字リアクション | 静止スレッド、`<figcaption>`、アイコンチップ |
| Activity セル hover 矢印 nudge | 背景ティントのみ |
| Member 写真 `alt=氏名`、編集ヒント | `alt=""`、ヒント削除 |
| Partner placeholder 中央揃え | 左揃え・縦中央 |
| Poster 段落 32em、補助文字 60 / 70 / 75 % | 588、88 % |
| Footer 36 | 40 / 32 |
| Skip link なし | Button Ink（sm / md）、DOM 先頭 |

### 10.7 Motion

| コンセプト | 本書 |
|---|---|
| reveal 0.7 s cubic-bezier、y 18 | `spring/default`、y 16、stagger 80 / 60 上限 4、1 回のみ |
| 状態遷移 0.2 s | 入り 100 / 離脱 200、`ease-out`。押下 0 |
| marquee 26 s infinite | 40 px/s、停止ボタン、reduced-motion で静止 |
| 回転語 2.6 s / 0.55 s、無限 | 2.5 s、スプリング、無限（停止はページのスイッチ、U-15） |
| chat 14 s ループ、浮遊バブル | 削除 |
| Mobile メニュー未定義 | `translateY` + `spring/quick` |
| `scale(0.97)` 押下（Apple 既定） | 塗り 1 段、scale なし |

### 10.8 Content

§9.10 の表を参照（矢印・絵文字の置換、Bento CTA の動詞化、`↑` の削除、和欧スペースの除去、編集ヒントの削除、Chat 見出しの大文字化解除、`<title>` / description / スキップリンク / 停止ボタン / h1 アクセシブルネームの新設）。

---
## 11. Figma build map

ファイルは 1 つ。値はすべて Variables かテキストスタイルから引き、リテラルを置かない。機械可読の正本は `tokens-v2.json`（同ディレクトリ）。

### 11.1 ページ

| ページ | 内容 |
|---|---|
| `00 Cover` | 名称・版・既定モード（Lime accent）・本書へのリンク |
| `01 Foundations` | Color（Primitives のランプ、ロールを Mono / Lime の 2 列で並べたスウォッチ、§1.4 の判定）/ Typography（22 スタイルの見本、Desktop / Mobile、和文禁則の確認 1 例）/ Spacing（alias と size の目盛り）/ Shape（線 3 段・角丸・フォーカス）/ Icons（13 種 × 3 径）/ Motion（§7.2 の表とスプリング値、変数ではない）/ Imagery（B/W 処理と 3 比率） |
| `02 Components` | §11.4 のセットを依存順に。各セットの右に「使用箇所」注記 |
| `03 Screens` | `Desktop 1440` / `Mobile 390` の 2 フレーム。Lime accent で制作し、Mono はモード切替で検証（複製を保守しない、DECISION F-3） |
| `04 Archive` | コンセプト（刷新案）の読み込み。参照専用、リンクしない |

### 11.2 Variables コレクション

| Collection | Modes | 変数 | 内容 | Scopes |
|---|---|---|---|---|
| `Primitives` | 1 | 41 | neutral 50–950（11）、lime 200–900（8）、indigo 100–900（9、記録用）、alpha 13（ink 6 / 12 / 24 / 48 / 88、ground 12 / 24 / 48 / 72 / 88、lime-400@24、indigo-600@24、indigo-400@24。RGBA リテラル） | なし（直接 bind しない。`hiddenFromPublishing`） |
| `Color` | `Mono` / `Lime accent`（+ `Indigo accent` 記録用） | 62 | §1.3 のロール。全行 Primitives へのエイリアス。Mono と Lime で値が変わるのは `poster/ground`、`poster/ink`、`poster/ink-secondary`、`poster/selection`、`poster/action/fill`、`poster/action/ink`、`poster/focus/ring`、`pop/separator`、`pop/badge`、`hero/word` の 10 行 | FRAME_FILL / SHAPE_FILL / TEXT_FILL / STROKE_COLOR を行ごとに |
| `Spacing` | `Desktop` / `Mobile` | 64 | `space/*` 15、alias 29（`inset` 6・`page/inset`・`nav/pad-y`・`band/pad-y`・`stack` 6・`inline` 6・`grid/gutter`・`section` 6・`footer/pad-y`）、`size/*` 13、`icon/*` 3、`measure/paragraph` | alias → GAP、`size` / `measure` → WIDTH_HEIGHT |
| `Shape` | 1 | **10** | `radius/none` `radius/full` `radius/bubble` `radius/bubble-tail`、`stroke/hair` `stroke/rule` `stroke/underline` `stroke/underline-strong` `stroke/focus`、`focus/offset` | CORNER_RADIUS / STROKE_FLOAT / GAP |
| `Typography` | `Desktop` / `Mobile` | 37 | `font/family`、`font/style/*` 3、`font/size/*` 17、`font/leading/*` 16（§2.5.1） | FONT_FAMILY / FONT_STYLE / FONT_SIZE / LINE_HEIGHT |

- モードの既定: `Color` = Lime accent（C-17、2026-09-01 確定）、`Spacing` / `Typography` = Desktop。Screens の Mobile フレームは 2 コレクションのモードを Mobile に切り替える。
- `opacity/disabled` 0.48 と shadow の幾何は Variables にしていない（前者はライブラリ内の見せ方、後者は Effect Style が持つ）。§4.2・§4.4 の表が正本。
- Motion は変数にしない（R24）。`01 Foundations / Motion` の表と、プロトタイプ設定（§7.6）で保持する。
- CSS 変数名は Figma 名の `/` を `-` に置換（`--color-inverse-ink-secondary`、`--inset-cell`、`--size-nav`、`--stroke-rule`）。アルファは `color-mix()` で表現し、合成 hex を書かない（§1.5.5）。

### 11.3 テキストスタイル（22）

`Display/XL` `Display/L` `Display/M` · `Title/1` `Title/2` `Title/3` `Title/3 Caps` · `Text/Headline` `Text/Subheadline` `Text/Callout` · `Body/L` `Body/M` `Body/S` · `Footnote/Regular` `Footnote/Bold` · `Caption/Regular` `Caption/Bold` · `Label/M` `Label/S` `Label/Nav` · `Overline/Latin` `Overline/JP`

- `fontSize` と `lineHeight` を `Typography` の変数に束縛、`letterSpacing` は PERCENT リテラル、`paragraphSpacing` は Body 3 本だけ `Spacing/stack/sm`（§2.5.2）。
- Headline / Subheadline / Callout は 1 段のグループになるよう `Text/` 接頭辞を持つ（DECISION F-1）。本文中の呼称は接頭辞なし。
- スタイルは色を持たない。色は部品側でテキストの fill を `Color` に束縛する。
- 混在ノード（統計 `50+`、ヒーローメタ）は `setRangeTextStyleId` で範囲適用。

### 11.4 コンポーネントセット（variant 数はすべて ≤ 30）

| Set | Variant 軸 | 数 | Properties | 依存 |
|---|---|---|---|---|
| `Icon / *`（13 セット） | `Size` {16, 20, 24} | 3 each | — | Tabler SVG。fill `color/ink` を既定 bind（DECISION F-2） |
| `Rule` | `Weight` {2, 1} × `Orientation` {Horizontal, Vertical} | 4 | `length` | Shape、Color |
| `Chip` | `Kind` {Tag, Reaction} × `Tone` {Neutral, Accent, Inverse}（sparse） | 4 | `label` `emoji` TEXT | — |
| `Button / Ground` | `Style` {Ink, Accent} × `Size` {sm, md} × `State` {Default, Hover, Pressed, Disabled} | 16 | `label` TEXT、`showIcon` BOOL、`icon` INSTANCE_SWAP、`focus` BOOL、`fullWidth` BOOL | Icon |
| `Button / Ground Quiet` | `Style` {Outline, Ghost} × Size 2 × State 4 | 16 | 同上 | Icon |
| `Button / On Ink` | `Style` {Ground, Outline} × Size 2 × State 4 | 16 | 同上 | Icon |
| `Button / Icon` | `Tone` {Ground, Ink} × `Size` {sm, md} × State 4 | 16 | `icon` INSTANCE_SWAP、`focus` BOOL | Icon |
| `Link` | `Style` {Nav, Footer, Social, Inline} × `State` {Default, Hover, Pressed, Current}（sparse） | 12 | `label` TEXT、`showIcon` BOOL、`icon` INSTANCE_SWAP、`focus` BOOL | Icon |
| `Brand / Lockup` | `Size` {Nav, Footer} × `State` {Default, Hover} | 4 | `name` `tagline` TEXT、`showTagline` BOOL、`focus` BOOL | Rule |
| `Nav / Menu Row` | `State` {Default, Hover, Pressed, Current} | 4 | `label` TEXT、`focus` BOOL | Rule |
| `Nav / Bar` | `Viewport` {Desktop, Mobile} × `Menu` {Closed, Open}（sparse） | 3 | nested: brand、link1–4、ctaLabel | Brand、Link、Button、Menu Row |
| `Hero / Meta Strip` | — | 1 | `item1–4` TEXT | Rule |
| `Hero / Rotating Word` | `Word` {学ぶ。, 創る。, 話す。} | 3 | — | — |
| `Section / Hero` | `Viewport` {Desktop, Mobile} | 2 | `word` INSTANCE_SWAP、`leadStrong` `leadBody` `primaryLabel` `secondaryLabel` TEXT | Meta Strip、Rotating Word、Button |
| `Marquee / Item` | `Kind` {Label, Word, Ghost, Separator} | 4 | `label` TEXT | Icon |
| `Marquee / Control` | `Playing` {True, False} × `State` {Default, Hover, Pressed} | 6 | `focus` BOOL | Button / Icon |
| `Marquee / Band` | — | 1 | `showGroupB` BOOL、`showControl` BOOL | Item、Control |
| `Section / Heading` | `Layout` {Row, Stacked} | 2 | `index` `title` TEXT | — |
| `Bento / Cell Text` | `Kind` {2x1, 1x1-md, 1x1-sm} × `Tone` {Ground, Ink} | 6 | `kicker` `title` `body` TEXT、`showBody` BOOL | — |
| `Bento / Cell Stat` | — | 1 | `kicker` `value` `suffix` TEXT | — |
| `Bento / Cell Chat` | — | 1 | `kicker` `note` TEXT | Chat / Message、Chat / Typing、Chip |
| `Bento / Cell Image` | — | 1 | `image` INSTANCE_SWAP | Media / Image Slot |
| `Bento / Cell CTA` | `Viewport` {Desktop, Mobile} | 2 | `title` `sub` `ctaLabel` TEXT | Button |
| `Bento / Grid` | `Viewport` {Desktop, Mobile} | 2 | nested cells | Cell * |
| `Chat / Message` | `Side` {Left, Right} | 2 | `initial` `message` TEXT | — |
| `Chat / Typing` | — | 1 | `label` TEXT | — |
| `Activity / Cell` | `Size` {Feature, Compact} × `State` {Default, Hover, Pressed} | 6 | `title` `subtitle` `badge` `description` TEXT、`showBadge` BOOL(false)、`focus` BOOL | Chip、Icon |
| `Activity / Bento` | `Viewport` {Desktop, Mobile} | 2 | nested cells exposed | Activity / Cell |
| `Activity / List` | — | 1 | nested rows | Row |
| `Persona / Card` | — | 1 | `caseNo` `title` `quote` `rec` TEXT、`image` INSTANCE_SWAP | Image Slot、Icon |
| `Member / Card` | `Size` {Leader, Staff} | 2 | `role` `name` `skills` TEXT、`photo` INSTANCE_SWAP | Image Slot |
| `Partner / Cell` | `Type` {Logo, Placeholder} | 2 | `logo` INSTANCE_SWAP、`label` `linkLabel` TEXT | Image Slot、Link |
| `Section / Poster` | — | 1 | `kicker` `display` `paragraph` `ctaLabel` `social1–3` TEXT、`showSocial` BOOL | Button、Link |
| `Section / Footer` | `Viewport` {Desktop, Mobile} | 2 | `copyright` TEXT、nested links | Brand、Link、Rule |
| `Media / Image Slot` | `Shape` {Rect, Circle} × `Fit` {Cover, Contain} × `Content` {Placeholder, Image}（sparse） | 6 | `caption` TEXT | Icon |

命名: Variant 軸は大文字始まり（`Style` `Size` `State`）、property は camelCase（`label` `showIcon` `focus`）。`focus` は全対話部品に BOOL で持たせ、ラッパーの外側（full-bleed 行は内側）2px ストロークで描く。Disabled はノード全体の opacity を `opacity/disabled` に bind。

### 11.5 束縛規則

| 対象 | 束縛先 |
|---|---|
| 面・文字・線の色 | `Color` のロール（Primitives を直接 bind しない） |
| padding / itemSpacing | `Spacing` の alias（`inset/*` `stack/*` `inline/*` `page/inset` `nav/pad-y` `band/pad-y` `section/*` `footer/pad-y`）。`space/*` を直接 bind しない |
| 幅・高さ・最小高 | `Spacing` の `size/*` / `measure/paragraph`（`minHeight` に bind） |
| 角丸・線幅・オフセット・不透明度 | `Shape` |
| 文字 | テキストスタイル（サイズ・行送りは `Typography` を経由） |
| 罫線グリッド | frame fill `color/divider` + padding `space/2` + itemSpacing `space/2`（§3.8。`space/2` は唯一の直接 bind） |
| モード連動 | ポスター系 7 行 + `pop/separator` `pop/badge` `hero/word` の **10 行**だけがモードで変わる。それ以外の部品はモード切替で不変であることを検証項目にする |

### 11.6 制作順序

1. `Primitives` → `Color`（Mono を先に埋め、Lime で 10 行を差し替える）→ `Spacing` → `Shape` → `Typography` → テキストスタイル 22。
2. `Icon / *` 13 → `Rule` → `Chip` → `Button` 4 セット → `Link` → `Brand / Lockup`。
3. `Nav / Menu Row` → `Nav / Bar` → `Hero / *` → `Section / Hero` → `Marquee / *` → `Section / Heading`。
4. `Media / Image Slot` → `Chat / *` → `Bento / Cell *` → `Bento / Grid` → `Activity / *` → `Persona / Card` → `Member / Card` → `Partner / Cell` → `Section / Poster` → `Section / Footer`。
5. Screens Desktop → Mobile（モード切替）→ Mono 検証 → プロトタイプ（§7.6）。

### 11.7 検証チェックリスト

| 項目 | 合格条件 |
|---|---|
| リテラル値 | 部品内に未束縛の色・余白・線幅がない（Variables パネルで検索） |
| モード切替 | Lime → Mono で変わるのはポスター系 7 行・マーキー区切り・活動バッジ・ヒーロー下線のみ |
| Desktop → Mobile | 4 ロールのサイズ・行送りと 8 alias（`inset/cell` `nav/pad-y` `grid/gutter` `section/*` 4 種 `footer/pad-y`）、`measure/paragraph` だけが変わる |
| コントラスト | §1.4 の表と Figma の実測色（アルファ合成後）が一致 |
| 折返し | §2.6.3 の検算表の 4 行が Figma でも同じ行数 |
| 帯高 | Nav 62、Marquee 56、Footer 106（Desktop） |
| フォーカス | `focus=true` のリングが地に応じて `focus/ring` / `focus/ring-inverse`、full-bleed 行は内側 |
| 記号 | テキストレイヤーに `→ ↑ ✳ 🙌 👀` が存在しない |
| 書体 | 全テキストが LINE Seed JP の 3 スタイルのみ（`Thin` なし、Archivo / Inter なし） |

---
## 付録 A. DECISION 一覧

コンセプトから導出できず本書で決めた項目。接頭辞は出自の分冊（C 色 / T 文字 / L レイアウト / K 部品 / M モーション・支援技術・コンテンツ / F Figma）、R は統合時の解決（§0.4）。R で上書きされた決定は「→ R」と記す。

### A.1 Color（C）

| # | 決定 | 根拠 |
|---|---|---|
| C-1 | neutral-600 は概念値 `#7d7979` を保持し、`ink-tertiary` を大テキスト・図形専用にする | AA 化しても 700 と 1.17 で知覚不能、ランプの等比が壊れ、ホバー面 / プレス面で活動セルが AA を割る |
| C-2 | surface = neutral-200 `#eae7e7`（`#eae9e9` を廃止） | 差 1.01、プリミティブ削減、ランプの暖色傾向に統一 |
| C-3 | ランプ改番: 50 = `#f8f4f4`、100 = ground、950 = ink | ground / ink をランプの端に置き、間の段を意味づける |
| C-4 | 暗い面のテキストはグラウンドのアルファ 100 / 88 / 72 / 48 | 1 列でインク面とポスター面に対応、ティントが面の色相を継ぐ |
| C-5 | アルファ尺度 6 / 12 / 24 / 48（倍々）、72（3 × 24）、88（secondary） | 88 はインク面 11.78 / ライムのポスター面 8.23。48 は ink 上 4.45 で L 専用 |
| C-6 | divider = neutral-500 実色 | ink@40 % と同等の見え。外周 64 % の合成事故を構造的に排除 |
| C-7 | ヒーロー格子線 = neutral-900 | ground@6 % over ink の合成値 `#2d2b2a` と同一 |
| C-8 改 | フォーカスリングは面ごとに 3 トークン: 明るい面 lime-700 / インク面 lime-300 / ポスター面 lime-900 | 4.46 / 12.79 / 5.72。ライムはポスター面の明度が反転するため 1 トークンでは賄えない（lime-300 を lime-400 上に置くと 1.18） |
| C-9 | 選択範囲は面別 600@24 / 400@24 / 900、文字色を面の primary に強制 | ink-secondary は選択上 4.02 で不合格 |
| C-10 | ボタン状態: 950 → 800 → 700、100 → 200 → 300 | ホバーは中間調へ 1 段、プレスはさらに 1 段（900 は 950 と 1.18 で区別不能） |
| C-11 | タグとリアクションチップは同一装置 → **R2**（塗り surface、枠なし、文字 ink-secondary） | 1px 線は行の仕切りに温存 |
| C-12 | 活動バッジ Lime = lime-800、Mono = ink-secondary | lime-400 は地の上 1.37 で不可。文字は 800（6.31）を床に |
| C-13 | 線は divider、図形は ink-tertiary 以上 | ink@40 は 2.41 で大テキストも不合格。可視の図形は 3:1 を床にする |
| C-14 | ポスターの副次コピーは全て 88 %（ライムでは ink@88） | 8.23。ライムでは 72 % も 5.32 で N を満たすが、抑制原則により階層は 2 段に留める |
| C-15 | hover 4 → 6 %、disabled 45 → 48 %、backdrop n900@50 → ink@48、shadow は ink@24 の 1 濃度 | C-5 の尺度に載せる。影の段差は幾何で作る |
| C-16 | リンク: ホバーは下線、プレス文字 600、現在地 ink 下線。ホバーで文字色を変えない | 罫線が構造を担う語彙に合う。1.4.1。持続状態にアクセントを使わない |
| C-17 | 既定モード = Lime accent、Mono は検証モード | アクセント出現が 4 箇所に限定されるため。2026-09-01 クライアント確定 |
| C-18 | ページにアクセント塗りボタンを置かない（ライブラリのみ） | ポスター面と競合させない |
| C-19 | neutral-50 / 400 は予備でテキスト不可。インディゴのランプ全段は記録用に残置 | 隣の段より優れる用途がない。ランプの完全性のために保持 |
| C-20 | 画像プレースホルダ = surface、キャプション = ink-secondary、アイコン = ink-tertiary | 5.30 / 3.50 |
| C-21 | 明るい面の文字階層は ink / ink-secondary の 2 段 + 大型専用 tertiary。quaternary は置かない | AA 窓（Y ≤ 0.159）に 700 より明るい知覚可能な段は入らない |
| C-22 | 高コントラストは §1.5.5 の写像 | 1 表で §7.5 から参照可能にする |
| C-23 | パートナーロゴも B/W、ブランド規定で色必須の 1 枚のみ原色 | ページの彩度をアクセント一色に集約 |
| C-24 | ティント面にアクセント文字を置かない。ゴーストボタンのラベルは ink 固定 | 600 は pressed-tint 上 4.59 で余裕 0.09 |

### A.2 Typography（T）

| # | 決定 | 根拠 |
|---|---|---|
| T-1 | サイズ梯子 12 · 13 · 14 · 15 · 16 · 17 · 19 · 22 · 26 · 32 · 40 · 56 · 72 · 96 · 124、概念の半端値を最寄り段に丸める | 1px 刻み・×1.2・×1.3 の 3 帯構造 |
| T-2 | Mobile のディスプレイ帯を連続段 56 · 40 · 32 · 26 に圧縮 | 序列を保ち、Poster 6 全角が 272 に収まる |
| T-3 | 行送りは整数偶数 px、Figma 変数で束縛。ディスプレイは normal 1.10 を切り上げ、Title 1 は 1.25 | half-leading が整数、行ボックス 20 / 40 が 4px モジュールに乗る |
| T-4 | トラッキング −2 / −1 / 0 / +3 / +6 / +12 の 6 段。ディスプレイ帯は −2% | 1 モード内で同一 px は同一値。正側は倍々 |
| T-5 | 最小 12px、例外なし | 和文 11px は潰れる |
| T-6 | `palt` / `halt` 不使用、`text-autospace: no-autospace`、和欧間の手動スペースなし | n 文字 = n em が成り立ち、Figma と CSS の折返しが一致 |
| T-7 | 800 = 17px 以上の構造、700 = 12–15px の声（ボタンラベル含む）、400 = 本文 | 14–15px の ExtraBold は漢字のカウンターが潰れる |
| T-8 | 文字色は §1 のトークンに束縛し hex を持たない | 色の梯子を 1 本にする |
| T-9 | ボタンラベルは Label/M 15 と Label/S 14 の 2 段、行ボックス 20 固定。Label L は置かない | コントロールは 36 / 44 の 2 段 |
| T-10 | `Label/Nav`（Regular 14 / 20、段落間隔 0）を追加 | 1 行のコントロールに段落の行送りを付けない |
| T-11 | Overline の和文 twin は +6%・ORIGINAL。混在文字列は 12px、ブランド名を大文字化しない | 全角ボックスは既に空く |
| T-12 | Body M 26（1.73）、Caption 18（1.5）、Footnote 20 | 可読域 1.6–1.8、整数の行ボックス |
| T-13 | 行長は文字数（35–45 全角）で規定し、px は `measure/paragraph` 588 / 342 に一本化 | 14 / 15 / 16px で 42 / 39 / 37 全角 |
| T-14 | 段落間隔 = `stack/sm` 12 | 行間の白と同量。段落の切れ目が行間の 2 倍 |
| T-15 | Figma スタイル 22 本。`fontSize` と `lineHeight` を束縛、`letterSpacing` は PERCENT リテラル | 字間は束縛すると px 固定になりモードに追従しない |
| T-16 | CSS は rem。流動 4 ロールは `clamp()` で 390 → 1440 を一次補間 | 1.4.4。補間中も行送り比が下限を割らない |
| T-17 | 記号置換・フォーカス・選択・下線・アクセント文字色は他章のトークンを参照 | 所有者を 1 つにする |

### A.3 Layout（L）

| # | 決定 | 根拠 |
|---|---|---|
| L-1 | 20 / 40 をスケールに残し役割を限定 | 44px コントロールの横 inset と footer にだけ必要 |
| L-2 | コントロールは高さ駆動 36 / 44、52 は無し | 端数の排除と HIG 44 の直接適用 |
| L-3 | trailing arrow はラベル直後 8（`fullWidth` でも） | 「ラベル + 矢印」を 1 語として読ませる |
| L-4 | section 64 / 80、display 96、Mobile 48 / 64 / 64 | 罫線の上 ≥ 下で罫線を次の section に帰属させる |
| L-5 | hero 72 → 80（下）、section 72 → 64（上） | 同じ 72 でも役割が異なる |
| L-6 | hero の縦リズムを 32 で統一、heading-mb 32 / 24 | 28・30・34 は同じ「塊の分離」役 |
| L-7 | hero `min-height: min(100svh − size/nav, size/hero-max 960)` | nav を除いた初期画面を満たし、縦長で止める |
| L-8 | measure を 588（6 col）に一本化 | 16 / 15 / 14px で 37 / 39 / 42 字 |
| L-9 | 罫線グリッドの枠と gap は 1 色 1 レイヤー、端数幅は許容 | Figma と CSS の構造一致 |
| L-10 | Mobile の罫線グリッドは 1 列 | 2 列では本文 128px ≈ 9 字 |
| L-11 | cell inset 24 / 20、staff 本文 16、leader 本文 24 均一 | Mobile は本文幅 298 の確保 |
| L-12 | avatar 24、chat indent 32、dot 4、イラスト 96、footer 40、chip gap 8、lockup gap 12 | 4 の倍数へ丸め、等距離は役割で決定 |
| L-13 | underline 5 → 4 | 1・2・4 の梯子 |
| L-14 | focus ring: `focus/ring` lime-700 / `focus/ring-inverse` lime-300 / `poster/focus/ring` lime-900 | 面の極性ごとに 3 トークン |
| L-15 | アイコン・dot・placeholder は ink-tertiary 以上 | n500 は 2.59 で 3:1 未満 |
| L-16 | kicker / meta 区切りは 1×12 hairline、asterisk は marquee 専用 | Overline 12 の横で 16px 以上のアイコンは過大 |
| L-17 | tag と reaction chip を 1 装置（24 高、`chip/fill` 塗り、枠なし） | 輪郭を 2.59 の hairline に依存させない |
| L-18 | shadow 幾何 0 1 2 / 0 4 8 / 0 16 32、dialog のみ → 濃度は **R14**（ink@24 の 1 濃度） | 等比 + アルファ尺度 |
| L-19 | sponsor placeholder の文言は左揃え | 「ラベルはすべて左」を優先 |
| L-20 | bento photo 16:9 固定、min 280 撤廃。sponsor logo も B/W | 比率 3 種に統一 |
| L-21 | logo mark 28 / 24 維持、白黒対象外 | wordmark 比 1.47 / 1.41 |
| L-22 | `nav/pad-y` 12 / 8 | CTA 44 でも帯 62 を保つ |
| L-23 | nav の内容は viewport inset 24（container に縛らない） | sticky 帯は窓枠に属する |
| L-24 | Mobile layout grid の gutter 16 | 24 では 2 col で 8 字 |
| L-25 | Mobile Menu row = 44 高 × 横 24 + hairline | nav の延長として brand と同じ x に揃う |
| L-26 | sponsor ロゴはセル中央 | 図であってラベルではない |
| L-27 | marquee 帯は高さ駆動 56、区切りアイコン 20 | 内側 52 = 4 × 13、19px 文字の横は `icon/md` |
| L-28 | marquee 停止セル 44 × 内側高、左 2px rule、ground、icon 24 | 帯と同じ罫線語彙で「セル」として切り出す |
| L-29 | 実装のブレークポイントは 2 つ: 構造 48rem / トークン 78rem（§3.6） | 2 フレームしかない仕様と連続なブラウザ幅の橋渡し。ナビと列数だけ先に開き、タイポは離散のまま |
| L-30 | logo mark は図の外接矩形で切った `icons/mark.svg` を 24 / 20 で置く | favicon.svg は余白込みで、図が小さく見え wordmark からも離れて見えた |
| L-31 | Partner セルは正方形タイル（Desktop 6 列 / tablet 3 / Mobile 2） | ロゴは正方形のアイコンが基本なので図とタイルの形を揃える。文字を運ばないタイルは L-10 の制約外。Mobile 1 列だと 342 角が 6 枚縦に積まれる |

### A.4 Components（K）

| # | 決定 | 根拠 |
|---|---|---|
| K-1 | ティントされる面の小さな文字は `ink-secondary` 以上 | `ink-tertiary` 3.85 は hover / pressed tint 上 3.42 / 3.05 |
| K-2 | Outline（ground 地、ライブラリ）の枠は currentColor（ink） | 枠だけがボタンを識別するので 3:1 が要る |
| K-3 | Link の Pressed は文字 `link/pressed` を `duration/0` で（Social はホバーと同じ、R5） | タッチの唯一のフィードバック |
| K-4 | Nav / Menu row の Current は ink 下線（太さは R16 で 2px） | 持続状態にアクセントを使わない |
| K-5 | Accent primary・Outline（ground）・Ghost・Chip Accent はライブラリのみ | C-18、Mono 原則 |
| K-6 | Mobile Menu panel: 非モーダル、44 行、ページ inset 24、フォーカスはボタンに留め ArrowDown で行へ | APG disclosure |
| K-7 | full-bleed 行（Activity セル・Menu row・Marquee control）のフォーカスリングは inset | 外側リングが隣接罫線と交差する |
| K-8 | Bento CTA cell は Mobile で縦積み | 横並びでは title が 3 字/行 |
| K-9 | Section heading の note を持たない | 編集ヒントは本番に出さない |
| K-10 | Social はテキストラベルのみ（brand アイコン不使用） | Poster はタイポグラフィで組む |
| K-11 | Marquee band の高さ → **R6**（56） | 帯は高さ駆動 |
| K-12 | Hero 格子線は viewport 4 等分の各右端に 1px `inverse/hairline` | 概念 R4 の位置を比率に正規化 |
| K-13 | Disabled は `<button aria-disabled="true">` のみ。`<a>` は Disabled を持たない | `href` のない `<a>` はフォーカス不能 |
| K-14 | Hover はポインタデバイスのみ（`@media (hover: hover)`） | タッチで hover が固着する |
| K-15 | link / button に `cursor: pointer` | Web の期待 |
| K-16 | Activity セル は Mobile でも badge を右上に維持 | 視線の流れ |
| K-17 | Pressed に scale を使わず色 1 段 | フラット原則、サブピクセル滲み（M-6 と同旨） |
| K-18 | 下線は `text-decoration`（`border-bottom` 不使用） | 折返し追従 |
| K-19 | Marquee トラックは `aria-hidden`、リンクを含めない | 動く要素をフォーカス対象にしない |
| K-20 | Persona 推薦行の矢印は leading | 「次に」を指す指示子であり CTA ではない |
| K-21 | Outline Soft / Strong の使い分け → **R3**（1 種に統合） | — |
| K-22 | Nav は不透明・影なし・sticky | フラット原則、M-7 |
| K-23 | Hero 段落の幅は `measure/paragraph` 588 | L-8。Body/L で 36.8 全角 |

### A.5 Motion / Accessibility / Content（M）

| # | 決定 | 根拠 |
|---|---|---|
| M-1 | スプリング 2 種（default 1.0/0.40、quick 1.0/0.30）+ 予約 momentum 0.8/0.40。固定時間は 0/100/200/400 ms。`linear()` 曲線は 1 本 | Apple 値をそのまま採り、色は倍数スケールで |
| M-2 | Reveal: 16 px、once、root-margin −10 %、stagger 80/60 ms 上限 4 | 読まれる前に静定し、待ち時間 ≤ 320 ms |
| M-3 | Marquee は速度 40 px/s で定義し、右端のセルに 44 の停止/再生ボタンをページ内モーション・スイッチとして置く | 内容量に依存しない速さ。WCAG 2.2.2 はページ内の手段を求める |
| M-4 改 | 回転語: 周期 2.5 s、上抜け・下入りのドラム運動、**無限ループ**（U-15）、名前は全文 | CLS ゼロ、1.3.1 |
| M-5 改 | ヒーロー浮遊バブルは削除。チャットの再生は U-16 で復活（スイッチが停止手段を持つため） | Purpose |
| M-6 | 押下フィードバックは塗り 1 段を 0 ms、`scale()` 禁止 | 2 px 罫の格子を壊さない |
| M-7 | Nav は縮小・自動隠しなし | 位置把握の予測可能性 |
| M-8 | Activity セル hover は背景ティントのみ。矢印 4 px nudge は不採用 | M9: 1 状態に 2 信号を出さない |
| M-9 | 下線は `text-decoration-thickness` 1 → 2 px。Nav / Brand hover は 2 px アクセント下線、文字は ink | thickness はレイアウトに影響しない |
| M-10 | hover / pressed ティント面に乗る文字は `ink-secondary` 以上 | K-1 と同じ |
| M-11 | Lime Poster の副次コピーは `poster/ink-secondary` = ink@88 の 1 値 | 8.23 で AA |
| M-12 | Activity セル の DOM は行全体を `<a aria-labelledby>` | フォーカスリングが行に出る、DOM が 1 つ |
| M-13 | Mobile メニューボタンは `size/control/md` 44 実寸 | 8 + 44 + 8 + 2 = 62。拡張不要 |
| M-14 | 和欧間の手動スペースなし。Bento CTA を「Discordに参加する」に、「↑」を削除、矢印・星・手・目はすべて Tabler アイコン、Marquee `asterisk` は 20 | JIS X 4051 / T-6、動詞先行、記号禁止 |
| M-15 | 外部リンクに `target="_blank"` を使わない | 新しいタブはユーザーの選択（Agency） |
| M-16 | Member 写真は `alt=""` | 氏名が常に隣接し、写真は情報を追加しない |
| M-17 | `<title>` = 固有名詞 — 説明（≤ 32 全角）、description 90–110 字、OG は B/W 写真 + ワードマーク | WCAG 2.4.2、§9.1 ボイス |
| M-18 | Chat セルは `<figure>` + `<figcaption>`（注記が名前） | 注記に役割を与え、`aria-label` を不要にする |
| M-19 | スキップリンクは Button Ink、Nav 直下・左寄せ | 2.4.1、HIG 44 |
| M-20 | フォールバックは `sans-serif` のみ、preload は 3 ウェイト | ファーストビューに Bold がある |

### A.6 Figma（F）

| # | 決定 | 根拠 |
|---|---|---|
| F-1 | Headline / Subheadline / Callout のスタイル名に `Text/` 接頭辞 | 1 段のグループにし、スタイル一覧をロール帯で読めるようにする |
| F-2 | アイコンは `Icon / <Name>` 13 セット × `Size` 3、fill は `color/ink` を既定 bind | インスタンス側で色だけ上書きする |
| F-3 | Mono 用のスクリーン複製を持たない。モード切替で検証する | 複製は乖離する。Mono で変わるのは 5 変数だけ |

### A.7 統合時の解決（R）

§0.4 の R1–R24。R24: Motion トークンは Figma Variables にしない（プロトタイプの duration / spring は変数に束縛できず、束縛できない変数は乖離する。Foundations ページの表と §7.6 の設定で保持する）。

### A.8 実装レビューの反映（U、2026-09-01）

Figma 上のレビューで出た指摘と、その決定。番号は U（UI feedback）。

| # | 決定 | 根拠 |
|---|---|---|
| U-1 | チャットにだけ角丸を許す（`radius/bubble` 18 / `radius/bubble-tail` 4）。avatar は `radius/full`、自分側は avatar なしで右寄せ、テールを付ける | あの部品は操作する UI ではなく「Messages で会話が起きている」という**絵**。引用は元の見えを保つほうが速く伝わる。例外はチャット部品に閉じ、ボタン・chip・セル・入力には波及させない |
| U-2 | リンク下線を静止 2px（`stroke/underline`）/ 状態 3px（`stroke/underline-strong`）に。`stroke/hair` 1 とは別 token | 1px は 124px の Display と同じ画面では消える。罫線の細さを保ったまま下線だけ上げるには token を分けるしかない |
| U-3 | ヒーロー回転語の下線を廃止し、**語そのもの**を `color/hero/word` で塗る。導入句「仲間と、」は quaternary → `inverse/ink` | 白 + アクセントの 2 色対比のほうが、白 + 下線より意味（仲間と ＋ 動詞）に忠実。文字なので、ライムを明るい地の面に使えない制約（1.37、C-25）にも触れない |
| U-4 | セクション見出しの連番（`01 —`）を廃止し、**和文の題を先・欧文ラベルを後**に置く | 番号は情報を足さずに視線の最初の一撃を数字に取る。順序は DOM で足りる。和文話者に意味を運ぶのは題のほう |
| U-5 | ヒーローのリードを `Title/3` 19 → `Title/1` 32 | 19 と本文 16 では差が知覚できず、Display 124 との間に階層がなかった |
| U-6 | About の統計値（50+）を `color/accent` に | ページ唯一の数字。ここだけアクセントを当てて規模を一撃で読ませる |
| U-7 | 「スポンサー」「協賛」を **パートナー**に統一（部品名 `Partner / Cell`、ナビ `Partners`、CTA「パートナーになる」） | 関係は金銭支援に限らない。呼び方を 1 つにして、団体・企業のどちらにも開く |
| U-8 | 活動内容を hairline の一覧から**ベント 4 セル**に。Talk Day（Feature）/ Dev Day / Project / Hackathon | 4 件を同格の行で並べると入口の太さの差が消える。面積で差をつければ読み手は選ばずに済む。About と同じ罫線グリッドを再利用してページの語彙を減らす |
| U-8b | Project（チーム開発・コードレビュー・イベント企画）と Hackathon（参加と開催の両方）を分ける | 前者は継続の営み、後者は期間の区切られた催し。関わり方（週次の役割 vs 数日の集中）が違うので、1 セルにまとめると読み手がどちらの顔で入るか決められない |
| U-9 | 開催頻度バッジは `showBadge` 既定 false。`arrow-right` は常時残す | 頻度が確定するまで出さない。「随時」で埋めると確定した情報と見分けがつかない。矢印はリンクの印として必要 |
| U-10 | Discord の導線は「参加する」1 本。「見学」段階を作らない | 参加自体が可逆で低コストなので、手前に段階を置いても障壁は下がらず導線が割れる。ハードルは文言（見るだけ参加も歓迎です）で下げる |
| U-11 | `ONLINE & OFFLINE` → `ONLINE & OFFLINE`、title も両方を主語に | 「first」は序列の宣言で、対面が二番手だという含みが残る。実態は両方 |
| U-12 | Member カードに SNS / 個人サイトのアイコンリンク（20 × 最大 3、`showSocials`） | 顔と実績が見えることが入会判断の材料になる。本文で列挙すると紹介文が読みにくいので 1 行に閉じる。同じアイコンが 5 枚並ぶので、支援技術向けの名前には**人名を含める** |
| U-13 | メタストリップに「サポーターズ 技育プロジェクト 学生団体公式パートナー」を長崎大学公認と同じ強さで併記 | どちらも第三者が裏づけた事実。片方だけ本文に落とすと格が下がって見える |
| U-14 | `Bento / Cell Text` の `body` プロパティを全 6 variant で `characters` に配線（バグ修正）。`body` は全 Kind で使える | 値を入れても既定文が出ていた。OFFICIAL セルに 2 つ目の裏づけを入れるために必要だった |
| U-15 | 回転語は 2 周で静止せず**回り続ける** | §7 M8 のスイッチが停止手段を提供済みで、有限化の理由（WCAG 2.2.2）が消えた。3 語を見せて止まる動きは「力尽きた」ようにしか見えない |
| U-16 | チャットは静止画をやめ、発言・スタンプ単位で順に現れて**ループ**する | 静止スレッドは「会話のスクリーンショット」に見える。伝えたいのは「いま誰かが喋っていて返事が返ってくる場所だ」ということで、順に現れることでしか出せない |
| U-17 | 活動セルを**リンクにしない**。hover / pressed / focus / 矢印も持たない | 4 セルとも同じ Discord に着地するので、押した対象と行き先が対応しない。参加への導線は Hero・Bento CTA・Poster が 3 度受け持っている |
| U-18 | About の写真セルは複数枚を**スライドさせて回す** | 「いろいろやっている」は 1 枚の代表写真では出ない。ベントで唯一「時間を持つ」セルなので、隣のチャットと合わせて 2 つ以上は作らない |
| U-19 | Discord / SNS の導線にブランドマークを**先頭**に添える | `arrow-up-right` は「外部」を言うが「どこへ」は言わない。ロゴは読む前に分かる唯一の記号。Nav の CTA だけは Mobile の幅検算が溢れるので置かない |
| U-20 | Hero の ink 面に**背景写真**を不透明度 0.2 で重ね、48 s 周期で漂わせる | 「仲間と、学ぶ／創る／話す」を字だけで言っていた。誰がどこで何をしているのかは 1 枚の写真が先に答える。動きは M9 の唯一の例外で、装飾だと認めたうえで採った — 引き換えに (1) 不透明度は好みではなく AA から逆算した測定値、(2) 速さは 0.6 px/s（マーキーの 1/60）で視線を引かない上限、(3) M8 のスイッチ 1 つで止まり、`prefers-reduced-transparency` / `forced-colors` では層ごと消える、の 3 つを課す |
| U-21 | 写真・イラスト・ロゴは原色。B/W 処理（grayscale + contrast）を撤回 | 色は「コミュニティの実像」を運ぶ情報。モノクロ化はそれを削っていた |
| U-22 | Hero の格子線 4 本（K-12）を撤去 | 写真の上に線が乗ると写真の一部に見え、何の線か分からない |
| U-23 | Discord のブランドマークだけ filled | 輪郭版は顔の目が線になって崩れて見える。Tabler outline のみの唯一の例外 |
| U-24 | Cell Stat の数字は白（inverse/ink）、Display/L + Display/M。U-6 のアクセントを撤回 | 規模は色ではなく大きさで語る。lime の Display/M は kicker と釣り合わなかった |
| U-25 | チャットのリアクションは実際の絵文字。数字は 1 から最終値へ 1 ずつ巻き上がる | Discord の実際のリアクションを写す絵。最初から「3」だと押した人がいないように見える |
| U-26 | ペルソナとチャットのアバターは Humation のイラスト（生成スクリプトで SVG 化） | 実在しない人物像に実写の顔を当てると「誰？」が先に立つ |
| U-27 | ~~Nav の CTA にも Discord マークを添える~~ **同日に撤回** — Nav の CTA は文言 + 矢印のまま（U-19 どおり） | 帯の CTA は文言だけで足りる。マークを足すと Mobile で矢印を落とす代償も要った |
| U-28 | Poster の Social はマーク 20 のみ。ラベルと矢印を落とす | マークが行き先を言い切るので文字は冗長。CTA と同じ行で目立ち過ぎていた |
| U-29 | Cell Stat の数字の下に所属を Chip（Inverse トーン）のバッジで並べる（長崎大学 情報データ科学部 / 工学部 / 大学院、長崎県立大学、長崎総合科学大学）。人数は出さない | 「50+」だけでは「どこの学生か」が分からない。複数大学からの参加が「誰でも」の裏づけになる。文の列よりタグのほうが一覧性が高い |

## 付録 B. 検証

- コントラスト: `guide-contrast.mjs`（WCAG 2.x 相対輝度。アルファは sRGB で下地に合成し 8bit hex に丸めてから比を取る）。本書の全数値はこのスクリプトの出力。
- 合成色: ink@6 / 12 / 24 / 48 / 88 over ground = `#e6e5e5` / `#dad9d8` / `#c0bfbf` / `#8e8c8c` / `#393737`。ground@88 / 72 / 48 over ink = `#dad9d8` / `#b8b7b6` / `#858483`。ground@12 / 24 over ink = `#393737` / `#535150`。ink@88 / 72 / 48 over lime-400 = `#2f361a` / `#425615` / `#5f860e`、ink@12 / 24 over lime-400 = `#8bce03` / `#7db607`。lime-400@24 over ground = `#deefb8`、over ink = `#3d4e16`。
- 書体メトリクス: `typo-metrics.mjs`（`LINESeedJP-*.ttf`）。
- トークン: `tokens-v2.json` を `validate-tokens.mjs` で検証（参照の存在、variant 数 ≤ 30、JSON の整合）。


---

## 付録 C — アクセント色の決定（Indigo / Lime）

**2026-09-01 決定: Lime accent を採用**（クライアント確定）。以下は判断の根拠。Indigo accent は Figma にモードとして残置し、決定過程の記録とする。

2026-09-01 実施。Figma の `Accent Lab` ページ（コンポーネント `Accent / Proof` を Color モード 3 種で明示適用した 3 インスタンス）と、Figma から解決した実値に対する WCAG 2.x 実測で判定した。以下の数値はすべてエイリアスを解決した実 hex から算出しており、推定値は含まない。

### C.1 実測（コントラスト比）

必要値: 通常テキスト 4.5、大きなテキスト・UI 部品・意味のある図形 3.0。`!` は不合格。`[参考]` 行は装飾面のため WCAG の対象外（記録のみ）。

| 判定項目 | 必要 | Mono | Indigo | Lime |
|---|---|---|---|---|
| ボタン: on-accent の文字 vs accent 面 | 4.5 | 5.79 | 5.79 | 10.83 |
| ボタン: accent 面 vs 地（面の輪郭） | 3.0 | 5.79 | 5.79 | **!1.37** |
| フォーカスリング vs 地 | 3.0 | 5.79 | 5.79 | 4.46 |
| hero/word vs 墨地（実配置） | 3.0 | 14.86 | 5.31 | 10.83 |
| accent-text（本文リンク）vs 地 | 4.5 | 5.79 | 5.79 | 6.31 |
| accent-text-small vs 地 | 4.5 | 7.24 | 7.24 | 7.85 |
| chip: on-accent-subtle vs accent-subtle | 4.5 | 8.06 | 8.06 | 7.49 |
| accent-on-ink vs 墨地 | 4.5 | 5.31 | 5.31 | 10.83 |
| focus/ring-inverse vs 墨地 | 3.0 | 11.12 | 11.12 | 12.79 |
| ポスター: poster/ink vs poster/ground | 4.5 | 14.86 | 5.79 | 10.83 |
| ポスター: ink-secondary vs poster 面 | 4.5 | 11.78 | 4.82 | 8.23 |
| ポスター: CTA 面 vs poster 面 | 3.0 | 14.86 | 5.79 | 10.83 |
| ポスター: CTA 文字 vs CTA 面 | 4.5 | 14.86 | 14.86 | 14.86 |
| ポスター: focus ring vs poster 面 | 3.0 | 11.12 | 4.33 | 5.72 |
| [参考] accent-subtle 面 vs 地 | — | 1.10 | 1.10 | 1.05 |
| [参考] pop/separator vs 墨地 | — | 3.86 | 2.57 | 3.33 |
| [参考] pop/badge vs 墨地 | — | 2.55 | 2.05 | 2.35 |
| [参考] ポスター面 vs 地（節の境目） | — | 14.86 | 5.79 | 1.37 |

`accent-text` / `accent-text-small` の Lime 値は本決定で lime/700・lime/800 から **lime/800・lime/900** に引き上げた後の値（lime/700 は 4.46 で AA を 0.04 下回るため不可）。`link/hover` `link/pressed` も同様に lime/800・lime/900 とした。

### C.2 実使用面の実測（Screens 走査）

合成済み Screens（Desktop 1440 / Mobile 390）を走査したところ、アクセント系ロールが実際に現れるのは以下のみだった。地の上のアクションは `color/action/fill`（墨）を通っており、`color/accent` を地の上で面として使っている箇所は **0**。

| 実使用 | 出現数 | 必要 | Mono | Indigo | Lime |
|---|---|---|---|---|---|
| `pop/badge` テキスト・アイコン線（地の上） | 24 | 4.5 / 3.0 | 5.83 | 7.24 | 6.31 |
| `pop/separator` 罫・アイコン線（地の上） | 96 | 3.0 | 3.85 | 5.79 | 4.46 |
| `hero/word`（墨地の上） | 2 | 3.0 | 14.86 | 5.31 | 10.83 |

**現行の合成画面に関しては 3 モードとも全項目合格。** C.1 の `!` は現時点で未使用のロールに対するもので、将来コンポーネントが `color/accent` を地の上の面に使った瞬間に顕在化する。したがって規範として C.3 に固定する。

### C.3 DECISION — 極性の規範

インディゴとライムは「同じ役割の色違い」ではない。**インディゴは明るい地の上で強い色（文字・線・状態として働く）**、**ライムは墨地の上と大面で強い色（面・ハイライトとして働く）** であり、明度の極性が反対である。indigo-600 は地に対し 5.79 だが墨地に対しては 2.57 で使えない。lime-400 は墨地に対し 10.83 だが地に対しては 1.37 で使えない。

- **DECISION C-25**: Lime accent を採用する場合、`color/accent`（lime/400）は **大面・墨地・マーカー専用**とし、明るい地の上で小さなコントロールの面として単独使用しない。地の上のアクションは `color/action/fill`（墨）を使う。根拠: lime-400 vs 地 = 1.37 で 1.4.11 の 3:1 を満たさず、コントロールの輪郭が識別できない。
- **DECISION C-26**: Lime accent の地の上のテキストは `accent-text` = lime/800（6.31）、`accent-text-small` = lime/900（7.85）。lime/700 は 4.46 で AA 不足。根拠: 実測。
- **DECISION C-27**: Lime accent のポスター面は地に対し 1.37 = 色相のみの境界のため、節の上端に **2px の `poster/ink` 罫**（`Section / Poster` の Top rule）を必ず置く。根拠: グレースケール・色覚特性でも節の境界を残すため。汎用の `divider`（neutral-500）はライム面上 1.88 で足りず、`poster/ink` ならライム面 10.83 / 地の側 14.86 で両側から読める。
- **DECISION C-28**: ポスター面の明度が反転しうるため、ポスターの CTA は汎用 `action/*` ではなく `poster/action/fill` `poster/action/ink` `poster/focus/ring` を通す。根拠: Mono/Indigo ではポスター面が暗い面、Lime では明るい面になり、同じロールでは両立しない。

### C.4 参照

- 比較ラボ: Figma `Accent Lab` ページ（`Accent / Proof` コンポーネント + Mono / Indigo / Lime の 3 インスタンス）。ポスター面・地の面・墨地の 3 層とフォーカスリングを常時表示で含む。
- Lime プリミティブ: Tailwind v4 lime（200 `#d8f999` / 300 `#bbf451` / 400 `#9ae600` / 500 `#7ccf00` / 600 `#5ea500` / 700 `#497d00` / 800 `#3c6300` / 900 `#35530e`）+ `alpha/lime-400/24`。
