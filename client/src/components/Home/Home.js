
import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
//import AllClinics from "./AllClinics"
import "./Home.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const { Header, Content, Footer } = Layout;
const Home = () => {
  const history = useNavigate()
  const [bookLink, setBookLink] = useState("")

  const { auth, authDoctor, customerservice } = useSelector((state) => ({ ...state }));

  const handleBookClick = () => {
    if (auth === null) {
      history("/login")
    } else if (auth && auth.user.role == 0) {
      history("/user/dashboard");
    } else if (authDoctor && authDoctor.doctor.role == 1) {
      history("/doctor/dashboard");
    }
    else if (customerservice && customerservice.customerservice.role == 2) {
      history("/customerservice/dashboard");
    }
    else if (auth && auth.user.role == 3) {
      history("/admin/dashboard");
    }
  }



  return (
    <div>





      <div>

        {/* navbar */}




        <section className="home__banner"  >
          <div className="home__banner__container" style={{ backgroundImage: "url(/images/background/header-cover.jpg) " }}>
            <h3>Welcome to Our Doctor Booking Appointment </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque consequatur mi sunt voluptatibus est asperiores, nisi rerum fuga pariatur!</p>
            <Button onClick={handleBookClick} >Book an Appointment</Button>
          </div>
          <div className="home__banner__icons">
            <div className="home__banner__icon d-flex flex-column align-items-center">
              <i className="fa fa-check" />
              <span>Prestigious hospitals</span>
            </div>
            <div className="home__banner__icon d-flex flex-column align-items-center">
              <i className="fa fa-thumbs-up" />
              <span>Good clinics</span>
            </div>
            <div className="home__banner__icon d-flex flex-column align-items-center">
              <i className="fa fa-user-md" />
              <span>Out standing doctors</span>
            </div>
            <div className="home__banner__icon d-flex flex-column mr-5 pr-5 align-items-center">
              <i className="fa fa-clock" />
              <span>Priority examination</span>
            </div>
          </div>
        </section>



        {/* Why US*/}
        <div className="whyus">

          <div className="whyus__section">
            <div className="whyus__list whyus__one">
              <img src="/images/whyus/time1.svg" alt="" />
              <h4>Quick Appointment</h4>
              <p>You can instantly make an appointment with the physician you want from the mobile application, the Web and the Hello199 Appointment line.</p>
            </div>
            <div className="whyus__list whyus__two">
              <img src="/images/whyus/time2.svg" alt="" />
              <h4>Nearest Hospital</h4>
              <p>You can find the nearest hospital to you by sharing your location information via Mobile Application and Web.</p>
            </div>
            <div className="whyus__list whyus__three">
              <img src="/images/whyus/time3.svg" alt="" />
              <h4>The Doctor you want</h4>
              <p>It is up to you to make an appointment with the doctor you want on MHRS.</p>
            </div>
            <div className="whyus__list whyus__four">
              <img src="/images/whyus/time4.svg" alt="" />
              <h4>What are my health problems?</h4>
              <p>You can enter your complaint and get specific diagnostic recommendations and an outpatient clinic appointment.</p>
            </div>
          </div>

        </div>


        {/* Modal show all clinics*/}

        {/* Modal show all doctors*/}








      </div>

    </div>
  );
};

export default Home;