import React, { useState } from "react";
import {
  Users, FileText, Briefcase, Tractor, AlertCircle,
  ShoppingBag, Calendar, FileCheck, Image, TrendingUp,
  Eye, Edit, Trash2, CheckCircle, XCircle, Clock,
  Plus, Download, Search, X, Upload, MapPin,
  Feather
} from "lucide-react";

/* ---------------- Stat Card ---------------- */
const StatCard = ({ title, value, icon, trend, color = "bg-latte-peach" }) => {
  return (
    <div className="bg-latte-base rounded-xl p-6 border border-latte-surface0 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} rounded-xl p-3 text-latte-base`}>
          {icon}
        </div>
        {trend && (
          <span className="text-latte-green flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-latte-subtext0 mb-1">{title}</h3>
      <p className="text-latte-text text-3xl">{value}</p>
    </div>
  );
};



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  

const [files, setFiles] = useState([]);


  // Modals
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showIssueCertModal, setShowIssueCertModal] = useState(false);
  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false);

// Mock recent news data
  const recentNews = [
    { id: 1, title: 'Water Supply Schedule Update', category: 'Utility', status: 'Published', date: '2025-12-10', views: 432 },
    { id: 2, title: 'Vaccination Camp Announcement', category: 'Health', status: 'Published', date: '2025-12-09', views: 567 },
    { id: 3, title: 'Road Repair Work Notice', category: 'Infrastructure', status: 'Draft', date: '2025-12-08', views: 0 },
    { id: 4, title: 'Community Meeting Schedule', category: 'General', status: 'Published', date: '2025-12-07', views: 289 },
  ];

  // Mock grievances data
  const recentGrievances = [
    { id: 1, subject: 'Street Light Not Working', category: 'Infrastructure', status: 'Pending', priority: 'High', date: '2025-12-11' },
    { id: 2, subject: 'Water Leakage in Main Road', category: 'Utility', status: 'In Progress', priority: 'Critical', date: '2025-12-10' },
    { id: 3, subject: 'Garbage Collection Issue', category: 'Sanitation', status: 'Pending', priority: 'Medium', date: '2025-12-10' },
    { id: 4, subject: 'Noise Pollution Complaint', category: 'General', status: 'Resolved', priority: 'Low', date: '2025-12-09' },
  ];

  // Mock jobs data
  const recentJobs = [
    { id: 1, title: 'Agricultural Officer', company: 'Krishi Bhavan', applicants: 23, status: 'Active', posted: '2025-12-05' },
    { id: 2, title: 'Primary Teacher', company: 'Village School', applicants: 45, status: 'Active', posted: '2025-12-03' },
    { id: 3, title: 'Healthcare Worker', company: 'PHC Center', applicants: 12, status: 'Closed', posted: '2025-11-28' },
    { id: 4, title: 'Shop Assistant', company: 'Local Store', applicants: 8, status: 'Active', posted: '2025-12-01' },
  ];

  /* ---------------- Stats ---------------- */
  const stats = [
    { title: "Total Users", value: "2,547", icon: <Users className="w-6 h-6" />, trend: "+12%", color: "bg-latte-peach" },
    { title: "News & Announcements", value: "156", icon: <FileText className="w-6 h-6" />, trend: "+8%", color: "bg-latte-blue" },
    { title: "Active Jobs", value: "43", icon: <Briefcase className="w-6 h-6" />, trend: "+15%", color: "bg-latte-green" },
    { title: "Farmers Registered", value: "892", icon: <Tractor className="w-6 h-6" />, trend: "+5%", color: "bg-latte-yellow" },
    { title: "Pending Grievances", value: "27", icon: <AlertCircle className="w-6 h-6" />, color: "bg-latte-red" },
    { title: "Marketplace Items", value: "234", icon: <ShoppingBag className="w-6 h-6" />, trend: "+20%", color: "bg-latte-mauve" },
    { title: "Upcoming Events", value: "12", icon: <Calendar className="w-6 h-6" />, color: "bg-latte-teal" },
    { title: "Certificates Issued", value: "1,089", icon: <FileCheck className="w-6 h-6" />, trend: "+18%", color: "bg-latte-sky" },
  ];

  /* ---------------- Quick Actions (MAP) ---------------- */
  const quickActions = [
    { label: "Add News", icon: FileText, onClick: () => setShowAddNewsModal(true), color: "latte-peach" },
    { label: "Post Job", icon: Briefcase, onClick: () => setShowAddJobModal(true), color: "latte-blue" },
    { label: "Add Event", icon: Calendar, onClick: () => setShowAddEventModal(true), color: "latte-green" },
    { label: "Issue Cert", icon: FileCheck, onClick: () => setShowIssueCertModal(true), color: "latte-yellow" },
    { label: "Upload Photo", icon: Image, onClick: () => setShowUploadPhotoModal(true), color: "latte-mauve" },
    { label: "Export Data", icon: Download, onClick: null, color: "latte-teal" },
  ];


  /* ---------------- Helpers ---------------- */
  const getStatusBadge = (status) => ({
    Published: "bg-latte-green/10 text-latte-green border-latte-green",
    Draft: "bg-latte-yellow/10 text-latte-yellow border-latte-yellow",
    Pending: "bg-latte-yellow/10 text-latte-yellow border-latte-yellow",
    "In Progress": "bg-latte-blue/10 text-latte-blue border-latte-blue",
    Resolved: "bg-latte-green/10 text-latte-green border-latte-green",
    Active: "bg-latte-green/10 text-latte-green border-latte-green",
    Closed: "bg-latte-overlay0/10 text-latte-overlay0 border-latte-overlay0",
  }[status] || "");

  const getPriorityBadge = (priority) => ({
    Critical: "bg-latte-red/10 text-latte-red border-latte-red",
    High: "bg-latte-peach/10 text-latte-peach border-latte-peach",
    Medium: "bg-latte-yellow/10 text-latte-yellow border-latte-yellow",
    Low: "bg-latte-green/10 text-latte-green border-latte-green",
  }[priority] || "");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl text-latte-text mb-2">Admin Dashboard</h1>
        <p className="text-latte-subtext0 mb-8">Manage and monitor all village activities</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Quick Actions */}
        <div className="bg-latte-base rounded-xl p-6 ">
          <h2 className="text-2xl text-latte-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a, i) => {
              const Icon = a.icon;
              return (
                <button
                  key={i}
                  onClick={a.onClick}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl 
                  bg-${a.color}/10 hover:bg-${a.color}/20 text-${a.color} transition`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm">{a.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 mb-6 border-b border-latte-surface0">
          <div className="flex gap-1 overflow-x-auto">
            {['overview', 'news', 'grievances', 'jobs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-latte-peach border-b-2 border-latte-peach'
                    : 'text-latte-subtext0 hover:text-latte-text'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-latte-base rounded-xl p-6 border border-latte-surface0">
                <h3 className="text-latte-text mb-4 text-xl">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New grievance submitted', time: '5 minutes ago', icon: <AlertCircle className="w-5 h-5 text-latte-red" /> },
                    { action: 'News article published', time: '1 hour ago', icon: <FileText className="w-5 h-5 text-latte-blue" /> },
                    { action: 'New job application received', time: '2 hours ago', icon: <Briefcase className="w-5 h-5 text-latte-green" /> },
                    { action: 'Certificate issued', time: '3 hours ago', icon: <FileCheck className="w-5 h-5 text-latte-sky" /> },
                    { action: 'Event created', time: '5 hours ago', icon: <Calendar className="w-5 h-5 text-latte-teal" /> },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-latte-mantle">
                      {activity.icon}
                      <div className="flex-1">
                        <p className="text-latte-text">{activity.action}</p>
                        <p className="text-latte-subtext0 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-latte-base rounded-xl p-6 border border-latte-surface0">
                <h3 className="text-latte-text mb-4 text-xl">System Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-latte-mantle">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-latte-green" />
                      <span className="text-latte-text">Server Status</span>
                    </div>
                    <span className="text-latte-green">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-latte-mantle">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-latte-green" />
                      <span className="text-latte-text">Database</span>
                    </div>
                    <span className="text-latte-green">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-latte-mantle">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-latte-yellow" />
                      <span className="text-latte-text">Last Backup</span>
                    </div>
                    <span className="text-latte-subtext0">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-latte-mantle">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-latte-blue" />
                      <span className="text-latte-text">Active Users</span>
                    </div>
                    <span className="text-latte-text">147</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Management Tab */}
          {activeTab === 'news' && (
            <div className="bg-latte-base rounded-xl border border-latte-surface0">
              {/* Search and Filter Bar */}
              <div className="p-6 border-b border-latte-surface0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-subtext0" />
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text placeholder-latte-subtext0 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                    <button onClick={() => setShowAddNewsModal(true)} className="px-4 py-2 bg-latte-peach text-latte-base rounded-xl hover:bg-latte-peach/90 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add News
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b  border-latte-surface0">
                      <th className="text-left p-4 text-latte-subtext0">Title</th>
                      <th className="text-left p-4 text-latte-subtext0">Category</th>
                      <th className="text-left p-4 text-latte-subtext0">Status</th>
                      <th className="text-left p-4 text-latte-subtext0">Date</th>
                      <th className="text-left p-4 text-latte-subtext0">Views</th>
                      <th className="text-left p-4 text-latte-subtext0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentNews.map((news) => (
                      <tr key={news.id} className="border-b border-latte-surface0 hover:bg-latte-mantle transition-colors">
                        <td className="text-left p-4 text-latte-text">{news.title}</td>
                        <td className="text-left p-4 text-latte-subtext0">{news.category}</td>
                        <td className="text-left p-4">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusBadge(news.status)}`}>
                            {news.status}
                          </span>
                        </td>
                        <td className="text-left p-4 text-latte-subtext0">{news.date}</td>
                        <td className="text-left p-4 text-latte-subtext0">{news.views}</td>
                        <td className="p-4 text-left">
                          <div className="flex gap-2">
                            <button className="p-2 text-latte-blue hover:bg-latte-blue/10 rounded-xl transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-latte-peach hover:bg-latte-peach/10 rounded-xl transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-latte-red hover:bg-latte-red/10 rounded-xl transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 flex items-center justify-between border-t border-latte-surface0">
                <p className="text-latte-subtext0 text-sm">Showing 1-4 of 156 results</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text hover:bg-latte-surface0 transition-colors disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-latte-peach text-latte-base rounded-xl hover:bg-latte-peach/90 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grievances Management Tab */}
          {activeTab === 'grievances' && (
            <div className="bg-latte-base rounded-xl border border-latte-surface0">
              {/* Search and Filter Bar */}
              <div className="p-6 border-b border-latte-surface0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-subtext0" />
                    <input
                      type="text"
                      placeholder="Search grievances..."
                      className="w-full pl-10 pr-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text placeholder-latte-subtext0 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <select className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                      <option value="all">All Priority</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-latte-surface0">
                      <th className="text-left p-4 text-latte-subtext0">ID</th>
                      <th className="text-left p-4 text-latte-subtext0">Subject</th>
                      <th className="text-left p-4 text-latte-subtext0">Category</th>
                      <th className="text-left p-4 text-latte-subtext0">Priority</th>
                      <th className="text-left p-4 text-latte-subtext0">Status</th>
                      <th className="text-left p-4 text-latte-subtext0">Date</th>
                      <th className="text-left p-4 text-latte-subtext0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentGrievances.map((grievance) => (
                      <tr key={grievance.id} className="border-b border-latte-surface0 hover:bg-latte-mantle transition-colors">
                        <td className="p-4 text-left text-latte-text">#{grievance.id}</td>
                        <td className="p-4 text-left text-latte-text">{grievance.subject}</td>
                        <td className="p-4 text-left text-latte-subtext0">{grievance.category}</td>
                        <td className="p-4 text-left">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getPriorityBadge(grievance.priority)}`}>
                            {grievance.priority}
                          </span>
                        </td>
                        <td className="p-4 text-left">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusBadge(grievance.status)}`}>
                            {grievance.status}
                          </span>
                        </td>
                        <td className="p-4 text-left text-latte-subtext0">{grievance.date}</td>
                        <td className="p-4 text-left">
                          <div className="flex gap-2">
                            <button className="p-2 text-latte-blue hover:bg-latte-blue/10 rounded-xl transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-latte-green hover:bg-latte-green/10 rounded-xl transition-colors" title="Mark Resolved">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-latte-red hover:bg-latte-red/10 rounded-xl transition-colors" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 flex items-center justify-between border-t border-latte-surface0">
                <p className="text-latte-subtext0 text-sm">Showing 1-4 of 27 results</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text hover:bg-latte-surface0 transition-colors disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-latte-peach text-latte-base rounded-xl hover:bg-latte-peach/90 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Management Tab */}
          {activeTab === 'jobs' && (
            <div className="bg-latte-base rounded-xl border border-latte-surface0">
              {/* Search and Filter Bar */}
              <div className="p-6 border-b border-latte-surface0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-subtext0" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="w-full pl-10 pr-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text placeholder-latte-subtext0 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button className="px-4 py-2 bg-latte-peach text-latte-base rounded-xl hover:bg-latte-peach/90 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Post Job
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-latte-surface0">
                      <th className="text-left p-4 text-latte-subtext0">Job Title</th>
                      <th className="text-left p-4 text-latte-subtext0">Company</th>
                      <th className="text-left p-4 text-latte-subtext0">Applicants</th>
                      <th className="text-left p-4 text-latte-subtext0">Status</th>
                      <th className="text-left p-4 text-latte-subtext0">Posted</th>
                      <th className="text-left p-4 text-latte-subtext0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="border-b border-latte-surface0 hover:bg-latte-mantle transition-colors">
                        <td className="p-4 text-left text-latte-text">{job.title}</td>
                        <td className="p-4 text-left text-latte-subtext0">{job.company}</td>
                        <td className="p-4 text-left text-latte-text">{job.applicants}</td>
                        <td className="p-4 text-left">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusBadge(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4 text-left text-latte-subtext0">{job.posted}</td>
                        <td className="p-4 text-left">
                          <div className="flex gap-2">
                            <button className="p-2 text-latte-blue hover:bg-latte-blue/10 rounded-xl transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-latte-peach hover:bg-latte-peach/10 rounded-xl transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-latte-red hover:bg-latte-red/10 rounded-xl transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 flex items-center justify-between border-t border-latte-surface0">
                <p className="text-latte-subtext0 text-sm">Showing 1-4 of 43 results</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text hover:bg-latte-surface0 transition-colors disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-latte-peach text-latte-base rounded-xl hover:bg-latte-peach/90 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add News Modal */}
      {showAddNewsModal && (
        <div className="fixed inset-0 bg-latte-crust bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddNewsModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-latte-surface0 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-latte-peach p-2 rounded-xl">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-latte-text text-2xl">Add News Article</h2>
                </div>
                <button onClick={() => setShowAddNewsModal(false)} className="p-1 hover:bg-latte-surface0 rounded transition-colors">
                  <X className="w-5 h-5 text-latte-text" />
                </button>
              </div>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-latte-text mb-2">Title</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Enter news title" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Category</label>
                <select className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                  <option>Administrative</option>
                  <option>Event</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Description</label>
                <textarea rows={6} className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Enter news description"></textarea>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Expiry Date</label>
                <input type="date" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Attachments (Images/PDFs)</label>
                <div className="border-2 border-dashed border-latte-surface0 rounded-xl p-6 text-center hover:border-latte-peach transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-latte-subtext0 mx-auto mb-2" />
                  <p className="text-latte-subtext0">Click to upload or drag and drop</p>
                  <p className="text-latte-subtext1 text-sm mt-1">PNG, JPG or PDF (max. 10MB)</p>
                </div>
              </div>

                <p className="text-latte-text font-medium">
                📌 Pin this News
                </p>
            <div className="flex items-start gap-3 bg-latte-mantle p-4 rounded-xl border border-latte-surface0">
           
            <input
                type="checkbox"
                // checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="mt-1 w-4 h-4 accent-latte-peach"
            />
            <div>
                
                <p className="text-latte-subtext0 text-sm">
                Pinned news always appears at the top for users.
                </p>
            </div>
            </div>

              <div>
                <label className="block text-latte-text mb-2">Status</label>
                <select className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddNewsModal(false)} className="flex-1 px-4 py-2 bg-latte-surface0 text-latte-text rounded-xl hover:bg-latte-surface1 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-latte-peach text-white rounded-xl hover:bg-latte-peach/90 transition-colors">
                  Publish News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-latte-crust bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddJobModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-latte-surface0 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-latte-blue p-2 rounded-xl">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-latte-text text-2xl">Post New Job</h2>
                </div>
                <button onClick={() => setShowAddJobModal(false)} className="p-1 hover:bg-latte-surface0 rounded transition-colors">
                  <X className="w-5 h-5 text-latte-text" />
                </button>
              </div>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-latte-text mb-2">Job Title</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="e.g., Agricultural Officer" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Company/Department</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="e.g., Krishi Bhavan" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-latte-text mb-2">Job Type</label>
                  <select className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-latte-text mb-2">Location</label>
                  <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Village/Area" />
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Job Description</label>
                <textarea rows={5} className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Describe the job role and requirements"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-latte-text mb-2">Salary Range</label>
                  <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="e.g., ₹15,000 - ₹20,000" />
                </div>
                <div>
                  <label className="block text-latte-text mb-2">Application Deadline</label>
                  <input type="date" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" />
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Contact Email</label>
                <input type="email" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="contact@example.com" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddJobModal(false)} className="flex-1 px-4 py-2 bg-latte-surface0 text-latte-text rounded-xl hover:bg-latte-surface1 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-latte-peach text-white rounded-xl hover:bg-latte-peach/90 transition-colors">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-latte-crust bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddEventModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-latte-surface0 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-latte-green p-2 rounded-xl">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-latte-text text-2xl">Add New Event</h2>
                </div>
                <button onClick={() => setShowAddEventModal(false)} className="p-1 hover:bg-latte-surface0 rounded transition-colors">
                  <X className="w-5 h-5 text-latte-text" />
                </button>
              </div>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-latte-text mb-2">Event Name</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Enter event name" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Event Type</label>
                <select className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                  <option>Community Meeting</option>
                  <option>Festival</option>
                  <option>Health Camp</option>
                  <option>Training</option>
                  <option>Cultural</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Description</label>
                <textarea rows={4} className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Event details"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-latte-text mb-2">Start Date & Time</label>
                  <input type="datetime-local" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" />
                </div>
                <div>
                  <label className="block text-latte-text mb-2">End Date & Time</label>
                  <input type="datetime-local" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" />
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Location</label>
                <div className="flex gap-2">
                  <MapPin className="w-5 h-5 text-latte-subtext0 mt-2" />
                  <input type="text" className="flex-1 px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Event venue" />
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Organizer</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Organization/Person name" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Event Banner</label>
                <div className="border-2 border-dashed border-latte-surface0 rounded-xl p-6 text-center hover:border-latte-peach transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-latte-subtext0 mx-auto mb-2" />
                  <p className="text-latte-subtext0">Upload event banner</p>
                  <p className="text-latte-subtext1 text-sm mt-1">PNG or JPG (max. 5MB)</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddEventModal(false)} className="flex-1 px-4 py-2 bg-latte-surface0 text-latte-text rounded-xl hover:bg-latte-surface1 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-latte-peach text-white rounded-xl hover:bg-latte-peach/90 transition-colors">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Certificate Modal */}
      {showIssueCertModal && (
        <div className="fixed inset-0 bg-latte-crust bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowIssueCertModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-latte-surface0 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-latte-yellow p-2 rounded-xl">
                    <FileCheck className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-latte-text text-2xl">Issue Certificate</h2>
                </div>
                <button onClick={() => setShowIssueCertModal(false)} className="p-1 hover:bg-latte-surface0 rounded transition-colors">
                  <X className="w-5 h-5 text-latte-text" />
                </button>
              </div>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-latte-text mb-2">Certificate Type</label>
                <select className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                  <option>Residence Certificate</option>
                  <option>Income Certificate</option>
                  <option>Caste Certificate</option>
                  <option>Birth Certificate</option>
                  <option>Death Certificate</option>
                  <option>Marriage Certificate</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-latte-text mb-2">Applicant Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-latte-text mb-2">Applicant ID</label>
                  <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="ID/Aadhar number" />
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Address</label>
                <textarea rows={3} className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Full address"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-latte-text mb-2">Mobile Number</label>
                  <input type="tel" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="10-digit number" />
                </div>
                <div>
                  <label className="block text-latte-text mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Certificate Number</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Auto-generated: CERT-2025-XXXX" disabled />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Issue Date</label>
                <input type="date" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Remarks (Optional)</label>
                <textarea rows={2} className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Additional notes"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowIssueCertModal(false)} className="flex-1 px-4 py-2 bg-latte-surface0 text-latte-text rounded-xl hover:bg-latte-surface1 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-latte-peach text-white rounded-xl hover:bg-latte-peach/90 transition-colors">
                  Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadPhotoModal && (
        <div className="fixed inset-0 bg-latte-crust bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowUploadPhotoModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-latte-surface0 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-latte-mauve p-2 rounded-xl">
                    <Image className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-latte-text text-2xl">Upload to Gallery</h2>
                </div>
                <button onClick={() => setShowUploadPhotoModal(false)} className="p-1 hover:bg-latte-surface0 rounded transition-colors">
                  <X className="w-5 h-5 text-latte-text" />
                </button>
              </div>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-latte-text mb-2">Album/Category</label>
                <select className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach">
                  <option>Events</option>
                  <option>Festivals</option>
                  <option>Infrastructure</option>
                  <option>Agriculture</option>
                  <option>Community</option>
                  <option>Cultural</option>
                </select>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Photo Title</label>
                <input type="text" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Give your photo a title" />
              </div>
              <div>
                <label className="block text-latte-text mb-2">Description (Optional)</label>
                <textarea rows={3} className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" placeholder="Describe the photo"></textarea>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Upload Photos</label>
                <div className="border-2 border-dashed border-latte-surface0 rounded-xl p-8 text-center hover:border-latte-peach transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-latte-subtext0 mx-auto mb-3" />
                  <p className="text-latte-text mb-1">Click to upload or drag and drop</p>
                  <p className="text-latte-subtext0 text-sm">PNG, JPG, GIF up to 10MB</p>
                  <p className="text-latte-subtext1 text-sm mt-1">You can select multiple photos</p>
                </div>
              </div>
              <div>
                <label className="block text-latte-text mb-2">Date Taken</label>
                <input type="date" className="w-full px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowUploadPhotoModal(false)} className="flex-1 px-4 py-2 bg-latte-surface0 text-latte-text rounded-xl hover:bg-latte-surface1 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-latte-peach text-white rounded-xl hover:bg-latte-peach/90 transition-colors">
                  Upload Photos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;