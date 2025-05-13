import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ darkMode }) {
  // Declare icons
  const Plus = getIcon('Plus');
  const Trash2 = getIcon('Trash2');
  const Save = getIcon('Save');
  const FileText = getIcon('FileText');
  const Download = getIcon('Download');
  const Mail = getIcon('Mail');
  const ChevronRight = getIcon('ChevronRight');

  // Invoice form state
  const [invoice, setInvoice] = useState({
    invoiceNumber: 'INV-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    dueDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 14);
      return date.toISOString().split('T')[0];
    })(),
    client: {
      name: '',
      email: '',
      address: ''
    },
    items: [
      { id: 1, description: '', quantity: 1, price: 0 }
    ],
    notes: '',
    terms: 'Payment is due within 14 days from the date of invoice.',
    taxRate: 10
  });

  // UI states
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState({});

  // Calculate totals
  const calculateSubtotal = () => {
    return invoice.items.reduce((total, item) => {
      return total + (parseFloat(item.quantity) * parseFloat(item.price) || 0);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoice.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Handle form changes
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [name]: value
      }
    }));
  };

  const handleItemChange = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    const newId = Math.max(0, ...invoice.items.map(item => item.id)) + 1;
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (id) => {
    if (invoice.items.length === 1) {
      toast.error("You must have at least one item");
      return;
    }
    
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Handle form submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!invoice.client.name) newErrors.clientName = "Client name is required";
    if (!invoice.client.email) newErrors.clientEmail = "Client email is required";
    
    invoice.items.forEach((item, index) => {
      if (!item.description) newErrors[`item-${index}-description`] = "Description is required";
      if (!item.price) newErrors[`item-${index}-price`] = "Price is required";
      if (!item.quantity) newErrors[`item-${index}-quantity`] = "Quantity is required";
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    
    if (isValid) {
      setIsPreviewMode(true);
      toast.success("Invoice prepared successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  const generateInvoice = () => {
    // In a real app, this would call an API to generate the invoice
    setInvoiceGenerated(true);
    toast.success("Invoice generated successfully!");
  };

  const sendInvoice = () => {
    // In a real app, this would send the invoice via email
    toast.success("Invoice sent to client!");
  };

  const downloadInvoice = () => {
    // In a real app, this would download the invoice as PDF
    toast.success("Invoice downloaded!");
  };

  const goBack = () => {
    setIsPreviewMode(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {isPreviewMode ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={goBack}
                className="btn-outline"
              >
                Back to editing
              </button>
              <div className="flex space-x-3">
                {!invoiceGenerated ? (
                  <button 
                    onClick={generateInvoice}
                    className="btn-primary"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    <span>Generate Invoice</span>
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={downloadInvoice}
                      className="btn-outline"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      <span>Download</span>
                    </button>
                    <button 
                      onClick={sendInvoice}
                      className="btn-primary"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      <span>Send Invoice</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="card border-2 border-primary/20 p-6 md:p-8">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
                    InvoiceFlow
                  </h1>
                  <p className="text-surface-600 dark:text-surface-400">123 Business Street</p>
                  <p className="text-surface-600 dark:text-surface-400">San Francisco, CA 94103</p>
                  <p className="text-surface-600 dark:text-surface-400">contact@invoiceflow.com</p>
                </div>
                
                <div className="mt-6 md:mt-0 md:text-right">
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">INVOICE</h2>
                  <p className="text-primary font-medium">{invoice.invoiceNumber}</p>
                  <div className="mt-2">
                    <p className="text-surface-600 dark:text-surface-400">
                      <span className="font-medium">Date: </span>
                      {new Date(invoice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-surface-600 dark:text-surface-400">
                      <span className="font-medium">Due Date: </span>
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
                <p className="font-medium text-surface-900 dark:text-white">{invoice.client.name}</p>
                <p className="text-surface-600 dark:text-surface-400">{invoice.client.email}</p>
                <p className="text-surface-600 dark:text-surface-400 whitespace-pre-line">{invoice.client.address}</p>
              </div>
              
              <div className="mb-8">
                <div className="bg-surface-100 dark:bg-surface-800 rounded-t-lg p-4 grid grid-cols-12 gap-4 font-medium">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-2 text-right">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-3 text-right">Amount</div>
                </div>
                <div className="divide-y divide-surface-200 dark:divide-surface-700 border-l border-r border-surface-200 dark:border-surface-700">
                  {invoice.items.map((item) => (
                    <div key={item.id} className="p-4 grid grid-cols-12 gap-4">
                      <div className="col-span-5">{item.description}</div>
                      <div className="col-span-2 text-right">{item.quantity}</div>
                      <div className="col-span-2 text-right">{formatCurrency(item.price)}</div>
                      <div className="col-span-3 text-right">{formatCurrency(item.quantity * item.price)}</div>
                    </div>
                  ))}
                </div>
                <div className="border border-t-0 border-surface-200 dark:border-surface-700 rounded-b-lg p-4">
                  <div className="flex justify-end">
                    <div className="w-48 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-surface-600 dark:text-surface-400">Subtotal:</span>
                        <span>{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-surface-600 dark:text-surface-400">Tax ({invoice.taxRate}%):</span>
                        <span>{formatCurrency(calculateTax())}</span>
                      </div>
                      <div className="pt-2 border-t border-surface-200 dark:border-surface-700 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {invoice.notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Notes:</h3>
                  <p className="text-surface-600 dark:text-surface-400">{invoice.notes}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Terms & Conditions:</h3>
                <p className="text-surface-600 dark:text-surface-400">{invoice.terms}</p>
              </div>
              
              <div className="mt-8 text-center pt-6 border-t border-surface-200 dark:border-surface-700">
                <p className="text-surface-500 dark:text-surface-400">Thank you for your business!</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="flex justify-center items-center w-8 h-8 rounded-full bg-primary-light/20 text-primary mr-2">1</span>
                Invoice Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="invoiceNumber" className="label">Invoice Number</label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    value={invoice.invoiceNumber}
                    readOnly
                    className="input-field bg-surface-100 dark:bg-surface-700 cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="label">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={invoice.date}
                    onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="label">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={invoice.dueDate}
                    onChange={(e) => setInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="flex justify-center items-center w-8 h-8 rounded-full bg-primary-light/20 text-primary mr-2">2</span>
                Client Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="clientName" className="label">Client Name</label>
                  <input
                    type="text"
                    id="clientName"
                    name="name"
                    value={invoice.client.name}
                    onChange={handleClientChange}
                    className={`input-field ${errors.clientName ? 'border-red-500' : ''}`}
                    placeholder="Enter client name"
                  />
                  {errors.clientName && (
                    <p className="mt-1 text-xs text-red-500">{errors.clientName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="clientEmail" className="label">Client Email</label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="email"
                    value={invoice.client.email}
                    onChange={handleClientChange}
                    className={`input-field ${errors.clientEmail ? 'border-red-500' : ''}`}
                    placeholder="Enter client email"
                  />
                  {errors.clientEmail && (
                    <p className="mt-1 text-xs text-red-500">{errors.clientEmail}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="clientAddress" className="label">Client Address</label>
                  <textarea
                    id="clientAddress"
                    name="address"
                    value={invoice.client.address}
                    onChange={handleClientChange}
                    rows="3"
                    className="input-field"
                    placeholder="Enter client address"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="flex justify-center items-center w-8 h-8 rounded-full bg-primary-light/20 text-primary mr-2">3</span>
                Items
              </h2>
              
              <div className="space-y-4">
                {invoice.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-12 md:col-span-5">
                      <label htmlFor={`item-${index}-description`} className="label">Description</label>
                      <input
                        type="text"
                        id={`item-${index}-description`}
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        className={`input-field ${errors[`item-${index}-description`] ? 'border-red-500' : ''}`}
                        placeholder="Item description"
                      />
                      {errors[`item-${index}-description`] && (
                        <p className="mt-1 text-xs text-red-500">{errors[`item-${index}-description`]}</p>
                      )}
                    </div>
                    
                    <div className="col-span-4 md:col-span-2">
                      <label htmlFor={`item-${index}-quantity`} className="label">Quantity</label>
                      <input
                        type="number"
                        id={`item-${index}-quantity`}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 0))}
                        min="1"
                        className={`input-field ${errors[`item-${index}-quantity`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`item-${index}-quantity`] && (
                        <p className="mt-1 text-xs text-red-500">{errors[`item-${index}-quantity`]}</p>
                      )}
                    </div>
                    
                    <div className="col-span-6 md:col-span-3">
                      <label htmlFor={`item-${index}-price`} className="label">Price</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-surface-500 pointer-events-none">
                          $
                        </span>
                        <input
                          type="number"
                          id={`item-${index}-price`}
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className={`input-field pl-7 ${errors[`item-${index}-price`] ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors[`item-${index}-price`] && (
                        <p className="mt-1 text-xs text-red-500">{errors[`item-${index}-price`]}</p>
                      )}
                    </div>
                    
                    <div className="col-span-2 pt-8">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addItem}
                  className="mt-4 flex items-center text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  <span>Add Item</span>
                </button>
                
                <div className="mt-6 border-t border-surface-200 dark:border-surface-700 pt-4">
                  <div className="flex flex-col items-end">
                    <div className="w-full md:w-64 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-surface-600 dark:text-surface-400">Subtotal:</span>
                        <span>{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-surface-600 dark:text-surface-400 mr-2">Tax:</span>
                          <input
                            type="number"
                            value={invoice.taxRate}
                            onChange={(e) => setInvoice(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                            min="0"
                            max="100"
                            className="input-field w-16 p-1 text-center"
                          />
                          <span className="ml-1 text-surface-600 dark:text-surface-400">%</span>
                        </div>
                        <span>{formatCurrency(calculateTax())}</span>
                      </div>
                      
                      <div className="pt-2 border-t border-surface-200 dark:border-surface-700 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="flex justify-center items-center w-8 h-8 rounded-full bg-primary-light/20 text-primary mr-2">4</span>
                Additional Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="notes" className="label">Notes</label>
                  <textarea
                    id="notes"
                    value={invoice.notes}
                    onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
                    rows="3"
                    className="input-field"
                    placeholder="Additional notes for the client (optional)"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="terms" className="label">Terms & Conditions</label>
                  <textarea
                    id="terms"
                    value={invoice.terms}
                    onChange={(e) => setInvoice(prev => ({ ...prev, terms: e.target.value }))}
                    rows="3"
                    className="input-field"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                <span>Preview Invoice</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;