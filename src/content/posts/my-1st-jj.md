---
title: 'Jujutsu のメモ書き'
date: '2026-04-18'
excerpt: 'gitと併用して使えるJujutsu'
tags: ['Jujutsu']
draft: true
---

# Jujutsu のメモ書き

最近、Jujutsu を使い始めたので、そのメモ書きをここに残します。

## 1. Jujutsu とは

とりあえずなんか便利なバージョン管理

## 2. 既存システムへの導入

```bash
cd your-existing-project
jj git init
```

これで・/jjフォルダが作成され、jjとgitが同期される。

次は最新の状態を取り込む（Gitの git fetch）

```bash
jj git fetch
```

ブランチを作る。
main はmainブランチから派生させるって意味。
jjでは後からブランチ名を考える。

```bash
jj new main
```

ここで

```bash
git branch
```

すると、mainブランチにいることがわかる。

Step 3: コードを書く・確認する
普通にエディタでコードを書きます。Jujutsuはファイルの変更を自動で追跡しているので、git add は不要です。

```bash
jj bookmark set create-draft-test -r "@"
```

WindowsのPowerShellだとダブルクオーテーションがないと通らない？？

```bash
git branch
```

この時点でもmainブランチ。
そもそも、ブランチの考え方が違う。
Gitのブランチの中で作業するという感覚は捨てたほうがいい？

```bash
jj git push

# Warning: Refusing to create new remote bookmark test@origin
# Hint: Run `jj bookmark track test --remote=origin` and try again.
# Nothing changed.
```

リモートにないから送れないという意味らしい。

```bash
jj git push -b create-draft-test

# Error: Won't push commit f246a38911d2 since it has no description
# Hint: Rejected commit: srzsvonp f246a389 create-draft-test | (no description set)
```

no description → コミットメッセージがないと送れない。

```bash
jj describe -m "テスト用下書きの作成"

# Working copy  (@) now at: srzsvonp 54d44731 test | テスト用下書きの作成
# Parent commit (@-)      : vlnsnowt 633d000f main main@origin | 前のコミットメッセージ
```

```bash
jj git push -b test

# Changes to push to origin:
#   Add bookmark test to f5597f3b7804
```

pushされたぽい
Githubを開くとtestブランチが作成されている。

ちなみに

```bash
git branch
```

この時点でもmainブランチ。

Githubでプルリクエストを作成する。
マージ。

```bash
jj git fetch
```

これでローカルをリモートと同じにできる。

```bash
jj new main@origin
```

明示的にリモートのmainブランチから派生させる。

### 参考資料

- [aa]()
