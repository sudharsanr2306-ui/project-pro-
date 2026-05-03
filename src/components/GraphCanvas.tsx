import React, { useMemo } from 'react';
import {
  ReactFlow,
  Panel,
  Background,
  Controls,
  ConnectionMode,
  Node as FlowNode,
  Edge as FlowEdge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface NodeData {
  id: string;
  type: 'file' | 'function' | 'dependency';
  label: string;
}

interface EdgeData {
  from: string;
  to: string;
  label: string;
}

interface GraphCanvasProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

const nodeTypes = {}; // We can add custom node types if needed

export default function GraphCanvas({ nodes, edges }: GraphCanvasProps) {
  const flowNodes: FlowNode[] = useMemo(() => {
    return nodes.map((node, index) => ({
      id: node.id,
      data: { label: node.label },
      position: { x: Math.cos(index) * 200 + 300, y: Math.sin(index) * 200 + 200 },
      style: {
        background: node.type === 'file' ? '#3b82f6' : node.type === 'function' ? '#a855f7' : '#f97316',
        color: '#fff',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        fontWeight: 'bold',
        border: 'none',
        width: 120,
        textAlign: 'center',
      },
    }));
  }, [nodes]);

  const flowEdges: FlowEdge[] = useMemo(() => {
    return edges.map((edge, index) => ({
      id: `e${index}`,
      source: edge.from,
      target: edge.to,
      label: edge.label,
      type: 'smoothstep',
      animated: true,
      labelStyle: { fill: '#71717a', fontSize: 10, fontWeight: 500 },
      style: { stroke: '#3f3f46' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3f3f46',
      },
    }));
  }, [edges]);

  return (
    <div className="h-[400px] w-full bg-black rounded-2xl overflow-hidden border border-zinc-800">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background color="#27272a" gap={20} />
        <Controls showInteractive={false} className="bg-zinc-900 border-zinc-800 fill-white" />
        <Panel position="top-right" className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-2 rounded-lg text-[10px] font-mono text-zinc-500">
          KNOWLEDGE_GRAPH_VIEWER_ROOT
        </Panel>
      </ReactFlow>
    </div>
  );
}
