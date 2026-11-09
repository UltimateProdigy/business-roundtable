"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Handshake,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  MessageSquare,
  Search,
  LogOut,
  RefreshCw,
  Phone,
  Mail,
  Filter,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Crown,
} from "lucide-react";
import { addToast } from "@/app/components/ToastWrapper";
import { supabase } from "@/lib/supabase";
import { downloadExcelFile } from "@/lib/exportExcel";

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
  const [passFilter, setPassFilter] = useState<
    "all" | "standard" | "partner_pending" | "partner_paid"
  >("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const handleTogglePaymentStatus = async (
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
        title: nextStatus === "paid" ? "Payment Confirmed! 💰" : "Marked as Pending",
        description:
          nextStatus === "paid"
            ? "Sponsor / Partner payment has been confirmed."
            : "Payment status has been reverted to pending.",
        color: nextStatus === "paid" ? "success" : "warning",
      });
    } catch (err) {
      console.error(err);
      addToast({
        title: "Update Failed",
        description: "Could not update payment status in Supabase.",
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
        title: "Partner Status Updated",
        description: `Status updated to ${nextStatus.toUpperCase()}.`,
        color: "success",
      });
    } catch (err) {
      console.error(err);
      addToast({
        title: "Update Failed",
        description: "Could not update sponsor status in Supabase.",
        color: "danger",
      });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const exportToExcel = (type: "attendees" | "sponsors") => {
    const dateStamp = new Date().toISOString().slice(0, 10);

    if (type === "attendees") {
      const headers = [
        "Full Name",
        "Business Name",
        "Sector / Industry",
        "Business Role",
        "Email Address",
        "WhatsApp Phone",
        "Pass / Package Type",
        "Amount (NGN)",
        "Payment Status",
        "Registration Date",
      ];
      const rows = attendees.map((row) => [
        row.name,
        row.business_name,
        row.industry,
        row.business_role,
        row.email,
        row.phone,
        row.pass_type === "vip"
          ? row.expectations || "Sponsor / Partner"
          : "Free Attendance",
        row.amount || 0,
        row.pass_type === "vip" ? row.payment_status.toUpperCase() : "FREE",
        new Date(row.created_at).toLocaleDateString(),
      ]);

      downloadExcelFile(
        "Registrations",
        headers,
        rows,
        `ibadan_roundtable_registrations_${dateStamp}.xlsx`
      );

      addToast({
        title: "Excel File Exported!",
        description: `Downloaded ${attendees.length} registration records as .xlsx`,
        color: "success",
      });
    } else {
      const headers = [
        "Company / Brand Name",
        "Contact Person",
        "Email Address",
        "WhatsApp Phone",
        "Selected Tier",
        "Status",
        "Notes / Message",
        "Inquiry Date",
      ];
      const rows = sponsors.map((row) => [
        row.company_name,
        row.contact_name,
        row.email,
        row.phone,
        row.tier,
        row.status.toUpperCase(),
        row.message || "",
        new Date(row.created_at).toLocaleDateString(),
      ]);

      downloadExcelFile(
        "Sponsors",
        headers,
        rows,
        `ibadan_roundtable_sponsors_${dateStamp}.xlsx`
      );

      addToast({
        title: "Excel File Exported!",
        description: `Downloaded ${sponsors.length} sponsor records as .xlsx`,
        color: "success",
      });
    }
  };

  const totalAttendees = attendees.length;
  const totalVip = attendees.filter((a) => a.pass_type === "vip").length;
  const paidVip = attendees.filter((a) => a.payment_status === "paid").length;
  const totalVerifiedRevenue = attendees
    .filter((a) => a.payment_status === "paid")
    .reduce((sum, a) => sum + (a.amount || 0), 0);
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
    if (passFilter === "partner_pending")
      return matchesSearch && item.pass_type === "vip" && item.payment_status === "pending";
    if (passFilter === "partner_paid")
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

  // Reset to page 1 when filters, search, or active tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, passFilter, activeTab, pageSize]);

  const totalItems =
    activeTab === "attendees" ? filteredAttendees.length : filteredSponsors.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedAttendees = filteredAttendees.slice(startIndex, endIndex);
  const paginatedSponsors = filteredSponsors.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <img
            src="/tec-ibadan-icon.png"
            alt="The Elevation Church Ibadan Logo"
            className="w-9 h-9 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-sm text-white tracking-tight">
              Ibadan <span className="text-primary">Business</span>
            </span>
            <span className="flex items-center gap-1 mt-0.5">
              <span className="w-2.5 h-[2px] rounded-full bg-secondary" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-secondary">
                Roundtable
              </span>
            </span>
          </div>
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
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/tec-ibadan-icon.png"
                alt="The Elevation Church Ibadan Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-white tracking-tight">
                  Ibadan <span className="text-primary">Business</span>
                </span>
                <span className="flex items-center gap-1.5 mt-1">
                  <span className="w-3 h-[2px] rounded-full bg-secondary" />
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-secondary">
                    Roundtable
                  </span>
                </span>
              </div>
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
                <Users
                  size={17}
                  className={activeTab === "attendees" ? "text-secondary" : ""}
                />
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
                <Handshake
                  size={17}
                  className={activeTab === "sponsors" ? "text-secondary" : ""}
                />
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
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {activeTab === "attendees"
                  ? "Registered Business Owners"
                  : "Sponsorship & Partner Leads"}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                {activeTab === "attendees"
                  ? "Manage Ibadan Business Roundtable attendees, companies, and partnership payment confirmations."
                  : "Track corporate sponsors, exhibition inquiries, and partnership status."}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-800 cursor-pointer transition-colors"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
              <button
                onClick={() => exportToExcel(activeTab)}
                className="inline-flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                <FileSpreadsheet size={15} />
                Export Excel (.xlsx)
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
                <span className="text-[11px] font-semibold uppercase">Sponsor / Partners</span>
                <Crown size={16} className="text-secondary" />
              </div>
              <p className="text-2xl font-bold text-white">{totalVip}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">₦10k – ₦100k packages</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase">Confirmed Paid</span>
                <CheckCircle2 size={16} className="text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-400">{paidVip}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ₦{totalVerifiedRevenue.toLocaleString()} confirmed
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
                      e.target.value as
                        | "all"
                        | "standard"
                        | "partner_pending"
                        | "partner_paid"
                    )
                  }
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5"
                >
                  <option value="all">All Registrations</option>
                  <option value="standard">Free Attendance</option>
                  <option value="partner_pending">🟡 Pending Payment</option>
                  <option value="partner_paid">🟢 Confirmed Paid</option>
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
                      <th className="px-5 py-4 whitespace-nowrap">Business Owner</th>
                      <th className="px-5 py-4 whitespace-nowrap">Company & Sector</th>
                      <th className="px-5 py-4 whitespace-nowrap">WhatsApp Phone</th>
                      <th className="px-5 py-4 whitespace-nowrap">Pass Type</th>
                      <th className="px-5 py-4 whitespace-nowrap">Status</th>
                      <th className="px-5 py-4 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {paginatedAttendees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          {loading
                            ? "Loading business registrations..."
                            : "No business registrations found yet."}
                        </td>
                      </tr>
                    ) : (
                      paginatedAttendees.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-800/40 transition-colors align-middle"
                        >
                          <td className="px-5 py-4 whitespace-nowrap">
                            <p className="font-bold text-white text-sm sm:text-base">
                              {row.name}
                            </p>
                            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <Mail size={12} className="flex-shrink-0" />
                              <span>{row.email}</span>
                            </p>
                          </td>

                          <td className="px-5 py-4 min-w-[200px]">
                            <p className="font-semibold text-secondary">
                              {row.business_name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {row.industry}
                            </p>
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${row.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-green-400 hover:underline font-mono text-xs font-semibold"
                            >
                              <Phone size={12} className="flex-shrink-0" />
                              <span>{row.phone}</span>
                            </a>
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            {row.pass_type === "vip" ? (
                              <span className="inline-flex items-center bg-secondary/15 text-secondary border border-secondary/35 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                {row.expectations ||
                                  `Partner (₦${(row.amount || 0).toLocaleString()})`}
                              </span>
                            ) : (
                              <span className="inline-flex items-center bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                Free Attendance
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            {row.pass_type === "vip" ? (
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                  row.payment_status === "paid"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                                }`}
                              >
                                {row.payment_status === "paid" ? (
                                  <CheckCircle2 size={12} className="flex-shrink-0" />
                                ) : (
                                  <Clock size={12} className="flex-shrink-0" />
                                )}
                                <span>
                                  {row.payment_status === "paid" ? "Paid" : "Pending"}
                                </span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-green-400 font-semibold whitespace-nowrap">
                                <CheckCircle2 size={12} className="flex-shrink-0" />
                                Confirmed (Free)
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              {row.pass_type === "vip" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleTogglePaymentStatus(
                                      row.id,
                                      row.payment_status
                                    )
                                  }
                                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                    row.payment_status === "paid"
                                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                                      : "bg-primary hover:bg-primary-dark text-white shadow-sm shadow-primary/20"
                                  }`}
                                >
                                  {row.payment_status === "paid"
                                    ? "Mark Pending"
                                    : "Confirm Payment"}
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
                                className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                              >
                                <MessageSquare size={13} className="flex-shrink-0" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
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
                      <th className="px-5 py-4 whitespace-nowrap">Company / Brand</th>
                      <th className="px-5 py-4 whitespace-nowrap">Contact Person</th>
                      <th className="px-5 py-4 whitespace-nowrap">Selected Package</th>
                      <th className="px-5 py-4 whitespace-nowrap">Status</th>
                      <th className="px-5 py-4 text-right whitespace-nowrap">Follow Up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {paginatedSponsors.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          {loading
                            ? "Loading sponsor inquiries..."
                            : "No sponsor inquiries recorded yet."}
                        </td>
                      </tr>
                    ) : (
                      paginatedSponsors.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-800/40 transition-colors align-middle"
                        >
                          <td className="px-5 py-4 whitespace-nowrap">
                            <p className="font-bold text-white text-base">
                              {row.company_name}
                            </p>
                            {row.message && (
                              <p className="text-xs text-slate-400 mt-0.5 max-w-xs truncate">
                                {row.message}
                              </p>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <p className="font-semibold text-slate-200">
                              {row.contact_name}
                            </p>
                            <p className="text-xs text-slate-400">{row.email}</p>
                            <p className="text-xs text-green-400 font-mono">{row.phone}</p>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center bg-secondary/15 text-secondary border border-secondary/35 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                              {row.tier}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <select
                              value={row.status}
                              onChange={(e) =>
                                handleUpdateSponsorStatus(
                                  row.id,
                                  e.target.value as "new" | "contacted" | "confirmed"
                                )
                              }
                              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 cursor-pointer"
                            >
                              <option value="new">🟡 New Inquiry</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="confirmed">🟢 Confirmed Partner</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            <a
                              href={`https://wa.me/${row.phone.replace(
                                /[^0-9]/g,
                                ""
                              )}?text=${encodeURIComponent(
                                `Hello ${row.contact_name}, thank you for your interest in sponsoring the Ibadan Business Roundtable (${row.tier}) with ${row.company_name}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap"
                            >
                              <MessageSquare size={13} className="flex-shrink-0" />
                              <span>Chat Sponsor</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Footer Bar */}
            {totalItems > 0 && (
              <div className="px-5 py-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span>
                    Showing{" "}
                    <strong className="text-white">{startIndex + 1}</strong> to{" "}
                    <strong className="text-white">{endIndex}</strong> of{" "}
                    <strong className="text-white">{totalItems}</strong> entries
                  </span>
                  <div className="flex items-center gap-1.5 ml-2">
                    <span>Rows:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors font-semibold"
                  >
                    <ChevronLeft size={14} />
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - safePage) <= 1
                    )
                    .map((page, index, arr) => {
                      const prevPage = arr[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      return (
                        <span key={page} className="inline-flex items-center gap-1.5">
                          {showEllipsis && (
                            <span className="px-1 text-slate-600">…</span>
                          )}
                          <button
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg font-bold transition-colors cursor-pointer ${
                              page === safePage
                                ? "bg-primary text-white shadow-sm shadow-primary/30"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors font-semibold"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
