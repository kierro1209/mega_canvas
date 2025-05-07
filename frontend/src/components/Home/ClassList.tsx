import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Course {
    id: string;
    name: string;
    title: string;
    term: string;
    color: string;
}

// Replace with database data
const courses: Course[] = [
    {
        id: 'math32b',
        name: 'MATH32B',
        title: 'Calculus With Multiple Variables',
        term: 'Spring 2025',
        color: 'red-500'
    },
    {
        id: 'math33a',
        name: 'MATH33A',
        title: 'Linear Algebra and Applications',
        term: 'Spring 2025',
        color: 'green-500'
    },
    {
        id: 'desma28',
        name: 'DESMA28',
        title: 'Interactivity',
        term: 'Spring 2025',
        color: 'purple-500'
    }
];

{/* Color Mapping */}
const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
        'red-500': 'bg-red-500',
        'green-500': 'bg-green-500',
        'blue-500': 'bg-blue-500',
        'purple-500': 'bg-purple-500',    };
    return colorMap[color] || 'bg-gray-500';
};

{/* Class Card Template */}
const ClassCard = ({ course }: { course: Course }) => {
    const navigate = useNavigate();
    return (
    <div
        onClick={() => navigate(`/class/${course.id}`)}
        className="flex relative flex-col items-start p-4 space-y-2 w-64 bg-white rounded-lg border shadow-sm transition-shadow cursor-pointer border-border hover:bg-muted"
    >
        <div className={cn('mb-3 w-full rounded-md h-36', getColorClass(course.color))}></div>
        <h2 className="w-full text-base font-semibold text-gray-900 truncate">{course.name}: <span className="font-normal text-gray-700">{course.title}</span></h2>
        <div className="text-xs font-medium text-gray-500">{course.term}</div>
    </div>
    );
};

const ClassList = () => {
    return (
        <div className="flex justify-between items-center px-4 mb-4">
            <div className="flex flex-col items-start space-x-4 space-y-2">
                {/* Header */}
                <h1 className="text-xl font-bold">
                    Class List
                </h1>
                {/* Class Row */}
                <div className="flex flex-row space-x-2">
                    {courses.map(course => (
                        <ClassCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassList;