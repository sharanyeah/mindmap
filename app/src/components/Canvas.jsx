import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { draw, checkBounds } from '../Render';

const Canvas = forwardRef(({ mindMap, setMindMap }, ref) => {
  const canvasRef = useRef(null);
  const animTimerRef = useRef(null);
  const dragStateRef = useRef({
    onDrag: false,
    dragState: 0,
    draggedElem: null,
    dragTimer: null,
    dragEnd: false,
    dragWait: false,
    dragWaitWorkspace: false,
    dragTransplant: false,
    lastTransplantEvent: {}
  });

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    getDragState: () => dragStateRef.current
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      if (mindMap) {
        draw(mindMap);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mindMap]);

  useEffect(() => {
    if (mindMap && canvasRef.current) {
      draw(mindMap);
    }
  }, [mindMap]);

  return (
    <canvas 
      id="canvas" 
      ref={canvasRef}
    />
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;
