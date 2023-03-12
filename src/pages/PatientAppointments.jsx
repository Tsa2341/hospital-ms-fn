import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import { useSelector } from 'react-redux';
import ExpectedAppointment from '../components/PatientAppointmentSteps/ExpectedAppointment';
import PreviousAppointment from '../components/PatientAppointmentSteps/PreviousAppointment';
import AppointmentDisplay from '../components/PatientAppointmentSteps/AppointmentDisplay';

const PatientAppointments = () => {
  const step = useSelector((state) => state.step.appointment_step);
  return (
    <div>
      <HomeNavBar />
      {step === 0 && <ExpectedAppointment />}
      {/* {step === 1 && <PreviousAppointment />} */}
      {step === 1 && <AppointmentDisplay />}
    </div>
  );
};

export default PatientAppointments;
