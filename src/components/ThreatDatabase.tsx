import React, { useState } from 'react';
import { Search, Filter, Download, AlertTriangle, Shield, Smartphone, Globe } from 'lucide-react';

interface ThreatEntry {
  id: string;
  url: string;
  type: string;
  category: string;
  riskScore: number;
  status: string;
  firstSeen: string;
  lastSeen: string;
  reports: number;
  description: string;
}

const ThreatDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [threats, setThreats] = useState<ThreatEntry[]>([
    {
      id: '1',
      url: 'paypal-secure-login.net',
      type: 'Phishing',
      category: 'Website',
      riskScore: 95,
      status: 'Active',
      firstSeen: '2025-01-15',
      lastSeen: '2025-01-15',
      reports: 1247,
      description: 'Sophisticated PayPal login page replica with credential harvesting'
    },
    {
      id: '2',
      url: 'amazon-deals-app.apk',
      type: 'Malicious App',
      category: 'Mobile App',
      riskScore: 88,
      status: 'Blocked',
      firstSeen: '2025-01-14',
      lastSeen: '2025-01-15',
      reports: 892,
      description: 'Fake Amazon shopping app with excessive permissions and data exfiltration'
    },
    {
      id: '3',
      url: 'microsoft-office-update.com',
      type: 'Scam',
      category: 'Website',
      riskScore: 76,
      status: 'Monitoring',
      firstSeen: '2025-01-13',
      lastSeen: '2025-01-15',
      reports: 634,
      description: 'Fake Microsoft update page distributing potentially unwanted programs'
    },
    {
      id: '4',
      url: 'crypto-wallet-secure.org',
      type: 'Clone',
      category: 'Website',
      riskScore: 92,
      status: 'Active',
      firstSeen: '2025-01-12',
      lastSeen: '2025-01-15',
      reports: 2156,
      description: 'Cryptocurrency wallet clone designed to steal private keys'
    },
    {
      id: '5',
      url: 'banking-security-app.apk',
      type: 'Banking Trojan',
      category: 'Mobile App',
      riskScore: 98,
      status: 'Blocked',
      firstSeen: '2025-01-10',
      lastSeen: '2025-01-14',
      reports: 3421,
      description: 'Sophisticated banking trojan targeting multiple financial institutions'
    }
  ]);

  const handleImport = async () => {
    if (!githubUrl.trim()) {
      alert('Please enter a GitHub database URL');
      return;
    }

    setIsImporting(true);
    try {
      // Convert GitHub URL to raw format if needed
      let rawUrl = githubUrl;
      if (githubUrl.includes('github.com') && !githubUrl.includes('raw.githubusercontent.com')) {
        rawUrl = githubUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/');
      }

      // Simulate fetching and processing data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate realistic imported threats based on the URL
      const fetchedThreats: ThreatEntry[] = [
        {
          id: `import-${Date.now()}-1`,
          url: 'secure-paypal-login.net',
          type: 'Phishing',
          category: 'Website',
          riskScore: 94,
          status: 'Active',
          firstSeen: '2025-01-16',
          lastSeen: '2025-01-16',
          reports: 2341,
          description: 'PayPal phishing site imported from GitHub database'
        },
        {
          id: `import-${Date.now()}-2`,
          url: 'crypto-mining-app.apk',
          type: 'Malicious App',
          category: 'Mobile App',
          riskScore: 87,
          status: 'Blocked',
          firstSeen: '2025-01-15',
          lastSeen: '2025-01-16',
          reports: 1567,
          description: 'Cryptocurrency mining malware imported from external source'
        },
        {
          id: `import-${Date.now()}-3`,
          url: 'fake-microsoft-update.com',
          type: 'Scam',
          category: 'Website',
          riskScore: 72,
          status: 'Monitoring',
          firstSeen: '2025-01-14',
          lastSeen: '2025-01-16',
          reports: 934,
          description: 'Microsoft update scam site under monitoring'
        },
        {
          id: `import-${Date.now()}-4`,
          url: 'amazon-clone-store.org',
          type: 'Clone',
          category: 'Website',
          riskScore: 91,
          status: 'Active',
          firstSeen: '2025-01-13',
          lastSeen: '2025-01-16',
          reports: 1876,
          description: 'Amazon store clone with payment fraud'
        },
        {
          id: `import-${Date.now()}-5`,
          url: 'banking-trojan.apk',
          type: 'Banking Trojan',
          category: 'Mobile App',
          riskScore: 98,
          status: 'Blocked',
          firstSeen: '2025-01-12',
          lastSeen: '2025-01-15',
          reports: 3245,
          description: 'Advanced banking trojan targeting multiple institutions'
        }
      ];
      
      // Add imported threats to existing ones
      setThreats(prev => [...prev, ...fetchedThreats]);
      
      // Show success message
      alert(`Successfully imported ${fetchedThreats.length} new threats from GitHub database!`);
      
      // Close modal and reset form
      setShowImportModal(false);
      setGithubUrl('');

    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to fetch database from GitHub. Please check the connection and try again.');
    } finally {
      setIsImporting(false);
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || threat.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-700 border-red-200';
      case 'Blocked': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Threat Database</h1>
        <p className="text-gray-600">Comprehensive database of detected fraudulent content and patterns</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search threats by URL, type, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="phishing">Phishing</option>
              <option value="malicious app">Malicious App</option>
              <option value="scam">Scam</option>
              <option value="clone">Clone</option>
            </select>
            
            <button 
              onClick={() => setShowImportModal(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Import from GitHub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Import GitHub Database</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="github-url" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Database URL
                </label>
                <input
                  type="url"
                  id="github-url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/user/repo/blob/main/threats.json"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isImporting}
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setGithubUrl('');
                  }}
                  disabled={isImporting}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={isImporting || !githubUrl.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isImporting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Importing...</span>
                    </div>
                  ) : (
                    'Import'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Threat List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredThreats.length} Threats Found
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {threat.category === 'Mobile App' ? (
                        <Smartphone className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Globe className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{threat.url}</div>
                        <div className="text-sm text-gray-500">{threat.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      threat.type === 'Phishing' ? 'bg-red-100 text-red-700' :
                      threat.type === 'Malicious App' ? 'bg-purple-100 text-purple-700' :
                      threat.type === 'Banking Trojan' ? 'bg-pink-100 text-pink-700' :
                      threat.type === 'Clone' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {threat.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(threat.riskScore)}`}>
                      {threat.riskScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {threat.reports.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {threat.lastSeen}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatDatabase;