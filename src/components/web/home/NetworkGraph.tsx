import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export const NetworkGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // Generate organic-looking synthetic data
    const nodes = Array.from({ length: 40 }, (_, id) => ({ id }));
    const links: any[] = [];
    nodes.forEach((node, i) => {
      // Connect to 2-3 random previous nodes to build a net
      const targets = [Math.floor(Math.random() * i), Math.floor(Math.random() * i)];
      targets.forEach(t => {
        if (t !== i && t >= 0) {
          links.push({ source: i, target: t });
        }
      });
    });

    setGraphData({ nodes, links } as any);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    
    // Slow rotation camera effect
    let angle = 0;
    const interval = setInterval(() => {
      if (graphRef.current) {
        // Subtle drift
        const d = 50 * Math.sin(angle);
        graphRef.current.d3Force('center').x(d).y(d * 0.5);
        angle += 0.05;
      }
    }, 50);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center opacity-70 mask-image-radial">
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeColor={() => '#00FF94'} // Neon Green nodes
        nodeRelSize={3}
        linkColor={() => 'rgba(46, 91, 255, 0.4)'} // Electric blue links
        linkWidth={1.5}
        d3VelocityDecay={0.1}
        cooldownTicks={100}
        onEngineStop={() => {
          if (graphRef.current) {
            graphRef.current.zoomToFit(400);
          }
        }}
        enableZoomInteraction={false}
        enablePanInteraction={false}
        enableNodeDrag={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <style>{`
        .mask-image-radial {
          mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
        }
      `}</style>
    </div>
  );
};
