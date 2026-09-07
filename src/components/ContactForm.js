import { useEffect } from 'react';
import useForm from '../hooks/useForm';
import categories from '../data/categories.json';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  category: '',
  message: '',
  consent: false,
};

const validateForm = (values) => {
  const errors = {};
  
  if (!values.name.trim()) {
    errors.name = 'Full name is required';
  }
  
  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const cleanPhone = values.phone.replace(/\s+/g, '');
    if (!/^(?:\+254|0)[17]\d{8}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid Kenyan phone number (e.g. 0723835776)';
    }
  }

  if (!values.category) {
    errors.category = 'Please select a product category';
  }

  if (!values.message.trim()) {
    errors.message = 'Inquiry details are required';
  } else if (values.message.trim().length < 8) {
    errors.message = 'Please provide more details regarding your equipment request';
  }

  if (!values.consent) {
    errors.consent = 'Consent is required to process your quotation';
  }

  return errors;
};

export default function ContactForm({ interestCategory = '', initialMessage = '' }) {
  const defaultValues = {
    ...initialFormState,
    category: interestCategory,
    message: initialMessage,
  };

  const {
    values,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    setValues,
  } = useForm(defaultValues, validateForm);

  useEffect(() => {
    if (interestCategory || initialMessage) {
      setValues((prev) => ({
        ...prev,
        category: interestCategory || prev.category,
        message: initialMessage || prev.message,
      }));
    }
  }, [interestCategory, initialMessage, setValues]);

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
        Request an Equipment Quotation
      </h3>
      <p className="text-slate-500 text-xs mb-6 leading-relaxed">
        Submit your requirements below. Our Nairobi sales engineers will prepare an official proforma quotation with full technical specifications and delivery terms.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Jane Mwangi"
              className={`w-full bg-slate-50 border rounded px-3 py-2 text-xs focus:bg-white focus:outline-none ${
                errors.name ? 'border-rose-500' : 'border-slate-300 focus:border-slate-500'
              }`}
            />
            {errors.name && <span className="text-[11px] text-rose-600 mt-1 block">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="name@hospital.co.ke"
              className={`w-full bg-slate-50 border rounded px-3 py-2 text-xs focus:bg-white focus:outline-none ${
                errors.email ? 'border-rose-500' : 'border-slate-300 focus:border-slate-500'
              }`}
            />
            {errors.email && <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>}
          </div>
        </div>

        {/* Row 2: Phone & Facility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number (WhatsApp) *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="e.g. 0723835776"
              className={`w-full bg-slate-50 border rounded px-3 py-2 text-xs focus:bg-white focus:outline-none ${
                errors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-slate-500'
              }`}
            />
            {errors.phone && <span className="text-[11px] text-rose-600 mt-1 block">{errors.phone}</span>}
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-slate-700 mb-1">
              Healthcare Facility / Practice Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={values.company}
              onChange={handleChange}
              placeholder="e.g. Eldoret Diagnostic Clinic"
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-slate-500"
            />
          </div>
        </div>

        {/* Product Category */}
        <div>
          <label htmlFor="category" className="block text-xs font-semibold text-slate-700 mb-1">
            Equipment Category of Interest *
          </label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            className={`w-full bg-slate-50 border rounded px-3 py-2 text-xs focus:bg-white focus:outline-none ${
              errors.category ? 'border-rose-500' : 'border-slate-300 focus:border-slate-500'
            }`}
          >
            <option value="">-- Select Product Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="text-[11px] text-rose-600 mt-1 block">{errors.category}</span>}
        </div>

        {/* Requirements details */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
            Inquiry Scope or Equipment Requirements *
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={values.message}
            onChange={handleChange}
            placeholder="Please detail machinery model names, delivery destination county, or specific consumable requests..."
            className={`w-full bg-slate-50 border rounded px-3 py-2 text-xs focus:bg-white focus:outline-none ${
              errors.message ? 'border-rose-500' : 'border-slate-300 focus:border-slate-500'
            }`}
          ></textarea>
          {errors.message && <span className="text-[11px] text-rose-600 mt-1 block">{errors.message}</span>}
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-2 pt-1">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={values.consent}
            onChange={handleChange}
            className="w-4 h-4 rounded text-primary-700 border-slate-300 shrink-0 mt-0.5"
          />
          <label htmlFor="consent" className="text-xs text-slate-500 leading-normal select-none">
            I agree to receive a formal quotation and equipment specifications from Biocare Health Systems Limited.
          </label>
        </div>
        {errors.consent && <span className="text-[11px] text-rose-600 block">{errors.consent}</span>}

        {/* Feedback Alert */}
        {submitStatus === 'success' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-emerald-900 text-xs font-medium">
            Inquiry submitted successfully. A sales representative will contact you with formal quotation details within 24 hours.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="bg-rose-50 border border-rose-200 rounded p-3 text-rose-900 text-xs font-medium">
            Unable to submit your request at this moment. Please call our sales desk directly at 0723 835776 or message us on WhatsApp.
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-700 hover:bg-primary-800 disabled:bg-slate-400 text-white font-medium py-3 rounded text-xs transition-colors"
          >
            {isSubmitting ? 'Submitting Quotation Request...' : 'Submit Formal Quotation Request'}
          </button>
        </div>

      </form>
    </div>
  );
}
