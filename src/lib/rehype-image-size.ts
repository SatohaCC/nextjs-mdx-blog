import imageSize from 'image-size';
import fs from 'node:fs';
import path from 'node:path';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface ImageNode extends Node {
  type: 'element';
  tagName: string;
  properties: {
    src?: string;
    width?: number;
    height?: number;
  };
}

/**
 * MDX 内の <img> 要素の src を解析し、ローカル画像の場合は自動的に width/height プロパティを追加する rehype プラグイン。
 * public ディレクトリ内の画像のみを対象とします。
 */
export default function rehypeImageSize() {
  return (tree: Node) => {
    visit(tree, 'element', (node: ImageNode) => {
      if (node.tagName === 'img' && node.properties.src) {
        const { src } = node.properties;

        // 外部 URL はスキップ
        if (src.startsWith('http') || src.startsWith('//')) {
          return;
        }

        // / から始まるパスを想定（public ディレクトリ内）
        const imagePath = path.join(process.cwd(), 'public', src);

        if (fs.existsSync(imagePath)) {
          try {
            const buffer = fs.readFileSync(imagePath);
            const dimensions = imageSize(buffer);
            if (dimensions.width && dimensions.height) {
              node.properties.width = dimensions.width;
              node.properties.height = dimensions.height;
            }
          } catch (err) {
            console.error(`Failed to get image size for ${src}:`, err);
          }
        }
      }
    });
  };
}
