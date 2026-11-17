'use client';

import React from 'react';

export default function AdminEnquiriesPage() {
  const enquiries = [
    {
      id: 'ENQ-9041',
      name: 'P. Vignesh',
      phone: '+91 98412 34567',
      program: 'NEET 2-Year Intensive (Class 11)',
      location: 'Anna Nagar, Chennai',
      message: 'Looking for integrated hostel facility and weekend batch details.',
      time: '15 mins ago',
      status: 'Unread',
    },
    {
      id: 'ENQ-9038',
      name: 'R. Ananya & Dr. Raghuram',
      phone: '+91 94441 87654',
      program: 'JEE Advanced Repeaters Batch',
      location: 'Adyar, Chennai',
      message: 'Requested 1-on-1 counseling with Senior Academic Dean.',
      time: '2 hours ago',
      status: 'Contacted',
    },
    {
      id: 'ENQ-9029',
      name: 'M. Mohammed Farhan',
      phone: '+91 98840 44332',
      program: 'Scholastic Olympiad Class IX',
      location: 'T. Nagar, Chennai',
      message: 'Inquiring about diagnostic assessment date and scholarship syllabus.',
      time: 'Yesterday',
      status: 'Scheduled Visit',
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Admissions & Student Enquiries
        </h1>
        <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
          Prospective student submissions, campus visit requests, and academic consultation appointments.
        </p>
      </div>

      <div className="bg-[#0B1735]/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="text-slate-400 uppercase tracking-wider bg-white/5 border-b border-white/10 font-headline">
              <tr>
                <th className="py-3 px-4">Candidate / Parent</th>
                <th className="py-3 px-4">Program of Interest</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Student Query</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{e.name}</span>
                    <span className="text-[0.6875rem] text-[#FFB91F]">{e.phone}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-semibold">{e.program}</td>
                  <td className="py-3 px-4 text-slate-400">{e.location}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{e.message}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[0.625rem] font-bold uppercase tracking-wider ${
                        e.status === 'Unread'
                          ? 'bg-rose-500/20 text-rose-300'
                          : e.status === 'Contacted'
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
