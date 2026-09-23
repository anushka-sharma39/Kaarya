export const gigs = [
  {
    id: 'g1',
    title: { en: 'Wall Painting', hi: 'दीवार पेंटिंग' },
    employer: 'BuildWell Homes',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
    location: 'Noida Sector 62',
    distance: { en: '2.4 km', hi: '2.4 किमी' },
    payment: { en: '₹500 - ₹900/day', hi: '₹500 - ₹900/दिन' },
    duration: { en: '2 days', hi: '2 दिन' },
    skills: [
      { en: 'Painting', hi: 'पेंटिंग' },
      { en: 'Home Service', hi: 'होम सर्विस' }
    ],
    rating: 4.8,
    reviews: 124,
    postedDate: { en: '1 day ago', hi: '1 दिन पहले' },
    description: {
      en: 'Paint interior and exterior walls. Basic cleaning and preparation required before painting. All materials will be provided on site.',
      hi: 'घर की अंदरूनी और बाहरी दीवारों पर पेंट करें। पेंटिंग से पहले बुनियादी सफाई और तैयारी आवश्यक है। सभी सामग्री साइट पर प्रदान की जाएगी।'
    },
    requirements: [
      { en: 'Experience preferred (not mandatory)', hi: 'अनुभव को प्राथमिकता (अनिवार्य नहीं)' },
      { en: 'Own basic tools (brush, roller, etc.)', hi: 'अपने बुनियादी उपकरण (ब्रश, रोलर, आदि)' }
    ],
    workType: { en: 'On-site', hi: 'ऑन-साइट' },
    verified: true
  },
  {
    id: 'g2',
    title: { en: 'Plumber Assistant', hi: 'प्लंबर सहायक' },
    employer: 'GreenTech Solutions',
    image: 'https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGx1bWJlciUyMEFzc2lzdGFudHxlbnwwfHwwfHx8MA%3D%3D',
    location: 'Delhi',
    distance: { en: '5.1 km', hi: '5.1 किमी' },
    payment: { en: '₹400 - ₹700/day', hi: '₹400 - ₹700/दिन' },
    duration: { en: '1 week', hi: '1 सप्ताह' },
    skills: [
      { en: 'Plumbing', hi: 'प्लंबिंग' },
      { en: 'Repair', hi: 'मरम्मत' }
    ],
    rating: 4.6,
    reviews: 89,
    postedDate: { en: '2 days ago', hi: '2 दिन पहले' },
    description: {
      en: 'Assist senior plumber in residential repair work. Requires lifting and carrying tools.',
      hi: 'आवासीय मरम्मत कार्य में वरिष्ठ प्लंबर की सहायता करें। उपकरण उठाने और ले जाने की आवश्यकता है।'
    },
    requirements: [
      { en: 'Physical stamina', hi: 'शारीरिक क्षमता' },
      { en: 'Willingness to learn', hi: 'सीखने की इच्छा' }
    ],
    workType: { en: 'On-site', hi: 'ऑन-साइट' },
    verified: true
  },
  {
    id: 'g3',
    title: { en: 'Housekeeping Staff', hi: 'हाउसकीपिंग स्टाफ' },
    employer: 'Sunita Sharma',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
    location: 'Gurugram',
    distance: { en: '3.1 km', hi: '3.1 किमी' },
    payment: { en: '₹350 - ₹600/day', hi: '₹350 - ₹600/दिन' },
    duration: { en: 'Ongoing', hi: 'चल रहा है' },
    skills: [
      { en: 'Cleaning', hi: 'सफाई' },
      { en: 'Residential', hi: 'आवासीय' }
    ],
    rating: 4.5,
    reviews: 76,
    postedDate: { en: '3 days ago', hi: '3 दिन पहले' },
    description: {
      en: 'Daily housekeeping for a large residential villa. Includes sweeping, swabbing, and dusting.',
      hi: 'एक बड़े आवासीय विला के लिए दैनिक हाउसकीपिंग। झाड़ू लगाना, पोंछा लगाना और धूल साफ करना शामिल है।'
    },
    requirements: [
      { en: 'Punctuality', hi: 'समय की पाबंदी' },
      { en: 'Previous experience', hi: 'पिछला अनुभव' }
    ],
    workType: { en: 'On-site', hi: 'ऑन-साइट' },
    verified: false
  },
  {
    id: 'g4',
    title: { en: 'Delivery Partner (Local)', hi: 'डिलीवरी पार्टनर (स्थानीय)' },
    employer: 'QuickDrop Logistics',
    image: 'https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?q=80&w=2069&auto=format&fit=crop',
    location: 'Delhi NCR',
    distance: { en: '4.0 km', hi: '4.0 किमी' },
    payment: { en: '₹450 - ₹800/day', hi: '₹450 - ₹800/दिन' },
    duration: { en: 'Ongoing', hi: 'चल रहा है' },
    skills: [
      { en: 'Delivery', hi: 'डिलीवरी' },
      { en: 'Logistics', hi: 'लॉजिस्टिक्स' }
    ],
    rating: 4.7,
    reviews: 102,
    postedDate: { en: '1 day ago', hi: '1 दिन पहले' },
    description: {
      en: 'Deliver packages in the local area. Bike required.',
      hi: 'स्थानीय क्षेत्र में पैकेज वितरित करें। बाइक की आवश्यकता है।'
    },
    requirements: [
      { en: 'Two-wheeler', hi: 'दोपहिया वाहन' },
      { en: 'Driving License', hi: 'ड्राइविंग लाइसेंस' },
      { en: 'Smartphone', hi: 'स्मार्टफोन' }
    ],
    workType: { en: 'Field', hi: 'फील्ड' },
    verified: true
  },
  {
    id: 'g5',
    title: { en: 'Electrician Helper', hi: 'इलेक्ट्रीशियन सहायक' },
    employer: 'Ravi Kumar',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop',
    location: 'Noida Sector 15',
    distance: { en: '1.8 km', hi: '1.8 किमी' },
    payment: { en: '₹400 - ₹750/day', hi: '₹400 - ₹750/दिन' },
    duration: { en: '3 days', hi: '3 दिन' },
    skills: [
      { en: 'Electrical', hi: 'इलेक्ट्रिकल' },
      { en: 'Repair', hi: 'मरम्मत' }
    ],
    rating: 4.2,
    reviews: 45,
    postedDate: { en: '5 hours ago', hi: '5 घंटे पहले' },
    description: {
      en: 'Assist with house wiring and fixture installations.',
      hi: 'हाउस वायरिंग और फिक्स्चर इंस्टॉलेशन में सहायता करें।'
    },
    requirements: [
      { en: 'Basic electrical knowledge', hi: 'बुनियादी विद्युत ज्ञान' }
    ],
    workType: { en: 'On-site', hi: 'ऑन-साइट' },
    verified: true
  }
];

export const applications = [
  { id: 'a1', gigId: 'g1', workerId: 'w1', status: 'Pending', appliedAt: { en: '2 hours ago', hi: '2 घंटे पहले' } },
  { id: 'a2', gigId: 'g5', workerId: 'w1', status: 'Pending', appliedAt: { en: '5 hours ago', hi: '5 घंटे पहले' } },
  { id: 'a3', gigId: 'g3', workerId: 'w1', status: 'Pending', appliedAt: { en: '1 day ago', hi: '1 दिन पहले' } },
];

export const workHistory = [
  { id: 'w1', gigId: 'g2', status: 'Completed', amount: '₹2,100', startDate: '2023-09-01', endDate: '2023-09-03', rating: 5, employer: 'GreenTech Solutions' },
  { id: 'w2', gigId: 'g4', status: 'Ongoing', amount: '₹800/day', startDate: '2023-09-10', endDate: null, employer: 'QuickDrop Logistics' },
];

export const stats = {
  gigsCompleted: 12,
  avgRating: 4.8,
  earnings: '₹14.2k'
};

export const profileData = {
  about: {
    en: "Hardworking and reliable worker with 5+ years of experience in home repair and painting work. Looking for long-term opportunities.",
    hi: "घर की मरम्मत और पेंटिंग के काम में 5+ वर्षों के अनुभव के साथ मेहनती और विश्वसनीय कर्मचारी। दीर्घकालिक अवसरों की तलाश में।"
  },
  languages: [
    { en: 'Hindi', hi: 'हिंदी' },
    { en: 'English', hi: 'अंग्रेज़ी' }
  ],
  location: "Noida, UP",
  skills: [
    { name: { en: 'Painting', hi: 'पेंटिंग' }, experience: { en: '5 years', hi: '5 साल' }, level: { en: 'Advanced', hi: 'उन्नत' } },
    { name: { en: 'Plumbing', hi: 'प्लंबिंग' }, experience: { en: '2 years', hi: '2 साल' }, level: { en: 'Intermediate', hi: 'मध्यवर्ती' } },
    { name: { en: 'General Labour', hi: 'सामान्य श्रम' }, experience: { en: '8 years', hi: '8 साल' }, level: { en: 'Expert', hi: 'विशेषज्ञ' } },
    { name: { en: 'Electrical', hi: 'इलेक्ट्रिकल' }, experience: { en: '1 year', hi: '1 साल' }, level: { en: 'Beginner', hi: 'शुरुआती' } },
    { name: { en: 'Carpentry', hi: 'बढ़ईगीरी' }, experience: { en: '3 years', hi: '3 साल' }, level: { en: 'Intermediate', hi: 'मध्यवर्ती' } }
  ],
  certifications: [
    { id: 'c1', name: { en: 'Advanced Home Painting', hi: 'उन्नत होम पेंटिंग' }, organization: 'Skill India', year: '2022', status: 'Approved' },
    { id: 'c2', name: { en: 'Basic Plumbing Safety', hi: 'बुनियादी प्लंबिंग सुरक्षा' }, organization: 'Urban Company Training', year: '2023', status: 'Pending Review' }
  ],
  reviews: [
    { id: 'r1', author: 'BuildWell Homes', rating: 5, date: { en: '2 months ago', hi: '2 महीने पहले' }, content: { en: 'Ramesh is very punctual and does a neat job.', hi: 'रमेश बहुत पाबंद हैं और साफ़-सुथरा काम करते हैं।' } },
    { id: 'r2', author: 'Sunita Sharma', rating: 4, date: { en: '4 months ago', hi: '4 महीने पहले' }, content: { en: 'Good work, but took a bit longer than expected.', hi: 'अच्छा काम, लेकिन उम्मीद से थोड़ा अधिक समय लगा।' } }
  ]
};

export const communityPosts = [
  {
    id: 'p1',
    author: { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram', role: 'Plumber' },
    content: 'Completed a large residential project today in Noida. Always remember to double check the sealants! Anyone else working in Sector 62?',
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=2070&auto=format&fit=crop',
    likes: 24,
    comments: 5,
    time: { en: '2 hours ago', hi: '2 घंटे पहले' }
  },
  {
    id: 'p2',
    author: { name: 'Anita Devi', avatar: 'https://i.pravatar.cc/150?u=anita', role: 'Housekeeping' },
    content: 'Just got my Verified Badge! This will really help in getting better paying gigs. Thank you Kaarya!',
    likes: 56,
    comments: 12,
    time: { en: '5 hours ago', hi: '5 घंटे पहले' }
  },
  {
    id: 'p3',
    author: { name: 'Rahul Kumar', avatar: 'https://i.pravatar.cc/150?u=rahul', role: 'Electrician' },
    content: 'Does anyone know where I can buy cheap and reliable wiring tools in wholesale in Delhi?',
    likes: 12,
    comments: 8,
    time: { en: '1 day ago', hi: '1 दिन पहले' }
  }
];

export const messages = [
  { id: 'm1', sender: 'BuildWell Homes', avatar: 'B', lastMessage: 'Are you available to start on Monday?', time: { en: '10:30 AM', hi: 'सुबह 10:30 बजे' }, unread: true },
  { id: 'm2', sender: 'Sunita Sharma', avatar: 'S', lastMessage: 'Thank you for the good work.', time: { en: 'Yesterday', hi: 'कल' }, unread: false },
  { id: 'm3', sender: 'Kaarya Support', avatar: 'K', lastMessage: 'Your certification has been approved.', time: { en: 'Monday', hi: 'सोमवार' }, unread: false }
];

export const notifications = [
  { id: 'n1', title: { en: 'Application Accepted', hi: 'आवेदन स्वीकृत' }, description: { en: 'BuildWell Homes accepted your application for Wall Painting.', hi: 'बिल्डवेल होम्स ने वॉल पेंटिंग के लिए आपका आवेदन स्वीकार कर लिया है।' }, time: { en: '1 hour ago', hi: '1 घंटा पहले' }, read: false },
  { id: 'n2', title: { en: 'New Gig Alert', hi: 'नया काम अलर्ट' }, description: { en: 'A new Electrician Helper gig was posted near you.', hi: 'आपके आस-पास एक नया इलेक्ट्रीशियन सहायक गिग पोस्ट किया गया था।' }, time: { en: '3 hours ago', hi: '3 घंटे पहले' }, read: false },
  { id: 'n3', title: { en: 'Profile Verified', hi: 'प्रोफ़ाइल सत्यापित' }, description: { en: 'Congratulations! Your identity verification is complete.', hi: 'बधाई हो! आपकी पहचान का सत्यापन पूरा हो गया है।' }, time: { en: '1 day ago', hi: '1 दिन पहले' }, read: true }
];
