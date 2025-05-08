import ClassHeader from './ClassHeader';
import { Sidebar } from './ClassSidebar';
import { ResourceFilter, Resources, courses } from './ResourceFilter';
import { WeekAccordion } from './WeekAccordian';
import React from 'react';

const ClassApp = () => {
    const [selectedType, setSelectedType] = React.useState<'Reading' | 'Assignment' | 'Exam' | 'Lecture' | 'Slides' | 'all'>('all');

    return (
        <div className="overflow-y-auto h-full">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-4">
              <ClassHeader />
              <ResourceFilter
                selectedStatus="all"
                setSelectedStatus={() => {}}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            selectedCourse="all"
            setSelectedCourse={() => {}}
            courses={courses}
          />
          <div className="space-y-2">
            {Object.entries(
              Resources
                .filter(resource => selectedType === 'all' ? true : resource.type === selectedType)
                .reduce((acc: { [key: number]: any[] }, resource: any) => {
                const week = resource.week;
                if (!acc[week]) acc[week] = [];
                acc[week].push({
                  ...resource,
                  status: resource.status?.toUpperCase() as 'NO SUBMISSION' | 'SUBMITTED' | 'OVERDUE',
                  type: resource.type?.charAt(0).toUpperCase() + resource.type?.slice(1).toLowerCase() as 'Reading' | 'Assignment' | 'Exam' | 'Lecture' | 'Slides',
                  releaseDate: resource.postedDate?.toISOString(),
                  dueDate: resource.dueDate?.toISOString(),
                  postedDate: resource.postedDate?.toISOString()
                });
                return acc;
              }, {})
            )
              .sort(([weekA], [weekB]) => Number(weekA) - Number(weekB))
              .map(([week, resources]) => (
                <WeekAccordion
                  key={week}
                  weekNumber={Number(week)}
                  resources={resources}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassApp;