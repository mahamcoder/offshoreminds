import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../../firebase';
import {
  collection, addDoc, doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { generateSlug } from '../../utils/slug';
import { BLOCK_DEFINITIONS, createDefaultBlock } from '../cms/blockTypes';
import { PAGE_TEMPLATES } from '../cms/templates';
import BlockEditorCard from '../cms/BlockEditorCard';
import BlockRenderer from '../cms/BlockRenderer';
import {
  ArrowLeft, Save, Eye, Edit3, Settings, Plus, Sparkles,
  Smartphone, Monitor, Tablet, Check, X, ExternalLink,
  Layers, Globe, Shield, RefreshCw, LayoutTemplate
} from 'lucide-react';

const PageBuilder = ({ existingPage = null, onClose = null }) => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'preview'
  const [deviceViewport, setDeviceViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);

  // Page level metadata state
  const [pageData, setPageData] = useState({
    title: existingPage?.title || 'New Real Estate Service',
    slug: existingPage?.slug || 'new-real-estate-service',
    status: existingPage?.status || 'published', // 'published' | 'draft'
    category: existingPage?.category || 'Services',
    includeInNav: existingPage?.includeInNav || false,
    seoTitle: existingPage?.seoTitle || '',
    seoDescription: existingPage?.seoDescription || '',
    seoKeywords: existingPage?.seoKeywords ? existingPage.seoKeywords.join(', ') : '',
    ogImage: existingPage?.ogImage || '',
    blocks: existingPage?.blocks || []
  });

  // If new page with 0 blocks, initialize with default Service Landing template
  useEffect(() => {
    if (!existingPage && (!pageData.blocks || pageData.blocks.length === 0)) {
      const defaultTemplate = PAGE_TEMPLATES[0];
      setPageData((prev) => ({
        ...prev,
        blocks: defaultTemplate.blocksFactory()
      }));
    }
  }, [existingPage]);

  // Handle title change & auto slug
  const handleTitleChange = (val) => {
    setPageData((prev) => {
      const next = { ...prev, title: val };
      if (!existingPage) {
        next.slug = generateSlug(val);
      }
      return next;
    });
  };

  // Block management functions
  const handleUpdateBlock = (updatedBlock) => {
    setPageData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b))
    }));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setPageData((prev) => {
      const newBlocks = [...prev.blocks];
      const temp = newBlocks[index - 1];
      newBlocks[index - 1] = newBlocks[index];
      newBlocks[index] = temp;
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleMoveDown = (index) => {
    setPageData((prev) => {
      if (index === prev.blocks.length - 1) return prev;
      const newBlocks = [...prev.blocks];
      const temp = newBlocks[index + 1];
      newBlocks[index + 1] = newBlocks[index];
      newBlocks[index] = temp;
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleDuplicate = (index) => {
    setPageData((prev) => {
      const target = prev.blocks[index];
      const clone = {
        ...JSON.parse(JSON.stringify(target)),
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        name: `${target.name} (Copy)`
      };
      const newBlocks = [...prev.blocks];
      newBlocks.splice(index + 1, 0, clone);
      return { ...prev, blocks: newBlocks };
    });
    toast.success('Section duplicated');
  };

  const handleDeleteBlock = (index) => {
    if (window.confirm('Are you sure you want to remove this section?')) {
      setPageData((prev) => ({
        ...prev,
        blocks: prev.blocks.filter((_, i) => i !== index)
      }));
      toast.success('Section removed');
    }
  };

  const handleAddBlock = (type) => {
    const newBlock = createDefaultBlock(type);
    setPageData((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    setShowAddBlockModal(false);
    toast.success(`Added ${newBlock.name}`);
  };

  const handleApplyTemplate = (template) => {
    if (pageData.blocks.length > 0) {
      if (!window.confirm(`Load "${template.name}"? This will replace your current canvas blocks.`)) {
        return;
      }
    }
    setPageData((prev) => ({
      ...prev,
      blocks: template.blocksFactory()
    }));
    setShowTemplatesModal(false);
    toast.success(`Loaded "${template.name}"`);
  };

  // Save to Firestore
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
        ? pageData.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
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
        blocks: pageData.blocks || [],
        updatedAt: serverTimestamp()
      };

      if (existingPage?.id) {
        await updateDoc(doc(db, 'pages', existingPage.id), payload);
        toast.success(`Page updated successfully (${finalStatus})!`);
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'pages'), payload);
        toast.success(`Page created and published (${finalStatus})!`);
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Error saving CMS page:', err);
      toast.error(`Failed to save page: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bloom-dark text-white font-sans relative flex flex-col">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* STICKY TOP BUILDER BAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-bloom-dark/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Return to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pageData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Page Title..."
                className="bg-transparent text-lg sm:text-xl font-extrabold text-white focus:outline-none focus:border-b-2 focus:border-bloom-primary max-w-xs sm:max-w-md truncate"
              />
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  pageData.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {pageData.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>URL:</span>
              <code className="text-bloom-blue font-mono bg-white/5 px-1.5 py-0.5 rounded">
                /p/{generateSlug(pageData.slug || pageData.title)}
              </code>
            </div>
          </div>
        </div>

        {/* Center: View Switcher (Edit vs Preview) */}
        <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'edit'
                ? 'bg-bloom-primary text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Edit3 size={14} />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-bloom-primary text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye size={14} />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {viewMode === 'preview' && (
            <div className="hidden sm:flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl mr-2">
              <button
                type="button"
                onClick={() => setDeviceViewport('desktop')}
                className={`p-1.5 rounded-lg transition-colors ${deviceViewport === 'desktop' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
                title="Desktop View"
              >
                <Monitor size={15} />
              </button>
              <button
                type="button"
                onClick={() => setDeviceViewport('tablet')}
                className={`p-1.5 rounded-lg transition-colors ${deviceViewport === 'tablet' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
                title="Tablet View (768px)"
              >
                <Tablet size={15} />
              </button>
              <button
                type="button"
                onClick={() => setDeviceViewport('mobile')}
                className={`p-1.5 rounded-lg transition-colors ${deviceViewport === 'mobile' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
                title="Mobile View (375px)"
              >
                <Smartphone size={15} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowTemplatesModal(true)}
            className="px-3 py-2 text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-1.5"
            title="Pre-made page templates"
          >
            <LayoutTemplate size={14} />
            <span className="hidden sm:inline">Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="px-3 py-2 text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-1.5"
            title="Page SEO & Navigation Settings"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave('published')}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-bloom-primary to-bloom-blue hover:shadow-lg hover:shadow-bloom-primary/25 rounded-xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Save size={15} />
            <span>{loading ? 'Saving...' : 'Save & Publish'}</span>
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MAIN BUILDER BODY */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        {viewMode === 'edit' ? (
          /* CANVAS EDIT MODE */
          <div className="max-w-4xl w-full mx-auto px-4 py-8 flex-1">
            {/* Quick Helper Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl mb-8 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Visual Block Canvas</h4>
                  <p className="text-xs text-gray-400">
                    Arrange, re-order, and customize blocks. They render responsively with Dark/Light mode support.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddBlockModal(true)}
                className="px-4 py-2 bg-bloom-primary text-white font-bold text-xs rounded-xl hover:bg-bloom-primary/90 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-lg shadow-bloom-primary/20"
              >
                <Plus size={15} /> Add Section
              </button>
            </div>

            {/* Blocks List */}
            {pageData.blocks && pageData.blocks.length > 0 ? (
              <div className="space-y-4">
                {pageData.blocks.map((block, idx) => (
                  <BlockEditorCard
                    key={block.id || idx}
                    block={block}
                    index={idx}
                    totalBlocks={pageData.blocks.length}
                    onUpdate={handleUpdateBlock}
                    onMoveUp={() => handleMoveUp(idx)}
                    onMoveDown={() => handleMoveDown(idx)}
                    onDuplicate={() => handleDuplicate(idx)}
                    onDelete={() => handleDeleteBlock(idx)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-white/10 rounded-3xl p-8 bg-white/[0.02]">
                <Layers size={40} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Your canvas is empty</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                  Add pre-designed components like Hero headers, Feature cards, Pricing comparisons, and FAQs.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddBlockModal(true)}
                    className="px-5 py-2.5 bg-bloom-primary text-white text-xs font-bold rounded-xl hover:bg-bloom-primary/90 flex items-center gap-2"
                  >
                    <Plus size={15} /> Add First Section
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTemplatesModal(true)}
                    className="px-5 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 flex items-center gap-2"
                  >
                    <LayoutTemplate size={15} /> Load Template
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Add Section Button */}
            {pageData.blocks && pageData.blocks.length > 0 && (
              <div className="pt-6 pb-12 text-center">
                <button
                  type="button"
                  onClick={() => setShowAddBlockModal(true)}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bloom-primary/40 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
                >
                  <Plus size={18} className="text-bloom-primary" />
                  <span>Insert New Section Here</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* LIVE INTERACTIVE PREVIEW MODE */
          <div className="flex-1 bg-black/50 py-8 px-4 flex justify-center overflow-x-auto">
            <div
              className={`bg-white dark:bg-bloom-dark rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/10 ${
                deviceViewport === 'mobile'
                  ? 'w-[375px] min-h-[667px]'
                  : deviceViewport === 'tablet'
                    ? 'w-[768px] min-h-[900px]'
                    : 'w-full max-w-7xl'
              }`}
            >
              {pageData.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} previewMode={true} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: ADD SECTION PICKER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showAddBlockModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowAddBlockModal(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-bloom-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="text-bloom-primary" size={20} />
                  Choose a Section to Add
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Click any block component to insert it into your page canvas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddBlockModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid sm:grid-cols-2 gap-4 flex-1">
              {BLOCK_DEFINITIONS.map((def) => (
                <div
                  key={def.type}
                  onClick={() => handleAddBlock(def.type)}
                  className="p-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-bloom-primary/50 rounded-2xl cursor-pointer transition-all duration-200 group flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-bloom-primary group-hover:text-white transition-all">
                    <Layers size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-bloom-primary transition-colors">
                        {def.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 font-mono">
                        {def.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {def.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: PRE-BUILT TEMPLATES */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showTemplatesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowTemplatesModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-bloom-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <LayoutTemplate className="text-bloom-primary" size={20} />
                  Pre-Built Page Templates
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Instantly scaffold a complete, professionally written page structure.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplatesModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {PAGE_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-bloom-primary/50 rounded-2xl cursor-pointer transition-all duration-200 group flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-white group-hover:text-bloom-primary transition-colors">
                        {tmpl.name}
                      </h4>
                      {tmpl.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-bloom-primary/20 text-bloom-primary border border-bloom-primary/30">
                          {tmpl.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 group-hover:bg-bloom-primary group-hover:text-white transition-all text-gray-300"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MODAL: PAGE SETTINGS & SEO */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="relative w-full max-w-xl bg-bloom-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="text-bloom-primary" size={20} />
                  Page Settings & SEO
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure URL routing, metadata, and navbar presence.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Page Title</label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-bloom-primary text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={pageData.slug}
                    onChange={(e) => setPageData({ ...pageData, slug: generateSlug(e.target.value) })}
                    placeholder="e.g. debt-underwriting"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-bloom-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Category</label>
                  <select
                    value={pageData.category}
                    onChange={(e) => setPageData({ ...pageData, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-bloom-primary"
                  >
                    <option value="Services">Services</option>
                    <option value="Solutions">Solutions</option>
                    <option value="Company">Company</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              {/* Include in Navigation */}
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">Include in Services Dropdown</span>
                  <span className="text-[11px] text-gray-400">
                    Automatically shows this page in the main website Navbar under Services!
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={pageData.includeInNav}
                  onChange={(e) => setPageData({ ...pageData, includeInNav: e.target.checked })}
                  className="w-4 h-4 rounded accent-bloom-primary cursor-pointer"
                />
              </div>

              {/* Status Toggle */}
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Publication Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPageData({ ...pageData, status: 'published' })}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      pageData.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setPageData({ ...pageData, status: 'draft' })}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      pageData.status === 'draft'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                  >
                    Draft Only
                  </button>
                </div>
              </div>

              {/* SEO Description */}
              <div>
                <label className="block font-semibold text-gray-300 mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={pageData.seoDescription}
                  onChange={(e) => setPageData({ ...pageData, seoDescription: e.target.value })}
                  placeholder="Institutional-grade underwriting services for private equity sponsors..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">SEO Keywords (comma separated)</label>
                <input
                  type="text"
                  value={pageData.seoKeywords}
                  onChange={(e) => setPageData({ ...pageData, seoKeywords: e.target.value })}
                  placeholder="real estate modeling, underwriting, financial analysis"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
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
