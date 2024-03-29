<h1>Quicook</h1>
<p>３分で作れるお手軽料理が動画付きで見れて共有できるアプリケーションです!</p>
<img src="back/public/images/quicook.png" alt="UNADJUSTEDNONRAW_thumb_1">
(https://github.com/reri2525/quicook/assets/110535369/ad32139b-a0a0-4b62-adf5-0edbcd21c8cc)</br>
<a>↑</a></br>
<p>デモ動画</p>
<a href="https://quicook-com.vercel.app/">こちらアプリケーションのurlになります!（基本ECSサービスを落としてます。）</a></br>
<a>※現在個人開発の方針についていろいろ考えているため,しばらくこのリポジトリは更新しないと思います。</a></br>
<a>※現在まだレスポンシブ対応ができてないないのでpcから閲覧していただけると幸いです。</a></br>
<a>※メールアドレス(gest123@gest.jp)パスワード(gestuser)でゲストユーザーにログインできます。</a></br>
<a>※レシピ数がほとんどありませんが、今後追加していく予定です。</a></br>
<h2>なぜこのアプリを作ったのか</h2>
<p>通勤通学前などで料理をしたくても時間がなくて大変なことが多いですが、時短で美味しく作れる料理レシピというのはそういったタイミングで大きく需要があると考えたからです。
   自分自身も時間がかかるのが嫌で料理を作らないことが多いので、こういったサービスはありなのではないかと考えました。このサービスを元に自ら料理をする人を増やして多くの人が
   健康的な食生活を送れるようにして行くことが僕自身の望みです。</p>
<h2>クラウドアーキテクチャ</h2>
<img src="back/public/images/クラウド図.png">
<h2>使用技術等</h2>
<ul>
 <li>Ruby on Rails(バックエンド)</li>
 <li>Rspec</li>
 <li>React(フロントエンド)</li>
 <li>TypeScript(フロントエンド)</li>
 <li>AWS(インフラ)</li>
 <li>Docker</li>
 <li>Vercelでフロントエンドをデプロイ。</li>
 <li>ECS/Fargateでバックエンドコンテナを実行。</li>
 <li>ALBを使ってSSL通信を行なっている。</li>
 <li>Github ActionsでCI/CDを構築。(Vercelへのデプロイもしてる。)</li>
 <li>ドメインをバックエンドとフロントエンドでそれぞれ取得している。</li>
</ul>
<h2>見ていただきたい点</h2>
<ul>
 <li>ReactとRailsを使用してSPAで構成されている。</li>
 <li>UIにモーダルなどを使用している。</li>
 <li>ECS/Fargateでコンテナを使用してサーバーレスでコンテナを実行している。</li>
 <li>useContextを使っている。any型をなるべく使わないようにしている。(現在TypeScript導入中なのでまだ完全にできてない。)
</ul>
<h2>機能一覧</h2>
<ul>
 <li>ユーザー登録・編集・削除</li>
 <li>プロフィール閲覧機能</li>
 <li>フォロー、フォロワー閲覧機能</li>
 <li>ログイン機能</li>
 <li>フォロー機能</li>
 <li>レシピ投稿、動画付きで投稿できる。</li>
 <li>カテゴリ検索</li>
 <li>レシピ名検索</li>
 <li>ブックマーク、いいね機能</li>
 <li>ページネーション機能</li>
 <li>投稿の人気順表示</li>
 <li>パスワードの再設定機能</li>
</ul>
<h2>技術の選定理由</h2>
<h3>Ruby on Rails(バックエンド)</h3>
<ul>
 <li>日本語ドキュメントや記事が豊富で初学者が勉強しやすい。(自分自身も他の言語と比較してそうだと感じています)</li>
 <li>構文が他の言語に比べて簡単で読みやすく書いていて自分が楽しいと感じる。</li>
 <li>自社開発企業様で多く使われている。</li>
</ul>
<h3>React(フロントエンド)</h3>
<ul>
 <li>関数コンポーネントが非常に見やすくて書いていて自分が楽しい。</li>
 <li>大規模なサービスやSPAアプリケーションのフロントエンドとして多く使われている。</li>
 <li>スマホアプリやvr開発にも技術を横展開できる。</li>
</ul>
<h3>TypeScript(フロントエンド)</h3>
<ul>
 <li>JavaScript開発では必須になってきている。</li>
 <li>型定義をすることでstateなどの中身に入るオブジェクトなどの型がコードで確認できてチーム開発がしやすい。</li>
</ul>
<h3>Vercel</h3>
<ul>
 <li>コスト削減のためです。</li>
</ul>
<h3>AWS(ECS)</h3>
<ul>
 <li>サーバーレスでコンテナを実行でき、EC2などに比べて管理・運用がしやすい。</li>
</ul>
<h3>Github Actions</h3>
<ul>
 <li>現在トレンド且つ主流になっているci/cdパイプラインである。</li>
 <li>Github公式のサービスであるためGithubと連携がしやすい。</li>
</ul>




