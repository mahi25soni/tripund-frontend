// services/DashboardService.js
import axios from "../../axios";
import { toast } from "react-toastify";

class DashboardService {
  constructor(storeId) {
    if (!storeId) {
      throw new Error('Store ID is required');
    }
    this.storeId = storeId;
  }

  async getRevenueMetrics() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/revenue`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load revenue metrics");
      console.error("Revenue metrics error:", error);
      return null;
    }
  }

  async getOrderMetrics() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/orders`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load order metrics");
      console.error("Order metrics error:", error);
      return null;
    }
  }

  async getCategoryDistribution() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/categories`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load category data");
      console.error("Category distribution error:", error);
      return null;
    }
  }

  async getWeeklySales() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/weekly-sales`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load weekly sales data");
      console.error("Weekly sales error:", error);
      return null;
    }
  }

  async getTopProducts() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/top-products`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load top products");
      console.error("Top products error:", error);
      return null;
    }
  }

  async getBusiestTimes() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/busiest-times`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load busiest times data");
      console.error("Busiest times error:", error);
      return null;
    }
  }

  async getInventoryAlerts() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}/inventory-alerts`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load inventory alerts");
      console.error("Inventory alerts error:", error);
      return null;
    }
  }

  async getAllDashboardData() {
    try {
      const response = await axios.get(`/store/analytics/${this.storeId}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Dashboard data error:", error);
      return null;
    }
  }
}

export default DashboardService;