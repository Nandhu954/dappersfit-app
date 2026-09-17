import React from 'react';
import { MapPin, Truck, Wallet, FileText, CheckCircle2, RotateCw, RefreshCw, X, Loader2, ArrowRight } from 'lucide-react';
import { Order } from '../types';

export default function MobileOrderCard({
  order,
  processingOrderIds,
  onCheckServiceability,
  onGenerateLabel,
  onGenerateInvoice,
  onCancelShipment,
  onRefreshTrack,
  onShowWhatsApp,
  isThisDownloaded
}: any) {
  const isProcessing = processingOrderIds.includes(order.id);

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'ready to ship': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'shipped': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cancelled': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="bg-[#1c1b1a] border border-[#2a2826] rounded-xl p-4 shadow-xl mb-3 relative overflow-hidden transition-all hover:border-[#b8862f]/50 mx-2">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-[#b8862f] font-mono font-bold text-[11px] tracking-wider uppercase">Order #{order.orderNumber}</span>
          <div className="text-white font-bold text-sm mt-0.5 tracking-tight">{order.customerName}</div>
          <div className="text-xs text-slate-400 mt-1">{order.date}</div>
        </div>
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
          {order.status}
        </div>
      </div>

      {/* Logistics Journey Diagram */}
      <div className="flex items-center gap-2 mb-4 bg-black/30 rounded-lg p-3 border border-white/5 relative">
        {/* Origin */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Warehouse</span>
          </div>
          <div className="text-white text-xs font-bold truncate">Delhi, IND</div>
        </div>
        
        {/* Connection line */}
        <div className="flex flex-col items-center justify-center flex-1 relative px-1">
          <div className="w-full h-px bg-slate-700 absolute top-1/2 -translate-y-1/2"></div>
          <div className="w-6 h-6 rounded-full bg-[#1c1b1a] border border-slate-700 z-10 flex items-center justify-center">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <span className="text-[8px] text-slate-400 mt-1 tracking-widest uppercase font-mono max-w-[50px] truncate text-center">
            {order.courier_name || 'PENDING'}
          </span>
        </div>

        {/* Destination */}
        <div className="flex-1 text-right overflow-hidden">
          <div className="flex items-center justify-end gap-1.5 text-slate-400 mb-1">
            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Delivery</span>
          </div>
          <div className="text-white text-xs font-bold truncate">{order.city || 'Unknown'}, {order.state}</div>
        </div>
      </div>

      {/* AWB info if available */}
      {order.awb_code && (
        <div className="mb-3 px-3 py-1.5 bg-white/5 rounded flex justify-between items-center border border-white/10">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Tracking AWB</span>
          <span className="text-xs font-mono font-bold text-sky-400">{order.awb_code}</span>
        </div>
      )}

      {/* Footer details */}
      <div className="flex justify-between items-center text-xs border-t border-slate-800 pt-3">
        <div className="flex items-center gap-2">
          <Wallet className="w-3.5 h-3.5 text-slate-400" />
          <span className={order.paymentMethod === 'Prepaid' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
            {order.paymentMethod}
          </span>
        </div>
        <div className="font-mono font-bold text-white text-sm">?{order.amount}</div>
      </div>

      {/* Action Buttons Container */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2">
        {order.status === 'NEW' && (
          <button
            onClick={() => onCheckServiceability(order)}
            disabled={isProcessing}
            className="flex-1 bg-white text-black text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-200"
          >
            {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
            Ship Now
          </button>
        )}
        
        {['READY TO SHIP', 'SHIPPED'].includes(order.status) && (
          <button
            onClick={() => onGenerateLabel(order.id)}
            disabled={isProcessing}
            className={`flex-1 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 border transition
              ${isThisDownloaded 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-indigo-500 text-white border-indigo-400'}`}
          >
            {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
            {isThisDownloaded ? 'Reprint' : 'Print Label'}
          </button>
        )}

        {order.status === 'SHIPPED' && (
          <button
            onClick={() => onRefreshTrack(order.id)}
            disabled={isProcessing}
            className="px-3 bg-slate-800 text-slate-300 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 border border-slate-700"
          >
            {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          </button>
        )}
        
        {['READY TO SHIP', 'SHIPPED'].includes(order.status) && (
          <button
            onClick={() => onCancelShipment(order.id)}
            disabled={isProcessing}
            className="px-3 bg-rose-500/10 text-rose-400 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 border border-rose-500/20"
          >
            {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
          </button>
        )}
      </div>
    </div>
  );
}
