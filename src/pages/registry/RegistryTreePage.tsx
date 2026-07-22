// PAGE 8 — INTERACTIVE 2D FAMILY TREE
// Route: /ancestor-root-registry/tree
// Custom SVG tree renderer — no heavy genealogy libraries

import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ZoomIn, ZoomOut, Maximize2, ChevronDown, ChevronUp,
  TreePine, User, AlertTriangle
} from 'lucide-react'
import { loadRegistryData, getPersonWithRelations } from '@/lib/registry-storage'
import type { RegistryData, Person } from '@/types/registry'

interface TreeLayoutNode {
  person: Person
  x: number
  y: number
  generation: number
  spouseX?: number
  spouse?: Person
  children: TreeLayoutNode[]
  parents: TreeLayoutNode[]
  collapsed: boolean
}

function buildTreeLayout(data: RegistryData, collapsedGens: Set<number>): TreeLayoutNode | null {
  const rootPerson = data.people.find((p) => p.id === data.registry.creatorPersonId)
  if (!rootPerson) return null

  const visited = new Set<string>()

  function buildNode(person: Person, gen: number): TreeLayoutNode {
    visited.add(person.id)

    // Find partner
    const partnerRel = data.relationships.find(
      (r) =>
        (r.personAId === person.id || r.personBId === person.id) &&
        (r.relationshipType === 'partner' || r.relationshipType === 'spouse')
    )
    const partnerId = partnerRel
      ? partnerRel.personAId === person.id
        ? partnerRel.personBId
        : partnerRel.personAId
      : null
    const partner = partnerId ? data.people.find((p) => p.id === partnerId) : undefined

    // Find children
    const childRels = data.relationships.filter(
      (r) => r.personAId === person.id && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent')
    )
    const children = childRels
      .map((r) => data.people.find((p) => p.id === r.personBId))
      .filter((p): p is Person => !!p && !visited.has(p.id))
      .map((c) => buildNode(c, gen + 1))

    // Find parents (for upward tree)
    const parentRels = data.relationships.filter(
      (r) => r.personBId === person.id && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent')
    )
    const parents = parentRels
      .map((r) => data.people.find((p) => p.id === r.personAId))
      .filter((p): p is Person => !!p && !visited.has(p.id))
      .map((p) => buildNode(p, gen - 1))

    return {
      person,
      x: 0,
      y: 0,
      generation: gen,
      spouse: partner,
      spouseX: partner ? 1 : undefined,
      children,
      parents,
      collapsed: collapsedGens.has(gen),
    }
  }

  return buildNode(rootPerson, 0)
}

function assignPositions(node: TreeLayoutNode, x: number, y: number, hSpacing: number, vSpacing: number): number {
  if (node.collapsed) {
    node.x = x
    node.y = y
    return x
  }

  // Position parents above
  let parentWidth = node.parents.length * hSpacing
  let parentStartX = x - parentWidth / 2 + hSpacing / 2

  node.parents.forEach((parent, i) => {
    assignPositions(parent, parentStartX + i * hSpacing, y - vSpacing, hSpacing, vSpacing)
  })

  // Position children below
  const visibleChildren = node.children
  let childWidth = visibleChildren.length * hSpacing
  let childStartX = x - childWidth / 2 + hSpacing / 2

  visibleChildren.forEach((child, i) => {
    assignPositions(child, childStartX + i * hSpacing, y + vSpacing, hSpacing, vSpacing)
  })

  node.x = x
  node.y = y

  // Center node based on children width if wider
  const totalWidth = Math.max(hSpacing, childWidth, parentWidth)
  return x + totalWidth / 2
}

function collectNodes(node: TreeLayoutNode, nodes: TreeLayoutNode[] = []): TreeLayoutNode[] {
  if (!node) return nodes
  nodes.push(node)
  if (!node.collapsed) {
    node.parents.forEach((p) => collectNodes(p, nodes))
    node.children.forEach((c) => collectNodes(c, nodes))
  }
  return nodes
}

export default function RegistryTreePage() {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [collapsedGens, setCollapsedGens] = useState<Set<number>>(new Set())
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
  }, [navigate])

  const treeRoot = useMemo(() => {
    if (!data) return null
    return buildTreeLayout(data, collapsedGens)
  }, [data, collapsedGens])

  const allNodes = useMemo(() => {
    if (!treeRoot) return []
    // Reset positions
    assignPositions(treeRoot, 400, 350, 180, 140)
    return collectNodes(treeRoot)
  }, [treeRoot])

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.3))
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const handleMouseUp = () => setDragging(false)

  function getStatusColor(status: string): string {
    switch (status) {
      case 'Documented': return '#4CAF50'
      case 'Family Testimony': return '#FF9500'
      case 'Research Lead': return '#2196F3'
      default: return '#9E9E9E'
    }
  }

  function getStatusDot(status: string): string {
    switch (status) {
      case 'Documented': return '#4CAF50'
      case 'Family Testimony': return '#FF9500'
      case 'Research Lead': return '#2196F3'
      default: return '#757575'
    }
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-[#05080e] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/dashboard')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Dashboard
          </button>
          <p className="text-sm text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {data.registry.name} — Family Tree
          </p>
          <div className="flex items-center gap-1">
            <button onClick={handleZoomOut} className="p-2 rounded-lg text-[#C9B99A] hover:bg-[rgba(201,185,154,0.08)] transition-colors cursor-pointer">
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] text-[#C9B99A]/40 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-2 rounded-lg text-[#C9B99A] hover:bg-[rgba(201,185,154,0.08)] transition-colors cursor-pointer">
              <ZoomIn size={16} />
            </button>
            <button onClick={handleReset} className="p-2 rounded-lg text-[#C9B99A] hover:bg-[rgba(201,185,154,0.08)] transition-colors cursor-pointer">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Tree canvas */}
      <div
        className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {allNodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <TreePine size={48} className="text-[#C9B99A]/20 mx-auto mb-4" />
              <p className="text-sm text-[#C9B99A]/40">No family tree data yet.</p>
              <button
                onClick={() => navigate('/ancestor-root-registry/build')}
                className="mt-4 text-xs text-[#FF9500] hover:text-[#FFB840] cursor-pointer"
              >
                Start Building
              </button>
            </div>
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox="0 0 800 700"
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {allNodes.map((node) => (
              <g key={`lines-${node.person.id}`}>
                {/* Parent lines */}
                {node.parents.map((parent) => (
                  <line
                    key={`parent-${parent.person.id}-${node.person.id}`}
                    x1={parent.x}
                    y1={parent.y + 35}
                    x2={node.x}
                    y2={node.y - 35}
                    stroke="rgba(201,185,154,0.15)"
                    strokeWidth="1.5"
                  />
                ))}
                {/* Children lines */}
                {node.children.map((child) => (
                  <line
                    key={`child-${node.person.id}-${child.person.id}`}
                    x1={node.x}
                    y1={node.y + 35}
                    x2={child.x}
                    y2={child.y - 35}
                    stroke="rgba(201,185,154,0.15)"
                    strokeWidth="1.5"
                  />
                ))}
                {/* Spouse line */}
                {node.spouse && (
                  <line
                    x1={node.x + 35}
                    y1={node.y}
                    x2={node.x + 75}
                    y2={node.y}
                    stroke="rgba(255,149,0,0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                )}
              </g>
            ))}

            {/* Nodes */}
            {allNodes.map((node) => (
              <g key={node.person.id}>
                {/* Main node */}
                <g
                  onClick={() => navigate(`/ancestor-root-registry/person/${node.person.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="32"
                    fill="rgba(27,40,56,0.85)"
                    stroke={getStatusColor(node.person.recordStatus)}
                    strokeWidth="1.5"
                    filter="url(#glow)"
                  />
                  <text
                    x={node.x}
                    y={node.y - 5}
                    textAnchor="middle"
                    fill="#F0EBE1"
                    fontSize="10"
                    fontWeight="500"
                    fontFamily="'Playfair Display', Georgia, serif"
                  >
                    {node.person.preferredName || node.person.fullName}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 10}
                    textAnchor="middle"
                    fill="rgba(201,185,154,0.5)"
                    fontSize="8"
                  >
                    {node.person.birthDate || ''}
                  </text>
                  {/* Status dot */}
                  <circle
                    cx={node.x + 22}
                    cy={node.y - 22}
                    r="4"
                    fill={getStatusDot(node.person.recordStatus)}
                    stroke="rgba(27,40,56,0.85)"
                    strokeWidth="1"
                  />
                  {/* Living indicator */}
                  {node.person.isLiving === false && (
                    <text x={node.x} y={node.y + 22} textAnchor="middle" fill="rgba(201,185,154,0.3)" fontSize="7">
                      &#8224;
                    </text>
                  )}
                </g>

                {/* Spouse node */}
                {node.spouse && (
                  <g
                    onClick={() => navigate(`/ancestor-root-registry/person/${node.spouse!.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={node.x + 110}
                      cy={node.y}
                      r="28"
                      fill="rgba(27,40,56,0.7)"
                      stroke="rgba(255,149,0,0.3)"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={node.x + 110}
                      y={node.y + 3}
                      textAnchor="middle"
                      fill="#C9B99A"
                      fontSize="9"
                    >
                      {node.spouse.preferredName || node.spouse.fullName}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-[rgba(201,185,154,0.06)] bg-[#0A0F1A]/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <span className="text-[10px] text-[#C9B99A]/30 uppercase tracking-wider">Legend:</span>
          {[
            { color: '#4CAF50', label: 'Documented' },
            { color: '#FF9500', label: 'Family Testimony' },
            { color: '#2196F3', label: 'Research Lead' },
            { color: '#9E9E9E', label: 'Unknown' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="text-[10px] text-[#C9B99A]/40">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#C9B99A]/20">&#8224;</span>
            <span className="text-[10px] text-[#C9B99A]/40">Deceased</span>
          </div>
          <div className="ml-auto text-[10px] text-[#C9B99A]/20">Click a node to view profile</div>
        </div>
      </div>
    </div>
  )
}
