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
    errors.name = 'FullName is required';
  }
  
  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    // Basic Kenyan phone validation (07... or 01... or +254...)
    const cleanPhone = values.phone.replace(/\s+/g, '');
    if (!/^(?:\+254|0)[17]\d{8}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid Kenyan phone number (e.g. 0723835776)';
    }
  }

  if (!values.category) {
    errors.category = 'Please select a product category of interest';
  }

  if (!values.message.trim()) {
    errors.message = 'Inquiry message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  if (!values.consent) {
    errors.consent = 'You must agree to the privacy policy to submit';
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
    <div className="bg-white border border-gray-200/80 p-6 md:p-8 rounded-3xl shadow-sm">
      <h3 className="font-display font-extrabold text-xl text-primary-700 tracking-tight mb-2">
        Request a Quote or Demo
      </h3>
      <p className="text-gray-500 text-xs mb-6 leading-relaxed font-normal">
        Fill out the form below. Our team of product specialists and biomedical engineers will get in touch with you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Dr. John Doe"
              className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-600'
              }`}
              aria-required="true"
            />
            {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="name@facility.co.ke"
              className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-600'
              }`}
              aria-required="true"
            />
            {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
          </div>
        </div>

        {/* Row 2: Phone & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
              Phone Number (WhatsApp) *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="e.g. 0723835776"
              className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-600'
              }`}
              aria-required="true"
            />
            {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-gray-700 mb-1">
              Hospital / Lab Facility Name (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={values.company}
              onChange={handleChange}
              placeholder="e.g. Githinji Clinic"
              className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>

        {/* Interest Select */}
        <div>
          <label htmlFor="category" className="block text-xs font-semibold text-gray-700 mb-1">
            Product Interest *
          </label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 ${
              errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-600'
            }`}
            aria-required="true"
          >
            <option value="">-- Select Product Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="text-[10px] text-red-500 mt-1 block">{errors.category}</span>}
        </div>

        {/* Message area */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1">
            Specify Your Requirements *
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={values.message}
            onChange={handleChange}
            placeholder="Please detail your machine requirements, model preferences, or delivery scheduling..."
            className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 ${
              errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-600'
            }`}
            aria-required="true"
          ></textarea>
          {errors.message && <span className="text-[10px] text-red-500 mt-1 block">{errors.message}</span>}
        </div>

        {/* GDPR Consent */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={values.consent}
            onChange={handleChange}
            className="w-4 h-4 rounded text-primary-600 border-gray-300 focus:ring-primary-600 shrink-0 mt-0.5"
            aria-required="true"
          />
          <label htmlFor="consent" className="text-[11px] text-gray-500 leading-normal select-none">
            I consent to Biocare Health Systems Limited storing my details to contact me regarding this inquiry.
          </label>
        </div>
        {errors.consent && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.consent}</span>}

        {/* Status display */}
        {submitStatus === 'success' && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-emerald-800 text-xs font-semibold">
            🎉 Inquiry sent successfully! We will email/call you within 24 hours.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-800 text-xs font-semibold">
            ❌ Failed to submit inquiry. Please call us directly at 0723 835776.
          </div>
        )}

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary-600 hover:bg-secondary-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg text-xs transition-colors shadow-md flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Request...</span>
              </>
            ) : (
              <span>Submit Inquiry / Request Quote</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
