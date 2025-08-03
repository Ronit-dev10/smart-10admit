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
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${index <= currentStep 
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
                  w-16 h-0.5 mx-1
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
      <div className="w-10 h-10 rounded-full bg-[#232323] flex items-center justify-center">
        <div className="w-6 h-6 bg-gradient-to-r from-[#9FB971] via-[#FFD965] to-[#467896] rounded-full" />
      </div>
      <div className="flex">
        <span className="text-2xl font-bold text-[#232323]">uni</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-[#9FB971] via-[#FFD965] to-[#467896] bg-clip-text text-transparent">
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
              <div className="w-80 h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#232323] rounded-full mx-auto flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#9FB971] to-[#467896] rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">University Assessment Tool</p>
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#282828] mb-4">
          What do you want to study?
        </h2>
        <p className="text-sm font-bold text-[#282828] uppercase tracking-wide">
          Select your intended major from the list below.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Select onValueChange={(value) => updateFormData('major', value)}>
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded bg-[#FDFDFD]">
            <SelectValue placeholder="--Select--" />
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
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const UniversitySelectionStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#282828] mb-4">
          Which universities are you interested in applying to?
        </h2>
        <p className="text-sm font-bold text-[#282828]">
          Type the name of the university or select from our dropdown list of popular schools{' '}
          <span className="font-normal text-[#797979]">(Select up to 5)</span>.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Select>
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded bg-[#FDFDFD]">
            <SelectValue placeholder="--Select--" />
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
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const SATScoreStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#282828] mb-4">
          What is your SAT score?
        </h2>
        <p className="text-sm font-bold text-[#282828]">
          Enter your most recent total SAT score out of 1600{' '}
          <span className="font-normal text-[#797979]">(optional if not taken yet)</span>
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Input
          type="number"
          placeholder="Type"
          min="400"
          max="1600"
          value={formData.satScore}
          onChange={(e) => updateFormData('satScore', e.target.value)}
          className="w-full p-4 border border-[#E3E3E3] rounded bg-[#FDFDFD]"
        />
      </div>
    </div>
  );

  const GPAStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#282828] mb-4">
          What is your cumulative GPA?
        </h2>
        <p className="text-sm font-bold text-[#282828] uppercase tracking-wide">
          Choose the GPA scale used and enter your score:
        </p>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex space-x-4">
          <Select onValueChange={(value) => updateFormData('gpaScale', value)}>
            <SelectTrigger className="flex-1 p-4 border border-[#E3E3E3] rounded bg-[#FDFDFD]">
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.0">4.0 Scale</SelectItem>
              <SelectItem value="5.0">5.0 Scale</SelectItem>
              <SelectItem value="100">100 Point Scale</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            placeholder="Enter Your Score"
            step="0.01"
            value={formData.gpaScore}
            onChange={(e) => updateFormData('gpaScore', e.target.value)}
            className="flex-1 p-4 border border-[#E3E3E3] rounded bg-[#FDFDFD]"
          />
        </div>
      </div>
    </div>
  );

  const GradeLevelStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#282828] mb-4">
          What is your current grade or class level?
        </h2>
      </div>
      
      <div className="max-w-md mx-auto">
        <Select onValueChange={(value) => updateFormData('gradeLevel', value)}>
          <SelectTrigger className="w-full p-4 border border-[#E3E3E3] rounded bg-[#FDFDFD]">
            <SelectValue placeholder="--Select--" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="freshman">Freshman (Grade 9)</SelectItem>
            <SelectItem value="sophomore">Sophomore (Grade 10)</SelectItem>
            <SelectItem value="junior">Junior (Grade 11)</SelectItem>
            <SelectItem value="senior">Senior (Grade 12)</SelectItem>
            <SelectItem value="gap-year">Gap Year</SelectItem>
            <SelectItem value="college-freshman">College Freshman</SelectItem>
            <SelectItem value="college-transfer">Transfer Student</SelectItem>
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
        
        <div className="flex justify-between items-center max-w-md mx-auto">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex items-center space-x-2 border-[#232323] text-[#232323] hover:bg-[#232323] hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold">Back</span>
            </Button>
          )}
          
          <div className="flex-1" />
          
          <Button
            onClick={nextStep}
            className="bg-[#232323] hover:bg-[#232323]/90 text-white flex items-center space-x-2"
          >
            <span className="font-bold">Next</span>
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
