import PageTitle from '../../../../components/PageTitle';
import { useEffect, useState } from 'react';
import { Post } from "../../../../services/common.service";
import { logout } from "../../../../services/auth.service";
import { ProfileService } from '../../../../services/profile.service';
import { Profile } from '../../../../types/profile.type';
import { object, string, number, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import { Button, IconButton, Container, Grid, Card, CardHeader, CardContent, Divider, Autocomplete } from '@mui/material';
import Footer from '../../../../components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { LectureService } from '../../../../services/lecture.service';
import { profile } from 'console';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function LoginForm() {
    logout();
    let navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [profile, setProfile] = useState<any>();
    const initialValues: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };
    type UserSubmitForm = {
        username: string;
        password: string;
    };

    const validationSchema = object({
        username: string().nonempty('Username is required')
            .min(2, 'Username must be at least 2 characters')
            .max(20, 'Username must not exceed 20 characters'),
        password: string()
            .nonempty('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<UserSubmitForm>({
        resolver: zodResolver(validationSchema)
    });
 
    const onSubmitHandler: SubmitHandler<UserSubmitForm> = (values) => {
        handlePreLogin(values);
    };

    const handlePreLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;
        setMessage("");
        setLoading(true);
        Post('user/login', formValue).then(
            (response: any) => {
                debugger;
                if (response.data.token) {
                    setProfile(response.data);
                    let profile: Profile = {
                       UserID: response.data.userId,
                       UserName: response.data.userName,
                       RoleID: response.data.roleId,
                       Token: response.data.token,
                       DepartmentID: response.data.departmentId,
                    };
                    ProfileService.setProfile(profile);
                    return navigate("/");
                    /*localStorage.setItem("user", JSON.stringify(response.data))*/;
                }
                //window.location.href='/';
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
    };
    
    return (
        <>
            <Container maxWidth="sm">
                <PageTitleWrapper>
                    <PageTitle
                        heading="Login"
                        subHeading="Collage Management System"
                    />
                </PageTitleWrapper>
                <div className="register-form">
                    <Box 
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={6}
                        >
                            <Grid item xs={12}>
                                <Card sx={{ px: 12 }}>
                                    <CardHeader title="Enter Credentials" />
                                    <Divider />
                                    <CardContent>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <div>
                                                <TextField
                                                    style={{ width: '100%' }}
                                                    required
                                                    id="outlined-required"
                                                    label="Username"
                                                    {...register('username')} fullWidth
                                                    error={!!errors['username']}
                                                    helperText={errors['username'] ? errors['username'].message : ''}
                                                />
                                            </div>
                                            <div>
                                                <TextField style={{ width: '100%' }} required
                                                    id="outlined-password-input"
                                                    label="Password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    {...register('password')} fullWidth
                                                    error={!!errors['password']}
                                                    helperText={errors['password'] ? errors['password'].message : ''}
                                                />
                                            </div>
                                        </Box>
                                    </CardContent>
                                    <Button type="submit" sx={{ margin: 1 }} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    <Button type="button"
                                        onClick={() => reset()} sx={{ margin: 1 }} variant="contained" color="secondary">
                                        Reset
                                    </Button>

                                </Card>
                            </Grid>
                        </Grid>

                    </Box>
                </div>
                <Footer />
            </Container>
        </>
    );
}
export default LoginForm;
