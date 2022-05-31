import React from 'react';

const index = () => {
  return <div>

<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

   {/*  <!-- Sidebar - Brand --> */}
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/users">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Doctors Care</div>
    </a>

  {/*   <!-- Divider --> */}
    <hr class="sidebar-divider my-0"/>

  {/*   <!-- Nav Item - Dashboard --> */}
    <li class="nav-item">
        <a class="nav-link" href="/users">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>


    <hr class="sidebar-divider"/>
{/* 
    <% if(user.roleId === 1 ) { %>
        <!-- Admin --> */}
        <div class="sidebar-heading">
            Admins
        </div>
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#featureManage"
               aria-expanded="true"
               aria-controls="collapseTwo">
                <i class="fas fa-users-cog"></i>
                <span>Users</span>
            </a>
            <div id="featureManage" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Manage</h6>
                    <a class="collapse-item" id="aManageDoctor" href="/users/manage/doctor">Doctors</a>
                    <a class="collapse-item" id="aManageSupporter" href="/users/manage/supporter">Counselors</a>
                </div>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
               aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-wrench"></i>
                <span>Others</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                 data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Others</h6>
                    <a class="collapse-item" id="aManageBot" href="/users/manage/bot">Facebook Bot </a>
                    <a class="collapse-item" id="aManageClinic" href="/users/manage/clinic">Clinics</a>
                    <a class="collapse-item" id="aManageSpecialization" href="/users/manage/specialization">Specialists</a>
                    <a class="collapse-item" id="aManageCreateScheduleDoctors"
                       href="/users/manage/schedule-for-doctors">Create an appointment</a>
                </div>
            </div>
        </li>
      {/*   <!-- Admin --> */}

        <hr class="sidebar-divider"/>

     {/*    <!-- Doctors --> */}
        <div class="sidebar-heading">
           Doctors
        </div>
        <li class="nav-item " id="listAppointment">
            <a class="nav-link" href="/doctor/manage/appointment">
                <i class="fas fa-calendar-check"></i>
                <span>Appointment schedule</span></a>
        </li>

        <li class="nav-item liScheduleClass" id="liSchedule">
            <a class="nav-link" href="/doctor/manage/schedule">
                <i class="fas fa-fw fa-table"></i>
                <span>Plan</span></a>
        </li>

        <li class="nav-item" id="listChart">
            <a class="nav-link" href="/doctor/manage/chart">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Statistical</span></a>
        </li>
     {/*    <!-- Doctors --> */}

        <hr class="sidebar-divider d-none d-md-block"/>

      {/*   <!-- Supporter --> */}
        <div class="sidebar-heading">
            Counselors
        </div>
        <li class="nav-item supporter-list-patients" id="liSchedule">
            <a class="nav-link" href="/supporter/get-new-patients">
                <i class="fas fa-procedures"></i>
                <span>New patients</span></a>
        </li>
        <li class="nav-item supporter-list-posts">
            <a class="nav-link supporter-manage-posts" href="/supporter/manage/posts">
                <i class="fas fa-newspaper"></i>
                <span>Posts</span></a>
        </li>
        <li class="nav-item supporter-list-customers">
            <a class="nav-link" href="/supporter/manage/customers">
                <i class="fas fa-user-shield"></i>
                <span>Customer care</span></a>
        </li>
  {/*       <!-- Supporter --> */}

{/*     <% } %> */}

  {/*   <% if(user.roleId === 2 ) { %>
        <!-- Doctors -->
 */}
        <div class="sidebar-heading">
           Doctors
        </div>
        <li class="nav-item " id="listAppointment">
            <a class="nav-link" href="/doctor/manage/appointment">
                <i class="fas fa-calendar-check"></i>
                <span>Appointment schedule</span></a>
        </li>
        <li class="nav-item liScheduleClass" id="liSchedule">
            <a class="nav-link" href="/doctor/manage/schedule">
                <i class="fas fa-fw fa-table"></i>
                <span>Plant</span></a>
        </li>

        <li class="nav-item"  id="listChart">
            <a class="nav-link" href="/doctor/manage/chart">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Statistical</span></a>
        </li>
   {/*      <!-- Doctors -->

    <% } %>

    <% if(user.roleId === 3 ) { %>
        <!-- Supporter --> */}
        <div class="sidebar-heading">
            Counselors
        </div>
        <li class="nav-item supporter-list-patients" id="liSchedule">
            <a class="nav-link" href="/supporter/get-new-patients">
                <i class="fas fa-procedures"></i>
                <span>New patients</span></a>
        </li>
        <li class="nav-item supporter-list-posts">
            <a class="nav-link supporter-manage-posts" href="/supporter/manage/posts">
                <i class="fas fa-newspaper"></i>
                <span>Posts</span></a>
        </li>
        <li class="nav-item supporter-list-customers">
            <a class="nav-link" href="/supporter/manage/customers">
                <i class="fas fa-user-shield"></i>
                <span>Customer care</span></a>
        </li>
    {/*     <!-- Supporter -->

    <% } %> */}

    <hr class="sidebar-divider d-none d-md-block"/>
{/*     <!-- Sidebar Toggler (Sidebar) --> */}
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>



  </div>;

};

export default index;
