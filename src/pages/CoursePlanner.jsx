import SearchBar from "../components/ui/SearchBar";
import CourseCard from "../components/CourseCard";
import AddCourseCard from "../components/AddCourseCard";

const CoursePlanner = () => {

        return(
        <>
            <br />
            <br />
            <br />
            <div className="">
                <h2 className="text-purple-950 font-bold font-serif text-5xl absolute left-8">Course Planner</h2>
                <SearchBar></SearchBar>
            </div>
            <div className="flex-row flex-wrap grid grid-cols-3 justify-items-center items-start">
            <CourseCard courseName="Statistics Chapter - 1"
                        courseWeek="1"
                        courseType="Lecture"
                        courseObjective="Master statistical methods to analyze data and make informed decisions effectively."
                        courseDesc="In this lecture, we will explore the fundamentals of probability theory, including key
                        concepts such as random variables, probability distributions, and the rules of probability. Through
                        real-world examples, we’ll discuss how probability forms the foundation for statistical inference
                        and decision-making."
            ></CourseCard>

            <CourseCard courseName="Statistics Chapter - 1"
                        courseWeek="2"
                        courseType="Assesment"
                        courseObjective="Master statistical methods to analyze data and make informed decisions effectively."
                        courseDesc="This assessment will test your understanding of probability concepts covered in the lecture.
                        You will solve problems involving probability rules, calculate probabilities for discrete and
                        continuous random variables, and interpret probability distributions. Submit your solutions
                        with clear reasoning and steps."></CourseCard>

            <CourseCard courseName="Statistics Chapter - 3"
                        courseWeek="3"
                        courseType="Lecture"
                        courseObjective="Develop skills to collect, analyze, and interpret data for practical applications."
                        courseDesc="n this lecture, we will dive into hypothesis testing, focusing on the steps involved
                        in formulating null and alternative hypotheses, selecting significance levels, and interpreting
                        p-values. We’ll also cover common tests like the t-test and z-test, using practical examples
                        to illustrate their applications in research and data analysis."></CourseCard>

            <AddCourseCard></AddCourseCard>
            <AddCourseCard></AddCourseCard>
            <AddCourseCard></AddCourseCard>
            </div>
        </>
        );
    };

export default CoursePlanner