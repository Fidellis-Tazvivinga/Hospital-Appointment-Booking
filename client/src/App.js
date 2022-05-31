import React from "react";
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import Home from "./components/Home/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";
import AdminRoute from "./components/ProtectedRoutes/AdminRoute";
import UserRoute from "./components/ProtectedRoutes/UserRoute";
import CustomerService from "./components/CustomerService";
import Doctor from "./components/Doctor";
import DoctorLogin from "./components/Doctor/Login";
import DoctorSignup from "./components/Doctor/Signup";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import CustomerServiceLogin from "./components/CustomerService/Login"
import CustomerServiceSignup from "./components/CustomerService/Signup"
import CustomerServiceDashboard from "./components/CustomerService/CustomerServiceDashboard";
import Layout from "./components/Layout";
import Doctors from "./components/Admin/Doctor/Doctors";
import Appointments from "./components/Admin/Appointments/Appointments";
import DoctorAppointments from "./components/Doctor/Appointments";
import Clinics from "./components/Admin/Clinic/Clinics";
import Hospitals from "./components/Admin/Hospital/Hospitals";
import Specializations from "./components/Admin/Specialization/Specializations";
import Supporters from "./components/Admin/Supporters/Supporters";
import Customercare from "./components/Admin/Customercare"
import NewPatients from "./components/Admin/NewPatients/NewPatients"
import Patients from "./components/Admin/Patients"
import Plan from "./components/Admin/Plan"
import Posts from "./components/Admin/Post/Posts"
import Statitical from "./components/Admin/Statistical"
import DoctorCreate from "./components/Admin/Doctor/DoctorCreate";
import EditDoctor from "./components/Admin/Doctor/EditDoctor";
import SpecializationsCreate from "./components/Admin/Specialization/SpecializationsCreate";
import EditSpecialization from "./components/Admin/Specialization/EditSpecialization";
import ClinicsCreate from "./components/Admin/Clinic/ClinicsCreate";
import SupporterCreate from "./components/Admin/Supporters/SupporterCreate";
import HospitalCreate from "./components/Admin/Hospital/HospitalCreate";
import AllSchedules from "./components/Doctor/Schedule/AllSchedules";

import EditClinic from "./components/Admin/Clinic/EditClinic";
import EditHospital from "./components/Admin/Hospital/EditHospital";
import EditSupporter from "./components/Admin/Supporters/EditSupporter";
import CreateSchedule from "./components/Doctor/Schedule/CreateSchedule";
import SearchList from "./components/User/Modals/Vacc/SearchList";
import HospitalSearchResults from "./components/User/Modals/Hospitals/HospitalSearchResults";
import ClinicSearchResults from "./components/User/Modals/Clinics/ClinicSearchResults";
import BookAppointment from "./components/User/Modals/Hospitals/BookAppointment";
import BookAppointmentClinic from "./components/User/Modals/Clinics/BookAppointment";
import AppointmentHistory from "./components/User/AppointmentHistory";
import UserAppointments from "./components/User/Appointments";
import AdminDashboardHCRM from "./HCRM/AdminDashboard"
import DoctorCalendar from "./components/Doctor/components/DoctorCalendar";
import ScheduleTest from "./components/User/Modals/Hospitals/ScheduleTest";
import DoctorPatients from "./components/Doctor/Patients";
const App = () => {
  return (
    <BrowserRouter>
      {/*   {location.pathname !== '/doctor/dashboard' || '/customerservice/dashboard' &&       <Header /> }
    */}

      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/doctor/login" element={<DoctorLogin />} />
            <Route exact path="/doctor/signup" element={<DoctorSignup />} />

            <Route exact path="/customerservice/signup" element={<CustomerServiceSignup />} />
            <Route exact path="/customerservice/login" element={<CustomerServiceLogin />} />
          </Route>


          <Route exact path="/test" element={<ScheduleTest />} />
          <Route exact path="/user/dashboard" element={<UserDashboard />} />
          <Route exact path="/user/vaccine/search" element={<SearchList />} />
          <Route exact path="/user/hospital/search" element={<HospitalSearchResults />} />
          <Route exact path="/user/clinic/search" element={<ClinicSearchResults />} />
          <Route exact path="/user/appointment/hospital" element={<BookAppointment />} />
          <Route exact path="/user/appointment/clinic" element={<BookAppointmentClinic />} />
          <Route exact path="/user/appointments" element={<UserAppointments />} />
          <Route exact path="/user/appointment-history" element={<AppointmentHistory />} />

          <Route exact path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route exact path="/customerservice/dashboard" element={<CustomerServiceDashboard />} />

          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/doctors" element={<Doctors />} />

          <Route exact path="/admin/supporters" element={<Supporters />} />
          <Route exact path="/admin/clinics" element={<Clinics />} />
          <Route exact path="/admin/hospitals" element={< Hospitals />} />
          <Route exact path="/admin/patients" element={< Patients />} />
          <Route exact path="/admin/specializations" element={< Specializations />} />


          <Route exact path="/hcrm/dashboard" element={< AdminDashboardHCRM />} />
          <Route exact path="/hcrm/doctors" element={<Doctors />} />
          <Route exact path="/hcrm/supporters" element={<Supporters />} />
          <Route exact path="/hcrm/clinics" element={<Clinics />} />
          <Route exact path="/hcrm/hospitals" element={< Hospitals />} />
          <Route exact path="/hcrm/patients" element={< Patients />} />
          <Route exact path="/hcrm/specializations" element={< Specializations />} />


          <Route exact path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route exact path="/doctor/patients" element={<DoctorPatients />} />
          <Route exact path="/doctor/appointments/calendar" element={<DoctorCalendar />} />
          <Route exact path="/doctor/schedules" element={<AllSchedules />} />
          <Route exact path="/all/schedules/create" element={<CreateSchedule />} />
          <Route exact path="/all/appointments" element={<Appointments />} />
          <Route exact path="/all/plans" element={<Plan />} />
          <Route exact path="/all/statistics" element={<Statitical />} />


          <Route exact path="/newpatients" element={<NewPatients />} />
          <Route exact path="/all/posts" element={<Posts />} />
          <Route exact path="/customercare" element={<Customercare />} />



          <Route exact path="/admin/doctor/create" element={<DoctorCreate />} />
          <Route exact path="/admin/doctor/:doctorId" element={<EditDoctor />} />
          <Route exact path="/admin/clinics/create" element={<ClinicsCreate />} />
          <Route exact path="/admin/hospitals/create" element={<HospitalCreate />} />
          <Route exact path="/admin/specializations/create" element={<SpecializationsCreate />} />
          <Route exact path="/admin/specializations/:specializationId" element={<EditSpecialization />} />
          <Route exact path="/admin/supporters/create" element={<SupporterCreate />} />
          <Route exact path="/admin/supporter/:supporterId" element={<EditSupporter />} />
          <Route exact path="/admin/clinic/:clinicId" element={<EditClinic />} />
          <Route exact path="/admin/hospital/:hospitalId" element={<EditHospital />} />


          <Route element={<Notfound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;