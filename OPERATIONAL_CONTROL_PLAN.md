# Operational Control & Buyer Journey Plan

## 1. The Buyer (Acheteur) Journey
This section outlines the optimized flow for every customer on the platform.

### A. Discovery & Personalization
- **Multilingual Search**: Search for plants in both Arabic and French.
- **Botanical Profile**: Users can save their garden conditions (sunlight, humidity) to receive personalized plant recommendations.
- **Favorites (Wishlist)**: Save specimens for later curation.

### B. The Purchase Flow
- **Interactive Cart**: Multi-step drawer (Cart -> Shipping -> Payment) for frictionless conversion.
- **Secure Checkout**: Integrated validation for Moroccan addresses and phone numbers.
- **Real-time Notifications**: Order confirmation via Email/SMS.

---

## 2. Platform Control Center (Admin/Manager Dashboard)
The "Control All Things" module for platform administrators.

### A. Catalog & Inventory Control
- **Global Inventory**: Real-time stock tracking across all providers.
- **Product Staging**: Editor role prepares content (images/descriptions), Admin approves it for publication.
- **Pricing Engine**: Dynamic pricing adjustments and promotional code management.

### B. Order & Logistics Oversight
- **Master Order Grid**: Filter orders by status (Pending, Packing, Shipped, Delivered).
- **Shipper Assignment**: Drag-and-drop assignment of orders to specific shippers or delivery partners.
- **Live Tracking Map**: Visual oversight of active deliveries (integration with Mapbox or Google Maps).

### C. Provider (Fournisseur) Management
- **Provider Portal**: Dedicated dashboard for growers to update their stock and view sales reports.
- **Quality Control**: Admin rating system for providers based on plant health and shipping speed.

---

## 3. Advanced Monitoring (Security & Financials)
### A. Financial Dashboard
- **Revenue Analytics**: Daily, weekly, and monthly sales volume.
- **Provider Payouts**: Automated calculation of commissions and provider balances.

### B. Security & System Health
- **Audit Logs**: View a chronological history of all administrative actions (Who changed what and when).
- **User Permission Matrix**: Toggle specific permissions for `Manager`, `Editor`, and `Shipper` roles.
- **Error Tracking**: Integration with Sentry for real-time technical health monitoring.

---

## 4. Operational Roles Matrix
| Action | Acheteur | Shipper | Provider | Manager | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Browse & Buy | ✅ | ❌ | ❌ | ✅ | ✅ |
| Update Order Status | ❌ | ✅ | ❌ | ✅ | ✅ |
| Add New Products | ❌ | ❌ | ✅ | ✅ | ✅ |
| Delete Users | ❌ | ❌ | ❌ | ❌ | ✅ |
| Edit System Config | ❌ | ❌ | ❌ | ❌ | ✅ |
