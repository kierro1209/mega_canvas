import ClassHeader from './ClassHeader';
import { Sidebar } from './ClassSidebar';
import { ResourceFilter, Resources, courses } from './ResourceFilter';
import { WeekAccordion } from './WeekAccordian';
import React, { useState, useEffect } from 'react';

type ResourceType = 'Reading' | 'Assignment' | 'Exam' | 'Lecture' | 'Slides' | 'all';

const ClassApp = () => {
    const [selectedType, setSelectedType] = useState<ResourceType>('all');
    const [selectedWeeks, setSelectedWeeks] = useState<number[]>([]);
    const [filteredResources, setFilteredResources] = useState<any[]>(Resources);

    // Process resources based on filters
    useEffect(() => {
        let filtered = [...Resources];

        // Filter by type
        if (selectedType !== 'all') {
            const typeFilter = selectedType.toLowerCase();
            filtered = filtered.filter(resource => 
                resource.type.toLowerCase() === typeFilter
            );
        }

        // Filter by weeks
        if (selectedWeeks.length > 0) {
            filtered = filtered.filter(resource => 
                selectedWeeks.includes(resource.week)
            );
        }

        setFilteredResources(filtered);
    }, [selectedType, selectedWeeks]);

    return (
        <div className="h-full overflow-hidden">
          <div className="flex h-full">
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
                onWeekFilterChange={setSelectedWeeks}
              />
              <div className="space-y-2">
                {Object.entries(
                  filteredResources
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