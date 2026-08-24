import React, { useState, useEffect } from 'react';
import {
  Wind,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Users,
  Calendar,
  Compass,
  MapPin,
  Clock,
  Car,
  Phone,
  RefreshCw,
  Plus,
  Edit3
} from 'lucide-react';
import { BalloonSlotRosterItem } from '../../types';

interface AdminBalloonLogisticsProps {
  onShowToast: (msg: string) => void;
}

export const AdminBalloonLogistics: React.FC<AdminBalloonLogisticsProps> = ({
  onShowToast,
}) => {
  const [slots, setSlots] = useState<BalloonSlotRosterItem[]>([
    { id: 'bs-1', date: '2026-09-15', provider: 'Royal Balloon Cappadocia (King Class)', totalSlots: 16, bookedSlots: 14, weatherStatus: 'green', pilotAssigned: 'Captain Tolga (2,800 Flight Hours)', takeoffValley: 'Rose Valley' },
    { id: 'bs-2', date: '2026-09-16', provider: 'Butterfly Balloons (Deluxe 12-Pax)', totalSlots: 12, bookedSlots: 12, weatherStatus: 'green', pilotAssigned: 'Captain Ali (3,200 Flight Hours)', takeoffValley: 'Love Valley' },
    { id: 'bs-3', date: '2026-09-17', provider: 'Voyager Balloons (Exclusive Basket)', totalSlots: 16, bookedSlots: 8, weatherStatus: 'green', pilotAssigned: 'Captain Mehmet (2,400 Flight Hours)', takeoffValley: 'Goreme National Park' },
    { id: 'bs-4', date: '2026-09-18', provider: 'Royal Balloon Cappadocia (Queen Class)', totalSlots: 14, bookedSlots: 10, weatherStatus: 'yellow', pilotAssigned: 'Captain Burak (1,900 Flight Hours)', takeoffValley: 'Pigeon Valley' },
    { id: 'bs-5', date: '2026-09-19', provider: 'Kapadokya Balloons (Deluxe VIP)', totalSlots: 12, bookedSlots: 4, weatherStatus: 'green', pilotAssigned: 'Captain Hasan (2,100 Flight Hours)', takeoffValley: 'Sword Valley' }
  ]);

  const [chauffeurFleet, setChauffeurFleet] = useState([
    { id: 'fleet-1', vehicle: 'Mercedes-Benz Sprinter Extra-Long VIP (2025)', plate: '34 STT 901', driver: 'Ahmet Karaca', phone: '+90 532 111 2233', location: 'Cappadocia Base (Urgup)', status: 'On Route / Hotel Pickups' },
    { id: 'fleet-2', vehicle: 'Mercedes-Benz Vito Maybach Edition (2024)', plate: '34 STT 902', driver: 'Emre Sonmez', phone: '+90 532 222 3344', location: 'Istanbul VIP (IST Airport)', status: 'Standby / VIP Meet & Greet' },
    { id: 'fleet-3', vehicle: 'Mercedes-Benz Sprinter Deluxe (2024)', plate: '35 STT 903', driver: 'Mustafa Celik', phone: '+90 532 333 4455', location: 'Izmir / Ephesus Riviera', status: 'Active Tour / Sirince Valley' },
    { id: 'fleet-4', vehicle: 'Mercedes-Benz Vito Tourer VIP', plate: '07 STT 904', driver: 'Okan Yildiz', phone: '+90 532 444 5566', location: 'Antalya / Bodrum Coast', status: 'Available' },
  ]);

  const handleUpdateWeatherFlag = (slotId: string, flag: 'green' | 'yellow' | 'red') => {
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, weatherStatus: flag } : s));
    onShowToast(`Flight slot permit updated to ${flag.toUpperCase()} flag.`);
  };

  const handleBookSlot = (slotId: string, delta: number) => {
    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        const next = Math.max(0, Math.min(s.totalSlots, s.bookedSlots + delta));
        return { ...s, bookedSlots: next };
      }
      return s;
    }));
    onShowToast('Balloon basket allocation adjusted.');
  };

  return (
    <div className="space-y-6">
      {/* Cappadocia Balloon Overview Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 rounded-2xl p-6 sm:p-7 shadow-xs border border-amber-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                Cappadocia Flight Control
              </span>
              <span className="text-xs font-bold text-slate-900">SHGM Civil Aviation Authority Certified</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
              Hot Air Balloon Quotas &amp; VIP Fleet Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-900 mt-1 max-w-2xl font-medium">
              Real-time basket reservations across premier operators, weather evaluation monitors, and dedicated Mercedes VIP fleet chauffeurs.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-white/60 text-xs space-y-1 text-slate-900">
            <div className="flex justify-between gap-4 font-bold">
              <span>Allocated Quota:</span>
              <span className="font-mono font-bold">70 Seats / Day</span>
            </div>
            <div className="flex justify-between gap-4 font-bold text-emerald-800">
              <span>Reserved by Guests:</span>
              <span className="font-mono">48 Seats (68%)</span>
            </div>
            <div className="flex justify-between gap-4 font-bold text-amber-900">
              <span>Available Inventory:</span>
              <span className="font-mono">22 Seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Slots Roster Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Daily Sunrise Balloon Flight Roster</h3>
            <p className="text-xs text-slate-500">Official TÜRSAB guaranteed takeoff slots</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Green (Clear)</span>
            <span className="flex items-center gap-1 ml-2"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Yellow (Standby)</span>
            <span className="flex items-center gap-1 ml-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Red (Refunded)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Flight Date</th>
                <th className="py-3 px-4">Aviation Partner &amp; Basket</th>
                <th className="py-3 px-4">Takeoff Valley</th>
                <th className="py-3 px-4">Senior Pilot</th>
                <th className="py-3 px-4">Capacity / Booked</th>
                <th className="py-3 px-4">Weather Status</th>
                <th className="py-3 px-4 text-right">Adjust Seats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slots.map((slot) => {
                const available = slot.totalSlots - slot.bookedSlots;
                const isFull = available === 0;
                return (
                  <tr key={slot.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {slot.date}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <div>{slot.provider}</div>
                      <span className="text-[10px] text-slate-500">Deluxe 60-75 min sunrise flight</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {slot.takeoffValley}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {slot.pilotAssigned}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">
                        {slot.bookedSlots} / {slot.totalSlots} Seats
                      </div>
                      <div className={`text-[10px] font-bold ${isFull ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {isFull ? 'SOLD OUT' : `${available} seats remaining`}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateWeatherFlag(slot.id, 'green')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                            slot.weatherStatus === 'green'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateWeatherFlag(slot.id, 'yellow')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                            slot.weatherStatus === 'yellow'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          Standby
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateWeatherFlag(slot.id, 'red')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                            slot.weatherStatus === 'red'
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          Red
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          disabled={slot.bookedSlots <= 0}
                          onClick={() => handleBookSlot(slot.id, -1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          disabled={slot.bookedSlots >= slot.totalSlots}
                          onClick={() => handleBookSlot(slot.id, 1)}
                          className="w-6 h-6 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chauffeur VIP Mercedes Fleet Dispatch */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">VIP Private Chauffeur &amp; Vehicle Roster</h3>
            <p className="text-xs text-slate-500">Dedicated Mercedes-Benz Sprinter &amp; Vito Maybach fleet</p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
            4 Active VIP Units
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {chauffeurFleet.map((fleet) => (
            <div key={fleet.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-amber-600" />
                    <span>{fleet.vehicle}</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 mt-0.5">{fleet.plate}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {fleet.status}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Chauffeur:</span>
                  <span className="font-semibold text-slate-800">{fleet.driver}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Current Region:</span>
                  <span className="font-semibold text-slate-800">{fleet.location}</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <a
                  href={`tel:${fleet.phone.replace(/[^0-9]/g, '')}`}
                  className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 text-[11px]"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {fleet.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
