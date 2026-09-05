// Mock employee data — 50 employees across 6 departments
const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Design', 'Operations']

const positions = {
  Engineering: ['Software Engineer', 'Senior Engineer', 'Tech Lead', 'DevOps Engineer', 'QA Engineer', 'Backend Engineer', 'Frontend Engineer', 'Staff Engineer'],
  Marketing: ['Marketing Manager', 'Content Strategist', 'SEO Specialist', 'Brand Designer', 'Growth Hacker', 'Social Media Manager'],
  HR: ['HR Manager', 'Recruiter', 'HR Business Partner', 'Talent Acquisition', 'L&D Specialist', 'Compensation Analyst'],
  Finance: ['Financial Analyst', 'Accountant', 'CFO', 'Finance Manager', 'Budget Analyst', 'Controller'],
  Design: ['UI Designer', 'UX Researcher', 'Product Designer', 'Visual Designer', 'Design Lead', 'Motion Designer'],
  Operations: ['Operations Manager', 'Project Manager', 'Business Analyst', 'Scrum Master', 'Product Owner', 'Strategy Lead'],
}

const firstNames = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Jamie', 'Riley', 'Avery', 'Quinn', 'Blake', 'Drew', 'Hayden', 'Kendall', 'Logan', 'Peyton', 'Skyler', 'Reese', 'Cameron', 'Dakota', 'Emery', 'Finley', 'Harper', 'Indigo', 'Jaden', 'Keegan', 'Lane', 'Maddox', 'Noah', 'Owen']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young']

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const avatarColors = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#14B8A6', '#F97316', '#8B5CF6', '#06B6D4']

export const employees = Array.from({ length: 50 }, (_, i) => {
  const dept = departments[i % departments.length]
  const posArr = positions[dept]
  const firstName = firstNames[i % firstNames.length]
  const lastName = lastNames[(i + 7) % lastNames.length]
  const name = `${firstName} ${lastName}`
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@empai.com`
  const position = posArr[i % posArr.length]
  const isActive = i % 7 !== 0
  const tenure = Math.floor(Math.random() * 5) + 1

  return {
    id: i + 1,
    name,
    department: dept,
    position,
    email,
    isActive,
    tenure,
    initials: getInitials(name),
    avatarColor: avatarColors[i % avatarColors.length],
    joinDate: new Date(2020 + (i % 5), (i * 3) % 12, (i % 28) + 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  }
})

export const departmentStats = departments.map(dept => ({
  name: dept,
  count: employees.filter(e => e.department === dept).length,
  active: employees.filter(e => e.department === dept && e.isActive).length,
}))

export const monthlyHiring = [
  { month: 'Aug', hired: 3 },
  { month: 'Sep', hired: 5 },
  { month: 'Oct', hired: 2 },
  { month: 'Nov', hired: 7 },
  { month: 'Dec', hired: 4 },
  { month: 'Jan', hired: 6 },
  { month: 'Feb', hired: 8 },
  { month: 'Mar', hired: 5 },
  { month: 'Apr', hired: 9 },
  { month: 'May', hired: 11 },
  { month: 'Jun', hired: 7 },
  { month: 'Jul', hired: 6 },
]
