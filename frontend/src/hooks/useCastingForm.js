import { useState, useCallback } from "react";
import { submitCastingApplication } from "../services/api";

const INITIAL_FORM = {
  name: "",
  age: "",
  location: "",
  instagram: "",
  tiktok: "",
  photos: [],
};

export const useCastingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [auraScore, setAuraScore] = useState(0);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);

  const totalSteps = 6;

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updatePhotos = useCallback((filesArray) => {
    setFormData((prev) => ({ ...prev, photos: filesArray }));
    const bonus = Math.min(filesArray.length * 5, 50);
    setAuraScore((prev) => prev + bonus);
  }, []);

  const addAura = useCallback((points) => {
    setAuraScore((prev) => Math.max(prev, points));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    setErrors({});
    try {
      await submitCastingApplication(formData);
      setStatus("success");
      // Reset after 3 seconds
      setTimeout(() => {
        setCurrentStep(1);
        setAuraScore(0);
        setStatus(null);
        setFormData(INITIAL_FORM);
        setErrors({});
      }, 3500);
    } catch (err) {
      setStatus("error");
      setErrors(typeof err === "object" ? err : { general: "Submission failed. Try again." });
    }
  }, [formData]);

  return {
    currentStep,
    totalSteps,
    auraScore,
    formData,
    updateField,
    updatePhotos,
    addAura,
    nextStep,
    prevStep,
    handleSubmit,
    status,
    errors,
  };
};
