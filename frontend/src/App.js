import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import BackgroundScreen from './screens/BackgroundScreen';
import CollegeScreen from './screens/CollegeScreen';
import CollegeDetailScreen from './screens/CollegeDetailScreen';
import AdmissionScreen from './screens/AdmissionScreen';
import NewAdmissionScreen from './screens/NewAdmissionScreen';
import AdmissionDetailScreen from './screens/AdmissionDetailScreen';
import MyAdmissionsScreen from './screens/MyAdmissionsScreen';
import AdmissionEditScreen from './screens/AdmissionEditScreen';
import ForumScreen from './screens/ForumScreen';
import NewPostScreen from './screens/NewPostScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import MyPostsScreen from './screens/MyPostsScreen';
import PostEditScreen from './screens/PostEditScreen';
import CalculatorScreen from './screens/CalculatorScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/changepassword' component={ChangePasswordScreen} />
          <Route path='/background' component={BackgroundScreen} />
          <Route path='/colleges' component={CollegeScreen} exact />
          <Route path="/colleges/search/:keyword" component={CollegeScreen} exact />
          <Route path="/colleges/:id" component={CollegeDetailScreen} exact />
          <Route path='/admissions' component={AdmissionScreen} exact />
          <Route path='/admissions/search/:keyword' component={AdmissionScreen} exact />
          <Route path='/admissions/page/:pageNum' component={AdmissionScreen} exact />
          <Route path='/admissions/search/:keyword/page/:pageNum' component={AdmissionScreen} exact />
          <Route path='/admissions/:id' component={AdmissionDetailScreen} exact />
          <Route path="/admissions/:id/edit" component={AdmissionEditScreen} exact />
          <Route path='/newadmission' component={NewAdmissionScreen} />
          <Route path='/myadmissions' component={MyAdmissionsScreen} />
          <Route path='/forums' component={ForumScreen} exact />
          <Route path='/forums/search/:keyword' component={ForumScreen} exact />
          <Route path='/forums/page/:pageNum' component={ForumScreen} exact />
          <Route path='/forums/search/:keyword/page/:pageNum' component={ForumScreen} exact />
          <Route path='/posts/:id' component={PostDetailScreen} exact />
          <Route path="/posts/:id/edit" component={PostEditScreen} exact />
          <Route path='/newpost' component={NewPostScreen} />
          <Route path='/myposts' component={MyPostsScreen} />
          <Route path='/calculator' component={CalculatorScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;