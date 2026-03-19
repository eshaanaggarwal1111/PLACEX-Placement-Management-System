import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))

app.use(cookieParser())
app.use(express.json());

// Mock data for testing without MongoDB
const mockUsers = [];
const mockInterviewExperiences = [
  {
    _id: "1",
    username: "Rahul Kumar",
    companyName: "Google",
    position: "Software Engineer",
    experience: "<p>I had a great experience interviewing at Google. The process consisted of 4 rounds:</p><p><strong>Round 1:</strong> Technical screening with data structures and algorithms</p><p><strong>Round 2:</strong> System design interview</p><p><strong>Round 3:</strong> Behavioral interview with hiring manager</p><p><strong>Round 4:</strong> Final interview with team lead</p><p>The interviewers were very professional and helpful. They provided clear feedback and made me comfortable throughout the process.</p>",
    interviewLevel: "difficult",
    result: "Successful",
    date: "2024-02-10",
    likes: 45,
    views: 1200,
    comments: 12,
    rating: 4.8,
    helpful: 38
  },
  {
    _id: "2",
    username: "Priya Sharma",
    companyName: "Microsoft",
    position: "Full Stack Developer",
    experience: "<p>Microsoft interview was challenging but fair. The focus was on:</p><p><strong>Technical Skills:</strong> React, Node.js, SQL</p><p><strong>Problem Solving:</strong> 3 coding questions</p><p><strong>System Design:</strong> Design a scalable web application</p><p>The interviewers were very knowledgeable and provided good hints when I was stuck.</p>",
    interviewLevel: "medium",
    result: "Successful",
    date: "2024-02-08",
    likes: 32,
    views: 890,
    comments: 8,
    rating: 4.6,
    helpful: 28
  },
  {
    _id: "3",
    username: "Amit Patel",
    companyName: "Amazon",
    position: "Cloud Engineer",
    experience: "<p>Amazon interview was very rigorous. Key areas covered:</p><p><strong>Cloud Services:</strong> AWS, Lambda, EC2, S3</p><p><strong>System Design:</strong> Design a cloud architecture</p><p><strong>Leadership Principles:</strong> Behavioral questions based on Amazon LPs</p><p>The bar was high, but the experience was valuable for learning.</p>",
    interviewLevel: "difficult",
    result: "Fail",
    date: "2024-02-05",
    likes: 28,
    views: 750,
    comments: 15,
    rating: 4.2,
    helpful: 22
  },
  {
    _id: "4",
    username: "Neha Gupta",
    companyName: "TCS",
    position: "System Engineer",
    experience: "<p>TCS interview was straightforward and well-structured:</p><p><strong>Aptitude Test:</strong> Quantitative and logical reasoning</p><p><strong>Technical Interview:</strong> Java, SQL, and basic programming</p><p><strong>HR Interview:</strong> General questions about career goals</p><p>Overall a good experience for freshers.</p>",
    interviewLevel: "easy",
    result: "Successful",
    date: "2024-02-03",
    likes: 18,
    views: 620,
    comments: 6,
    rating: 4.0,
    helpful: 15
  },
  {
    _id: "5",
    username: "Vikram Singh",
    companyName: "Infosys",
    position: "Software Developer",
    experience: "<p>Infosys interview process was comprehensive:</p><p><strong>Written Test:</strong> Programming and aptitude</p><p><strong>Technical Round:</strong> Java, Python, and web technologies</p><p><strong>Managerial Round:</strong> Team collaboration and project management</p><p>Good company culture and growth opportunities.</p>",
    interviewLevel: "medium",
    result: "Successful",
    date: "2024-02-01",
    likes: 22,
    views: 580,
    comments: 9,
    rating: 4.1,
    helpful: 18
  },
  {
    _id: "6",
    username: "Anjali Reddy",
    companyName: "Apple",
    position: "iOS Developer",
    experience: "<p>Apple interview was exceptional but demanding:</p><p><strong>Technical Round:</strong> Swift, iOS frameworks, and app architecture</p><p><strong>Design Round:</strong> UI/UX design principles and Apple HIG</p><p><strong>Problem Solving:</strong> Complex algorithmic challenges</p><p>The focus on quality and user experience was impressive.</p>",
    interviewLevel: "difficult",
    result: "Successful",
    date: "2024-01-28",
    likes: 52,
    views: 1450,
    comments: 18,
    rating: 4.9,
    helpful: 45
  },
  {
    _id: "7",
    username: "Karthik Menon",
    companyName: "Meta",
    position: "Frontend Developer",
    experience: "<p>Meta interview focused on modern web technologies:</p><p><strong>React Expertise:</strong> Advanced React patterns and hooks</p><p><strong>System Design:</strong> Frontend architecture and performance</p><p><strong>Cultural Fit:</strong> Move Fast philosophy and collaboration</p><p>Very challenging but rewarding experience.</p>",
    interviewLevel: "difficult",
    result: "Fail",
    date: "2024-01-25",
    likes: 38,
    views: 980,
    comments: 22,
    rating: 4.3,
    helpful: 32
  },
  {
    _id: "8",
    username: "Divya Krishnan",
    companyName: "Netflix",
    position: "Backend Engineer",
    experience: "<p>Netflix interview emphasized scalability and reliability:</p><p><strong>System Design:</strong> Large-scale distributed systems</p><p><strong>Backend Technologies:</strong> Microservices and cloud architecture</p><p><strong>Cultural Interview:</strong> Freedom and responsibility values</p><p>Great learning experience about high-performance systems.</p>",
    interviewLevel: "difficult",
    result: "Successful",
    date: "2024-01-22",
    likes: 41,
    views: 1100,
    comments: 14,
    rating: 4.7,
    helpful: 36
  },
  {
    _id: "9",
    username: "Rohit Verma",
    companyName: "Adobe",
    position: "Software Engineer",
    experience: "<p>Adobe interview balanced technical and creative skills:</p><p><strong>Technical Round:</strong> C++, JavaScript, and Adobe products</p><p><strong>Creative Problem Solving:</strong> Design thinking approach</p><p><strong>Team Collaboration:</strong> Cross-functional team dynamics</p><p>Good mix of technical and creative challenges.</p>",
    interviewLevel: "medium",
    result: "Successful",
    date: "2024-01-20",
    likes: 25,
    views: 720,
    comments: 10,
    rating: 4.4,
    helpful: 20
  },
  {
    _id: "10",
    username: "Swati Joshi",
    companyName: "Oracle",
    position: "Database Developer",
    experience: "<p>Oracle interview was deeply technical:</p><p><strong>Database Knowledge:</strong> SQL, PL/SQL, and optimization</p><p><strong>System Architecture:</strong> Enterprise database design</p><p><strong>Problem Solving:</strong> Complex query optimization</p><p>Excellent for those interested in database technologies.</p>",
    interviewLevel: "medium",
    result: "Successful",
    date: "2024-01-18",
    likes: 29,
    views: 850,
    comments: 11,
    rating: 4.5,
    helpful: 24
  }
];
const mockCompanies = [
  { 
    id: "1", 
    companyname: "Google", 
    jobprofile: "Software Engineer", 
    ctc: "25", 
    location: "Bangalore, Hyderabad", 
    doi: "2024-02-15",
    description: "Leading technology company",
    category: "Tech Giant",
    logo: "G",
    rating: 4.8,
    reviews: 1250,
    type: "Product Based",
    size: "10,000+",
    founded: "1998"
  },
  { 
    id: "2", 
    companyname: "Microsoft", 
    jobprofile: "Full Stack Developer", 
    ctc: "22", 
    location: "Hyderabad, Pune", 
    doi: "2024-02-20",
    description: "Software and cloud services",
    category: "Tech Giant",
    logo: "M",
    rating: 4.7,
    reviews: 980,
    type: "Product Based",
    size: "10,000+",
    founded: "1975"
  },
  { 
    id: "3", 
    companyname: "Amazon", 
    jobprofile: "Cloud Engineer", 
    ctc: "28", 
    location: "Bangalore, Chennai", 
    doi: "2024-03-01",
    description: "E-commerce and cloud computing",
    category: "Tech Giant",
    logo: "A",
    rating: 4.6,
    reviews: 1100,
    type: "Product Based",
    size: "10,000+",
    founded: "1994"
  },
  { 
    id: "4", 
    companyname: "TCS", 
    jobprofile: "System Engineer", 
    ctc: "7", 
    location: "Mumbai, Pune", 
    doi: "2024-03-05",
    description: "IT services and consulting",
    category: "IT Services",
    logo: "T",
    rating: 4.2,
    reviews: 850,
    type: "Service Based",
    size: "5,000+",
    founded: "1968"
  },
  { 
    id: "5", 
    companyname: "Infosys", 
    jobprofile: "Software Developer", 
    ctc: "8", 
    location: "Bangalore, Pune", 
    doi: "2024-03-10",
    description: "IT consulting and outsourcing",
    category: "IT Services",
    logo: "I",
    rating: 4.1,
    reviews: 920,
    type: "Service Based",
    size: "5,000+",
    founded: "1981"
  },
  { 
    id: "6", 
    companyname: "Wipro", 
    jobprofile: "Associate Engineer", 
    ctc: "6", 
    location: "Mumbai, Chennai", 
    doi: "2024-03-15",
    description: "IT services and products",
    category: "IT Services",
    logo: "W",
    rating: 4.0,
    reviews: 780,
    type: "Service Based",
    size: "5,000+",
    founded: "1945"
  },
  { 
    id: "7", 
    companyname: "HCL Technologies", 
    jobprofile: "Software Engineer", 
    ctc: "9", 
    location: "Noida, Pune", 
    doi: "2024-03-20",
    description: "IT services and consulting",
    category: "IT Services",
    logo: "H",
    rating: 4.3,
    reviews: 650,
    type: "Service Based",
    size: "5,000+",
    founded: "1991"
  },
  { 
    id: "8", 
    companyname: "Accenture", 
    jobprofile: "Technology Consultant", 
    ctc: "11", 
    location: "Bangalore, Mumbai", 
    doi: "2024-03-25",
    description: "Consulting and professional services",
    category: "Consulting",
    logo: "A",
    rating: 4.4,
    reviews: 720,
    type: "Service Based",
    size: "5,000+",
    founded: "2009"
  },
  { 
    id: "9", 
    companyname: "IBM", 
    jobprofile: "Cloud Architect", 
    ctc: "18", 
    location: "Bangalore, Pune", 
    doi: "2024-04-01",
    description: "Technology and consulting",
    category: "Tech Giant",
    logo: "I",
    rating: 4.5,
    reviews: 890,
    type: "Product Based",
    size: "10,000+",
    founded: "1911"
  },
  { 
    id: "10", 
    companyname: "Deloitte", 
    jobprofile: "Technology Analyst", 
    ctc: "12", 
    location: "Mumbai, Hyderabad", 
    doi: "2024-04-05",
    description: "Professional services firm",
    category: "Consulting",
    logo: "D",
    rating: 4.3,
    reviews: 680,
    type: "Service Based",
    size: "5,000+",
    founded: "1845"
  },
  { 
    id: "11", 
    companyname: "Capgemini", 
    jobprofile: "Software Engineer", 
    ctc: "7", 
    location: "Bangalore, Pune", 
    doi: "2024-04-10",
    description: "IT consulting and services",
    category: "IT Services",
    logo: "C",
    rating: 4.0,
    reviews: 590,
    type: "Service Based",
    size: "5,000+",
    founded: "1967"
  },
  { 
    id: "12", 
    companyname: "Cognizant", 
    jobprofile: "Programmer Analyst", 
    ctc: "8", 
    location: "Chennai, Pune", 
    doi: "2024-04-15",
    description: "IT services and solutions",
    category: "IT Services",
    logo: "C",
    rating: 4.1,
    reviews: 620,
    type: "Service Based",
    size: "5,000+",
    founded: "1994"
  },
  { 
    id: "13", 
    companyname: "Meta", 
    jobprofile: "Frontend Developer", 
    ctc: "30", 
    location: "Bangalore", 
    doi: "2024-04-20",
    description: "Social media and technology",
    category: "Tech Giant",
    logo: "M",
    rating: 4.7,
    reviews: 950,
    type: "Product Based",
    size: "10,000+",
    founded: "2004"
  },
  { 
    id: "14", 
    companyname: "Apple", 
    jobprofile: "iOS Developer", 
    ctc: "35", 
    location: "Bangalore, Hyderabad", 
    doi: "2024-04-25",
    description: "Consumer electronics and software",
    category: "Tech Giant",
    logo: "A",
    rating: 4.9,
    reviews: 1200,
    type: "Product Based",
    size: "10,000+",
    founded: "1976"
  },
  { 
    id: "15", 
    companyname: "Netflix", 
    jobprofile: "Backend Engineer", 
    ctc: "32", 
    location: "Bangalore", 
    doi: "2024-05-01",
    description: "Streaming and entertainment",
    category: "Tech Giant",
    logo: "N",
    rating: 4.8,
    reviews: 820,
    type: "Product Based",
    size: "1,000-10,000",
    founded: "1997"
  },
  { 
    id: "16", 
    companyname: "Adobe", 
    jobprofile: "Software Engineer", 
    ctc: "20", 
    location: "Noida, Bangalore", 
    doi: "2024-05-05",
    description: "Digital media and marketing",
    category: "Tech Giant",
    logo: "A",
    rating: 4.6,
    reviews: 780,
    type: "Product Based",
    size: "1,000-10,000",
    founded: "1982"
  },
  { 
    id: "17", 
    companyname: "Oracle", 
    jobprofile: "Database Developer", 
    ctc: "16", 
    location: "Bangalore, Hyderabad", 
    doi: "2024-05-10",
    description: "Database and cloud services",
    category: "Tech Giant",
    logo: "O",
    rating: 4.4,
    reviews: 860,
    type: "Product Based",
    size: "10,000+",
    founded: "1977"
  },
  { 
    id: "18", 
    companyname: "Salesforce", 
    jobprofile: "Cloud Developer", 
    ctc: "19", 
    location: "Hyderabad", 
    doi: "2024-05-15",
    description: "CRM and cloud services",
    category: "Tech Giant",
    logo: "S",
    rating: 4.5,
    reviews: 720,
    type: "Product Based",
    size: "1,000-10,000",
    founded: "1999"
  },
  { 
    id: "19", 
    companyname: "Uber", 
    jobprofile: "Software Engineer", 
    ctc: "24", 
    location: "Bangalore", 
    doi: "2024-05-20",
    description: "Ride-sharing and logistics",
    category: "Tech Giant",
    logo: "U",
    rating: 4.3,
    reviews: 680,
    type: "Product Based",
    size: "1,000-10,000",
    founded: "2009"
  },
  { 
    id: "20", 
    companyname: "Spotify", 
    jobprofile: "Data Engineer", 
    ctc: "21", 
    location: "Bangalore", 
    doi: "2024-05-25",
    description: "Music streaming and audio",
    category: "Tech Giant",
    logo: "S",
    rating: 4.7,
    reviews: 590,
    type: "Product Based",
    size: "1,000-10,000",
    founded: "2006"
  }
];

// Mock authentication endpoints
app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  
  if (email === "admin@placex.com" && password === "admin123") {
    return res.json("Admin");
  }
  
  if (email && password) {
    return res.json("Success");
  }
  
  return res.json("Invalid User");
});

app.post("/auth/register", (req, res) => {
  const userData = req.body;
  mockUsers.push(userData);
  console.log("User registered:", userData.name);
  return res.json({ message: "User registered successfully" });
});

app.get("/auth/verify", (req, res) => {
  return res.json({ status: true });
});

app.get("/auth/currentUser", (req, res) => {
  return res.json({ 
    user: { 
      _id: "123", 
      name: "Test User", 
      email: "test@example.com" 
    } 
  });
});

app.get("/auth/getCompanies", (req, res) => {
  return res.json(mockCompanies);
});

app.get("/auth/placementStatus/:userId", (req, res) => {
  return res.json({ 
    status: "Not Placed", 
    companyName: null 
  });
});

// Interview Experience endpoints
app.get("/auth/fetchinterviewexperience", (req, res) => {
  return res.json({ data: mockInterviewExperiences });
});

app.post("/auth/add-interview", (req, res) => {
  const newExperience = {
    _id: (mockInterviewExperiences.length + 1).toString(),
    ...req.body
  };
  mockInterviewExperiences.push(newExperience);
  console.log("New interview experience added:", newExperience);
  return res.json({ message: "Interview experience added successfully", data: newExperience });
});

app.listen(process.env.PORT, () => {
  console.log(`Mock Server is running on port ${process.env.PORT}`);
  console.log("MongoDB not required - using mock data");
});
