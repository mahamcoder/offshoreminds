import React from 'react';
import {
  Sparkles, Shield, Cpu, TrendingUp, CheckCircle, Layers, Users,
  Briefcase, DollarSign, BarChart2, Zap, Globe, Clock, Award,
  FileText, Activity, Target, Search, Compass, Building, Building2,
  Database, Lock, Settings, Rocket, Heart, ArrowRight, MessageSquare,
  HelpCircle, Star, Phone, Mail, MapPin, ChevronRight, Check,
  ExternalLink, Play, Lightbulb, Code, BookOpen
} from 'lucide-react';

export const ICON_MAP = {
  Sparkles, Shield, Cpu, TrendingUp, CheckCircle, Layers, Users,
  Briefcase, DollarSign, BarChart2, Zap, Globe, Clock, Award,
  FileText, Activity, Target, Search, Compass, Building, Building2,
  Database, Lock, Settings, Rocket, Heart, ArrowRight, MessageSquare,
  HelpCircle, Star, Phone, Mail, MapPin, ChevronRight, Check,
  ExternalLink, Play, Lightbulb, Code, BookOpen
};

export const POPULAR_ICONS = [
  'Sparkles', 'Shield', 'Cpu', 'TrendingUp', 'CheckCircle', 'Layers',
  'Users', 'Briefcase', 'DollarSign', 'BarChart2', 'Zap', 'Globe',
  'Clock', 'Award', 'Target', 'Rocket', 'Building2', 'Lightbulb'
];

export const renderIcon = (name, className = "w-5 h-5", defaultIcon = 'Sparkles') => {
  const IconComponent = ICON_MAP[name] || ICON_MAP[defaultIcon] || Sparkles;
  return <IconComponent className={className} />;
};
