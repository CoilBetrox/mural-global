import { useState } from 'react';

/**
 * Hook para manejar formularios con validación.
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Function} validate - Función de validación
 * @param {Function} onSubmit - Función al enviar el formulario
 * @returns {Object} Estado y funciones del formulario
 */
function useForm(initialValues = {}, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * Maneja cambios en los inputs.
   * @param {Object} e - Evento de cambio
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  /**
   * Maneja el blur de los inputs.
   * @param {Object} e - Evento de blur
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validar campo específico
    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: validationErrors[name]
        }));
      }
    }
  };
  
  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validar todos los campos
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      // Resetear formulario después de envío exitoso
      setValues(initialValues);
      setTouched({});
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Resetea el formulario.
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  /**
   * Establece valores manualmente.
   * @param {Object} newValues - Nuevos valores
   */
  const setFieldValues = (newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValues
  };
}

export default useForm;