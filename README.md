## 参考サイト

<a href="https://www.eduardbodak.com/">https://www.eduardbodak.com/</a>

## 🎉 Library

- gsap
- lenis
- swup
- typescript

## 🧐 Subject

- 参考元サイトのカードの動き
- ScrollSmother を使わず、 Lenis と ScrollTrigger の連携、scrollerProxy の使用法
- MPA のページ遷移アニメーションを swup で<br>
  <a href="https://swup.js.org/">swup 公式</a>

- 色、スペース、フォント CSS 変数での管理
- スマホのハンバーガーメニューも面白いと感じたので、アクセシビリティに考慮しつつ実装

## 📝 Memo

- THREE.JS 触ってるから簡単なアニメーションに見えたけど、裏表の表現ってなかなかないよね

- ページ遷移はライブラリを使うが、css の@view-transition が firefox でも使えるようになればなあ　 statsCounter によると firefox 日本で 3%だから無視も視野か

- dialog 属性のアニメーション、外れるときは一瞬で消えてしまうので工夫が必要 →js で制御が必要といろいろな記事に書いてあるが、css/html で可能<br>🔴<a href="https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/dialog">MDN</a>参考に<br>
  MDN を参考にしても、虚空をクリックしたら dialog が一瞬暗くなるので、しっかり pointer-events を無効にする

- スマホ時、MENU 開いた時、Draggable を使用して閉じれるように

## ‼️ 発見

- service セクションがページの半分に来たところでアニメーションが始まり、ページのトップに来たら pin が始まるように見えたが、実は、<p><b>pin は使っておらず、position: sticky で親を 350vh,子を 100vh にして固定していたのだ。</b></p>これなら ScrollTrigger を 2 つ作らなくてもすむ。
  以前の模写でも利用できたかもしれない。

- dialog をオープン時スクロール不可にする。Lenis を使っている場合、lenis.stop()、lenis.start()を使わないとスクロール可能になってしまう

- カードが遠くなって不透明になっていく際、カードが透過していないことに気づいただろうか。私は最初気づかなかった。背景色と同じ色のカバーの透明度を変えているようだ。

## 7/15 追記

sp のメニューを gsap で実装していたが、最適なパッケージを発見<br>
https://www.npmjs.com/package/react-use-gesture<br>
https://codesandbox.io/p/sandbox/action-sheet-zuwji?file=%2Fsrc%2Findex.js

<br><br>
普通にもっといいの shadcn/ui にあった<br>
https://ui.shadcn.com/docs/components/drawer
