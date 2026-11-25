import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../../firebase';
import {
  collection, addDoc, doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { generateSlug } from '../../utils/slug';
import { BLOCK_DEFINITIONS, createDefaultBlock } from '../cms/blockTypes';
import BlockRenderer from '../cms/BlockRenderer';
import { savePage, getPageUrl } from '../../utils/pageStorage';
import {
  ArrowLeft, Save, Eye, Settings, Plus, Sparkles, Smartphone,
  Monitor, Tablet, Check, X, ExternalLink, Layers, Globe, Shield,
  RefreshCw, LayoutTemplate, Search, Trash2, Copy, MoveUp, MoveDown,
  ChevronDown, ChevronUp, Undo, Redo, ZoomIn, ZoomOut, CheckCircle,
  HelpCircle, MessageSquare, Rocket, Code, Play, Phone, Building2,
  FileText, ArrowRight, Minus, EyeOff, Sliders
} from 'lucide-react';

const PageBuilder = ({ existingPage = null, onClose = null }) => {
  const [loading, setLoading] = useState(false);
  const [leftTab, setLeftTab] = useState('blocks'); // 'blocks' | 'outline'
  const [rightTab, setRightTab] = useState('element'); // 'element' | 'page'
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceViewport, setDeviceViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [zoomLevel, setZoomLevel] = useState(100); // 75, 100, 125
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [previewOnly, setPreviewOnly] = useState(false);
  const [motionActive, setMotionActive] = useState(true);

  // Undo / Redo history
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Page level metadata state
  const [pageData, setPageData] = useState({
    title: existingPage?.title || 'New Real Estate Advisory Service',
    slug: existingPage?.slug || 'new-advisory-service',
    urlPrefix: existingPage?.urlPrefix !== undefined ? existingPage.urlPrefix : 'services/',
    status: existingPage?.status || 'published', // 'published' | 'draft'
    category: existingPage?.category || 'Services',
    includeInNav: existingPage?.includeInNav !== undefined ? existingPage.includeInNav : true,
    seoTitle: existingPage?.seoTitle || '',
    seoDescription: existingPage?.seoDescription || '',
    seoKeywords: existingPage?.seoKeywords ? (Array.isArray(existingPage.seoKeywords) ? existingPage.seoKeywords.join(', ') : existingPage.seoKeywords) : '',
    ogImage: existingPage?.ogImage || '',
    blocks: existingPage?.blocks || []
  });

  // Initialize canvas with default blocks if empty
  useEffect(() => {
    if (!existingPage && (!pageData.blocks || pageData.blocks.length === 0)) {
      const defaultBlocks = [
        createDefaultBlock('hero'),
        createDefaultBlock('featureGrid'),
        createDefaultBlock('stats'),
        createDefaultBlock('cta')
      ];
      setPageData(prev => ({ ...prev, blocks: defaultBlocks }));
      setSelectedBlockId(defaultBlocks[0].id);
    } else if (pageData.blocks && pageData.blocks.length > 0 && !selectedBlockId) {
      setSelectedBlockId(pageData.blocks[0].id);
    }
  }, [existingPage]);

  // Push to history
  const pushHistory = (newBlocks) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newBlocks];
    });
    setHistoryIndex(prev => prev + 1);
  };

  const scrollToBlock = (blockId) => {
    setTimeout(() => {
      const el = document.getElementById(`block-wrapper-${blockId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevBlocks = history[historyIndex - 1];
      setPageData(prev => ({ ...prev, blocks: prevBlocks }));
      setHistoryIndex(prev => prev - 1);
      toast.success('Undo action applied');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextBlocks = history[historyIndex + 1];
      setPageData(prev => ({ ...prev, blocks: nextBlocks }));
      setHistoryIndex(prev => prev + 1);
      toast.success('Redo action applied');
    }
  };

  // Block management
  const handleSelectBlock = (block) => {
    setSelectedBlockId(block.id);
    setRightTab('element');
  };

  const handleAddBlock = (type, insertIndex = null) => {
    const newBlock = createDefaultBlock(type);
    setPageData(prev => {
      const list = [...prev.blocks];
      if (insertIndex !== null) {
        list.splice(insertIndex + 1, 0, newBlock);
      } else {
        list.push(newBlock);
      }
      pushHistory(list);
      return { ...prev, blocks: list };
    });
    setSelectedBlockId(newBlock.id);
    setRightTab('element');
    scrollToBlock(newBlock.id);
    toast.success(`Added ${newBlock.name}`);
  };

  const handleUpdateBlockData = (blockId, field, value) => {
    setPageData(prev => {
      const updated = prev.blocks.map(b => {
        if (b.id === blockId) {
          return {
            ...b,
            data: {
              ...b.data,
              [field]: value
            }
          };
        }
        return b;
      });
      return { ...prev, blocks: updated };
    });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setPageData(prev => {
      const list = [...prev.blocks];
      const temp = list[index - 1];
      list[index - 1] = list[index];
      list[index] = temp;
      pushHistory(list);
      return { ...prev, blocks: list };
    });
  };

  const handleMoveDown = (index) => {
    if (index === pageData.blocks.length - 1) return;
    setPageData(prev => {
      const list = [...prev.blocks];
      const temp = list[index + 1];
      list[index + 1] = list[index];
      list[index] = temp;
      pushHistory(list);
      return { ...prev, blocks: list };
    });
  };

  const handleDuplicate = (index) => {
    setPageData(prev => {
      const target = prev.blocks[index];
      const clone = {
        ...JSON.parse(JSON.stringify(target)),
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        name: `${target.name} (Copy)`
      };
      const list = [...prev.blocks];
      list.splice(index + 1, 0, clone);
      pushHistory(list);
      return { ...prev, blocks: list };
    });
    toast.success('Section duplicated');
  };

  const handleDeleteBlock = (index) => {
    if (window.confirm('Delete this section from the canvas?')) {
      setPageData(prev => {
        const list = prev.blocks.filter((_, i) => i !== index);
        pushHistory(list);
        return { ...prev, blocks: list };
      });
      setSelectedBlockId(null);
      toast.success('Section deleted');
    }
  };

  // Save / Publish
  const handleSave = async (targetStatus = null) => {
    const finalStatus = targetStatus || pageData.status;

    if (!pageData.title.trim()) {
      toast.error('Please enter a Page Title.');
      return;
    }
    const cleanSlug = generateSlug(pageData.slug || pageData.title);
    if (!cleanSlug) {
      toast.error('Please specify a valid URL slug.');
      return;
    }

    setLoading(true);
    try {
      const keywordsArray = pageData.seoKeywords
        ? (Array.isArray(pageData.seoKeywords) ? pageData.seoKeywords : pageData.seoKeywords.split(',').map(k => k.trim()).filter(Boolean))
        : [];

      const payload = {
        title: pageData.title.trim(),
        slug: cleanSlug,
        status: finalStatus,
        category: pageData.category || 'Services',
        includeInNav: Boolean(pageData.includeInNav),
        seoTitle: pageData.seoTitle.trim() || pageData.title.trim(),
        seoDescription: pageData.seoDescription.trim(),
        seoKeywords: keywordsArray,
        ogImage: pageData.ogImage.trim(),
        blocks: pageData.blocks || []
      };

      const result = await savePage(payload, existingPage?.id);
      if (result.isCloudSynced) {
        toast.success(`Page published & cloud synced (${finalStatus})!`);
      } else {
        toast.success(`Page saved & published!`);
      }

      if (onClose) onClose();
    } catch (err) {
      console.error('Error saving CMS page:', err);
      toast.error(`Save failed: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Filtered blocks for left sidebar
  const filteredBlocks = BLOCK_DEFINITIONS.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedBlock = pageData.blocks.find(b => b.id === selectedBlockId);
  const selectedIndex = pageData.blocks.findIndex(b => b.id === selectedBlockId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white font-sans flex flex-col overflow-hidden select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TOP STUDIO TOOLBAR (Matching Image 3) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header className="h-16 bg-white dark:bg-bloom-dark border-b border-slate-200 dark:border-white/10 px-4 flex items-center justify-between text-slate-800 dark:text-white shrink-0 z-20 shadow-sm">
        {/* Left: Back & Page Title / Slug */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Pages</span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                pageData.status === 'published'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              }`}>
                {pageData.status}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px] sm:max-w-xs">
                {pageData.title}
              </span>
            </div>
            <div className="text-[11px] text-bloom-primary font-mono font-medium flex items-center gap-1.5">
              <span>{getPageUrl(pageData)}</span>
              <a
                href={getPageUrl(pageData)}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-bloom-primary transition-colors"
                title="Open live URL in new tab"
              >
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* Center: Viewport & Canvas Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Responsive device buttons */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setDeviceViewport('mobile')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceViewport === 'mobile'
                  ? 'bg-white dark:bg-white/20 text-bloom-primary dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-gray-400'
              }`}
            >
              <Smartphone size={13} />
              <span>Phone</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceViewport('tablet')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceViewport === 'tablet'
                  ? 'bg-white dark:bg-white/20 text-bloom-primary dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-gray-400'
              }`}
            >
              <Tablet size={13} />
              <span>Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceViewport('desktop')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                deviceViewport === 'desktop'
                  ? 'bg-white dark:bg-white/20 text-bloom-primary dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-gray-400'
              }`}
            >
              <Monitor size={13} />
              <span>Desktop</span>
            </button>
          </div>

          {/* Motion Status */}
          <button
            type="button"
            onClick={() => setMotionActive(!motionActive)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
              motionActive
                ? 'bg-bloom-primary/10 text-bloom-primary border-bloom-primary/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
            }`}
          >
            <Sparkles size={13} />
            <span>{motionActive ? 'Motion Active' : 'Motion Paused'}</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="hidden sm:flex items-center gap-1 mr-1">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              title="Undo"
            >
              <Undo size={15} />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              title="Redo"
            >
              <Redo size={15} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={loading}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-gray-200 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl transition-all"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-gray-200 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl transition-all flex items-center gap-1.5"
            title="SEO & Navigation Settings"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewOnly(!previewOnly)}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
              previewOnly
                ? 'bg-bloom-primary text-white border-bloom-primary'
                : 'text-slate-700 dark:text-gray-200 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            <Eye size={14} />
            <span className="hidden sm:inline">{previewOnly ? 'Exit Preview' : 'Preview'}</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave('published')}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-bloom-primary to-bloom-blue hover:shadow-lg hover:shadow-bloom-primary/25 rounded-xl transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Save size={15} />
            <span>{loading ? 'Publishing...' : 'Publish Page'}</span>
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3-COLUMN STUDIO LAYOUT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 flex overflow-hidden relative">
        {/* ── LEFT SIDEBAR: BLOCKS LIBRARY & OUTLINE ─────────────────────── */}
        {!previewOnly && (
          <aside className="w-72 sm:w-80 bg-white dark:bg-bloom-dark border-r border-slate-200 dark:border-white/10 flex flex-col shrink-0 z-10 text-slate-800 dark:text-white">
            {/* Sidebar Tabs */}
            <div className="p-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLeftTab('blocks')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  leftTab === 'blocks'
                    ? 'bg-bloom-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Layers size={14} />
                <span>Blocks</span>
              </button>
              <button
                type="button"
                onClick={() => setLeftTab('outline')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  leftTab === 'outline'
                    ? 'bg-bloom-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Sliders size={14} />
                <span>Outline ({pageData.blocks.length})</span>
              </button>
            </div>

            {/* TAB: BLOCKS */}
            {leftTab === 'blocks' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search Input */}
                <div className="p-3 border-b border-slate-200 dark:border-white/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search blocks (e.g. Button, Text...)"
                      className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-bloom-primary"
                    />
                  </div>
                </div>

                {/* Blocks List Grouped by Category */}
                <div className="flex-1 overflow-y-auto p-3 space-y-5">
                  {['BASICS', 'SECTIONS', 'ADVANCED'].map((category) => {
                    const catBlocks = filteredBlocks.filter(b => b.category === category);
                    if (catBlocks.length === 0) return null;
                    return (
                      <div key={category}>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 px-2 mb-2">
                          {category}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {catBlocks.map((b) => (
                            <div
                              key={b.type}
                              onClick={() => handleAddBlock(b.type, selectedIndex !== -1 ? selectedIndex : null)}
                              className="p-3 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-bloom-primary/50 rounded-xl cursor-pointer transition-all duration-200 group flex flex-col justify-between"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-bloom-primary transition-colors truncate">
                                  {b.name}
                                </span>
                                <Plus size={13} className="text-slate-400 group-hover:text-bloom-primary shrink-0" />
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-gray-400 line-clamp-1">
                                {b.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* TAB: OUTLINE */
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <p className="text-[11px] text-slate-400 px-1 mb-2">
                  Page Section Structure: Drag or re-order sections.
                </p>
                {pageData.blocks.map((b, idx) => {
                  const isSelected = b.id === selectedBlockId;
                  return (
                    <div
                      key={b.id || idx}
                      onClick={() => {
                        handleSelectBlock(b);
                        scrollToBlock(b.id);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-bloom-primary/10 border-bloom-primary text-bloom-primary dark:text-white'
                          : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">#{idx + 1}</span>
                        <span className="text-xs font-bold truncate">{b.name || b.type}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleMoveUp(idx); }}
                          disabled={idx === 0}
                          className="p-1 hover:text-bloom-primary disabled:opacity-20"
                        >
                          <MoveUp size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleMoveDown(idx); }}
                          disabled={idx === pageData.blocks.length - 1}
                          className="p-1 hover:text-bloom-primary disabled:opacity-20"
                        >
                          <MoveDown size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDeleteBlock(idx); }}
                          className="p-1 text-rose-500 hover:text-rose-600"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </aside>
        )}

        {/* ── CENTER: INTERACTIVE LIVE CANVAS ─────────────────────────────── */}
        <main className="flex-1 min-h-0 h-full bg-slate-100 dark:bg-black/60 overflow-y-auto overflow-x-hidden flex flex-col items-center p-4 sm:p-8 pb-48 relative custom-studio-scrollbar">
          {/* Canvas Top Status Bar */}
          <div className="mb-4 flex items-center justify-between w-full max-w-5xl px-2 text-xs text-slate-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-gray-300">{pageData.title}</span>
              <span>•</span>
              <span className="font-mono text-bloom-primary font-bold">{pageData.blocks.length} Sections</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span>Zoom: {zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
                className="p-1 hover:text-slate-800 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut size={13} />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="p-1 hover:text-slate-800 dark:hover:text-white text-[10px]"
                title="Reset Zoom"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(125, prev + 15))}
                className="p-1 hover:text-slate-800 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          </div>

          {/* Canvas Container with Device Dimensions */}
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className={`transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-bloom-dark border border-slate-300 dark:border-white/10 ${
              deviceViewport === 'mobile'
                ? 'w-[375px] min-h-[667px]'
                : deviceViewport === 'tablet'
                  ? 'w-[768px] min-h-[900px]'
                  : 'w-full max-w-5xl'
            }`}
          >
            {pageData.blocks && pageData.blocks.length > 0 ? (
              <>
                {pageData.blocks.map((block, idx) => {
                  const isSelected = block.id === selectedBlockId;
                  return (
                    <div
                      key={block.id || idx}
                      id={`block-wrapper-${block.id}`}
                      className={`relative group/section transition-all duration-200 ${
                        isSelected
                          ? 'ring-2 ring-bloom-primary ring-inset shadow-inner'
                          : 'hover:ring-1 hover:ring-bloom-primary/40'
                      }`}
                      onClick={() => handleSelectBlock(block)}
                    >
                      {/* Floating Action Bar */}
                      <div className="absolute top-3 right-3 z-30 opacity-90 group-hover/section:opacity-100 transition-opacity bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 text-xs border border-white/10">
                        <span className="font-bold text-[10px] text-bloom-primary mr-1.5">
                          {block.name || block.type}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleMoveUp(idx); }}
                          disabled={idx === 0}
                          className="p-1 hover:text-bloom-primary disabled:opacity-30 rounded hover:bg-white/10"
                          title="Move Up"
                        >
                          <MoveUp size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleMoveDown(idx); }}
                          disabled={idx === pageData.blocks.length - 1}
                          className="p-1 hover:text-bloom-primary disabled:opacity-30 rounded hover:bg-white/10"
                          title="Move Down"
                        >
                          <MoveDown size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDuplicate(idx); }}
                          className="p-1 hover:text-bloom-primary rounded hover:bg-white/10"
                          title="Duplicate Section"
                        >
                          <Copy size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDeleteBlock(idx); }}
                          className="p-1 text-rose-400 hover:text-rose-300 rounded hover:bg-white/10"
                          title="Delete Section"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Section Component Render */}
                      <BlockRenderer block={block} isSelected={isSelected} />

                      {/* In-Between Insert Divider */}
                      <div className="relative group/insert py-2 flex items-center justify-center my-0.5 z-20">
                        <div className="absolute inset-x-6 h-px bg-slate-200 dark:bg-white/10 group-hover/insert:bg-bloom-primary/40 transition-colors"></div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddBlock('featureGrid', idx);
                          }}
                          className="relative z-10 px-3 py-1 bg-white dark:bg-bloom-dark text-slate-600 dark:text-gray-300 hover:text-white hover:bg-bloom-primary border border-slate-200 dark:border-white/15 rounded-full text-[10px] font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all flex items-center gap-1 opacity-70 group-hover/insert:opacity-100"
                          title="Insert Section Below"
                        >
                          <Plus size={11} />
                          <span>Insert Below</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Prominent Bottom Add Section Banner */}
                <div className="p-8 border-t-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center mb-2.5 shadow-sm">
                    <Plus size={22} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Add Next Section
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mb-4 max-w-sm">
                    Select a section below to add it at the bottom of your landing page:
                  </p>

                  {/* Quick One-Click Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
                    {[
                      { type: 'featureGrid', label: '+ Cards Grid' },
                      { type: 'text', label: '+ Text Paragraph' },
                      { type: 'heading', label: '+ Heading' },
                      { type: 'faq', label: '+ FAQ Accordion' },
                      { type: 'processSteps', label: '+ Process Steps' },
                      { type: 'contactForm', label: '+ Contact Form' },
                      { type: 'stats', label: '+ Stats Grid' },
                      { type: 'cta', label: '+ Call To Action' },
                      { type: 'image', label: '+ Image Showcase' },
                      { type: 'bulletList', label: '+ Checklist' },
                      { type: 'video', label: '+ Video Player' },
                      { type: 'testimonial', label: '+ Testimonial' },
                      { type: 'calendly', label: '+ Calendly' },
                      { type: 'divider', label: '+ Thin Line' }
                    ].map(item => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => handleAddBlock(item.type)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-bloom-primary hover:text-bloom-primary transition-all shadow-sm hover:scale-105 active:scale-95"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Empty Canvas Drop Target */
              <div className="p-16 text-center border-2 border-dashed border-slate-300 dark:border-white/10 m-6 rounded-2xl">
                <Layers size={36} className="mx-auto text-slate-400 mb-3" />
                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">Canvas is empty</h4>
                <p className="text-xs text-slate-500 mb-4">Click any block from the left panel to insert it here.</p>
                <button
                  type="button"
                  onClick={() => handleAddBlock('hero')}
                  className="px-5 py-2.5 bg-bloom-primary text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Insert Hero Header
                </button>
              </div>
            )}
          </div>
        </main>

        {/* ── RIGHT SIDEBAR: INSPECTOR & PROPERTIES PANEL (Matching Image 3) ── */}
        {!previewOnly && (
          <aside className="w-80 sm:w-96 bg-white dark:bg-bloom-dark border-l border-slate-200 dark:border-white/10 flex flex-col shrink-0 z-10 text-slate-800 dark:text-white">
            {/* Inspector Tabs */}
            <div className="p-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRightTab('element')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  rightTab === 'element'
                    ? 'bg-bloom-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Sliders size={14} />
                <span>Element</span>
              </button>
              <button
                type="button"
                onClick={() => setRightTab('page')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  rightTab === 'page'
                    ? 'bg-bloom-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <FileText size={14} />
                <span>Page</span>
              </button>
            </div>

            {/* TAB: ELEMENT INSPECTOR */}
            {rightTab === 'element' ? (
              selectedBlock ? (
                <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
                  {/* Selected Block Info Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-bloom-primary">
                        {selectedBlock.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedBlock.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicate(selectedIndex)}
                        className="p-1.5 hover:text-bloom-primary rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
                        title="Duplicate"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlock(selectedIndex)}
                        className="p-1.5 text-rose-500 hover:text-rose-600 rounded-lg hover:bg-rose-500/10"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Form Controls for this block */}
                  {/* Paragraph Content (for text block) */}
                  {selectedBlock.data.content !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">
                        Paragraph Text Content
                      </label>
                      <textarea
                        rows={6}
                        value={selectedBlock.data.content || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'content', e.target.value)}
                        placeholder="Type paragraph text here..."
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-gray-200 focus:outline-none focus:border-bloom-primary text-xs leading-relaxed"
                      />
                    </div>
                  )}

                  {/* Headline / Button Text (for heading, button, etc.) */}
                  {selectedBlock.data.text !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">
                        {selectedBlock.type === 'button' ? 'Button Label Text' : 'Headline Text'}
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.data.text || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'text', e.target.value)}
                        placeholder="Enter text..."
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-bloom-primary"
                      />
                    </div>
                  )}

                  {/* Heading Level (h1, h2, h3, h4) */}
                  {selectedBlock.data.level !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Heading Size Level</label>
                      <select
                        value={selectedBlock.data.level || 'h2'}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'level', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                      >
                        <option value="h1">H1 — Main Banner Title</option>
                        <option value="h2">H2 — Section Header</option>
                        <option value="h3">H3 — Sub-header</option>
                        <option value="h4">H4 — Small Headline</option>
                      </select>
                    </div>
                  )}

                  {/* Alignment (left | center | right) */}
                  {selectedBlock.data.alignment !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Text Alignment</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['left', 'center', 'right'].map((align) => (
                          <button
                            key={align}
                            type="button"
                            onClick={() => handleUpdateBlockData(selectedBlock.id, 'alignment', align)}
                            className={`py-1.5 rounded-lg text-xs font-bold capitalize border transition-all ${
                              (selectedBlock.data.alignment || 'left') === align
                                ? 'bg-bloom-primary text-white border-bloom-primary'
                                : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300'
                            }`}
                          >
                            {align}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size (small | normal | large) */}
                  {selectedBlock.data.size !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Font Scale</label>
                      <select
                        value={selectedBlock.data.size || 'normal'}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'size', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                      >
                        <option value="small">Small Body</option>
                        <option value="normal">Normal Body</option>
                        <option value="large">Large / Lead Intro</option>
                      </select>
                    </div>
                  )}

                  {/* Title / Headline */}
                  {selectedBlock.data.title !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Headline / Title</label>
                      <input
                        type="text"
                        value={selectedBlock.data.title || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'title', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-bloom-primary"
                      />
                    </div>
                  )}

                  {/* Subtitle / Description */}
                  {selectedBlock.data.subtitle !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Subtitle</label>
                      <textarea
                        rows={2}
                        value={selectedBlock.data.subtitle || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'subtitle', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-gray-200 focus:outline-none focus:border-bloom-primary"
                      />
                    </div>
                  )}

                  {/* Eyebrow Badge Text */}
                  {selectedBlock.data.badgeText !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Eyebrow Badge Text</label>
                      <input
                        type="text"
                        value={selectedBlock.data.badgeText || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'badgeText', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-bloom-primary"
                      />
                    </div>
                  )}

                  {/* Checklist Items Editor */}
                  {selectedBlock.data.items !== undefined && Array.isArray(selectedBlock.data.items) && (
                    <div className="space-y-2">
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Checklist Items</label>
                      {selectedBlock.data.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={typeof item === 'string' ? item : (item.title || '')}
                            onChange={(e) => {
                              const newItems = [...selectedBlock.data.items];
                              if (typeof item === 'string') {
                                newItems[iIdx] = e.target.value;
                              } else {
                                newItems[iIdx] = { ...item, title: e.target.value };
                              }
                              handleUpdateBlockData(selectedBlock.id, 'items', newItems);
                            }}
                            className="flex-1 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = selectedBlock.data.items.filter((_, idx) => idx !== iIdx);
                              handleUpdateBlockData(selectedBlock.id, 'items', newItems);
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-600 rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = [...selectedBlock.data.items, 'New item detail'];
                          handleUpdateBlockData(selectedBlock.id, 'items', newItems);
                        }}
                        className="w-full py-1.5 text-xs text-bloom-primary border border-dashed border-bloom-primary/30 rounded-lg hover:bg-bloom-primary/5 font-semibold"
                      >
                        + Add Bullet Item
                      </button>
                    </div>
                  )}

                  {/* Video / External Embed URL */}
                  {(selectedBlock.data.videoUrl !== undefined || selectedBlock.data.calendlyUrl !== undefined) && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">
                        {selectedBlock.data.videoUrl !== undefined ? 'Video URL (YouTube/Vimeo/MP4)' : 'Calendly Booking URL'}
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.data.videoUrl || selectedBlock.data.calendlyUrl || ''}
                        onChange={(e) => {
                          const key = selectedBlock.data.videoUrl !== undefined ? 'videoUrl' : 'calendlyUrl';
                          handleUpdateBlockData(selectedBlock.id, key, e.target.value);
                        }}
                        placeholder="https://..."
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-bloom-primary"
                      />
                    </div>
                  )}

                  {/* Form Submit Button Label */}
                  {selectedBlock.data.submitBtnText !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Form Submit Button</label>
                      <input
                        type="text"
                        value={selectedBlock.data.submitBtnText || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'submitBtnText', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                      />
                    </div>
                  )}

                  {/* Testimonial Author Details */}
                  {selectedBlock.data.authorName !== undefined && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Author Name</label>
                        <input
                          type="text"
                          value={selectedBlock.data.authorName || ''}
                          onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'authorName', e.target.value)}
                          className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Role & Company</label>
                        <input
                          type="text"
                          value={selectedBlock.data.authorRole || ''}
                          onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'authorRole', e.target.value)}
                          placeholder="Managing Director, Investment Partners"
                          className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  {selectedBlock.data.primaryBtnText !== undefined && (
                    <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10">
                      <span className="font-bold text-slate-700 dark:text-gray-300 block">Primary CTA Button</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={selectedBlock.data.primaryBtnText || ''}
                          onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'primaryBtnText', e.target.value)}
                          placeholder="Button Label"
                          className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5"
                        />
                        <input
                          type="text"
                          value={selectedBlock.data.primaryBtnUrl || ''}
                          onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'primaryBtnUrl', e.target.value)}
                          placeholder="URL (/contact)"
                          className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1.5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Quote author */}
                  {selectedBlock.data.quote !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Quote Text</label>
                      <textarea
                        rows={3}
                        value={selectedBlock.data.quote || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'quote', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-gray-200"
                      />
                    </div>
                  )}

                  {/* Image URL */}
                  {selectedBlock.data.imageUrl !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={selectedBlock.data.imageUrl || ''}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'imageUrl', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                      />
                    </div>
                  )}

                  {/* Columns */}
                  {selectedBlock.data.columns !== undefined && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Columns</label>
                      <select
                        value={selectedBlock.data.columns || 3}
                        onChange={(e) => handleUpdateBlockData(selectedBlock.id, 'columns', parseInt(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
                      >
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                /* No element selected empty state (matching Image 3) */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3 text-slate-400">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">No Element Selected</h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Click any section on the canvas to configure its contents, styling, and parameters.
                  </p>
                </div>
              )
            ) : (
              /* TAB: PAGE LEVEL SETTINGS (Matching Image 3) */
              <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={pageData.title}
                    onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                {/* Page Location & Prefix Selector */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">
                    Website Section / Location
                  </label>
                  <select
                    value={pageData.urlPrefix !== undefined ? pageData.urlPrefix : 'services/'}
                    onChange={(e) => setPageData({ ...pageData, urlPrefix: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="services/">💼 Services Section (/services/...)</option>
                    <option value="">🌐 Website Root (Direct /...)</option>
                    <option value="p/">📄 Pages Directory (/p/...)</option>
                    <option value="about/">🏢 Company & About (/about/...)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={pageData.slug}
                    onChange={(e) => setPageData({ ...pageData, slug: generateSlug(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-bloom-primary font-mono font-bold"
                  />
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-bloom-primary bg-bloom-primary/10 border border-bloom-primary/20 px-2 py-1 rounded-lg">
                    <Globe size={11} className="shrink-0" />
                    <span className="truncate">{getPageUrl(pageData)}</span>
                  </div>
                </div>

                {/* Include in Navigation */}
                <div className="p-3.5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      Include in Services Dropdown
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-gray-400">
                      Shows page in main Navbar automatically.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pageData.includeInNav}
                    onChange={(e) => setPageData({ ...pageData, includeInNav: e.target.checked })}
                    className="w-4 h-4 rounded accent-bloom-primary cursor-pointer"
                  />
                </div>

                {/* SEO Description */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">SEO Description</label>
                  <textarea
                    rows={3}
                    value={pageData.seoDescription}
                    onChange={(e) => setPageData({ ...pageData, seoDescription: e.target.value })}
                    placeholder="Meta description for search engines..."
                    className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-gray-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-gray-300 mb-1">SEO Keywords</label>
                  <input
                    type="text"
                    value={pageData.seoKeywords}
                    onChange={(e) => setPageData({ ...pageData, seoKeywords: e.target.value })}
                    placeholder="real estate modeling, underwriting..."
                    className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-gray-200"
                  />
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SETTINGS MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-bloom-dark border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings size={20} className="text-bloom-primary" />
                Page Settings & SEO
              </h3>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-gray-300 mb-1">Page Title</label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-gray-300 mb-1">
                  Website Section / Location
                </label>
                <select
                  value={pageData.urlPrefix !== undefined ? pageData.urlPrefix : 'services/'}
                  onChange={(e) => setPageData({ ...pageData, urlPrefix: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="services/">💼 Services Section (/services/...)</option>
                  <option value="">🌐 Website Root (Direct /...)</option>
                  <option value="p/">📄 Pages Directory (/p/...)</option>
                  <option value="about/">🏢 Company & About (/about/...)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-gray-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={pageData.slug}
                  onChange={(e) => setPageData({ ...pageData, slug: generateSlug(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 font-mono text-bloom-primary"
                />
                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-mono text-bloom-primary bg-bloom-primary/10 border border-bloom-primary/20 px-2.5 py-1.5 rounded-lg">
                  <Globe size={13} className="shrink-0" />
                  <span className="truncate">{getPageUrl(pageData)}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold block text-xs">Include in Services Dropdown</span>
                  <span className="text-[11px] text-slate-500">Adds link to main navigation.</span>
                </div>
                <input
                  type="checkbox"
                  checked={pageData.includeInNav}
                  onChange={(e) => setPageData({ ...pageData, includeInNav: e.target.checked })}
                  className="w-4 h-4 rounded accent-bloom-primary cursor-pointer"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-6 py-2.5 bg-bloom-primary text-white font-bold rounded-xl text-xs hover:bg-bloom-primary/90"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageBuilder;
