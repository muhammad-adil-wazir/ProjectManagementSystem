import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import { Column, DataTableRequest, DataTableResponse } from '../../models/table.type';
import { Post } from "../../services/common.service";
import { Avatar, Button, Container, Divider, Grid, Hidden, makeStyles, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Padding } from '@mui/icons-material';
import { lightBlue } from '@mui/material/colors';
import Scrollbars from 'react-custom-scrollbars-2';



//function createData(
//    name: string,
//    calories: number,
//    fat: number,
//    carbs: number,
//    protein: number,
//): Data {
//    return {
//        name,
//        calories,
//        fat,
//        carbs,
//        protein,
//    };
//}

//const rows = [
//    createData('Cupcake', 305, 3.7, 67, 4.3),
//    createData('Donut', 452, 25.0, 51, 4.9),
//    createData('Eclair', 262, 16.0, 24, 6.0),
//    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//    createData('Gingerbread', 356, 16.0, 49, 3.9),
//    createData('Honeycomb', 408, 3.2, 87, 6.5),
//    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//    createData('Jelly Bean', 375, 0.0, 94, 0.0),
//    createData('KitKat', 518, 26.0, 65, 7.0),
//    createData('Lollipop', 392, 0.2, 98, 0.0),
//    createData('Marshmallow', 318, 0, 81, 2.0),
//    createData('Nougat', 360, 19.0, 9, 37.0),
//    createData('Oreo', 437, 18.0, 63, 4.0),
//];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

//const headCells: readonly HeadCell[] = [
//    {
//        id: 'UserName',
//        numeric: false,
//        disablePadding: true,
//        label: 'Dessert (100g serving)',
//    },
//    {
//        id: 'calories',
//        numeric: true,
//        disablePadding: false,
//        label: 'Calories',
//    },
//    {
//        id: 'fat',
//        numeric: true,
//        disablePadding: false,
//        label: 'Fat (g)',
//    },
//    {
//        id: 'carbs',
//        numeric: true,
//        disablePadding: false,
//        label: 'Carbs (g)',
//    },
//    {
//        id: 'protein',
//        numeric: true,
//        disablePadding: false,
//        label: 'Protein (g)',
//    },
//];

interface EnhancedTableProps {
    headCells: Column[];
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/*<Checkbox*/}
                    {/*    color="primary"*/}
                    {/*    indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                    {/*    checked={rowCount > 0 && numSelected === rowCount}*/}
                    {/*    onChange={onSelectAllClick}*/}
                    {/*    inputProps={{*/}
                    {/*        'aria-label': 'select all desserts',*/}
                    {/*    }}*/}
                    {/*/>*/}
                </TableCell>
                {headCells.map((headCell) => (
                        <TableCell 
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <Box hidden={headCell.visible == false}>
                            <TableSortLabel 
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </Box>
                       
                        </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
   
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {/*Nutrition*/}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : ( <span></span>
                //<Tooltip title="Filter list">
                //    <IconButton>
                //        <FilterListIcon />
                //    </IconButton>
                //</Tooltip>
            )}
        </Toolbar>
    );
};

const DataTable: React.FC<any> = ({ columns, url, isSearchAble, editHandler, rerenderTableFlag }) => {

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>(columns[0].id);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState<any[]>([]);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [filter, setFilter] = React.useState<any>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<any>({
    });
    //React.useEffect(() => getFilteredData(), []);
    React.useEffect(() => {
        getFilteredData()
    }, [filter, rerenderTableFlag, page, rowsPerPage]);
    const getFilteredData = () => {
        let _filter = undefined;
        if (isSearchAble == true) {
            _filter = filter;
        }
        let _requestParamters: DataTableRequest = {
            filter: _filter,
            length: rowsPerPage,
            start: page * rowsPerPage,
            order: { orderBy: orderBy, orderDirection: order }
        };
        Post(url, _requestParamters).then(
            (response: any) => {
                if (response.status == 200) {
                    setRows(response.data.data);
                    setTotalRecords(response.data.recordsTotal);
                }
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        );
    };
    const resetSearchForm = () => {
        const formFields = {};
        columns.map(x => {
            if (x.numeric) {
                formFields[x.id] = 0;
            }
            else {
                formFields[x.id] = '';
            }
        });
        reset(formFields);
        setFilter(formFields);
    }
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        getFilteredData();
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n[columns[0].id]);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        //getFilteredData();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        //getFilteredData();
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const onSubmit = (data: any) => {
        if (data != undefined) {
            columns.map((column, index) => {
                if (column.numeric == true) {
                    if (data[column.id] == undefined || data[column.id] == null || data[column.id] == '') {
                        data[column.id] = 0;
                    }
                    else
                        data[column.id] = parseInt(data[column.id]);
                }
            });
        }
        setFilter(data);
        //getFilteredData();
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    //const editHandlerr = (name: any) => {
    //    editHandler(name);
    //};
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={6}
            >
                <Grid item xs={12} lg={6}>
                    <Box hidden={isSearchAble == false} >
                        <Scrollbars
                            autoHeight={true}
                            autoHeightMax={260}

                        >
                      
                        {
                            columns.map((column, index) => {
                                return (
                                    <Box hidden={column.searchAble == false}> 
                                        <TextField
                                            style={{ width: '90%', margin: '1%' }}
                                            hidden={true}
                                            id="outlined-required" key={column.id }
                                            label={column.label} type={column.numeric == true ? 'number' : 'text'}
                                            {...register(column.id)}
                                        />
                                    </Box>
                        
                                    )
                            })
               
                            }
                        </Scrollbars>
                    <Button type="button"
                        onClick={handleSubmit(onSubmit)} sx={{ margin: 1 }} variant="contained" color="primary">
                Search
                        </Button>
                        <Button type="button"
                            onClick={() => resetSearchForm()} sx={{ margin: 1 }} variant="contained" color="secondary">
                            Reset
                        </Button>
                    </Box>
                </Grid>
                </Grid>
            <Divider />
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length}  />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            headCells={columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                            {
                                //stableSort(rows, getComparator(order, orderBy))
                                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                rows.map((row, index) => {
                                    const isItemSelected = isSelected(row[columns[0].id]);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    //return (
                                    //    <TableRow
                                    //        hover
                                    //        onClick={(event) => handleClick(event, row[columns[0].id])}
                                    //        role="checkbox"
                                    //        aria-checked={isItemSelected}
                                    //        tabIndex={-1}
                                    //        key={row[0]}
                                    //        selected={isItemSelected}
                                    //    >
                                    //        <TableCell padding="checkbox">
                                    //            <Checkbox
                                    //                color="primary"
                                    //                checked={isItemSelected}
                                    //                inputProps={{
                                    //                    'aria-labelledby': labelId,
                                    //                }}
                                    //            />
                                    //        </TableCell>
                                    //        <TableCell
                                    //            component="th"
                                    //            id={labelId}
                                    //            scope="row"
                                    //            padding="none"
                                    //        >
                                    //            {row[columns[0].id]}
                                    //        </TableCell>
                                           

                                    //    </TableRow>
                                    //);
                                    return (
                                       /* <TableRow hover onClick={(event) => handleClick(event, row[columns[0].id])} role="checkbox" aria-checked={isItemSelected}  tabIndex={-1} key={row[0]} selected={isItemSelected}> */

                                      <TableRow>
                                       <TableCell padding="checkbox">
                                        <Stack direction="row">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                                    <IconButton onClick={(event) => editHandler(event,row)}
                                                        sx={{
                                                "&:hover": {
                                                    backgroundColor: "transparent",
                                                    cursor: "pointer"
                                                }
                                            }}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell align={column.numeric ? 'right' : 'left'}
                                                        padding={column.disablePadding ? 'none' : 'normal'} key={column.id}>
                                                        <Box hidden={column.visible == false }>
                                                            {value}
                                                        </Box>
                                                       
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25,50]}
                    component="div"
                    count={totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
DataTable.propTypes = {
  columns: PropTypes.array.isRequired
};

DataTable.defaultProps = {
    columns: []
};

export default DataTable;