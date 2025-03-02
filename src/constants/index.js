import statistics from '../assets/statistics.png'
import trigonometry from '../assets/trigonometry.png'

 export const classes = [
    {
      image: statistics,
      title: "Statistics (M134) - Chapter 12",
      description: "Your class scored an average of 67% on the latest assignment. 49% of students still have trouble understanding Chapter 12."
    },
    {
      image: trigonometry,
      title: "Cell Biology (B221) - Chapter 8",
      description: "You have a class scheduled for on 14/12/24 on Chapter 8. Here are some cheat sheets we generated based on the learning material (Book 3, Page 132)."
    },
    {
        image: statistics,
        title :'Geography (B543) - Chapter 1',
        description: 'Your class scored an average of 90% on the latest assignment.'
    }
  ];

  export const coursePlannerClasses = [
    {
      courseName:"Statistics Chapter - 1",
      courseWeek:"1",
      courseType:"Lecture",
      courseObjective:"Master statistical methods to analyze data and make informed decisions effectively.",
      courseDesc:"In this lecture, we will explore the fundamentals of probability theory, including key concepts such as random variables, probability distributions, and the rules of probability. Through  real-world examples, we’ll discuss how probability forms the foundation for statistical inference and decision-making.",
    },
    {
      courseName:"Statistics Chapter - 2",
      courseWeek:"2",
      courseType:"Assesment",
      courseObjective:"Master statistical methods to analyze data and make informed decisions effectively.",
      courseDesc:"This assessment will test your understanding of probability concepts covered in the lecture. You will solve problems involving probability rules, calculate probabilities for discrete and continuous random variables, and interpret probability distributions. Submit your solutions with clear reasoning and steps.",
    },
    {
      courseName:"Statistics Chapter - 3",
      courseWeek:"3",
      courseType:"Lecture",
      courseObjective:"Develop skills to collect, analyze, and interpret data for practical applications",
      courseDesc:"In this lecture, we will dive into hypothesis testing, focusing on the steps involved in formulating null and alternative hypotheses, selecting significance levels, and interpreting p-values. We’ll also cover common tests like the t-test and z-test, using practical examples to illustrate their applications in research and data analysis",
    }
  ]

export const barData = [
    { name: 'Alice', PreTest: 70, MidTerm: 85 },
    { name: 'Bob', PreTest: 65, MidTerm: 75 },
    { name: 'Charlie', PreTest: 50, MidTerm: 60 },
    { name: 'Diana', PreTest: 85, MidTerm: 90 },
    { name: 'Evan', PreTest: 80, MidTerm: 78 },
];

export const lineData = [
    { name: 'Q1', avg: 65 },
    { name: 'Q2', avg: 70 },
    { name: 'Q3', avg: 72 },
    { name: 'Q4', avg: 80 },
];

