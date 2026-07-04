import React, { useEffect, useRef } from 'react';
import './nav-cat-sprite.css';

const SPRITE_SRC = '/img/cat-sprites.png';
const FRAME_SIZE = 48;

export default function NavCatSprite() {
  // 服务端渲染时返回占位容器
  if (typeof window === 'undefined') {
    return (
      <div className="nav-cat-sprite-container">
        <canvas className="nav-cat-sprite-canvas" aria-hidden="true" />
      </div>
    );
  }

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const stateRef = useRef('idle');
  const frameRef = useRef(0);
  const xRef = useRef(0);
  const xRatioRef = useRef(0);

  const lastTimeRef = useRef(0);
  const rafRef = useRef(null);
  const initializedRef = useRef(false);

  const dprRef = useRef(window.devicePixelRatio || 1);

  // 跳跃
  const isJumpingRef = useRef(false);
  const jumpYRef = useRef(0);

  //初始化 & resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const catSize = FRAME_SIZE * 2;
      xRef.current =
        xRatioRef.current * rect.width - catSize / 2;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 加载精灵图
  useEffect(() => {
    const img = new Image();
    img.src = SPRITE_SRC;

    img.onload = () => {
      imgRef.current = img;

      const catSize = FRAME_SIZE * 2;
      xRef.current = -catSize * 0.4;
      xRatioRef.current = 0;

      stateRef.current = 'peeking';
      initializedRef.current = true;

      setTimeout(() => runSequence(), 1000);
      startRender();
    };

    img.onerror = () =>
      console.error('加载精灵图失败！', SPRITE_SRC);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 动画序列
  const runSequence = async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const getNavWidth = () => {
      const canvas = canvasRef.current;
      if (!canvas) return 0;
      return canvas.getBoundingClientRect().width;
    };

    const IDLE_STATES = [
      'idle',
      'idleRight',
      'idleBack',
      'idleLeft',
    ];

    while (true) {
      await sleep(3000 + Math.random() * 4000);

      const catSize = FRAME_SIZE * 2;

      // 左侧探头
      stateRef.current = 'peeking';
      xRef.current = -catSize * 0.4;
      xRatioRef.current = 0;
      await sleep(1000);

      // 行走 + 随机停留动作
      const stopCount = Math.floor(Math.random() * 3);

      for (let stopIndex = 0; stopIndex <= stopCount; stopIndex++) {
        stateRef.current = 'walkRight';

        const walkTarget =
          getNavWidth() * (0.25 + Math.random() * 0.5);

        while (xRef.current < walkTarget) {
          xRef.current += 2;
          xRatioRef.current =
            (xRef.current + catSize / 2) / getNavWidth();
          await sleep(16);
        }

        const repeatCount =
          1 + Math.floor(Math.random() * 3);

        for (let i = 0; i < repeatCount; i++) {
          const state =
            IDLE_STATES[
              Math.floor(Math.random() * IDLE_STATES.length)
            ];
          stateRef.current = state;
          await sleep(800 + Math.random() * 1200);
        }
      }

      // 继续走到右侧
      stateRef.current = 'walkRight';
      while (true) {
        const navW = getNavWidth();
        const rightEdge = navW + catSize * 0.5;

        if (xRef.current >= rightEdge) break;

        xRef.current += 2.2;
        xRatioRef.current =
          (xRef.current + catSize / 2) / navW;

        await sleep(16);
      }

      // 右侧探头 & 离开
      stateRef.current = 'leaving';
      xRef.current = getNavWidth() - catSize * 0.4;
      xRatioRef.current = 1;
      await sleep(800);

      stateRef.current = 'gone';
      xRef.current = getNavWidth() + catSize;
      await sleep(500);

      xRef.current = -catSize;
      xRatioRef.current = 0;
      stateRef.current = 'idle';
    }
  };

  // 渲染循环
  const startRender = () => {
    const render = (timestamp) => {
      drawFrame(timestamp);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
  };

  // 帧配置
  const getFrameConfig = () => {
    switch (stateRef.current) {
      case 'idle':
        return { row: 0, startCol: 0, totalFrames: 2, fps: 3 };
      case 'idleBack':
        return { row: 1, startCol: 0, totalFrames: 2, fps: 3 };
      case 'idleLeft':
        return { row: 2, startCol: 0, totalFrames: 2, fps: 3 };
      case 'idleRight':
        return { row: 3, startCol: 0, totalFrames: 2, fps: 3 };

      case 'walkForward':
        return { row: 0, startCol: 2, totalFrames: 2, fps: 10 };
      case 'walkBack':
        return { row: 1, startCol: 2, totalFrames: 2, fps: 10 };
      case 'walkLeft':
        return { row: 2, startCol: 2, totalFrames: 2, fps: 10 };
      case 'walkRight':
        return { row: 3, startCol: 2, totalFrames: 2, fps: 10 };

      case 'peeking':
      case 'leaving':
        return { row: 0, startCol: 0, totalFrames: 2, fps: 4 };

      case 'gone':
      default:
        return { row: 0, startCol: 0, totalFrames: 1, fps: 999 };
    }
  };

  // 绘制
  const drawFrame = (timestamp) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    const dpr = dprRef.current;

    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);

    const state = stateRef.current;
    if (state === 'gone') return;

    const config = getFrameConfig();

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;
    const frameInterval = 1000 / config.fps;

    if (elapsed > frameInterval) {
      frameRef.current =
        (frameRef.current + 1) % config.totalFrames;
      lastTimeRef.current = timestamp;
    }

    const sx =
      (config.startCol + frameRef.current) * FRAME_SIZE;
    const sy = config.row * FRAME_SIZE;

    const sourceSize = FRAME_SIZE;
    const targetSize = FRAME_SIZE * 2;

    const x = xRef.current;
    const y =
      h - targetSize + 30 + jumpYRef.current;

    // 左侧探头
    if (state === 'peeking') {
      ctx.save();

      const offsetX = -10;
      const visibleW = targetSize * 0.6;

      ctx.beginPath();
      ctx.rect(0 + offsetX, y, visibleW, targetSize);
      ctx.clip();

      const cx = x + targetSize * 0.7 + offsetX;
      const cy = y + targetSize * 0.4;

      ctx.translate(cx, cy);
      ctx.rotate(Math.PI * 0.15);
      ctx.translate(-cx, -cy);

      ctx.drawImage(
        img,
        sx, sy, sourceSize, sourceSize,
        x + offsetX, y, targetSize, targetSize
      );

      ctx.restore();
    }

    // 右侧探头
    else if (state === 'leaving') {
      ctx.save();

      const offsetX = -10;
      const visibleW = targetSize * 0.6;
      const clipX = x + offsetX;

      ctx.beginPath();
      ctx.rect(clipX, y, visibleW, targetSize);
      ctx.clip();

      const cx = x + targetSize * 0.3 + offsetX;
      const cy = y + targetSize * 0.4;

      ctx.translate(cx, cy);
      ctx.rotate(-Math.PI * 0.15);
      ctx.translate(-cx, -cy);

      ctx.drawImage(
        img,
        sx, sy, sourceSize, sourceSize,
        x + offsetX, y, targetSize, targetSize
      );

      ctx.restore();
    }

    // 正常绘制
    else {
      ctx.drawImage(
        img,
        sx, sy, sourceSize, sourceSize,
        x, y, targetSize, targetSize
      );
    }

    ctx.restore();
  };

  // 跳跃动作
  const doJump = () => {
    if (isJumpingRef.current) return;

    const state = stateRef.current;
    if (state === 'peeking' || state === 'leaving') return;

    isJumpingRef.current = true;

    const duration = 500;
    const height = 40;
    const start = performance.now();

    const animateJump = (now) => {
      const t = Math.min((now - start) / duration, 1);
      jumpYRef.current = -height * Math.sin(Math.PI * t);

      if (t < 1) {
        requestAnimationFrame(animateJump);
      } else {
        jumpYRef.current = 0;
        isJumpingRef.current = false;
      }
    };

    requestAnimationFrame(animateJump);
  };

  // 监听 nav 点击
  useEffect(() => {
    const checkAndJump = (e) => {
      const nav = e.target.closest('nav[aria-label]');
      if (!nav) return;

      const state = stateRef.current;
      if (state === 'peeking' || state === 'leaving') return;

      doJump();
    };

    document.addEventListener('mousedown', checkAndJump);
    document.addEventListener('touchstart', checkAndJump, { passive: true });

    return () => {
      document.removeEventListener('mousedown', checkAndJump);
      document.removeEventListener('touchstart', checkAndJump);
    };
  }, []);

  return (
    <div
      className="nav-cat-sprite-container"
    >
      <canvas
        ref={canvasRef}
        className="nav-cat-sprite-canvas"
        aria-hidden="true"
      />
    </div>
  );
}