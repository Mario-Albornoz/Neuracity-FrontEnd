import SearchBar from "../components/ui/SearchBar";
import CourseCard from "../components/CourseCard";
import AddCourseCard from "../components/AddCourseCard";
import { coursePlannerClasses } from "../constants";

const CoursePlanner = () => {

        return(
        <>
            <div className="mt-24">
                <h2 className="text-purple-950 font-bold font-serif text-5xl absolute left-8">Course Planner</h2>
                <SearchBar></SearchBar>
            </div>
            <div className="flex-row flex-wrap grid grid-cols-3 justify-items-center items-start">
                {coursePlannerClasses.map((classData, index) => (
                    <CourseCard
                    key = {index}
                    courseName = {classData.courseName}
                    courseWeek = {classData.courseWeek}
                    courseType = {classData.courseType}
                    courseObjective = {classData.courseObjective}
                    courseDesc = {classData.courseDesc}
                    />
                ))}

            <AddCourseCard />
            <AddCourseCard />
            <AddCourseCard />
            </div>
        </>
        );
    };

export default CoursePlanner