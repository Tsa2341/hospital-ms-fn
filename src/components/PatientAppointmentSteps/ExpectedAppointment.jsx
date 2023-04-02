import {
  Box,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { cancelAppointment } from '../../redux/reducers/appointment.reducer';
import { getPatientAppointments } from '../../redux/reducers/patient.appointment.reducer';
import { getOnePatient } from '../../redux/reducers/patient.reducer';
import CloseXButton from '../CloseXButton';
import LoadingButton from '../LoadingButton';
import PatientAppointmentNavigation from './PatientAppoinmentNavigation';

export const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  return data?.filter(
    (values) =>
      values.doctor.first_name.toLowerCase().includes(query.toLowerCase()) ||
      values.doctor.last_name.toLowerCase().includes(query.toLowerCase()) ||
      values.appointment_number.toLowerCase().includes(query.toLowerCase())
  );
};

const ExpectedAppointment = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [clickedIdx, setClickedIdx] = React.useState(0);
  const [appointIdx, setAppointIdx] = React.useState(null);
  const [appointDoc, setDoctor] = React.useState(null);
  const [appointSpec, setSpeciality] = React.useState(null);
  const [appointDate, setAppointDate] = React.useState(null);
  const [appointNum, setAppointNum] = React.useState(null);
  const [appointTime, setAppointTime] = React.useState(null);
  const patient = useSelector((state) => state.patient.single_data.data);
  const appoints = useSelector((state) => state.patient_appointment);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => !loading && setOpen(false);

  const clientId = JSON.parse(localStorage.getItem('userLoginData'))?.user
    ?.client_id;

  const expectedapps = appoints?.data?.data?.filter((values) => {
    return new Date(values?.work_day?.date) > new Date() && !values.is_canceled;
  });

  const filteredExpectedAppointments = useMemo(
    () => filterData(query, expectedapps),
    [query, expectedapps]
  );

  React.useEffect(() => {
    dispatch(getOnePatient(clientId));
    dispatch(getPatientAppointments(clientId));
  }, [clientId, appointIdx]);

  const handleCancelAppointment = async () => {
    setLoading(true);
    dispatch(cancelAppointment(appointIdx)).then(() => {
      dispatch(getPatientAppointments(clientId)).then(() => {
        setLoading(false);
        handleClose();
      });
    });
    // handleClose();
    // setLoading(true);
  };

  const nav = useNavigate();

  const appointmentData = [
    {
      name: 'Appointment Date',
      value: appointDate
    },
    {
      name: 'Appointment time',
      value: appointTime
    },
    {
      name: 'Appointment ID',
      value: appointNum
    },
    {
      name: 'Doctor',
      value: appointDoc
    },
    {
      name: 'Speciality',
      value: appointSpec?.speciality_name
    }
  ];

  return (
    <div>
      <Box className="w-full">
        <PatientAppointmentNavigation setQuery={setQuery} />
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            backgroundColor: '#F5F5F5',
            maxHeight: '400px',
            overflow: 'auto'
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              marginBottom: '40px',
              maxHeight: '55vh',
              overflow: 'auto'
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: '#797979',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Doctor name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#797979',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Speciality
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#797979',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Appointment num
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#797979',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#797979',
                    fontSize: { md: '17px', xs: '14px' }
                  }}
                >
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpectedAppointments?.map((row, idx) => (
                <>
                  <TableRow
                    key={row.appointment_number}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="cursor-pointer"
                      sx={{
                        color: '#797979',
                        fontSize: { md: '17px', xs: '14px' }
                      }}
                      onClick={() => {
                        nav(`${row.appointment_id}`);
                      }}
                    >
                      {row.doctor.first_name} {row.doctor.last_name}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="cursor-pointer"
                      sx={{
                        color: '#797979',
                        fontSize: { md: '17px', xs: '14px' }
                      }}
                      onClick={() => {
                        nav(`${row.appointment_id}`);
                      }}
                    >
                      {row.doctor.departments[0]?.speciality_name || '...'}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="cursor-pointer"
                      sx={{
                        color: '#797979',
                        fontSize: { md: '17px', xs: '14px' }
                      }}
                    >
                      {row.appointment_number}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: '#797979',
                        fontSize: { md: '17px', xs: '14px' }
                      }}
                      onClick={() => {
                        nav(`${row.appointment_id}`);
                      }}
                    >
                      {new Date(row.work_day?.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: '#797979',
                        fontSize: '12px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        gap: '4px'
                      }}
                    >
                      <Typography
                        className="text-center w-full"
                        style={{
                          color: '#797979',
                          textTransform: 'capitalize',
                          cursor: 'pointer',
                          fontSize: { md: '17px', xs: '14px' }
                        }}
                        onClick={() => {
                          setAppointIdx(row.appointment_id);
                          setDoctor(
                            `${row.doctor.first_name} ${row.doctor.last_name}`
                          );
                          setSpeciality(row.doctor.departments[0]);
                          setAppointDate(
                            new Date(row.work_day.date).toLocaleDateString()
                          );
                          setAppointNum(row.appointment_number);
                          setAppointTime(row.appointment_period);
                          setClickedIdx(idx);
                          handleOpen();
                        }}
                      >
                        cancel
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {clickedIdx === idx && (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      className="flex flex-col items-center justify-center"
                      sx={{
                        '& .MuiFormControl-root': {
                          margin: 0
                        }
                      }}
                    >
                      <Box className="flex flex-col max-w-[450px] w-full sm:w-[98%] justify-center items-center gap-4 bg-white border border-primary shadow-2 rounded-[20px] relative py-10 px-4 m-4 overflow-y-auto">
                        <Typography className="w-full font-semibold text-lg text-center">
                          Appointment Cancelation
                        </Typography>
                        <CloseXButton onClick={handleClose} />
                        <Box>
                          <Stack direction="row" gap={6} width="100%">
                            <Stack>
                              {appointmentData.map(({ name, value }) => (
                                <Typography
                                  key={name}
                                  className="truncate font-semibold "
                                >
                                  {name}
                                </Typography>
                              ))}
                            </Stack>
                            <Stack>
                              {appointmentData?.map(({ value }) => (
                                <Typography
                                  component={Link}
                                  key={value}
                                  className="truncate"
                                >
                                  {value}
                                  {/* Edit */}
                                </Typography>
                              ))}
                            </Stack>
                          </Stack>
                        </Box>

                        <Box>
                          <LoadingButton
                            loading={loading}
                            className="max-w-fit w-full"
                            onClick={handleCancelAppointment}
                          >
                            Cancel appointment
                          </LoadingButton>
                        </Box>
                      </Box>
                    </Modal>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ExpectedAppointment;
