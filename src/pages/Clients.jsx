import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

function Clients({ darkMode }) {
  // Import icons
  const PlusIcon = getIcon('Plus');
  const SearchIcon = getIcon('Search');
  const EditIcon = getIcon('Edit');
  const TrashIcon = getIcon('Trash');
  const UserIcon = getIcon('User');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const BuildingIcon = getIcon('Building');
  const MapPinIcon = getIcon('MapPin');
  const FileTextIcon = getIcon('FileText');
  const FilterIcon = getIcon('Filter');
  const SortIcon = getIcon('ArrowUpDown');
  const XIcon = getIcon('X');
  
  const navigate = useNavigate();
  
  // Client state
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Mock client data for demonstration
  const mockClients = [
    {
      id: 1,
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      phone: '(555) 123-4567',
      company: 'Cooper Industries',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
      status: 'active',
      totalSpent: 12500,
      invoiceCount: 8,
      lastInvoice: '2023-08-15',
      notes: 'Prefers communication via email. Quarterly billing cycle.',
      avatar: null
    },
    {
      id: 2,
      name: 'Robert Johnson',
      email: 'robert@techinnovate.com',
      phone: '(555) 987-6543',
      company: 'Tech Innovate LLC',
      address: '456 Market St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      status: 'active',
      totalSpent: 28750,
      invoiceCount: 12,
      lastInvoice: '2023-09-01',
      notes: 'Monthly retainer agreement. Requires detailed reports with each invoice.',
      avatar: null
    },
    {
      id: 3,
      name: 'Maria Garcia',
      email: 'maria@designstudio.co',
      phone: '(555) 456-7890',
      company: 'Creative Design Studio',
      address: '789 Design Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      status: 'inactive',
      totalSpent: 4200,
      invoiceCount: 3,
      lastInvoice: '2023-05-20',
      notes: 'Project-based client. Currently on hiatus until Q4 2023.',
      avatar: null
    },
    {
      id: 4,
      name: 'Alex Smith',
      email: 'alex@globaltrading.net',
      phone: '(555) 222-3333',
      company: 'Global Trading Co',
      address: '1010 Trade Center',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
      status: 'active',
      totalSpent: 42800,
      invoiceCount: 15,
      lastInvoice: '2023-09-10',
      notes: 'Requires paper invoices via mail in addition to digital copies.',
      avatar: null
    },
    {
      id: 5,
      name: 'Sarah Williams',
      email: 'sarah@ecofriendly.org',
      phone: '(555) 789-1234',
      company: 'EcoFriendly Solutions',
      address: '222 Green Way',
      city: 'Portland',
      state: 'OR',
      zipCode: '97204',
      country: 'USA',
      status: 'active',
      totalSpent: 15900,
      invoiceCount: 7,
      lastInvoice: '2023-08-28',
      notes: 'Prefers sustainable options. Send digital invoices only.',
      avatar: null
    }
  ];

  // Load clients
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setClients(mockClients);
      setLoading(false);
    }, 800);
  }, []);

  // Handle filtering and sorting
  const filteredAndSortedClients = clients
    .filter(client => {
      // Filter by search term
      const matchesSearch = 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Handle different sort fields
      let fieldA, fieldB;
      
      switch (sortField) {
        case 'name':
          fieldA = a.name.toLowerCase();
          fieldB = b.name.toLowerCase();
          break;
        case 'company':
          fieldA = a.company.toLowerCase();
          fieldB = b.company.toLowerCase();
          break;
        case 'totalSpent':
          fieldA = a.totalSpent;
          fieldB = b.totalSpent;
          break;
        case 'invoiceCount':
          fieldA = a.invoiceCount;
          fieldB = b.invoiceCount;
          break;
        default:
          fieldA = a.name.toLowerCase();
          fieldB = b.name.toLowerCase();
      }

      // Apply sort direction
      if (sortDirection === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    if (showAddModal) {
      // Add new client
      const newClient = {
        ...formData,
        id: clients.length + 1,
        status: 'active',
        totalSpent: 0,
        invoiceCount: 0,
        lastInvoice: null,
        avatar: null
      };
      
      setClients([...clients, newClient]);
      toast.success(`Client ${formData.name} was added successfully`);
      setShowAddModal(false);
    } else if (showEditModal) {
      // Update existing client
      const updatedClients = clients.map(client => 
        client.id === selectedClient.id ? { ...client, ...formData } : client
      );
      
      setClients(updatedClients);
      setSelectedClient({ ...selectedClient, ...formData });
      toast.success(`Client ${formData.name} was updated successfully`);
      setShowEditModal(false);
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      notes: ''
    });
    setFormErrors({});
  };

  // Handle delete client
  const handleDeleteClient = () => {
    if (!clientToDelete) return;
    
    const updatedClients = clients.filter(client => client.id !== clientToDelete.id);
    setClients(updatedClients);
    
    if (selectedClient && selectedClient.id === clientToDelete.id) {
      setSelectedClient(null);
    }
    
    toast.success(`Client ${clientToDelete.name} was deleted successfully`);
    setShowDeleteConfirm(false);
    setClientToDelete(null);
  };

  // UI for different views and states
  const renderClientsList = () => (
    <div className="card">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Clients</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 py-2 text-sm"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-surface-400" />
          </div>
          
          <div className="flex gap-2">
            <div className="relative inline-block">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field py-2 text-sm appearance-none pr-10"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <FilterIcon className="absolute right-3 top-2.5 h-5 w-5 text-surface-400 pointer-events-none" />
            </div>
            
            <button
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  country: '',
                  notes: ''
                });
                setShowAddModal(true);
              }}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Client
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : filteredAndSortedClients.length === 0 ? (
        <div className="text-center py-16">
          <UserIcon className="h-12 w-12 mx-auto text-surface-400" />
          <h3 className="mt-4 text-lg font-medium">No clients found</h3>
          <p className="mt-2 text-surface-500 dark:text-surface-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50 dark:bg-surface-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortField === 'name') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('name');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Client
                    {sortField === 'name' && (
                      <SortIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortField === 'company') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('company');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Company
                    {sortField === 'company' && (
                      <SortIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortField === 'totalSpent') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('totalSpent');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Total Spent
                    {sortField === 'totalSpent' && (
                      <SortIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortField === 'invoiceCount') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('invoiceCount');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Invoices
                    {sortField === 'invoiceCount' && (
                      <SortIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {filteredAndSortedClients.map(client => (
                <tr 
                  key={client.id} 
                  className={`hover:bg-surface-50 dark:hover:bg-surface-800 ${
                    selectedClient && selectedClient.id === client.id 
                      ? 'bg-primary/5 dark:bg-primary/10' 
                      : ''
                  } cursor-pointer`}
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300">
                        {client.avatar ? (
                          <img src={client.avatar} alt={client.name} className="h-10 w-10 rounded-full" />
                        ) : (
                          client.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">{client.company}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">{client.email}</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">{client.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">${client.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {client.invoiceCount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      client.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
                    }`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({
                            name: client.name,
                            email: client.email,
                            phone: client.phone,
                            company: client.company,
                            address: client.address,
                            city: client.city,
                            state: client.state,
                            zipCode: client.zipCode,
                            country: client.country,
                            notes: client.notes
                          });
                          setSelectedClient(client);
                          setShowEditModal(true);
                        }}
                        className="text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light"
                      >
                        <EditIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setClientToDelete(client);
                          setShowDeleteConfirm(true);
                        }}
                        className="text-surface-600 hover:text-red-500 dark:text-surface-300 dark:hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderClientDetails = () => (
    <div className="card">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setSelectedClient(null)}
            className="mr-3 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">Client Details</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setFormData({
                name: selectedClient.name,
                email: selectedClient.email,
                phone: selectedClient.phone,
                company: selectedClient.company,
                address: selectedClient.address,
                city: selectedClient.city,
                state: selectedClient.state,
                zipCode: selectedClient.zipCode,
                country: selectedClient.country,
                notes: selectedClient.notes
              });
              setShowEditModal(true);
            }}
            className="btn-outline flex items-center text-sm"
          >
            <EditIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => {
              setClientToDelete(selectedClient);
              setShowDeleteConfirm(true);
            }}
            className="btn-outline flex items-center text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800/30"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-3xl text-surface-700 dark:text-surface-300 mb-4">
                {selectedClient.avatar ? (
                  <img src={selectedClient.avatar} alt={selectedClient.name} className="h-24 w-24 rounded-full" />
                ) : (
                  selectedClient.name.charAt(0).toUpperCase()
                )}
              </div>
              <h3 className="text-xl font-bold mb-1">{selectedClient.name}</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">{selectedClient.company}</p>
              
              <div className={`px-3 py-1 text-sm rounded-full mb-6 ${
                selectedClient.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
              }`}>
                {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex items-center">
                  <MailIcon className="h-5 w-5 text-surface-500 dark:text-surface-400 mr-3" />
                  <a href={`mailto:${selectedClient.email}`} className="text-primary dark:text-primary-light hover:underline">
                    {selectedClient.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-surface-500 dark:text-surface-400 mr-3" />
                  <a href={`tel:${selectedClient.phone.replace(/\D/g, '')}`} className="hover:text-primary dark:hover:text-primary-light">
                    {selectedClient.phone}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-surface-500 dark:text-surface-400 mr-3 mt-0.5" />
                  <div>
                    <p>{selectedClient.address}</p>
                    <p>{selectedClient.city}, {selectedClient.state} {selectedClient.zipCode}</p>
                    <p>{selectedClient.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="card p-4">
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Total Spent</p>
                <p className="text-2xl font-bold">${selectedClient.totalSpent.toLocaleString()}</p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Invoices</p>
                <p className="text-2xl font-bold">{selectedClient.invoiceCount}</p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Last Invoice</p>
                <p className="text-2xl font-bold">
                  {selectedClient.lastInvoice ? new Date(selectedClient.lastInvoice).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="card mb-6">
              <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="font-medium">Notes</h3>
              </div>
              <div className="p-4">
                <p className="text-surface-600 dark:text-surface-300 whitespace-pre-line">
                  {selectedClient.notes || 'No notes available for this client.'}
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="font-medium">Recent Invoices</h3>
              </div>
              {selectedClient.invoiceCount > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-50 dark:bg-surface-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Invoice #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                      {/* Mock invoice data for demonstration */}
                      <tr className="hover:bg-surface-50 dark:hover:bg-surface-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-4 w-4 text-surface-500 dark:text-surface-400 mr-2" />
                            <span className="text-sm font-medium">INV-{selectedClient.id}001</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {selectedClient.lastInvoice ? new Date(selectedClient.lastInvoice).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          ${(selectedClient.totalSpent / selectedClient.invoiceCount).toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        </td>
                      </tr>
                      {selectedClient.invoiceCount > 1 && (
                        <tr className="hover:bg-surface-50 dark:hover:bg-surface-800">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileTextIcon className="h-4 w-4 text-surface-500 dark:text-surface-400 mr-2" />
                              <span className="text-sm font-medium">INV-{selectedClient.id}002</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            {selectedClient.lastInvoice ? 
                              new Date(new Date(selectedClient.lastInvoice).setMonth(
                                new Date(selectedClient.lastInvoice).getMonth() - 1
                              )).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            ${(selectedClient.totalSpent / selectedClient.invoiceCount).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Paid
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileTextIcon className="h-10 w-10 mx-auto text-surface-400" />
                  <p className="mt-2 text-surface-500 dark:text-surface-400">No invoices for this client yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientForm = () => (
    <div className="fixed inset-0 bg-surface-900/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-surface-800 rounded-lg shadow-lg">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {showAddModal ? 'Add New Client' : 'Edit Client'}
          </h2>
          <button 
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setFormErrors({});
            }}
            className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="label">Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`input-field ${formErrors.name ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.name && (
                <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="company" className="label">Company</label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="label">Email *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`input-field ${formErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="label">Phone *</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`input-field ${formErrors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address" className="label">Address</label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="label">City</label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="state" className="label">State/Province</label>
              <input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="zipCode" className="label">Zip/Postal Code</label>
              <input
                id="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="label">Country</label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="notes" className="label">Notes</label>
            <textarea
              id="notes"
              rows="4"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="input-field"
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setFormErrors({});
              }}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {showAddModal ? 'Add Client' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDeleteConfirmation = () => (
    <div className="fixed inset-0 bg-surface-900/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-800 rounded-lg shadow-lg">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4 flex items-center justify-center">
            <TrashIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Delete Client</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Are you sure you want to delete <strong>{clientToDelete?.name}</strong>? 
            This action cannot be undone and all associated data will be permanently removed.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteClient}
              className="btn bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
            >
              Delete Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-4 sm:p-6 bg-surface-50 dark:bg-surface-900">
      {selectedClient ? renderClientDetails() : renderClientsList()}
      
      {/* Modals */}
      {(showAddModal || showEditModal) && renderClientForm()}
      {showDeleteConfirm && renderDeleteConfirmation()}
    </div>
  );
}

export default Clients;