import DropdownMenu from "./ui/DropdownMenu";
import PropTypes from 'prop-types';

function CourseCard(props){

    return(
        <div className="flex flex-col border-2 border-purple-300 rounded-2xl mt-5 mb-5 w-9/10 h-min p-4 relative">
            <h2 className="text-purple-900 m-0.5">Week {props.courseWeek}</h2>

            <DropdownMenu></DropdownMenu>

            <h2 className="bg-purple-200 rounded-md w-min pl-1.5 pr-1.5 m-1 mt-2 mb-2 ">{props.courseType}</h2>

            <h2 className="text-purple-950 text-xl font-semibold font-serif m-1 mt-2 mb-2 ">{props.courseName}</h2>

            <h3 className="text-purple-600 font-medium m-1">Objective: {props.courseObjective}</h3>

            <p className="m-1">{props.courseDesc}</p>
        </div>
    );
}
CourseCard.proptypes = {
    courseWeek: PropTypes.string,
    courseType: PropTypes.string,
    courseName: PropTypes.string,
    courseObjective: PropTypes.string,
    courseDesc: PropTypes.string,

} 
CourseCard.defaultProps = {
    courseName: "Example",
    courseWeek: "Example",
    courseType: "Example",
    courseName: "Example",
    courseObjective: "Example",
    courseDesc: "Example",
}

export default CourseCard