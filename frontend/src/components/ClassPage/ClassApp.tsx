import ClassHeader from './ClassHeader';
import { ResourceFilter, Resources, courses } from './ResourceFilter';
import { WeekAccordion } from './WeekAccordian';
import React from 'react';

const ClassApp = () => {
    const [selectedType, setSelectedType] = React.useState<'reading' | 'assignment' | 'exam' | 'lecture' | 'slides' | 'all'>('all');

    return (
        <div className="overflow-y-auto h-full">
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
                  type: resource.type?.toLowerCase() as 'reading' | 'assignment' | 'exam' | 'lecture' | 'slides',
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
      );
    };

export default ClassApp;