
import { ArrowLeft } from "lucide-react";

const AssignmentHeader = () => {
  const handleGoBack = () => {
    // Use window.history instead of useNavigate
    window.history.back();
  };
  
  return (
    <div className="flex justify-between items-center w-full bg-[#663399] text-white p-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleGoBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Submit Assignment</h1>
      </div>
      <div className="text-right">
        <p className="text-sm uppercase">TIME REMAINING</p>
        <p className="text-2xl font-bold">30 mins</p>
      </div>
    </div>
  );
};

export default AssignmentHeader;
