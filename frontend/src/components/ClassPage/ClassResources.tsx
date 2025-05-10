import React, { useState, useEffect } from 'react';
import ClassHeader from './ClassHeader';
import { ResourceFilter, Resources, courses } from './ResourceFilter';
import { WeekAccordion } from './WeekAccordian';

type ResourceType = 'Reading' | 'Assignment' | 'Exam' | 'Lecture' | 'Slides' | 'all';

const ClassResources = () => {
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
    <div className="p-4">
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
  );
};

export default ClassResources; 