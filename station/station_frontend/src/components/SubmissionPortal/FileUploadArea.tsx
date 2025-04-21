import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const FileUploadArea = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-600">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: PDF, DOC, DOCX, ZIP
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea; 