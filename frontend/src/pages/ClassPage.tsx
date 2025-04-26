import {Sidebar} from '@/components/Sidebar';
import ClassApp from '@/components/ClassPage/ClassApp';

const ClassPage = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <main className="overflow-hidden flex-1">
        <div className="p-4 h-full">
          <ClassApp />
        </div>
      </main>
    </div>
  );
};

export default ClassPage;