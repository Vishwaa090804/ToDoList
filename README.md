# TodoApp

A modern, feature-rich todo list web application built with React and Firebase, offering seamless task management with user authentication and organized categories.

## 🌟 Features

<img width="1839" height="940" alt="Screenshot 2025-07-29 082318" src="https://github.com/user-attachments/assets/49fc80e7-8172-4287-ab9d-272b67d08cb9" />
<img width="1890" height="965" alt="Screenshot 2025-07-29 082520" src="https://github.com/user-attachments/assets/96a9f1f5-8edd-4543-90e2-fbb0091263cc" />
<img width="1885" height="960" alt="Screenshot 2025-07-29 082553" src="https://github.com/user-attachments/assets/b245ffb5-2536-45a9-8cd7-a8ae40e4a454" />


### Core Functionality
- **CRUD Operations**: Create, Read, Update, and Delete todos
- **Task Categories**: Organize tasks into different categories:
  - Personal
  - Work
  - Shopping
  - Coding
  - Health
  - Fitness
- **Notes Feature**: Add detailed notes with a "Dear Diary" style interface
- **Voice Input**: Voice-to-text functionality for hands-free task creation
- **Real-time Updates**: Instant synchronization across devices

### Authentication
- **Firebase Authentication**: Secure user login and registration
- **Email/Password Login**: Simple and secure authentication method
- **User Session Management**: Persistent login sessions
- **Account Creation**: Easy sign-up process for new users

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Category Color Coding**: Visual organization with color-coded categories
- **Task Counter**: Track the number of tasks in each category
- **Clean Interface**: Intuitive and user-friendly design
- **Voice Integration**: Microphone icons for voice input functionality

## 🚀 Technologies Used

- **Frontend**: React.js
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (assumed for data persistence)
- **Styling**: CSS3 with modern design principles
- **Voice Recognition**: Web Speech API
- **Deployment**: [Your deployment platform]

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todoapp.git
   cd todoapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Copy your Firebase configuration
   - Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Usage

### Getting Started
1. **Sign Up/Login**: Create a new account or login with existing credentials
2. **Choose Category**: Select from Personal, Work, Shopping, Coding, Health, or Fitness
3. **Add Tasks**: Use the text input or voice input to create new todos
4. **Manage Tasks**: Edit, complete, or delete tasks as needed
5. **Take Notes**: Use the Notes feature for detailed thoughts and planning

### Voice Features
- Click the microphone icon to use voice input
- Speak clearly to convert speech to text
- Available in both todo creation and notes sections

### Categories
Each category is color-coded for easy identification:
- **Personal** (Blue): Personal tasks and reminders
- **Work** (Yellow): Professional and work-related tasks
- **Shopping** (Pink): Shopping lists and purchases
- **Coding** (Green): Development tasks and projects
- **Health** (Light Pink): Health-related activities
- **Fitness** (Purple): Exercise and fitness goals

## 📱 Screenshots

The application features:
- A clean dashboard with category overview
- Task creation with voice input support
- Notes section for detailed planning
- Secure authentication system

## 🔐 Security Features

- **Firebase Authentication**: Industry-standard security
- **Protected Routes**: Authenticated access only
- **Data Validation**: Input sanitization and validation
- **Secure API Calls**: Encrypted data transmission

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Netlify
```bash
npm run build
# Deploy the build folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

## 🛠️ Development

### Project Structure
```
todoapp/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── App.js
├── .env
├── package.json
└── README.md
```

### Available Scripts
- `npm start`: Run development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Vishwaa090804](https://github.com/Vishwaa09080)
- Email: vishwatejachilupuri@gmail.com

## 🙏 Acknowledgments

- Firebase for authentication and database services
- React community for excellent documentation
- Web Speech API for voice recognition functionality
- All contributors who helped improve this project

## 📈 Future Enhancements

- [ ] Task deadlines and reminders
- [ ] Collaborative todo lists
- [ ] Dark mode toggle
- [ ] Export/Import functionality
- [ ] Mobile app version
- [ ] Advanced filtering and search
- [ ] Task priority levels
- [ ] Integration with calendar apps

---

⭐ Star this repository if you found it helpful!
