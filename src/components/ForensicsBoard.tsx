import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Footprints, Smartphone, Watch, Wine, Shirt, CircleDot, Wallet, ArrowRightLeft,
  Camera, Package, Ruler, Flag, User, UserX, Eye, EyeOff, Trash2, RotateCcw,
  Search, MapPin, Info, ChevronRight, Link2, Unlink
} from 'lucide-react'
import type { EvidenceItem } from '../data/forensics-evidence'

// ============================================
// FORENSICS BOARD GAME — Interactive Crime Scene
// Draggable evidence, people, and tools on a game board
// 3D hover lift effects, theory building, connection lines
// ============================================

// ---- TYPES ----
interface BoardPiece {
  id: string
  type: 'evidence' | 'person' | 'tool'
  label: string
  sublabel?: string
  icon: React.ElementType
  color: string
  bgColor: string
  x?: number // position on board (percentage 0-100)
  y?: number
  rotation?: number
  connections?: string[] // IDs of connected pieces
  description?: string
}

interface PlacedPiece extends BoardPiece {
  boardX: number
  boardY: number
  rotation: number
}

// ---- GAME PIECES DATA ----
const EVIDENCE_PIECES: BoardPiece[] = [
  { id: 'ev-footprints', type: 'evidence', label: 'Footwear', sublabel: 'Impressions', icon: Footprints, color: '#FF9500', bgColor: 'rgba(255,149,0,0.15)', description: 'Partial impression in damp sand, ~28cm, toward shoreline' },
  { id: 'ev-phone', type: 'evidence', label: 'Phone', sublabel: 'Digital', icon: Smartphone, color: '#00D4AA', bgColor: 'rgba(0,212,170,0.15)', description: 'Smartphone, cracked screen, last call 11:47 PM' },
  { id: 'ev-watch', type: 'evidence', label: 'Watch', sublabel: 'Timepiece', icon: Watch, color: '#FFB840', bgColor: 'rgba(255,184,64,0.15)', description: 'Analog watch, stopped at ~12:15 AM, impact damage' },
  { id: 'ev-beverage', type: 'evidence', label: 'Beverage', sublabel: 'Container', icon: Wine, color: '#E8505B', bgColor: 'rgba(232,80,91,0.15)', description: 'Empty aluminum can, malt liquor residue, lip prints' },
  { id: 'ev-fabric', type: 'evidence', label: 'Fabric', sublabel: 'Fragment', icon: Shirt, color: '#6C8CFF', bgColor: 'rgba(108,140,255,0.15)', description: 'Dark navy fabric, synthetic blend, caught on bush' },
  { id: 'ev-tire', type: 'evidence', label: 'Tire', sublabel: 'Impression', icon: CircleDot, color: '#C9B99A', bgColor: 'rgba(201,185,154,0.15)', description: 'All-season radial, ~22cm width, recent passage' },
  { id: 'ev-wallet', type: 'evidence', label: 'Wallet', sublabel: 'Personal', icon: Wallet, color: '#D4A853', bgColor: 'rgba(212,168,83,0.15)', description: 'Leather bifold, $47 cash, ID intact, no robbery' },
  { id: 'ev-drag', type: 'evidence', label: 'Drag', sublabel: 'Marks', icon: ArrowRightLeft, color: '#A855F7', bgColor: 'rgba(168,85,247,0.15)', description: 'Parallel depressions in sand, ~60cm apart, waterline to body' },
]

const PERSON_PIECES: BoardPiece[] = [
  { id: 'per-victim', type: 'person', label: 'Victim', sublabel: 'Deceased', icon: UserX, color: '#E8505B', bgColor: 'rgba(232,80,91,0.15)', description: 'Adult male, 30s, found near shoreline' },
  { id: 'per-witness-a', type: 'person', label: 'Witness A', sublabel: 'Beachgoer', icon: User, color: '#6C8CFF', bgColor: 'rgba(108,140,255,0.15)', description: 'Left around midnight, phone shows 12:22 AM departure' },
  { id: 'per-witness-b', type: 'person', label: 'Witness B', sublabel: 'Friend', icon: User, color: '#6C8CFF', bgColor: 'rgba(108,140,255,0.15)', description: 'Saw victim walk toward water at 11:45 PM' },
  { id: 'per-witness-c', type: 'person', label: 'Witness C', sublabel: 'Stranger', icon: User, color: '#6C8CFF', bgColor: 'rgba(108,140,255,0.15)', description: 'Walking dog at 12:30 AM, heard voices, saw vehicle leave' },
  { id: 'per-unknown', type: 'person', label: 'Unknown', sublabel: 'Unidentified', icon: User, color: '#C9B99A', bgColor: 'rgba(201,185,154,0.15)', description: 'Possible unidentified person at scene' },
]

const TOOL_PIECES: BoardPiece[] = [
  { id: 'tool-camera', type: 'tool', label: 'Camera', sublabel: 'Document', icon: Camera, color: '#00D4AA', bgColor: 'rgba(0,212,170,0.15)', description: 'Photograph evidence before disturbing' },
  { id: 'tool-bag', type: 'tool', label: 'Evidence Bag', sublabel: 'Collect', icon: Package, color: '#FF9500', bgColor: 'rgba(255,149,0,0.15)', description: 'Secure packaging for transport' },
  { id: 'tool-tape', type: 'tool', label: 'Measure', sublabel: 'Scale', icon: Ruler, color: '#FFB840', bgColor: 'rgba(255,184,64,0.15)', description: 'Document distances and sizes' },
  { id: 'tool-flag', type: 'tool', label: 'Marker', sublabel: 'Flag', icon: Flag, color: '#E8505B', bgColor: 'rgba(232,80,91,0.15)', description: 'Mark evidence locations on scene' },
]

// Drop zones on the board (percentage positions)
const DROP_ZONES = [
  { id: 'zone-water', label: 'Waterline', x: 30, y: 60, w: 40, h: 15, color: 'rgba(0,212,170,0.08)' },
  { id: 'zone-sand-wet', label: 'Wet Sand', x: 25, y: 50, w: 50, h: 15, color: 'rgba(255,149,0,0.06)' },
  { id: 'zone-sand-dry', label: 'Dry Sand', x: 20, y: 35, w: 60, h: 20, color: 'rgba(201,185,154,0.06)' },
  { id: 'zone-dock', label: 'Dock/Pier', x: 5, y: 55, w: 15, h: 25, color: 'rgba(168,85,247,0.08)' },
  { id: 'zone-bush', label: 'Brush/Dunes', x: 75, y: 40, w: 20, h: 30, color: 'rgba(0,128,0,0.06)' },
  { id: 'zone-road', label: 'Access Road', x: 5, y: 75, w: 90, h: 15, color: 'rgba(201,185,154,0.08)' },
]

// ============================================
// MAIN COMPONENT
// ============================================
export default function ForensicsBoard({ onCollectEvidence }: { onCollectEvidence: (id: string) => void }) {
  const boardRef = useRef<HTMLDivElement>(null)
  const [placedPieces, setPlacedPieces] = useState<PlacedPiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [hoveredPiece, setHoveredPiece] = useState<string | null>(null)
  const [activeTray, setActiveTray] = useState<'evidence' | 'people' | 'tools'>('evidence')
  const [showZones, setShowZones] = useState(true)
  const [connectMode, setConnectMode] = useState(false)
  const [connectSource, setConnectSource] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(true)

  // Get all available pieces (not yet placed)
  const allPieces = [...EVIDENCE_PIECES, ...PERSON_PIECES, ...TOOL_PIECES]
  const placedIds = placedPieces.map(p => p.id)
  const availableEvidence = EVIDENCE_PIECES.filter(p => !placedIds.includes(p.id))
  const availablePeople = PERSON_PIECES.filter(p => !placedIds.includes(p.id))
  const availableTools = TOOL_PIECES.filter(p => !placedIds.includes(p.id))

  // Place a piece on the board
  const placePiece = useCallback((piece: BoardPiece, boardX: number, boardY: number) => {
    const placed: PlacedPiece = {
      ...piece,
      boardX: Math.max(2, Math.min(98, boardX)),
      boardY: Math.max(2, Math.min(98, boardY)),
      rotation: 0,
      connections: [],
    }
    setPlacedPieces(prev => [...prev, placed])
    // Also mark as collected in parent
    if (piece.type === 'evidence' && piece.id.startsWith('ev-')) {
      onCollectEvidence(piece.id.replace('ev-', ''))
    }
  }, [onCollectEvidence])

  // Move a placed piece
  const movePiece = useCallback((id: string, boardX: number, boardY: number) => {
    setPlacedPieces(prev => prev.map(p =>
      p.id === id ? { ...p, boardX: Math.max(2, Math.min(98, boardX)), boardY: Math.max(2, Math.min(98, boardY)) } : p
    ))
  }, [])

  // Remove a piece from the board
  const removePiece = useCallback((id: string) => {
    setPlacedPieces(prev => prev.filter(p => p.id !== id))
    setSelectedPiece(null)
  }, [])

  // Rotate a piece
  const rotatePiece = useCallback((id: string) => {
    setPlacedPieces(prev => prev.map(p =>
      p.id === id ? { ...p, rotation: (p.rotation + 15) % 360 } : p
    ))
  }, [])

  // Toggle connection between two pieces
  const toggleConnection = useCallback((fromId: string, toId: string) => {
    setPlacedPieces(prev => prev.map(p => {
      if (p.id === fromId) {
        const conns = p.connections || []
        return { ...p, connections: conns.includes(toId) ? conns.filter(c => c !== toId) : [...conns, toId] }
      }
      return p
    }))
  }, [])

  // Handle tray item click → place in center of board
  const handleTrayClick = (piece: BoardPiece) => {
    const randomX = 30 + Math.random() * 40
    const randomY = 30 + Math.random() * 40
    placePiece(piece, randomX, randomY)
  }

  // Handle piece click in connect mode
  const handlePieceClick = (pieceId: string) => {
    if (connectMode) {
      if (!connectSource) {
        setConnectSource(pieceId)
      } else if (connectSource === pieceId) {
        setConnectSource(null)
      } else {
        toggleConnection(connectSource, pieceId)
        setConnectSource(null)
      }
    } else {
      setSelectedPiece(selectedPiece === pieceId ? null : pieceId)
    }
  }

  // Get selected piece data
  const selectedData = placedPieces.find(p => p.id === selectedPiece)

  return (
    <div className="flex flex-col h-full">
      {/* Help tooltip */}
      <AnimatePresence>
        {showHelp && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-lg p-3 mx-4 mt-3 flex items-start gap-3">
            <Info size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[11px] text-[#C9B99A]/70">
                <strong className="text-[#F0EBE1]">How to play:</strong> Click pieces from the tray below to place them on the board.
                Drag placed pieces to reposition. Click a piece to select it. Use the toolbar to rotate, connect, or remove.
                Build your theory by placing evidence and people where you think they belong.
              </p>
            </div>
            <button onClick={() => setShowHelp(false)} className="text-[#C9B99A]/40 hover:text-[#FF9500]">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(255,149,0,0.08)]">
        <button onClick={() => setShowZones(!showZones)}
          className={`text-[10px] px-3 py-1.5 rounded-full border transition-colors ${showZones ? 'bg-[rgba(255,149,0,0.1)] border-[rgba(255,149,0,0.2)] text-[#FF9500]' : 'border-[rgba(255,149,0,0.1)] text-[#C9B99A]/50 hover:text-[#C9B99A]'}`}>
          <MapPin size={10} className="inline mr-1" />{showZones ? 'Hide' : 'Show'} Zones
        </button>
        <button onClick={() => { setConnectMode(!connectMode); setConnectSource(null); }}
          className={`text-[10px] px-3 py-1.5 rounded-full border transition-colors ${connectMode ? 'bg-[rgba(255,149,0,0.1)] border-[rgba(255,149,0,0.2)] text-[#FF9500]' : 'border-[rgba(255,149,0,0.1)] text-[#C9B99A]/50 hover:text-[#C9B99A]'}`}>
          <Link2 size={10} className="inline mr-1" />{connectMode ? 'Cancel' : 'Connect'} Mode
        </button>
        {selectedPiece && (
          <>
            <button onClick={() => rotatePiece(selectedPiece)}
              className="text-[10px] px-3 py-1.5 rounded-full border border-[rgba(255,149,0,0.1)] text-[#C9B99A]/50 hover:text-[#FF9500] transition-colors">
              <RotateCcw size={10} className="inline mr-1" />Rotate
            </button>
            <button onClick={() => removePiece(selectedPiece)}
              className="text-[10px] px-3 py-1.5 rounded-full border border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-colors">
              <Trash2 size={10} className="inline mr-1" />Remove
            </button>
          </>
        )}
        {connectMode && connectSource && (
          <span className="text-[10px] text-[#FF9500]">Click another piece to connect</span>
        )}
        <span className="ml-auto text-[10px] text-[#C9B99A]/40">{placedPieces.length} items on board</span>
      </div>

      {/* Main area: Board + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Game Board */}
        <div className="flex-1 relative overflow-hidden" ref={boardRef}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/images/forensics-beach-scene.jpg" alt="Beach Crime Scene" className="w-full h-full object-cover" />
          </div>

          {/* Drop Zones */}
          {showZones && DROP_ZONES.map(zone => (
            <div key={zone.id}
              className="absolute border border-dashed border-[rgba(255,149,0,0.15)] rounded flex items-start justify-start p-1.5 pointer-events-none"
              style={{
                left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%`,
                backgroundColor: zone.color,
              }}>
              <span className="text-[8px] text-[#C9B99A]/30 uppercase tracking-wider">{zone.label}</span>
            </div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            {placedPieces.map(from =>
              (from.connections || []).map(toId => {
                const to = placedPieces.find(p => p.id === toId)
                if (!to) return null
                return (
                  <line key={`${from.id}-${toId}`}
                    x1={`${from.boardX}%`} y1={`${from.boardY}%`}
                    x2={`${to.boardX}%`} y2={`${to.boardY}%`}
                    stroke="#FF9500" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"
                  />
                )
              })
            )}
          </svg>

          {/* Placed Pieces */}
          {placedPieces.map(piece => {
            const isSelected = selectedPiece === piece.id
            const isHovered = hoveredPiece === piece.id
            const isConnectTarget = connectMode && connectSource === piece.id
            const Icon = piece.icon

            return (
              <motion.div
                key={piece.id}
                drag
                dragMomentum={false}
                dragConstraints={boardRef}
                onDragEnd={(_, info) => {
                  if (!boardRef.current) return
                  const rect = boardRef.current.getBoundingClientRect()
                  const newX = ((piece.boardX / 100) * rect.width + info.offset.x) / rect.width * 100
                  const newY = ((piece.boardY / 100) * rect.height + info.offset.y) / rect.height * 100
                  movePiece(piece.id, newX, newY)
                }}
                onClick={() => handlePieceClick(piece.id)}
                onMouseEnter={() => setHoveredPiece(piece.id)}
                onMouseLeave={() => setHoveredPiece(null)}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: isHovered || isSelected ? 1.15 : 1,
                  rotate: piece.rotation,
                  x: 0, y: 0,
                }}
                whileDrag={{ scale: 1.2, zIndex: 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: `${piece.boardX}%`,
                  top: `${piece.boardY}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered || isSelected ? 50 : 10,
                }}
              >
                {/* 3D Shadow */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                  isHovered || isSelected
                    ? 'shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(255,149,0,0.3)]'
                    : 'shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
                }`} />

                {/* Piece Body */}
                <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                  isSelected
                    ? 'border-[#FF9500] bg-[rgba(12,21,32,0.95)]'
                    : isConnectTarget
                      ? 'border-[#FF9500] bg-[rgba(255,149,0,0.2)] animate-pulse'
                      : 'border-[rgba(255,255,255,0.1)] bg-[rgba(12,21,32,0.85)]'
                } ${isHovered ? 'brightness-125' : ''}`}
                  style={{
                    boxShadow: isHovered
                      ? `0 0 20px ${piece.color}40, 0 8px 24px rgba(0,0,0,0.5)`
                      : `0 4px 12px rgba(0,0,0,0.4)`,
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  }}
                >
                  <Icon size={20} style={{ color: piece.color }} />
                  <span className="text-[7px] md:text-[8px] text-[#C9B99A] text-center leading-tight px-1">{piece.label}</span>
                  {piece.connections && piece.connections.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF9500] flex items-center justify-center">
                      <span className="text-[8px] text-[#0C1520] font-bold">{piece.connections.length}</span>
                    </div>
                  )}
                </div>

                {/* Hover tooltip */}
                {isHovered && piece.description && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0C1520] border border-[rgba(255,149,0,0.2)] rounded-lg p-2 shadow-xl pointer-events-none"
                    style={{ zIndex: 100 }}>
                    <p className="text-[9px] text-[#FF9500] font-medium mb-0.5">{piece.label}{piece.sublabel ? ` — ${piece.sublabel}` : ''}</p>
                    <p className="text-[9px] text-[#C9B99A]/70">{piece.description}</p>
                  </div>
                )}
              </motion.div>
            )
          })}

          {/* Board label */}
          <div className="absolute bottom-3 left-3 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm rounded px-2 py-1">
            <span className="text-[9px] text-[#C9B99A]/40 uppercase tracking-wider">Beach Crime Scene — Interactive Board</span>
          </div>
        </div>

        {/* Selected Piece Detail Sidebar */}
        <AnimatePresence>
          {selectedData && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="shrink-0 bg-[rgba(12,21,32,0.95)] border-l border-[rgba(255,149,0,0.1)] overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <selectedData.icon size={20} style={{ color: selectedData.color }} />
                  <div>
                    <p className="text-sm text-[#F0EBE1] font-medium">{selectedData.label}</p>
                    <p className="text-[10px] text-[#C9B99A]/50">{selectedData.sublabel}</p>
                  </div>
                </div>
                <p className="text-[11px] text-[#C9B99A]/70 mb-4">{selectedData.description}</p>

                {/* Position info */}
                <div className="bg-[rgba(27,40,56,0.6)] rounded-lg p-3 mb-3">
                  <p className="text-[9px] text-[#C9B99A]/40 uppercase tracking-wider mb-1">Position</p>
                  <p className="text-[11px] text-[#F0EBE1]">X: {selectedData.boardX.toFixed(1)}% | Y: {selectedData.boardY.toFixed(1)}%</p>
                  <p className="text-[11px] text-[#F0EBE1]">Rotation: {selectedData.rotation}°</p>
                </div>

                {/* Connections */}
                {selectedData.connections && selectedData.connections.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[9px] text-[#C9B99A]/40 uppercase tracking-wider mb-1">Connected To</p>
                    {selectedData.connections.map(connId => {
                      const conn = placedPieces.find(p => p.id === connId)
                      if (!conn) return null
                      return (
                        <button key={connId} onClick={() => toggleConnection(selectedData.id, connId)}
                          className="flex items-center gap-2 text-[10px] text-[#FF9500] hover:text-red-400 transition-colors mb-1">
                          <Link2 size={10} /> {conn.label} <Unlink size={10} className="ml-auto" />
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <button onClick={() => rotatePiece(selectedData.id)}
                    className="w-full flex items-center justify-center gap-1.5 text-[10px] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#FF9500] rounded-lg py-2 hover:bg-[rgba(255,149,0,0.2)] transition-colors">
                    <RotateCcw size={12} /> Rotate 15°
                  </button>
                  <button onClick={() => { setConnectMode(true); setConnectSource(selectedData.id); }}
                    className="w-full flex items-center justify-center gap-1.5 text-[10px] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#FF9500] rounded-lg py-2 hover:bg-[rgba(255,149,0,0.2)] transition-colors">
                    <Link2 size={12} /> Connect to...
                  </button>
                  <button onClick={() => removePiece(selectedData.id)}
                    className="w-full flex items-center justify-center gap-1.5 text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg py-2 hover:bg-red-500/20 transition-colors">
                    <Trash2 size={12} /> Remove from Board
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tray */}
      <div className="shrink-0 bg-[rgba(12,21,32,0.95)] border-t border-[rgba(255,149,0,0.1)]">
        {/* Tray Tabs */}
        <div className="flex items-center gap-1 px-4 pt-2">
          {[
            { key: 'evidence' as const, label: 'Evidence', count: availableEvidence.length, color: '#FF9500' },
            { key: 'people' as const, label: 'People', count: availablePeople.length, color: '#6C8CFF' },
            { key: 'tools' as const, label: 'Tools', count: availableTools.length, color: '#00D4AA' },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => setActiveTray(tab.key)}
              className={`text-[10px] px-3 py-1.5 rounded-t-lg border-b-2 transition-colors ${
                activeTray === tab.key
                  ? `border-[${tab.color}] text-[#F0EBE1]`
                  : 'border-transparent text-[#C9B99A]/40 hover:text-[#C9B99A]'
              }`}
              style={activeTray === tab.key ? { borderBottomColor: tab.color } : {}}>
              {tab.label} ({tab.count})
            </button>
          ))}
          <span className="ml-auto text-[9px] text-[#C9B99A]/30">Click to place on board</span>
        </div>

        {/* Tray Items */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          <AnimatePresence mode="popLayout">
            {(activeTray === 'evidence' ? availableEvidence :
              activeTray === 'people' ? availablePeople :
              availableTools).map(piece => {
              const Icon = piece.icon
              return (
                <motion.button
                  key={piece.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTrayClick(piece)}
                  className="shrink-0 w-16 h-16 md:w-18 md:h-18 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all hover:shadow-lg"
                  style={{
                    borderColor: `${piece.color}30`,
                    backgroundColor: piece.bgColor,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
                  }}
                  title={piece.description}
                >
                  <Icon size={18} style={{ color: piece.color }} />
                  <span className="text-[7px] text-[#C9B99A] text-center leading-tight px-0.5">{piece.label}</span>
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Empty state */}
          {((activeTray === 'evidence' && availableEvidence.length === 0) ||
            (activeTray === 'people' && availablePeople.length === 0) ||
            (activeTray === 'tools' && availableTools.length === 0)) && (
            <p className="text-[10px] text-[#C9B99A]/30 py-4">All {activeTray} items placed on board</p>
          )}
        </div>
      </div>
    </div>
  )
}
