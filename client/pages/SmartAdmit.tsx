import React, { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface FormData {
  major: string;
  universities: string[];
  satScore: string;
  gpaScale: string;
  gpaScore: string;
  gradeLevel: string;
  extracurricularHours: number;
  extracurricularTypes: string[];
  activityTitle: string;
  activityRole: string;
  activityDuration: string;
  activityHoursPerWeek: string;
}

// Isolated input component that manages its own state
const IsolatedInput = memo(({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  min,
  max,
  step
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  min?: string;
  max?: string;
  step?: string;
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Update local value when prop changes
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced update to parent
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to update parent after user stops typing
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  const handleBlur = () => {
    // Immediately update parent on blur
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onChange(localValue);
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      value={localValue}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      className={className}
      autoComplete="off"
    />
  );
});

const SmartAdmit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    major: "",
    universities: [],
    satScore: "",
    gpaScale: "",
    gpaScore: "",
    gradeLevel: "",
    extracurricularHours: 10,
    extracurricularTypes: [],
    activityTitle: "",
    activityRole: "",
    activityDuration: "",
    activityHoursPerWeek: "",
  });

  const totalSteps = 10;

  const updateFormData = useCallback((field: keyof FormData, value: string | string[] | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: return formData.major !== '';
      case 2: return formData.universities.length > 0;
      case 3: return true; // SAT score is optional
      case 4: return formData.gpaScale !== '' && formData.gpaScore !== '';
      case 5: return formData.gradeLevel !== '';
      case 6: return true; // Extracurricular hours step is optional
      case 7: return formData.extracurricularTypes.length > 0;
      case 8: return true; // More questions step is optional
      case 9: return true; // Results page
      default: return true;
    }
  };

  const nextStep = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (currentStep < totalSteps - 1 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const ProgressTimeline = () => {
    // Show only 7 steps in the timeline as per design, but track current step properly
    const timelineSteps = Math.min(currentStep, 7);
    const timelineCurrentStep = Math.min(currentStep - 1, 6); // Convert to 0-based for timeline

    return (
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          {Array.from({ length: 7 }, (_, index) => (
            <div key={index} className="flex items-center">
              <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-in-out transform hover:scale-110
                ${index < timelineCurrentStep
                  ? 'bg-[#232323] text-white scale-105'
                  : index === timelineCurrentStep
                  ? 'bg-[#232323] text-white scale-110 shadow-lg'
                  : 'bg-[#9F9C9C] text-white opacity-50'
                }
              `}
            >
                {index + 1}
              </div>
              {index < 6 && (
                <div
                  className={`
                    w-16 sm:w-20 md:w-24 h-[1.5px] mx-1 transition-all duration-500 ease-in-out
                    ${index < timelineCurrentStep ? 'bg-[#232323] scale-y-150' : 'bg-[#E3E3E3]'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9659 26.7822C18.2393 27.3867 18.5468 27.9742 18.8891 28.5454C19.2292 29.1644 19.6914 29.4972 20.1318 28.7192C24.1983 22.2409 21.8005 14.1471 23.2714 7.02908C24.2305 2.70076 29.9859 2.43707 33.3834 4.02968C36.5961 5.71827 36.992 9.72713 37.2966 12.9674C37.703 19.1111 37.904 26.5739 34.3537 31.8682C31.049 36.1049 24.9966 36.7909 20.1554 35.1465C19.7798 35.0784 19.3991 35.0878 19.0239 35.1527C16.521 35.8684 13.8491 36.3407 11.2734 35.7177C2.74176 33.9176 1.83335 25.8701 1.61024 18.4859C1.58995 16.793 1.6508 15.1 1.79931 13.4136C2.0753 10.6457 2.22888 7.59049 4.08698 5.35498C6.3895 2.5461 13.1062 2.16615 15.1454 5.40822C15.6699 6.20616 15.9542 7.17686 16.0893 8.13923C16.541 12.1025 16.337 16.0994 16.5996 20.0738C16.7018 22.3571 17.0216 24.6818 17.9659 26.7822ZM8.99881 30.3484C10.8529 31.6147 13.2478 32.1873 15.4609 31.748C15.6 31.702 15.693 31.6408 15.7474 31.564C15.9459 31.2793 15.5786 30.7845 15.4116 30.5049C13.2174 27.0332 12.5987 23.1525 12.493 19.1147C12.2836 15.9682 12.4586 12.8084 12.1866 9.66374C12.0616 7.76544 11.6422 7.14607 9.64752 7.23517C8.61053 7.29566 7.3928 7.49958 6.83429 8.48006C6.36089 9.30589 6.23049 10.2621 6.09394 11.1904C5.76362 13.4567 5.62598 15.7535 5.5865 18.0426C5.67886 20.0148 5.72848 22.0196 6.06823 23.9621C6.52895 26.2555 6.98315 28.8743 8.99809 30.3488L8.99881 30.3484ZM23.3424 31.5238C23.6007 31.9197 24.4123 31.8291 24.8397 31.8762C27.5124 31.9331 30.5343 30.9153 31.7835 28.3744C33.7202 24.5459 33.7347 17.667 33.3294 13.3995C33.1552 11.8015 33.09 10.1299 32.4022 8.64668C32.0653 7.88388 31.2576 7.49596 30.4604 7.35325C29.5419 7.22358 28.3589 7.02328 27.5671 7.65714C27.0952 8.08309 27.0691 8.77236 26.9742 9.36927C26.3255 15.9212 27.607 22.9834 24.4946 29.0514C24.2276 29.5842 23.9404 30.1072 23.6289 30.6154C23.4797 30.8714 23.1986 31.2699 23.3424 31.5241V31.5238Z" fill="#232323"/>
      </svg>
      <div className="flex items-start">
        <span className="text-[31px] font-bold text-[#232323] leading-none">uni</span>
        <span className="text-[31px] font-bold bg-gradient-to-r from-[#9FB971] via-[#FFD965] via-[#C17C74] to-[#467896] bg-clip-text text-transparent leading-none">
          iq
        </span>
      </div>
    </div>
  );

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-[#232323] flex items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <button className="text-[#E4E4E4] text-sm hover:text-white transition-colors flex items-center space-x-2">
          <span>Skip, Back to Dashboard</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <Card className="w-full max-w-4xl bg-white shadow-xl">
        <CardHeader className="text-center border-b border-[#E4E4E4] p-8">
          <CardDescription className="text-[#5E5E5E] text-sm font-semibold uppercase tracking-wide">
            Welcome to
          </CardDescription>
          <CardTitle className="text-4xl font-bold text-[#282828] mt-2">
            SmartAdmit
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-[#282828] leading-relaxed">
                  SmartAdmit helps you assess your chances of getting into your dream college by analyzing your grades, test scores, extracurriculars, and more. Unlock personalized insights, see how you stack up, and discover ways to boost your application with the Smart Admit.
                </p>
                <p className="font-bold text-[#232323]">
                  Your dream school is calling—see how close you are to answering!
                </p>
              </div>
              
              <Button
                onClick={nextStep}
                className="bg-[#232323] hover:bg-[#232323]/90 text-white px-8 py-3 rounded-lg flex items-center space-x-2"
              >
                <span className="text-lg font-bold">Get started</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="w-80 h-80 relative">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-200 rounded-full opacity-60" />
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-200 rounded-full opacity-60" />
                  <div className="absolute top-16 left-12 w-8 h-8 bg-green-200 rounded-full opacity-60" />

                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-[#232323] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#232323]">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="w-20 h-2 bg-gray-300 rounded mx-auto" />
                      <div className="w-16 h-2 bg-gray-300 rounded mx-auto" />
                      <div className="w-24 h-2 bg-gray-300 rounded mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {['Computer Science', 'Economics', 'Psychology', 'Business Administration', 'Political Science', 'Mechanical Engineering'].map((major) => (
              <span
                key={major}
                className="px-3 py-1.5 text-xs font-bold text-[#797979] border border-gray-200 rounded bg-white"
              >
                {major}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MajorSelectionStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828]">
          What do you want to study?
        </h2>
        <p className="text-xs sm:text-sm font-bold text-[#282828] uppercase tracking-wide px-4">
          Select your intended major from the list below.
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4">
        <Select onValueChange={(value) => updateFormData('major', value)} value={formData.major}>
          <SelectTrigger className={`w-full p-4 border rounded-md bg-[#FDFDFD] text-left ${formData.major ? 'border-[#E3E3E3]' : 'border-red-200'}`}>
            <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="computer-science">Computer Science</SelectItem>
            <SelectItem value="economics">Economics</SelectItem>
            <SelectItem value="psychology">Psychology</SelectItem>
            <SelectItem value="business-administration">Business Administration</SelectItem>
            <SelectItem value="political-science">Political Science</SelectItem>
            <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="english">English Literature</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
        {!formData.major && (
          <p className="mt-2 text-xs text-red-500 text-center">Please select your intended major to continue</p>
        )}
      </div>
    </div>
  );

  const UniversitySelectionStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828] leading-tight">
          Which universities are you interested in applying to?
        </h2>
        <p className="text-xs sm:text-sm px-4 max-w-2xl mx-auto">
          <span className="font-bold text-[#282828]">
            Type the name of the university or select from our dropdown list of popular schools
          </span>{' '}
          <span className="font-normal text-[#797979] uppercase tracking-wide">
            (Select up to 5)
          </span>
          <span className="font-bold text-[#282828]">.</span>
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4">
        <Select onValueChange={(value) => {
          const universityName = {
            'harvard': 'Harvard University',
            'stanford': 'Stanford University',
            'mit': 'Massachusetts Institute of Technology',
            'yale': 'Yale University',
            'princeton': 'Princeton University',
            'columbia': 'Columbia University',
            'upenn': 'University of Pennsylvania',
            'brown': 'Brown University',
            'cornell': 'Cornell University',
            'dartmouth': 'Dartmouth College',
            'duke': 'Duke University',
            'northwestern': 'Northwestern University',
            'uchicago': 'University of Chicago',
            'vanderbilt': 'Vanderbilt University',
            'rice': 'Rice University'
          }[value] || value;

          if (!formData.universities.includes(universityName) && formData.universities.length < 5) {
            updateFormData('universities', [...formData.universities, universityName]);
          }
        }}>
          <SelectTrigger className={`w-full p-4 border rounded-md bg-[#FDFDFD] text-left ${formData.universities.length > 0 ? 'border-[#E3E3E3]' : 'border-red-200'}`}>
            <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="harvard">Harvard University</SelectItem>
            <SelectItem value="stanford">Stanford University</SelectItem>
            <SelectItem value="mit">Massachusetts Institute of Technology</SelectItem>
            <SelectItem value="yale">Yale University</SelectItem>
            <SelectItem value="princeton">Princeton University</SelectItem>
            <SelectItem value="columbia">Columbia University</SelectItem>
            <SelectItem value="upenn">University of Pennsylvania</SelectItem>
            <SelectItem value="brown">Brown University</SelectItem>
            <SelectItem value="cornell">Cornell University</SelectItem>
            <SelectItem value="dartmouth">Dartmouth College</SelectItem>
            <SelectItem value="duke">Duke University</SelectItem>
            <SelectItem value="northwestern">Northwestern University</SelectItem>
            <SelectItem value="uchicago">University of Chicago</SelectItem>
            <SelectItem value="vanderbilt">Vanderbilt University</SelectItem>
            <SelectItem value="rice">Rice University</SelectItem>
          </SelectContent>
        </Select>

        {formData.universities.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-[#282828]">Selected Universities ({formData.universities.length}/5):</p>
            <div className="flex flex-wrap gap-2">
              {formData.universities.map((uni, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-[#282828] bg-gray-100 rounded-full flex items-center space-x-1"
                >
                  <span>{uni}</span>
                  <button
                    onClick={() => {
                      const newUniversities = formData.universities.filter((_, i) => i !== index);
                      updateFormData('universities', newUniversities);
                    }}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {formData.universities.length === 0 && (
          <p className="mt-2 text-xs text-red-500 text-center">Please select at least one university to continue</p>
        )}

        {formData.universities.length >= 5 && (
          <p className="mt-2 text-xs text-[#797979] text-center">Maximum of 5 universities selected</p>
        )}
      </div>
    </div>
  );

  const SATScoreStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828]">
          What is your SAT score?
        </h2>
        <p className="text-xs sm:text-sm px-4 max-w-2xl mx-auto">
          <span className="font-bold text-[#282828] uppercase tracking-wide">
            Enter your most recent total SAT score out of 1600
          </span>
          <span className="font-normal text-[#797979]">
            (optional if not taken yet)
          </span>
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4">
        <IsolatedInput
          type="number"
          placeholder="Type"
          min="400"
          max="1600"
          value={formData.satScore}
          onChange={(value) => updateFormData('satScore', value)}
          className="w-full p-5 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-base placeholder:text-[#9F9C9C]"
        />
        <div className="mt-2 min-h-[20px]">
          {formData.satScore && (
            <p className="text-xs text-[#797979] text-center">
              Score range: 400-1600 • Average: ~1050
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const GPAStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828]">
          What is your cumulative GPA?
        </h2>
        <p className="text-xs sm:text-sm font-bold text-[#282828] uppercase tracking-wide px-4">
          Choose the GPA scale used and enter your score:
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Select onValueChange={(value) => updateFormData('gpaScale', value)} value={formData.gpaScale}>
            <SelectTrigger className="flex-1 p-4 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
              <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.0">4.0 Scale</SelectItem>
              <SelectItem value="5.0">5.0 Scale (Weighted)</SelectItem>
              <SelectItem value="100">100 Point Scale</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <IsolatedInput
            type="number"
            placeholder="Enter Your Score"
            step="0.01"
            value={formData.gpaScore}
            onChange={(value) => updateFormData('gpaScore', value)}
            className="flex-1 p-5 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-base placeholder:text-[#9F9C9C]"
          />
        </div>

        <div className="min-h-[40px]">
          {formData.gpaScale && (
            <div className="text-xs text-[#797979] text-center space-y-1">
              {formData.gpaScale === "4.0" && <p>Range: 0.0 - 4.0 • Average: ~3.0</p>}
              {formData.gpaScale === "5.0" && <p>Range: 0.0 - 5.0 • Average: ~3.5</p>}
              {formData.gpaScale === "100" && <p>Range: 0 - 100 • Average: ~85</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const GradeLevelStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828]">
          What is your current grade or class level?
        </h2>
      </div>

      <div className="max-w-lg mx-auto px-4">
        <Select onValueChange={(value) => updateFormData('gradeLevel', value)} value={formData.gradeLevel}>
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
            <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="freshman">Freshman (Grade 9)</SelectItem>
            <SelectItem value="sophomore">Sophomore (Grade 10)</SelectItem>
            <SelectItem value="junior">Junior (Grade 11)</SelectItem>
            <SelectItem value="senior">Senior (Grade 12)</SelectItem>
            <SelectItem value="gap-year">Gap Year</SelectItem>
            <SelectItem value="college-freshman">College Freshman</SelectItem>
            <SelectItem value="college-transfer">Transfer Student</SelectItem>
            <SelectItem value="graduate">Graduate Student</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const ExtracurricularHoursStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828] leading-tight">
          On average, how many hours per week do you spend on extracurricular activities?
        </h2>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-12">
        <div className="space-y-3">
          <div className="relative w-full h-10 flex items-center">
            {/* Background track */}
            <div className="w-full h-2.5 bg-gray-200 rounded-lg border border-[#E4E4E4]" />

            {/* Progress fill */}
            <div
              className="h-2.5 bg-[#E0BEBA] rounded-lg absolute top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ease-out"
              style={{ width: `${(formData.extracurricularHours / 40) * 100}%` }}
            />

            {/* Slider thumb */}
            <div
              className="absolute top-1/2 w-4 h-4 bg-[#C17C74] border-2 border-white rounded-full cursor-pointer transform -translate-y-1/2 transition-all duration-300 ease-out shadow-lg hover:scale-110"
              style={{ left: `calc(${(formData.extracurricularHours / 40) * 100}% - 8px)` }}
            />

            {/* Invisible range input overlay */}
            <input
              type="range"
              min="0"
              max="40"
              value={formData.extracurricularHours}
              onChange={(e) => updateFormData('extracurricularHours', parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer opacity-0 z-10"
              style={{
                WebkitAppearance: 'none',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm font-bold text-[#434343]">
          <span>0</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
          <span>25</span>
          <span>30</span>
          <span>35</span>
          <span>40+</span>
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-[#282828]">
            Current selection: {formData.extracurricularHours} hours per week
          </p>
        </div>
      </div>
    </div>
  );

  const ExtracurricularTypesStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828] leading-tight">
          Which types of extracurricular activities have you participated in?
        </h2>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-4">
        <div className="text-xs font-bold text-[#282828] uppercase tracking-wider">
          Select all that apply:
        </div>
        
        <Select onValueChange={(value) => {
          if (!formData.extracurricularTypes.includes(value)) {
            updateFormData('extracurricularTypes', [...formData.extracurricularTypes, value]);
          }
        }}>
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
            <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sports">Sports/Athletics</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="drama">Drama/Theater</SelectItem>
            <SelectItem value="debate">Debate/Speech</SelectItem>
            <SelectItem value="volunteering">Volunteering/Community Service</SelectItem>
            <SelectItem value="academic-clubs">Academic Clubs</SelectItem>
            <SelectItem value="student-government">Student Government</SelectItem>
            <SelectItem value="art">Visual Arts</SelectItem>
            <SelectItem value="writing">Writing/Journalism</SelectItem>
            <SelectItem value="research">Research Projects</SelectItem>
            <SelectItem value="internships">Internships</SelectItem>
            <SelectItem value="leadership">Leadership Roles</SelectItem>
            <SelectItem value="competitions">Academic Competitions</SelectItem>
            <SelectItem value="technology">Technology/Coding</SelectItem>
            <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
          </SelectContent>
        </Select>

        {formData.extracurricularTypes.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-[#282828]">Selected Activities:</p>
            <div className="flex flex-wrap gap-2">
              {formData.extracurricularTypes.map((activity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-[#282828] bg-gray-100 rounded-full flex items-center space-x-1"
                >
                  <span>{activity.charAt(0).toUpperCase() + activity.slice(1).replace('-', ' ')}</span>
                  <button
                    onClick={() => {
                      const newTypes = formData.extracurricularTypes.filter((_, i) => i !== index);
                      updateFormData('extracurricularTypes', newTypes);
                    }}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {formData.extracurricularTypes.length === 0 && (
          <p className="mt-2 text-xs text-red-500 text-center">Please select at least one activity type to continue</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[#282828] font-bold text-lg">
                To improve your chances of an accurate SmartAdmit score, you can optionally answer a few short questions about your activities.
              </p>
            </div>
            <Button 
              onClick={() => setCurrentStep(8)}
              className="bg-[#232323] text-white px-4 py-2 rounded-md font-bold text-sm flex items-center space-x-2 hover:bg-[#232323]/90"
            >
              <span>Answer now</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const MoreQuestionsStep = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#282828]">
          More Questions
        </h2>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-8">
        <div className="space-y-2">
          <Label className="text-[#232323] font-bold">Activity Title:</Label>
          <IsolatedInput
            type="text"
            placeholder="Text"
            value={formData.activityTitle}
            onChange={(value) => updateFormData('activityTitle', value)}
            className="w-full p-3 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-base placeholder:text-[#9F9C9C]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#232323] font-bold">Your Role:</Label>
          <Select onValueChange={(value) => updateFormData('activityRole', value)} value={formData.activityRole}>
            <SelectTrigger className="w-full p-3 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
              <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="president">President</SelectItem>
              <SelectItem value="vice-president">Vice President</SelectItem>
              <SelectItem value="secretary">Secretary</SelectItem>
              <SelectItem value="treasurer">Treasurer</SelectItem>
              <SelectItem value="captain">Captain</SelectItem>
              <SelectItem value="co-captain">Co-Captain</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="participant">Participant</SelectItem>
              <SelectItem value="founder">Founder</SelectItem>
              <SelectItem value="organizer">Organizer</SelectItem>
              <SelectItem value="team-lead">Team Lead</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#232323] font-bold">Duration:</Label>
          <Select onValueChange={(value) => updateFormData('activityDuration', value)} value={formData.activityDuration}>
            <SelectTrigger className="w-full p-3 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
              <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-1-year">Less than 1 year</SelectItem>
              <SelectItem value="1-year">1 year</SelectItem>
              <SelectItem value="2-years">2 years</SelectItem>
              <SelectItem value="3-years">3 years</SelectItem>
              <SelectItem value="4-years">4 years or more</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#232323] font-bold">
            Hours per Week <span className="text-[#434343] font-bold">(optional)</span>:
          </Label>
          <Select onValueChange={(value) => updateFormData('activityHoursPerWeek', value)} value={formData.activityHoursPerWeek}>
            <SelectTrigger className="w-full p-3 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
              <SelectValue placeholder="--Select--" className="text-[#9F9C9C]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 hours</SelectItem>
              <SelectItem value="3-5">3-5 hours</SelectItem>
              <SelectItem value="6-10">6-10 hours</SelectItem>
              <SelectItem value="11-15">11-15 hours</SelectItem>
              <SelectItem value="16-20">16-20 hours</SelectItem>
              <SelectItem value="20+">20+ hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const ResultsPage = () => (
    <div className="min-h-screen bg-[#FDFDFD] relative">
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <Logo />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="pt-16 sm:pt-12">
          {/* Score Circle */}
          <div className="flex flex-col items-center space-y-10 mb-16">
            <div className="relative w-72 h-72">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 272 271">
                <circle
                  cx="136"
                  cy="135.5"
                  r="105.5"
                  fill="white"
                  stroke="#F9F9FD"
                  strokeWidth="16"
                />
                <path
                  d="M 241.5 135.5 A 105.5 105.5 0 1 1 135.5 30"
                  fill="none"
                  stroke="#69813F"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs font-medium text-[#797979] uppercase tracking-wider mb-2">
                  Your smart-admit score
                </p>
                <p className="text-5xl font-bold text-[#0A0A0B]">82%</p>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white rounded-full px-3 py-2 shadow-lg">
                <p className="text-xs font-bold text-[#69813F]">Better than 48% students</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-lg text-[#434343]">
                Based on your academics, test scores, activities, and preferred course/university -
              </p>
              <div className="inline-flex items-center bg-[rgba(129,169,61,0.1)] border border-[rgba(105,129,63,0.1)] rounded-md px-4 py-2">
                <div className="w-2 h-2 bg-[#69813F] rounded-full mr-3" />
                <span className="font-bold text-[#232323]">Strong profile</span>
              </div>
            </div>
          </div>

          {/* Top Program Matches */}
          <div className="bg-[rgba(228,228,228,0.3)] border border-[rgba(228,228,228,0.6)] rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#282828]">Top Program Matches</h3>
              <Button variant="outline" className="border-[#232323] text-[#232323] hover:bg-[#232323] hover:text-white">
                View more
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "Harvard University", logo: "🎓", score: "84%" },
                { name: "Brown University", logo: "🏛️", score: "84%" },
                { name: "Yale University", logo: "⚡", score: "84%" },
                { name: "MIT University", logo: "🔬", score: "84%" }
              ].map((uni, index) => (
                <div key={index} className="bg-white border border-[rgba(228,228,228,0.6)] rounded-lg p-4 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl border">
                    {uni.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#232323] text-sm">{uni.name}</h4>
                      <ChevronRight className="w-5 h-5 text-[#232323]" />
                    </div>
                    <p className="text-xl font-bold text-[#0A0A0B]">{uni.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white border border-[#E6E9F5] rounded-lg shadow-sm mb-8">
            <div className="border-b border-[#E6E9F5] p-6 text-center">
              <h3 className="text-2xl font-bold text-[#282828]">
                How You Compare <span className="text-lg font-normal text-[#5E5E5E]">(vs avg admitted applicant)</span>
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E6E9F5]">
                    <th className="text-left p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">Metric</th>
                    <th className="text-left p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">You</th>
                    <th className="text-left p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">Avg Admitted</th>
                    <th className="text-left p-4 font-bold text-[#282828]">Comparison Insight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E6E9F5]">
                    <td className="p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">GPA</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">3.75</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">3.7</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#467896] rounded-full mr-2" />
                        <span className="text-[#434343]">In the range</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E6E9F5]">
                    <td className="p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">SAT</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">1450</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">1475</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FFC512] rounded-full mr-2" />
                        <span className="text-[#434343]">Below recommended range</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E6E9F5]">
                    <td className="p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">EC Score</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">7.8/10</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">6.9</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#467896] rounded-full mr-2" />
                        <span className="text-[#434343]">In the range</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E6E9F5]">
                    <td className="p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">Research/Internship</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">Present</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">40% of admit</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#69813F] rounded-full mr-2" />
                        <span className="text-[#434343]">Bonus advantage</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#282828] border-r border-[#E6E9F5]">Subject Rigor</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">High</td>
                    <td className="p-4 text-[#434343] border-r border-[#E6E9F5]">Medium-High</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#C17C74] rounded-full mr-2" />
                        <span className="text-[#434343]">Above recommended range</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-[rgba(159,185,113,0.3)] rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 text-[#69813F]">⭐</div>
                <h3 className="text-xl font-bold text-[#232323]">What's Working for You</h3>
              </div>
              <div className="space-y-3 text-sm text-[#282828]">
                <p>• Leadership & long-term EC involvement.</p>
                <p>• Internship/research aligns with chosen major.</p>
                <p>• Subject selection matches program rigor.</p>
              </div>
            </div>

            <div className="bg-white border border-[#E0BEBA] rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 text-[#C17C74]">📊</div>
                  <h3 className="text-xl font-bold text-[#232323]">What Needs Improvement</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm text-[#282828] mb-4">
                <p>• Slight SAT gap for ultra-competitive US programs.</p>
                <p>• Lack of subject-specific competition participation.</p>
              </div>
              <Button className="bg-[#C17C74] text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-[#C17C74]/90">
                How to improve?
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <p className="text-sm font-bold text-[#393939] uppercase tracking-wider">
                Here are some suggested next steps to help you reach your goals:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[rgba(129,169,61,0.1)] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl font-bold text-[#AEAEAE]">01</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#232323] mb-2">Check other universities/ backups</h4>
                    <p className="text-sm text-[#656565] mb-4">Lorem ipsum dolor sit amet consectetur. Consequat non massa aliquam viverra.</p>
                    <Button className="bg-[#69813F] text-white px-3 py-2 rounded-md font-bold text-sm hover:bg-[#69813F]/90">
                      Check now
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(255,217,101,0.15)] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl font-bold text-[#AEAEAE]">02</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#232323] mb-2">Get a roadmap to boost odds</h4>
                    <p className="text-sm text-[#656565] mb-4">Lorem ipsum dolor sit amet consectetur. Consequat non massa aliquam viverra.</p>
                    <Button className="bg-[#FFD965] text-[#232323] px-3 py-2 rounded-md font-bold text-sm hover:bg-[#FFD965]/90">
                      Get started
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(55,107,139,0.1)] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl font-bold text-[#AEAEAE]">03</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#232323] mb-2">Set deadlines + alerts in your dashboard</h4>
                    <p className="text-sm text-[#656565] mb-4">Lorem ipsum dolor sit amet consectetur. Consequat non massa aliquam viverra.</p>
                    <Button className="bg-[#467896] text-white px-3 py-2 rounded-md font-bold text-sm hover:bg-[#467896]/90">
                      Set up your planner
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <WelcomeScreen />;
      case 1: return <MajorSelectionStep />;
      case 2: return <UniversitySelectionStep />;
      case 3: return <SATScoreStep />;
      case 4: return <GPAStep />;
      case 5: return <GradeLevelStep />;
      case 6: return <ExtracurricularHoursStep />;
      case 7: return <ExtracurricularTypesStep />;
      case 8: return <MoreQuestionsStep />;
      case 9: return <ResultsPage />;
      default: return <WelcomeScreen />;
    }
  };

  if (currentStep === 0 || currentStep === 9) {
    return renderStep();
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <Logo />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="pt-16 sm:pt-12">
          <ProgressTimeline />
        </div>

        <div className="mb-8 sm:mb-12">
          <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderStep()}
          </div>
        </div>

        <div className="flex justify-between items-center max-w-lg mx-auto px-4 mt-8 sm:mt-12">
          {currentStep > 1 ? (
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex items-center space-x-2 border-[#232323] text-[#232323] hover:bg-[#232323] hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 transition-transform duration-200" />
              <span className="font-bold text-sm sm:text-base">Back</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={nextStep}
            disabled={currentStep >= 9 || (currentStep > 0 && !isStepValid(currentStep))}
            className="bg-[#232323] hover:bg-[#232323]/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <span className="font-bold text-sm sm:text-base">
              {currentStep >= 8 ? 'Submit' : 'Next'}
            </span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-60 sm:h-80 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-80 opacity-20">
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-t from-blue-50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-t from-indigo-50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default SmartAdmit;
