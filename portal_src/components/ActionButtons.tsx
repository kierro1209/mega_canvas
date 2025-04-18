
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    toast.success('Assignment submitted successfully!');
    setTimeout(() => navigate('/'), 1500);
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel your submission?')) {
      navigate(-1);
    }
  };

  const handleUploadClick = () => {
    // Use querySelector to get the file input element and ensure it exists before calling click
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        className="flex items-center gap-2 px-6 py-2 bg-[#663399] text-white rounded hover:bg-[#552288] transition-colors"
        onClick={handleUploadClick}
      >
        <Upload size={20} />
        Upload
      </button>
      <button
        className="px-6 py-2 bg-[#3355AA] text-white rounded hover:bg-[#224499] transition-colors"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="px-6 py-2 bg-[#CC3333] text-white rounded hover:bg-[#BB2222] transition-colors"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default ActionButtons;
