import { Grid, Container, Autocomplete, TextField, Snackbar, Alert, ListItem, Checkbox, ListItemIcon, ListItemText, List, Card, Divider, CardHeader, Button, CardContent } from '@mui/material';
import { MouseEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { DepartmentModel, LectureModel } from '../../../../types/master.type';
import { LectureService } from '../../../../services/lecture.service';
import { ProfileService } from '../../../../services/profile.service';
import { DepartmentService } from '../../../../services/department.service';
import { UserService } from '../../../../services/user.service';
import { Profile } from '../../../../types/profile.type';

function not(a: readonly LectureModel[], b: readonly LectureModel[]) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a: readonly LectureModel[], b: readonly LectureModel[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a: readonly LectureModel[], b: readonly LectureModel[]) {
    return [...a, ...not(b, a)];
  }

const Lecture = () => {
  // using useState hook to set and get variables data
    const [allowedCredit,setAllowedCredit] = useState<number>(0);
    const [selectedCredit,setSelectedCredit] = useState<number>(0);
    const [hideLecturePage, setHideLecturePage] = useState<boolean>(false);
    const [openSuccessAlert, setopenSuccessAlert] = useState<boolean>(false);
    const [openErrorAlert, setopenErrorAlert] = useState<boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageErorr, setMessageError] = useState<string>("");
    const [isAdmin, setAdmin] = useState<boolean>(false);
    const [availableLectures, setAvailableLectures] = useState<LectureModel[]>([]);
    const [selectedLectures, setSelectedLectures] = useState<LectureModel[]>([]);
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentModel>({departmentName:''});
    const [checked, setChecked] = useState<readonly LectureModel[]>([]);
    const leftChecked = intersection(checked, availableLectures);
    const rightChecked = intersection(checked, selectedLectures);
    // get user profile from profile service
    const _profile = ProfileService.getProfile();
    // this useEffect will be called once page is rendered
    useEffect(() => {
      // calling department service to get all departments
     DepartmentService.getAllDepartments().then(x => setDepartments(x) );
    },[]);
    // this useEffect will be called after getting departments from API
    useEffect(() => {
      // if API returns department
      if(departments.length > 0){
        // set logged in user department in the dropdown
        setSelectedDepartment(departments.filter(x => x._id == _profile?.DepartmentID)[0]);
        // if user profile data is saved in the local storage
      if(_profile){
        if(_profile.RoleID == 1){
          setAdmin(true);
          // set max allowed limit if user is an admin
          setAllowedCredit(64);
        }
        else if(_profile.RoleID == 2){
          // set max allowed limit if user is a teacher
          setAllowedCredit(64);
          // This method will set all available and selected lectures
          loadLecturesForTeacherAndAdmin(_profile.DepartmentID);
      }
        else if(_profile.RoleID == 3){
          // role id 3 is for students, call user service to get student data from API
          UserService.getUserById(_profile.UserID).then(x => {
            let _selectedLectures = x[0].lectures!;
            setSelectedLectures(_selectedLectures);
            let _selectedCredit = x[0].lectures!.reduce((accumulator, current) => accumulator + current.credit, 0);
            setSelectedCredit(_selectedCredit);
            // calling department service to get lectures for this user
            DepartmentService.getDepartmentByID(_profile.DepartmentID).then(availableLecs => {
              let _selectedLectureIDs = _selectedLectures.map(x => x._id);
              let _availableLectures: LectureModel[] = new Array();
              for(let i=0;i<availableLecs[0].lectures.length;i++){
                if(_selectedLectureIDs.indexOf(availableLecs[0].lectures[i]._id) === -1){
                  _availableLectures.push(availableLecs[0].lectures[i]);
                }
              }
              setAvailableLectures(_availableLectures);
            });
            // setting max credit limit for students based on their GPA
            if(x[0].gpa >= 3.5){
              setAllowedCredit(40);
            }
            else if(x[0].gpa >= 3 && x[0].gpa < 3.5){
              setAllowedCredit(35);
            }
            else if(x[0].gpa < 3){
              setAllowedCredit(30);
            }
          }); 
      }
    }
      }
    },[departments]);
    // this method closes alert if user press close button on alert
    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setopenSuccessAlert(false);
        setopenErrorAlert(false);
    };

  const handleToggle = (value: LectureModel) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly LectureModel[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly LectureModel[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  // this method will move lectures to the selected tab
  const handleCheckedRight = () => {
    // increment credit as per the added lectures
      let _newlySelectedCredit: number = leftChecked.reduce((previous,current) => previous + current.credit,0);
      if((selectedCredit + _newlySelectedCredit) > allowedCredit){
        setopenErrorAlert(true);
        setMessageError("Max Allowed Credit: " + allowedCredit);
      }
    else{
      setSelectedLectures(selectedLectures.concat(leftChecked));
      setAvailableLectures(not(availableLectures, leftChecked));
      setChecked(not(checked, leftChecked));
      setSelectedCredit(selectedCredit + _newlySelectedCredit);
    }
    
  };
  // this method will move lectures to avilable tab
  const handleCheckedLeft = () => {
    // deduct credit if user move lecture to avilable tab
    if(selectedCredit > 0){
      let _newlySelectedCredit: number = rightChecked.reduce((previous,current) => previous + current.credit,0);
      setSelectedCredit(selectedCredit - _newlySelectedCredit);
    }
    setAvailableLectures(availableLectures.concat(rightChecked));
    setSelectedLectures(not(selectedLectures, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  // this handler will update user's lecture for the selected department
  const handleClickSave = () => {
    // if department is not selected, show error to the user
    if(selectedDepartment == undefined){
      setopenErrorAlert(true);
      setMessageError("Please select a department");
      return;
    }
    // if(selectedCredit < 1){
    //   setopenErrorAlert(true);
    //   setMessageError("Please select a Lecture");
    //   return;
    // }
   // if user is an admin or a teacher, update lecture for the selected department
    if(_profile?.RoleID === 1 || _profile?.RoleID === 2){
      let _payload = {Id: _profile?.RoleID == 1 ? selectedDepartment._id : _profile.DepartmentID, lectures: selectedLectures};
      DepartmentService.updateDepartmentLectures(_payload).then(x => {
        if(x){
          // if API returns true, show success message to the user
          setopenSuccessAlert(true);
          setMessageSuccess("Successfully Saved Lectures!");
            setHideLecturePage(true);
        }
        else{
          // if API returns false, show error message to the user
          setopenErrorAlert(true);
          setMessageError("Something went wrong, Please try again later");
        }
      });
    }
    // if user is a student, update student's lecture 
    else if(_profile?.RoleID === 3){
      let _payload = {Id: _profile?.UserID, lectures: selectedLectures};
      UserService.updateUserLectures(_payload).then(x => {
        if(x){
          // if API returns true, show success message to the user
          setopenSuccessAlert(true);
          setMessageSuccess("Successfully Saved Lectures!");
          setHideLecturePage(true);
        }
        else{
           // if API returns false, show error message to the user
          setopenErrorAlert(true);
          setMessageError("Something went wrong, Please try again later");
        }
      });
    }
  };
  // it will be called if an admin changes the department from dropdown
  const handleDepartmentChange = (event: SyntheticEvent<Element, Event>, newValue: DepartmentModel | null) => {
    setSelectedDepartment(newValue!);
    loadLecturesForTeacherAndAdmin(newValue!._id!);
};
// if admin changes department, this method will load availble and selected lecture of particular department
 const loadLecturesForTeacherAndAdmin = (departmentId: string) => {
  DepartmentService.getDepartmentByID(departmentId).then(x => {
    let _selectedLectures = x[0].lectures!;
    setSelectedLectures(_selectedLectures);
    let _selectedCredit = x[0].lectures!.reduce((accumulator, current) => accumulator + current.credit, 0);
    setSelectedCredit(_selectedCredit);
    LectureService.getAllLectureByDepartmentID(departmentId).then(availableLecs => {
      let _selectedLectureIDs = _selectedLectures.map(x => x._id);
      let _availableLectures: LectureModel[] = new Array();
      for(let i=0;i<availableLecs.length;i++){
        if(_selectedLectureIDs.indexOf(availableLecs[i]._id) === -1){
          _availableLectures.push(availableLecs[i]);
        }
      }
      setAvailableLectures(_availableLectures);
    });
});
 }

  const customList = (title: React.ReactNode, items: readonly LectureModel[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
         
          height: 330,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((lecture: LectureModel) => {
          const labelId = `transfer-list-all-item-${lecture}-label`;

          return (
            <ListItem
              key={lecture._id}
              role="listitem"
              button
              onClick={handleToggle(lecture)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(lecture) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${lecture.lectureName} (Credit:${lecture.credit})`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
    return (
        <>
         <Snackbar open={openSuccessAlert} autoHideDuration={5000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    {messageSuccess}
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorAlert} autoHideDuration={5000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {messageErorr}
                </Alert>
            </Snackbar>
            <Card hidden={hideLecturePage == false} sx={{minHeight:"30vh", m:"100px auto",p:5, width:"800px",textAlign:"center"}}>
              <CardContent>
                <h1>Thank you for your submission!</h1>
              </CardContent>
            </Card>
            <Card sx={{m:3}} hidden={hideLecturePage}>
            <CardHeader title="Lecture Selection" />
                <CardContent>
                <Container maxWidth="lg">
                <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
                    <Grid item xs={6}>
                        <Autocomplete disabled={isAdmin == false}
                            onChange={handleDepartmentChange}
                            value={selectedDepartment} disablePortal style={{ width: '94%' }}
                            id="drpDepartments" options={departments} getOptionLabel={departments => departments.departmentName}
                            renderInput={(params) => <TextField style={{ width: '100%' }} {...params} label="Department" />}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:"right"}}>
                        <Button type="button" onClick={() => handleClickSave()} sx={{ height:"53px",padding:1}} variant="contained" color="primary"> Save </Button>
                    </Grid>
                    <Grid item xs={12}  hidden={selectedDepartment == undefined}>
                          <p style={{margin:0}}>Max Allowed Credit: <b>{allowedCredit}</b>, Selected Credit: <b>{selectedCredit}</b></p>
                    </Grid>
                    <Grid item xs={12}  hidden={selectedDepartment == undefined}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={5.6}>{customList('Lecture Choices', availableLectures)}</Grid>
                            <Grid item>
                            <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            </Grid>
                        </Grid>
                        <Grid item  xs={5.5}>{customList('Chosen Lectures', selectedLectures)}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
                </CardContent>
            </Card>
           
        </>
    );
}

export default Lecture;
