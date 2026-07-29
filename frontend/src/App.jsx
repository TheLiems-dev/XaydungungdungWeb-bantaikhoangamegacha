import { useState, useEffect } from 'react';
import { accountApi } from './assets/accountAPI';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Gọi API lấy dữ liệu từ Backend khi trang vừa load xong
  useEffect(() => {
    let isMounted = true;

    async function loadAccounts() {
      try {
        const data = await accountApi.getAll();
        if (isMounted) {
          setError('');
          setAccounts(data);
        }
      } catch (error) {
        console.error("Lỗi khi kết nối với Backend NestJS:", error);
        if (isMounted) {
          setError('Không tải được dữ liệu từ backend. Kiểm tra server NestJS, CORS và API path.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadAccounts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans w-full">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-gray-800 text-center">
          <h1 className="font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            GACHA ACC
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Store Management</p>
        </div>
        <nav className="flex-1 mt-6 px-4">
          <ul className="space-y-2">
            <li className="p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer flex items-center space-x-3 text-gray-400">
              <span>🏠</span> <span>Trang chủ</span>
            </li>
            <li className="p-3 rounded-lg bg-gray-800 border-l-4 border-purple-500 cursor-pointer flex items-center space-x-3 text-white font-medium shadow-md">
              <span>🎮</span> <span>Quản lý Tài khoản</span>
            </li>
            <li className="p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer flex items-center space-x-3 text-gray-400">
              <span>📦</span> <span>Đơn hàng</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* HEADER */}
        <header className="h-16 bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-8 border-b border-gray-800 sticky top-0 z-20">
          <div className="w-1/3 relative">
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm tài khoản..." 
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm text-gray-200 transition" 
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-800 py-1.5 px-3 rounded-full cursor-pointer hover:bg-gray-700 border border-gray-700">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
              <span className="text-sm font-medium pr-1">Admin</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Kho Tài Khoản</h2>
                <p className="text-gray-400 text-sm">Dữ liệu được lấy trực tiếp từ Backend NestJS.</p>
              </div>
              <button 
                onClick={() => alert("Chức năng mở Popup Form chưa được gắn!")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg flex items-center space-x-2">
                <span>+</span> <span>Thêm Tài Khoản</span>
              </button>
            </div>
            
            {/* TABS LỌC */}
            <div className="flex border-b border-gray-800 mb-8 space-x-8">
              {['all', 'wuwa', 'genshin'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium uppercase tracking-wider ${
                    activeTab === tab 
                      ? 'text-purple-400 border-b-2 border-purple-400' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'all' ? 'Toàn bộ' : tab === 'wuwa' ? 'Wuthering Waves' : 'Genshin Impact'}
                </button>
              ))}
            </div>

            {/* HIỂN THỊ TRẠNG THÁI LOADING / GRID DATA */}
            {loading ? (
              <div className="text-center text-gray-500 mt-10">⏳ Đang tải dữ liệu từ Backend...</div>
            ) : error ? (
              <div className="text-center text-red-400 mt-10">{error}</div>
            ) : accounts.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">Chưa có tài khoản nào trong cơ sở dữ liệu. Hãy thêm mới!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((acc, index) => (
                  <div key={acc.id || index} className="bg-gray-800 rounded-xl p-5 border border-gray-700/50 shadow-lg hover:border-purple-500/50 transition duration-300 group">
                    <div className="flex items-start mb-4">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider shadow-inner bg-purple-600 text-white">
                        GAME
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-[10px] rounded uppercase font-bold tracking-widest border border-green-800">
                            {acc.status || 'Available'}
                          </span>
                          <span className="text-gray-500 text-xs">#{acc.id}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-100 text-lg mb-2 line-clamp-2 leading-snug group-hover:text-purple-300">
                      {acc.username || acc.title || acc.name || 'Tài khoản Gacha VIP'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Server: {acc.game_server || 'N/A'} · Level: {acc.level ?? 'N/A'}
                    </p>
                    
                    <div className="flex justify-between items-end mt-6 pt-4 border-t border-gray-700/50">
                      <div>
                        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Mức giá</p>
                        <p className="text-purple-400 font-bold text-lg">
                          {acc.price ? `${acc.price.toLocaleString()}đ` : 'Liên hệ'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;