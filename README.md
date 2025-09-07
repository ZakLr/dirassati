# School Management System

A comprehensive web-based school management system built with Next.js, designed to streamline educational administration and enhance communication between administrators, teachers, parents, and students.

## 🚀 Features

### 🔐 Authentication & User Management

- **Multi-role Authentication**: Support for Admin, Teacher, Parent, and Student roles
- **Secure Login System**: JWT-based authentication with token refresh
- **Role-based Access Control**: Different permissions and features for each user type
- **Password Reset**: Secure password recovery with OTP verification
- **Profile Management**: User profile customization and management

### 👨‍💼 Admin Dashboard

- **Real-time Analytics**: Comprehensive dashboard with key metrics and statistics
- **Student Management**:
  - View and manage approved students
  - Edit student information (level, group assignments)
  - Approve/unapprove students
  - Send notifications to individual students
  - View student documents and PDFs
- **Schedule Management**:
  - Create and manage academic schedules
  - Auto-generate schedules based on availability
  - Assign teachers, modules, and rooms to time slots
  - Support for multiple trimesters and academic levels
- **Group Management**: Create and manage student groups
- **Module Management**: Assign modules to different academic levels
- **Archive System**: Manage archived data and records

### 👨‍🏫 Teacher Dashboard

- **Personal Dashboard**: Overview of classes and statistics
- **Schedule Management**: View and manage teaching schedules
- **Student Management**: Access to assigned students and groups
- **Communication Tools**: Chat with parents and students
- **Grade Management**: Add and update student marks (planned feature)
- **Attendance Tracking**: Monitor student attendance

### 👨‍👩‍👧‍👦 Parent Dashboard

- **Family Overview**: Manage multiple children in the system
- **Child Registration**: Complete child registration process
- **Schedule Access**: View children's academic schedules
- **Communication**: Chat with teachers
- **Payment Management**: Handle school fees and payments (planned feature)
- **Progress Tracking**: Monitor children's academic performance

### 👨‍🎓 Student Dashboard

- **Personal Dashboard**: Academic overview and statistics
- **Schedule View**: Access to personal academic schedule
- **Attendance Tracking**: View personal attendance records
- **Grade Visualization**: View marks and academic performance
- **Communication**: Chat with teachers and classmates (planned features)

## 🛠️ Technology Stack

### Frontend

- **Next.js 15.2.1**: React framework for production
- **React 19.0.0**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Ant Design**: UI component library
- **Redux Toolkit**: State management
- **Redux Persist**: State persistence
- **React Hook Form**: Form handling
- **Framer Motion**: Animations
- **ApexCharts**: Data visualization
- **Recharts**: Additional charting library

### Backend Integration

- **RESTful APIs**: Communication with backend services
- **Axios**: HTTP client for API calls
- **JWT**: Authentication tokens
- **Cloudinary**: File storage and management

### Development Tools

- **TypeScript**: Type safety (configured)
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```bash
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   ├── admin/                    # Admin dashboard
│   │   ├── components/           # Admin-specific components
│   │   ├── schedule/             # Schedule management
│   │   ├── students/             # Student management
│   │   └── ...
│   ├── parent/                   # Parent dashboard
│   ├── student/                  # Student dashboard
│   ├── teacher/                  # Teacher dashboard
│   ├── signin/                   # Sign-in page
│   ├── signup/                   # Registration pages
│   ├── api/                      # API routes
│   ├── redux/                    # State management
│   └── globals.css               # Global styles
├── components/                   # Shared components
│   ├── ui/                       # UI components
│   └── utils/                    # Utility functions
├── lib/                          # Library configurations
├── public/                       # Static assets
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/1CS-Project-Dirassati/Frontend.git
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret
   NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Key Features Breakdown

### Admin Features

- **Dashboard Analytics**:

  - Total students, parents, active sessions
  - Attendance rates and enrollment trends
  - Grade distribution and performance metrics
  - Resource allocation visualization

- **Student Management**:

  - Comprehensive student database
  - Level and group assignments
  - Document management (PDF viewing)
  - Notification system

- **Schedule Creation**:
  - Multi-step schedule creation wizard
  - Auto-generation based on availability
  - Conflict detection and resolution
  - Support for multiple academic levels

### Parent Features

- **Multi-Child Support**: Manage multiple children
- **Registration Process**: Step-by-step child registration
- **Schedule Access**: View children's timetables
- **Communication Portal**: Direct messaging with teachers

### Student Features

- **Academic Dashboard**: Personal performance metrics
- **Schedule Viewer**: Daily/weekly schedule display
- **Attendance Records**: Personal attendance history
- **Document Access**: View personal documents

### Teacher Features

- **Class Management**: Assigned groups and students
- **Schedule Overview**: Teaching schedule management
- **Communication Tools**: Parent and student messaging

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Theme switching capability
- **Modern UI Components**: Ant Design + custom Shadcn/ui components
- **Interactive Charts**: ApexCharts and Recharts integration
- **Smooth Animations**: Framer Motion animations
- **Toast Notifications**: Real-time feedback with Sonner

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions per user type
- **Token Refresh**: Automatic token renewal
- **Secure API Calls**: Protected API endpoints
- **File Upload Security**: Cloudinary integration for secure file handling

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile devices
- Different screen sizes and orientations

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, please contact the development team or create an issue in the repository.

## 🚀 Deployment

The application can be deployed on:

- Vercel (recommended for Next.js)
- Netlify
- AWS
- Digital Ocean
- Any Node.js hosting platform

### Deployment Steps

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start
   ```

## 📈 Future Enhancements

### Planned Features

- **Real-time Chat**: Integrated messaging system
- **Grade Management**: Teacher grading interface
- **Payment Integration**: Stripe payment processing
- **Mobile App**: React Native companion app
- **Advanced Analytics**: Machine learning insights
- **Multi-language Support**: Internationalization
- **Offline Mode**: Progressive Web App features

### Technical Improvements

- **TypeScript Migration**: Full TypeScript support
- **Testing Suite**: Comprehensive test coverage
- **Performance Optimization**: Code splitting and lazy loading
- **API Caching**: Redis integration for better performance

---

## ❤️ Built with Love

Built with ❤️ for educational excellence
