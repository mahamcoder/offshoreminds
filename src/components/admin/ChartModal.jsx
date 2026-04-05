import { useState, useMemo, useEffect } from 'react';
import { X, Plus, Trash2, Eye } from 'lucide-react';
import { ChartCard } from '../blog/BlogRenderer';

const ChartModal = ({ isOpen, onClose, onInsert, editingData = null }) => {
    const [chartType, setChartType] = useState('bar');
    const [title, setTitle] = useState('');
    const [series, setSeries] = useState([{ name: 'Value', type: 'bar', yAxisId: 'left' }]);
    const [dataPoints, setDataPoints] = useState([{ name: '', values: { 'Value': '' } }]);
    const [isStacked, setIsStacked] = useState(false);

    useEffect(() => {
        if (editingData) {
            setChartType(editingData.type || 'bar');
            setTitle(editingData.title || '');

            // Detect series from data keys or seriesConfig
            const firstPoint = editingData.data && editingData.data[0];
            const detectedKeys = firstPoint
                ? Object.keys(firstPoint).filter(k => k !== 'name')
                : ['Value'];

            const config = editingData.seriesConfig || {};
            const initialSeries = detectedKeys.map(k => ({
                name: k,
                type: config[k]?.type || editingData.type || 'bar',
                yAxisId: config[k]?.yAxisId || 'left'
            }));

            setSeries(initialSeries);
            setIsStacked(editingData.isStacked || false);

            setDataPoints(editingData.data && editingData.data.length > 0
                ? editingData.data.map(p => {
                    const values = {};
                    detectedKeys.forEach(s => {
                        values[s] = String(p[s] ?? '');
                    });
                    return { name: p.name, values };
                })
                : [{ name: '', values: detectedKeys.reduce((acc, s) => ({ ...acc, [s]: '' }), {}) }]
            );
        } else {
            setChartType('bar');
            setTitle('');
            setSeries([{ name: 'Value', type: 'bar', yAxisId: 'left' }]);
            setDataPoints([{ name: '', values: { 'Value': '' } }]);
            setIsStacked(false);
        }
    }, [editingData, isOpen]);

    const currentChartData = useMemo(() => {
        const validData = dataPoints.filter(p => p.name.trim() !== '' || Object.values(p.values).some(v => v.trim() !== ''));
        const seriesConfig = {};
        series.forEach(s => {
            seriesConfig[s.name] = { type: s.type, yAxisId: s.yAxisId };
        });

        return {
            type: chartType,
            title: title || 'Preview Chart',
            isStacked,
            seriesConfig,
            data: validData.map(p => {
                const point = { name: p.name };
                series.forEach(s => {
                    point[s.name] = Number(p.values[s.name]) || 0;
                });
                return point;
            })
        };
    }, [chartType, title, dataPoints, series, isStacked]);

    if (!isOpen) return null;

    const handleAddSeries = () => {
        const suggestedName = `Series ${series.length + 1}`;
        const newSeriesName = window.prompt("Enter new series name:", suggestedName);

        if (!newSeriesName || newSeriesName.trim() === '') return;
        if (series.some(s => s.name === newSeriesName.trim())) {
            alert("This series name already exists!");
            return;
        }

        const finalName = newSeriesName.trim();
        setSeries([...series, { name: finalName, type: 'bar', yAxisId: 'left' }]);
        setDataPoints(dataPoints.map(p => ({
            ...p,
            values: { ...p.values, [finalName]: '' }
        })));
    };

    const handleRemoveSeries = (sName) => {
        if (series.length <= 1) return;
        setSeries(series.filter(s => s.name !== sName));
        setDataPoints(dataPoints.map(p => {
            const newValues = { ...p.values };
            delete newValues[sName];
            return { ...p, values: newValues };
        }));
    };

    const handleSeriesConfigChange = (sIndex, field, val) => {
        const oldName = series[sIndex].name;

        if (field === 'name') {
            if (!val || series.some(s => s.name === val)) return;

            // Update Series Name
            setSeries(current => current.map((s, i) =>
                i === sIndex ? { ...s, name: val } : s
            ));

            // Update all data points to use the new key
            setDataPoints(current => current.map(p => {
                const newValues = { ...p.values };
                newValues[val] = newValues[oldName];
                delete newValues[oldName];
                return { ...p, values: newValues };
            }));
        } else {
            // Update Type or Axis
            setSeries(current => current.map((s, i) =>
                i === sIndex ? { ...s, [field]: val } : s
            ));
        }
    };

    const handleAddPoint = () => {
        const suggestedName = `Point ${dataPoints.length + 1}`;
        const pointName = window.prompt("Enter point name (e.g., Year, Month):", suggestedName);

        if (pointName === null) return; // User cancelled

        const initialValues = {};
        series.forEach(s => { initialValues[s.name] = ''; });
        setDataPoints([...dataPoints, { name: pointName.trim(), values: initialValues }]);
    };

    const handleRemovePoint = (index) => {
        setDataPoints(dataPoints.filter((_, i) => i !== index));
    };

    const handlePointNameChange = (index, val) => {
        setDataPoints(current => current.map((p, i) =>
            i === index ? { ...p, name: val } : p
        ));
    };

    const handlePointValueChange = (pIndex, sName, val) => {
        setDataPoints(current => current.map((p, i) =>
            i === pIndex
                ? { ...p, values: { ...p.values, [sName]: val } }
                : p
        ));
    };

    const handleInsert = () => {
        if (currentChartData.data.length === 0) {
            alert("Please add at least one data point.");
            return;
        }

        onInsert(currentChartData);

        // Reset and close
        setSeries([{ name: 'Value', type: 'bar', yAxisId: 'left' }]);
        setDataPoints([{ name: '', values: { 'Value': '' } }]);
        setTitle('');
        setChartType('bar');
        setIsStacked(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <div className="bg-bloom-dark border border-white/10 rounded-3xl w-full max-w-5xl shadow-2xl relative my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left: Configuration */}
                    <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-bloom-primary/10 rounded-xl flex items-center justify-center text-bloom-primary">
                                <Plus size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Configure Chart</h2>
                        </div>

                        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue uppercase tracking-wider">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bloom-primary transition-colors"
                                    placeholder="e.g. Market Growth 2025"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue uppercase tracking-wider">Chart Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['bar', 'line', 'pie', 'area'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setChartType(type)}
                                            className={`px-4 py-3 rounded-xl border font-bold capitalize transition-all ${chartType === type ? 'bg-bloom-primary border-bloom-primary text-bloom-dark' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-semibold text-bloom-blue uppercase tracking-wider">Series labels & Config</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div
                                                onClick={() => setIsStacked(!isStacked)}
                                                className={`w-10 h-6 rounded-full transition-colors relative ${isStacked ? 'bg-bloom-primary' : 'bg-white/10'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isStacked ? 'left-5' : 'left-1'}`}></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Stack All</span>
                                        </label>
                                        <button
                                            onClick={handleAddSeries}
                                            className="text-xs font-bold text-bloom-primary hover:text-white flex items-center gap-1 transition-colors"
                                        >
                                            <Plus size={14} /> Add Series
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-8">
                                    {series.map((s, idx) => (
                                        <div key={idx} className="flex flex-wrap items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-bloom-primary/50 transition-colors">
                                            <input
                                                type="text"
                                                value={s.name}
                                                onChange={(e) => handleSeriesConfigChange(idx, 'name', e.target.value)}
                                                className="bg-transparent text-sm font-bold text-white focus:outline-none flex-1 min-w-[120px]"
                                                placeholder="Series Name"
                                            />

                                            <select
                                                value={s.type}
                                                onChange={(e) => handleSeriesConfigChange(idx, 'type', e.target.value)}
                                                className="bg-bloom-dark text-[10px] font-bold text-gray-400 border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-bloom-primary uppercase"
                                            >
                                                <option value="bar">Bar</option>
                                                <option value="line">Line</option>
                                                <option value="area">Area</option>
                                            </select>

                                            <button
                                                onClick={() => handleSeriesConfigChange(idx, 'yAxisId', s.yAxisId === 'left' ? 'right' : 'left')}
                                                className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all uppercase ${s.yAxisId === 'right' ? 'bg-bloom-blue/20 border-bloom-blue text-bloom-blue' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}
                                            >
                                                {s.yAxisId === 'right' ? 'Right Axis' : 'Left Axis'}
                                            </button>

                                            {series.length > 1 && (
                                                <button onClick={() => handleRemoveSeries(s.name)} className="text-gray-500 hover:text-red-400 transition-colors p-1">
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <label className="block text-sm font-semibold mb-2 text-bloom-blue uppercase tracking-wider">Data Points</label>
                                <div className="space-y-4">
                                    {dataPoints.map((point, pIndex) => (
                                        <div key={pIndex} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                            <div className="flex items-center justify-between">
                                                <input
                                                    type="text"
                                                    placeholder="Point Name (e.g. 2015)"
                                                    value={point.name}
                                                    onChange={(e) => handlePointNameChange(pIndex, e.target.value)}
                                                    className="flex-1 bg-transparent border-none p-0 text-white font-bold focus:outline-none focus:ring-0 placeholder:text-gray-600"
                                                />
                                                <button
                                                    onClick={() => handleRemovePoint(pIndex)}
                                                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30"
                                                    disabled={dataPoints.length === 1}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {series.map((s) => (
                                                    <div key={s.name} className="relative">
                                                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1 ml-1 truncate">{s.name}</label>
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            value={point.values[s.name]}
                                                            onChange={(e) => handlePointValueChange(pIndex, s.name, e.target.value)}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-bloom-primary transition-colors"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddPoint}
                                    className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl text-sm font-bold text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all"
                                >
                                    <Plus size={18} /> Add New Data Point
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleInsert}
                                className="flex-[2] px-6 py-4 rounded-xl font-bold bg-bloom-primary text-bloom-dark hover:bg-white transition-all shadow-xl shadow-bloom-primary/20 hover:scale-[1.02] active:scale-95"
                            >
                                Insert into Blog
                            </button>
                        </div>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="p-8 lg:p-12 bg-white/[0.02]">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-bloom-blue/10 rounded-xl flex items-center justify-center text-bloom-blue">
                                <Eye size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                        </div>

                        <div className="lg:mt-12">
                            {currentChartData.data.length > 0 ? (
                                <ChartCard chartData={currentChartData} />
                            ) : (
                                <div className="h-[400px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-gray-500 gap-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                                        <Eye size={32} />
                                    </div>
                                    <p className="font-medium">Add data points to see the preview</p>
                                </div>
                            )}
                        </div>

                        <p className="mt-8 text-sm text-gray-500 italic text-center">
                            * This is exactly how it will look on your website.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartModal;
