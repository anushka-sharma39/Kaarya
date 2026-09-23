import worker_1 from '../assets/workers/worker_1.jpg';
import worker_2 from '../assets/workers/worker_2.jpg';
import worker_3 from '../assets/workers/worker_3.jpg';
import worker_4 from '../assets/workers/worker_4.jpg';
import worker_5 from '../assets/workers/worker_5.jpg';
import worker_6 from '../assets/workers/worker_6.jpg';
import worker_7 from '../assets/workers/worker_7.jpg';
import worker_8 from '../assets/workers/worker_8.jpg';
import worker_9 from '../assets/workers/worker_9.jpg';
import worker_10 from '../assets/workers/worker_10.jpg';
import worker_11 from '../assets/workers/worker_11.jpg';
import worker_12 from '../assets/workers/worker_12.jpg';
import worker_13 from '../assets/workers/worker_13.jpg';
import worker_14 from '../assets/workers/worker_14.jpg';
import worker_15 from '../assets/workers/worker_15.jpg';
import worker_16 from '../assets/workers/worker_16.jpg';
import worker_17 from '../assets/workers/worker_17.jpg';
import worker_18 from '../assets/workers/worker_18.jpg';
import worker_19 from '../assets/workers/worker_19.jpg';
import worker_20 from '../assets/workers/worker_20.jpg';
import worker_21 from '../assets/workers/worker_21.jpg';
import worker_22 from '../assets/workers/worker_22.jpg';
import worker_23 from '../assets/workers/worker_23.jpg';
import worker_24 from '../assets/workers/worker_24.jpg';
import worker_25 from '../assets/workers/worker_25.jpg';
import worker_26 from '../assets/workers/worker_26.jpg';
import worker_27 from '../assets/workers/worker_27.jpg';
import worker_28 from '../assets/workers/worker_28.jpg';
import worker_29 from '../assets/workers/worker_29.jpg';
import worker_30 from '../assets/workers/worker_30.jpg';
import worker_31 from '../assets/workers/worker_31.jpg';
import worker_32 from '../assets/workers/worker_32.jpg';
import worker_33 from '../assets/workers/worker_33.jpg';
import worker_34 from '../assets/workers/worker_34.jpg';
import worker_35 from '../assets/workers/worker_35.jpg';
import worker_36 from '../assets/workers/worker_36.jpg';
import worker_37 from '../assets/workers/worker_37.jpg';
import worker_38 from '../assets/workers/worker_38.jpg';
import worker_39 from '../assets/workers/worker_39.jpg';
import worker_40 from '../assets/workers/worker_40.jpg';
import worker_41 from '../assets/workers/worker_41.jpg';
import worker_42 from '../assets/workers/worker_42.jpg';
import worker_43 from '../assets/workers/worker_43.jpg';
import worker_44 from '../assets/workers/worker_44.jpg';
import worker_45 from '../assets/workers/worker_45.jpg';
import worker_46 from '../assets/workers/worker_46.jpg';
import worker_47 from '../assets/workers/worker_47.jpg';
import worker_48 from '../assets/workers/worker_48.jpg';
import worker_49 from '../assets/workers/worker_49.jpg';
import worker_50 from '../assets/workers/worker_50.jpg';
import worker_51 from '../assets/workers/worker_51.jpg';
import worker_52 from '../assets/workers/worker_52.jpg';
import worker_53 from '../assets/workers/worker_53.jpg';
import worker_54 from '../assets/workers/worker_54.jpg';
import worker_55 from '../assets/workers/worker_55.jpg';
import worker_56 from '../assets/workers/worker_56.jpg';
import worker_57 from '../assets/workers/worker_57.jpg';
import worker_58 from '../assets/workers/worker_58.jpg';
import worker_59 from '../assets/workers/worker_59.jpg';
import worker_60 from '../assets/workers/worker_60.jpg';


export const workers = [
  // PLUMBING
  {
    id: 1, name: "Rajesh Kumar", service: "Plumbing", category: "Home Services",
    role: "Master Plumber", rating: 4.8, reviews: 215, distance: 1.5,
    jobsCompleted: 950, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 95, location: "Delhi, India", languages: ["Hindi", "English"],
    phone: "+91 98765 43210", responseTime: "15 min",
    about: "Expert plumber with over 10 years of experience in fixing leaks, installing pipes, and repairing water heaters.",
    skills: ["Pipe Leakage", "Water Heater", "Tap Fixing", "Drain Cleaning"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM", wednesday: "9:00 AM - 8:00 PM" },
    avatar: worker_1
  },
  {
    id: 2, name: "Manoj Sharma", service: "Plumbing", category: "Home Services",
    role: "Plumber", rating: 4.7, reviews: 180, distance: 2.1,
    jobsCompleted: 800, price: 249, emergencyPrice: 449, available: false, verified: true,
    aiMatch: 90, location: "Noida, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43211", responseTime: "25 min",
    about: "Specializes in bathroom fittings and kitchen plumbing.",
    skills: ["Bathroom Fittings", "Kitchen Plumbing", "Drain Cleaning"],
    workingHours: { monday: "10:00 AM - 7:00 PM", tuesday: "10:00 AM - 7:00 PM" },
    avatar: worker_2
  },
  {
    id: 3, name: "Deepak Yadav", service: "Plumbing", category: "Home Services",
    role: "Senior Plumber", rating: 4.9, reviews: 310, distance: 0.8,
    jobsCompleted: 1500, price: 349, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 98, location: "Gurugram, Haryana", languages: ["Hindi", "English", "Punjabi"],
    phone: "+91 98765 43212", responseTime: "10 min",
    about: "Reliable and fast plumbing services for both residential and commercial buildings.",
    skills: ["Commercial Plumbing", "Pipe Installation", "Water Pumps"],
    workingHours: { monday: "8:00 AM - 9:00 PM", tuesday: "8:00 AM - 9:00 PM" },
    avatar: worker_3
  },
  {
    id: 4, name: "Sunil Kumar", service: "Plumbing", category: "Home Services",
    role: "Plumber", rating: 4.6, reviews: 120, distance: 3.0,
    jobsCompleted: 450, price: 199, emergencyPrice: 399, available: true, verified: false,
    aiMatch: 85, location: "Mumbai, Maharashtra", languages: ["Hindi", "Marathi"],
    phone: "+91 98765 43213", responseTime: "30 min",
    about: "Experienced in residential plumbing and quick fixes.",
    skills: ["Quick Fixes", "Tap Repair", "Blocked Drains"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_4
  },
  {
    id: 5, name: "Amit Verma", service: "Plumbing", category: "Home Services",
    role: "Plumber", rating: 4.8, reviews: 290, distance: 1.2,
    jobsCompleted: 1100, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 92, location: "Pune, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43214", responseTime: "20 min",
    about: "Professional plumber providing excellent service with a focus on quality and durability.",
    skills: ["Water Tank Cleaning", "Pipe Leakage", "Motor Repair"],
    workingHours: { monday: "9:00 AM - 8:00 PM", wednesday: "9:00 AM - 8:00 PM" },
    avatar: worker_5
  },
  {
    id: 6, name: "Rakesh Singh", service: "Plumbing", category: "Home Services",
    role: "Plumber", rating: 4.5, reviews: 90, distance: 4.5,
    jobsCompleted: 320, price: 199, emergencyPrice: 349, available: true, verified: true,
    aiMatch: 82, location: "Bhopal, Madhya Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43215", responseTime: "45 min",
    about: "Local plumber for all your basic plumbing needs.",
    skills: ["Tap Repair", "Basic Pipe Fitting"],
    workingHours: { monday: "10:00 AM - 6:00 PM" },
    avatar: worker_6
  },

  // ELECTRICAL
  {
    id: 7, name: "Rahul Sharma", service: "Electrical", category: "Home Services",
    role: "Senior Electrician", rating: 4.9, reviews: 450, distance: 1.0,
    jobsCompleted: 2100, price: 349, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 99, location: "Delhi, India", languages: ["Hindi", "English"],
    phone: "+91 98765 43216", responseTime: "10 min",
    about: "Certified electrician for all household and commercial electrical issues. Safe and reliable.",
    skills: ["Wiring", "Inverter Installation", "MCB Repair", "Light Fittings"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_7
  },
  {
    id: 8, name: "Vikram Singh", service: "Electrical", category: "Home Services",
    role: "Electrician", rating: 4.7, reviews: 210, distance: 2.2,
    jobsCompleted: 850, price: 249, emergencyPrice: 449, available: true, verified: true,
    aiMatch: 90, location: "Bengaluru, Karnataka", languages: ["Hindi", "English", "Kannada"],
    phone: "+91 98765 43217", responseTime: "25 min",
    about: "Expert in fan repair, switches, and short circuit problems.",
    skills: ["Fan Repair", "Switch Replacement", "Short Circuit"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM" },
    avatar: worker_8
  },
  {
    id: 9, name: "Suresh Kumar", service: "Electrical", category: "Home Services",
    role: "Electrician", rating: 4.6, reviews: 150, distance: 3.5,
    jobsCompleted: 620, price: 199, emergencyPrice: 399, available: false, verified: true,
    aiMatch: 86, location: "Hyderabad, Telangana", languages: ["Hindi", "Telugu"],
    phone: "+91 98765 43218", responseTime: "30 min",
    about: "Specializes in home appliances electrical setup and basic repairs.",
    skills: ["Appliance Wiring", "Socket Repair"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_9
  },
  {
    id: 10, name: "Ankit Verma", service: "Electrical", category: "Home Services",
    role: "Electrician", rating: 4.8, reviews: 320, distance: 1.8,
    jobsCompleted: 1400, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 93, location: "Jaipur, Rajasthan", languages: ["Hindi", "English"],
    phone: "+91 98765 43219", responseTime: "15 min",
    about: "Fast and secure electrical fixes. Focuses on customer safety.",
    skills: ["Inverter Setup", "MCB Tripping", "Wiring"],
    workingHours: { monday: "9:00 AM - 9:00 PM", tuesday: "9:00 AM - 9:00 PM" },
    avatar: worker_10
  },
  {
    id: 11, name: "Pankaj Gupta", service: "Electrical", category: "Home Services",
    role: "Electrician", rating: 4.5, reviews: 110, distance: 4.0,
    jobsCompleted: 400, price: 199, emergencyPrice: 299, available: true, verified: false,
    aiMatch: 80, location: "Lucknow, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43220", responseTime: "45 min",
    about: "Local electrician for small fixes and replacements.",
    skills: ["Light Fittings", "Fan Repair"],
    workingHours: { monday: "10:00 AM - 7:00 PM" },
    avatar: worker_11
  },
  {
    id: 12, name: "Rohit Kumar", service: "Electrical", category: "Home Services",
    role: "Master Electrician", rating: 5.0, reviews: 520, distance: 0.5,
    jobsCompleted: 2800, price: 399, emergencyPrice: 699, available: true, verified: true,
    aiMatch: 97, location: "Chandigarh, Punjab", languages: ["Hindi", "English", "Punjabi"],
    phone: "+91 98765 43221", responseTime: "5 min",
    about: "Top-rated electrician for complex wiring, panel boards, and smart home installations.",
    skills: ["Smart Home", "Panel Boards", "Complete House Wiring"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_12
  },

  // AC REPAIR
  {
    id: 13, name: "Amit Kumar", service: "AC Repair", category: "Home Appliances",
    role: "AC Technician", rating: 4.9, reviews: 324, distance: 1.2,
    jobsCompleted: 1240, price: 399, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 98, location: "Bhopal, Madhya Pradesh", languages: ["Hindi", "English"],
    phone: "+91 98765 43222", responseTime: "10 min",
    about: "Experienced AC technician specializing in residential AC servicing and repairs.",
    skills: ["AC Repair", "AC Servicing", "Cooling Problems", "Installation"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM" },
    avatar: worker_13
  },
  {
    id: 14, name: "Arjun Singh", service: "AC Repair", category: "Home Appliances",
    role: "AC Technician", rating: 4.7, reviews: 180, distance: 2.5,
    jobsCompleted: 750, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 92, location: "Indore, Madhya Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43223", responseTime: "25 min",
    about: "Expert in split AC installation and gas refilling.",
    skills: ["Gas Refilling", "Split AC Installation", "Filter Cleaning"],
    workingHours: { monday: "10:00 AM - 7:00 PM", tuesday: "10:00 AM - 7:00 PM" },
    avatar: worker_14
  },
  {
    id: 15, name: "Mohit Verma", service: "AC Repair", category: "Home Appliances",
    role: "Senior AC Technician", rating: 4.8, reviews: 410, distance: 3.1,
    jobsCompleted: 1800, price: 449, emergencyPrice: 699, available: false, verified: true,
    aiMatch: 88, location: "Ahmedabad, Gujarat", languages: ["Hindi", "English", "Gujarati"],
    phone: "+91 98765 43224", responseTime: "40 min",
    about: "Provides advanced troubleshooting for central AC systems and inverter ACs.",
    skills: ["Inverter AC", "Central AC", "Compressor Repair"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_15
  },
  {
    id: 16, name: "Naveen Kumar", service: "AC Repair", category: "Home Appliances",
    role: "AC Technician", rating: 4.6, reviews: 130, distance: 1.5,
    jobsCompleted: 520, price: 349, emergencyPrice: 549, available: true, verified: true,
    aiMatch: 91, location: "Kolkata, West Bengal", languages: ["Hindi", "Bengali"],
    phone: "+91 98765 43225", responseTime: "20 min",
    about: "Quick service for window and split ACs.",
    skills: ["Window AC", "Servicing", "Water Leakage"],
    workingHours: { monday: "10:00 AM - 8:00 PM", tuesday: "10:00 AM - 8:00 PM" },
    avatar: worker_16
  },
  {
    id: 17, name: "Karan Sharma", service: "AC Repair", category: "Home Appliances",
    role: "AC Technician", rating: 4.5, reviews: 90, distance: 4.0,
    jobsCompleted: 350, price: 299, emergencyPrice: 499, available: true, verified: false,
    aiMatch: 80, location: "Delhi, India", languages: ["Hindi"],
    phone: "+91 98765 43226", responseTime: "35 min",
    about: "Affordable AC repair and servicing.",
    skills: ["AC Servicing", "Filter Cleaning"],
    workingHours: { monday: "10:00 AM - 6:00 PM" },
    avatar: worker_17
  },
  {
    id: 18, name: "Deepak Mehta", service: "AC Repair", category: "Home Appliances",
    role: "Master AC Technician", rating: 5.0, reviews: 600, distance: 0.8,
    jobsCompleted: 3200, price: 499, emergencyPrice: 799, available: true, verified: true,
    aiMatch: 99, location: "Mumbai, Maharashtra", languages: ["Hindi", "English", "Marathi"],
    phone: "+91 98765 43227", responseTime: "5 min",
    about: "Highly skilled in all types of ACs. Fast, reliable, and guaranteed cooling.",
    skills: ["PCB Repair", "Compressor Replacement", "Commercial ACs"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_18
  },

  // REFRIGERATOR REPAIR
  {
    id: 19, name: "Ravi Kumar", service: "Refrigerator Repair", category: "Home Appliances",
    role: "Refrigerator Technician", rating: 4.8, reviews: 240, distance: 1.1,
    jobsCompleted: 950, price: 349, emergencyPrice: 549, available: true, verified: true,
    aiMatch: 94, location: "Pune, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43228", responseTime: "15 min",
    about: "Expert in single door and double door refrigerator repairs.",
    skills: ["Cooling Problem", "Gas Charging", "Thermostat Repair"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM" },
    avatar: worker_19
  },
  {
    id: 20, name: "Akash Sharma", service: "Refrigerator Repair", category: "Home Appliances",
    role: "Refrigerator Technician", rating: 4.7, reviews: 180, distance: 2.3,
    jobsCompleted: 700, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 89, location: "Delhi, India", languages: ["Hindi", "English"],
    phone: "+91 98765 43229", responseTime: "25 min",
    about: "Fixes fridge freezing and water leakage issues.",
    skills: ["Water Leakage", "Freezer Repair", "Compressor Check"],
    workingHours: { monday: "10:00 AM - 7:00 PM", tuesday: "10:00 AM - 7:00 PM" },
    avatar: worker_20
  },
  {
    id: 21, name: "Manish Gupta", service: "Refrigerator Repair", category: "Home Appliances",
    role: "Senior Technician", rating: 4.9, reviews: 320, distance: 3.0,
    jobsCompleted: 1400, price: 449, emergencyPrice: 649, available: false, verified: true,
    aiMatch: 95, location: "Noida, Uttar Pradesh", languages: ["Hindi", "English"],
    phone: "+91 98765 43230", responseTime: "30 min",
    about: "Specialist in side-by-side and high-end refrigerators.",
    skills: ["Side-by-Side Fridge", "PCB Repair", "Defrost Issue"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_21
  },
  {
    id: 22, name: "Vikas Yadav", service: "Refrigerator Repair", category: "Home Appliances",
    role: "Technician", rating: 4.6, reviews: 150, distance: 1.8,
    jobsCompleted: 500, price: 249, emergencyPrice: 449, available: true, verified: false,
    aiMatch: 85, location: "Lucknow, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43231", responseTime: "20 min",
    about: "Affordable fridge repairs for local residents.",
    skills: ["Door Seal Fix", "Gas Check"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_22
  },
  {
    id: 23, name: "Nitin Singh", service: "Refrigerator Repair", category: "Home Appliances",
    role: "Technician", rating: 4.5, reviews: 95, distance: 4.2,
    jobsCompleted: 380, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 82, location: "Chandigarh, Punjab", languages: ["Hindi", "Punjabi"],
    phone: "+91 98765 43232", responseTime: "40 min",
    about: "Reliable fridge servicing and gas filling.",
    skills: ["Gas Charging", "Cooling Issue"],
    workingHours: { monday: "10:00 AM - 7:00 PM", tuesday: "10:00 AM - 7:00 PM" },
    avatar: worker_23
  },
  {
    id: 24, name: "Harish Kumar", service: "Refrigerator Repair", category: "Home Appliances",
    role: "Master Technician", rating: 5.0, reviews: 450, distance: 0.9,
    jobsCompleted: 2100, price: 399, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 97, location: "Bengaluru, Karnataka", languages: ["Hindi", "English", "Kannada"],
    phone: "+91 98765 43233", responseTime: "10 min",
    about: "Fast and professional refrigerator repair across all major brands.",
    skills: ["All Brands", "Inverter Refrigerator", "Compressor Replacement"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_24
  },

  // WASHING MACHINE
  {
    id: 25, name: "Rahul Deshmukh", service: "Washing Machine Repair", category: "Home Appliances",
    role: "Washing Machine Expert", rating: 4.8, reviews: 290, distance: 1.4,
    jobsCompleted: 1100, price: 349, emergencyPrice: 549, available: true, verified: true,
    aiMatch: 93, location: "Pune, Maharashtra", languages: ["Hindi", "Marathi", "English"],
    phone: "+91 98765 43234", responseTime: "15 min",
    about: "Expert in front-load and top-load washing machines.",
    skills: ["Front Load", "Top Load", "Drum Repair", "PCB Repair"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM" },
    avatar: worker_25
  },
  {
    id: 26, name: "Sandeep Sharma", service: "Washing Machine Repair", category: "Home Appliances",
    role: "Technician", rating: 4.6, reviews: 160, distance: 2.8,
    jobsCompleted: 600, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 88, location: "Delhi, India", languages: ["Hindi"],
    phone: "+91 98765 43235", responseTime: "25 min",
    about: "Fixes washing machines not spinning or draining.",
    skills: ["Not Spinning", "Drain Issue", "Motor Repair"],
    workingHours: { monday: "10:00 AM - 7:00 PM", tuesday: "10:00 AM - 7:00 PM" },
    avatar: worker_26
  },
  {
    id: 27, name: "Vineet Kumar", service: "Washing Machine Repair", category: "Home Appliances",
    role: "Senior Technician", rating: 4.9, reviews: 350, distance: 3.5,
    jobsCompleted: 1500, price: 399, emergencyPrice: 599, available: false, verified: true,
    aiMatch: 95, location: "Mumbai, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43236", responseTime: "30 min",
    about: "Specialist for fully automatic washing machines and dryers.",
    skills: ["Fully Automatic", "Dryer Repair", "Water Leakage"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_27
  },
  {
    id: 28, name: "Prashant Yadav", service: "Washing Machine Repair", category: "Home Appliances",
    role: "Technician", rating: 4.5, reviews: 120, distance: 1.2,
    jobsCompleted: 450, price: 249, emergencyPrice: 449, available: true, verified: false,
    aiMatch: 84, location: "Gurugram, Haryana", languages: ["Hindi"],
    phone: "+91 98765 43237", responseTime: "20 min",
    about: "Affordable washing machine repairs.",
    skills: ["Semi-Automatic", "Timer Replacement"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_28
  },
  {
    id: 29, name: "Tarun Singh", service: "Washing Machine Repair", category: "Home Appliances",
    role: "Technician", rating: 4.7, reviews: 200, distance: 4.0,
    jobsCompleted: 800, price: 349, emergencyPrice: 549, available: true, verified: true,
    aiMatch: 90, location: "Jaipur, Rajasthan", languages: ["Hindi", "English"],
    phone: "+91 98765 43238", responseTime: "35 min",
    about: "Quick response for all washing machine errors.",
    skills: ["Error Codes", "PCB Repair", "Inlet Valve"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_29
  },
  {
    id: 30, name: "Ashish Verma", service: "Washing Machine Repair", category: "Home Appliances",
    role: "Master Technician", rating: 5.0, reviews: 410, distance: 0.7,
    jobsCompleted: 1900, price: 449, emergencyPrice: 649, available: true, verified: true,
    aiMatch: 98, location: "Hyderabad, Telangana", languages: ["Hindi", "English", "Telugu"],
    phone: "+91 98765 43239", responseTime: "10 min",
    about: "Guaranteed washing machine repair for all premium brands.",
    skills: ["Premium Brands", "Drum Replacement", "Complex PCB Repair"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_30
  },

  // MACHINERY REPAIR
  {
    id: 31, name: "Manoj Kumar", service: "Machinery Repair", category: "Industrial",
    role: "Machinery Expert", rating: 4.8, reviews: 150, distance: 2.0,
    jobsCompleted: 600, price: 999, emergencyPrice: 1499, available: true, verified: true,
    aiMatch: 92, location: "Noida, Uttar Pradesh", languages: ["Hindi", "English"],
    phone: "+91 98765 43240", responseTime: "30 min",
    about: "Expert in repairing heavy industrial machinery, motors, and generators.",
    skills: ["Heavy Machinery", "Motor Rewinding", "Generator Repair"],
    workingHours: { monday: "8:00 AM - 8:00 PM", tuesday: "8:00 AM - 8:00 PM" },
    avatar: worker_31
  },
  {
    id: 32, name: "Sanjay Singh", service: "Machinery Repair", category: "Industrial",
    role: "Technician", rating: 4.6, reviews: 95, distance: 3.5,
    jobsCompleted: 400, price: 799, emergencyPrice: 1199, available: true, verified: true,
    aiMatch: 85, location: "Faridabad, Haryana", languages: ["Hindi"],
    phone: "+91 98765 43241", responseTime: "45 min",
    about: "Specializes in lathe machines, CNCs, and industrial tools.",
    skills: ["Lathe Machine", "CNC Machine", "Tool Repair"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_32
  },
  {
    id: 33, name: "Ashok Sharma", service: "Machinery Repair", category: "Industrial",
    role: "Senior Technician", rating: 4.9, reviews: 220, distance: 5.0,
    jobsCompleted: 950, price: 1299, emergencyPrice: 1999, available: false, verified: true,
    aiMatch: 95, location: "Pune, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43242", responseTime: "1 hour",
    about: "Top machinery repairman for large-scale manufacturing units.",
    skills: ["Manufacturing Units", "Hydraulic Systems", "Conveyors"],
    workingHours: { monday: "8:00 AM - 6:00 PM", tuesday: "8:00 AM - 6:00 PM" },
    avatar: worker_33
  },
  {
    id: 34, name: "Vinod Kumar", service: "Machinery Repair", category: "Industrial",
    role: "Technician", rating: 4.5, reviews: 80, distance: 1.5,
    jobsCompleted: 300, price: 599, emergencyPrice: 999, available: true, verified: false,
    aiMatch: 80, location: "Delhi, India", languages: ["Hindi"],
    phone: "+91 98765 43243", responseTime: "25 min",
    about: "Quick fixes for small commercial machinery.",
    skills: ["Small Machinery", "Motor Check"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_34
  },
  {
    id: 35, name: "Gaurav Singh", service: "Machinery Repair", category: "Industrial",
    role: "Technician", rating: 4.7, reviews: 130, distance: 2.8,
    jobsCompleted: 520, price: 899, emergencyPrice: 1399, available: true, verified: true,
    aiMatch: 88, location: "Chennai, Tamil Nadu", languages: ["Hindi", "English", "Tamil"],
    phone: "+91 98765 43244", responseTime: "35 min",
    about: "Provides reliable machinery maintenance and servicing.",
    skills: ["Maintenance", "Pneumatic Systems"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_35
  },
  {
    id: 36, name: "Sandeep Yadav", service: "Machinery Repair", category: "Industrial",
    role: "Master Technician", rating: 5.0, reviews: 290, distance: 1.1,
    jobsCompleted: 1200, price: 1499, emergencyPrice: 2499, available: true, verified: true,
    aiMatch: 98, location: "Bengaluru, Karnataka", languages: ["Hindi", "English"],
    phone: "+91 98765 43245", responseTime: "20 min",
    about: "Specialized in complex industrial electronic and mechanical troubleshooting.",
    skills: ["Industrial Electronics", "PLC Repair", "Mechanical Breakdown"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_36
  },

  // PAINTING
  {
    id: 37, name: "Ramesh Kumar", service: "Painting", category: "Home Improvement",
    role: "Master Painter", rating: 4.8, reviews: 310, distance: 1.5,
    jobsCompleted: 1400, price: 499, emergencyPrice: 799, available: true, verified: true,
    aiMatch: 94, location: "Delhi, India", languages: ["Hindi", "English"],
    phone: "+91 98765 43246", responseTime: "2 hours",
    about: "Expert in interior and exterior home painting with premium finishes.",
    skills: ["Interior Painting", "Exterior Painting", "Texture Painting", "Waterproofing"],
    workingHours: { monday: "8:00 AM - 6:00 PM", tuesday: "8:00 AM - 6:00 PM" },
    avatar: worker_37
  },
  {
    id: 38, name: "Mahesh Singh", service: "Painting", category: "Home Improvement",
    role: "Painter", rating: 4.6, reviews: 150, distance: 2.2,
    jobsCompleted: 600, price: 399, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 87, location: "Gurugram, Haryana", languages: ["Hindi"],
    phone: "+91 98765 43247", responseTime: "1 hour",
    about: "Fast and clean room painting services.",
    skills: ["Room Painting", "Wall Putty", "Minor Touchups"],
    workingHours: { monday: "9:00 AM - 5:00 PM", tuesday: "9:00 AM - 5:00 PM" },
    avatar: worker_38
  },
  {
    id: 39, name: "Dinesh Kumar", service: "Painting", category: "Home Improvement",
    role: "Senior Painter", rating: 4.9, reviews: 420, distance: 3.5,
    jobsCompleted: 1800, price: 599, emergencyPrice: 899, available: false, verified: true,
    aiMatch: 97, location: "Mumbai, Maharashtra", languages: ["Hindi", "Marathi"],
    phone: "+91 98765 43248", responseTime: "1 day",
    about: "Specializes in luxury painting, wood polishing, and decorative paints.",
    skills: ["Luxury Painting", "Wood Polishing", "Stenciling"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_39
  },
  {
    id: 40, name: "Pradeep Sharma", service: "Painting", category: "Home Improvement",
    role: "Painter", rating: 4.5, reviews: 110, distance: 1.8,
    jobsCompleted: 450, price: 349, emergencyPrice: 549, available: true, verified: false,
    aiMatch: 83, location: "Noida, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43249", responseTime: "2 hours",
    about: "Affordable painting for rental properties and quick fixes.",
    skills: ["Whitewash", "Rental Painting", "Grill Painting"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_40
  },
  {
    id: 41, name: "Ajay Yadav", service: "Painting", category: "Home Improvement",
    role: "Painter", rating: 4.7, reviews: 200, distance: 4.1,
    jobsCompleted: 850, price: 449, emergencyPrice: 699, available: true, verified: true,
    aiMatch: 90, location: "Bengaluru, Karnataka", languages: ["Hindi", "English"],
    phone: "+91 98765 43250", responseTime: "3 hours",
    about: "Professional house painter focusing on timely completion and cleanliness.",
    skills: ["House Painting", "Damp Proofing", "Enamel Paint"],
    workingHours: { monday: "8:00 AM - 7:00 PM", tuesday: "8:00 AM - 7:00 PM" },
    avatar: worker_41
  },
  {
    id: 42, name: "Sanjay Verma", service: "Painting", category: "Home Improvement",
    role: "Master Painter", rating: 5.0, reviews: 340, distance: 1.0,
    jobsCompleted: 1500, price: 699, emergencyPrice: 999, available: true, verified: true,
    aiMatch: 99, location: "Hyderabad, Telangana", languages: ["Hindi", "English", "Telugu"],
    phone: "+91 98765 43251", responseTime: "1 hour",
    about: "Provides the highest quality finish with 100% customer satisfaction.",
    skills: ["Premium Finish", "Texture Painting", "Waterproofing"],
    workingHours: { monday: "8:00 AM - 8:00 PM", tuesday: "8:00 AM - 8:00 PM" },
    avatar: worker_42
  },

  // CARPENTER
  {
    id: 43, name: "Naresh Kumar", service: "Carpenter", category: "Home Improvement",
    role: "Master Carpenter", rating: 4.9, reviews: 280, distance: 1.3,
    jobsCompleted: 1150, price: 349, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 96, location: "Delhi, India", languages: ["Hindi", "English"],
    phone: "+91 98765 43252", responseTime: "30 min",
    about: "Expert in furniture repair, modular kitchens, and custom woodwork.",
    skills: ["Furniture Repair", "Modular Kitchen", "Door Lock", "Custom Woodwork"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_43
  },
  {
    id: 44, name: "Raj Kumar", service: "Carpenter", category: "Home Improvement",
    role: "Carpenter", rating: 4.6, reviews: 140, distance: 2.4,
    jobsCompleted: 580, price: 299, emergencyPrice: 499, available: true, verified: true,
    aiMatch: 87, location: "Noida, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43253", responseTime: "45 min",
    about: "Fixes doors, windows, and handles minor carpentry jobs quickly.",
    skills: ["Door Repair", "Window Repair", "Lock Replacement"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_44
  },
  {
    id: 45, name: "Mukesh Sharma", service: "Carpenter", category: "Home Improvement",
    role: "Senior Carpenter", rating: 4.8, reviews: 360, distance: 3.2,
    jobsCompleted: 1400, price: 449, emergencyPrice: 699, available: false, verified: true,
    aiMatch: 94, location: "Mumbai, Maharashtra", languages: ["Hindi", "Marathi"],
    phone: "+91 98765 43254", responseTime: "2 hours",
    about: "Specializes in wardrobe building, beds, and premium interior woodwork.",
    skills: ["Wardrobes", "Beds", "Premium Woodwork", "Polishing"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_45
  },
  {
    id: 46, name: "Devendra Singh", service: "Carpenter", category: "Home Improvement",
    role: "Carpenter", rating: 4.5, reviews: 90, distance: 1.6,
    jobsCompleted: 350, price: 249, emergencyPrice: 449, available: true, verified: false,
    aiMatch: 82, location: "Gurugram, Haryana", languages: ["Hindi"],
    phone: "+91 98765 43255", responseTime: "1 hour",
    about: "Affordable carpentry for everyday repairs.",
    skills: ["Chair Repair", "Table Repair", "Basic Woodwork"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_46
  },
  {
    id: 47, name: "Yogesh Kumar", service: "Carpenter", category: "Home Improvement",
    role: "Carpenter", rating: 4.7, reviews: 210, distance: 4.5,
    jobsCompleted: 850, price: 399, emergencyPrice: 599, available: true, verified: true,
    aiMatch: 90, location: "Bengaluru, Karnataka", languages: ["Hindi", "English", "Kannada"],
    phone: "+91 98765 43256", responseTime: "1.5 hours",
    about: "Provides reliable carpentry for office setups and home interiors.",
    skills: ["Office Setup", "Partition Walls", "Shelves"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_47
  },
  {
    id: 48, name: "Anil Verma", service: "Carpenter", category: "Home Improvement",
    role: "Master Carpenter", rating: 5.0, reviews: 400, distance: 0.9,
    jobsCompleted: 1600, price: 499, emergencyPrice: 799, available: true, verified: true,
    aiMatch: 98, location: "Pune, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43257", responseTime: "30 min",
    about: "Highly skilled carpenter delivering flawless finishes for all custom projects.",
    skills: ["Custom Projects", "Flawless Finish", "Carving", "Laminate Fixing"],
    workingHours: { monday: "8:00 AM - 8:00 PM", tuesday: "8:00 AM - 8:00 PM" },
    avatar: worker_48
  },

  // CAR PAINTING
  {
    id: 49, name: "Varun Sharma", service: "Car Painting", category: "Automotive",
    role: "Auto Painter", rating: 4.8, reviews: 220, distance: 2.1,
    jobsCompleted: 950, price: 1499, emergencyPrice: 2499, available: true, verified: true,
    aiMatch: 95, location: "Delhi, India", languages: ["Hindi", "English"],
    phone: "+91 98765 43258", responseTime: "1 hour",
    about: "Expert in car painting, denting, and scratch removal.",
    skills: ["Full Body Paint", "Scratch Removal", "Denting", "Teflon Coating"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_49
  },
  {
    id: 50, name: "Rohit Singh", service: "Car Painting", category: "Automotive",
    role: "Technician", rating: 4.6, reviews: 140, distance: 3.5,
    jobsCompleted: 600, price: 999, emergencyPrice: 1599, available: true, verified: true,
    aiMatch: 86, location: "Noida, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43259", responseTime: "2 hours",
    about: "Specializes in bumper painting and minor touchups.",
    skills: ["Bumper Paint", "Touchups", "Rubbing & Polishing"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_50
  },
  {
    id: 51, name: "Manish Kumar", service: "Car Painting", category: "Automotive",
    role: "Senior Auto Painter", rating: 4.9, reviews: 310, distance: 4.2,
    jobsCompleted: 1300, price: 1999, emergencyPrice: 2999, available: false, verified: true,
    aiMatch: 97, location: "Mumbai, Maharashtra", languages: ["Hindi", "English", "Marathi"],
    phone: "+91 98765 43260", responseTime: "1 day",
    about: "Premium car painting with OEM matching colors and ceramic coating.",
    skills: ["OEM Color Match", "Ceramic Coating", "Alloy Paint"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_51
  },
  {
    id: 52, name: "Abhishek Verma", service: "Car Painting", category: "Automotive",
    role: "Auto Painter", rating: 4.5, reviews: 85, distance: 1.8,
    jobsCompleted: 350, price: 799, emergencyPrice: 1299, available: true, verified: false,
    aiMatch: 82, location: "Gurugram, Haryana", languages: ["Hindi"],
    phone: "+91 98765 43261", responseTime: "1 hour",
    about: "Affordable denting and painting services.",
    skills: ["Denting", "Panel Painting"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_52
  },
  {
    id: 53, name: "Kunal Sharma", service: "Car Painting", category: "Automotive",
    role: "Auto Painter", rating: 4.7, reviews: 180, distance: 5.5,
    jobsCompleted: 800, price: 1299, emergencyPrice: 1999, available: true, verified: true,
    aiMatch: 90, location: "Bengaluru, Karnataka", languages: ["Hindi", "English"],
    phone: "+91 98765 43262", responseTime: "3 hours",
    about: "Fast and reliable car painting with baked booth finish.",
    skills: ["Baked Booth Paint", "Rust Removal", "Wax Polish"],
    workingHours: { monday: "9:00 AM - 7:00 PM", tuesday: "9:00 AM - 7:00 PM" },
    avatar: worker_53
  },
  {
    id: 54, name: "Sameer Khan", service: "Car Painting", category: "Automotive",
    role: "Master Auto Painter", rating: 5.0, reviews: 450, distance: 1.2,
    jobsCompleted: 1800, price: 2499, emergencyPrice: 3499, available: true, verified: true,
    aiMatch: 99, location: "Pune, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43263", responseTime: "1.5 hours",
    about: "Specialized in luxury car painting, detailing, and custom paints.",
    skills: ["Luxury Cars", "Custom Paint", "Detailing", "PPF Application"],
    workingHours: { monday: "8:00 AM - 8:00 PM", tuesday: "8:00 AM - 8:00 PM" },
    avatar: worker_54
  },

  // APPLIANCE REPAIR
  {
    id: 55, name: "Vikram Patel", service: "Appliance Repair", category: "Home Appliances",
    role: "Appliance Technician", rating: 5.0, reviews: 312, distance: 3.5,
    jobsCompleted: 890, price: 499, emergencyPrice: 799, available: true, verified: true,
    aiMatch: 92, location: "Ahmedabad, Gujarat", languages: ["Hindi", "English", "Gujarati"],
    phone: "+91 98765 43264", responseTime: "30 min",
    about: "Fixes all major household appliances including microwaves, ovens, and dishwashers.",
    skills: ["Microwave Repair", "Oven Repair", "Dishwasher", "Geyser Repair"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM" },
    avatar: worker_55
  },
  {
    id: 56, name: "Sachin Joshi", service: "Appliance Repair", category: "Home Appliances",
    role: "Technician", rating: 4.7, reviews: 180, distance: 1.5,
    jobsCompleted: 600, price: 349, emergencyPrice: 549, available: true, verified: true,
    aiMatch: 88, location: "Delhi, India", languages: ["Hindi"],
    phone: "+91 98765 43265", responseTime: "20 min",
    about: "Specialist in water purifiers (RO) and geysers.",
    skills: ["RO Service", "Geyser Repair", "Filter Change"],
    workingHours: { monday: "10:00 AM - 7:00 PM", tuesday: "10:00 AM - 7:00 PM" },
    avatar: worker_56
  },
  {
    id: 57, name: "Prashant Kumar", service: "Appliance Repair", category: "Home Appliances",
    role: "Senior Technician", rating: 4.9, reviews: 420, distance: 2.8,
    jobsCompleted: 1500, price: 599, emergencyPrice: 899, available: false, verified: true,
    aiMatch: 96, location: "Mumbai, Maharashtra", languages: ["Hindi", "English", "Marathi"],
    phone: "+91 98765 43266", responseTime: "1 hour",
    about: "Expert troubleshooting for high-end kitchen appliances and chimneys.",
    skills: ["Kitchen Chimney", "Hob Repair", "Built-in Oven"],
    workingHours: { monday: "9:00 AM - 6:00 PM", tuesday: "9:00 AM - 6:00 PM" },
    avatar: worker_57
  },
  {
    id: 58, name: "Ajit Yadav", service: "Appliance Repair", category: "Home Appliances",
    role: "Technician", rating: 4.5, reviews: 110, distance: 4.1,
    jobsCompleted: 400, price: 299, emergencyPrice: 499, available: true, verified: false,
    aiMatch: 81, location: "Lucknow, Uttar Pradesh", languages: ["Hindi"],
    phone: "+91 98765 43267", responseTime: "45 min",
    about: "Affordable appliance repair for basic household items.",
    skills: ["Mixer Grinder", "Iron Repair", "Fan Repair"],
    workingHours: { monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM" },
    avatar: worker_58
  },
  {
    id: 59, name: "Rahul Verma", service: "Appliance Repair", category: "Home Appliances",
    role: "Technician", rating: 4.8, reviews: 250, distance: 1.0,
    jobsCompleted: 800, price: 449, emergencyPrice: 699, available: true, verified: true,
    aiMatch: 91, location: "Bengaluru, Karnataka", languages: ["Hindi", "English"],
    phone: "+91 98765 43268", responseTime: "15 min",
    about: "Fast and reliable repairs for all home appliances.",
    skills: ["Microwave", "Water Heater", "Room Heater"],
    workingHours: { monday: "9:00 AM - 8:00 PM", tuesday: "9:00 AM - 8:00 PM" },
    avatar: worker_59
  },
  {
    id: 60, name: "Kapil Sharma", service: "Appliance Repair", category: "Home Appliances",
    role: "Master Technician", rating: 5.0, reviews: 520, distance: 2.5,
    jobsCompleted: 2200, price: 699, emergencyPrice: 999, available: true, verified: true,
    aiMatch: 98, location: "Pune, Maharashtra", languages: ["Hindi", "English"],
    phone: "+91 98765 43269", responseTime: "20 min",
    about: "Complete home appliance care with warranty on all parts.",
    skills: ["All Appliances", "Warranty Repairs", "Complex PCBs"],
    workingHours: { monday: "24/7", tuesday: "24/7" },
    avatar: worker_60
  }
];
