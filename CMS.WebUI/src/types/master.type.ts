// this file is exporting types which will be used in lecture form
export type LectureModel = {
    // id is readonly because it can't be assigned with the value
    readonly _id?: string
    lectureName: string;
    credit: number;
    department: object;
    remarks?: string;
};
export type DepartmentModel = {
    readonly _id?: string;
    departmentName: string;
    lectures?: LectureModel[];
    remarks?: string;
};
export type StudentModel = {
    readonly _id?: string;
    name: string;
    // student is having a list of lectures
    lectures?: LectureModel[];
    gpa: number;
    remarks?: string;
};
