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
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setValues(initialValues);
          if (onSubmitSuccess) onSubmitSuccess();
        } else {
          setSubmitStatus('error');
          if (onSubmitError) onSubmitError();
        }
      } catch (err) {
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
