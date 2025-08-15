import React from "react";
import { Settings, Info, IndianRupee, PlusCircle, X, ShieldCheck, Edit, Trash2, Star } from "lucide-react";

interface Plan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  description: string;
  popular: boolean;
  discount: string | null;
}

interface PlanForm {
  name: string;
  price: string;
  period: string;
  features: string;
  description: string;
  popular: boolean;
  discount: string;
}

interface SettingsSectionProps {
  platformName: string;
  setPlatformName: (name: string) => void;
  contactEmail: string;
  setContactEmail: (email: string) => void;
  handleSaveSettings: (e: React.FormEvent) => void;
  plans: Plan[];
  handleEditPlan: (plan: Plan) => void;
  handleDeletePlan: (id: number) => void;
  handleAddPlan: () => void;
  showPlanModal: boolean;
  setShowPlanModal: (show: boolean) => void;
  editingPlan: Plan | null;
  planForm: PlanForm;
  handlePlanFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePlanFormSubmit: (e: React.FormEvent) => void;
  twoFactor: boolean;
  setTwoFactor: (v: boolean) => void;
  strongPassword: boolean;
  setStrongPassword: (v: boolean) => void;
  sessionTimeout: number;
  setSessionTimeout: (v: number) => void;
  loginAlerts: boolean;
  setLoginAlerts: (v: boolean) => void;
  handleSaveSecurity: (e: React.FormEvent) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  platformName,
  setPlatformName,
  contactEmail,
  setContactEmail,
  handleSaveSettings,
  plans,
  handleEditPlan,
  handleDeletePlan,
  handleAddPlan,
  showPlanModal,
  setShowPlanModal,
  editingPlan,
  planForm,
  handlePlanFormChange,
  handlePlanFormSubmit,
  twoFactor,
  setTwoFactor,
  strongPassword,
  setStrongPassword,
  sessionTimeout,
  setSessionTimeout,
  loginAlerts,
  setLoginAlerts,
  handleSaveSecurity,
}) => (
  <div className="w-full">
    {/* Platform Settings Heading and General Settings Card */}
    <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-red-500 flex items-center gap-3">
      <Settings size={36} className="-mt-1" /> Platform Settings
    </h2>
    <div className="bg-[#232b3b] rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-10">
      <div className="flex items-center gap-2 mb-6">
        <Info size={28} className="text-blue-400" />
        <span className="text-2xl font-bold text-white">General Settings</span>
      </div>
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2 text-base">Platform Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#353b48] border border-[#444a5a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={platformName}
            onChange={e => setPlatformName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2 text-base">Contact Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-[#353b48] border border-[#444a5a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Save Settings
        </button>
      </form>
    </div>

    {/* Subscription Plans Management */}
    <div className="bg-[#232b3b] rounded-2xl shadow-lg p-8 max-w-6xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IndianRupee size={28} className="text-green-400" />
          <span className="text-2xl font-bold text-white">Subscription Plans</span>
        </div>
        <button
          onClick={handleAddPlan}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          <PlusCircle size={20} /> Add New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className={`bg-[#2d3748] rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
            plan.popular ? 'border-yellow-500 bg-gradient-to-br from-[#2d3748] to-[#1a202c]' : 'border-[#444a5a] hover:border-red-500/50'
          }`}>
            {/* Plan Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              {plan.popular && (
                <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  <Star size={12} />
                  Popular
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-400">/{plan.period}</span>
                )}
              </div>
              {plan.discount && (
                <span className="text-green-400 text-sm font-semibold">{plan.discount}</span>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-semibold mb-2">Features:</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditPlan(plan)}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDeletePlan(plan.id)}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition ml-auto"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Security Settings */}
    <div className="bg-[#232b3b] rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck size={28} className="text-red-400" />
        <span className="text-2xl font-bold text-white">Security Settings</span>
      </div>
      <form onSubmit={handleSaveSecurity} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-gray-300 font-semibold">Two-Factor Authentication</label>
            <p className="text-gray-400 text-sm">Enable 2FA for enhanced security</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-gray-300 font-semibold">Strong Password Policy</label>
            <p className="text-gray-400 text-sm">Require complex passwords</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={strongPassword}
              onChange={(e) => setStrongPassword(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="1440"
            className="w-full px-4 py-3 rounded-lg bg-[#353b48] border border-[#444a5a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-gray-300 font-semibold">Login Alerts</label>
            <p className="text-gray-400 text-sm">Notify on suspicious login attempts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={loginAlerts}
              onChange={(e) => setLoginAlerts(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Save Security Settings
        </button>
      </form>
    </div>

    {/* Plan Modal */}
    {showPlanModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#232b3b]/95 rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-white/20 backdrop-blur-lg">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            onClick={() => setShowPlanModal(false)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          
          <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
            <IndianRupee size={24} /> {editingPlan ? 'Edit Plan' : 'Add New Plan'}
          </h3>
          
          <form onSubmit={handlePlanFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Plan Name *</label>
                <input
                  name="name"
                  value={planForm.name}
                  onChange={handlePlanFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="e.g., Premium Plan"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Price (₹) *</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={planForm.price}
                  onChange={handlePlanFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Period *</label>
                <input
                  name="period"
                  value={planForm.period}
                  onChange={handlePlanFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="e.g., Monthly, Yearly, Lifetime"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Discount</label>
                <input
                  name="discount"
                  value={planForm.discount}
                  onChange={handlePlanFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  placeholder="e.g., Save 20%"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={planForm.description}
                onChange={handlePlanFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400 min-h-[80px]"
                placeholder="Brief description of the plan"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Features *</label>
              <textarea
                name="features"
                value={planForm.features}
                onChange={handlePlanFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400 min-h-[100px]"
                required
                placeholder="Enter features (comma separated)"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="popular"
                  checked={planForm.popular}
                  onChange={handlePlanFormChange}
                  className="rounded border-gray-700 bg-[#181f2a] text-red-500 focus:ring-red-500"
                />
                Mark as Popular
              </label>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {editingPlan ? 'Update Plan' : 'Add Plan'}
              </button>
              <button
                type="button"
                onClick={() => setShowPlanModal(false)}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

export default SettingsSection; 