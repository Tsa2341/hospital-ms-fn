/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import {
  addMinutes,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  isEqual,
  subMinutes
} from 'date-fns';
import _ from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import CreateAppointmentModal from '../components/Appointment/CreateAppointmentModal';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import CalendarMonthYearSelector from '../components/Calendar/CalendarMonthYearSelector';
import DoctorAppointmentsCalendar from '../components/Calendar/DoctorAppointmentsCalendar';
import {
  getDoctorAppointments,
  selectAppointmentsById
} from '../redux/reducers/appointment.reducer';
import { setSelectedDate } from '../redux/reducers/calendar.reducer';
import { getOneDoctor } from '../redux/reducers/doctor.reducer';
import {
  getDoctorWorkDays,
  selectWorkDaysDoctors
} from '../redux/reducers/workDays.reducer';
import {
  setSelectedDoctorDataRedux,
  setSelectedPatientDataRedux,
  setSelectedWorkDay
} from '../redux/reducers/user.reducer';
import { getOnePatient } from '../redux/reducers/patient.reducer';
import HomeNavBar from '../components/HomeNavBar';

function PatientsCalendar() {
  const dispatch = useDispatch();
  const { id: doctorId } = useParams();
  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;
  const calendarRef = useRef(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [openRightSideBar, setOpenRightSideBar] = useState(null);
  const [workdays, setWorkdays] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  console.log(slots, 'slots ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
  // const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const workDays = useSelector(
    (state) => selectWorkDaysDoctors(state, doctorId)?.workDays
  );
  const doctor = useSelector((state) => state.doctor);
  const patient = useSelector((state) => state.patient);
  const days = useSelector((state) => state.workDays);

  const doctorData = doctor?.single_data?.data;
  const patientData = patient?.single_data?.data;

  const toggleRightSideBar = () => {
    setOpenRightSideBar((open) => !open);
  };
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const dates = workdays?.map((values) => values.date);

  const selectedWorkDay = workdays?.filter((values) => {
    return values.date === selectedDate;
  });

  function addSubstractTime(hour, minute, minutesToAdd, operation) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    const newDate =
      operation === 's'
        ? subMinutes(date, minutesToAdd)
        : addMinutes(date, minutesToAdd);
    return format(newDate, 'HH:mm');
  }

  useEffect(() => {
    const workDaysSlots = {};

    if (workDays) {
      const workDay = workDays[0];
      if (!workDay) {
        return;
      }
      const slots = [];
      const { from, to, date } = workDay;
      const duration = workDay.schedule.appointment_duration;
      const { appointments } = workDay.schedule;
      let taken = [];
      appointments.forEach((appointment) => {
        taken.push(appointment.appointment_period);
      });
      taken = taken.sort((a, b) => (a < b ? -1 : 1));
      console.log(taken, 'taken');
      let [fromHour, fromMinute] = from.trim().split(':');
      let [toHour, toMinute] = to.trim().split(':');
      fromHour = parseInt(fromHour, 10);
      fromMinute = parseInt(fromMinute, 10);
      toHour = parseInt(toHour, 10);
      toMinute = parseInt(toMinute, 10);

      const lastSlot = `${addSubstractTime(
        toHour,
        toMinute,
        duration,
        's'
      )} - ${toHour}:${toMinute}`;
      let currentSlot = `${fromHour}:${fromMinute} - ${addSubstractTime(
        fromHour,
        fromMinute,
        duration
      )}`;

      console.log(lastSlot, currentSlot, 'lastSlot, currentSlot');

      while (true) {
        slots.push(currentSlot);
        if (currentSlot === lastSlot) {
          break;
        }
        if (currentSlot === '17:00') {
          currentSlot = `17:00 - ${addSubstractTime(17, 0, duration)}`;
        } else {
          const slotLastPart = currentSlot.split('-')[1].trim();
          const splitLastSlotPart = slotLastPart.split(':');
          currentSlot = `${currentSlot} - ${addSubstractTime(
            splitLastSlotPart[0],
            splitLastSlotPart[1],
            duration
          )}`;
        }
      }
      workDaysSlots[format(date, 'yyyy-MM-dd')] = slots;
    }

    // workDaysState?.workDays?.forEach((workDay) => {
    //   const slots = [];
    //   const { from, to, date } = workDay;
    //   const duration = workDay.schedule.appointment_duration;
    //   const { appointments } = workDay.schedule;
    //   let taken = [];
    //   appointments.forEach((appointment) => {
    //     taken.push(appointment.appointment_period);
    //   });
    //   taken = taken.sort((a, b) => (a < b ? -1 : 1));
    //   console.log(taken, 'taken');
    //   let [fromHour, fromMinute] = from.trim().split(':');
    //   let [toHour, toMinute] = to.trim().split(':');
    //   fromHour = parseInt(fromHour, 10);
    //   fromMinute = parseInt(fromMinute, 10);
    //   toHour = parseInt(toHour, 10);
    //   toMinute = parseInt(toMinute, 10);

    //   const lastSlot = `${addSubstractTime(
    //     toHour,
    //     toMinute,
    //     duration,
    //     's'
    //   )} - ${toHour}:${toMinute}`;
    //   let currentSlot = `${fromHour}:${fromMinute} - ${addSubstractTime(
    //     fromHour,
    //     fromMinute,
    //     duration
    //   )}`;

    //   while (true) {
    //     slots.push(currentSlot);
    //     if (currentSlot === lastSlot) {
    //       break;
    //     }
    //     if (currentSlot === '17:00') {
    //       currentSlot = `17:00 - ${addSubstractTime(17, 0, duration)}`;
    //     } else {
    //       const slotLastPart = currentSlot.split('-')[1].trim();
    //       const splitLastSlotPart = slotLastPart.split(':');
    //       currentSlot = `${currentSlot} - ${addSubstractTime(
    //         splitLastSlotPart[0],
    //         splitLastSlotPart[1],
    //         duration
    //       )}`;
    //     }
    //   }
    //   workDaysSlots[format(date, 'yyyy-MM-dd')] = slots;
    // });
    setSlots(workDaysSlots);
  }, [workDays]);
  useEffect(() => {
    setLoading(true);
    dispatch(getOneDoctor(doctorId));
    dispatch(getOnePatient(clientId));
    dispatch(getDoctorWorkDays({ id: doctorId })).then(({ error }) => {
      if (error) {
        toast.error(error.message);
      }
      setLoading(false);
    });
  }, [doctorId]);
  useEffect(() => {}, [doctorId]);
  useEffect(() => {
    setWorkdays(days?.entities[doctorId]?.workDays);
  }, [days, doctorId]);
  useEffect(() => {
    dispatch(setSelectedDoctorDataRedux(doctorData));
    dispatch(setSelectedPatientDataRedux(patientData));
    dispatch(setSelectedWorkDay(selectedWorkDay && selectedWorkDay[0]));
  }, [doctorData, patientData, selectedWorkDay]);

  return (
    <HomeNavBar>
      <Box className="flex flex-row w-full h-full">
        <Box className="sm:p-4 p-8 flex flex-col grow sm:gap-0 gap-3 overflow-y-auto">
          <IconButton
            onClick={toggleRightSideBar}
            sx={{
              position: 'absolute',
              backgroundColor: '#9b9b9b2d',
              color: '#000',
              top: '60px',
              right: '16px',
              display: { md: 'none', xs: 'block' }
            }}
          >
            <FiChevronLeft />
          </IconButton>
          <Stack
            direction="row"
            gap={{ xs: 1, sm: 3 }}
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mb={{ xs: 2, sm: 5 }}
          >
            <Stack
              direction="row"
              className="gap-3 items-center sm:w-full overflow-hidden"
            >
              <BackButton />
              <Typography
                fontSize={{ xs: 16, sm: 32 }}
                className="leading-none"
                noWrap
              >
                Select date and time
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="end" className="sm:w-full">
              <CalendarMonthYearSelector
                viewDate={viewDate}
                setViewDate={setViewDate}
              />
            </Stack>
          </Stack>
          <Box className="sm:px-0 px-20">
            <DoctorAppointmentsCalendar
              ref={calendarRef}
              {...{ handleDayClick, selectedDate, loading, viewDate, workdays }}
            />
          </Box>
        </Box>
        <Drawer
          open={openRightSideBar}
          anchor="right"
          variant={isMobile ? 'temporary' : 'permanent'}
          onClose={() => {
            setOpenRightSideBar(false);
          }}
          sx={{
            '& .MuiDrawer-paper': {
              maxWidth: '250px',
              width: '100%'
            }
          }}
          classes={{
            paper: isMobile ? 'absolute' : 'relative'
          }}
          ModalProps={{
            keepMounted: false
          }}
          className="transition duration-150 ease-in-out"
        >
          <CalendarRightSideBar {...{ loading }} />
        </Drawer>
      </Box>
    </HomeNavBar>
  );
}

const CalendarRightSideBar = ({ loading }) => {
  const appointmentHours = [
    '09:00 - 09:30',
    '09:00 - 09:31',
    '09:00 - 09:32',
    '09:00 - 09:33'
  ];
  const [selectedTime, setSelectedTime] = useState(appointmentHours[0]);
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.doctor.single_data.data);

  const selectedPatientData = useSelector(
    (state) => state.user.selectedPatient
  );
  const selectedWorkDayData = useSelector(
    (state) => state.user.selectedWorkDay
  );

  return (
    <>
      <List disablePadding className="border-l border-primary w-full h-full">
        {appointmentHours.map((hour, index) => (
          <>
            <ListItemButton
              key={hour}
              onClick={() => {
                !loading && setSelectedTime(hour);
              }}
              className="border-b border-primary p-3 text-center"
              selected={hour === selectedTime}
            >
              <ListItemText primary={hour} />
            </ListItemButton>
            <Divider key={hour + index} sx={{ borderColor: 'primary.main' }} />
          </>
        ))}
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className="bg-primary m-4"
            onClick={() => {
              !loading && setOpenModal(true);
            }}
          >
            Make Appointment
          </Button>
        </Stack>
      </List>
      <CreateAppointmentModal
        open={openModal || false}
        {...{
          doctorData: {
            doctorId: doctor?.doctor_id,
            firstName: doctor?.first_name,
            lastName: doctor?.last_name
          },
          patientData: {
            patientId: selectedPatientData?.client_id,
            firstName: selectedPatientData?.first_name,
            lastName: selectedPatientData?.last_name
          },
          workDayData: {
            workDayId: selectedWorkDayData?._id
          },
          scheduleData: {
            scheduleId: selectedWorkDayData?.schedule_id
          },
          specialities: doctor?.departments.map((dep) => dep.speciality_name),
          onClose: () => {
            setOpenModal(false);
          },
          selectedTime
        }}
      />
    </>
  );
};

export default PatientsCalendar;
