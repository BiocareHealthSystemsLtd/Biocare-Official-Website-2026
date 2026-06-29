import { useState } from 'react';

export default function useForm(initialValues, validate, onSubmitSuccess, onSubmitError) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCustomChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        const response = await fetch('https://formsubmit.co/ajax/biocarehealthsystems@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `[Biocare Website Inquiry] - ${values.category} from ${values.name}`,
            Name: values.name,
            Email: values.email,
            Phone: values.phone,
            "Company / Facility": values.company || 'N/A',
            "Product Interest": values.category,
            Message: values.message
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const isSuccess = data.success === 'true' || data.success === true;
          const isActivation = data.message && (data.message.toLowerCase().includes('activate') || data.message.toLowerCase().includes('active'));

          if (isSuccess || isActivation) {
            setSubmitStatus('success');
            setValues(initialValues);
            if (onSubmitSuccess) onSubmitSuccess();
          } else {
            console.error('FormSubmit response success was false:', data);
            setSubmitStatus('error');
            if (onSubmitError) onSubmitError();
          }
        } else {
          const errText = await response.text();
          console.error('FormSubmit HTTP error:', response.status, errText);
          setSubmitStatus('error');
          if (onSubmitError) onSubmitError();
        }
      } catch (err) {
        console.error('Form submit network or CORS error:', err);
        setSubmitStatus('error');
        if (onSubmitError) onSubmitError();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleCustomChange,
    handleSubmit,
    setValues,
  };
}
