import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  // Fetch users on component mount
  useEffect(() => {
    fetchDemo();
  }, []);

  // Example of how to fetch data from the server (if needed)
  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-center max-w-2xl px-8">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#232323] flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#9FB971] via-[#FFD965] to-[#467896] rounded-full" />
          </div>
          <div className="flex">
            <span className="text-3xl font-bold text-[#232323]">uni</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#9FB971] via-[#FFD965] to-[#467896] bg-clip-text text-transparent">
              iq
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          College Admission Assessment
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Discover your chances of getting into your dream college with our comprehensive
          assessment tool. Answer a few questions about your academic background, test scores,
          and goals to receive personalized insights.
        </p>

        <Link to="/questionnaire">
          <Button
            size="lg"
            className="bg-[#232323] hover:bg-[#232323]/90 text-white px-8 py-3 text-lg font-semibold"
          >
            Start Assessment
          </Button>
        </Link>

        <div className="mt-8 text-sm text-slate-500">
          <p>Takes about 5 minutes to complete</p>
        </div>

        <div className="mt-12 text-xs text-slate-400">
          <p className="hidden">{exampleFromServer}</p>
        </div>
      </div>
    </div>
  );
}
