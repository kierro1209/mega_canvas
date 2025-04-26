import ClassHeader from './ClassHeader';
import { ResourceFilter, Resources, courses } from './ResourceFilter';
import { WeekAccordion } from './WeekAccordian';

const ClassApp = () => {
    return (
        <div className="overflow-y-auto h-full">
          <ClassHeader />
          <ResourceFilter
            selectedStatus="all"
            setSelectedStatus={() => {}}
            selectedCourse="all"
            setSelectedCourse={() => {}}
            courses={courses}
          />
          <div className="space-y-4">
            {Object.entries(
              Resources.reduce((acc: { [key: number]: any[] }, resource: any) => {
                const week = resource.week;
                if (!acc[week]) acc[week] = [];
                acc[week].push({
                  ...resource,
                  status: resource.status?.toUpperCase() as 'NO SUBMISSION' | 'SUBMITTED' | 'OVERDUE',
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