import {Navbar} from '@/components/Navbar';
import ClassApp from '@/components/ClassPage/ClassApp';

const ClassPage = () => {
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Navbar />
      <main className="overflow-hidden flex-1 mt-16">
        <div className="p-4 h-full">
          <ClassApp />
        </div>
      </main>
    </div>
  );
};

export default ClassPage;