import { useState } from "react";
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
}

const SmartAdmit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    major: "",
    universities: [],
    satScore: "",
    gpaScale: "",
    gpaScore: "",
    gradeLevel: "",
  });

  const totalSteps = 7;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const ProgressTimeline = () => (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${index < currentStep
                  ? 'bg-[#232323] text-white'
                  : index === currentStep
                  ? 'bg-[#232323] text-white'
                  : 'bg-[#9F9C9C] text-white opacity-50'
                }
              `}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`
                  w-16 sm:w-20 md:w-24 h-[1.5px] mx-1 transition-all
                  ${index < currentStep ? 'bg-[#232323]' : 'bg-[#E3E3E3]'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

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
                {/* Placeholder for the illustration - using a simplified version */}
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Illustration elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-200 rounded-full opacity-60" />
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-200 rounded-full opacity-60" />
                  <div className="absolute top-16 left-12 w-8 h-8 bg-green-200 rounded-full opacity-60" />

                  {/* Central figure */}
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
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
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
        <Select>
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-left">
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

        {/* Show selected universities */}
        {formData.universities.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-[#282828]">Selected Universities:</p>
            <div className="flex flex-wrap gap-2">
              {formData.universities.map((uni, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-[#282828] bg-gray-100 rounded-full"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>
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
          </span>{' '}
          <span className="font-normal text-[#797979]">
            (optional if not taken yet)
          </span>
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4">
        <Input
          type="number"
          placeholder="Type"
          min="400"
          max="1600"
          value={formData.satScore}
          onChange={(e) => updateFormData('satScore', e.target.value)}
          className="w-full p-5 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-base placeholder:text-[#9F9C9C]"
        />
        {formData.satScore && (
          <p className="mt-2 text-xs text-[#797979] text-center">
            Score range: 400-1600 • Average: ~1050
          </p>
        )}
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

          <Input
            type="number"
            placeholder="Enter Your Score"
            step="0.01"
            value={formData.gpaScore}
            onChange={(e) => updateFormData('gpaScore', e.target.value)}
            className="flex-1 p-5 border border-[#E3E3E3] rounded-md bg-[#FDFDFD] text-base placeholder:text-[#9F9C9C]"
          />
        </div>

        {formData.gpaScale && (
          <div className="text-xs text-[#797979] text-center space-y-1">
            {formData.gpaScale === "4.0" && <p>Range: 0.0 - 4.0 • Average: ~3.0</p>}
            {formData.gpaScale === "5.0" && <p>Range: 0.0 - 5.0 • Average: ~3.5</p>}
            {formData.gpaScale === "100" && <p>Range: 0 - 100 • Average: ~85</p>}
          </div>
        )}
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

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <WelcomeScreen />;
      case 1: return <MajorSelectionStep />;
      case 2: return <UniversitySelectionStep />;
      case 3: return <SATScoreStep />;
      case 4: return <GPAStep />;
      case 5: return <GradeLevelStep />;
      default: return <WelcomeScreen />;
    }
  };

  if (currentStep === 0) {
    return renderStep();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-20">
        <ProgressTimeline />
        
        <div className="mb-12">
          {renderStep()}
        </div>
        
        <div className="flex justify-between items-center max-w-lg mx-auto px-4 mt-12">
          {currentStep > 1 ? (
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex items-center space-x-2 border-[#232323] text-[#232323] hover:bg-[#232323] hover:text-white px-6 py-3"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold text-sm sm:text-base">Back</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={nextStep}
            disabled={currentStep >= 5}
            className="bg-[#232323] hover:bg-[#232323]/90 disabled:bg-gray-400 text-white flex items-center space-x-2 px-6 py-3"
          >
            <span className="font-bold text-sm sm:text-base">
              {currentStep >= 5 ? 'Complete' : 'Next'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none opacity-20" />
    </div>
  );
};

export default SmartAdmit;
