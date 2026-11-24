import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { renderIcon } from './blockIcons';
import { ChevronDown, Check, ArrowRight, Star, ExternalLink } from 'lucide-react';
import Reveal from '../common/Reveal';

const BlockRenderer = ({ block, previewMode = false }) => {
  const { type, data = {} } = block;

  // ───────────────────────────────────────────────────────────────────────────
  // HERO SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'hero') {
    const isCenter = data.alignment !== 'left';
    return (
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-white dark:bg-bloom-dark text-slate-900 dark:text-white transition-colors duration-300">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-bloom-primary/20 via-purple-500/15 to-bloom-secondary/20 rounded-full blur-[120px] pointer-events-none -z-0"></div>
        {data.bgImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none -z-0"
            style={{ backgroundImage: `url(${data.bgImageUrl})` }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
            {data.badgeText && (
              <Reveal delay={100} className={isCenter ? 'mx-auto' : ''}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-6 backdrop-blur-md shadow-sm">
                  {data.badgeIcon && renderIcon(data.badgeIcon, "w-4 h-4 text-bloom-primary")}
                  <span>{data.badgeText}</span>
                </div>
              </Reveal>
            )}

            <Reveal delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 text-slate-900 dark:text-white">
                {data.title}
              </h1>
            </Reveal>

            {data.subtitle && (
              <Reveal delay={300}>
                <p className={`text-lg sm:text-xl text-slate-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
                  {data.subtitle}
                </p>
              </Reveal>
            )}

            {(data.primaryBtnText || data.secondaryBtnText) && (
              <Reveal delay={400} className={isCenter ? 'mx-auto' : ''}>
                <div className={`flex flex-wrap items-center gap-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
                  {data.primaryBtnText && (
                    data.primaryBtnUrl?.startsWith('http') ? (
                      <a
                        href={data.primaryBtnUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-bloom-primary to-bloom-blue hover:shadow-xl hover:shadow-bloom-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>{data.primaryBtnText}</span>
                        <ArrowRight size={18} />
                      </a>
                    ) : (
                      <Link
                        to={data.primaryBtnUrl || '/contact'}
                        className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-bloom-primary to-bloom-blue hover:shadow-xl hover:shadow-bloom-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>{data.primaryBtnText}</span>
                        <ArrowRight size={18} />
                      </Link>
                    )
                  )}

                  {data.secondaryBtnText && (
                    data.secondaryBtnUrl?.startsWith('#') ? (
                      <a
                        href={data.secondaryBtnUrl}
                        className="px-8 py-4 rounded-xl font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>{data.secondaryBtnText}</span>
                      </a>
                    ) : (
                      <Link
                        to={data.secondaryBtnUrl || '#'}
                        className="px-8 py-4 rounded-xl font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>{data.secondaryBtnText}</span>
                      </Link>
                    )
                  )}
                </div>
              </Reveal>
            )}

            {data.showStats && data.stats && data.stats.length > 0 && (
              <Reveal delay={500}>
                <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {data.stats.map((st, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {st.value}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-1 font-medium">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // FEATURE GRID SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'featureGrid') {
    const colClass = data.columns === 2
      ? 'md:grid-cols-2'
      : data.columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

    return (
      <section className="py-20 bg-slate-50/60 dark:bg-bloom-dark/60 text-slate-900 dark:text-white relative transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            {data.badgeText && (
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-3">
                {data.badgeText}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                {data.subtitle}
              </p>
            )}
          </div>

          <div className={`grid ${colClass} gap-6 md:gap-8`}>
            {(data.items || []).map((item, idx) => (
              <Reveal key={item.id || idx} delay={idx * 80}>
                <div className="h-full bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 rounded-2xl p-7 hover:border-bloom-primary/40 dark:hover:border-bloom-primary/40 hover:shadow-xl dark:hover:shadow-bloom-primary/5 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-bloom-primary group-hover:text-white transition-all duration-300">
                        {renderIcon(item.icon || 'Sparkles', "w-6 h-6")}
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/5">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-bloom-primary dark:group-hover:text-bloom-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {item.linkText && (
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                      {item.linkUrl?.startsWith('http') ? (
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-bloom-primary hover:underline"
                        >
                          <span>{item.linkText}</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link
                          to={item.linkUrl || '/contact'}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-bloom-primary hover:underline"
                        >
                          <span>{item.linkText}</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STATS SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'stats') {
    return (
      <section className="py-20 bg-white dark:bg-bloom-dark text-slate-900 dark:text-white relative border-y border-slate-200/80 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          {(data.title || data.badgeText) && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              {data.badgeText && (
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-3">
                  {data.badgeText}
                </span>
              )}
              {data.title && (
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
                  {data.title}
                </h2>
              )}
              {data.subtitle && (
                <p className="text-slate-600 dark:text-gray-400 text-base">
                  {data.subtitle}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(data.items || []).map((item, idx) => (
              <Reveal key={item.id || idx} delay={idx * 100}>
                <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 text-center hover:scale-105 hover:border-bloom-primary/30 transition-all duration-300">
                  {item.icon && (
                    <div className="w-10 h-10 rounded-xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center mx-auto mb-3">
                      {renderIcon(item.icon, "w-5 h-5")}
                    </div>
                  )}
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 bg-gradient-to-r from-bloom-primary to-bloom-blue bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-gray-200">
                    {item.label}
                  </div>
                  {item.subtext && (
                    <div className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                      {item.subtext}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CONTENT & MEDIA SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'contentMedia') {
    const isImageLeft = data.layout === 'image-left';
    return (
      <section className="py-20 bg-slate-50/50 dark:bg-bloom-dark/50 text-slate-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isImageLeft ? 'lg:grid-flow-dense' : ''}`}>
            {/* Text Side */}
            <div className={isImageLeft ? 'lg:col-start-2' : ''}>
              {data.badgeText && (
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-4">
                  {data.badgeText}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                {data.title}
              </h2>
              {data.text && (
                <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  {data.text}
                </p>
              )}

              {data.bullets && data.bullets.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {data.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 dark:text-gray-300 leading-normal">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {data.btnText && (
                <Link
                  to={data.btnUrl || '/contact'}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-bloom-primary hover:bg-bloom-primary/90 hover:shadow-lg hover:shadow-bloom-primary/25 transition-all duration-300"
                >
                  <span>{data.btnText}</span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>

            {/* Media Side */}
            <div className={isImageLeft ? 'lg:col-start-1' : ''}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-slate-900 group">
                {data.mediaType === 'video' && data.mediaUrl ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={data.mediaUrl}
                      title={data.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={data.mediaUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'}
                    alt={data.title}
                    className="w-full h-auto object-cover max-h-[480px] group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {data.mediaCaption && (
                  <div className="p-4 bg-white/95 dark:bg-bloom-dark/95 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-gray-400">
                    {data.mediaCaption}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // BENEFITS SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'benefits') {
    return (
      <section className="py-20 bg-white dark:bg-bloom-dark text-slate-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {data.badgeText && (
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-3">
                {data.badgeText}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400">
                {data.subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(data.items || []).map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 rounded-2xl p-8 hover:border-bloom-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-bloom-primary/10 text-bloom-primary flex items-center justify-center mb-6">
                  {renderIcon(item.icon || 'Award', "w-6 h-6")}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>
                {item.points && item.points.length > 0 && (
                  <ul className="space-y-2 pt-4 border-t border-slate-200/70 dark:border-white/5">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-gray-300">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // COMPARISON SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'comparison') {
    return (
      <section className="py-20 bg-slate-50/70 dark:bg-bloom-dark/70 text-slate-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            {data.badgeText && (
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-3">
                {data.badgeText}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-base text-slate-600 dark:text-gray-400">
                {data.subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Box (Traditional) */}
            <div className="bg-white dark:bg-white/[0.03] border border-rose-500/20 rounded-3xl p-8 relative">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
                Conventional
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {data.leftTitle}
              </h3>
              {data.leftSubtitle && (
                <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
                  {data.leftSubtitle}
                </p>
              )}
              <ul className="space-y-4">
                {(data.leftItems || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                    <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Box (Offshore Minds) */}
            <div className="bg-gradient-to-b from-bloom-primary/10 to-bloom-blue/10 border-2 border-bloom-primary/40 rounded-3xl p-8 relative shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-bloom-primary dark:text-bloom-secondary mb-2 flex items-center justify-between">
                <span>Optimized Solution</span>
                <span className="bg-bloom-primary text-white text-[10px] px-2.5 py-0.5 rounded-full">Recommended</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {data.rightTitle}
              </h3>
              {data.rightSubtitle && (
                <p className="text-xs text-slate-600 dark:text-gray-300 mb-6 font-medium">
                  {data.rightSubtitle}
                </p>
              )}
              <ul className="space-y-4">
                {(data.rightItems || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-800 dark:text-gray-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // PROCESS STEPS SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'processSteps') {
    return (
      <section className="py-20 bg-white dark:bg-bloom-dark text-slate-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {data.badgeText && (
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-3">
                {data.badgeText}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-base text-slate-600 dark:text-gray-400">
                {data.subtitle}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {(data.steps || []).map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 rounded-2xl p-7 relative hover:border-bloom-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-bloom-primary/40 dark:text-bloom-primary/60 font-mono">
                      {step.stepNumber}
                    </span>
                    {step.duration && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-gray-300">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // FAQ ACCORDION SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'faq') {
    return <FaqAccordionBlock data={data} />;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // TESTIMONIAL QUOTE SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'testimonial') {
    return (
      <section className="py-20 bg-slate-50/60 dark:bg-bloom-dark/60 text-slate-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
            <div className="flex justify-center gap-1 mb-6 text-amber-400">
              {[...Array(data.rating || 5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-gray-100 leading-relaxed mb-8 italic">
              "{data.quote}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              {data.avatarUrl && (
                <img
                  src={data.avatarUrl}
                  alt={data.authorName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-bloom-primary"
                />
              )}
              <div className="text-left">
                <div className="font-bold text-base text-slate-900 dark:text-white">
                  {data.authorName}
                </div>
                <div className="text-xs text-slate-500 dark:text-gray-400">
                  {data.authorRole}{data.company ? ` • ${data.company}` : ''}
                </div>
                {data.verifiedDeal && (
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ✓ {data.verifiedDeal}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CTA BANNER SECTION
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'cta') {
    return (
      <section className="py-20 bg-white dark:bg-bloom-dark text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-3xl p-10 sm:p-16 overflow-hidden bg-gradient-to-r from-bloom-primary via-indigo-600 to-bloom-blue shadow-2xl text-center">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              {data.badgeText && (
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 mb-4 backdrop-blur-md">
                  {data.badgeText}
                </span>
              )}
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                {data.title}
              </h2>
              {data.description && (
                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                  {data.description}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4">
                {data.primaryBtnText && (
                  data.primaryBtnUrl?.startsWith('http') ? (
                    <a
                      href={data.primaryBtnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center gap-2"
                    >
                      <span>{data.primaryBtnText}</span>
                      <ArrowRight size={18} />
                    </a>
                  ) : (
                    <Link
                      to={data.primaryBtnUrl || '/contact'}
                      className="px-8 py-4 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center gap-2"
                    >
                      <span>{data.primaryBtnText}</span>
                      <ArrowRight size={18} />
                    </Link>
                  )
                )}

                {data.secondaryBtnText && (
                  <Link
                    to={data.secondaryBtnUrl || '/contact'}
                    className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <span>{data.secondaryBtnText}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // EMBED CODE / RAW HTML
  // ───────────────────────────────────────────────────────────────────────────
  if (type === 'embed') {
    return (
      <section className="py-16 bg-white dark:bg-bloom-dark text-slate-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          {data.title && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {data.title}
              </h2>
              {data.subtitle && (
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {data.subtitle}
                </p>
              )}
            </div>
          )}
          <div
            className="w-full overflow-hidden"
            dangerouslySetInnerHTML={{ __html: data.htmlCode || '' }}
          />
        </div>
      </section>
    );
  }

  return (
    <div className="p-8 text-center text-sm text-gray-500 bg-slate-100 dark:bg-white/5 rounded-2xl m-4 border border-dashed border-gray-400">
      Unknown block type: {type}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component for interactive FAQ Accordion
// ─────────────────────────────────────────────────────────────────────────────
const FaqAccordionBlock = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-bloom-dark/70 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {data.badgeText && (
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-bloom-primary/10 text-bloom-primary border border-bloom-primary/20 mb-3">
              {data.badgeText}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-base text-slate-600 dark:text-gray-400">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {(data.items || []).map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left font-bold text-base sm:text-lg flex items-center justify-between gap-4 text-slate-900 dark:text-white hover:text-bloom-primary dark:hover:text-bloom-secondary transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 shrink-0 text-slate-400 dark:text-gray-400 ${isOpen ? 'rotate-180 text-bloom-primary' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlockRenderer;
