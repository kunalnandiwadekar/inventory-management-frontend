import Login from "./pages/Login";

function App() {
  return <Login />;
}

export default App;



// import { useState } from 'react';
// import { FiPackage, FiUsers, FiShoppingCart, FiHome, FiPlus, FiSearch } from 'react-icons/fi';

// type Product = {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   lastUpdated: string;
// };

// const sampleProducts: Product[] = [
//   { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 45, lastUpdated: '2025-12-28' },
//   { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 22, lastUpdated: '2025-12-29' },
//   { id: 3, name: 'Desk Lamp', category: 'Furniture', price: 34.99, stock: 15, lastUpdated: '2025-12-27' },
//   { id: 4, name: 'Notebook', category: 'Stationery', price: 4.99, stock: 120, lastUpdated: '2025-12-30' },
//   { id: 5, name: 'Coffee Mug', category: 'Kitchen', price: 12.99, stock: 80, lastUpdated: '2025-12-25' },
// ];

// const App = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredProducts = sampleProducts.filter(product =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalProducts = sampleProducts.length;
//   const lowStockItems = sampleProducts.filter(p => p.stock < 20).length;
//   const totalValue = sampleProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b">
//           <h1 className="text-xl font-bold text-blue-600">StockWise</h1>
//           <p className="text-sm text-gray-500">Inventory Management</p>
//         </div>
//         <nav className="mt-4">
//           {[
//             { id: 'dashboard', icon: <FiHome className="mr-3" />, label: 'Dashboard' },
//             { id: 'products', icon: <FiPackage className="mr-3" />, label: 'Products' },
//             { id: 'suppliers', icon: <FiUsers className="mr-3" />, label: 'Suppliers' },
//             { id: 'orders', icon: <FiShoppingCart className="mr-3" />, label: 'Orders' },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`flex items-center w-full px-4 py-3 text-left ${
//                 activeTab === item.id 
//                   ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <header className="bg-white shadow-sm p-4 flex justify-between items-center">
//           <div className="relative w-96">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
//               <span className="text-blue-600 font-medium">KU</span>
//             </div>
//             <span className="text-gray-700">Kunal</span>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             {activeTab === 'dashboard' ? 'Dashboard' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//           </h2>

//           {activeTab === 'dashboard' && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                 <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">{totalProducts}</p>
//                 <p className="text-green-500 text-sm mt-1">+12% from last month</p>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                 <h3 className="text-gray-500 text-sm font-medium">Low Stock Items</h3>
//                 <p className="text-3xl font-bold text-amber-500 mt-2">{lowStockItems}</p>
//                 <p className="text-amber-500 text-sm mt-1">Needs attention</p>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                 <h3 className="text-gray-500 text-sm font-medium">Total Inventory Value</h3>
//                 <p className="text-3xl font-bold text-blue-600 mt-2">${totalValue.toLocaleString()}</p>
//                 <p className="text-green-500 text-sm mt-1">+5.2% from last month</p>
//               </div>
//             </div>
//           )}

//           {/* Products Table */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="font-medium text-gray-800">
//                 {activeTab === 'products' ? 'All Products' : 'Recent Inventory'}
//               </h3>
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-blue-700 transition">
//                 <FiPlus className="mr-1" /> Add Product
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredProducts.map((product) => (
//                     <tr key={product.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                           {product.category}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         ${product.price.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           product.stock < 20 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
//                         }`}>
//                           {product.stock} in stock
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(product.lastUpdated).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default App;