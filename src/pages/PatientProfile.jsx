import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import ContactInfo from '../components/PatientProfileSteps/AccountInfo';
import MedicalHistory from '../components/PatientProfileSteps/MedicalHistory';
import PersonaInfo from '../components/PatientProfileSteps/PersonalInfo';
import { getOnePatient } from '../redux/reducers/patient.reducer';

const PatientProfile = () => {
  const step = useSelector((state) => state.step.profile_step);
  const patient = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOnePatient());
  }, []);

  return (
    <div>
      {patient?.loading && (
        <Box className="w-[80px] h-[80px] mx-auto mt-[220px] md:mt-[120px]">
          <Loader />
        </Box>
      )}
      {step === 0 && !patient?.loading && <PersonaInfo />}
      {step === 1 && !patient?.loading && <ContactInfo />}
      {step === 2 && !patient?.loading && <MedicalHistory />}
    </div>
  );
};

export default PatientProfile;
