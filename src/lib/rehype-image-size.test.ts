import { describe, expect, it, vi } from 'vitest';
import rehypeImageSize from './rehype-image-size';
import fs from 'node:fs';
import imageSize from 'image-size';

vi.mock('node:fs');
vi.mock('image-size');

describe('rehypeImageSize', () => {
  it('should add width and height to local image elements', async () => {
    const plugin = rehypeImageSize();
    
    // モックの設定
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(Buffer.from('dummy'));
    vi.mocked(imageSize).mockReturnValue({ width: 800, height: 600 });

    const mockNode: any = {
      type: 'element',
      tagName: 'img',
      properties: {
        src: '/test.png',
      },
    };

    const tree = {
      type: 'root',
      children: [mockNode],
    };

    // プラグインの実行
    (plugin as any)(tree);

    expect(mockNode.properties.width).toBe(800);
    expect(mockNode.properties.height).toBe(600);
  });

  it('should skip external images', async () => {
    const plugin = rehypeImageSize();
    
    const mockNode: any = {
      type: 'element',
      tagName: 'img',
      properties: {
        src: 'https://example.com/test.png',
      },
    };

    const tree = {
      type: 'root',
      children: [mockNode],
    };

    (plugin as any)(tree);

    expect(mockNode.properties.width).toBeUndefined();
    expect(mockNode.properties.height).toBeUndefined();
  });
});
