import React, { useState, useEffect } from 'react';
import { UserPlus, CreditCard, AlertCircle, TrendingUp, Zap } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityEvent {
  id: string;
  type: 'signup' | 'payment' | 'churn' | 'upgrade' | 'alert';
  message: string;
  detail: string;
  time: Date;
}

const EVENTS: Omit<ActivityEvent, 'id' | 'time'>[] = [
  { type: 'payment', message: 'Payment received', detail: '$2,400 from Acme Corp' },
  { type: 'signup', message: 'New enterprise signup', detail: 'Priya Patel — initech.io' },
  { type: 'upgrade', message: 'Plan upgrade', detail: 'Free → Pro · leon.kim@hooli.io' },
  { type: 'payment', message: 'Payment received', detail: '$99 from globex.io' },
  { type: 'churn', message: 'Cancellation', detail: 'ingrid.andersen@piedpiper.io' },
  { type: 'signup', message: 'New user signup', detail: 'Aria Chen — acme.io' },
  { type: 'upgrade', message: 'Plan upgrade', detail: 'Pro → Enterprise · omar.hassan@globex.io' },
  { type: 'alert', message: 'High churn alert', detail: '5 cancellations in last hour' },
];

const iconMap = {
  signup: { icon: UserPlus, color: 'text-emerald-400', bg: 'dark:bg-emerald-950/60 bg-emerald-50' },
  payment: { icon: CreditCard, color: 'text-cyan-400', bg: 'dark:bg-cyan-950/60 bg-cyan-50' },
  churn: { icon: AlertCircle, color: 'text-red-400', bg: 'dark:bg-red-950/60 bg-red-50' },
  upgrade: { icon: TrendingUp, color: 'text-purple-400', bg: 'dark:bg-purple-950/60 bg-purple-50' },
  alert: { icon: Zap, color: 'text-amber-400', bg: 'dark:bg-amber-950/60 bg-amber-50' },
};

export const ActivityFeed: React.FC = () => {
  const [events, setEvents] = useState<ActivityEvent[]>(() =>
    EVENTS.slice(0, 5).map((e, i) => ({
      ...e,
      id: `evt_${i}`,
      time: new Date(Date.now() - i * 180000),
    }))
  );
  const [isLive, setIsLive] = useState(true);
  const counterRef = React.useRef(EVENTS.length);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const template = EVENTS[counterRef.current % EVENTS.length];
      counterRef.current++;
      const newEvent: ActivityEvent = {
        ...template,
        id: `evt_${Date.now()}`,
        time: new Date(),
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 12));
    }, 4000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200
      dark:bg-slate-900 bg-white p-5 sm:p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-semibold dark:text-white text-slate-900">
            Live Activity
          </h2>
          <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5 font-mono">
            Real-time event stream
          </p>
        </div>
        <button
          onClick={() => setIsLive(l => !l)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium
            transition-colors border
            ${isLive
              ? 'dark:bg-emerald-950/40 bg-emerald-50 dark:text-emerald-400 text-emerald-700 dark:border-emerald-900/40 border-emerald-200'
              : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500 dark:border-slate-700 border-slate-200'
            }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
          {isLive ? 'LIVE' : 'PAUSED'}
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {events.map((event, i) => {
          const { icon: Icon, color, bg } = iconMap[event.type];
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: i === 0 ? '0ms' : undefined }}
            >
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${bg}`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium dark:text-slate-300 text-slate-600">
                  {event.message}
                </p>
                <p className="text-xs dark:text-slate-500 text-slate-400 font-mono truncate">
                  {event.detail}
                </p>
              </div>
              <span className="text-xs font-mono dark:text-slate-600 text-slate-400 flex-shrink-0 tabular-nums">
                {format(event.time, 'HH:mm:ss')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
