
import AssignmentHeader from '../components/AssignmentHeader';
import FileUploadArea from '../components/FileUploadArea';
import ActionButtons from '../components/ActionButtons';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AssignmentHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <span className="w-6 h-6 flex items-center justify-center border-2 border-current rounded-full text-sm">?</span>
          <p className="text-lg">Upload all files for your submission</p>
        </div>
        <FileUploadArea />
        <ActionButtons />
      </div>
    </div>
  );
};

export default Index;
