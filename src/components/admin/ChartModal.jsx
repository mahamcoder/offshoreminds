import { useState, useMemo, useEffect } from 'react';
import { X, Plus, Trash2, Eye } from 'lucide-react';
import { ChartCard } from '../blog/BlogRenderer';

const ChartModal = ({ isOpen, onClose, onInsert, editingData = null }) => {
    const [chartType, setChartType] = useState('bar');
    const [title, setTitle] = useState('');
    const [dataPoints, setDataPoints] = useState([{ name: '', value: '' }]);

    useEffect(() => {
        if (editingData) {
            setChartType(editingData.type || 'bar');
            setTitle(editingData.title || '');
            setDataPoints(editingData.data && editingData.data.length > 0
                ? editingData.data.map(p => ({ name: p.name, value: String(p.value) }))
                : [{ name: '', value: '' }]
            );
        } else {
            // Reset for new chart
            setChartType('bar');
            setTitle('');
            setDataPoints([{ name: '', value: '' }]);
        }
    }, [editingData, isOpen]);

    const currentChartData = useMemo(() => {
        const validData = dataPoints.filter(p => p.name && p.value);
        return {
            type: chartType,
            title: title || 'Preview Chart',
            data: validData.map(p => ({
                name: p.name,
                value: Number(p.value)
            }))
        };
    }, [chartType, title, dataPoints]);

    if (!isOpen) return null;

    const handleAddPoint = () => {
        setDataPoints([...dataPoints, { name: '', value: '' }]);
    };

    const handleRemovePoint = (index) => {
        setDataPoints(dataPoints.filter((_, i) => i !== index));
    };

    const handlePointChange = (index, field, val) => {
        const newData = [...dataPoints];
        newData[index][field] = val;
        setDataPoints(newData);
    };

    const handleInsert = () => {
        if (currentChartData.data.length === 0) {
            alert("Please add at least one data point.");
            return;
        }

        onInsert({
            type: chartType,
            title,
            data: currentChartData.data
        });

        // Reset and close
        setDataPoints([{ name: '', value: '' }]);
        setTitle('');
        setChartType('bar');
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
                                            className={`px - 4 py - 3 rounded - xl border font - bold capitalize transition - all ${chartType === type ? 'bg-bloom-primary border-bloom-primary text-bloom-dark' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'} `}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-bloom-blue uppercase tracking-wider">Data Points</label>
                                <div className="space-y-3">
                                    {dataPoints.map((point, index) => (
                                        <div key={index} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                            <input
                                                type="text"
                                                placeholder="Label"
                                                value={point.name}
                                                onChange={(e) => handlePointChange(index, 'name', e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-bloom-primary transition-colors"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Value"
                                                value={point.value}
                                                onChange={(e) => handlePointChange(index, 'value', e.target.value)}
                                                className="w-28 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-bloom-primary transition-colors"
                                            />
                                            <button
                                                onClick={() => handleRemovePoint(index)}
                                                className="text-red-400 hover:text-red-300 p-3 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-30"
                                                disabled={dataPoints.length === 1}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddPoint}
                                    className="mt-4 text-sm font-bold text-bloom-primary hover:text-white flex items-center gap-2 transition-colors"
                                >
                                    <Plus size={18} /> Add Point
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
