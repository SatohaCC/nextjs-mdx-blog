'use client';

// NOTE: global-error.tsx は最上位のレイアウトでエラーが発生した際に表示されるため、
// 外部の CSS ファイルや PandaCSS 等のスタイリング機能も読み込めない可能性があります。
// そのため、確実にエラー内容を表示できるよう、意図的にインラインスタイルを使用しています。

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '1.5rem',
            textAlign: 'center',
            padding: '2rem',
            fontFamily: 'sans-serif',
          }}
        >
          <p style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1 }}>500</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>重大なエラーが発生しました</h1>
          <p style={{ color: '#666' }}>アプリケーションで予期しないエラーが発生しました。</p>
          <button
            onClick={reset}
            style={{
              padding: '0.5rem 1.25rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            再試行する
          </button>
        </div>
      </body>
    </html>
  );
}
