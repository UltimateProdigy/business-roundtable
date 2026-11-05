"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Handshake,
  CheckCircle2,
  Clock,
  Download,
  MessageSquare,
  Search,
  LogOut,
  RefreshCw,
  Phone,
  Mail,
  Filter,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Menu,
  X,
  Crown,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import { supabase } from "@/lib/supabase";

interface AttendeeRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  industry: string;
  business_role: string;
  pass_type: "standard" | "vip";
  amount: number;
  payment_status: "free" | "pending" | "paid";
  expectations?: string;
  created_at: string;
}

interface SponsorInquiry {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  tier: string;
  message?: string;
  status: "new" | "contacted" | "confirmed";
  created_at: string;
}

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<"attendees" | "sponsors">("attendees");
  const [attendees, setAttendees] = useState<AttendeeRegistration[]>([]);
  const [sponsors, setSponsors] = useState<SponsorInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [passFilter, setPassFilter] = useState<"all" | "standard" | "vip_pending" | "vip_paid">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: regData, error: regError } = await supabase
        .from("roundtable_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!regError && regData) {
        setAttendees(regData as AttendeeRegistration[]);
      }

      const { data: sponsorData, error: spError } = await supabase
        .from("sponsor_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!spError && sponsorData) {
        setSponsors(sponsorData as SponsorInquiry[]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      addToast({
        title: "Connection Notice",
        description: "Configure your Supabase keys in .env.local to load live rows.",
        color: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleVipPayment = async (
    id: string,
    currentStatus: "free" | "pending" | "paid"
  ) => {
    const nextStatus = currentStatus === "paid" ? "pending" : "paid";
    try {
      const { error } = await supabase
        .from("roundtable_registrations")
        .update({ payment_status: nextStatus })
        .eq("id", id);

      if (error) throw error;

      setAttendees((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, payment_status: nextStatus } : item
        )
      );

      addToast({
        title: nextStatus === "paid" ? "VIP Payment Verified! 💰" : "Marked as Pending",
        description: `VIP Pass status updated to ${nextStatus}.`,
        color: nextStatus === "paid" ? "success" : "default",
      });
    } catch (err) {
      console.error(err);
      addToast({
        title: "Update failed",
        description: "Could not update status in Supabase.",
        color: "danger",
      });
    }
  };

  const handleUpdateSponsorStatus = async (
    id: string,
    nextStatus: "new" | "contacted" | "confirmed"
  ) => {
    try {
      const { error } = await supabase
        .from("sponsor_inquiries")
        .update({ status: nextStatus })
        .eq("id", id);

      if (error) throw error;

      setSponsors((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
      );

      addToast({
        title: "Sponsor Status Updated",
        description: `Marked as ${nextStatus.toUpperCase()}.`,
        color: "success",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const exportToCSV = (type: "attendees" | "sponsors") => {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (type === "attendees") {
      csvContent +=
        "ID,Name,Business Name,Industry,Role,Email,Phone,Pass Type,Amount,Payment Status,Date\n";
      attendees.forEach((row) => {
        csvContent += `"${row.id}","${row.name}","${row.business_name}","${row.industry}","${row.business_role}","${row.email}","${row.phone}","${row.pass_type}","${row.amount}","${row.payment_status}","${new Date(
          row.created_at
        ).toLocaleDateString()}"\n`;
      });
    } else {
      csvContent +=
        "ID,Company Name,Contact Person,Email,Phone,Tier,Status,Message,Date\n";
      sponsors.forEach((row) => {
        csvContent += `"${row.id}","${row.company_name}","${row.contact_name}","${row.email}","${row.phone}","${row.tier}","${row.status}","${
          row.message || ""
        }","${new Date(row.created_at).toLocaleDateString()}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `ibadan_roundtable_${type}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalAttendees = attendees.length;
  const totalVip = attendees.filter((a) => a.pass_type === "vip").length;
  const paidVip = attendees.filter((a) => a.payment_status === "paid").length;
  const totalSponsors = sponsors.length;

  const filteredAttendees = attendees.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.business_name.toLowerCase().includes(q) ||
      item.industry.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.includes(searchQuery);

    if (passFilter === "standard") return matchesSearch && item.pass_type === "standard";
    if (passFilter === "vip_pending")
      return matchesSearch && item.pass_type === "vip" && item.payment_status === "pending";
    if (passFilter === "vip_paid")
      return matchesSearch && item.pass_type === "vip" && item.payment_status === "paid";
    return matchesSearch;
  });

  const filteredSponsors = sponsors.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.company_name.toLowerCase().includes(q) ||
      item.contact_name.toLowerCase().includes(q) ||
      item.tier.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <img
            src="/vantage-icon-clean.png"
            alt="Vantage Forum"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-base text-primary">Vantage</span>
          <span className="font-bold text-xs text-secondary uppercase">Forum</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-6 border-b border-slate-800 hidden md:block">
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src="/vantage-logo-clean.png"
                alt="Vantage Forum"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-2">
              Secretariat Control Center
            </p>
          </div>

          <div className="p-4 space-y-1.5">
            <button
              onClick={() => {
                setActiveTab("attendees");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === "attendees"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users size={17} className={activeTab === "attendees" ? "text-secondary" : ""} />
                Business Registrations
              </span>
              <span className="text-xs bg-white/15 px-2 py-0.5 rounded-full font-bold">
                {attendees.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("sponsors");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === "sponsors"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Handshake size={17} className={activeTab === "sponsors" ? "text-secondary" : ""} />
                Sponsor Inquiries
              </span>
              <span className="text-xs bg-white/15 px-2 py-0.5 rounded-full font-bold">
                {sponsors.length}
              </span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              View Event Website
            </span>
            <ChevronRight size={14} />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition cursor-pointer"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {activeTab === "attendees"
                  ? "Registered Business Owners"
                  : "Sponsorship & Partner Leads"}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                {activeTab === "attendees"
                  ? "Manage Ibadan Business Roundtable attendees, companies, and VIP pass verifications."
                  : "Track corporate sponsors, exhibition booth inquiries, and partnership status."}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-800 cursor-pointer"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
              <button
                onClick={() => exportToCSV(activeTab)}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-secondary border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Download size={14} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase">Total Businesses</span>
                <Users size={16} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-white">{totalAttendees}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Registered delegates</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase">VIP / Exhibition</span>
                <Crown size={16} className="text-secondary" />
              </div>
              <p className="text-2xl font-bold text-white">{totalVip}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">₦25,000 pass requests</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase">Confirmed VIP Paid</span>
                <CheckCircle2 size={16} className="text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-400">{paidVip}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ₦{(paidVip * 25000).toLocaleString()} verified
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase">Sponsor Leads</span>
                <Handshake size={16} className="text-secondary" />
              </div>
              <p className="text-2xl font-bold text-secondary">{totalSponsors}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Partner applications</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search size={15} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === "attendees"
                    ? "Search founder name, business name, sector, phone..."
                    : "Search sponsor company, contact person, tier..."
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {activeTab === "attendees" && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter size={15} className="text-slate-400" />
                <select
                  value={passFilter}
                  onChange={(e) =>
                    setPassFilter(
                      e.target.value as "all" | "standard" | "vip_pending" | "vip_paid"
                    )
                  }
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5"
                >
                  <option value="all">All Passes</option>
                  <option value="standard">Standard Free Pass</option>
                  <option value="vip_pending">🟡 VIP Pending Payment</option>
                  <option value="vip_paid">🟢 VIP Paid Verified</option>
                </select>
              </div>
            )}
          </div>

          {/* Data Table */}
          <div className="mt-6 bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {activeTab === "attendees" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Business Owner</th>
                      <th className="px-6 py-4">Company & Sector</th>
                      <th className="px-6 py-4">WhatsApp Phone</th>
                      <th className="px-6 py-4">Pass Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredAttendees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          {loading
                            ? "Loading business registrations..."
                            : "No business registrations found yet."}
                        </td>
                      </tr>
                    ) : (
                      filteredAttendees.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-white text-base">{row.name}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail size={12} />
                              {row.email}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-secondary">{row.business_name}</p>
                            <p className="text-xs text-slate-400">
                              {row.industry} · {row.business_role}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={`https://wa.me/${row.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-green-400 hover:underline font-mono text-xs font-semibold"
                            >
                              <Phone size={12} />
                              {row.phone}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            {row.pass_type === "vip" ? (
                              <span className="bg-secondary/15 text-secondary border border-secondary/30 px-2.5 py-1 rounded-full text-xs font-bold">
                                VIP Pass (₦25,000)
                              </span>
                            ) : (
                              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-xs">
                                Standard Pass
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {row.pass_type === "vip" ? (
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                  row.payment_status === "paid"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                                }`}
                              >
                                <Clock size={12} />
                                {row.payment_status === "paid" ? "Paid" : "Pending"}
                              </span>
                            ) : (
                              <span className="text-xs text-green-400 font-semibold">
                                Confirmed (Free)
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {row.pass_type === "vip" && (
                              <button
                                onClick={() =>
                                  handleToggleVipPayment(row.id, row.payment_status)
                                }
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary hover:bg-primary-dark text-white cursor-pointer"
                              >
                                {row.payment_status === "paid"
                                  ? "Mark Pending"
                                  : "✓ Verify VIP"}
                              </button>
                            )}
                            <a
                              href={`https://wa.me/${row.phone.replace(
                                /[^0-9]/g,
                                ""
                              )}?text=${encodeURIComponent(
                                `Hello ${row.name}, welcome to the Ibadan Business Roundtable! Confirming your registration for ${row.business_name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                            >
                              <MessageSquare size={13} />
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Sponsors Table */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Company / Brand</th>
                      <th className="px-6 py-4">Contact Person</th>
                      <th className="px-6 py-4">Selected Package</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Follow Up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredSponsors.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          {loading
                            ? "Loading sponsor inquiries..."
                            : "No sponsor inquiries recorded yet."}
                        </td>
                      </tr>
                    ) : (
                      filteredSponsors.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-white text-base">
                              {row.company_name}
                            </p>
                            {row.message && (
                              <p className="text-xs text-slate-400 mt-0.5 max-w-xs truncate">
                                &ldquo;{row.message}&rdquo;
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-200">
                              {row.contact_name}
                            </p>
                            <p className="text-xs text-slate-400">{row.email}</p>
                            <p className="text-xs text-green-400 font-mono">{row.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-secondary/15 text-secondary border border-secondary/30 px-3 py-1 rounded-full text-xs font-bold">
                              {row.tier}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={row.status}
                              onChange={(e) =>
                                handleUpdateSponsorStatus(
                                  row.id,
                                  e.target.value as "new" | "contacted" | "confirmed"
                                )
                              }
                              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5"
                            >
                              <option value="new">🟡 New Inquiry</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="confirmed">🟢 Confirmed Partner</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href={`https://wa.me/${row.phone.replace(
                                /[^0-9]/g,
                                ""
                              )}?text=${encodeURIComponent(
                                `Hello ${row.contact_name}, thank you for your interest in sponsoring the Ibadan Business Roundtable (${row.tier}) with ${row.company_name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                            >
                              <MessageSquare size={13} />
                              Chat Sponsor
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
