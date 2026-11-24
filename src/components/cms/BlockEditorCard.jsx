import React, { useState } from 'react';
import {
  ChevronDown, ChevronUp, Trash2, Copy, MoveUp, MoveDown,
  Plus, X, Sparkles, Layers, BarChart2, FileText, Award,
  Shield, Target, HelpCircle, MessageSquare, Rocket, Code
} from 'lucide-react';
import { POPULAR_ICONS, renderIcon } from './blockIcons';

const BlockEditorCard = ({
  block,
  index,
  totalBlocks,
  onUpdate,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { type, data = {} } = block;

  const updateField = (field, value) => {
    onUpdate({
      ...block,
      data: {
        ...data,
        [field]: value
      }
    });
  };

  const updateNestedArrayItem = (arrayField, itemIndex, itemField, itemValue) => {
    const list = [...(data[arrayField] || [])];
    list[itemIndex] = {
      ...list[itemIndex],
      [itemField]: itemValue
    };
    updateField(arrayField, list);
  };

  const addNestedArrayItem = (arrayField, newItem) => {
    const list = [...(data[arrayField] || []), newItem];
    updateField(arrayField, list);
  };

  const removeNestedArrayItem = (arrayField, itemIndex) => {
    const list = (data[arrayField] || []).filter((_, i) => i !== itemIndex);
    updateField(arrayField, list);
  };

  // Header icon
  const getBlockIcon = () => {
    switch (type) {
      case 'hero': return <Sparkles size={18} className="text-amber-400" />;
      case 'featureGrid': return <Layers size={18} className="text-bloom-primary" />;
      case 'stats': return <BarChart2 size={18} className="text-emerald-400" />;
      case 'contentMedia': return <FileText size={18} className="text-blue-400" />;
      case 'benefits': return <Award size={18} className="text-purple-400" />;
      case 'comparison': return <Shield size={18} className="text-rose-400" />;
      case 'processSteps': return <Target size={18} className="text-cyan-400" />;
      case 'faq': return <HelpCircle size={18} className="text-indigo-400" />;
      case 'testimonial': return <MessageSquare size={18} className="text-amber-400" />;
      case 'cta': return <Rocket size={18} className="text-emerald-400" />;
      case 'embed': return <Code size={18} className="text-gray-400" />;
      default: return <Layers size={18} />;
    }
  };

  return (
    <div className="bg-bloom-dark/70 border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-200 hover:border-bloom-primary/30 mb-5">
      {/* Block Header Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5 select-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            {getBlockIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500 font-bold">#{index + 1}</span>
              <h4 className="text-sm font-bold text-white tracking-wide">
                {block.name || type}
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5 uppercase">
                {type}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 truncate max-w-xs sm:max-w-md">
              {data.title || data.quote || 'Configure section contents'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            title="Move Up"
          >
            <MoveUp size={15} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalBlocks - 1}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            title="Move Down"
          >
            <MoveDown size={15} />
          </button>
          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Duplicate Block"
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Delete Block"
          >
            <Trash2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Block Body Editor */}
      {!collapsed && (
        <div className="p-5 sm:p-6 space-y-5 text-sm text-gray-200">
          {/* ───────────────────────────────────────────────────────────────── */}
          {/* HERO BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'hero' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={data.badgeText || ''}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="e.g. New Capability"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Alignment</label>
                  <select
                    value={data.alignment || 'center'}
                    onChange={(e) => updateField('alignment', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  >
                    <option value="center">Centered</option>
                    <option value="left">Left Aligned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Primary page headline"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Subtitle / Paragraph</label>
                <textarea
                  rows={2}
                  value={data.subtitle || ''}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  placeholder="Supporting descriptive paragraph"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={data.primaryBtnText || ''}
                    onChange={(e) => updateField('primaryBtnText', e.target.value)}
                    placeholder="e.g. Get Started"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Primary Button URL</label>
                  <input
                    type="text"
                    value={data.primaryBtnUrl || ''}
                    onChange={(e) => updateField('primaryBtnUrl', e.target.value)}
                    placeholder="e.g. /contact or https://calendly.com/..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Secondary Button Text</label>
                  <input
                    type="text"
                    value={data.secondaryBtnText || ''}
                    onChange={(e) => updateField('secondaryBtnText', e.target.value)}
                    placeholder="e.g. View Case Studies"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Secondary Button URL</label>
                  <input
                    type="text"
                    value={data.secondaryBtnUrl || ''}
                    onChange={(e) => updateField('secondaryBtnUrl', e.target.value)}
                    placeholder="e.g. #features or /case-studies"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>

              {/* Show Stats */}
              <div className="pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-300">Under-Hero Stats Strip</span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400">
                    <input
                      type="checkbox"
                      checked={data.showStats || false}
                      onChange={(e) => updateField('showStats', e.target.checked)}
                      className="rounded accent-bloom-primary"
                    />
                    <span>Show Stats</span>
                  </label>
                </div>

                {data.showStats && (
                  <div className="space-y-2">
                    {(data.stats || []).map((st, sIdx) => (
                      <div key={sIdx} className="grid grid-cols-2 gap-2 bg-black/30 p-2.5 rounded-xl border border-white/5">
                        <input
                          type="text"
                          value={st.value || ''}
                          onChange={(e) => updateNestedArrayItem('stats', sIdx, 'value', e.target.value)}
                          placeholder="Value (e.g. $15B+)"
                          className="bg-transparent border-b border-white/10 px-2 py-1 text-white font-bold text-xs"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={st.label || ''}
                            onChange={(e) => updateNestedArrayItem('stats', sIdx, 'label', e.target.value)}
                            placeholder="Label (e.g. Turnaround)"
                            className="bg-transparent border-b border-white/10 px-2 py-1 text-gray-300 text-xs flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeNestedArrayItem('stats', sIdx)}
                            className="text-gray-500 hover:text-rose-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addNestedArrayItem('stats', { label: 'New Metric', value: '100%' })}
                      className="text-xs text-bloom-primary hover:underline flex items-center gap-1 pt-1 font-semibold"
                    >
                      <Plus size={13} /> Add Stat Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* FEATURE GRID BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'featureGrid' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badgeText || ''}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="e.g. Capabilities"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Columns</label>
                  <select
                    value={data.columns || 3}
                    onChange={(e) => updateField('columns', parseInt(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  >
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Card Style</label>
                  <select
                    value={data.cardStyle || 'glass'}
                    onChange={(e) => updateField('cardStyle', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  >
                    <option value="glass">Glass Glow</option>
                    <option value="bordered">Bordered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Section Title</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Section title"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.subtitle || ''}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  placeholder="Short explanatory sentence"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                />
              </div>

              {/* Cards List */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Feature Cards ({(data.items || []).length})</span>
                  <button
                    type="button"
                    onClick={() => addNestedArrayItem('items', {
                      id: `feat-${Date.now()}`,
                      icon: 'Sparkles',
                      badge: 'New',
                      title: 'New Service Capability',
                      description: 'Comprehensive analysis and modeling tailored to your mandate.',
                      linkText: 'Learn More',
                      linkUrl: '/contact'
                    })}
                    className="text-xs text-bloom-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus size={13} /> Add Card
                  </button>
                </div>

                <div className="space-y-3">
                  {(data.items || []).map((card, cIdx) => (
                    <div key={card.id || cIdx} className="bg-black/30 p-3.5 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <select
                            value={card.icon || 'Sparkles'}
                            onChange={(e) => updateNestedArrayItem('items', cIdx, 'icon', e.target.value)}
                            className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-xs text-bloom-primary font-bold"
                          >
                            {POPULAR_ICONS.map((ic) => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={card.badge || ''}
                            onChange={(e) => updateNestedArrayItem('items', cIdx, 'badge', e.target.value)}
                            placeholder="Badge (optional)"
                            className="bg-transparent border-b border-white/10 px-2 py-0.5 text-xs text-gray-400 w-28"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNestedArrayItem('items', cIdx)}
                          className="text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => updateNestedArrayItem('items', cIdx, 'title', e.target.value)}
                        placeholder="Card Title"
                        className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-white font-bold text-sm"
                      />

                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => updateNestedArrayItem('items', cIdx, 'description', e.target.value)}
                        placeholder="Card description"
                        className="w-full bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={card.linkText || ''}
                          onChange={(e) => updateNestedArrayItem('items', cIdx, 'linkText', e.target.value)}
                          placeholder="Link Text (e.g. Learn More)"
                          className="bg-transparent border-b border-white/10 px-2 py-1 text-xs text-gray-400"
                        />
                        <input
                          type="text"
                          value={card.linkUrl || ''}
                          onChange={(e) => updateNestedArrayItem('items', cIdx, 'linkUrl', e.target.value)}
                          placeholder="Link URL (e.g. /contact)"
                          className="bg-transparent border-b border-white/10 px-2 py-1 text-xs text-gray-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* STATS BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'stats' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badgeText || ''}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="e.g. Track Record"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={data.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Section Title"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-300">Stats Items</span>
                  <button
                    type="button"
                    onClick={() => addNestedArrayItem('items', {
                      id: `stat-${Date.now()}`,
                      value: '100+',
                      label: 'Satisfied Clients',
                      subtext: 'Institutional partnerships',
                      icon: 'Award'
                    })}
                    className="text-xs text-bloom-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus size={13} /> Add Stat
                  </button>
                </div>

                {(data.items || []).map((st, idx) => (
                  <div key={st.id || idx} className="grid grid-cols-4 gap-2 bg-black/30 p-2.5 rounded-xl border border-white/5 items-center">
                    <input
                      type="text"
                      value={st.value || ''}
                      onChange={(e) => updateNestedArrayItem('items', idx, 'value', e.target.value)}
                      placeholder="15k+"
                      className="bg-transparent border-b border-white/10 px-2 py-1 text-white font-bold text-xs"
                    />
                    <input
                      type="text"
                      value={st.label || ''}
                      onChange={(e) => updateNestedArrayItem('items', idx, 'label', e.target.value)}
                      placeholder="Label"
                      className="bg-transparent border-b border-white/10 px-2 py-1 text-gray-200 text-xs"
                    />
                    <input
                      type="text"
                      value={st.subtext || ''}
                      onChange={(e) => updateNestedArrayItem('items', idx, 'subtext', e.target.value)}
                      placeholder="Subtext"
                      className="bg-transparent border-b border-white/10 px-2 py-1 text-gray-400 text-xs"
                    />
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => removeNestedArrayItem('items', idx)}
                        className="text-gray-500 hover:text-rose-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* CONTENT & MEDIA BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'contentMedia' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badgeText || ''}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="e.g. Operations"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Layout</label>
                  <select
                    value={data.layout || 'image-right'}
                    onChange={(e) => updateField('layout', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  >
                    <option value="image-right">Media on Right</option>
                    <option value="image-left">Media on Left</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Heading</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Section heading"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Body Text</label>
                <textarea
                  rows={3}
                  value={data.text || ''}
                  onChange={(e) => updateField('text', e.target.value)}
                  placeholder="Detailed narrative text..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                />
              </div>

              {/* Bullets */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Checklist Bullets</label>
                <div className="space-y-1.5">
                  {(data.bullets || []).map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={b || ''}
                        onChange={(e) => {
                          const list = [...(data.bullets || [])];
                          list[bIdx] = e.target.value;
                          updateField('bullets', list);
                        }}
                        placeholder="Bullet point item"
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const list = (data.bullets || []).filter((_, i) => i !== bIdx);
                          updateField('bullets', list);
                        }}
                        className="text-gray-500 hover:text-rose-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateField('bullets', [...(data.bullets || []), 'New key benefit'])}
                    className="text-xs text-bloom-primary hover:underline flex items-center gap-1 pt-1 font-semibold"
                  >
                    <Plus size={13} /> Add Bullet
                  </button>
                </div>
              </div>

              {/* Media Settings */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Media Type</label>
                  <select
                    value={data.mediaType || 'image'}
                    onChange={(e) => updateField('mediaType', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video (YouTube / Embed URL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Media URL</label>
                  <input
                    type="text"
                    value={data.mediaUrl || ''}
                    onChange={(e) => updateField('mediaUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">CTA Button Text (Optional)</label>
                  <input
                    type="text"
                    value={data.btnText || ''}
                    onChange={(e) => updateField('btnText', e.target.value)}
                    placeholder="e.g. Discuss Deployment"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">CTA Button URL</label>
                  <input
                    type="text"
                    value={data.btnUrl || ''}
                    onChange={(e) => updateField('btnUrl', e.target.value)}
                    placeholder="e.g. /contact"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* COMPARISON BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'comparison' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badgeText || ''}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="e.g. Strategic Comparison"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={data.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Section Title"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-3 border-t border-white/5">
                {/* Left Side */}
                <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold text-rose-400 uppercase">Left Column (Conventional)</h5>
                  <input
                    type="text"
                    value={data.leftTitle || ''}
                    onChange={(e) => updateField('leftTitle', e.target.value)}
                    placeholder="Traditional In-House"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                  />
                  <div className="space-y-1 pt-1">
                    {(data.leftItems || []).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={item || ''}
                          onChange={(e) => {
                            const list = [...(data.leftItems || [])];
                            list[idx] = e.target.value;
                            updateField('leftItems', list);
                          }}
                          className="flex-1 bg-black/30 border border-white/5 rounded px-2 py-1 text-xs text-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = (data.leftItems || []).filter((_, i) => i !== idx);
                            updateField('leftItems', list);
                          }}
                          className="text-gray-500 hover:text-rose-400"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateField('leftItems', [...(data.leftItems || []), 'New drawback'])}
                      className="text-xs text-rose-400 hover:underline flex items-center gap-1 pt-1"
                    >
                      <Plus size={12} /> Add Row
                    </button>
                  </div>
                </div>

                {/* Right Side */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold text-emerald-400 uppercase">Right Column (With Offshore Minds)</h5>
                  <input
                    type="text"
                    value={data.rightTitle || ''}
                    onChange={(e) => updateField('rightTitle', e.target.value)}
                    placeholder="With Offshore Minds"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                  />
                  <div className="space-y-1 pt-1">
                    {(data.rightItems || []).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={item || ''}
                          onChange={(e) => {
                            const list = [...(data.rightItems || [])];
                            list[idx] = e.target.value;
                            updateField('rightItems', list);
                          }}
                          className="flex-1 bg-black/30 border border-white/5 rounded px-2 py-1 text-xs text-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = (data.rightItems || []).filter((_, i) => i !== idx);
                            updateField('rightItems', list);
                          }}
                          className="text-gray-500 hover:text-rose-400"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateField('rightItems', [...(data.rightItems || []), 'New advantage'])}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 pt-1"
                    >
                      <Plus size={12} /> Add Row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* FAQ BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'faq' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Badge</label>
                  <input
                    type="text"
                    value={data.badgeText || ''}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="e.g. FAQ"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={data.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Frequently Asked Questions"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary text-base font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Questions & Answers</span>
                  <button
                    type="button"
                    onClick={() => addNestedArrayItem('items', {
                      id: `faq-${Date.now()}`,
                      question: 'New Question?',
                      answer: 'Clear, concise explanation and answer.'
                    })}
                    className="text-xs text-bloom-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus size={13} /> Add FAQ
                  </button>
                </div>

                <div className="space-y-3">
                  {(data.items || []).map((faq, fIdx) => (
                    <div key={faq.id || fIdx} className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question || ''}
                          onChange={(e) => updateNestedArrayItem('items', fIdx, 'question', e.target.value)}
                          placeholder="Question?"
                          className="flex-1 bg-transparent border-b border-white/10 px-2 py-1 text-white font-bold text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removeNestedArrayItem('items', fIdx)}
                          className="text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer || ''}
                        onChange={(e) => updateNestedArrayItem('items', fIdx, 'answer', e.target.value)}
                        placeholder="Answer details..."
                        className="w-full bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* CTA BANNER BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'cta' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Primary banner headline"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={data.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Supporting message"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={data.primaryBtnText || ''}
                    onChange={(e) => updateField('primaryBtnText', e.target.value)}
                    placeholder="e.g. Schedule Consultation"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Primary Button URL</label>
                  <input
                    type="text"
                    value={data.primaryBtnUrl || ''}
                    onChange={(e) => updateField('primaryBtnUrl', e.target.value)}
                    placeholder="e.g. https://calendly.com/..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* EMBED BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'embed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Section Title (Optional)</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Embed Title"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">HTML Embed Code (iframe, form, Calendly)</label>
                <textarea
                  rows={4}
                  value={data.htmlCode || ''}
                  onChange={(e) => updateField('htmlCode', e.target.value)}
                  placeholder="<iframe src='...' />"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-bloom-primary"
                />
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* PROCESS STEPS BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'processSteps' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Section Title</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Process Title"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-bloom-primary font-bold"
                />
              </div>
              <div className="space-y-2">
                {(data.steps || []).map((step, idx) => (
                  <div key={idx} className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-bloom-primary font-bold">{step.stepNumber}</span>
                      <button
                        type="button"
                        onClick={() => removeNestedArrayItem('steps', idx)}
                        className="text-gray-500 hover:text-rose-400"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={step.title || ''}
                      onChange={(e) => updateNestedArrayItem('steps', idx, 'title', e.target.value)}
                      placeholder="Step Title"
                      className="w-full bg-transparent border-b border-white/10 px-2 py-0.5 text-xs text-white font-bold"
                    />
                    <textarea
                      rows={1}
                      value={step.description || ''}
                      onChange={(e) => updateNestedArrayItem('steps', idx, 'description', e.target.value)}
                      placeholder="Step Description"
                      className="w-full bg-transparent border border-white/10 rounded px-2 py-0.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNestedArrayItem('steps', {
                    stepNumber: `0${(data.steps || []).length + 1}`,
                    title: 'New Process Milestone',
                    description: 'Details on execution and delivery.',
                    duration: 'Step'
                  })}
                  className="text-xs text-bloom-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  <Plus size={13} /> Add Step
                </button>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* BENEFITS BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'benefits' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Section title"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white font-bold"
                />
              </div>
              <div className="space-y-2">
                {(data.items || []).map((item, idx) => (
                  <div key={idx} className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => updateNestedArrayItem('items', idx, 'title', e.target.value)}
                        placeholder="Benefit Title"
                        className="flex-1 bg-transparent border-b border-white/10 px-2 py-0.5 text-xs text-white font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => removeNestedArrayItem('items', idx)}
                        className="text-gray-500 hover:text-rose-400 ml-2"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <textarea
                      rows={1}
                      value={item.description || ''}
                      onChange={(e) => updateNestedArrayItem('items', idx, 'description', e.target.value)}
                      placeholder="Benefit explanation"
                      className="w-full bg-transparent border border-white/10 rounded px-2 py-0.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNestedArrayItem('items', {
                    id: `ben-${Date.now()}`,
                    icon: 'CheckCircle',
                    title: 'New Advantage',
                    description: 'Why this sets your firm apart.'
                  })}
                  className="text-xs text-bloom-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  <Plus size={13} /> Add Benefit
                </button>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* TESTIMONIAL BLOCK EDITOR */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {type === 'testimonial' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Quote</label>
                <textarea
                  rows={3}
                  value={data.quote || ''}
                  onChange={(e) => updateField('quote', e.target.value)}
                  placeholder="Client review quote..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={data.authorName || ''}
                    onChange={(e) => updateField('authorName', e.target.value)}
                    placeholder="David Sterling"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Role & Company</label>
                  <input
                    type="text"
                    value={data.authorRole || ''}
                    onChange={(e) => updateField('authorRole', e.target.value)}
                    placeholder="Managing Director, Acquisitions"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockEditorCard;
